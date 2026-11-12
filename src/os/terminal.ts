import { apps, isAppId } from "./registry.ts";
import type { AppId } from "./registry.ts";
import { HOME, childrenOf, normalizePath, shortPath } from "./filesystem.ts";
import type { VirtualFile } from "./filesystem.ts";

export type TerminalResult = {
  output: string;
  cwd?: string;
  clear?: boolean;
  open?: { id: AppId; target?: string };
  theme?: "fog" | "otherworld";
};
export const commandNames = [
  "help",
  "ls",
  "cd",
  "cat",
  "pwd",
  "whoami",
  "projects",
  "open",
  "neofetch",
  "clear",
  "history",
  "date",
  "theme",
  "tree",
];
const aliases: Record<string, AppId> = {
  music: "musique",
  files: "fichiers",
  about: "profil",
  settings: "reglages",
  notes: "carnet",
  projects: "fanzine",
};
export function tokenize(input: string): string[] | null {
  const tokens: string[] = [];
  let token = "";
  let quote = "";
  let started = false;
  for (const char of input.trim()) {
    if ((char === '"' || char === "'") && (!quote || char === quote)) {
      quote = quote ? "" : char;
      started = true;
    } else if (/\s/.test(char) && !quote) {
      if (started) tokens.push(token);
      token = "";
      started = false;
    } else {
      token += char;
      started = true;
    }
  }
  if (quote) return null;
  if (started) tokens.push(token);
  return tokens;
}
export function runCommand(
  input: string,
  cwd: string,
  files: VirtualFile[],
): TerminalResult {
  const tokens = tokenize(input);
  if (!tokens)
    return {
      output: "Guillemet non fermé. Fermez la citation puis réessayez.",
    };
  const [command, ...args] = tokens;
  const argument = args.join(" ");
  const path = normalizePath(argument || ".", cwd);
  const file = files.find((file) => file.path === path);
  switch (command) {
    case undefined:
      return { output: "" };
    case "help":
      return {
        output: `INTERVALLE — aide\n\nls [dossier]       Lister les fichiers\ncd [dossier]       Changer de dossier (~, .., /)\ncat <fichier>      Lire un document\npwd               Afficher le chemin\ntree              Parcourir l'arborescence\nprojects          Lister les projets\nopen <app|chemin>  Ouvrir une application ou un fichier\nwhoami            Faire connaissance\nneofetch          Informations système\ntheme fog|otherworld Changer l'apparence\nhistory           Historique des commandes\ndate              Date et heure locales\nclear             Nettoyer le terminal\n\n↑ ↓ : historique · Tab : complétion · Ctrl+L : nettoyer\n\nEssayez : cd projets/pomodocus puis cat README.md\nOu : open fanzine pomodocus`,
      };
    case "pwd":
      return { output: cwd };
    case "cd": {
      const destination = argument ? path : HOME;
      const folder = files.find((file) => file.path === destination);
      return folder?.kind === "folder"
        ? { output: "", cwd: destination }
        : { output: `cd : dossier introuvable : ${argument}` };
    }
    case "ls": {
      const destination = normalizePath(
        args.filter((arg) => !arg.startsWith("-")).join(" ") || ".",
        cwd,
      );
      const folder = files.find((file) => file.path === destination);
      if (!folder)
        return { output: `ls : chemin introuvable : ${destination}` };
      return {
        output:
          folder.kind === "folder"
            ? childrenOf(files, destination)
                .map((file) => file.name + (file.kind === "folder" ? "/" : ""))
                .join("\n") || "(vide)"
            : folder.name,
      };
    }
    case "cat":
      return {
        output:
          file?.kind === "text"
            ? (file.content ?? "")
            : `cat : ${file ? "ce fichier se consulte avec open" : "fichier introuvable"} : ${argument}`,
      };
    case "whoami":
      return {
        output:
          "Lucas Sangkhavongs / lucasskvn\nÉtudiant à EPITECH Lyon.\nDéveloppement, Linux, open source, musique & jeux vidéo.\n\nContact : lucas.sangkhavongs@epitech.eu\nGitHub  : https://github.com/lucasskvn",
      };
    case "projects":
      return {
        output:
          childrenOf(files, `${HOME}/projets`)
            .map((file) => file.name)
            .join("\n") + "\n\nLire un projet : open fanzine <nom>",
      };
    case "open": {
      const id = isAppId(args[0] ?? "") ? (args[0] as AppId) : aliases[args[0]];
      if (id)
        return {
          output: `Ouverture de ${id}…`,
          open: { id, target: args.slice(1).join(" ") || undefined },
        };
      if (file?.kind === "app" && file.app)
        return {
          output: `Ouverture de ${file.name}…`,
          open: { id: file.app, target: file.target },
        };
      if (file)
        return {
          output: `Ouverture de ${shortPath(path)}…`,
          open: { id: "fichiers", target: path },
        };
      return {
        output: `open : application ou fichier introuvable.\nApplications : ${apps.map((app) => app.id).join(", ")}`,
      };
    }
    case "neofetch":
      return {
        output: `  ║ ║ ║ ║   lucas@intervalle\n══╬═╬═╬═╬══ ──────────────────────\n  ║ ║ ║ ║   OS       INTERVALLE 01\n  ║ ║ ║ ║   Hôte     Votre navigateur\n  ║ ║ ║ ║   Interface React + TypeScript\n            Bureau   Un espace à soi\n            Lieu     Lyon, France\n            Apps     ${apps.length}\n\nUn système fictif. De vrais projets.`,
      };
    case "clear":
      return { output: "", clear: true };
    case "theme": {
      const theme =
        args[0] === "fog" || args[0] === "paper"
          ? "fog"
          : args[0] === "otherworld" || args[0] === "night"
            ? "otherworld"
            : undefined;
      return theme
        ? {
            output: `Apparence : ${theme === "fog" ? "Brouillard" : "Autre Monde"}`,
            theme,
          }
        : { output: "Usage : theme fog | otherworld" };
    }
    case "date":
      return { output: new Date().toLocaleString("fr-FR") };
    case "tree":
      return {
        output:
          files
            .filter((file) => file.path.startsWith(cwd + "/"))
            .map(
              (file) =>
                `${"  ".repeat(file.path.slice(cwd.length + 1).split("/").length - 1)}${file.kind === "folder" ? "▸ " : "· "}${file.name}`,
            )
            .join("\n") || "(vide)",
      };
    case "sudo":
      return {
        output:
          "Vous êtes déjà chez vous. Aucun privilège supplémentaire nécessaire.",
      };
    case "coffee":
      return {
        output:
          "  ( (\n  ) )\n .----.\n |    |]\n `----'\n\nUne pause fait aussi partie du processus.",
      };
    case "rm":
      return {
        output:
          "Ces archives sont en lecture seule. Même avec -rf. Bien essayé.",
      };
    default:
      return {
        output: `${command} : commande inconnue. Tapez help pour vous orienter.`,
      };
  }
}

export function completeInput(
  input: string,
  cwd: string,
  files: VirtualFile[],
): string[] {
  if (!input.includes(" "))
    return commandNames.filter((command) => command.startsWith(input));
  const prefix = input.slice(0, input.lastIndexOf(" ") + 1);
  const fragment = input.slice(prefix.length);
  if (prefix === "open " && !fragment.includes("/")) {
    const matches = apps
      .filter((app) => app.id.startsWith(fragment))
      .map((app) => prefix + app.id);
    if (matches.length) return matches;
  }
  const slash = fragment.lastIndexOf("/");
  const folder = normalizePath(
    slash >= 0 ? fragment.slice(0, slash + 1) : ".",
    cwd,
  );
  const name = fragment.slice(slash + 1);
  return childrenOf(files, folder)
    .filter((file) => file.name.startsWith(name))
    .map(
      (file) =>
        prefix +
        fragment.slice(0, slash + 1) +
        file.name +
        (file.kind === "folder" ? "/" : ""),
    );
}
