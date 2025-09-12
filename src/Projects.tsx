import { useState } from "react";
import './Project.css';
import githubImg from './assets/github.png';
import placeholder from './assets/placeholder.jpg';

type Project = {
  title: string;
  description: string;
  details?: string;
  link?: string;
  image?: string;
  detailImage?: string;
};

const projects: Project[] = [
  {
    title: "Portfolio Website",
    description: "Site personnel réalisé avec React et Vite pour présenter mes projets et mon CV.",
    details: "Ce site a été conçu pour mettre en avant mes compétences, mes projets et mon parcours professionnel. Il utilise React, Vite et un design responsive.",
    link: "https://github.com/lucasskvn/lucasskvn.github.io/",
    image: githubImg,
    detailImage: githubImg,
  },
  {
    title: "Webradio",
    description: "Écoutez la webradio en direct (Liquidsoap, Icecast).",
    details: "Player audio en ligne développé avec React, utilisant Liquidsoap et Icecast pour la diffusion. Permet d'écouter la radio en direct et d'afficher le titre du morceau en cours.",
    link: "/radio",
    image: placeholder,
    detailImage: placeholder,
  },
  {
    title: "Dotfiles",
    description: "Mes configurations personnalisées pour bash, nvim, nix, etc.",
    details: "Ce dépôt contient toutes mes configurations personnelles pour différents outils de développement, facilitant la portabilité de mon environnement.",
    link: "https://github.com/lucasskvn/dotfiles",
    image: githubImg,
    detailImage: placeholder,
  },
  {
    title: "EpitechCoding-style-Quickfixlist",
    description: "Plugin nvim pour afficher les erreurs de coding-style Epitech dans la quickfixlist.",
    details: "Ce plugin améliore la productivité en affichant directement les erreurs de coding-style dans la quickfixlist de Neovim.",
    link: "https://github.com/lucasskvn/EpitechCoding-style-Quickfixlist",
    image: githubImg,
    detailImage: placeholder,
  },
  {
    title: "Wolf3D",
    description: "Un projet de jeu 3D réalisé en C et CSFML.",
    details: "Wolf3D est un jeu inspiré du célèbre Wolfenstein 3D, programmé en C avec la librairie CSFML pour l'affichage graphique.",
    link: "https://github.com/lucasskvn/Wolf3D",
    image: githubImg,
    detailImage: placeholder,
  },
  {
    title: "Minishell",
    description: "Projet de recréation du shell Unix réalisé en C.",
    details: "Minishell est une implémentation simplifiée d'un shell Unix, permettant de manipuler des commandes et des processus.",
    link: "https://github.com/lucasskvn/Minishell",
    image: githubImg,
    detailImage: placeholder,
  },
  {
    title: "my_printf",
    description: "Projet de recréation de la fonction printf réalisé en C.",
    details: "Ce projet consiste à réimplémenter la fonction printf du C, en gérant différents formats et options.",
    link: "https://github.com/lucasskvn/my_printf",
    image: githubImg,
    detailImage: placeholder,
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
              <span
                onClick={() => setSelectedProject(project)}
                style={{ color: "#61dafb", display: "block", marginTop: 8, cursor: "pointer", textDecoration: "underline" }}
                tabIndex={0}
                role="button"
                onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') setSelectedProject(project); }}
              >
                Voir le projet
              </span>
            )}
          </div>
        ))}
      </div>
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {(selectedProject.detailImage || selectedProject.image) && (
              <img src={selectedProject.detailImage || selectedProject.image} alt={selectedProject.title} className="project-image" style={{ maxWidth: '60%', marginBottom: 16 }} />
            )}
            <h2>{selectedProject.title}</h2>
            <p style={{ marginBottom: 16 }}>{selectedProject.details || selectedProject.description}</p>
            {selectedProject.link && (
              <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" style={{ color: "#61dafb", display: "block", marginBottom: 16 }}>
                Lien du projet
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}