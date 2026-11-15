# Arborescence du dépôt

Fichiers de la version source. La compilation crée `dist/` et Astro crée son cache dans `.astro/`. Les dépendances, caches et résultats de tests sont exclus de Git.

```text
atelier-des-derives/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── pages.yml
├── docs/
│   ├── ARBORESCENCE.md
│   ├── modele-module.md
│   └── SOURCES.md
├── public/
│   ├── credits.txt
│   └── favicon.svg
├── scripts/
│   └── check-links.mjs
├── src/
│   ├── assets/
│   │   └── profils-options.svg
│   ├── components/
│   │   ├── Brand.astro
│   │   ├── PathExample.astro
│   │   ├── Plate.astro
│   │   └── Relief.astro
│   ├── content/
│   │   └── modules/
│   │       ├── 01.md
│   │       ├── 02.md
│   │       ├── 03.md
│   │       ├── 04.md
│   │       ├── 05.md
│   │       ├── 06.md
│   │       └── 07.md
│   ├── data/
│   │   ├── glossary.js
│   │   └── quizzes.js
│   ├── layouts/
│   │   └── Layout.astro
│   ├── lib/
│   │   ├── catalog.ts
│   │   ├── learning-markdown.js
│   │   ├── learning-view.js
│   │   ├── payoff.js
│   │   └── simulator-view.js
│   ├── pages/
│   │   ├── modules/
│   │   │   └── [slug].astro
│   │   ├── 404.astro
│   │   ├── glossaire.astro
│   │   ├── index.astro
│   │   ├── simulateur.astro
│   │   └── sources.astro
│   ├── scripts/
│   │   ├── learning.js
│   │   ├── shell.js
│   │   └── simulator.js
│   ├── styles/
│   │   ├── global.css
│   │   ├── learning.css
│   │   └── simulator.css
│   └── content.config.ts
├── tests/
│   ├── e2e/
│   │   ├── exotiques.spec.js
│   │   ├── learning.spec.js
│   │   ├── simulator.spec.js
│   │   └── site.spec.js
│   ├── learning.test.js
│   └── payoff.test.js
├── .gitignore
├── .nvmrc
├── astro.config.mjs
├── package-lock.json
├── package.json
├── playwright.config.js
├── README.md
├── tsconfig.json
└── vercel.json
```

Le [guide de démarrage](../README.md) décrit le rôle des dossiers et les commandes de vérification.
