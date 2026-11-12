import { useEffect, useState } from "react";
import { Icon } from "../components/Icon";
import { useSystem } from "../os/SystemContext";
import { readStored, saveStored } from "../os/storage";

const initialNote =
  "Notes de passage\n\nUn projet à retenir, une idée à garder…\nCet espace est le vôtre.\n";
export function Notebook() {
  const { notify } = useSystem();
  const [text, setText] = useState(() => {
    const value = readStored<unknown>("notebook", initialNote);
    return typeof value === "string" ? value : initialNote;
  });
  const [saved, setSaved] = useState(true);
  useEffect(() => {
    setSaved(saveStored("notebook", text));
  }, [text]);
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "notes-intervalle.txt";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify("Vos notes ont été exportées.");
  };
  return (
    <div className="notebook-app app-column">
      <div className="app-toolbar">
        <span className="mono">NOTES DE PASSAGE / .TXT</span>
        <div className="toolbar-buttons">
          <button
            className="text-button"
            onClick={() =>
              setText(
                (value) =>
                  value +
                  "\n" +
                  new Date().toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }) +
                  "\n",
              )
            }
          >
            Insérer la date
          </button>
          <button
            className="icon-button"
            aria-label="Exporter les notes"
            title="Exporter les notes"
            onClick={download}
          >
            <Icon name="download" size={18} />
          </button>
        </div>
      </div>
      <label className="sr-only" htmlFor="notebook-text">
        Vos notes personnelles
      </label>
      <textarea
        id="notebook-text"
        className="notebook-paper"
        value={text}
        onChange={(event) => setText(event.target.value)}
        spellCheck
        placeholder="Une idée à garder…"
      />
      <footer className="app-statusbar">
        <span>
          {saved
            ? "ENREGISTRÉ DANS CE NAVIGATEUR"
            : "NON ENREGISTRÉ — EXPORTEZ VOS NOTES"}
        </span>
        <span>{text.trim() ? text.trim().split(/\s+/).length : 0} mots</span>
      </footer>
    </div>
  );
}
