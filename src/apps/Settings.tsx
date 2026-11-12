import { Icon, Mark } from "../components/Icon";
import { useSystem } from "../os/SystemContext";

export function Settings() {
  const { preferences, setPreferences, dispatch, viewport, notify } =
    useSystem();
  return (
    <div className="settings-app app-column">
      <div className="app-scroll settings-scroll">
        <span className="eyebrow">FAITES COMME CHEZ VOUS</span>
        <h1>À votre rythme.</h1>
        <section className="settings-section">
          <h2>Apparence</h2>
          <div className="theme-options">
            {(["paper", "night"] as const).map((theme) => (
              <button
                key={theme}
                className={`theme-choice theme-sample-${theme}`}
                aria-pressed={preferences.theme === theme}
                onClick={() => setPreferences({ theme })}
              >
                <span className="theme-preview">
                  <span />
                  <i />
                  <b />
                </span>
                <span>
                  {theme === "paper" ? "Papier" : "Après minuit"}
                  {preferences.theme === theme && (
                    <Icon name="check" size={16} />
                  )}
                </span>
              </button>
            ))}
          </div>
          <div className="setting-row">
            <div>
              <strong>Couleur d’accent</strong>
              <p>Une petite signature dans l’interface.</p>
            </div>
            <div className="accent-options">
              {(
                [
                  { id: "vermilion", name: "Vermillon" },
                  { id: "blue", name: "Encre bleue" },
                  { id: "moss", name: "Mousse" },
                ] as const
              ).map((accent) => (
                <button
                  key={accent.id}
                  className={`swatch swatch-${accent.id}`}
                  aria-label={accent.name}
                  title={accent.name}
                  aria-pressed={preferences.accent === accent.id}
                  onClick={() => setPreferences({ accent: accent.id })}
                >
                  {preferences.accent === accent.id && (
                    <Icon name="check" size={16} />
                  )}
                </button>
              ))}
            </div>
          </div>
          <label className="setting-row">
            <span>
              <strong>Trame du bureau</strong>
              <small>Un quadrillage discret pour se repérer.</small>
            </span>
            <input
              type="checkbox"
              role="switch"
              checked={preferences.grid}
              onChange={(event) =>
                setPreferences({ grid: event.target.checked })
              }
            />
          </label>
          <label className="setting-row">
            <span>
              <strong>Réduire les mouvements</strong>
              <small>
                Les préférences de votre système sont aussi respectées.
              </small>
            </span>
            <input
              type="checkbox"
              role="switch"
              checked={preferences.reducedMotion}
              onChange={(event) =>
                setPreferences({ reducedMotion: event.target.checked })
              }
            />
          </label>
        </section>
        <section className="settings-section">
          <h2>Organisation</h2>
          <div className="setting-row">
            <div>
              <strong>Ranger les fenêtres</strong>
              <p>Replacer les applications sur le bureau.</p>
            </div>
            <button
              className="secondary-button"
              onClick={() => {
                dispatch({ type: "arrange", viewport });
                notify("Les fenêtres ont retrouvé leur place.");
              }}
            >
              Ranger <Icon name="grid" size={16} />
            </button>
          </div>
        </section>
        <section className="settings-section">
          <h2>Les raccourcis utiles</h2>
          <dl className="shortcuts">
            <div>
              <dt>Lanceur & recherche</dt>
              <dd>
                <kbd>Ctrl</kbd> + <kbd>K</kbd>
              </dd>
            </div>
            <div>
              <dt>Ouvrir une application</dt>
              <dd>
                <kbd>Alt</kbd> + <kbd>1…7</kbd>
              </dd>
            </div>
            <div>
              <dt>Retrouver le bureau</dt>
              <dd>
                <kbd>Alt</kbd> + <kbd>Échap</kbd>
              </dd>
            </div>
            <div>
              <dt>Agrandir une fenêtre</dt>
              <dd>Double-clic sur son titre</dd>
            </div>
            <div>
              <dt>Redimensionner au clavier</dt>
              <dd>Tab vers le coin, puis ↑ ↓ ← →</dd>
            </div>
          </dl>
        </section>
        <div className="system-signature">
          <Mark />
          <div>
            <strong>INTERVALLE / 01</strong>
            <p>Un espace personnel de Lucas Sangkhavongs.</p>
            <small>Préférences enregistrées dans ce navigateur.</small>
          </div>
        </div>
      </div>
    </div>
  );
}
