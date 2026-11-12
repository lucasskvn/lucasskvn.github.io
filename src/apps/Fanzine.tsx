import { useEffect, useRef, useState } from "react";
import { projects, projectById } from "../data/projects";
import { Icon } from "../components/Icon";
import { useSystem } from "../os/SystemContext";
import { HOME } from "../os/filesystem";

const readingOrder = [
  "wolf3d",
  "pomodocus",
  "rmrf",
  "butterflynet",
  "staarscreaam",
  "dotfiles",
  ...projects
    .filter(
      (project) =>
        ![
          "wolf3d",
          "pomodocus",
          "rmrf",
          "butterflynet",
          "staarscreaam",
          "dotfiles",
        ].includes(project.id),
    )
    .map((project) => project.id),
];
const editorial: Record<string, string> = {
  wolf3d:
    "Le point de départ : retrouver la sensation de Wolfenstein 3D avec du C et CSFML. Une façon très concrète de faire se rencontrer programmation et jeu vidéo. La capture ci-contre est celle du projet original.",
  pomodocus:
    "Dix heures de hackathon pour transformer une méthode de travail en terrain de jeu. Un cycle se termine, la collection grandit : les dinosaures donnent un visage au temps passé à se concentrer.",
  rmrf: "La sauvegarde est une affaire de confiance. Ici, les données sont découpées, identifiées et compressées ; la déduplication évite de conserver plusieurs fois les mêmes blocs. Le projet relie le travail sur les systèmes à un besoin concret de homelab.",
  butterflynet:
    "Avoir un petit endroit à soi sur Internet. ButterflyNet revient à un protocole simple, IRC, pour des conversations privées entre amis. Le serveur est hébergé sur un VPS OVH, avec TLS et un accès sur invitation.",
  staarscreaam:
    "Faire de l’écoute un environnement que l’on peut s’approprier. Une application musicale en Rust, construite autour de modules et de la personnalisation, avec playlists, égaliseur et plusieurs formats audio.",
  dotfiles:
    "Un environnement de développement se construit aussi dans ses détails. Ces configurations rassemblent les réglages de mes outils, du shell à Neovim, pour les retrouver d’une machine à l’autre.",
};

