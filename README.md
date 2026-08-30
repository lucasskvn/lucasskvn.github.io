# 🌐 lucasskvn.github.io

<div align="center">
  <img src="https://img.shields.io/badge/GitHub-Pages-blue?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Pages">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-5-purple?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
</div>

<br>

Mon site personnel hébergé sur [GitHub Pages](https://lucasskvn.github.io). Un portfolio moderne et interactif développé avec **TypeScript** et **Vite**.

---

## ✨ Fonctionnalités

- 🎨 **Thème « Silent Hill » à deux mondes** — *Le Brouillard* (layout centré, cartes, lisible) vs *L'Autre Monde* (layout « brisé » : alignement gauche, cartes pleine largeur, Accueil « title screen »)
- 🚀 **Performance** - Optimisé avec Vite et TypeScript ; overlays sans blur ni blend pour un scroll fluide
- 📱 **Responsive** - Adapté à tous les écrans
- 🌫️ **Atmosphère** - Brume, grain, scanlines, vignette, aberration chromatique, color-grade rouge — le tout respectant `prefers-reduced-motion`
- 📧 **Contact** - Liens vers mes réseaux sociaux

---

## 🚀 Installation

### Prérequis

- Node.js 18 ou supérieur

### Développement

```bash
# Cloner le repository
git clone https://github.com/lucasskvn/lucasskvn.github.io.git
cd lucasskvn.github.io

# Installer les dépendances
npm install

# Créer le .env local (clé API Last.fm, voir .env.example)
# cp .env.example .env   # puis renseigner VITE_LASTFM_API_KEY

# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:5173
```

> **Note Last.fm** : la page Musique a besoin de `VITE_LASTFM_API_KEY` (clé créée sur [last.fm/api](https://www.last.fm/api/account/create)). Sans elle, la connexion échoue **en local uniquement** — en production la clé est injectée via les secrets GitHub Actions.

### Production

```bash
# Build pour la production
npm run build

# Preview du build
npm run preview
```

---

## 📁 Structure

```
lucasskvn.github.io/
├── src/
│   ├── components/        # Composants
│   ├── styles/            # Styles
│   ├── App.tsx            # Composant principal
│   └── main.tsx           # Point d'entrée
├── public/
│   └── assets/            # Images, icônes
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 📦 Déploiement

Le site est automatiquement déployé sur [GitHub Pages](https://lucasskvn.github.io) via GitHub Actions.

### Déploiement automatique

Le site se redéploie automatiquement à chaque push sur la branche `main`.

### Déploiement manuel

```bash
# Build
npm run build

# Pousser sur GitHub
git add .
git commit -m "Update site"
git push origin main
```

---

## 🛠️ Technologies

- **TypeScript** - Typage statique
- **Vite** - Build tool rapide
- **React** - Bibliothèque UI
- **Framer Motion** - Animations légères
- **GitHub Pages** - Hébergement

---

## 👤 Auteur

**Lucas Kvn** - [GitHub](https://github.com/lucasskvn) - [lucasskvn.fr](https://lucasskvn.fr)

---

<div align="center">
  <sub>🌐 Fait avec TypeScript et ☕</sub>
</div>
