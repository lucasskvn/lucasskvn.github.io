import { useEffect, useState } from "react";

export default function RadioPlayer() {
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
    <div style={{ padding: "2rem", color: "#fff", textAlign: "center" }}>
      <h1>Webradio Player</h1>
      <div style={{ marginBottom: 16, fontWeight: "bold" }}>
        {track ? `En cours : ${track}` : "Titre inconnu"}
      </div>
      <audio controls style={{ width: "100%", maxWidth: 400 }}>
        <source src="https://webradio.lucasskvn.duckdns.org/stream.mp3" type="audio/mpeg" />
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
    </div>
  );
}
