export interface Article {
  slug: string;
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  date: string;
  tags: string[];
  content: { fr: string; en: string };
}

const articles: Article[] = [
  {
    slug: 'bienvenue',
    title: { fr: 'Bienvenue sur mon blog', en: 'Welcome to my blog' },
    description: { fr: 'Premier article — présentation du blog et de ce que j\'y partagerai.', en: 'First post — introducing the blog and what I\'ll share here.' },
    date: '2026-07-12',
    tags: ['meta'],
    content: {
      fr: `## Bienvenue !

Je commence ce blog pour partager mes expériences, projets et découvertes en programmation.

### Ce que tu trouveras ici

- **Retours sur mes projets** — Epitech, open source, expérimentations
- **Tutos et astuces** — Rust, C, Python, Docker, et tout ce que j'apprends
- **Musique** — playlists, découvertes, ce que j'écoute

C'est un espace personnel, écrit en français et en anglais selon l'humeur.

Stay tuned 🐺`,
      en: `## Welcome!

I'm starting this blog to share my experiences, projects, and discoveries in programming.

### What you'll find here

- **Project retrospectives** — Epitech, open source, experiments
- **Tutorials & tips** — Rust, C, Python, Docker, and everything I learn
- **Music** — playlists, discoveries, what I'm listening to

This is a personal space, written in French or English depending on the mood.

Stay tuned 🐺`,
    },
  },
  {
    slug: 'rust-vibe',
    title: { fr: 'Pourquoi Rust me fait kiffer', en: 'Why Rust is my vibe' },
    description: { fr: 'Mon retour d\'expérience après avoir passé l\'année à coder en Rust.', en: 'My experience after spending the year coding in Rust.' },
    date: '2026-07-10',
    tags: ['rust', 'dev'],
    content: {
      fr: `## Pourquoi Rust ?

J'ai découvert Rust cette année et honnêtement, c'est un des langages qui m'a le plus marqué.

### Ce que j'aime

- **La sécurité mémoire** — le compilateur est strict mais il a raison 99% du temps
- **L'écosystème** — Cargo, crates.io, tout est bien foutu
- **La communauté** — des gens passionnés et helpful

### Projets en Rust

- **RMRF** — un outil de backup dédupliqué avec chunking FastCDC et BLAKE3
- **Staarscreaam.wav** — une app musique modulaire
- **my_teams** — un chat client/serveur

Bref, Rust c'est le feu. Si t'as jamais essayé, fonce.`,
      en: `## Why Rust?

I discovered Rust this year and honestly, it's one of the most impressive languages I've used.

### What I love

- **Memory safety** — the compiler is strict but it's right 99% of the time
- **The ecosystem** — Cargo, crates.io, everything is well designed
- **The community** — passionate and helpful people

### Rust projects

- **RMRF** — a deduplicated backup tool with FastCDC chunking and BLAKE3
- **Staarscreaam.wav** — a modular music app
- **my_teams** — a client/server chat

Bottom line: Rust is fire. If you haven't tried it, go for it.`,
    },
  },
  {
    slug: 'epitech-year-2',
    title: { fr: 'Bilan de ma 2e année à Epitech', en: 'Year 2 at Epitech — retrospective' },
    description: { fr: 'Ce que j\'ai appris, les projets marquants, et ce qui m\'attend.', en: 'What I learned, standout projects, and what\'s next.' },
    date: '2026-06-28',
    tags: ['epitech', 'dev'],
    content: {
      fr: `## Deuxième année terminée

Deuxième année à Epitech Lyon dans les books. Voici un petit bilan.

### Projets marquants

- **Zappy** — jeu réseau multijoueur en C/CPP + Python. Serveur, IA, GUI. Projet de ouf.
- **Wolf3D** — raycasting en C avec CSFML. Un classique.
- **Minishell** — recréer un shell Unix. Tu comprends vraiment comment ça marche après.

### Ce que j'ai appris

- Travailler en équipe sur des projets complexes
- Gérer des architectures client/serveur
- Lire et comprendre du code existant (beaucoup)

### Alternance à venir

Je commence une alternance en septembre 2025 (2 jours/semaine). Si tu cherches un développeur motivé, contacte-moi !

À l'année prochaine 🚀`,
      en: `## Year 2 done

Second year at EPITECH Lyon in the books. Here's a quick recap.

### Standout projects

- **Zappy** — multiplayer network game in C/CPP + Python. Server, AI, GUI. Crazy project.
- **Wolf3D** — raycasting in C with CSFML. A classic.
- **Minishell** — recreating a Unix shell. You really understand how it works after this.

### What I learned

- Working in teams on complex projects
- Managing client/server architectures
- Reading and understanding existing code (a lot)

### Upcoming apprenticeship

I'm starting an apprenticeship in September 2025 (2 days/week). If you're looking for a motivated developer, hit me up!

See you next year 🚀`,
    },
  },
];

export default articles;
