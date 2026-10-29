# DS landings (Cyrano)

Design system des livrables visuels de Cyrano (landings, decks, rapports, site), ex « DS v1 ». Les applications ont le leur, le DS apps. Référence pour les développeurs humains et les IAs (Cursor, Lovable, Claude Code) qui produisent du code Cyrano.

## La marque

Les couleurs, polices et logos de Cyrano ont une seule source : [`packages/brand/`](./packages/brand/README.md), paquet `cyrano-brand` (ex `cyrano-marque`), publiée en release GitHub (`brand-v<version>`, les anciennes `marque-v*` restent en place) et installée par Console, le site et les livrables. Les tokens de `src/styles/tokens.css` sont ceux des gabarits de cette preview ; une couleur de marque se change dans `packages/brand/marque.json`.

## Install

```bash
npm install
npm run dev
```

Doc visible sur http://localhost:5173. Toggle dark/light en haut à droite.

## Composants

```tsx
import {
  CyButton,
  CyAnimatedButton,
  CyCard,
  CyBadge,
  CyInput,
  CyTextarea,
  CyStatus,
  CyLogo,
  CySpinner,
} from './src/components';
```

## Build

```bash
npm run build
```

## Références

- [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) — référence textuelle exhaustive du DS, pour les IAs.
- [`prompts/system-prompt.md`](./prompts/system-prompt.md) — prompt à coller en tête de chaque conversation Claude Code / Cursor / Lovable pour qu'elle produise du code Cyrano cohérent.
