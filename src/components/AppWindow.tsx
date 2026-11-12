import { useEffect, useRef } from "react";
import type { PointerEvent, ReactNode } from "react";
import { Icon } from "./Icon";
import { appInfo } from "../os/registry";
import { useSystem } from "../os/SystemContext";
import type { AppWindow as WindowModel, Frame } from "../os/model";

export function AppWindow({
  window: item,
  children,
}: {
  window: WindowModel;
  children: ReactNode;
}) {
  const { state, dispatch, viewport, mobile } = useSystem();
  const section = useRef<HTMLElement>(null);
  const gesture = useRef<{
    x: number;
    y: number;
    frame: Frame;
    resize: boolean;
  } | null>(null);
  const active = state.active === item.id;
  const app = appInfo(item.id);
  useEffect(() => {
    if (
      active &&
      section.current &&
      !section.current.contains(document.activeElement)
    )
      section.current.focus({ preventScroll: true });
  }, [active]);
  const begin = (event: PointerEvent<HTMLElement>, resize = false) => {
    if (
      mobile ||
      item.maximized ||
      event.button !== 0 ||
      (event.target as HTMLElement).closest("button")
    )
      return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    gesture.current = {
      x: event.clientX,
      y: event.clientY,
      frame: { x: item.x, y: item.y, width: item.width, height: item.height },
      resize,
    };
  };
  const move = (event: PointerEvent<HTMLElement>) => {
    const start = gesture.current;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    const frame = start.resize
      ? {
          ...start.frame,
          width: start.frame.width + dx,
          height: start.frame.height + dy,
        }
      : { ...start.frame, x: start.frame.x + dx, y: start.frame.y + dy };
    dispatch({ type: "frame", id: item.id, frame, viewport });
  };
  const end = () => {
    gesture.current = null;
  };
  const frame =
    mobile || item.maximized
      ? { x: 0, y: 0, width: viewport.width, height: viewport.height }
      : item;
  return (
    <section
      ref={section}
      tabIndex={-1}
      role="region"
      aria-label={`Application ${app.name}`}
      aria-hidden={item.minimized || (mobile && !active)}
      hidden={item.minimized || (mobile && !active)}
      className={`app-window window-${item.id}${active ? " is-active" : ""}${item.maximized ? " is-maximized" : ""}`}
      style={{
        left: frame.x,
        top: frame.y,
        width: frame.width,
        height: frame.height,
        zIndex: item.z,
      }}
      onPointerDownCapture={() => {
        if (!active) dispatch({ type: "focus", id: item.id });
      }}
      onFocusCapture={() => {
        if (!active) dispatch({ type: "focus", id: item.id });
      }}
    >
      <header
        className="window-titlebar"
        onPointerDown={(event) => begin(event)}
        onPointerMove={move}
        onPointerUp={end}
        onPointerCancel={end}
        onDoubleClick={(event) => {
          if (!(event.target as HTMLElement).closest("button"))
            dispatch({ type: "maximize", id: item.id });
        }}
      >
        <span className="window-title">
          <Icon name={app.icon} size={15} />
          {app.name}
          <span className="window-instance">/ 01</span>
        </span>
        <span className="window-grip" aria-hidden="true" />
        <div className="window-controls">
          <button
            aria-label={`Réduire ${app.name}`}
            title="Réduire"
            onClick={() => dispatch({ type: "minimize", id: item.id })}
          >
            <Icon name="minimize" size={15} />
          </button>
          {!mobile && (
            <button
              aria-label={`${item.maximized ? "Restaurer" : "Agrandir"} ${app.name}`}
              title="Agrandir / restaurer"
              onClick={() => dispatch({ type: "maximize", id: item.id })}
            >
              <Icon name="expand" size={14} />
            </button>
          )}
          <button
            className="close-window"
            aria-label={`Fermer ${app.name}`}
            title="Fermer"
            onClick={() => dispatch({ type: "close", id: item.id })}
          >
            <Icon name="close" size={16} />
          </button>
        </div>
      </header>
      <div className="window-body">{children}</div>
      {!mobile && !item.maximized && (
        <div
          className="window-resize"
          role="separator"
          tabIndex={0}
          aria-label={`Redimensionner ${app.name}`}
          aria-valuenow={Math.round(item.width)}
          aria-valuemin={300}
          aria-valuemax={viewport.width}
          onPointerDown={(event) => begin(event, true)}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
          onKeyDown={(event) => {
            const keys: Record<string, [number, number]> = {
              ArrowRight: [24, 0],
              ArrowLeft: [-24, 0],
              ArrowDown: [0, 24],
              ArrowUp: [0, -24],
            };
            const delta = keys[event.key];
            if (delta) {
              event.preventDefault();
              dispatch({
                type: "frame",
                id: item.id,
                frame: {
                  ...item,
                  width: item.width + delta[0],
                  height: item.height + delta[1],
                },
                viewport,
              });
            }
          }}
        />
      )}
    </section>
  );
}
