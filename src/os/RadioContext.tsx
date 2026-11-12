import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { readStored, saveStored } from "./storage";

const STREAM = "https://webradio.lucasskvn.duckdns.org/stream.mp3";
type RadioStatus = "idle" | "loading" | "playing" | "paused" | "error";
type Radio = {
  status: RadioStatus;
  title: string;
  volume: number;
  setVolume: (volume: number) => void;
  toggle: () => void;
};
const Context = createContext<Radio | null>(null);
export function RadioProvider({ children }: { children: ReactNode }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState<RadioStatus>("idle");
  const [title, setTitle] = useState("");
  const [volume, setVolume] = useState(() => {
    const saved = readStored<unknown>("volume", 0.65);
    return typeof saved === "number" && Number.isFinite(saved)
      ? Math.max(0, Math.min(1, saved))
      : 0.65;
  });
  useEffect(() => {
    if (audio.current) audio.current.volume = volume;
    saveStored("volume", volume);
  }, [volume]);
  const toggle = useCallback(() => {
    const element = audio.current;
    if (!element) return;
    if (!element.paused || status === "loading") {
      element.pause();
      setStatus("paused");
      return;
    }
    setStatus("loading");
    if (!element.src || element.error) {
      element.src = STREAM;
      element.load();
    }
    void element.play().catch((error) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("error");
    });
  }, [status]);
  useEffect(() => {
    if (status !== "loading") return;
    const timer = setTimeout(() => {
      audio.current?.pause();
      setStatus("error");
    }, 15000);
    return () => clearTimeout(timer);
  }, [status]);
  useEffect(() => {
    if (status !== "playing") return;
    const controller = new AbortController();
    const fetchTitle = async () => {
      try {
        const response = await fetch(
          "https://webradio.lucasskvn.duckdns.org/status-json.xsl",
          {
            signal: AbortSignal.any([
              controller.signal,
              AbortSignal.timeout(8000),
            ]),
          },
        );
        if (!response.ok) return;
        const data = (await response.json()) as {
          icestats?: { source?: { title?: string } | { title?: string }[] };
        };
        const source = data.icestats?.source;
        setTitle(
          (Array.isArray(source) ? source[0]?.title : source?.title) || "",
        );
      } catch {
        /* Audio playback remains independent of metadata. */
      }
    };
    void fetchTitle();
    const timer = setInterval(() => {
      if (!document.hidden) void fetchTitle();
    }, 30000);
    return () => {
      controller.abort();
      clearInterval(timer);
    };
  }, [status]);
  return (
    <Context.Provider value={{ status, title, volume, setVolume, toggle }}>
      <audio
        ref={audio}
        preload="none"
        onPlaying={() => setStatus("playing")}
        onPause={() =>
          setStatus((current) => (current === "error" ? current : "paused"))
        }
        onError={() => setStatus("error")}
        onWaiting={() => setStatus("loading")}
        onEnded={() => setStatus("paused")}
      />
      {children}
    </Context.Provider>
  );
}
export function useRadio() {
  const value = useContext(Context);
  if (!value) throw new Error("RadioProvider missing");
  return value;
}
