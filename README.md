# Cyrano DS

Design system de Cyrano. Référence pour les développeurs humains et les IAs (Cursor, Lovable, Claude Code) qui produisent du code Cyrano.

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
