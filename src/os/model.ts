import type { AppId } from "./registry.ts";

export type Viewport = { width: number; height: number };
export type Frame = { x: number; y: number; width: number; height: number };
export type AppWindow = Frame & {
  id: AppId;
  z: number;
  minimized: boolean;
  maximized: boolean;
  target?: string;
  launch: number;
};
export type WindowState = {
  windows: AppWindow[];
  active: AppId | null;
  serial: number;
};
export type WindowAction =
  | { type: "open"; id: AppId; viewport: Viewport; target?: string }
  | { type: "focus" | "close" | "minimize" | "maximize"; id: AppId }
  | { type: "frame"; id: AppId; frame: Frame; viewport: Viewport }
  | { type: "viewport"; viewport: Viewport }
  | { type: "desktop" }
  | { type: "arrange"; viewport: Viewport };

export function clampFrame(frame: Frame, viewport: Viewport): Frame {
  const width = Math.min(Math.max(300, frame.width), viewport.width);
  const height = Math.min(Math.max(240, frame.height), viewport.height);
  return {
    width,
    height,
    x: Math.max(0, Math.min(frame.x, viewport.width - width)),
    y: Math.max(0, Math.min(frame.y, viewport.height - height)),
  };
}

export function defaultFrame(id: AppId, viewport: Viewport, offset = 0): Frame {
  const { width: w, height: h } = viewport;
  if (id === "musique")
    return clampFrame(
      { x: w - 365, y: h - 372, width: 340, height: 344 },
      viewport,
    );
  if (id === "fanzine")
    return clampFrame(
      {
        x: w > 1050 ? 74 : 26,
        y: 30,
        width: Math.min(900, w - (w > 1050 ? 270 : 70)),
        height: Math.min(650, h - 55),
      },
      viewport,
    );
  const width = id === "terminal" ? 690 : id === "reglages" ? 580 : 790;
  return clampFrame(
    {
      x: (w - width) / 2 + offset * 20,
      y: 70 + offset * 20,
      width,
      height: Math.min(590, h - 110),
    },
    viewport,
  );
}

function topVisible(windows: AppWindow[]): AppId | null {
  return (
    windows.filter((window) => !window.minimized).sort((a, b) => b.z - a.z)[0]
      ?.id ?? null
  );
}

export function windowReducer(
  state: WindowState,
  action: WindowAction,
): WindowState {
  const serial = state.serial + 1;
  if (action.type === "open") {
    const existing = state.windows.some((window) => window.id === action.id);
    const windows = existing
      ? state.windows.map((window) =>
          window.id === action.id
            ? {
                ...window,
                minimized: false,
                z: serial,
                target: action.target ?? window.target,
                launch: action.target !== undefined ? serial : window.launch,
              }
            : window,
        )
      : [
          ...state.windows,
          {
            id: action.id,
            ...defaultFrame(
              action.id,
              action.viewport,
              state.windows.length % 3,
            ),
            z: serial,
            minimized: false,
            maximized: false,
            target: action.target,
            launch: serial,
          },
        ];
    return { windows, active: action.id, serial };
  }
  if (action.type === "desktop")
    return {
      ...state,
      windows: state.windows.map((window) => ({ ...window, minimized: true })),
      active: null,
    };
  if (action.type === "viewport")
    return {
      ...state,
      windows: state.windows.map((window) => ({
        ...window,
        ...clampFrame(window, action.viewport),
      })),
    };
  if (action.type === "arrange")
    return {
      ...state,
      windows: state.windows.map((window, i) => ({
        ...window,
        ...defaultFrame(window.id, action.viewport, i % 3),
        maximized: false,
      })),
    };
  if (action.type === "close") {
    const windows = state.windows.filter((window) => window.id !== action.id);
    return { ...state, windows, active: topVisible(windows) };
  }
  if (action.type === "minimize") {
    const windows = state.windows.map((window) =>
      window.id === action.id ? { ...window, minimized: true } : window,
    );
    return { ...state, windows, active: topVisible(windows) };
  }
  if (action.type === "frame")
    return {
      ...state,
      windows: state.windows.map((window) =>
        window.id === action.id
          ? { ...window, ...clampFrame(action.frame, action.viewport) }
          : window,
      ),
    };
  if (!state.windows.some((window) => window.id === action.id)) return state;
  return {
    serial,
    active: action.id,
    windows: state.windows.map((window) =>
      window.id === action.id
        ? {
            ...window,
            z: serial,
            minimized: false,
            maximized:
              action.type === "maximize" ? !window.maximized : window.maximized,
          }
        : window,
    ),
  };
}

export function createDesktop(
  viewport: Viewport,
  initial: AppId = "fanzine",
  target?: string,
): WindowState {
  let state: WindowState = { windows: [], active: null, serial: 0 };
  state = windowReducer(state, { type: "open", id: initial, viewport, target });
  if (viewport.width > 1120 && initial === "fanzine")
    state = windowReducer(state, { type: "open", id: "musique", viewport });
  return state;
}
