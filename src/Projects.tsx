import { useState } from "react";
import { motion } from "framer-motion";
import './Project.css';
import githubImg from './assets/github.png';
import wolf3dscreen from './assets/wolf3dscreen.png';
import wolf3d from './assets/wolf3d.png';
import icecast from './assets/icecast_logo.svg';
import webradioscreen from './assets/webradioscreen.png';
import nixos from './assets/nixos.png';
import nvimscreen from './assets/nvimscreen.png';
import nvim from './assets/nvimlogo.png';
import nvimcstyle from './assets/nvimepitechcstyle.png';
import webpage from './assets/webpage.png';
import minishellscreen from './assets/minishellscreen.png';
import minishell from './assets/minishell.png';
import panda from './assets/panda.png';
import myworldscreen from './assets/myworldscreen.png';
import c_logo from './assets/C_Logo.png';
import csfml from './assets/csfml.png';

type Project = {
  title: string | { fr: string; en: string };
  description: string | { fr: string; en: string };
  details?: string | { fr: string; en: string };
  link?: string;
  image?: string;
  detailImage?: string;
  isPrivate?: boolean;
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
    image: icecast,
    detailImage: webradioscreen,
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
    image: nixos,
    detailImage: nvimscreen,
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
    image: webpage,
    detailImage: webpage,
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
    image: nvim,
    detailImage: nvimcstyle,
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
    image: wolf3d,
    detailImage: wolf3dscreen,
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
    image: minishell,
    detailImage: minishellscreen,
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
    image: c_logo,
    detailImage: githubImg,
  },
  {
    title: { fr: "my_world", en: "my_world" },
    description: {
      fr: "Projet de création d'un éditeur de carte 3D vue isométrique en C avec CSFML.",
      en: "3D isometric map editor project in C with CSFML."
    },
    details: {
      fr: "Ce projet consiste à créer un éditeur de carte 3D avec une vue isométrique, en utilisant le langage C et la bibliothèque CSFML.",
      en: "This project is about creating a 3D map editor with an isometric view, using the C language and the CSFML library."
    },
    image: csfml,
    detailImage: myworldscreen,
    isPrivate: true,
  },
  {
    title: { fr: "Cuddle", en: "Cuddle" },
    description: {
      fr: "Projet de recréation de la librairie Python Panda en C.",
      en: "Recreation of the Python Panda library in C."
    },
    details: {
      fr: "Ce projet consiste à réimplémenter la librairie Python Panda en C, en se concentrant sur les fonctionnalités de manipulation de données.",
      en: "This project is about reimplementing the Python Panda library in C, focusing on data manipulation features."
    },
    image: panda,
    detailImage: githubImg,
    isPrivate: true,
  },
  {
    title: { fr: "my_radar", en: "my_radar" },
    description: {
      fr: "Projet de création d'un simulateur de trajectoire et de collision d'avions en C avec CSFML.",
      en: "Airplane trajectory and collision simulator project in C with CSFML"
    },
    details: {
      fr: "Ce projet consiste à créer un simulateur de trajectoire et collision d'avions en C avec CSFML.",
      en: "This project is about creating an airplane trajectory and collision simulator in C with CSFML."
    },
    image: csfml,
    detailImage: githubImg,
    isPrivate: true,
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
            <span
              className="project-see-btn"
              onClick={() => setSelectedProject(project)}
              tabIndex={0}
              role="button"
              onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') setSelectedProject(project); }}
            >
              {lang === 'fr' ? 'Voir le projet' : 'See project'}
            </span>
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
            {selectedProject.isPrivate ? (
              <span style={{ color: "#888", display: "block", marginBottom: 16, fontStyle: "italic" }}>
                {lang === 'fr' ? 'Projet Privé' : 'Private Project'}
              </span>
            ) : selectedProject.link && (
              <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" style={{ color: "#a259ff", display: "block", marginBottom: 16 }}>
                {lang === 'fr' ? 'Lien du projet' : 'Project link'}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}