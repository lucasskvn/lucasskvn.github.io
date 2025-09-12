import './Project.css';
import githubImg from './assets/github.png';

type Project = {
  title: string;
  description: string;
  link?: string;
  image?: string;
};

const projects: Project[] = [
  {
    title: "Portfolio Website",
    description: "Site personnel réalisé avec React et Vite pour présenter mes projets et mon CV.",
    link: "https://github.com/lucasskvn/lucasskvn.github.io/",
    image: githubImg,
  },
  {
    title: "Dotfiles",
    description: "Mes configurations personnalisées pour bash, nvim, nix, etc.",
    link: "git@github.com:lucasskvn/dotfiles.git",
    image: githubImg,
  },
  {
    title: "EpitechCoding-style-Quickfixlist",
    description: "Plugin nvim pour afficher les erreurs de coding-style Epitech dans la quickfixlist.",
    link: "https://github.com/lucasskvn/EpitechCoding-style-Quickfixlist",
    image: githubImg,
  },
  {
    title: "Wolf3D",
    description: "Un projet de jeu 3D réalisé en C et CSFML.",
    link: "https://github.com/lucasskvn/Wolf3D",
    image: githubImg,
  },
  {
    title: "Minishell",
    description: "Projet de recréation du shell Unix réalisé en C.",
    link: "https://github.com/lucasskvn/Minishell",
    image: githubImg,
  },
  {
    title: "my_printf",
    description: "Projet de recréation de la fonction printf réalisé en C.",
    link: "https://github.com/lucasskvn/my_printf",
    image: githubImg,
  },
  // Ajoute ici d'autres projets simplement !
];

export default function Projects() {
  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <h1>Projects</h1>
      <p>Voici quelques-uns de mes projets réalisés à EPITECH et en dehors.</p>
      <div className="projects-grid">
        {projects.map((project, idx) => (
          <div key={idx} className="project-card">
            {project.image && (
              <img src={project.image} alt={project.title} className="project-image" />
            )}
            <h2 className="project-title">{project.title}</h2>
            <p>{project.description}</p>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: "#61dafb" }}>
                Voir le projet
              </a>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}