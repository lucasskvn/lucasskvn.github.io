import { useEffect, useState } from "react";
import { Icon } from "../components/Icon";
import { useRadio } from "../os/RadioContext";
import { useSystem } from "../os/SystemContext";
import { fetchLastfm, LASTFM_PROFILE } from "../os/lastfm";
import type { LastfmKind, LastfmPeriod, MusicItem } from "../os/lastfm";

type MusicTab = "radio" | LastfmKind;
const apiKey = import.meta.env.VITE_LASTFM_API_KEY as string | undefined;
function Artwork({ item }: { item: MusicItem }) {
  const [failed, setFailed] = useState(false);
  return item.image && !failed ? (
    <img
      src={item.image}
      alt={item.album || item.name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  ) : (
    <span className="artwork-fallback">
      <Icon name="music" size={27} />
    </span>
  );
}
export function Music({
  target,
  requestId,
}: {
  target?: string;
  requestId?: number;
}) {
  const [tab, setTab] = useState<MusicTab>("radio");
  const [period, setPeriod] = useState<LastfmPeriod>("1month");
  const [items, setItems] = useState<MusicItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [revision, setRevision] = useState(0);
  const radio = useRadio();
  const { openApp } = useSystem();
  useEffect(() => {
    if (target && ["radio", "recent", "albums", "artists"].includes(target))
      setTab(target as MusicTab);
  }, [target, requestId]);
  useEffect(() => {
    if (tab === "radio") return;
    const controller = new AbortController();
    setItems([]);
    setError(false);
    if (!apiKey || apiKey === "your_lastfm_api_key") {
      setError(true);
      setLoading(false);
      return;
    }
    const refresh = async (initial = false) => {
      if (initial) setLoading(true);
      try {
        const results = await fetchLastfm(
          tab,
          period,
          apiKey,
          AbortSignal.any([controller.signal, AbortSignal.timeout(12000)]),
        );
        if (!controller.signal.aborted) {
          setItems(results);
          setError(false);
        }
      } catch {
        if (!controller.signal.aborted) setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    void refresh(true);
    const timer = setInterval(
      () => {
        if (!document.hidden) void refresh();
      },
      tab === "recent" ? 60000 : 300000,
    );
    return () => {
      controller.abort();
      clearInterval(timer);
    };
  }, [tab, period, revision]);
  const statusText = {
    idle: "PRÊT À ÉCOUTER",
    playing: "EN LECTURE",
    paused: "EN PAUSE",
    loading: "CONNEXION…",
    error: "STATION INDISPONIBLE",
  }[radio.status];
  return (
    <div className="music-app app-column">
      <div className="music-nav" aria-label="Navigation musicale">
        {(
          [
            { id: "radio", name: "Radio" },
            { id: "recent", name: "Écoutes" },
            { id: "albums", name: "Albums" },
            { id: "artists", name: "Artistes" },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            aria-pressed={tab === item.id}
            onClick={() => setTab(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="music-scroll app-scroll">
        {tab === "radio" ? (
          <div className="radio-deck">
            <div className="radio-visual" aria-hidden="true">
              <div className="disc">
                <div className="disc-label">
                  <span>INTERVALLE</span>
                  <strong>LS</strong>
                  <span>SÉLECTION PERSONNELLE</span>
                </div>
              </div>
              <div className="radio-indicator">
                <span
                  className={
                    radio.status === "playing"
                      ? "signal-light on"
                      : "signal-light"
                  }
                />
                <span>
                  STÉRÉO
                  <br />
                  WEB RADIO
                </span>
              </div>
              <div className="radio-ticks">
                {Array.from({ length: 21 }, (_, i) => (
                  <i key={i} />
                ))}
              </div>
            </div>
            <div className="radio-caption">
              <div>
                <span className="eyebrow">LA BANDE-SON DU BUREAU</span>
                <h1>
                  Radio personnelle<span>↗</span>
                </h1>
              </div>
              <button
                className={`radio-play${radio.status === "playing" ? " playing" : ""}`}
                aria-label={
                  radio.status === "playing" || radio.status === "loading"
                    ? "Mettre la radio en pause"
                    : "Écouter la radio"
                }
                onClick={radio.toggle}
              >
                <Icon
                  name={
                    radio.status === "playing" || radio.status === "loading"
                      ? "pause"
                      : "play"
                  }
                  size={22}
                />
              </button>
            </div>
            <div className="radio-status" role="status">
              <span
                className={
                  radio.status === "playing"
                    ? "status-dot playing"
                    : "status-dot"
                }
              />
              <span>
                {radio.title && radio.status === "playing"
                  ? radio.title
                  : statusText}
              </span>
            </div>
            {radio.status === "error" && (
              <p className="radio-error">
                Le flux ne répond pas pour le moment. Vous pouvez réessayer avec
                le bouton de lecture.
              </p>
            )}
            <div className="radio-volume">
              <button
                className="icon-button"
                aria-label={
                  radio.volume === 0 ? "Rétablir le son" : "Couper le son"
                }
                onClick={() => radio.setVolume(radio.volume === 0 ? 0.65 : 0)}
              >
                <Icon name="volume" size={16} />
              </button>
              <label className="sr-only" htmlFor="radio-volume">
                Volume de la radio
              </label>
              <input
                id="radio-volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={radio.volume}
                onChange={(event) =>
                  radio.setVolume(Number(event.target.value))
                }
              />
              <span className="mono">{Math.round(radio.volume * 100)}%</span>
            </div>
            <p className="radio-description">
              Une webradio auto-hébergée avec Icecast et Liquidsoap. Lancez
              l’écoute et continuez à explorer : la musique vous accompagne
              d’une application à l’autre.
            </p>
          </div>
        ) : (
          <div className="listening-library">
            <div className="library-heading">
              <div>
                <span className="eyebrow">SNOW3945KKK / LAST.FM</span>
                <h1>
                  {tab === "recent"
                    ? "Dans les oreilles."
                    : tab === "albums"
                      ? "Sur la platine."
                      : "En bonne compagnie."}
                </h1>
              </div>
              <button
                className="icon-button"
                aria-label="Actualiser Last.fm"
                onClick={() => setRevision((value) => value + 1)}
              >
                <Icon name="refresh" size={16} />
              </button>
            </div>
            {tab !== "recent" && (
              <label className="period-select">
                Période
                <select
                  aria-label="Période des statistiques musicales"
                  value={period}
                  onChange={(event) =>
                    setPeriod(event.target.value as LastfmPeriod)
                  }
                >
                  <option value="7day">7 jours</option>
                  <option value="1month">1 mois</option>
                  <option value="3month">3 mois</option>
                  <option value="overall">Depuis toujours</option>
                </select>
              </label>
            )}
            {loading && (
              <div className="music-loading" role="status">
                Connexion à Last.fm<span>…</span>
              </div>
            )}
            {!loading && error && (
              <div className="music-unavailable">
                <Icon name="music" size={32} />
                <h2>Une petite interruption.</h2>
                <p>
                  {items.length
                    ? "La dernière actualisation a échoué. Les écoutes ci-dessous datent de la dernière connexion."
                    : "Les écoutes ne sont pas disponibles pour le moment. Mon profil musical reste accessible sur Last.fm."}
                </p>
                <a
                  href={LASTFM_PROFILE}
                  target="_blank"
                  rel="noreferrer"
                  className="text-button"
                >
                  Ouvrir mon Last.fm <Icon name="external" size={15} />
                </a>
                <button
                  className="text-button"
                  onClick={() => setRevision((value) => value + 1)}
                >
                  Réessayer <Icon name="refresh" size={14} />
                </button>
              </div>
            )}
            {!loading && !error && !items.length && (
              <p className="empty-state">Aucune écoute pour cette période.</p>
            )}
            <div
              className={tab === "albums" ? "album-library" : "track-library"}
            >
              {items.map((item, i) => (
                <a
                  className={`music-item${item.nowPlaying ? " now-playing" : ""}`}
                  key={`${item.name}-${i}`}
                  href={item.url || LASTFM_PROFILE}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="track-number mono">
                    {item.nowPlaying ? "●" : String(i + 1).padStart(2, "0")}
                  </span>
                  <Artwork item={item} />
                  <span className="track-name">
                    <strong>{item.name}</strong>
                    <small>
                      {item.artist ||
                        (tab === "artists"
                          ? `${item.plays.toLocaleString("fr-FR")} écoutes`
                          : item.album)}
                    </small>
                  </span>
                  <span className="track-meta mono">
                    {item.nowPlaying
                      ? "EN ÉCOUTE"
                      : tab !== "recent"
                        ? item.plays.toLocaleString("fr-FR")
                        : item.timestamp
                          ? new Date(item.timestamp).toLocaleDateString(
                              "fr-FR",
                              { day: "2-digit", month: "2-digit" },
                            )
                          : ""}
                  </span>
                </a>
              ))}
            </div>
            <p className="lastfm-note">
              Les écoutes et statistiques proviennent de Last.fm. Les titres
              s’ouvrent sur leur fiche musicale.
            </p>
          </div>
        )}
      </div>
      <footer className="app-statusbar">
        <button onClick={() => openApp("fanzine", "webradio")}>
          ICECAST × LIQUIDSOAP <Icon name="arrow" size={12} />
        </button>
        <a href={LASTFM_PROFILE} target="_blank" rel="noreferrer">
          LAST.FM ↗
        </a>
      </footer>
    </div>
  );
}
