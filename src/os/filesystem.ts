import type { AppId } from "./registry.ts";
export type VirtualFile = {
  path: string;
  name: string;
  kind: "folder" | "text" | "image" | "link" | "app" | "pdf";
  content?: string;
  url?: string;
  app?: AppId;
  target?: string;
};
type ProjectContent = {
  id: string;
  name: string;
  description: string;
  details: string;
  technologies: readonly string[];
  gallery: string[];
  url?: string;
  private: boolean;
};
export const HOME = "/home/lucas";

export function normalizePath(input: string, cwd = HOME): string {
  const expanded =
    input === "~"
      ? HOME
      : input.startsWith("~/")
        ? HOME + input.slice(1)
        : input;
  const parts = (
    expanded.startsWith("/") ? expanded : `${cwd}/${expanded}`
  ).split("/");
  const result: string[] = [];
  for (const part of parts) {
    if (part === "..") result.pop();
    else if (part && part !== ".") result.push(part);
  }
  return "/" + result.join("/");
}
export const parentPath = (path: string) => normalizePath("..", path);
export const shortPath = (path: string) =>
  path === HOME || path.startsWith(HOME + "/")
    ? "~" + path.slice(HOME.length)
    : path;
export function childrenOf(files: VirtualFile[], path: string): VirtualFile[] {
  return files
    .filter((file) => file.path !== "/" && parentPath(file.path) === path)
    .sort(
      (a, b) =>
        Number(b.kind === "folder") - Number(a.kind === "folder") ||
        a.name.localeCompare(b.name, "fr"),
    );
}

export function createFilesystem(projects: ProjectContent[]): VirtualFile[] {
  const folder = (path: string): VirtualFile => ({
    path,
    name: path.split("/").pop() || "/",
    kind: "folder",
  });
  const text = (path: string, content: string): VirtualFile => ({
    path,
    name: path.split("/").pop()!,
    kind: "text",
    content,
  });
  return [
    ...[
      "/",
      "/home",
      HOME,
      `${HOME}/projets`,
      `${HOME}/documents`,
      `${HOME}/musique`,
      "/applications",
    ].map(folder),
    text(
      `${HOME}/bienvenue.txt`,
      "Bienvenue dans INTERVALLE.\n\nUn espace personnel de Lucas Sangkhavongs.\nÉtudiant à EPITECH Lyon, développeur, amateur de Linux, de musique et de jeux vidéo.\n\nExplorez les projets, ouvrez le fanzine ou écoutez la radio.\nLe terminal manipule ces mêmes fichiers virtuels.\n\nRaccourcis : Ctrl+K (lanceur), Alt+1 à 7 (applications), Alt+Échap (bureau).",
    ),
    text(
      `${HOME}/documents/contact.txt`,
      "Lucas Sangkhavongs\nÉtudiant à EPITECH Lyon\n\nMail : lucas.sangkhavongs@epitech.eu\nGitHub : https://github.com/lucasskvn\nLinkedIn : https://www.linkedin.com/in/lucas-sangkhavongs/",
    ),
    {
      path: `${HOME}/documents/CV_LucasSangkhavongs.pdf`,
      name: "CV_LucasSangkhavongs.pdf",
      kind: "pdf",
      url: "/CV_LucasSangkhavongs.pdf",
    },
    {
      path: `${HOME}/musique/lastfm.url`,
      name: "lastfm.url",
      kind: "link",
      url: "https://www.last.fm/user/Snow3945KKK",
    },
    {
      path: `${HOME}/musique/radio.app`,
      name: "radio.app",
      kind: "app",
      app: "musique",
      target: "radio",
    },
    ...(
      [
        "fanzine",
        "musique",
        "fichiers",
        "terminal",
        "profil",
        "carnet",
        "reglages",
      ] as AppId[]
    ).map((id) => ({
      path: `/applications/${id}.app`,
      name: `${id}.app`,
      kind: "app" as const,
      app: id,
    })),
    ...projects.flatMap((project) => {
      const path = `${HOME}/projets/${project.id}`;
      return [
        folder(path),
        text(
          `${path}/README.md`,
          `# ${project.name}\n\n${project.description}\n\n${project.details}\n\nTechnologies : ${project.technologies.join(", ")}\n\n${project.private ? "Code source privé." : project.url ? `Lien : ${project.url}` : ""}`,
        ),
        {
          path: `${path}/article.app`,
          name: "article.app",
          kind: "app" as const,
          app: "fanzine" as const,
          target: project.id,
        },
        ...project.gallery
          .filter(Boolean)
          .map((url, i) => ({
            path: `${path}/capture-${i + 1}.image`,
            name: `capture-${i + 1}.image`,
            kind: "image" as const,
            url,
            target: project.id,
          })),
        ...(project.url &&
        !project.private &&
        project.url.startsWith("https://")
          ? [
              {
                path: `${path}/projet.url`,
                name: "projet.url",
                kind: "link" as const,
                url: project.url,
              },
            ]
          : []),
      ];
    }),
  ];
}
