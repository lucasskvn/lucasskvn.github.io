import { useEffect, useState } from "react";
import { apps, appInfo } from "./os/registry";
import { SystemProvider, useSystem } from "./os/SystemContext";
import { RadioProvider, useRadio } from "./os/RadioContext";
import { AppWindow } from "./components/AppWindow";
import { Icon, Mark } from "./components/Icon";
import { Launcher } from "./components/Launcher";
import ErrorBoundary from "./components/ErrorBoundary";
import { Fanzine } from "./apps/Fanzine";
import { Music } from "./apps/Music";
import { Files } from "./apps/Files";
import { Terminal } from "./apps/Terminal";
import { Profile } from "./apps/Profile";
import { Settings } from "./apps/Settings";
import { Notebook } from "./apps/Notebook";
import "./App.css";

function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);
  return (
    <time dateTime={now.toISOString()} className="system-clock">
      <span>
        {now.toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "short",
          timeZone: "Europe/Paris",
        })}
      </span>
      <strong>
        {now.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Paris",
        })}
      </strong>
    </time>
  );
}
function Desktop() {
  const {
    state,
    dispatch,
    openApp,
    preferences,
    setPreferences,
    launcher,
    setLauncher,
    toast,
    mobile,
  } = useSystem();
  const radio = useRadio();
  const active = state.active ? appInfo(state.active) : undefined;
  useEffect(() => {
    document.documentElement.dataset.theme = preferences.theme;
    document.documentElement.dataset.accent = preferences.accent;
    document.documentElement.dataset.motion = preferences.reducedMotion
      ? "reduced"
      : "normal";
  }, [preferences]);
  useEffect(() => {
    document.title = active
      ? `${active.name} — INTERVALLE / Lucas Sangkhavongs`
      : "INTERVALLE — Lucas Sangkhavongs";
  }, [active]);
  return (
    <div className={`os-desktop${preferences.grid ? " has-atmosphere" : ""}`}>
      <a className="skip-link" href="#desktop-apps">
        Aller aux applications
      </a>
      <header className="system-bar">
        <button
          className="system-brand"
          aria-label="Afficher le bureau"
          title="Afficher le bureau · Alt+Échap"
          onClick={() => dispatch({ type: "desktop" })}
        >
          <Mark />
          <span>INTERVALLE</span>
          <small>01</small>
        </button>
        <span className="system-owner">
          L’ESPACE PERSONNEL DE <strong>LUCAS SANGKHAVONGS</strong>
        </span>
        <div className="system-right">
          <button
            className="world-switch"
            aria-label={
              preferences.theme === "fog"
                ? "Passer dans l’Autre Monde"
                : "Revenir au Brouillard"
            }
            title={
              preferences.theme === "fog"
                ? "Passer dans l’Autre Monde"
                : "Revenir au Brouillard"
            }
            onClick={() =>
              setPreferences({
                theme: preferences.theme === "fog" ? "otherworld" : "fog",
              })
            }
          >
            <Icon
              name={preferences.theme === "fog" ? "moon" : "sun"}
              size={15}
            />
            <span>
              {preferences.theme === "fog" ? "Brouillard" : "Autre Monde"}
            </span>
          </button>
          <button
            className="system-search"
            aria-label="Ouvrir le lanceur"
            title="Lanceur · Ctrl+K"
            onClick={() => setLauncher(true)}
          >
            <Icon name="search" size={16} />
            <span>Rechercher</span>
            <kbd>Ctrl K</kbd>
          </button>
          <Clock />
        </div>
      </header>
      <nav
        id="desktop-apps"
        tabIndex={-1}
        className="app-rail"
        aria-label="Applications du bureau"
      >
        <button
          className="rail-launcher"
          aria-label="Toutes les applications"
          title="Lanceur · Ctrl+K"
          onClick={() => setLauncher(true)}
        >
          <Icon name="grid" size={24} />
          <span>Ouvrir</span>
        </button>
        <div className="rail-divider" />
        {apps.map((app) => {
          const window = state.windows.find((window) => window.id === app.id);
          return (
            <button
              key={app.id}
              className={`rail-app${state.active === app.id ? " active" : ""}${window ? " running" : ""}`}
              aria-label={`Ouvrir ${app.name}`}
              aria-pressed={state.active === app.id}
              title={`${app.name} · Alt+${app.shortcut}`}
              onClick={() => {
                if (state.active === app.id && !mobile)
                  dispatch({ type: "minimize", id: app.id });
                else openApp(app.id);
              }}
            >
              <Icon name={app.icon} size={25} />
              <span>{app.name}</span>
              <i aria-hidden="true" />
            </button>
          );
        })}
        <span className="rail-bottom mono">LS / FR</span>
      </nav>
      <main className="workspace" aria-label="Bureau INTERVALLE">
        <div
          className="desktop-welcome"
          inert={mobile && state.active !== null}
        >
          <div className="desktop-edition mono">
            <span>ESPACES PERSONNELS</span>
            <span>VOL. 01 — LYON, FR</span>
          </div>
          <div className="desktop-copy">
            <span className="eyebrow">BIENVENUE CHEZ MOI.</span>
            <h1>
              Entre le code
              <br />& le reste<span>↗</span>
            </h1>
            <p>
              Je suis Lucas, étudiant à EPITECH Lyon.
              <br />
              Développeur par curiosité, explorateur le reste du temps.
            </p>
            <div className="desktop-links">
              <button onClick={() => openApp("fanzine")}>
                Les projets <Icon name="arrow" size={17} />
              </button>
              <button onClick={() => openApp("profil")}>
                Faire connaissance <Icon name="arrow" size={17} />
              </button>
            </div>
          </div>
          <button
            className="desktop-readme"
            onClick={() => openApp("fichiers", "/home/lucas/bienvenue.txt")}
          >
            <Icon name="file" size={31} />
            <span>commencer_ici.txt</span>
            <small>Quelques repères pour explorer.</small>
          </button>
          <div className="desktop-corner mono">
            UN SYSTÈME FICTIF.
            <br />
            DE VRAIS PROJETS.
            <br />
            <span>FAIT AVEC CURIOSITÉ.</span>
          </div>
        </div>
        {state.windows.map((window) => (
          <AppWindow key={window.id} window={window}>
            <ErrorBoundary compact>
              {window.id === "fanzine" ? (
                <Fanzine target={window.target} requestId={window.launch} />
              ) : window.id === "musique" ? (
                <Music target={window.target} requestId={window.launch} />
              ) : window.id === "fichiers" ? (
                <Files target={window.target} requestId={window.launch} />
              ) : window.id === "terminal" ? (
                <Terminal />
              ) : window.id === "profil" ? (
                <Profile target={window.target} requestId={window.launch} />
              ) : window.id === "reglages" ? (
                <Settings />
              ) : (
                <Notebook />
              )}
            </ErrorBoundary>
          </AppWindow>
        ))}
      </main>
      <footer className="system-footer">
        <div className="session-label">
          <i /> SESSION INVITÉ<span> / </span>
          <span>PRENEZ LE TEMPS D’EXPLORER.</span>
        </div>
        <div className="task-strip" aria-label="Applications ouvertes">
          {state.windows.map((window) => (
            <button
              key={window.id}
              className={`${state.active === window.id ? "active " : ""}${window.minimized ? "minimized" : ""}`}
              aria-label={`Afficher ${appInfo(window.id).name}`}
              onClick={() => openApp(window.id)}
            >
              <Icon name={appInfo(window.id).icon} size={12} />
              {appInfo(window.id).name}
              {window.minimized && <span>—</span>}
            </button>
          ))}
        </div>
        <button className="system-audio" onClick={() => openApp("musique")}>
          <Icon name="music" size={12} />
          <span>
            {radio.status === "playing"
              ? "RADIO EN LECTURE"
              : "UN PEU DE MUSIQUE ?"}
          </span>
          {radio.status === "playing" && <i />}
        </button>
      </footer>
      {launcher && <Launcher />}
      <div
        className={`system-toast${toast ? " visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toast && (
          <>
            <Icon name="check" size={16} />
            {toast}
          </>
        )}
      </div>
    </div>
  );
}
export default function App() {
  return (
    <SystemProvider>
      <RadioProvider>
        <Desktop />
      </RadioProvider>
    </SystemProvider>
  );
}
