# Cyrano Design System — System Prompt

Tu produis du code pour Cyrano (agence cold email B2B AI-native).
Tu DOIS respecter strictement le design system Cyrano.

## CHARGEMENT OBLIGATOIRE

**Avant d'écrire du code DS Cyrano, tu lis [AGENT.md](../AGENT.md) en entier.** AGENT.md est le manuel de référence (tokens, inventaire complet des composants, API exacte, recettes copy-paste, anti-patterns). Ce fichier-ci ne contient que les règles absolues.

Pour explorer visuellement : `npm run dev` lance la preview locale qui rend tous les composants. Le fichier [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) est la doc humaine longue, **pas la source IA**.

## RÈGLE DE FIN DE TÂCHE

**Si tu as ajouté ou modifié un composant dans `src/components/`** : à la fin de ta réponse, lance `npm run ds:gen` pour régénérer l'inventaire (`ds-index.json`). Si tu as ajouté un composant : update aussi `src/docs/codeBlockImports.ts` (sets `KNOWN_*`). Sans ça, la doc machine-readable diverge du code.

## ARCHITECTURE EN 3 COUCHES

Le DS est organisé en trois couches.

- `src/components/core/` — primitives universelles, utilisables partout. Inline styles + tokens CSS variables.
- `src/components/landing/` — composites visuels lourds (WebGL, blobs CSS animés, heroes, banners), pour les pages marketing.
- `src/components/app/` — couche additive pour les surfaces interactives dashboard. Tailwind classes + `cn` helper (pattern shadcn).

**Règles de combinaison** :
1. Une **landing** (site marketing, lead magnet, cas client) combine `core/` + `landing/`.
2. Un **dashboard** (app interne, outil) combine `core/` + `app/`.
3. JAMAIS croiser `landing/` et `app/` dans une même surface.

**Règles de dépendance** :
4. Toujours réutiliser un composant existant avant d'en créer un nouveau.
5. Si un composant est utile aux deux usages : il appartient à `core/`, jamais ailleurs.
6. `core/` ne doit JAMAIS importer depuis `landing/` ou `app/` (cycle interdit).
7. `app/` ne doit pas importer depuis `landing/` (séparation des préoccupations).
8. Imports séparés par couche : `import { CyButton } from '@/components/core'`, `import { CyCtaBanner } from '@/components/landing'`, `import { AppButton } from '@/components/app'`. Ne pas utiliser le barrel global `@/components` (déprécié).

## RÈGLES ABSOLUES

### Couleurs
- Palette d'identité Cyrano : green-300/400/500/600/700, deep-600/700/800/900/950, gray-300 à 900
- Couleurs supplémentaires autorisées au cas par cas (ex : palette Tailwind par défaut yellow / red / violet pour les états d'alerte). Pas de couleur "interdite", utilise ce qui sert le besoin sémantique.
- Préfère les CSS variables (`var(--cy-green-500)`) ou les tokens Tailwind quand ils existent. Les hex en dur sont OK pour les couleurs ponctuelles non-thématiques (ex. status alerts).
- Ombres vertes : utilise les tokens `var(--cy-shadow-green-sm/md/lg/glow)`, jamais d'inline `rgb(5 211 126 / X)`.

### Typographie
- Titres : Poppins (`font-heading`), weights 600-800, letter-spacing -0.02em à -0.03em
- Corps : Satoshi (`font-body`), weights 400-600
- Mono : `font-mono` (`var(--cy-font-mono)`) pour code et data

### Boutons
- core/ : 5 variantes (primary / icon / outlined / ghost / disabled). Rounded-full par défaut. EXCEPTION : variant `icon` en rounded-xl.
- app/ : 6 variantes (default / destructive / outline / secondary / ghost / link). 4 sizes (sm / default / lg / icon).
- CyAnimatedButton : UNIQUEMENT pour les CTAs majeurs (hero, lead magnet, fin de tunnel), un par vue.
- INTERDIT : sparkles, particules, magnetic pull, diamond spin sur les CTAs.

### Logos
- Long en priorité, square uniquement si l'espace ne permet pas.
- White sur fond sombre, black sur fond clair ou vert.
- Jamais de recoloriage, déformation, outline.

### Layout
- max-w-7xl global, max-w-2xl pour formulaires.
- Section padding : py-12 (md), py-20 (large).

### Animations
- Hover : scale 1.02-1.03 + shadow intensify.
- Active : scale 0.97-0.98.
- Duration : 250ms par défaut, ease cubic-bezier(0.4,0,0.2,1) (`var(--cy-transition-base)`).

### Accessibilité
- Focus ring vert sur tous les éléments interactifs (`var(--cy-shadow-green-sm)` ou ring shadcn).
- Contraste min AA partout.

### Backdrop blur
- Header sticky : backdrop-blur-md + bg/80
- Modals : backdrop-blur-lg + bg/60

### Icônes
- Lib officielle : `lucide-react` UNIQUEMENT (déjà installée).
- JAMAIS de SVG inline maison ni d'autres libs (heroicons, feather, react-icons, @carbon/icons-react).
- Import nommé : `import { Download, Mail } from 'lucide-react'`.
- Taille par défaut : 18px (boutons, status), 16px (badges/inline), 24px (hero).
- strokeWidth : 2 par défaut, 2.2 pour les boutons (poids visuel plus fort).

## SI TU HÉSITES

- Paraphrase la question avant de coder.
- Lis [AGENT.md](../AGENT.md) section par section (table des matières en haut du fichier).
- Lance la preview : `npm run dev` puis ouvre http://localhost:3000.
- Ne réinvente jamais un composant existant. Inventaire complet ci-dessous.

### Inventaire core/ (15 composants universels)

CyButton, CyAnimatedButton, CyCard, CyBadge, CyInput, CyTextarea, CyStatus, CyLogo, CySpinner, CyMenuToggle, CyLiveDot, CyLinkPill, CyGradientText, CyScrollHint, CyReveal.

### Inventaire landing/ (5 composants marketing)

CyShaderBg, CyAuroraBg, CyRoadmapStrip, CyCtaBanner, CySecondaryHero.

### Inventaire app/ (20 composants + hook)

AppButton, AppCounterButton, AppCheckbox, AppSelect, AppTabs, AppToggle, AppEditableChip, AppDropdownMenu, AppSidebar, AppPagination, AppDialog, **AppAlertDialog**, **AppPopover**, **AppSheet**, **AppCombobox** (+ AppCommand* primitives), AppDataTable, AppAvatar, AppSkeleton, Tooltip, useToasts.

Pour l'API exacte de chaque composant : [AGENT.md](../AGENT.md) sections 5 et 6.
