# Dashboard capteurs (Next.js)

Tableau de bord sombre en style "glass" pour visualiser des capteurs.
Les valeurs sont actuellement **générées aléatoirement toutes les ~4,5 secondes**
pour simuler les capteurs réels (les appels aux vrais capteurs seront branchés ultérieurement).

> Remarque : ce README est basé sur le code et la configuration présents au 01/01/2026.

## Fonctionnalités

- Tableau de bord en thème sombre, inspiré d'une maquette moderne
- Données simulées par valeurs aléatoires, régénérées périodiquement (≈ 4,5 s)
- Découpage en composants réutilisables (modules dans `src/components/dashboard`)
- Mise en page responsive (desktop / mobile) avec effet **glassmorphism**
- Gestion du thème (ex. via `ThemeToggle`) pour un rendu visuel cohérent
- Animation et fond dégradé avec anneaux décoratifs définis dans les styles globaux

## Stack technique

- **Framework** : [Next.js 16](https://nextjs.org/) (App Router, dossier `src/app`)
- **Langage** : TypeScript
- **UI / Styles** :
  - [Tailwind CSS 4](https://tailwindcss.com/) (`tailwindcss` et `@tailwindcss/postcss` présents dans `devDependencies`)
  - Styles globaux dans `src/app/globals.css` pour le thème, le glassmorphism, les anneaux et le fond dégradé
- **Front** : React 19 (`react`, `react-dom`)
- **Qualité de code** :
  - ESLint 9 (`eslint`, `eslint-config-next`)
  - Configuration adaptée à Next.js
- **Gestion d'état** :
  - État local React (hooks comme `useState`, `useEffect`) — aucune librairie de state externe (Redux, Zustand, etc.) n'apparaît dans `package.json`.

## Prérequis

- **Node.js** : version 18+ recommandée (Next.js 16 supporte officiellement Node 18 et 20).
  - Si ton environnement de déploiement impose une autre version, vérifie la compatibilité.
- **Gestionnaire de paquets** :
  - Le projet indique `"packageManager": "pnpm@10..."` dans `package.json` → pnpm est le gestionnaire recommandé.
  - Tu peux néanmoins utiliser `npm` ou `yarn`, mais le lockfile d'origine (si présent) est prévu pour pnpm.

## Installation et lancement

### 1. Cloner le dépôt

```bash
git clone https://github.com/Christophe72/dashboard-domotique-aleatoire.git
cd dashboard-domotique-aleatoire
```

### 2. Installer les dépendances

Avec pnpm (recommandé) :

```bash
pnpm install
```

Ou avec npm :

```bash
npm install
```

> Si tu mélanges plusieurs gestionnaires (pnpm, npm, yarn), tu peux obtenir plusieurs fichiers de lock.
> Il est conseillé de s'en tenir à un seul pour éviter les incohérences.

### 3. Lancer le serveur de développement

Avec pnpm :

```bash
pnpm dev
```

Avec npm :

```bash
npm run dev
```

Puis ouvre :

- http://localhost:3000

## Structure principale du projet

> Cette structure est basée sur les fichiers présents dans le dépôt au 01/01/2026.

```text
src/
  app/
    page.tsx           # Point d'entrée principal du dashboard (App Router)
    globals.css        # Styles globaux (thème sombre, glass, anneaux, fond dégradé)
  components/
    dashboard/         # Composants du tableau de bord (cartes, graphiques, etc.)
      ...
public/
  ...                  # Assets statiques (images, icônes, etc.)

next.config.ts         # Configuration Next.js
eslint.config.mjs      # Configuration ESLint
postcss.config.mjs     # Chaîne PostCSS / Tailwind
README.md              # Ce fichier
```

Si de nouveaux dossiers (API, hooks, utilitaires, etc.) sont ajoutés, pense à compléter cette section.

## Données et simulation des capteurs

- Les données affichées sont **générées aléatoirement** pour chaque capteur.
- Le rafraîchissement a lieu environ toutes les **4,5 secondes**, comme indiqué dans la description du projet.
- Cela permet de tester le layout, les animations et les états de chargement en attendant le branchement aux vrais capteurs.

> Quand les capteurs réels seront branchés (API locale, MQTT, HTTP, etc.),
> tu pourras remplacer la génération aléatoire par des appels réseau ou des websockets.
> Le README ne détaille pas encore cette future API car elle n'est pas présente dans le code actuel.

## Thème, design et accessibilité

- Thème sombre prédominant, basé sur un fond dégradé et des cartes glassmorphism.
- Anneaux / formes décoratives gérés via CSS dans `globals.css`.
- Composants du dashboard pensés pour être reutilisables (cartes, sections, etc.).
- Responsive : le layout est prévu pour s'adapter aux largeurs d'écran usuelles.
  - Si des problèmes apparaissent sur certains breakpoints extrêmes, cette partie reste à affiner.
- Accessibilité (a11y) de base :
  - Utilisation des composants React/Next.js standards.
  - Des améliorations spécifiques (focus visibles, ARIA, contrastes renforcés) peuvent encore être ajoutées.

## Scripts disponibles

Ces scripts sont définis dans `package.json` :

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

- `pnpm dev` / `npm run dev` : lance le serveur de développement.
- `pnpm build` / `npm run build` : build de production.
- `pnpm start` / `npm run start` : démarre le serveur sur le build de production.
- `pnpm lint` / `npm run lint` : lance ESLint sur le projet.

## Tests

- Aucun framework de tests (Jest, Vitest, Playwright, etc.) n'est actuellement déclaré dans `package.json`.
- Les tests automatisés ne sont pas encore configurés.
- Si tu ajoutes des tests, pense à documenter :
  - la commande (`pnpm test`, `pnpm test:e2e`, etc.),
  - l'emplacement des fichiers (`src/__tests__`, `tests/e2e`, ...),
  - les outils utilisés (Jest, Testing Library, Cypress, Playwright...).

## Déploiement

Ce projet est un Next.js classique et peut être déployé :

- sur Vercel (solution la plus simple et naturelle pour Next.js),
- sur un hébergement Node.js (PM2, Docker, etc.) en lançant :
  - `pnpm build` puis `pnpm start`.

> La configuration exacte de déploiement (Vercel, Docker, autre PaaS) n'est pas décrite dans le dépôt
> au 01/01/2026. Adapte cette section à ton environnement une fois choisi.

## Roadmap / idées d'amélioration

Quelques pistes possibles :

- Brancher de vrais capteurs (API locale, broker MQTT, etc.).
- Ajouter un système d'authentification (Login / rôles / droits).
- Historiser les mesures (BDD, time-series, etc.) et afficher des graphiques.
- Ajouter des notifications (seuils, alertes de capteurs, etc.).
- Améliorer l'accessibilité (navigation clavier, ARIA, contraste).
- Internationalisation (fr / en) via les capacités de Next.js.

## Licence

- Aucune licence explicite n'est définie dans ce dépôt au 01/01/2026 :
  - aucun fichier `LICENSE` n'est présent à la racine.
- Si tu prévois de publier ou d'ouvrir ce projet, il est recommandé d'ajouter une licence claire
  (par exemple MIT, Apache-2.0, etc.) et de mettre ce README à jour en conséquence.

