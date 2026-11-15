# Notionnel — Les dérivés, en clair

Notionnel est un atlas interactif en français pour les personnes qui découvrent la finance. Une boulangère qui fixe le prix de son blé, un importateur qui doit des dollars et une réservation de vélo introduisent les mécanismes avant les termes techniques. À chaque étape, le lecteur peut consulter une définition, essayer un calcul et vérifier son raisonnement.

## Démarrer en local

Installez Node.js 24 LTS avec npm, puis ouvrez un terminal à la racine du dépôt, dans le dossier qui contient `package.json`. Si vous utilisez nvm, `nvm install` puis `nvm use` sélectionnent la version indiquée dans `.nvmrc`. [Versions de Node.js](https://nodejs.org/en/about/previous-releases)

```sh
npm install
npm run dev
```

Ouvrez l’adresse affichée dans le terminal, habituellement [localhost:4321](http://localhost:4321/). Les modifications de leçons apparaissent dans le navigateur pendant le développement. Pour démarrer avec les versions exactes du fichier de verrouillage sur une machine neuve, utilisez `npm ci` à la place de `npm install`. Le site fonctionne sans compte, clé d’API ni base de données.

## Parcours et référence théorique

Les six modules s’appuient sur John C. Hull, *Options, futures et autres actifs dérivés*, 10e édition française, Pearson France, 2017. Ils proposent des textes, des illustrations et des exemples originaux. Le manuel reste une référence bibliographique externe au dépôt. Chaque leçon indique les sections utilisées. Les pages imprimées figurent dans la [table de correspondance](docs/SOURCES.md).

| Module | Question abordée | Chapitres de Hull |
| --- | --- | --- |
| 1. Les actifs et les sous-jacents | Que possède-t-on avec une action ou une obligation ? Comment lit-on une cotation au comptant ? | 1, 4, 5 et 10 |
| 2. Les produits dérivés | Pourquoi le même contrat protège-t-il une entreprise alors qu’il expose un spéculateur ? | 1 |
| 3. Les contrats à terme | Qui doit livrer ou payer ? Comment un compte de marge peut-il se retrouver à court de fonds ? | 1 à 3 |
| 4. Les options | Pourquoi peut-on exercer une option et perdre quand même de l’argent ? | 10 et 11 |
| 5. Les swaps | Quels paiements s’échangent quand on passe d’un taux variable à un taux fixe ou d’une devise à une autre ? | 7 |
| 6. La gestion des risques | Comment le cours, le temps et la volatilité influencent-ils la prime d’une option ? | 15 et 19 |

Les trois questions de chaque quiz sont accompagnées d’un corrigé. Deux bonnes réponses valident le module. Le thème et la liste des modules validés sont conservés dans le stockage local du navigateur. La progression reste dans ce profil de navigateur, sur le même domaine. Effacer les données du site la remet à zéro.

Le glossaire accepte les termes français, leurs variantes sans accents et des équivalents anglais. Dans une leçon, un terme souligné permet d’obtenir sa définition ou d’ouvrir l’entrée correspondante. Le simulateur couvre l’achat et la vente d’un call ou d’un put. Les réglages portent sur le prix d’exercice, la prime et le cours du sous-jacent **à l’échéance**. Pour essayer, achetez un call de prix d’exercice 50 € pour 3 €. À 52 €, l’exercice rapporte 2 €, mais le résultat après prime est de −1 € par action.

Le graphique représente un résultat à l’échéance, hors frais, financement et fiscalité. La prime est saisie par le lecteur. Le module 6 explique comment Black-Scholes aborde une question différente, celle du prix théorique avant l’échéance.

## Structure du projet

Astro génère le HTML des leçons, du glossaire et des pages de navigation. Les fichiers Markdown sont validés par une collection de contenu. Tailwind CSS, les feuilles de style du projet et les icônes Lucide définissent la présentation. Le simulateur ajoute sa courbe React/Recharts dans le navigateur. La correction des quiz, le suivi de progression et les préférences restent locaux.

| Emplacement | Rôle |
| --- | --- |
| `src/content/modules/`, `src/content.config.ts` | Leçons en Markdown et schéma des métadonnées. |
| `src/data/` | Définitions, synonymes, exemples et questions de quiz. |
| `src/lib/` | Catalogue, enrichissement du Markdown, calculs du simulateur et préparation des vues. |
| `src/pages/`, `src/layouts/`, `src/components/` | Routes statiques, navigation et illustrations. |
| `src/scripts/`, `src/styles/` | Interactions dans le navigateur et présentation. |
| `tests/`, `scripts/` | Tests unitaires, parcours Playwright et contrôle des liens construits. |
| `.github/workflows/`, `vercel.json` | Vérification continue et réglages de déploiement. |

Consultez l’[arborescence complète](docs/ARBORESCENCE.md) pour retrouver un fichier.

## Construire et vérifier le site

```sh
npm test
npm run build
npm run preview
```

La compilation produit `dist/` et vérifie les liens internes du site. La dernière commande permet de parcourir cette version compilée. Pour les tests du navigateur, arrêtez l’aperçu manuel avec Ctrl+C puis lancez les commandes suivantes. Playwright démarre lui-même le serveur d’aperçu sur la compilation existante.

```sh
npx playwright install chromium
npm run test:e2e
```

Sur un environnement Linux neuf, `npx playwright install --with-deps chromium` installe également les bibliothèques système nécessaires. Le workflow `ci.yml` vérifie les demandes de fusion et les envois sur `main` avec le verrouillage npm du dépôt.

Deux variables facultatives permettent d’adapter la compilation à l’hébergement.

| Variable | Valeur |
| --- | --- |
| `BASE_PATH` | Chemin du site sur l’hôte, par exemple `/mon-atlas`. La valeur par défaut est `/`. |
| `SITE_URL` | Origine publique comprenant le protocole et le domaine, sans le sous-chemin. |

Pour simuler un site de projet GitHub Pages en local, utilisez le même préfixe à la compilation et à l’aperçu, puis ouvrez le chemin `/mon-atlas/` sur le port affiché.

```sh
BASE_PATH=/mon-atlas npm run build
BASE_PATH=/mon-atlas npm run preview
```

## Publier le dépôt sur GitHub

Le dossier Git livré contient déjà un premier commit sur `main`. **Si vous partez de l’archive ZIP**, initialisez d’abord Git depuis le dossier décompressé.

```sh
git init -b main
git add .
git commit -m "Initialiser la plateforme pédagogique Notionnel"
```

Créez un dépôt vide sur GitHub et copiez l’URL HTTPS ou SSH affichée dans **Code**. Depuis le dépôt local, les commandes suivantes demandent cette URL et envoient la branche `main`. Si `git remote -v` affiche déjà le bon `origin`, seule la dernière commande est nécessaire.

```sh
printf '%s\n' "Collez l’URL de votre dépôt GitHub puis appuyez sur Entrée."
read -r depot
git remote add origin "$depot"
git push -u origin main
```

## Déployer le site

**Vercel.** Importez le dépôt depuis **Add New → Project** et sélectionnez la racine contenant `package.json`. La configuration fournie utilise le préréglage Astro, `npm ci`, la commande `npm run build` et le répertoire de sortie `dist`. Pour un domaine servi à la racine, laissez `BASE_PATH` vide. Vous pouvez renseigner `SITE_URL` avec l’origine publique du site. Lancez **Deploy**. [Guide Astro pour Vercel](https://docs.astro.build/en/guides/deploy/vercel/)

**GitHub Pages.** Sur GitHub, ouvrez **Settings → Pages → Build and deployment** et choisissez **GitHub Actions** comme source. Dans **Actions → Publier sur GitHub Pages → Run workflow**, choisissez `main` puis lancez le workflow. Il récupère le domaine et le sous-chemin auprès de Pages, exécute les tests unitaires, construit le site à cette adresse, puis publie `dist/`. Le lien final figure dans l’environnement `github-pages` du workflow. Pour publier une mise à jour, relancez-le sur la version souhaitée de `main`. [Configurer la source de publication dans GitHub Pages](https://docs.github.com/fr/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Écrire ou enrichir une leçon

1. Partez d’un fichier de `src/content/modules/` ou du [modèle Markdown commenté](docs/modele-module.md). Attribuez un numéro et un slug uniques. Conservez le numéro d’un module existant, car il identifie sa progression.
2. Ouvrez sur une situation concrète, puis introduisez le vocabulaire et un exemple chiffré. Utilisez `> **Analogie**`, `> **À retenir**` et `[prime](glossaire:prime)` pour les encadrés et les termes. Vérifiez les renvois au manuel dans la section finale.
3. Ajoutez les entrées de glossaire et le libellé de module dans `src/data/glossary.js`, puis trois questions et leurs explications dans `src/data/quizzes.js`. Les indices des bonnes réponses commencent à zéro.
4. Reportez le chapitre dans `docs/SOURCES.md` et adaptez les libellés du catalogue dans `src/lib/catalog.ts`. En cas d’ajout d’un septième module, actualisez aussi les textes indiquant « six » sur l’accueil et dans la documentation.
5. Lancez les tests et la compilation. Vérifiez le quiz, ses explications, les liens du glossaire et la navigation mobile sur le résultat compilé.
