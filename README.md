# INTERVALLE

Le portfolio de **Lucas Sangkhavongs**, étudiant à EPITECH Lyon, sous la forme d’un système d’exploitation personnel dans le navigateur.

React 19 · TypeScript · Vite · GitHub Pages

## Explorer

- **Folio / Fanzine** : couverture éditoriale, sommaire des 19 projets, recherche, catégories, articles, captures originales, galeries et marque-pages.
- **Musique** : webradio Icecast / Liquidsoap persistante entre les applications ; écoutes récentes, albums et artistes Last.fm.
- **Fichiers** : arborescence virtuelle, historique des dossiers, recherche locale, aperçus des README et images, CV et ouverture des articles.
- **Terminal** : `help`, `ls`, `cd`, `cat`, `pwd`, `tree`, `whoami`, `projects`, `open`, `neofetch`, `history`, `date`, `theme`, `clear`. Historique avec ↑/↓, complétion avec Tab.
- **Profil** : présentation, outils du quotidien, CV original et contact.
- **Carnet** : notes personnelles enregistrées dans le navigateur, export en texte.
- **Réglages** : apparences Papier / Après minuit, trois accents, trame, réduction des mouvements, rangement des fenêtres.

Les fenêtres se déplacent par leur titre, se redimensionnent par leur coin inférieur droit, se réduisent et se ferment. Un double-clic sur le titre agrandit la fenêtre. Sur mobile, une seule application est affichée à la fois ; les autres restent ouvertes dans la barre inférieure.

## Développer

Node.js **22.12 minimum**, **24 LTS recommandé**.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Le build produit `dist/`, avec une copie `404.html` pour les anciennes URL GitHub Pages. Les chemins `/projects`, `/about`, `/contact`, `/music`, `/radio` et `/uses` restent reconnus. Les liens directs vers les applications utilisent des fragments, par exemple `/#/fanzine/pomodocus`.

## Musique

Le profil Last.fm est `Snow3945KKK`. Copiez `.env.example` vers `.env` et renseignez `VITE_LASTFM_API_KEY` pour activer les écoutes en local. Le workflow existant conserve l’injection de `secrets.VITE_LASTFM_API_KEY` lors du build GitHub Actions. Une variable Vite est intégrée au JavaScript public : ne renseignez jamais de secret partagé Last.fm ni de jeton utilisateur dans cette variable.

Sans clé, ou si le service ne répond pas, l’application affiche une indisponibilité explicite et un lien vers Last.fm. Aucune écoute de démonstration n’est présentée comme une vraie écoute. Les réponses API sont validées, les requêtes annulées au changement d’onglet et les erreurs réessayables. Les écoutes sont actualisées toutes les 60 secondes, les classements toutes les 5 minutes, lorsque l’onglet du navigateur est visible.

La radio conserve les adresses d’origine : `https://webradio.lucasskvn.duckdns.org/stream.mp3` et `/status-json.xsl`. Elle démarre uniquement après un clic. Sa disponibilité et l’accès CORS dépendent du serveur externe. Fermer l’application Musique laisse la radio jouer ; la rouvrir permet de l’arrêter. Le chargement échoue proprement après 15 secondes sans lecture.

## Architecture

```text
src/
  apps/           Les sept applications
  components/     Fenêtre, lanceur, icônes et gestion des erreurs
  data/           Projets et matériel repris du portfolio d’origine
  os/
    model.ts      Réducteur pur de gestion des fenêtres
    registry.ts   Applications et associations
    filesystem.ts Arborescence partagée par Fichiers et Terminal
    terminal.ts   Interpréteur de commandes virtuel, sans eval ni shell système
    lastfm.ts     Normalisation et accès à l’API
    *Context.tsx  État partagé du système et lecture audio persistante
    storage.ts    Stockage local tolérant aux erreurs
  assets/         Ressources originales conservées
tests/            Tests du système, des chemins, du terminal et de Last.fm
```

Les descriptions, les 19 projets, les captures, le portrait, le CV et les coordonnées viennent du dépôt d’origine. Les projets privés restent signalés comme tels. Aucun visuel de projet n’a été remplacé par une image générée.

Préférences, marque-pages, volume et notes utilisent des clés `intervalle:*` dans le stockage local. Aucun compte n’est nécessaire. Le carnet appartient au visiteur et reste sur son appareil. Les fenêtres et l’historique du terminal vivent pendant la session.

## Clavier et accessibilité

| Action                              | Raccourci                       |
| ----------------------------------- | ------------------------------- |
| Recherche d’applications et projets | Ctrl/Cmd + K                    |
| Ouvrir les applications             | Alt + 1 à 7                     |
| Afficher le bureau                  | Alt + Échap                     |
| Application suivante                | Alt + `                         |
| Fermer le lanceur                   | Échap                           |
| Redimensionner une fenêtre          | Tab jusqu’au coin, puis flèches |
| Nettoyer le terminal                | Ctrl + L                        |

La navigation Tab reste native. Le lanceur est un dialogue modal avec retour du focus ; les fenêtres masquées sont retirées de la navigation clavier. Les animations respectent `prefers-reduced-motion`. Les applications s’adaptent à la largeur de leur fenêtre avec des container queries. Sans JavaScript, les liens GitHub, CV et contact restent accessibles.

## Vérification et publication

`npm test` vérifie les transitions des fenêtres, leurs limites, les ouvertures répétées, les chemins et associations de fichiers, les commandes et la complétion, ainsi que les formes de réponses Last.fm. Un contrôle vérifie aussi la présence de toutes les images importées et du CV. `npm run build` vérifie les types et produit les fichiers statiques et le service worker.

Les pull requests exécutent les tests et le build. Seul un push sur `main` publie sur GitHub Pages via le workflow existant. `dist/` est un résultat de build, pas une source à modifier.

Les tests unitaires ne remplacent pas un essai navigateur : tester le déplacement et le redimensionnement, l’ouverture Fanzine → Fichiers → Fanzine, le terminal, la persistance des réglages et du carnet, les vues mobiles et les états réseau de Musique avant publication.
