# Cyrano DS

Design system de Cyrano. Référence pour les développeurs humains et les IAs (Cursor, Lovable, Claude Code) qui produisent du code Cyrano.

## La marque

Les couleurs, polices et logos de Cyrano ont une seule source : [`packages/marque/`](./packages/marque/README.md), publiée en release GitHub (`marque-v<version>`) et installée par Console, le site et les livrables. Les tokens de `src/styles/tokens.css` sont ceux des gabarits de cette preview ; une couleur de marque se change dans `packages/marque/marque.json`.

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
