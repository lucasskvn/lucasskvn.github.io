import { useState } from "react";
import { motion } from "framer-motion";
import SEO from './components/SEO';
import './Project.css';
import githubImg from './assets/github.png';
import wolf3dscreen from './assets/wolf3dscreen.png';
import wolf3d from './assets/wolf3d.png';
import icecast from './assets/icecast_logo.svg';
import webradioscreen from './assets/webradioscreen.png';
import nixos from './assets/nixos.png';
import nvimscreen from './assets/nvimscreen.png';
import webpage from './assets/webpage.png';
import minishellscreen from './assets/minishellscreen.png';
import minishell from './assets/minishell.png';
import portfolio from './assets/portfoliomainpage.png';
import butterflynet from './assets/projects/butterflynet.png';
import staarscreaam from './assets/projects/staarscreaam.png';
import rmrf from './assets/projects/rmrf.svg';
import farmermonkey from './assets/projects/farmermonkey.svg';
import farmermonkeyDetail from './assets/projects/farmermonkey-detail.png';
import virtualangel from './assets/projects/virtualangel.svg';
import virtualangelDetail from './assets/projects/virtualangel-detail.png';
import zhouxinyu from './assets/projects/zhouxinyu.svg';
import zhouxinyuDetail from './assets/projects/zhouxinyu-detail.png';
import zappy from './assets/projects/zappy.png';
import cartridge from './assets/projects/cartridge.png';
import myteams from './assets/projects/myteams.png';
import codewash from './assets/projects/codewash.png';
import myradar from './assets/projects/myradar.svg';

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
    title: { fr: "ButterflyNet - Serveur IRC privé", en: "ButterflyNet - Private IRC Server" },
    description: {
      fr: "Serveur IRC privé et chiffré, accessible uniquement sur invitation. Hébergé sur mon VPS avec sécurisation renforcée.",
      en: "Private encrypted IRC server, invite-only. Hosted on my VPS with hardened security."
    },
    details: {
      fr: "ButterflyNet est un serveur IRC privé que j'ai mis en place sur mon VPS OVH. Il utilise une configuration sécurisée avec chiffrement TLS, accès restreint par invitation, et une stack légère pour des performances optimales. Conçu pour des discussions privées entre amis, sans dépendre de plateformes centralisées.",
      en: "ButterflyNet is a private IRC server I set up on my OVH VPS. It uses a secure configuration with TLS encryption, invite-only access, and a lightweight stack for optimal performance. Designed for private conversations between friends, without relying on centralized platforms."
    },
    image: butterflynet,
    detailImage: butterflynet,
    link: "https://chat.2bananas4monkeys.org/",
  },
  {
    title: { fr: "Pomodocus - Pomodoro gamifié", en: "Pomodocus - Gamified Pomodoro" },
    description: {
      fr: "Application Pomodoro gamifiée avec des dinosaures collectibles. React, TypeScript, Tailwind.",
      en: "Gamified Pomodoro app with collectible dinosaurs. React, TypeScript, Tailwind."
    },
    details: {
      fr: "Pomodocus est une application Pomodoro gamifiée qui transforme la productivité en jeu. Collectionnez des dinosaures en complétant des sessions de travail, suivez vos statistiques, et personnalisez l'apparence. Données persistantes dans le localStorage.",
      en: "Pomodocus is a gamified Pomodoro app that turns productivity into a game. Collect dinosaurs by completing work sessions, track your stats, and customize the appearance. Data persisted in localStorage."
    },
    link: "https://github.com/lucasskvn/Pomodocus",
    image: staarscreaam,
    detailImage: staarscreaam,
  },
  {
    title: { fr: "WAV.PY - Manipulation audio en Python", en: "WAV.PY - Audio Processing in Python" },
    description: {
      fr: "Outil de manipulation de fichiers audio WAV en Python.",
      en: "WAV audio file manipulation tool in Python."
    },
    details: {
      fr: "WAV.PY est un outil Python pour la manipulation de fichiers audio WAV : lecture, écriture, édition et analyse de fichiers audio.",
      en: "WAV.PY is a Python tool for WAV audio file manipulation: reading, writing, editing, and analyzing audio files."
    },
    link: "https://github.com/lucasskvn/WAV.PY",
    image: staarscreaam,
    detailImage: staarscreaam,
  },
  {
    title: { fr: "Armageddon - Jeu en Rust", en: "Armageddon - Game in Rust" },
    description: {
      fr: "Jeu développé en Rust.",
      en: "Game developed in Rust."
    },
    details: {
      fr: "Armageddon est un jeu développé en Rust.",
      en: "Armageddon is a game developed in Rust."
    },
    link: "https://github.com/lucasskvn/Armageddon",
    image: zappy,
    detailImage: zappy,
  },
  {
    title: { fr: "Staarscreaam.wav - App musique en Rust", en: "Staarscreaam.wav - Music App in Rust" },
    description: {
      fr: "Application musicale open source personnalisable écrite en Rust. Architecture modulaire, focus performance.",
      en: "Open source customizable music app written in Rust. Modular architecture, performance-focused."
    },
    details: {
      fr: "Staarscreaam.wav est une application musicale open source écrite en Rust, conçue pour être hautement personnalisable. Architecture modulaire, gestion de playlists, égaliseur, et support de multiples formats audio.",
      en: "Staarscreaam.wav is an open source music application written in Rust, designed to be highly customizable. Modular architecture, playlist management, equalizer, and multiple audio format support."
    },
    link: "https://github.com/lucasskvn/Staarscreaam.wav",
    image: staarscreaam,
    detailImage: staarscreaam,
  },
  {
    title: { fr: "RMRF - Outil de backup dédupliqué", en: "RMRF - Deduplicated Backup Tool" },
    description: {
      fr: "Outil de backup resilient en Rust avec chunking FastCDC, BLAKE3 et compression zstd. Support Proxmox (QEMU/LXC).",
      en: "Resilient backup tool in Rust with FastCDC chunking, BLAKE3 hashing, and zstd compression. Proxmox (QEMU/LXC) support."
    },
    details: {
      fr: "RMRF (Resilient Modular Reduction Framework) est un outil de backup avec déduplication par chunking, hachage BLAKE3 et compression zstd. Il supporte la suspension automatique des VMs Proxmox pour des snapshots cohérents, la vérification d'intégrité, le garbage collection, et une politique de rétention.",
      en: "RMRF (Resilient Modular Reduction Framework) is a backup tool with content-defined chunking, BLAKE3 hashing, and zstd compression. It supports automatic Proxmox VM suspension for consistent snapshots, integrity verification, garbage collection, and retention policies."
    },
    link: "https://github.com/lucasskvn/RMRF",
    image: rmrf,
    detailImage: rmrf,
  },
  {
    title: { fr: "lucasskvn.fr - Site personnel", en: "lucasskvn.fr - Personal Site" },
    description: {
      fr: "Site statique dark theme avec esthétique terminal, hébergé sur mon VPS.",
      en: "Static dark theme site with terminal aesthetic, hosted on my VPS."
    },
    details: {
      fr: "Site personnel statique avec un design dark theme, typographie Garamond, et une esthétique terminal. Déployé automatiquement via GitHub Actions sur mon VPS OVH avec Caddy.",
      en: "Personal static site with dark theme design, Garamond typography, and terminal aesthetic. Auto-deployed via GitHub Actions on my OVH VPS with Caddy."
    },
    link: "https://lucasskvn.fr",
    image: webpage,
    detailImage: githubImg,
  },
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
    image: portfolio,
    detailImage: portfolio,
  },
  {
    title: { fr: "Webradio", en: "Webradio" },
    description: {
      fr: "Écoutez la webradio en direct (Liquidsoap, Icecast). Host sur ce site",
      en: "Listen to the webradio live (Liquidsoap, Icecast). Hosted on this site"
    },
    details: {
      fr: "Player audio en ligne, utilisant Liquidsoap et Icecast pour la diffusion. Permet d'écouter la radio en direct et d'afficher le titre du morceau en cours.",
      en: "Online audio player, using Liquidsoap and Icecast for streaming. Lets you listen live and shows the current track title."
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
    title: { fr: "FarmerMonkey - Bot Discord de tournois", en: "FarmerMonkey - Tournament Discord Bot" },
    description: {
      fr: "Bot Discord de gestion de tournois avec brackets, équipes et statistiques. En production.",
      en: "Discord tournament bot with brackets, teams, and statistics. In production."
    },
    details: {
      fr: "FarmerMonkey est un bot Discord complet pour la gestion de tournois : création de brackets, gestion d'équipes, suivi des statistiques, et système d'élimination. Déployé en production sur plusieurs serveurs Discord.",
      en: "FarmerMonkey is a complete Discord bot for tournament management: bracket creation, team management, statistics tracking, and elimination system. Deployed in production on multiple Discord servers."
    },
    link: "https://github.com/lucasskvn/FarmerMonkey",
    image: farmermonkey,
    detailImage: farmermonkeyDetail,
    isPrivate: true,
  },
  {
    title: { fr: "VirtualAngel - Bot IA conversationnel", en: "VirtualAngel - Conversational AI Bot" },
    description: {
      fr: "Bot Discord IA conversationnel avec apprentissage par chaînes de Markov. Déployé via Docker.",
      en: "Conversational AI Discord bot with Markov chain learning. Deployed via Docker."
    },
    details: {
      fr: "VirtualAngel est un bot Discord utilisant des chaînes de Markov pour apprendre des conversations et générer des réponses contextuelles. Architecture modulaire avec persistance des données et déploiement Docker.",
      en: "VirtualAngel is a Discord bot using Markov chains to learn from conversations and generate contextual responses. Modular architecture with data persistence and Docker deployment."
    },
    link: "https://github.com/lucasskvn/VirtualAngel",
    image: virtualangel,
    detailImage: virtualangelDetail,
    isPrivate: true,
  },
  {
    title: { fr: "ZhouXinyu - Bot de cartes à collectionner", en: "ZhouXinyu - Trading Card Bot" },
    description: {
      fr: "Bot Discord de cartes à collectionner avec système d'échange et persistance.",
      en: "Trading card Discord bot with exchange system and data persistence."
    },
    details: {
      fr: "ZhouXinyu est un bot Discord de cartes à collectionner avec un système d'échange complet, collection de cartes, raretés, et persistance des données des utilisateurs.",
      en: "ZhouXinyu is a trading card Discord bot with a complete exchange system, card collection, rarities, and user data persistence."
    },
    link: "https://github.com/lucasskvn/ZhouXinyu",
    image: zhouxinyu,
    detailImage: zhouxinyuDetail,
    isPrivate: true,
  },
  {
    title: { fr: "Zappy - Jeu réseau multijoueur", en: "Zappy - Multiplayer Network Game" },
    description: {
      fr: "Jeu réseau multijoueur en temps réel unissant GUI, IA et serveur en C/CPP et Python.",
      en: "Real-time multiplayer network game combining GUI, AI, and server in C/CPP and Python."
    },
    details: {
      fr: "Zappy est un projet de jeu réseau où plusieurs équipes s'affrontent via une IA autonome. L'architecture sépare un serveur central en C/CPP, des clients graphiques, et des IA en Python qui interagissent en temps réel.",
      en: "Zappy is a network game project where multiple teams compete via autonomous AI. The architecture separates a central C/CPP server, graphical clients, and Python AIs interacting in real-time."
    },
    image: zappy,
    detailImage: zappy,
    isPrivate: true,
  },
  {
    title: { fr: "Cartridge - Recreation jeu GameBoy", en: "Cartridge - GameBoy Recreation" },
    description: {
      fr: "Recréation d'un jeu GameBoy en C avec les contraintes de ressources de la console.",
      en: "GameBoy game recreation in C with the console's resource constraints."
    },
    details: {
      fr: "Cartridge est un projet qui consiste à recréer un jeu GameBoy en C, en respectant les limitations techniques de la console originale : mémoire limitée, affichage contraint, et performances réduites.",
      en: "Cartridge is a project recreating a GameBoy game in C, respecting the original console's technical limitations: limited memory, constrained display, and reduced performance."
    },
    image: cartridge,
    detailImage: cartridge,
    isPrivate: true,
  },
  {
    title: { fr: "my_teams - Chat client/serveur", en: "my_teams - Client/Server Chat" },
    description: {
      fr: "Recreation d'un chat en Rust similaire au logiciel Teams, liant client et serveur.",
      en: "Chat recreation in Rust similar to Teams software, linking client and server."
    },
    details: {
      fr: "my_teams est un projet de messagerie instantanée en Rust avec une architecture client/serveur. Il implémente la gestion de canaux, messages privés, et notifications en temps réel.",
      en: "my_teams is an instant messaging project in Rust with a client/server architecture. It implements channel management, private messages, and real-time notifications."
    },
    image: myteams,
    detailImage: myteams,
    isPrivate: true,
  },
  {
    title: { fr: "Codewash - Refactorisation", en: "Codewash - Refactoring" },
    description: {
      fr: "Refactorisation et nettoyage d'une application vibecodée pour la rendre plus fluide et maintenable.",
      en: "Refactoring and cleanup of a vibecoded application to make it smoother and maintainable."
    },
    details: {
      fr: "Codewash est un projet de refactorisation complète d'une application existante, visant à améliorer la qualité du code, la maintenabilité et faciliter l'implémentation de nouvelles fonctionnalités.",
      en: "Codewash is a complete refactoring project of an existing application, aiming to improve code quality, maintainability, and ease the implementation of new features."
    },
    image: codewash,
    detailImage: codewash,
    isPrivate: true,
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
    title: { fr: "my_radar", en: "my_radar" },
    description: {
      fr: "Simulateur de trajectoire et de collision d'avions en C avec CSFML.",
      en: "Airplane trajectory and collision simulator in C with CSFML."
    },
    details: {
      fr: "Ce projet consiste à créer un simulateur de trajectoire et collision d'avions en C avec CSFML.",
      en: "This project is about creating an airplane trajectory and collision simulator in C with CSFML."
    },
    image: myradar,
    detailImage: myradar,
    isPrivate: true,
  },
];

interface ProjectsProps { lang: 'fr' | 'en' }

export default function Projects({ lang }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <SEO
        title="Projects"
        description={lang === 'fr' ? 'Projets de Lucas Sangkhavongs — EPITECH et open source' : "Lucas Sangkhavongs' projects — EPITECH and open source"}
        path="/projects"
      />
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
