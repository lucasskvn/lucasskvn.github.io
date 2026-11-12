import { useEffect, useRef, useState } from "react";
import { apps } from "../os/registry";
import { projects } from "../data/projects";
import { useSystem } from "../os/SystemContext";
import { Icon } from "./Icon";
import type { IconName } from "./Icon";

const fold = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function Launcher() {
  const { openApp, setLauncher } = useSystem();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const rows = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const element = dialog.current;
    element?.showModal();
    field.current?.focus();
    return () => {
      element?.close();
      previous?.focus({ preventScroll: true });
    };
  }, []);
  const all = [
    ...apps.map((app) => ({
      id: app.id,
      label: app.name,
      detail: app.subtitle,
      type: "APPLICATION",
      icon: app.icon as IconName,
      run: () => openApp(app.id),
    })),
    ...projects.map((project) => ({
      id: `project-${project.id}`,
      label: project.name,
      detail: project.technologies.join(" · "),
      type: "ARTICLE / FOLIO",
      icon: "book" as IconName,
      run: () => openApp("fanzine", project.id),
    })),
  ];
  const results = (
    query
      ? all.filter((item) =>
          fold(`${item.label} ${item.detail} ${item.type}`).includes(
            fold(query),
          ),
        )
      : all.slice(0, 7)
  ).slice(0, 15);
  useEffect(() => {
    rows.current[cursor]?.scrollIntoView({ block: "nearest" });
  }, [cursor]);
  return (
    <dialog
      ref={dialog}
      className="launcher-dialog"
      aria-label="Lanceur d’applications et recherche"
      onCancel={() => setLauncher(false)}
      onClick={(event) => {
        if (event.target === event.currentTarget) setLauncher(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setCursor((index) => Math.min(results.length - 1, index + 1));
        }
        if (event.key === "ArrowUp") {
          event.preventDefault();
          setCursor((index) => Math.max(0, index - 1));
        }
        if (event.key === "Enter" && results[cursor]) {
          event.preventDefault();
          results[cursor].run();
        }
      }}
    >
      <div className="launcher-content">
        <div className="launcher-search">
          <Icon name="search" size={23} />
          <input
            ref={field}
            value={query}
            aria-label="Rechercher une application ou un projet"
            role="combobox"
            aria-expanded={true}
            aria-autocomplete="list"
            aria-activedescendant={
              results[cursor]
                ? `launcher-option-${results[cursor].id}`
                : undefined
            }
            aria-controls="launcher-results"
            placeholder="Une application, un projet, une envie…"
            onChange={(event) => {
              setQuery(event.target.value);
              setCursor(0);
            }}
          />
          <button
            className="icon-button"
            aria-label="Fermer le lanceur"
            onClick={() => setLauncher(false)}
          >
            <Icon name="close" size={19} />
          </button>
        </div>
        <div className="launcher-heading mono">
          {query
            ? `${results.length} RÉSULTAT${results.length !== 1 ? "S" : ""}`
            : "VOTRE ESPACE, À PORTÉE DE MAIN"}
        </div>
        <div
          id="launcher-results"
          className="launcher-results"
          role="listbox"
          aria-label="Résultats de recherche"
        >
          {results.map((result, index) => (
            <button
              key={result.id}
              id={`launcher-option-${result.id}`}
              role="option"
              aria-selected={cursor === index}
              ref={(element) => {
                rows.current[index] = element;
              }}
              className={cursor === index ? "selected" : ""}
              onMouseEnter={() => setCursor(index)}
              onClick={result.run}
            >
              <Icon name={result.icon} size={22} />
              <span>
                <strong>{result.label}</strong>
                <small>{result.detail}</small>
              </span>
              <span className="mono result-type">{result.type}</span>
              <Icon name="arrow" size={18} />
            </button>
          ))}
          {!results.length && (
            <p className="empty-state">
              Aucun résultat. Essayez « Rust », « musique » ou « profil ».
            </p>
          )}
        </div>
        <footer className="launcher-footer mono">
          <span>↑ ↓ PARCOURIR</span>
          <span>↵ OUVRIR</span>
          <span>ÉCHAP FERMER</span>
        </footer>
      </div>
    </dialog>
  );
}
