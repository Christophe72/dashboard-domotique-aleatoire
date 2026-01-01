## Dashboard capteurs (Next.js)

Tableau de bord sombre en style "glass" pour capteurs en attente, avec donnees
aleatoires en attendant le branchement des capteurs reels.

## Getting Started

Install dependencies, then run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Donnees aleatoires regenerees toutes les 4.5s pour simuler les capteurs.
- Dashboard decoupe en composants reutilisables.
- Mise en page responsive et theme sombre proche de la maquette.

## Structure

- `src/app/page.tsx`: point d entree qui rend le dashboard.
- `src/components/dashboard`: composants, types, data, utils.
- `src/app/globals.css`: theme, glass, anneaux, fond degrade.

## Scripts

- `npm run dev`: demarrer en local.
- `npm run build`: build de production.
- `npm run start`: lancer le build.
- `npm run lint`: lint.

## Notes

- Fonts: Space Grotesk (titres) + Manrope (texte).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
