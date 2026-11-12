export type IconName =
  | "book"
  | "music"
  | "folder"
  | "terminal"
  | "user"
  | "note"
  | "settings"
  | "search"
  | "arrow"
  | "back"
  | "next"
  | "close"
  | "expand"
  | "minimize"
  | "play"
  | "pause"
  | "volume"
  | "file"
  | "download"
  | "external"
  | "grid"
  | "sun"
  | "moon"
  | "check"
  | "radio"
  | "refresh"
  | "home"
  | "bookmark"
  | "copy"
  | "mail"
  | "plus";
const paths: Record<IconName, React.ReactNode> = {
  book: (
    <>
      <path d="M3 4h7l2 2 2-2h7v15h-7l-2 2-2-2H3zM12 6v15M6 8h3M6 11h3M15 8h3M15 11h3" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V5l11-2v13M9 9l11-2" />
      <ellipse cx="6" cy="18" rx="3" ry="2.5" />
      <ellipse cx="17" cy="16" rx="3" ry="2.5" />
    </>
  ),
  folder: <path d="M3 7V4h6l3 3h9v13H3V7h18" />,
  terminal: (
    <>
      <rect x="2" y="3" width="20" height="18" rx="1" />
      <path d="m6 8 4 4-4 4m7 0h5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 22v-3a8 8 0 0 1 16 0v3M3 22h18" />
    </>
  ),
  note: (
    <>
      <path d="M5 2h14v20H5zM8 7h8M8 11h8M8 15h6" />
    </>
  ),
  settings: (
    <>
      <path d="M5 3v7m0 4v7M12 3v12m0 4v2M19 3v2m0 4v12M2 10h6v4H2zM9 15h6v4H9zM16 5h6v4h-6z" />
    </>
  ),
  search: (
    <>
      <circle cx="10" cy="10" r="6" />
      <path d="m15 15 6 6" />
    </>
  ),
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  back: <path d="m14 5-7 7 7 7" />,
  next: <path d="m10 5 7 7-7 7" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  expand: <path d="M4 9V4h5m6 0h5v5m0 6v5h-5M9 20H4v-5" />,
  minimize: <path d="M5 16h14" />,
  play: <path d="m8 4 12 8-12 8z" />,
  pause: <path d="M7 4v16M17 4v16" />,
  volume: (
    <>
      <path d="M3 9h4l5-5v16l-5-5H3zM16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" />
    </>
  ),
  file: (
    <>
      <path d="M5 2h9l5 5v15H5zM14 2v6h5M8 13h8M8 17h6" />
    </>
  ),
  download: <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />,
  external: <path d="M14 3h7v7m0-7L10 14M10 5H3v16h16v-7" />,
  grid: <path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h6v6h-6z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" />
    </>
  ),
  moon: <path d="M20 14a8 8 0 0 1-10-10 9 9 0 1 0 10 10z" />,
  check: <path d="m4 12 5 5L20 6" />,
  radio: (
    <>
      <rect x="3" y="8" width="18" height="13" rx="1" />
      <path d="m5 8 13-6M6 12h12M13 16h5M13 18h5" />
      <circle cx="7" cy="17" r="2" />
    </>
  ),
  refresh: (
    <path d="M20 8a8 8 0 0 0-14-3L3 8m0-6v6h6M4 16a8 8 0 0 0 14 3l3-3m0 6v-6h-6" />
  ),
  home: <path d="m2 11 10-9 10 9M5 9v12h14V9M10 21v-7h4v7" />,
  bookmark: <path d="M6 3h12v19l-6-5-6 5z" />,
  copy: (
    <>
      <path d="M8 8h13v13H8zM16 8V3H3v13h5" />
    </>
  ),
  mail: <path d="M2 5h20v14H2zm0 0 10 8L22 5" />,
  plus: <path d="M12 4v16M4 12h16" />,
};
export function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
export function Mark() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 3v20M10 3v20M16 3v20M22 3v20M1 13h24"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