export function Fanzine({
  target,
  requestId,
}: {
  target?: string;
  requestId?: number;
}) {
  const { openApp, bookmarks, toggleBookmark, notify } = useSystem();
  const [page, setPage] = useState(
    target && projectById(target) ? target : "cover",
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tout");
  const [gallery, setGallery] = useState(0);
  const scroll = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (target === "index" || target === "bookmarks" || target === "cover")
      setPage(target);
    else if (target && projectById(target)) setPage(target);
  }, [target, requestId]);
  useEffect(() => {
    scroll.current?.scrollTo(0, 0);
    setGallery(0);
  }, [page]);
  const project = projectById(page);
  const pageNumber = project ? readingOrder.indexOf(project.id) + 1 : 0;
  const move = (direction: number) => {
    const next = pageNumber + direction;
    setPage(
      next <= 0
        ? "cover"
        : readingOrder[Math.min(readingOrder.length - 1, next - 1)],
    );
  };
  const filtered = readingOrder
    .map((id) => projectById(id)!)
    .filter(
      (project) =>
        (page !== "bookmarks" || bookmarks.includes(project.id)) &&
        (category === "Tout" || project.category === category) &&
        `${project.name} ${project.description} ${project.technologies.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    );
  const cover = projectById("wolf3d")!;
  return (
    <div className="fanzine app-column">
      <div className="app-toolbar magazine-toolbar">
        <button className="magazine-logotype" onClick={() => setPage("cover")}>
          folio<span>®</span>
        </button>
        <div className="segmented" aria-label="Navigation du fanzine">
          <button
            aria-pressed={page === "cover"}
            onClick={() => setPage("cover")}
          >
            Couverture
          </button>
          <button
            aria-pressed={page === "index"}
            onClick={() => setPage("index")}
          >
            Sommaire
          </button>
          <button
            className="bookmark-tab"
            aria-label={`Marque-pages (${bookmarks.length})`}
            aria-pressed={page === "bookmarks"}
            onClick={() => setPage("bookmarks")}
          >
            <Icon name="bookmark" size={14} />
            <span>{bookmarks.length}</span>
          </button>
        </div>
        <span className="toolbar-meta">ÉDITION PERSONNELLE · 01</span>
      </div>
      <div ref={scroll} className="magazine-scroll app-scroll">
        {page === "cover" && (
          <div className="magazine-cover">
            <div className="editorial-eyebrow">
              <span>CODE, SYSTÈMES & AUTRES CURIOSITÉS</span>
              <span>PAR LUCAS SANGKHAVONGS</span>
            </div>
            <div className="cover-heading">
              <h1>
                Faire, par
                <br />
                <em>curiosité.</em>
              </h1>
              <div className="issue-number">
                01
                <span>
                  VOLUME
                  <br />
                  PERSONNEL
                </span>
              </div>
            </div>
            <div className="cover-grid">
              <button
                className="cover-feature"
                onClick={() => setPage("wolf3d")}
                aria-label="Lire l’article Wolf3D"
              >
                <div className="cover-image">
                  <img
                    src={cover.image}
                    alt="Capture originale de Wolf3D, jeu en C et CSFML"
                  />
                  <span className="image-stamp">DANS LE VISEUR</span>
                  <span className="image-arrow">
                    <Icon name="arrow" size={25} />
                  </span>
                </div>
                <div className="cover-caption">
                  <span>01 / JEUX & EXPÉRIMENTATIONS</span>
                  <h2>Une autre perspective.</h2>
                  <p>Wolf3D — construire un monde en C.</p>
                </div>
              </button>
              <div className="cover-sidebar">
                <p className="editor-note">
                  Des projets que j’imagine,
                  <br />
                  des outils que je façonne,
                  <br />
                  des choses que j’apprends.
                </p>
                <div className="mini-contents-title">
                  DANS CE NUMÉRO <span>↙</span>
                </div>
                {["pomodocus", "rmrf", "butterflynet"].map((id, index) => {
                  const project = projectById(id)!;
                  return (
                    <button
                      className="mini-article"
                      key={id}
                      onClick={() => setPage(id)}
                    >
                      <span className="mono">0{index + 2}</span>
                      <span>
                        <strong>{project.name}</strong>
                        <small>{project.headline}</small>
                      </span>
                      <Icon name="arrow" size={16} />
                    </button>
                  );
                })}
                <button
                  className="text-button contents-link"
                  onClick={() => setPage("index")}
                >
                  Les {projects.length} projets <Icon name="arrow" size={16} />
                </button>
              </div>
            </div>
            <div className="cover-colophon">
              <span>UN JOURNAL DE FABRICATION, SANS ORDRE D’IMPORTANCE.</span>
              <span>Folio / {projects.length} histoires</span>
            </div>
          </div>
        )}
        {(page === "index" || page === "bookmarks") && (
          <div className="magazine-index">
            <div className="index-heading">
              <div>
                <span className="eyebrow">LES ARCHIVES PERSONNELLES</span>
                <h1>
                  {page === "bookmarks"
                    ? "À garder."
                    : "Tout commence\nquelque part."}
                </h1>
              </div>
              <span className="index-count">
                {String(filtered.length).padStart(2, "0")}
              </span>
            </div>
            <div className="index-filters">
              <label className="search-field">
                <Icon name="search" size={16} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Chercher un projet, un langage…"
                  aria-label="Rechercher dans le fanzine"
                />
              </label>
              <select
                aria-label="Catégorie de projet"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {[
                  "Tout",
                  ...new Set(projects.map((project) => project.category)),
                ].map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="contents-list">
              {filtered.map((project) => (
                <button key={project.id} onClick={() => setPage(project.id)}>
                  <span className="content-number mono">
                    {String(readingOrder.indexOf(project.id) + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>
                  <span className="content-name">
                    <strong>{project.name}</strong>
                    <small>{project.headline}</small>
                  </span>
                  <span className="content-category mono">
                    {project.category}
                  </span>
                  <Icon name="arrow" size={20} />
                </button>
              ))}
            </div>
            {!filtered.length && (
              <div className="empty-state">
                <Icon name="bookmark" size={34} />
                <h2>
                  {page === "bookmarks"
                    ? "Une place pour vos découvertes."
                    : "Aucun projet trouvé."}
                </h2>
                <p>
                  {page === "bookmarks"
                    ? "Utilisez le marque-page dans un article pour le retrouver ici."
                    : "Essayez un autre mot ou une autre catégorie."}
                </p>
                <button
                  className="text-button"
                  onClick={() => {
                    setPage("index");
                    setCategory("Tout");
                    setQuery("");
                  }}
                >
                  Voir tous les projets <Icon name="arrow" size={16} />
                </button>
              </div>
            )}
          </div>
        )}
        {project && (
          <article className="magazine-article">
            <div className="article-kicker">
              <button className="text-button" onClick={() => setPage("index")}>
                <Icon name="back" size={14} /> Sommaire
              </button>
              <span className="mono">
                {project.category.toUpperCase()} /{" "}
                {String(pageNumber).padStart(2, "0")}
              </span>
              <button
                className={`icon-button${bookmarks.includes(project.id) ? " is-saved" : ""}`}
                aria-label={
                  bookmarks.includes(project.id)
                    ? "Retirer le marque-page"
                    : "Ajouter un marque-page"
                }
                aria-pressed={bookmarks.includes(project.id)}
                onClick={() => toggleBookmark(project.id)}
              >
                <Icon name="bookmark" size={18} />
              </button>
            </div>
            <div className="article-heading">
              <span className="eyebrow">{project.name}</span>
              <h1>{project.headline}</h1>
              <p className="article-lead">{project.description}</p>
            </div>
            <figure className="project-figure">
              <button
                aria-label={`Voir la capture de ${project.name} dans Fichiers`}
                onClick={() =>
                  openApp(
                    "fichiers",
                    `${HOME}/projets/${project.id}/capture-${gallery + 1}.image`,
                  )
                }
              >
                <img
                  src={project.gallery[gallery] ?? project.image}
                  alt={`Capture originale de ${project.name}${project.gallery.length > 1 ? ` — vue ${gallery + 1}` : ""}`}
                  loading="lazy"
                />
              </button>
              <figcaption>
                <span>ARCHIVE ORIGINALE / {project.name}</span>
                {project.gallery.length > 1 && (
                  <div className="gallery-controls">
                    <button
                      aria-label="Capture précédente"
                      disabled={gallery === 0}
                      onClick={() => setGallery((index) => index - 1)}
                    >
                      <Icon name="back" size={14} />
                    </button>
                    <span>
                      {gallery + 1} / {project.gallery.length}
                    </span>
                    <button
                      aria-label="Capture suivante"
                      disabled={gallery === project.gallery.length - 1}
                      onClick={() => setGallery((index) => index + 1)}
                    >
                      <Icon name="next" size={14} />
                    </button>
                  </div>
                )}
              </figcaption>
            </figure>
            <div className="article-copy">
              <div>
                <span className="eyebrow">LE PROJET</span>
                <p>{editorial[project.id] ?? project.details}</p>
                {editorial[project.id] && <p>{project.details}</p>}
              </div>
              <aside>
                <span className="eyebrow">LA BOÎTE À OUTILS</span>
                <ul className="technology-list">
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
                <span className="source-state">
                  {project.private
                    ? "Code source privé"
                    : "Projet personnel / archive"}
                </span>
              </aside>
            </div>
            <div className="article-actions">
              {project.url &&
                !project.private &&
                (project.url === "/radio" ? (
                  <button
                    className="primary-button"
                    onClick={() => openApp("musique", "radio")}
                  >
                    Écouter la radio <Icon name="radio" size={17} />
                  </button>
                ) : (
                  <a
                    className="primary-button"
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.url.includes("github.com")
                      ? "Voir le code"
                      : "Visiter le projet"}{" "}
                    <Icon name="external" size={16} />
                  </a>
                ))}
              <button
                className="secondary-button"
                onClick={() =>
                  openApp("fichiers", `${HOME}/projets/${project.id}`)
                }
              >
                <Icon name="folder" size={16} /> Ouvrir les fichiers
              </button>
              <button
                className="icon-button"
                aria-label="Copier le lien de l’article"
                onClick={() => {
                  const url = new URL(window.location.href);
                  url.hash = `/fanzine/${project.id}`;
                  void navigator.clipboard
                    .writeText(url.href)
                    .then(() => notify("Lien de l’article copié."))
                    .catch(() =>
                      notify("La copie est indisponible dans ce navigateur."),
                    );
                }}
              >
                <Icon name="copy" size={17} />
              </button>
            </div>
          </article>
        )}
      </div>
      <footer className="app-statusbar magazine-footer">
        <span>FOLIO — LE FANZINE DE LUCAS</span>
        <div>
          <button
            aria-label="Article précédent"
            disabled={!pageNumber}
            onClick={() => move(-1)}
          >
            <Icon name="back" size={14} />
          </button>
          <span>
            {String(pageNumber).padStart(2, "0")} / {projects.length}
          </span>
          <button
            aria-label="Article suivant"
            disabled={pageNumber === readingOrder.length}
            onClick={() => move(1)}
          >
            <Icon name="next" size={14} />
          </button>
        </div>
      </footer>
    </div>
  );
}
