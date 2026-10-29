# cyrano-brand

> Ex `cyrano-marque`, renommé le 2026-10-29 (CYR-424). Les releases `marque-v*` restent en place, immuables, pour les anciens livrables qui y pointent.

La marque Cyrano en un paquet : les couleurs (vert, pétrole, les quatre sens en clair et en sombre), les polices (pile système des apps, Poppins et Satoshi de la marque), les logos. **La source est `marque.json`** ; tout le reste est généré par `generer.mjs` et n'est jamais modifié à la main.

## Qui s'en sert

| Consommateur | Ce qu'il prend |
|---|---|
| Console et Cydash (`louiscyrano/console`) | `marque.css` (couleurs, pile système), `index.js` pour les courriels et le contrat |
| Le site (`louiscyrano/website`) | `marque.css`, `polices.css` |
| Les livrables de Pierre (skills de CCORE) | la fiche `01-BRAND` de CCORE : URL, version, empreinte de la release |

## Changer la marque

1. Modifier `marque.json` (ou un logo, une police sous `public/`).
2. Augmenter `version` dans `package.json` : correctif `1.0.1`, ajout `1.1.0`, renommage ou retrait `2.0.0`.
3. Fusionner sur `main`. L'Action `brand` vérifie, génère et attache `cyrano-brand-<version>.tgz` à la release `brand-v<version>`. Les releases sont immuables : une version publiée ne change plus.
4. Chez chaque consommateur, remplacer l'URL par la nouvelle (`pnpm add <url>`), et mettre à jour la fiche CCORE.

## Installer

```
pnpm add https://github.com/louiscyrano/cyrano-ds/releases/download/brand-v1.1.0/cyrano-brand-1.1.0.tgz
```

```css
@import 'cyrano-brand/marque.css';   /* --cy-green-500, --cy-deep-950, --cy-info-light, --cy-font-system... */
@import 'cyrano-brand/polices.css';  /* Poppins et Satoshi : la marque seulement, jamais une app */
```

```ts
import { couleurs, semantique, polices } from 'cyrano-brand'
couleurs.vert['500'] // '#05d37e'
```

## Vérifier sans publier

```
node generer.mjs --verifier   # source valide, deux générations identiques
node generer.mjs              # écrit dist/
```
