import { useEffect, useState } from "react";
import { Icon } from "../components/Icon";
import type { IconName } from "../components/Icon";
import { useSystem } from "../os/SystemContext";
import { HOME, childrenOf, parentPath, shortPath } from "../os/filesystem";
import type { VirtualFile } from "../os/filesystem";

const fileIcon: Record<VirtualFile["kind"], IconName> = {
  folder: "folder",
  text: "file",
  image: "grid",
  app: "external",
  pdf: "file",
  link: "external",
};
const typeLabel = {
  folder: "Dossier",
  text: "Document",
  image: "Image",
  app: "Application",
  pdf: "PDF",
  link: "Lien",
};
export function Files({
  target,
  requestId,
}: {
  target?: string;
  requestId?: number;
}) {
  const { files, openApp } = useSystem();
  const [history, setHistory] = useState([HOME]);
  const [cursor, setCursor] = useState(0);
  const [selected, setSelected] = useState<VirtualFile | null>(null);
  const [query, setQuery] = useState("");
  const [tiles, setTiles] = useState(false);
  const path = history[cursor];
  const navigate = (next: string) => {
    if (next !== path) {
      setHistory((current) => [...current.slice(0, cursor + 1), next]);
      setCursor(cursor + 1);
    }
    setSelected(null);
    setQuery("");
  };
  useEffect(() => {
    if (!target) return;
    const file = files.find((file) => file.path === target);
    if (!file) return;
    const next = file.kind === "folder" ? file.path : parentPath(file.path);
    setHistory([HOME, ...(next === HOME ? [] : [next])]);
    setCursor(next === HOME ? 0 : 1);
    setSelected(file.kind === "folder" ? null : file);
    setQuery("");
  }, [target, requestId, files]);
  const entries = childrenOf(files, path).filter((file) =>
    file.name.toLowerCase().includes(query.toLowerCase()),
  );
  const open = (file: VirtualFile) => {
    if (file.kind === "folder") navigate(file.path);
    else if (file.kind === "app" && file.app) openApp(file.app, file.target);
    else setSelected(file);
  };
  const projectId = path.startsWith(`${HOME}/projets/`)
    ? path.split("/")[4]
    : undefined;
  return (
    <div className="file-app app-column">
      <div className="app-toolbar file-toolbar">
        <div className="toolbar-buttons">
          <button
            className="icon-button"
            aria-label="Dossier précédent"
            disabled={cursor === 0}
            onClick={() => {
              setCursor(cursor - 1);
              setSelected(null);
              setQuery("");
            }}
          >
            <Icon name="back" size={16} />
          </button>
          <button
            className="icon-button"
            aria-label="Dossier suivant"
            disabled={cursor === history.length - 1}
            onClick={() => {
              setCursor(cursor + 1);
              setSelected(null);
              setQuery("");
            }}
          >
            <Icon name="next" size={16} />
          </button>
          <button
            className="icon-button up-button"
            aria-label="Dossier parent"
            disabled={path === "/"}
            onClick={() => navigate(parentPath(path))}
          >
            <Icon name="arrow" size={16} />
          </button>
        </div>
        <span className="file-address mono" title={path}>
          {shortPath(path)}
        </span>
        <button
          className="icon-button"
          aria-label={tiles ? "Afficher en liste" : "Afficher les aperçus"}
          aria-pressed={tiles}
          onClick={() => setTiles((value) => !value)}
        >
          <Icon name={tiles ? "note" : "grid"} size={17} />
        </button>
      </div>
      <div className="file-layout">
        <nav className="file-places" aria-label="Emplacements">
          <span className="eyebrow">EMPLACEMENTS</span>
          {[
            { path: HOME, name: "Personnel", icon: "home" },
            { path: `${HOME}/projets`, name: "Projets", icon: "folder" },
            { path: `${HOME}/documents`, name: "Documents", icon: "file" },
            { path: `${HOME}/musique`, name: "Musique", icon: "music" },
            { path: "/applications", name: "Applications", icon: "grid" },
          ].map((place) => (
            <button
              key={place.path}
              aria-current={path === place.path ? "location" : undefined}
              onClick={() => navigate(place.path)}
            >
              <Icon name={place.icon as IconName} size={16} />
              {place.name}
            </button>
          ))}
          <div className="file-volume">
            <span className="storage-line" />
            <span className="mono">ARCHIVES / LUCAS</span>
            <small>Collection en lecture seule</small>
          </div>
        </nav>
        <div className="file-main">
          <div className="file-search">
            <label className="search-field">
              <Icon name="search" size={15} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filtrer ce dossier…"
                aria-label="Filtrer les fichiers"
              />
            </label>
          </div>
          <div
            className={`file-entries app-scroll${tiles ? " file-tiles" : ""}`}
          >
            {entries.map((file) => (
              <button
                key={file.path}
                className={`file-entry${selected?.path === file.path ? " selected" : ""}`}
                onClick={() => open(file)}
                onDoubleClick={() => open(file)}
              >
                <span className={`file-symbol kind-${file.kind}`}>
                  {tiles && file.kind === "image" ? (
                    <img src={file.url} alt="" loading="lazy" />
                  ) : (
                    <Icon name={fileIcon[file.kind]} size={tiles ? 30 : 19} />
                  )}
                </span>
                <span className="filename">{file.name}</span>
                <span className="file-kind mono">{typeLabel[file.kind]}</span>
                {file.kind === "folder" && <Icon name="next" size={13} />}
              </button>
            ))}
            {!entries.length && (
              <p className="empty-file">
                Aucun fichier ne correspond à votre recherche.
              </p>
            )}
          </div>
          {projectId && (
            <button
              className="file-read-article"
              onClick={() => openApp("fanzine", projectId)}
            >
              <Icon name="book" size={17} /> Lire ce projet dans Folio{" "}
              <Icon name="arrow" size={16} />
            </button>
          )}
        </div>
        {selected && (
          <aside className="file-preview app-scroll">
            <div className="preview-heading">
              <span className="eyebrow">APERÇU</span>
              <button
                className="icon-button"
                aria-label="Fermer l’aperçu"
                onClick={() => setSelected(null)}
              >
                <Icon name="close" size={16} />
              </button>
            </div>
            <strong className="preview-filename">{selected.name}</strong>
            {selected.kind === "text" && <pre>{selected.content}</pre>}
            {selected.kind === "image" && (
              <>
                <img
                  className="preview-image"
                  src={selected.url}
                  alt={`Capture : ${selected.name}`}
                />
                <a
                  className="text-button"
                  href={selected.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Voir en grand <Icon name="external" size={14} />
                </a>
              </>
            )}
            {(selected.kind === "pdf" || selected.kind === "link") && (
              <div className="file-link-preview">
                <Icon
                  name={selected.kind === "pdf" ? "file" : "external"}
                  size={44}
                />
                <p>
                  {selected.kind === "pdf"
                    ? "Le CV original de Lucas Sangkhavongs."
                    : selected.url}
                </p>
                <a
                  className="primary-button"
                  href={selected.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ouvrir {selected.kind === "pdf" ? "le PDF" : "le lien"}{" "}
                  <Icon name="external" size={15} />
                </a>
                {selected.kind === "pdf" && (
                  <a className="text-button" href={selected.url} download>
                    Télécharger <Icon name="download" size={15} />
                  </a>
                )}
              </div>
            )}
          </aside>
        )}
      </div>
      <footer className="app-statusbar">
        <span>
          {entries.length} élément{entries.length !== 1 ? "s" : ""}
          {selected ? ` · ${selected.name}` : ""}
        </span>
        <span>ARCHIVES ORIGINALES</span>
      </footer>
    </div>
  );
}
