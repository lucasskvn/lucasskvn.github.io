import { useState } from "react";
import { motion } from "framer-motion";
import './Project.css';
import githubImg from './assets/github.png';
import placeholder from './assets/placeholder.jpg';

type Project = {
  title: string | { fr: string; en: string };
  description: string | { fr: string; en: string };
  details?: string | { fr: string; en: string };
  link?: string;
  image?: string;
  detailImage?: string;
};

const projects: Project[] = [
  {
    title: { fr: "Portfolio Website", en: "Portfolio Website" },
    description: {
      fr: "Site personnel réalisé avec React et Vite pour présenter mes projets et mon CV.",
      en: "Personal website built with React and Vite to showcase my projects and CV."
    },
    details: {
      fr: "Ce site a été conçu pour mettre en avant mes compétences, mes projets et mon parcours professionnel. Il utilise React, Vite et un design responsive.",
      en: "This site was designed to highlight my skills, projects, and professional background. It uses React, Vite, and a responsive design."
    },
    link: "https://github.com/lucasskvn/lucasskvn.github.io/",
    image: githubImg,
    detailImage: githubImg,
  },
  {
    title: { fr: "Webradio", en: "Webradio" },
    description: {
      fr: "Écoutez la webradio en direct (Liquidsoap, Icecast). Host sur ce site",
      en: "Listen to the webradio live (Liquidsoap, Icecast). Hosted on this site"
    },
    details: {
      fr: "Player audio en ligne, utilisant Liquidsoap et Icecast pour la diffusion. Permet d'écouter la radio en direct et d'afficher le titre du morceau en cours. J'écoute souvent (toujours) des chansons de Loona.",
      en: "Online audio player, using Liquidsoap and Icecast for streaming. Lets you listen live and shows the current track title. I casually (always) blast some Loona songs."
    },
    link: "/radio",
    image: placeholder,
    detailImage: placeholder,
  },
  {
    title: { fr: "Dotfiles", en: "Dotfiles" },
    description: {
      fr: "Mes configurations personnalisées pour bash, nvim, nix, etc.",
      en: "My custom configurations for bash, nvim, nix, etc."
    },
    details: {
      fr: "Ce dépôt contient toutes mes configurations personnelles pour différents outils de développement, facilitant la portabilité de mon environnement.",
      en: "This repo contains all my personal configs for various dev tools, making my environment portable."
    },
    link: "https://github.com/lucasskvn/NixOS-config",
    image: githubImg,
    detailImage: placeholder,
  },
  {
    title: { fr: "Webpage", en: "Webpage" },
    description: {
      fr: "Site personnel réalisé avec HTML et CSS",
      en: "Personal website made with HTML and CSS"
    },
    details: {
      fr: ":^)",
      en: ":^)"
    },
    link: "https://lucasskvn.fr/",
    image: githubImg,
    detailImage: placeholder,
  },
  {
    title: { fr: "EpitechCoding-style-Quickfixlist", en: "EpitechCoding-style-Quickfixlist" },
    description: {
      fr: "Plugin nvim pour afficher les erreurs de coding-style Epitech dans la quickfixlist.",
      en: "Nvim plugin to show Epitech coding-style errors in the quickfixlist."
    },
    details: {
      fr: "Ce plugin améliore la productivité en affichant directement les erreurs de coding-style dans la quickfixlist de Neovim.",
      en: "This plugin boosts productivity by showing coding-style errors directly in Neovim's quickfixlist."
    },
    link: "https://github.com/lucasskvn/EpitechCoding-style-Quickfixlist",
    image: githubImg,
    detailImage: placeholder,
  },
  {
    title: { fr: "Wolf3D", en: "Wolf3D" },
    description: {
      fr: "Un projet de jeu 3D réalisé en C et CSFML.",
      en: "A 3D game project made in C and CSFML."
    },
    details: {
      fr: "Wolf3D est un jeu inspiré du célèbre Wolfenstein 3D, programmé en C avec la librairie CSFML pour l'affichage graphique.",
      en: "Wolf3D is a game inspired by the famous Wolfenstein 3D, coded in C with CSFML for graphics."
    },
    link: "https://github.com/lucasskvn/Wolf3D",
    image: githubImg,
    detailImage: placeholder,
  },
  {
    title: { fr: "Minishell", en: "Minishell" },
    description: {
      fr: "Projet de recréation du shell Unix réalisé en C.",
      en: "Unix shell recreation project in C."
    },
    details: {
      fr: "Minishell est une implémentation simplifiée d'un shell Unix, permettant de manipuler des commandes et des processus.",
      en: "Minishell is a simplified Unix shell implementation, allowing command and process management."
    },
    link: "https://github.com/lucasskvn/Minishell",
    image: githubImg,
    detailImage: placeholder,
  },
  {
    title: { fr: "my_printf", en: "my_printf" },
    description: {
      fr: "Projet de recréation de la fonction printf réalisé en C.",
      en: "Recreation of the printf function in C."
    },
    details: {
      fr: "Ce projet consiste à réimplémenter la fonction printf du C, en gérant différents formats et options.",
      en: "This project is about reimplementing the C printf function, handling various formats and options."
    },
    link: "https://github.com/lucasskvn/my_printf",
    image: githubImg,
    detailImage: placeholder,
  },
];

interface ProjectsProps { lang: 'fr' | 'en' }

export default function Projects({ lang }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <h1 className="title">{lang === 'fr' ? 'Projets' : 'Projects'}</h1>
      <p className="subtitle">{lang === 'fr' ? 'Voici quelques-uns de mes projets réalisés à EPITECH et en dehors.' : 'Here are some of my projects made at EPITECH and beyond.'}</p>
      <div className="projects-grid">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            className="project-card"
            initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 18,
              mass: 0.7,
              delay: idx * 0.12,
              filter: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
            }}
          >
            {project.image && (
              <img src={project.image} alt={typeof project.title === 'string' ? project.title : project.title[lang]} className="project-image" />
            )}
            <h2 className="project-title">{typeof project.title === 'string' ? project.title : project.title[lang]}</h2>
            <p>{typeof project.description === 'string' ? project.description : project.description[lang]}</p>
            {project.link && (
              <span
                className="project-see-btn"
                onClick={() => setSelectedProject(project)}
                tabIndex={0}
                role="button"
                onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') setSelectedProject(project); }}
              >
                {lang === 'fr' ? 'Voir le projet' : 'See project'}
              </span>
            )}
          </motion.div>
        ))}
      </div>
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {(selectedProject.detailImage || selectedProject.image) && (
              <img src={selectedProject.detailImage || selectedProject.image} alt={typeof selectedProject.title === 'string' ? selectedProject.title : selectedProject.title[lang]} className="project-image" style={{ maxWidth: '60%', marginBottom: 16 }} />
            )}
            <h2>{typeof selectedProject.title === 'string' ? selectedProject.title : selectedProject.title[lang]}</h2>
            <p style={{ marginBottom: 16 }}>{typeof selectedProject.details === 'string' ? selectedProject.details : (selectedProject.details ? selectedProject.details[lang] : (typeof selectedProject.description === 'string' ? selectedProject.description : selectedProject.description[lang]))}</p>
            {selectedProject.link && (
              <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" style={{ color: "#61dafb", display: "block", marginBottom: 16 }}>
                {lang === 'fr' ? 'Lien du projet' : 'Project link'}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}