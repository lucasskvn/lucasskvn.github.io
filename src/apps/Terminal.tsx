import { useEffect, useRef, useState } from "react";
import { useSystem } from "../os/SystemContext";
import { HOME, shortPath } from "../os/filesystem";
import { completeInput, runCommand } from "../os/terminal";

type Entry = { command: string; path: string; output: string };
export function Terminal() {
  const { files, openApp, setPreferences, state } = useSystem();
  const [cwd, setCwd] = useState(HOME);
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const draft = useRef("");
  const field = useRef<HTMLInputElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottom.current?.scrollIntoView({ block: "nearest" });
  }, [entries]);
  useEffect(() => {
    if (state.active === "terminal")
      field.current?.focus({ preventScroll: true });
  }, [state.active]);
  const submit = (command: string) => {
    if (!command.trim()) return;
    const result =
      command.trim() === "history"
        ? {
            output: [...history, command]
              .map((item, i) => `${String(i + 1).padStart(3, " ")}  ${item}`)
              .join("\n"),
          }
        : runCommand(command, cwd, files);
    setEntries((current) =>
      result.clear
        ? []
        : [
            ...current.slice(-199),
            { command, path: shortPath(cwd), output: result.output },
          ],
    );
    if (result.cwd) setCwd(result.cwd);
    if (result.open) openApp(result.open.id, result.open.target);
    if (result.theme) setPreferences({ theme: result.theme });
    setHistory((current) => [...current.slice(-99), command]);
    setHistoryIndex(-1);
    draft.current = "";
    setInput("");
  };
  return (
    <div className="terminal-app app-column">
      <div className="terminal-tabs">
        <span>
          <i /> lucas@intervalle : {shortPath(cwd)}
        </span>
        <span>SH / SESSION LOCALE</span>
      </div>
      <div
        className="terminal-scroll app-scroll"
        onClick={(event) => {
          if (event.target === event.currentTarget) field.current?.focus();
        }}
      >
        <div className="terminal-greeting">
          <pre aria-hidden="true">{"║ ║ ║ ║\n╬═╬═╬═╬\n║ ║ ║ ║"}</pre>
          <div>
            <strong>INTERVALLE SHELL</strong>
            <p>Un système fictif. De vrais projets.</p>
            <small>
              Tapez <button onClick={() => submit("help")}>help</button> pour
              trouver votre chemin.
            </small>
          </div>
        </div>
        <div role="log" aria-label="Historique du terminal" aria-live="polite">
          {entries.map((entry, i) => (
            <div className="terminal-entry" key={i}>
              <div className="terminal-command">
                <span>lucas</span>
                <span className="terminal-path">{entry.path}</span>
                <span className="prompt-arrow">›</span>
                <span>{entry.command}</span>
              </div>
              {entry.output && (
                <pre className="terminal-output">{entry.output}</pre>
              )}
            </div>
          ))}
        </div>
        <form
          className="terminal-prompt"
          onSubmit={(event) => {
            event.preventDefault();
            submit(input);
          }}
        >
          <label htmlFor="terminal-command">
            <span>lucas</span>
            <span className="terminal-path">{shortPath(cwd)}</span>
            <span className="prompt-arrow">›</span>
          </label>
          <input
            ref={field}
            id="terminal-command"
            aria-label="Commande du terminal"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setHistoryIndex(-1);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowUp") {
                event.preventDefault();
                if (!history.length) return;
                if (historyIndex === -1) draft.current = input;
                const index =
                  historyIndex < 0
                    ? history.length - 1
                    : Math.max(0, historyIndex - 1);
                setHistoryIndex(index);
                setInput(history[index]);
              }
              if (event.key === "ArrowDown") {
                event.preventDefault();
                if (historyIndex < 0) return;
                const index = historyIndex + 1;
                if (index >= history.length) {
                  setHistoryIndex(-1);
                  setInput(draft.current);
                } else {
                  setHistoryIndex(index);
                  setInput(history[index]);
                }
              }
              if (event.key === "Tab") {
                event.preventDefault();
                const completions = completeInput(input, cwd, files);
                if (completions.length === 1) setInput(completions[0]);
                else if (completions.length > 1)
                  setEntries((current) => [
                    ...current,
                    {
                      command: input,
                      path: shortPath(cwd),
                      output: completions.join("   "),
                    },
                  ]);
              }
              if (event.ctrlKey && event.key.toLowerCase() === "l") {
                event.preventDefault();
                setEntries([]);
              }
              if (
                event.ctrlKey &&
                event.key.toLowerCase() === "c" &&
                !window.getSelection()?.toString()
              ) {
                event.preventDefault();
                setInput("");
                setHistoryIndex(-1);
              }
            }}
          />
          <button
            type="submit"
            className="terminal-enter"
            aria-label="Exécuter la commande"
          >
            ↵
          </button>
        </form>
        <div ref={bottom} />
      </div>
      <footer className="app-statusbar">
        <span>↑↓ HISTORIQUE · TAB COMPLÉTION</span>
        <span>FICHIERS VIRTUELS</span>
      </footer>
    </div>
  );
}
