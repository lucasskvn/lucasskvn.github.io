import { useEffect, useState } from "react";
import SEO from './components/SEO';

interface RadioPlayerProps { lang: 'fr' | 'en' }

export default function RadioPlayer({ lang }: RadioPlayerProps) {
  const [track, setTrack] = useState<string>("");

  useEffect(() => {
    const fetchTrack = () => {
      fetch("https://webradio.lucasskvn.duckdns.org/status-json.xsl")
        .then(res => res.json())
        .then(data => {
          let title = "";
          if (data?.icestats?.source) {
            if (Array.isArray(data.icestats.source)) {
              title = data.icestats.source[0]?.title || "";
            } else {
              title = data.icestats.source.title || "";
            }
          }
          setTrack(title);
        })
        .catch(() => setTrack(""));
    };
    fetchTrack();
    const interval = setInterval(fetchTrack, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container fade-in" style={{ textAlign: "center" }}>
      <SEO
        title="Webradio"
        description={lang === 'fr' ? 'Écouter la webradio en direct' : 'Listen to the webradio live'}
        path="/radio"
      />
      <h1 className="title">{lang === 'fr' ? 'Lecteur Webradio' : 'Webradio Player'}</h1>
      <div style={{ marginBottom: 16, fontWeight: "bold", color: "var(--text-secondary)" }}>
        {track
          ? (lang === 'fr' ? `En cours : ${track}` : `Now playing: ${track}`)
          : (lang === 'fr' ? 'Titre inconnu' : 'Unknown title')}
      </div>
      <audio controls style={{ width: "100%", maxWidth: 400 }}>
        <source src="https://webradio.lucasskvn.duckdns.org/stream.mp3" type="audio/mpeg" />
        {lang === 'fr'
          ? "Votre navigateur ne supporte pas l'élément audio."
          : "Your browser does not support the audio element."}
      </audio>
    </div>
  );
}
