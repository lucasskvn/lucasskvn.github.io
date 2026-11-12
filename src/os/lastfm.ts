export type MusicItem = {
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  plays: number;
  nowPlaying: boolean;
  timestamp?: number;
};
type LastfmItem = {
  name?: string;
  artist?: string | { name?: string; "#text"?: string };
  album?: { "#text"?: string };
  image?: { size?: string; "#text"?: string }[];
  url?: string;
  playcount?: string;
  date?: { uts?: string };
  "@attr"?: { nowplaying?: string };
};
export function normalizeLastfm(
  items: LastfmItem[] | LastfmItem | undefined,
): MusicItem[] {
  return (Array.isArray(items) ? items : items ? [items] : []).map((item) => {
    const image =
      [...(item.image ?? [])].reverse().find((image) => image["#text"])?.[
        "#text"
      ] ?? "";
    const validUrl = (value: string | undefined) => {
      try {
        const url = new URL(value ?? "");
        return url.protocol === "https:" ? url.href : "";
      } catch {
        return "";
      }
    };
    return {
      name: item.name || "Sans titre",
      artist:
        typeof item.artist === "string"
          ? item.artist
          : (item.artist?.name ?? item.artist?.["#text"] ?? ""),
      album: item.album?.["#text"] ?? "",
      image: image.includes("2a96cbd8b46e442fc41c2b86b821562f")
        ? ""
        : validUrl(image),
      url: validUrl(item.url),
      plays: Number(item.playcount) || 0,
      nowPlaying: item["@attr"]?.nowplaying === "true",
      timestamp: item.date?.uts ? Number(item.date.uts) * 1000 : undefined,
    };
  });
}
export type LastfmKind = "recent" | "albums" | "artists";
export type LastfmPeriod = "7day" | "1month" | "3month" | "overall";
export const LASTFM_PROFILE = "https://www.last.fm/user/Snow3945KKK";
export async function fetchLastfm(
  kind: LastfmKind,
  period: LastfmPeriod,
  key: string,
  signal: AbortSignal,
): Promise<MusicItem[]> {
  const endpoints = {
    recent: ["user.getrecenttracks", "recenttracks", "track"],
    albums: ["user.gettopalbums", "topalbums", "album"],
    artists: ["user.gettopartists", "topartists", "artist"],
  } as const;
  const [method, root, property] = endpoints[kind];
  const params = new URLSearchParams({
    method,
    user: "Snow3945KKK",
    api_key: key,
    format: "json",
    period,
    limit: "18",
  });
  const response = await fetch(`https://ws.audioscrobbler.com/2.0/?${params}`, {
    signal,
  });
  if (!response.ok) throw new Error("Last.fm unavailable");
  const data = (await response.json()) as { error?: number } & Record<
    string,
    Record<string, LastfmItem[]>
  >;
  if (data.error || !data[root]) throw new Error("Last.fm unavailable");
  return normalizeLastfm(data[root][property]);
}
