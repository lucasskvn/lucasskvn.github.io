import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import type { Dispatch, ReactNode } from "react";
import { projects } from "../data/projects";
import { createFilesystem } from "./filesystem";
import { apps, isAppId } from "./registry";
import type { AppId } from "./registry";
import { createDesktop, windowReducer } from "./model";
import type { Viewport, WindowAction, WindowState } from "./model";
import { readStored, saveStored } from "./storage";

export type Preferences = {
  theme: "paper" | "night";
  accent: "vermilion" | "blue" | "moss";
  reducedMotion: boolean;
  grid: boolean;
};
const defaults: Preferences = {
  theme: "paper",
  accent: "vermilion",
  reducedMotion: false,
  grid: true,
};
function initialPreferences(): Preferences {
  const stored =
    readStored<Partial<Preferences> | null>("preferences", defaults) ??
    defaults;
  return {
    theme: stored.theme === "night" ? "night" : "paper",
    accent: ["vermilion", "blue", "moss"].includes(stored.accent ?? "")
      ? stored.accent!
      : "vermilion",
    reducedMotion: stored.reducedMotion === true,
    grid: stored.grid !== false,
  };
}
function viewportSize(): Viewport {
  return {
    width: window.innerWidth - (window.innerWidth <= 760 ? 0 : 86),
    height: window.innerHeight - (window.innerWidth <= 760 ? 102 : 78),
  };
}
function readRoute(): { id: AppId; target?: string } {
  const aliases: Record<string, AppId> = {
    projects: "fanzine",
    about: "profil",
    contact: "profil",
    music: "musique",
    radio: "musique",
    uses: "profil",
  };
  let path =
    window.location.hash.replace(/^#\/?/, "") ||
    window.location.pathname.slice(1);
  try {
    path = decodeURIComponent(path);
  } catch {
    /* A malformed link opens the magazine. */
  }
  const [part, ...tail] = path.split("/");
  return {
    id: isAppId(part) ? part : (aliases[part] ?? "fanzine"),
    target:
      tail.join("/") ||
      (part === "radio"
        ? "radio"
        : part === "uses"
          ? "atelier"
          : part === "contact"
            ? "contact"
            : undefined),
  };
}
const filesystem = createFilesystem(projects);
type System = {
  state: WindowState;
  dispatch: Dispatch<WindowAction>;
  viewport: Viewport;
  mobile: boolean;
  openApp: (id: AppId, target?: string) => void;
  files: typeof filesystem;
  preferences: Preferences;
  setPreferences: (update: Partial<Preferences>) => void;
  launcher: boolean;
  setLauncher: (open: boolean) => void;
  notify: (message: string) => void;
  toast: string;
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
};
const Context = createContext<System | null>(null);
export function SystemProvider({ children }: { children: ReactNode }) {
  const [viewport, setViewport] = useState(viewportSize);
  const wasMobile = useRef(window.innerWidth <= 760);
  const [state, dispatch] = useReducer(windowReducer, undefined, () => {
    const route = readRoute();
    return createDesktop(viewport, route.id, route.target);
  });
  const [preferences, updatePreferences] = useState(initialPreferences);
  const [launcher, setLauncher] = useState(false);
  const [toast, setToast] = useState("");
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const stored = readStored<unknown>("bookmarks", []);
    return Array.isArray(stored)
      ? stored.filter(
          (id): id is string =>
            typeof id === "string" &&
            projects.some((project) => project.id === id),
        )
      : [];
  });
  const notify = useCallback((message: string) => setToast(message), []);
  const setPreferences = useCallback(
    (update: Partial<Preferences>) =>
      updatePreferences((current) => ({ ...current, ...update })),
    [],
  );
  const openApp = useCallback(
    (id: AppId, target?: string) => {
      dispatch({ type: "open", id, target, viewport });
      setLauncher(false);
      const hash = `#/${id}${target ? "/" + encodeURIComponent(target) : ""}`;
      if (window.location.hash !== hash)
        window.history.pushState(null, "", hash);
    },
    [viewport],
  );
  const toggleBookmark = useCallback(
    (id: string) =>
      setBookmarks((current) =>
        current.includes(id)
          ? current.filter((item) => item !== id)
          : [...current, id],
      ),
    [],
  );
  useEffect(() => {
    saveStored("preferences", preferences);
  }, [preferences]);
  useEffect(() => {
    saveStored("bookmarks", bookmarks);
  }, [bookmarks]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    const resize = () => {
      const viewport = viewportSize();
      const mobile = window.innerWidth <= 760;
      setViewport(viewport);
      if (!mobile)
        dispatch({
          type: wasMobile.current ? "arrange" : "viewport",
          viewport,
        });
      wasMobile.current = mobile;
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  useEffect(() => {
    const navigate = () => {
      if (window.location.hash === "#desktop-apps") return;
      const route = readRoute();
      dispatch({ type: "open", ...route, viewport });
    };
    window.addEventListener("popstate", navigate);
    window.addEventListener("hashchange", navigate);
    return () => {
      window.removeEventListener("popstate", navigate);
      window.removeEventListener("hashchange", navigate);
    };
  }, [viewport]);
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setLauncher((open) => !open);
      }
      if (event.key === "Escape") setLauncher(false);
      if (event.altKey && /^[1-7]$/.test(event.key)) {
        event.preventDefault();
        openApp(apps[Number(event.key) - 1].id);
      }
      if (event.altKey && event.key === "Escape") {
        event.preventDefault();
        dispatch({ type: "desktop" });
      }
      if (event.altKey && event.key === "`") {
        event.preventDefault();
        const current = state.windows.findIndex(
          (window) => window.id === state.active,
        );
        const next = state.windows[(current + 1) % state.windows.length];
        if (next) dispatch({ type: "focus", id: next.id });
      }
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [openApp, state]);
  const value = useMemo(
    () => ({
      state,
      dispatch,
      viewport,
      mobile: window.innerWidth <= 760,
      openApp,
      files: filesystem,
      preferences,
      setPreferences,
      launcher,
      setLauncher,
      notify,
      toast,
      bookmarks,
      toggleBookmark,
    }),
    [
      state,
      viewport,
      openApp,
      preferences,
      setPreferences,
      launcher,
      notify,
      toast,
      bookmarks,
      toggleBookmark,
    ],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useSystem() {
  const value = useContext(Context);
  if (!value) throw new Error("SystemProvider missing");
  return value;
}
