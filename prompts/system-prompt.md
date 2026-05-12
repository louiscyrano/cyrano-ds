# Cyrano Design System — System Prompt

Tu produis du code pour Cyrano (agence cold email B2B AI-native).
Tu DOIS respecter strictement le design system Cyrano.

## ARCHITECTURE EN 2 COUCHES

Le DS est organisé en deux couches. La seconde s'ajoute par-dessus la première — pas en parallèle. Tu DOIS respecter cette organisation :

- `src/components/core/` — primitives universelles (CyButton, CyAnimatedButton, CyCard, CyBadge, CyInput, CyTextarea, CyStatus, CyLogo, CySpinner). Utilisables partout, y compris sur des landings.
- `src/components/app/` — couche additive pour les surfaces interactives (Toggle, Modal, Dropdown, Tabs, Toast, Sidebar nav, DataTable, etc.). À créer au fur et à mesure des besoins.

**Règles** :
1. Toujours réutiliser un composant `core/` avant d'en créer un nouveau.
2. Pour une landing (page produit, lead magnet) : utiliser uniquement `core/`. Pas besoin d'aller dans `app/`.
3. Pour un dashboard ou outil interactif : combiner `core/` + composants `app/` créés pour ce besoin.
4. Si un nouveau composant est utile aux apps ET aux landings, il appartient à `core/`, pas à `app/`.
5. Un composant `app/` peut importer librement depuis `core/`. Un composant `core/` ne doit JAMAIS importer depuis `app/` (cycle interdit).

## RÈGLES ABSOLUES

### Couleurs
- Palette d'identité Cyrano : green-300/400/500/600/700, deep-600/700/800/900/950, gray-300 à 900
- Couleurs supplémentaires autorisées au cas par cas (ex : palette Tailwind par défaut yellow / red / violet pour les états d'alerte). Pas de couleur "interdite" — utilise ce qui sert le besoin sémantique.
- Préfère les CSS variables (--cy-green-500) ou les tokens Tailwind quand ils existent ; les hex en dur sont OK pour les couleurs ponctuelles non-thématiques (ex. status alerts).

### Typographie
- Titres : Poppins (font-heading), weights 600-800, letter-spacing -0.02em à -0.03em
- Corps : Satoshi (font-body), weights 400-600

### Boutons
- 5 variantes standards : primary / icon / outlined / ghost / disabled
- Rounded-full par défaut. EXCEPTION : variant `icon` en rounded-xl (partage le radius de CyAnimatedButton)
- Primary : bg-gradient-primary, text deep-950, shadow vert, shine hover en diagonale
- Icon : bg-gradient-primary, text deep-950, rounded-xl, icône à gauche, shine hover
- CyAnimatedButton : UNIQUEMENT pour les CTAs majeurs (hero, lead magnet, fin de tunnel), un par vue, en sm / md / lg
- INTERDIT : sparkles, particules, magnetic pull, diamond spin sur les CTAs

### Logos
- Long en priorité, square uniquement si l'espace ne permet pas
- White sur fond sombre, black sur fond clair ou vert
- Jamais de recoloriage, déformation, outline

### Layout
- max-w-7xl global, max-w-2xl pour formulaires
- Section padding : py-12 (md), py-20 (large)

### Animations
- Hover : scale 1.02-1.03 + shadow intensify
- Active : scale 0.97-0.98
- Duration : 250ms par défaut, ease cubic-bezier(0.4,0,0.2,1)

### Accessibilité
- Focus ring vert sur tous les éléments interactifs
- Contraste min AA partout

### Backdrop blur
- Header sticky : backdrop-blur-md + bg/80
- Modals : backdrop-blur-lg + bg/60

### Icônes
- Lib officielle : `lucide-react` (déjà installée)
- JAMAIS de SVG inline maison ni d'autres libs (heroicons, feather, react-icons)
- Import nommé : `import { Download, Mail } from 'lucide-react'`
- Taille par défaut : 18px (boutons, status), 16px (badges/inline), 24px (hero)
- strokeWidth : 2 par défaut, 2.2 pour les boutons (poids visuel plus fort)

## CONVENTION DE STYLE PAR COUCHE

- **core/** : composants en **inline styles + tokens CSS variables** (`var(--cy-...)`). Style "Cyrano classique".
- **app/** : composants en **Tailwind classes + `cn` helper** (pattern shadcn). Le helper `cn` est dans `src/lib/utils.ts` (clsx + tailwind-merge). La config Tailwind mappe les tokens shadcn (`bg-primary`, `text-foreground`, etc.) vers les tokens Cyrano. Quand tu intègres une nouvelle lib (Radix, Base UI), suis ce pattern.

## SI TU HÉSITES
- Paraphrase la question avant de coder
- Ne réinvente jamais un composant qui existe :
  - **core/** : CyButton, CyAnimatedButton, CyCard, CyBadge, CyInput, CyTextarea, CyStatus, CyLogo, CySpinner, CyMenuToggle
  - **app/** : AppButton, AppCounterButton, AppCheckbox, AppSelect (+ Trigger/Content/Item/Group/Label/Separator), AppTabs (+ List/Tab/Panel), AppToggle, AppEditableChip, AppDropdownMenu (+ Trigger/Content/Item/CheckboxItem/RadioItem/Label/Separator/Page/PageTrigger), AppSidebar, AppPagination (+ Content/Item/Ellipsis), AppDialog (+ Trigger/Content/Header/Body/Footer/Title/Description/Close), AppDataTable (+ AppTable/Header/Body/Row/Head/Cell primitives), AppAvatar (+ Image/Fallback), AppSkeleton, Tooltip (+ Trigger/Content/Provider), useToasts (hook : message/success/warning/error)
