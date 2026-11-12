export const apps = [
  {
    id: "fanzine",
    name: "Fanzine",
    subtitle: "Les projets, autrement",
    icon: "book",
    shortcut: "1",
  },
  {
    id: "musique",
    name: "Musique",
    subtitle: "Écoutes & radio personnelle",
    icon: "music",
    shortcut: "2",
  },
  {
    id: "fichiers",
    name: "Fichiers",
    subtitle: "Explorer les coulisses",
    icon: "folder",
    shortcut: "3",
  },
  {
    id: "terminal",
    name: "Terminal",
    subtitle: "Prendre les commandes",
    icon: "terminal",
    shortcut: "4",
  },
  {
    id: "profil",
    name: "Profil",
    subtitle: "Lucas, en quelques lignes",
    icon: "user",
    shortcut: "5",
  },
  {
    id: "carnet",
    name: "Carnet",
    subtitle: "Vos notes de passage",
    icon: "note",
    shortcut: "6",
  },
  {
    id: "reglages",
    name: "Réglages",
    subtitle: "Un espace à votre goût",
    icon: "settings",
    shortcut: "7",
  },
] as const;
export type AppId = (typeof apps)[number]["id"];
export const isAppId = (id: string): id is AppId =>
  apps.some((app) => app.id === id);
export const appInfo = (id: AppId) => apps.find((app) => app.id === id)!;
