import { useEffect, useState } from "react";
import portrait from "../assets/profile.jpg";
import { gear, categories } from "../data/setup";
import { Icon } from "../components/Icon";
import { useSystem } from "../os/SystemContext";

export function Profile({
  target,
  requestId,
}: {
  target?: string;
  requestId?: number;
}) {
  const [tab, setTab] = useState(
    target === "atelier" || target === "contact" ? target : "portrait",
  );
  const { openApp, notify } = useSystem();
  useEffect(() => {
    if (target === "atelier" || target === "contact" || target === "portrait")
      setTab(target);
  }, [target, requestId]);
  return (
    <div className="profile-app app-column">
      <div className="app-toolbar">
        <div className="segmented">
          {["portrait", "atelier", "contact"].map((name) => (
            <button
              key={name}
              aria-pressed={tab === name}
              onClick={() => setTab(name)}
            >
              {name === "portrait"
                ? "Portrait"
                : name === "atelier"
                  ? "L’atelier"
                  : "Contact"}
            </button>
          ))}
        </div>
        <span className="toolbar-meta">FICHE PERSONNELLE</span>
      </div>
      <div className="app-scroll profile-scroll">
        {tab === "portrait" && (
          <>
            <div className="profile-hero">
              <div>
                <span className="eyebrow">DÉVELOPPEMENT · LYON, FRANCE</span>
                <h1>
                  Lucas
                  <br />
                  Sangkhavongs<span>.</span>
                </h1>
                <span className="profile-handle mono">@lucasskvn</span>
              </div>
              <div className="portrait-frame">
                <img src={portrait} alt="Photo de profil de Lucas" />
                <span className="mono">L.S. / PORTRAIT</span>
              </div>
            </div>
            <p className="profile-intro">
              J’aime comprendre comment les choses fonctionnent.
              <br />
              <em>Et fabriquer les miennes.</em>
            </p>
            <div className="profile-body">
              <p>
                Étudiant à EPITECH Lyon, je m’intéresse au développement, à
                Linux et aux systèmes. Je construis des outils, des jeux et des
                interfaces, avec une place particulière pour l’open source et
                l’auto-hébergement.
              </p>
              <p>
                En dehors du code : de la musique, des jeux vidéo et la
                curiosité de découvrir de nouveaux univers. Ce bureau est une
                façon de rassembler tout ça.
              </p>
            </div>
            <div className="profile-domains">
              <div>
                <span>01</span>
                <strong>Code & systèmes</strong>
                <p>
                  C, C++, Rust, Python.
                  <br />
                  Comprendre ce qui se passe dessous.
                </p>
              </div>
              <div>
                <span>02</span>
                <strong>Interfaces</strong>
                <p>
                  React, TypeScript.
                  <br />
                  Donner une forme aux idées.
                </p>
              </div>
              <div>
                <span>03</span>
                <strong>Un serveur à soi</strong>
                <p>
                  Linux, Proxmox, Docker.
                  <br />
                  Faire vivre ses propres services.
                </p>
              </div>
            </div>
            <div className="profile-actions">
              <a
                href="/CV_LucasSangkhavongs.pdf"
                download
                className="primary-button"
              >
                Télécharger mon CV <Icon name="download" size={17} />
              </a>
              <button
                className="secondary-button"
                onClick={() => openApp("fanzine", "index")}
              >
                Explorer les projets <Icon name="arrow" size={17} />
              </button>
            </div>
          </>
        )}
        {tab === "atelier" && (
          <>
            <span className="eyebrow">LES OUTILS DU QUOTIDIEN</span>
            <h1>L’atelier.</h1>
            <p className="section-intro">
              Mon environnement de travail, du shell au homelab.
            </p>
            <div className="setup-categories">
              {categories.map((category) => (
                <section key={category.key}>
                  <h2>{category.label.fr}</h2>
                  <div>
                    {gear[category.key].map((item) => (
                      <div className="setup-row" key={item.name}>
                        <strong>
                          {"link" in item ? (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {item.name} ↗
                            </a>
                          ) : (
                            item.name
                          )}
                        </strong>
                        <span>{item.desc.fr}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </>
        )}
        {tab === "contact" && (
          <div className="contact-sheet">
            <span className="eyebrow">LA CONVERSATION CONTINUE</span>
            <h1>On se parle ?</h1>
            <p>Un projet, une idée ou simplement quelque chose à partager.</p>
            <a
              className="contact-email"
              href="mailto:lucas.sangkhavongs@epitech.eu"
            >
              lucas.sangkhavongs
              <br />
              @epitech.eu <Icon name="arrow" size={30} />
            </a>
            <button
              className="text-button"
              onClick={() => {
                void navigator.clipboard
                  .writeText("lucas.sangkhavongs@epitech.eu")
                  .then(() => notify("Adresse e-mail copiée."))
                  .catch(() =>
                    notify("Sélectionnez l’adresse pour la copier."),
                  );
              }}
            >
              <Icon name="copy" size={16} /> Copier l’adresse
            </button>
            <div className="contact-links">
              <a
                href="https://github.com/lucasskvn"
                target="_blank"
                rel="noreferrer"
              >
                <span>01 / CODE</span>
                <strong>GitHub</strong>
                <Icon name="external" size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/lucas-sangkhavongs/"
                target="_blank"
                rel="noreferrer"
              >
                <span>02 / PARCOURS</span>
                <strong>LinkedIn</strong>
                <Icon name="external" size={20} />
              </a>
              <a
                href="https://chat.2bananas4monkeys.org/"
                target="_blank"
                rel="noreferrer"
              >
                <span>03 / SUR INVITATION</span>
                <strong>ButterflyNet</strong>
                <Icon name="external" size={20} />
              </a>
            </div>
          </div>
        )}
      </div>
      <footer className="app-statusbar">
        <span>LUCAS SANGKHAVONGS</span>
        <span>EPITECH / LYON</span>
      </footer>
    </div>
  );
}
