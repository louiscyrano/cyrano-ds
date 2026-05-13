# Cyrano Design System

> **Tu es une IA générant du code Cyrano ?** Ne lis pas ce fichier. Va dans [AGENT.md](AGENT.md). Il contient le manuel de référence (tokens, API exacte de chaque composant, recettes copy-paste, anti-patterns) en format optimisé pour la génération de code. Ce fichier-ci est la doc longue humaine, structurée pour lecture séquentielle.
>
> **Tu es un humain ?** Bienvenue. Tu peux aussi explorer visuellement via `npm run dev` (preview locale http://localhost:3000).

Référence textuelle exhaustive. Toute déviation = bug à corriger.

---

## Architecture

Le DS est organisé en **deux couches**. La seconde s'ajoute par-dessus la première — pas en parallèle.

```
src/components/
├── core/    ← primitives universelles, utilisables partout (apps ET landings)
└── app/     ← couche additive pour les surfaces interactives (dashboards, outils)
```

**Règle de priorité** : toujours réutiliser un composant `core/` avant d'en créer un nouveau dans `app/`. Si un composant est utile aux apps ET aux landings, il appartient à `core/`, pas à `app/`.

**Règle de dépendance** : un composant `app/` peut importer librement depuis `core/`. Un composant `core/` ne doit JAMAIS importer depuis `app/` (cycle interdit, archi propre garantie).

| Couche | Pour qui | Exemples |
|---|---|---|
| `core/` | Tout le monde, y compris les landings | CyButton, CyCard, CyBadge, CyInput, CyTextarea, CyStatus, CyLogo, CySpinner, CyAnimatedButton |
| `app/` | Cydash, SERGE, dashboards clients, outils internes | Toggle, Modal, Dropdown, Tabs, Toast, Sidebar nav, DataTable, Skeleton, Pagination |

Une landing utilise donc uniquement `core/`. Un dashboard combine `core/` + `app/`.

Imports possibles :

```tsx
// Centralisé (le plus courant) — les deux couches via le re-export
import { CyButton } from '../components';

// Ciblé par couche (plus tard, quand on aura beaucoup de composants)
import { CyButton } from '../components/core';
import { Modal } from '../components/app';
```

---

## Palette

### Primaire — Green

| Token | Hex | Usage |
|---|---|---|
| `--cy-green-300` | `#74ffc5` | Highlights, accents très clairs |
| `--cy-green-400` | `#30f8a5` | Accents lumineux, dégradés |
| `--cy-green-500` | `#05d37e` | Couleur de marque, CTAs primaires |
| `--cy-green-600` | `#00bc6f` | Hover des CTAs |
| `--cy-green-700` | `#029358` | Pressed, accents foncés |

### Secondaire — Deep

| Token | Hex | Usage |
|---|---|---|
| `--cy-deep-600` | `#016c78` | Sections premium |
| `--cy-deep-700` | `#014751` | Surfaces sombres élevées |
| `--cy-deep-800` | `#063841` | Backgrounds élevés foncés |
| `--cy-deep-900` | `#111827` | Surfaces neutres foncées |
| `--cy-deep-950` | `#030712` | Fond global mode dark |

### Neutres — Gray

`--cy-gray-300` `#d1d5db`, `--cy-gray-400` `#9ca3af`, `--cy-gray-500` `#6b7280`, `--cy-gray-600` `#4b5563`, `--cy-gray-700` `#374151`, `--cy-gray-800` `#1f2937`, `--cy-gray-900` `#111827`.

### Dégradés signatures

| Nom | Composition | Usage |
|---|---|---|
| Principal | `from-green-400 to-green-500` | CTA primaire |
| Alternatif | `from-green-500 to-green-600` | Hover CTAs |
| Hover | `from-green-600 to-green-700` | État pressé |
| Featured | `from-deep-950 via-deep-600 to-green-400` | Sections premium |
| Disabled | `from-gray-700 to-gray-800` | Boutons désactivés |

### Shadows / élévation

Quatre paliers d'ombre **neutres** (noir + opacité). Thémables : opacités fortes en mode dark, douces en mode light. Toujours via tokens — jamais de `box-shadow: 0 X Y rgba(0,0,0,0.Z)` en dur dans les composants.

| Token | Dark (`0 X Y rgba(0,0,0,Z)`) | Light | Usage type |
|---|---|---|---|
| `--cy-shadow-sm` | `0 2px 8px / 0.30` | `/ 0.08` | Hover de cartes, chips, boutons secondaires |
| `--cy-shadow-md` | `0 8px 24px / 0.40` | `/ 0.12` | Cartes au repos, panneaux légers, tooltips |
| `--cy-shadow-lg` | `0 20px 50px / 0.50` | `/ 0.15` | Modals, dropdowns, popovers, sidebars overlay |
| `--cy-shadow-xl` | `0 24px 64px / 0.60` | `/ 0.18` | Hero shots, mockups détachés, focus elements |

```tsx
<div style={{ boxShadow: 'var(--cy-shadow-md)' }} />
```

Les **ombres vertes** (CTAs primary, focus rings, halos sur cards featured) ne sont **pas** des tokens DS. Elles sont composées dans les composants `Cy*` directement via `rgb(var(--cy-green-500-rgb) / X)` ou équivalents — c'est de l'identité de marque, pas de l'élévation neutre.

---

## Typographie

### Familles

- **Heading** — Poppins, weights 400 à 800. Letter-spacing négatif (`-0.02em` à `-0.03em`) pour les gros titres.
- **Body** — Satoshi, variable 100 à 900. Tout le corps de texte, UI, formulaires.

### Hiérarchie

| Tag | Police | Mobile | Tablet | Desktop | Weight | Line-height | Note |
|---|---|---|---|---|---|---|---|
| H1 | Poppins | 36px | 44px | 56px | 800 | 1.05 | gradient text via `bg-clip-text` |
| H2 | Poppins | 28px | 32px | 36px | 700 | 1.1 | letter-spacing `-0.02em` |
| H3 | Poppins | 20px | 22px | 24px | 600 | 1.2 | accent green-400/700 |
| H4 | Poppins | 16px | 17px | 18px | 600 | 1.3 | titres de blocs |

### Breakpoints typo

- **Mobile** : <640px (Tailwind < `sm`)
- **Tablet** : 640px – 1024px (Tailwind `sm` à `lg`)
- **Desktop** : ≥1024px (Tailwind `lg` et au-delà)

Les valeurs desktop sont la référence canonique du DS. Mobile et tablet sont des paliers fixes — pas de `clamp()`, pas d'interpolation fluide. Un projet qui consomme le DS doit appliquer ces trois paliers via media queries ou variantes Tailwind (`text-[36px] sm:text-[44px] lg:text-[56px]`).

### Tailles

`text-xs` 12px, `text-sm` 14px, `text-base` 16px, `text-lg` 18px, `text-xl` 20px.

### Couleurs de texte

`text-primary`, `text-secondary`, `text-tertiary`, `text-accent` — toujours via les CSS variables `--cy-text-*`.

---

## Boutons

Deux familles : boutons animés (CTA signature) et boutons standards (5 variantes).

### `CyAnimatedButton`

CTA majeur. Bordure verte qui tourne en idle, glow uniforme au hover. Disponible en `sm` / `md` / `lg`. **Un seul par vue.**

### `CyButton`

Variants : `primary` / `icon` / `outlined` / `ghost` (+ `secondary` non documenté). Sizes : `sm` / `md` / `lg`. Loading + disabled supportés.

- **primary** : `rounded-full`, `bg-gradient-primary`, texte `deep-950`, shadow `0 6px 20px rgb(5 211 126 / 0.4)`, shine hover en diagonale.
- **icon** : identique à primary mais `rounded-xl` (même radius que CyAnimatedButton). Icône à gauche du texte. Shine hover.
- **outlined** : `rounded-full`, transparent, border 2px green-500, texte vert.
- **ghost** : `rounded-full`, transparent, texte vert, bg green-500/10 au hover.
- **disabled** (prop `disabled` sur primary) : opacity 50 % + dégradé gris, cursor not-allowed.

### Bonnes pratiques

- Un seul bouton principal (ou avec icône) par vue.
- Rounded-full par défaut, exception : variant `icon` en rounded-xl.
- Hover : scale 1.03 + dégradé intensifié, plus shine sur primary et icon.
- Active : scale 0.97.
- Disabled : opacity 50 % + dégradé gris.
- Texte du bouton principal en deep-950 sur le vert.

---

## Animations

### Rotating border

Utilisée par `CyAnimatedButton`. `@property --cy-angle` + `conic-gradient` + `@keyframes cy-rotate`. Idle : la bordure verte tourne. Hover : glow uniforme.

### Hover transitions

Standardisées sur 250ms. Toujours signaler l'interactivité sans distraire.

### Float ambient

Pour les backgrounds décoratifs. Lent (10–30s), faible opacity, blur. Jamais sur du contenu.

### Transitions standards

`transition-colors` / `transition-transform` / `transition-all duration-250` / `ease-out`.

### Animations interdites

Sparkles ou particules sur CTAs, magnetic pull, diamond spin, pulse glow agressifs, fade-in à l'apparition au scroll, tout effet "AI magique".

---

## Composants

### Core (ready)

Path : `src/components/core/`. Importables depuis `'../components'` ou `'../components/core'`.

#### CyButton

Variants `primary` / `icon` / `secondary` / `outlined` / `ghost` × sizes `sm` / `md` / `lg` × `loading` × `disabled` × `icon` + `iconPosition`. ForwardRef.

```tsx
<CyButton variant="primary" size="lg">Démarrer</CyButton>
<CyButton variant="icon" size="md" icon={<Download size={18} />}>Télécharger</CyButton>
<CyButton variant="outlined" loading>Chargement…</CyButton>
```

#### CyAnimatedButton

CTA majeur (`href` ou `onClick`), 3 tailles `sm` / `md` / `lg`. Bordure verte qui tourne en idle, glow uniforme au hover. **Un seul par vue.**

```tsx
<CyAnimatedButton size="lg" href="/signup">Démarrer gratuitement</CyAnimatedButton>
```

#### CyCard

`featured?`, `image?`, `imageAlt?`, `tags?: string[]`, `title?`, `description?`, `action?: ReactNode`. Featured = bordure verte + shadow vert + badge FEATURED.

```tsx
<CyCard
  featured
  title="Outbound autopilot"
  description="Lance des séquences B2B en 30 secondes."
  tags={["AI", "B2B"]}
  action={<CyButton variant="primary" size="sm">Voir</CyButton>}
/>
```

#### CyBadge

Variants `default` / `outlined` / `featured` / `success` / `error` / `warning`. `icon?` optionnel. Tous `rounded-full`.

```tsx
<CyBadge variant="success" icon={<Check size={14} />}>Actif</CyBadge>
```

#### CyInput / CyTextarea

`rounded-lg` (8px) sur les deux. Focus border green-500 + ring 3px green-500/30. Erreur en `--cy-error`. Props : `label?`, `error?`, `hint?`, `iconLeft?`, `iconRight?` (Input). `rows?` (Textarea).

```tsx
<CyInput label="Email" type="email" iconLeft={<Mail size={18} />} placeholder="vous@cyrano.com" />
<CyTextarea label="Message" rows={5} hint="500 caractères max" />
```

#### CyStatus

`type: 'success' | 'error' | 'warning' | 'info'`, `title`, `message?`. Icônes Lucide auto (`CheckCircle`, `XCircle`, `AlertCircle`, `Info`).

```tsx
<CyStatus type="success" title="Campagne envoyée" message="2 134 emails livrés." />
```

#### CyLogo

`variant: 'long' | 'square'`, `theme: 'auto' | 'white' | 'black'`, `size?: number`. Auto suit `data-theme` de l'HTML.

```tsx
<CyLogo variant="long" theme="auto" size={32} />
```

#### CySpinner

Wrapper Lucide `LoaderCircle` + `animate-spin`. `size?: number`.

```tsx
<CySpinner size={24} />
```

#### CyMenuToggle

Hamburger animé (3 traits → croix). Contrôlé (`open` + `onChange`) ou non-contrôlé (`defaultOpen`). `ariaLabel?: { open, close }`.

```tsx
<CyMenuToggle open={isOpen} onChange={setOpen} ariaLabel={{ open: 'Ouvrir menu', close: 'Fermer' }} />
```

#### CyShaderBg

Background animé décoratif basé sur le shader `Warp` de `@paper-design/shaders-react`. Pattern fluide vert/teal qui évoque le mouvement et la fluidité — usage type : CTAs intermédiaires, accents premium, hero sections.

Props :

- `preset?: 'brand' | 'muted'` — palette de couleurs. `'brand'` (défaut) = vert lumineux (green-300/400/500 + deep-700). `'muted'` = palette plus sombre/discrète (green-500 + deep-700/800/900) pour fond de section.
- `intensity?: 'low' | 'medium' | 'high'` — module `distortion` / `swirl` / `speed`. `'low'` = animation calme, `'medium'` (défaut) = équilibre signature, `'high'` = très dynamique.
- `className?: string` — overrides ponctuels (positionnement spécifique, opacité, blend mode).

Le composant se positionne `absolute inset-0` par défaut avec `pointer-events: none` et `aria-hidden`. **Toujours sur un parent en `position: relative`.**

```tsx
<div className="relative overflow-hidden rounded-3xl">
  <CyShaderBg preset="brand" intensity="medium" />
  <div className="relative z-10 p-12 text-white">
    <h2>Démarrer maintenant</h2>
    <CyAnimatedButton size="lg" href="/signup">Lancer</CyAnimatedButton>
  </div>
</div>
```

Les props bas niveau de `Warp` (proportion, softness, swirlIterations, shape, etc.) sont volontairement masquées — pour accéder au contrôle fin, importer `Warp` directement plutôt que d'élargir l'API DS.

**Règles d'usage** :

- Toujours `aria-hidden` (déjà appliqué par défaut).
- Le contenu posé par-dessus doit avoir un contraste suffisant (texte clair sur preset `brand`, possible sur les deux pour `muted`).
- `intensity="high"` réservé aux moments forts : **un seul par page** (équivalent à la règle CyAnimatedButton).
- Préférer `intensity="medium"` ou `low` pour les sections récurrentes.

### `CyLiveDot`

Point animé "live" / status indicator, version finale du pattern utilisé dans le bandeau clients du site Cyrano (à gauche de "Cyrano travaille au quotidien avec") et dans les eyebrows premium.

**API** :

```tsx
<CyLiveDot size={6} color="var(--cy-green-400)" pulse={true} />
```

**Props** :

- `size?: number` — diamètre en px (default `6`).
- `color?: string` — couleur du dot (default `var(--cy-green-400)`).
- `pulse?: boolean` — active l'animation pulse opacity 1 → 0.45 → 1 sur 2.4s (default `true`).
- `className?: string`, `style?: CSSProperties`.

**Règles d'usage** :

- À placer à gauche d'un eyebrow, d'un badge "LIVE", d'un label de feed.
- `aria-hidden` appliqué automatiquement, c'est un élément décoratif.
- `prefers-reduced-motion` désactive l'animation.
- Glow proportionnel à `size` (box-shadow auto-calculée).

### `CyLinkPill`

Mini-CTA secondaire en pill arrondi, fond glassmorphic vert. Pour les liens contextuels (sources, citations, lectures complémentaires) qui appellent un design plus délicat qu'un `CyButton`. **Ce n'est pas un CTA primaire** : si l'action est centrale, utilise `CyButton` ou `CyAnimatedButton`.

**API** :

```tsx
<CyLinkPill href="https://..." external icon={<ArrowUpRight size={12} />}>
  Lire l'article
</CyLinkPill>
```

**Props** :

- `href: string` — URL cible.
- `children: ReactNode` — label.
- `icon?: ReactNode` — icône lucide à droite du label.
- `external?: boolean` — applique `target="_blank"` + `rel="noopener noreferrer"`.
- `target?`, `rel?`, `aria-label?`, `className?`, `style?`.

**Règles d'usage** :

- Padding fixe `7px 13px`, font-size `--cy-text-xs`, uppercase, letter-spacing 0.06em.
- Fond `rgba(green-500, 0.08)`, border `rgba(green-500, 0.25)`. Hover : opacité doublée.
- Backdrop-filter `blur(8px)` activé : pose-le sur un fond riche (shader, photo, gradient) pour le glassmorphic.
- N'utilise pas comme CTA principal d'une section.

### `CyAuroraBg`

Fond animé "aurora" : 3 blobs verts qui dérivent + grain SVG + vignette gradient. Pure CSS (vs `CyShaderBg` qui utilise WebGL via Warp). À placer en background absolu d'une carte ou banner premium.

**API** :

```tsx
<article style={{ position: 'relative', overflow: 'hidden', isolation: 'isolate' }}>
  <CyAuroraBg intensity="medium" />
  <div style={{ position: 'relative', zIndex: 1 }}>{content}</div>
</article>
```

**Props** :

- `intensity?: 'subtle' | 'medium' | 'strong'` — opacité globale des blobs (default `medium`).
- `vignette?: boolean` — gradient sombre haut/bas pour fondre dans le contexte (default `true`).
- `grain?: boolean` — grain SVG en surimpression (default `true`).
- `className?`, `style?`.

**Règles d'usage** :

- Le parent doit avoir `position: relative`, `overflow: hidden`, `isolation: isolate`.
- Le contenu posé par-dessus doit avoir `position: relative; z-index: 1` (le composant est `aria-hidden` et `z-index: 0`).
- `intensity="strong"` réservé aux winner cards / moments forts. **Un par section, max.**
- `prefers-reduced-motion` désactive le drift des blobs.
- `CyAuroraBg` vs `CyShaderBg` : préférer `CyAuroraBg` pour les cartes statiques (pas de WebGL = pas de lag GPU sur mobile). `CyShaderBg` reste meilleur pour les fonds plein écran ou les CTAs banner où le mouvement est plus rapide.

### `CyGradientText`

Helper qui applique un gradient sur un mot ou une phrase via `background-clip: text`. Centralise le pattern réutilisé dans tous les titres premium (`Hero`, `EntrepriseHero`, `EntrepriseThese`, `RoadmapCta`).

**API** :

```tsx
<h1>Votre <CyGradientText>bras droit IA</CyGradientText>, spécialiste B2B.</h1>
```

**Props** :

- `children: ReactNode` — texte à dégrader.
- `preset?: 'green' | 'green-soft' | 'green-strong'` — preset de gradient. Default `green`.
- `gradient?: string` — override complet via CSS gradient (rare).
- `as?: keyof JSX.IntrinsicElements` — element rendu. Default `span`. Utile pour wrap un mot dans un `h1` sans break sémantique.
- `className?`, `style?`.

**Règles d'usage** :

- Un mot, une expression courte (2-4 mots) maximum. Pas une phrase entière.
- Un seul `CyGradientText` par titre.
- Toujours dans un titre ou une phrase d'accroche, jamais dans du body.

### `CyScrollHint`

Indicateur visuel "continue à scroller" via chevron-down animé bounce. À placer entre une accroche et le contenu suivant pour signaler la suite (au-dessus d'un embed Calendly, en fin de hero long).

**API** :

```tsx
<CyScrollHint />
<CyScrollHint size={20} color="var(--cy-text-secondary)" />
```

**Props** :

- `size?: number` — taille de l'icône en px. Default `28`.
- `color?: string` — couleur du chevron. Default `var(--cy-text-accent)`.
- `bounce?: boolean` — active l'animation bounce 2.2s. Default `true`.
- `aria-label?: string` — passe le composant en mode sémantique si fourni.
- `className?`, `style?`.

**Règles d'usage** :

- Décoratif par défaut (`aria-hidden`). Si la flèche a une fonction interactive (lien d'ancre), passer `aria-label`.
- Un seul scroll hint visible à la fois.
- `prefers-reduced-motion` désactive l'animation.

### `CyReveal`

Wrapper qui fade-up les enfants à l'entrée du viewport via `IntersectionObserver`. Pour orchestrer une apparition progressive sur les sections longues.

**API** :

```tsx
<CyReveal>Titre</CyReveal>
<CyReveal delay={1}>Lede</CyReveal>
<CyReveal delay={2}>Body</CyReveal>
```

**Props** :

- `children: ReactNode`.
- `delay?: 0 | 1 | 2 | 3 | 4 | 5` — stagger (80ms par cran). Default `0`.
- `threshold?: number` — seuil IntersectionObserver. Default `0.08`.
- `rootMargin?: string` — marge IntersectionObserver. Default `'0px 0px -8% 0px'`.
- `as?: keyof JSX.IntrinsicElements` — element rendu. Default `div`.
- `className?`, `style?`.

**Règles d'usage** :

- À utiliser sur les éléments structurants d'une section (titre, lede, cartes), pas sur du texte au km.
- Respect strict de `prefers-reduced-motion` : élément rendu visible directement.
- Implémentation native (pas de motion lib), zéro coût supplémentaire.

### `CyRoadmapStrip`

Strip horizontal de pills numérotées séparées par des flèches. Pour roadmaps, pipelines, parcours utilisateur, étapes d'un process.

**API** :

```tsx
<CyRoadmapStrip
  steps={[
    { num: '01', label: 'Audit' },
    { num: '02', label: 'Cibles' },
    { num: '03', label: 'Messages' },
  ]}
/>
```

**Props** :

- `steps: { num: string; label: string }[]` — la liste des étapes.
- `maxWidth?: number` — largeur max du strip en px. Default `800`.
- `arrows?: boolean` — affiche les flèches entre pills. Default `true`.
- `className?`, `style?`.

**Règles d'usage** :

- 3 à 6 étapes idéalement. Plus de 6, ça déborde même sur desktop large.
- Desktop : une ligne. Mobile : wrap en 3 par ligne (flèches masquées automatiquement).
- Décoratif (`aria-hidden`). Pour rendre sémantique, wrap dans un `<nav aria-label="...">` côté usage.

### `CyCtaBanner`

Banner CTA section pleine largeur, signature Cyrano. Compose `CyAuroraBg` + `CyGradientText` + `CyRoadmapStrip` (optionnel) + `CyButton`. À placer entre 2 sections pour relancer l'attention et offrir une porte de sortie.

**API** :

```tsx
<CyCtaBanner
  eyebrow="La roadmap"
  titleBefore="Comment ça se passe "
  titleAccent="concrètement"
  titleAfter=" ?"
  subtitle="Votre roadmap Cyrano en 6 étapes."
  steps={[{ num: '01', label: 'Audit' }, ...]}
  buttonLabel="Découvrir"
  href="/#agence"
  buttonIcon={<ArrowRight size={16} />}
/>
```

**Props** :

- `titleBefore: string`, `titleAccent?: string`, `titleAfter?: string` — composition du titre avec un mot en gradient.
- `subtitle?: string` — sous-titre.
- `eyebrow?: ReactNode` — eyebrow optionnel.
- `steps?: RoadmapStep[]` — passe `CyRoadmapStrip` automatiquement.
- `buttonLabel: string` — label du bouton primaire.
- `href: string` — URL ou ancre (`#agence` scroll smooth, URL nav).
- `buttonIcon?: ReactNode` — icône du bouton.
- `variant?: 'aurora' | 'plain'` — variante visuelle. Default `aurora`.
- `className?`.

**Règles d'usage** :

- **Un seul `CyCtaBanner` par page** (équivalent à la règle "un CyAnimatedButton par page").
- Variant `aurora` pour les moments forts, `plain` pour un usage plus discret.
- Le bouton intérieur utilise `CyButton variant="primary"`. Pour un effet plus marqué, utiliser `CyAnimatedButton` directement et composer le banner soi-même.

### App (en cours)

Path : `src/components/app/`. Couche additive pour les surfaces interactives. À créer au fur et à mesure des besoins de Cydash, SERGE et autres outils internes.

**Conventions stylistiques** : les composants de cette couche utilisent **Tailwind classes + `cn` helper** (pattern shadcn), pas inline styles. La config Tailwind mappe les tokens shadcn (`bg-primary`, `text-foreground`, etc.) vers les tokens Cyrano. Helper `cn` dans `src/lib/utils.ts`.

**Règle vert** : sur la couche app, le vert est réservé aux états signifiants (sélection active, action principale, focus a11y, identité d'un toggle ON). Pas de vert sur les hovers ou états neutres — préférer `hover:bg-accent` (gris adaptatif au theme).

Composants organisés en 4 catégories :

#### Actions

##### AppButton

Bouton utilitaire compact. Variants `default` / `destructive` / `outline` / `secondary` / `ghost` / `link` × sizes `default` / `sm` / `lg` / `icon`. CVA, `asChild` (Radix Slot), forwardRef.

```tsx
<AppButton variant="outline" size="sm">Filtrer</AppButton>
<AppButton variant="destructive">Supprimer</AppButton>
<AppButton asChild><a href="/login">Se connecter</a></AppButton>
```

##### AppCounterButton

`count: number | string`, `icon?`, `size: 'sm' | 'default' | 'lg'`. Variant outline figé (autonome, ne dépend pas d'AppButton).

```tsx
<AppCounterButton count={12} icon={<Inbox size={16} />}>Inbox</AppCounterButton>
```

##### AppDropdownMenu

Menu contextuel Radix avec drill-down (`AppDropdownMenuPage` / `AppDropdownMenuPageTrigger`). Items normaux, checkbox, radio, séparateurs, label.

```tsx
<AppDropdownMenu>
  <AppDropdownMenuTrigger asChild><AppButton variant="outline">Options</AppButton></AppDropdownMenuTrigger>
  <AppDropdownMenuContent>
    <AppDropdownMenuItem>Profil</AppDropdownMenuItem>
    <AppDropdownMenuSeparator />
    <AppDropdownMenuItem>Déconnexion</AppDropdownMenuItem>
  </AppDropdownMenuContent>
</AppDropdownMenu>
```

#### Saisie & sélection

##### AppCheckbox

Case à cocher Radix. Indicateur vert sur l'état coché uniquement.

```tsx
<AppCheckbox id="opt" defaultChecked />
<label htmlFor="opt">Notifications</label>
```

##### AppSelect

Menu déroulant Radix avec portal opaque. Sous-composants : `AppSelect`, `AppSelectTrigger` (`size: 'sm' | 'default'`), `AppSelectValue`, `AppSelectContent`, `AppSelectItem`, `AppSelectGroup`, `AppSelectLabel`, `AppSelectSeparator`.

```tsx
<AppSelect>
  <AppSelectTrigger><AppSelectValue placeholder="Choisir" /></AppSelectTrigger>
  <AppSelectContent>
    <AppSelectItem value="a">Option A</AppSelectItem>
    <AppSelectItem value="b">Option B</AppSelectItem>
  </AppSelectContent>
</AppSelect>
```

##### AppToggle

Interrupteur on/off avec animation spring (motion). Vert = identité de l'état ON. Props : `checked?`, `defaultChecked?`, `onChange?`, `labels: { off, on }`, `showLabels?`, `disabled?`.

```tsx
<AppToggle defaultChecked labels={{ off: 'Manuel', on: 'Auto' }} />
```

##### AppEditableChip

Chip avec édition inline. Le clic sur le label est inerte ; seul le stylo passe en mode édition. Props : `defaultLabel?`, `onChange?`.

```tsx
<AppEditableChip defaultLabel="Watchlist" onChange={(v) => save(v)} />
```

#### Navigation

##### AppTabs

Tabs Radix. Sous-composants : `AppTabs` (`variant: 'default' | 'underline'`), `AppTabsList`, `AppTabsTab`, `AppTabsPanel` (alias `AppTabsTrigger` / `AppTabsContent`). Default = segmented avec ombre. Underline = trait sous l'onglet actif.

```tsx
<AppTabs defaultValue="overview" variant="default">
  <AppTabsList>
    <AppTabsTab value="overview">Vue</AppTabsTab>
    <AppTabsTab value="settings">Paramètres</AppTabsTab>
  </AppTabsList>
  <AppTabsPanel value="overview">…</AppTabsPanel>
  <AppTabsPanel value="settings">…</AppTabsPanel>
</AppTabs>
```

##### AppPagination

Wrapper sémantique. Sous-composants : `AppPaginationContent`, `AppPaginationItem`, `AppPaginationEllipsis`. À combiner avec `AppButton` (ghost pour pages non actives, outline pour la page courante).

```tsx
<AppPagination>
  <AppPaginationContent>
    <AppPaginationItem><AppButton variant="ghost" size="sm">1</AppButton></AppPaginationItem>
    <AppPaginationItem><AppButton variant="outline" size="sm">2</AppButton></AppPaginationItem>
    <AppPaginationEllipsis />
  </AppPaginationContent>
</AppPagination>
```

##### AppDataTable

Table générique `<TData>`. Props : `data`, `columns: ColumnDef<TData>[]`, `visibleColumns?: Set<string>`, `emptyMessage?`, `disableRowAnimation?`. `ColumnDef = { key, label, render?, cellClassName?, headClassName? }`. Animation row-by-row au montage. Composé via les primitives `AppTable` / `AppTableHeader` / `AppTableBody` / `AppTableRow` / `AppTableHead` / `AppTableCell` (exposées séparément si besoin).

```tsx
<AppDataTable
  data={leads}
  columns={[
    { key: 'name', label: 'Nom' },
    { key: 'email', label: 'Email', render: (r) => <a href={`mailto:${r.email}`}>{r.email}</a> },
  ]}
/>
```

##### AppAvatar

Radix Avatar avec fallback. Sous-composants : `AppAvatar`, `AppAvatarImage`, `AppAvatarFallback`. Empilable via `flex -space-x-2 + border-2 border-background`.

```tsx
<AppAvatar>
  <AppAvatarImage src="/u.jpg" alt="Louis" />
  <AppAvatarFallback>LO</AppAvatarFallback>
</AppAvatar>
```

##### AppSkeleton

Placeholder de chargement minimaliste. `<div className="animate-pulse rounded-lg bg-muted" />` avec dimensions/forme via `className`. Pas de variants — le user compose les patterns.

```tsx
<AppSkeleton className="h-10 w-10 rounded-full" />
<AppSkeleton className="h-4 w-32" />
```

##### AppSidebar

Shell rail icon + panel détail collapsible. Props : `rail`, `activeId`, `onNavChange`, `panelTitle`, `sections`, `bottomRail?`, `user?`, `brand?`, `searchable?`, `defaultPanelCollapsed?`. Thème sombre forcé.

```tsx
<AppSidebar
  brand={<CyLogo variant="square" />}
  rail={[{ id: 'home', icon: <Home size={20} />, label: 'Accueil' }]}
  activeId="home"
  onNavChange={setActive}
  panelTitle="Cyrano"
  sections={sections}
/>
```

#### Overlays

##### Tooltip

Wrapper Radix. Sous-composants : `TooltipProvider` (à monter une fois), `Tooltip`, `TooltipTrigger` (`asChild`), `TooltipContent` (`side?`, `sideOffset?`). Fond inversé.

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <AppButton variant="ghost" size="icon"><Info size={16} /></AppButton>
    </TooltipTrigger>
    <TooltipContent>Info contextuelle</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

##### AppDialog

Modal Radix Dialog. Sous-composants : `AppDialogTrigger`, `AppDialogContent`, `AppDialogHeader` (close X auto, `hideCloseButton?`), `AppDialogBody`, `AppDialogFooter`, `AppDialogTitle`, `AppDialogDescription`, `AppDialogClose`, `AppDialogPortal`, `AppDialogOverlay`. Backdrop blur, animations fade+zoom.

```tsx
<AppDialog>
  <AppDialogTrigger asChild><AppButton>Ouvrir</AppButton></AppDialogTrigger>
  <AppDialogContent>
    <AppDialogHeader>
      <AppDialogTitle>Confirmation</AppDialogTitle>
      <AppDialogDescription>Cette action est irréversible.</AppDialogDescription>
    </AppDialogHeader>
    <AppDialogFooter>
      <AppDialogClose asChild><AppButton variant="ghost">Annuler</AppButton></AppDialogClose>
      <AppButton variant="destructive">Supprimer</AppButton>
    </AppDialogFooter>
  </AppDialogContent>
</AppDialog>
```

##### AppToast (hook)

Système de notifications éphémères avec stack accordéon. Hook `useToasts()` qui retourne `{ message, success, warning, error }`. Auto-dismiss 3s, pause au hover, `preserve: true` + `action` pour CTA. Le container se mount automatiquement sur `<body>` au premier appel.

```tsx
const toast = useToasts();
toast.success('Campagne envoyée');
toast.message({ text: 'Lead supprimé', action: 'Annuler', onAction: undo });
```

---

## Quand utiliser quoi

Arbres de décision pour les composants ambigus. Si l'IA hésite, c'est ici qu'on tranche.

### Boutons : CyButton vs CyAnimatedButton vs AppButton

```
Tu construis quoi ?
├── Une landing / page produit / lead magnet
│   ├── C'est LE CTA principal de la vue (hero, fin de tunnel) ?
│   │   → CyAnimatedButton (un seul par vue)
│   └── Sinon
│       → CyButton (variant primary / outlined / ghost selon hiérarchie)
└── Un dashboard / outil interne
    → AppButton (variant default / outline / ghost / destructive selon contexte)
```

### Carte vs simple bloc

```
C'est du contenu structuré (article, produit, feature card avec image/titre/desc) ?
├── Oui → CyCard
└── Non, juste un conteneur visuel → <div className="rounded-xl border p-6"> (pas de composant)
```

### Modal vs menu vs select vs tooltip

```
Tu présentes quoi ?
├── Action complexe / formulaire / confirmation destructive → AppDialog
├── Liste de choix rapide depuis un trigger (actions sur un lead, options) → AppDropdownMenu
├── Sélection de valeur dans un formulaire (single value picker) → AppSelect
└── Hint contextuel au survol d'un élément → Tooltip
```

### Saisie

```
Champ texte → CyInput (toujours, AppInput n'existe pas encore)
Multi-lignes → CyTextarea
Toggle on/off → AppToggle (apps) ou CyButton variant ghost avec état pressed (landings)
Case à cocher dans une liste → AppCheckbox
Chip éditable inline → AppEditableChip
```

### Feedback utilisateur

```
Message d'état permanent dans la page (alerte, status banner) → CyStatus
Notification éphémère après une action (toast) → useToasts (.message / .success / .warning / .error)
Placeholder de chargement (carte, ligne, avatar) → AppSkeleton (composer avec className)
Spinner inline (bouton loading, fetch en cours) → CySpinner
```

### Tables

```
Affichage tabulaire de données structurées avec colonnes typées
├── Cas standard (data + columns config) → AppDataTable
└── Cas avancé (besoin de contrôle fin sur les cellules) → AppTable + primitives bas niveau
```

---

## Layout

### Containers

`max-w-7xl` 1280px (layout), `max-w-5xl` 1024px (articles), `max-w-4xl` 896px (hero), `max-w-2xl` 672px (formulaires).

### Padding

Padding horizontal responsive : `px-4 sm:px-6 lg:px-8` (16 → 24 → 32). Padding vertical de section : `py-12` (48px) ou `py-20` (80px) pour les sections larges. Pas de valeurs arbitraires.

### Spacing entre éléments

`space-x-2` 8px, `space-x-4` 16px, `space-x-8` 32px (alignement inline). `gap-4` 16px, `gap-6` 24px (grid/flex).

### Border radius

`rounded-sm` 4px, `rounded-lg` 8px, `rounded-xl` 12px, `rounded-2xl` 16px, `rounded-3xl` 24px (modals, overlays), `rounded-full` 9999px.

### Grid System

Patterns récurrents : `grid grid-cols-2 md:grid-cols-4 gap-4` (catalogue mobile/desktop), `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6` (cards responsive).

### Breakpoints

`sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536.

---

## Interactions

- **Hover** : tout interactif signale son état. Cards : translate-y -2px + border vert. Boutons : scale + shadow.
- **Focus (a11y)** : ring vert 2px, offset 2px. Toujours visible.
- **Transitions** : `transition-colors`, `transition-transform`, `transition-all` × `duration-150` / `250` / `400` × `ease-out`.

---

## Z-Index

```
z-0      Background (DynamicBackground, particules)
z-10     Contenu principal
z-50     Header sticky
z-60     Hello bar
z-[100]  Dropdowns
z-[500]  Mobile menu
z-[1000] Modals
z-[9999] Overlays fullscreen
```

Toujours utiliser ces valeurs. Jamais de z-index arbitraire.

---

## Icônes

Lib officielle : **`lucide-react`**. Aucune autre lib d'icônes ni SVG inline maison.

```tsx
import { Download, Mail, ArrowRight } from 'lucide-react';
```

Tailles par défaut : 18px (dans les boutons et status), 16px (inline avec du texte / badges), 24px (en hero ou stand-alone). `strokeWidth` 2 par défaut, 2.2 pour les boutons.

---

## Brand

### Logos

- `cyrano_long_white.svg` — fond sombre, wordmark complet.
- `cyrano_long_black.svg` — fond clair ou vert.
- `cyrano_square_white.svg` — symbole seul, fond sombre.
- `cyrano_square_black.svg` — symbole seul, fond clair ou vert.

### Règles d'usage

- Clear-space minimum : la hauteur du C autour du logo.
- Taille min : 24px en hauteur (long), 32px (square).
- White sur fond sombre, black sur fond clair ou vert.
- Jamais de recoloriage, déformation, outline, drop-shadow, embossing.

---

## Guidelines IA

Section critique. À injecter dans le contexte de Claude Code / Cursor / Lovable.

### Règles absolues

1. Palette d'identité Cyrano : green-300/400/500/600/700, deep-600/700/800/900/950, gray-300 à 900. Couleurs supplémentaires (yellow / red / violet, etc.) autorisées au cas par cas pour les états d'alerte ou cas sémantiques précis.
2. Préfère les CSS variables `--cy-green-500` ou les tokens Tailwind quand ils existent ; les hex en dur sont OK pour les couleurs ponctuelles non-thématiques.
3. Titres en Poppins, corps en Satoshi.
4. Boutons en `rounded-full` par défaut, `rounded-xl` uniquement pour la variant `icon`.
5. `CyAnimatedButton` uniquement pour les CTAs majeurs (un par vue), 3 tailles disponibles.
6. Pas de sparkles, particules, magnetic pull, diamond spin.
7. Logos : white sur sombre, black sur clair ou vert. Pas de recoloriage.
8. Focus ring vert sur tous les éléments interactifs.

### Tokens à coller

Voir `src/styles/tokens.css` ou la section "Tokens couleurs" de la doc interactive.

### Prompt système IA

Voir [`prompts/system-prompt.md`](./prompts/system-prompt.md). À coller en tête de chaque conversation IA qui produit du code Cyrano.

### Composants réutilisables

Ne jamais réimplémenter ce qui existe : `CyButton`, `CyAnimatedButton`, `CyCard`, `CyBadge`, `CyInput`, `CyTextarea`, `CyStatus`, `CyLogo`, `CySpinner`, `CyMenuToggle`, `CyShaderBg`.
