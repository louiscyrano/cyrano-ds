# Cyrano DS — Manuel agent

> Tu produis du code pour Cyrano (agence cold email B2B). Lis ce fichier en entier avant d'écrire. Tu RÉUTILISES les composants ci-dessous, tu ne réinventes pas, tu ne sors pas du stack.

**Dernière mise à jour** : mai 2026 — React 18, Tailwind 3, TypeScript strict, Vite.

---

## 0. Règle de synchronisation doc / preview

**`DESIGN_SYSTEM.md` et la preview React (`src/App.tsx`) sont les deux faces du même DS.** Toute modification documentaire dans `DESIGN_SYSTEM.md` (tokens, hiérarchie typo, breakpoints, règles d'usage…) DOIT être propagée dans la section correspondante de `src/App.tsx` pour que le changement soit visible dans la preview. Inversement, toute modif visuelle propagée dans la preview doit être reflétée dans `DESIGN_SYSTEM.md` pour rester la spec canonique.

Pas de doc qui dérive du code, pas de code qui dérive de la doc.

---

## Imports types

```tsx
// Imports séparés par couche (discipline DS, le barrel global est déprécié)
import { CyButton, CyCard, CyInput } from '@/components/core';
import { CyCtaBanner, CySecondaryHero } from '@/components/landing'; // pages marketing
import { AppButton, AppDialog, useToasts } from '@/components/app';   // dashboards

// Icônes : lucide-react UNIQUEMENT
import { Download, Mail, Info, ArrowRight } from 'lucide-react';

// Helpers
import { cn } from '@/lib/utils';
```

---

## Fichiers de référence

- **AGENT.md** (ce fichier) : manuel de référence complet pour générer du code.
- **prompts/system-prompt.md** : règles absolues condensées. Charge par défaut.
- **DESIGN_SYSTEM.md** : doc humaine longue (non destinée à l'IA).
- **ds-index.json** : inventaire machine-readable auto-généré (composants par couche + tokens groupés). Pour un résumé compact (3KB) au lieu de relire 25KB de manuel. Régénérer avec `npm run ds:gen` après toute modif d'export.
- **Preview** : `npm run dev` puis http://localhost:3000.

## Scripts utilitaires

```bash
npm run ds:gen            # Régénère ds-index.json depuis src/
npm run ds:check-tokens   # Lint : aucun hex hardcodé hors tokens.css
npm run ds:check          # Combinés (tokens + tsc --noEmit)
```

Lance `npm run ds:check` avant de proposer un PR pour vérifier qu'aucune couleur n'a été inlinée par erreur.

---

## Carte d'auto-routage

Avant d'écrire, identifie ton besoin et va directement à la bonne section.

| Tu veux… | Tu utilises… | Section |
|---|---|---|
| Un bouton sur une landing | `CyButton`, `CyAnimatedButton` | §5 |
| Un bouton dans un dashboard | `AppButton` (`variant` × `size`) | §6 |
| Un input / formulaire | `CyInput`, `CyTextarea`, `CyStatus` (erreurs) | §5 |
| Un sélecteur < 10 options | `AppSelect` | §6 |
| Un sélecteur > 10 options + recherche | `AppCombobox` | §6 |
| Un menu contextuel (actions) | `AppDropdownMenu` | §6 |
| Un popover (filtres, mini-form, date) | `AppPopover` | §6 |
| Un tooltip (texte court d'aide) | `Tooltip` | §6 |
| Une modale d'édition | `AppDialog` | §6 |
| Une confirmation destructive | `AppAlertDialog` (pas Dialog) | §6 |
| Un drawer mobile / panneau de détail | `AppSheet` (`side` : right/left/top/bottom) | §6 |
| Un toast / notification éphémère | `useToasts()` | §6 |
| Une table de données | `AppDataTable` (ou `AppTable` primitives) | §6 |
| Un layout dashboard (rail + panel) | `AppSidebar` | §6 |
| Un effet visuel léger (gradient text, scroll hint, live dot, reveal) | `CyGradientText`, `CyScrollHint`, `CyLiveDot`, `CyReveal` | §5 (core) |
| Un background animé lourd (WebGL ou CSS blobs) | `CyShaderBg`, `CyAuroraBg` | §5.1 (landing) |
| Un hero secondaire de page marketing | `CySecondaryHero` | §5.1 (landing) |
| Une roadmap visuelle (pipeline d'étapes) | `CyRoadmapStrip` | §5.1 (landing) |
| Une bannière CTA fin de page marketing | `CyCtaBanner` | §5.1 (landing) |
| Un token de couleur / spacing / ombre | `var(--cy-*)` ou classe Tailwind mappée | §3 |
| Une ombre verte (CTA, focus) | `var(--cy-shadow-green-sm/md/lg/glow)` | §3 |

**Si rien ne match exactement** : lis §7 "Quand utiliser quoi" pour arbitrer. Si vraiment rien : crée dans `app/`, jamais dans `core/`.

---

## 1. Architecture (3 couches)

```
src/components/
├── core/      ← primitives universelles (apps + landings). Inline styles + tokens CSS.
├── landing/   ← composites visuels lourds (WebGL, blobs CSS animés, heroes, banners).
└── app/       ← additif pour surfaces interactives (dashboards). Tailwind + cn helper.
```

**Règles de combinaison** :
- Une **landing** (site marketing, lead magnet, cas client) combine `core/` + `landing/`.
- Un **dashboard** (app interne, outil) combine `core/` + `app/`.
- **Jamais croiser** `landing/` et `app/` dans une même surface.

**Règles de dépendance** :
- `core/` est importable partout.
- `landing/` peut importer `core/`. `app/` peut importer `core/`.
- `core/` ne peut **JAMAIS** importer `landing/` ou `app/` (cycle interdit).
- `app/` ne doit **pas** importer `landing/` (séparation des préoccupations).
- Si un composant est utile aux deux usages (apps ET landings) → il appartient à `core/`.

---

## 2. Stack & libs

**Utilisé** : React 18, TypeScript strict, Vite, Tailwind 3, Radix UI (Dialog, Select, Tabs, Tooltip, Checkbox, Avatar, DropdownMenu), `motion`, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`.

**Interdit** : heroicons, react-icons, @carbon/icons-react, feather, Base UI, framer-motion (utilise `motion`), styled-components, emotion, SVG inline maison.

---

## 3. Tokens

### Palette (CSS variables `--cy-*`)

| Token | Hex | Usage |
|---|---|---|
| `--cy-green-300` → `--cy-green-700` | `#74ffc5` → `#029358` | Marque, CTAs, hover, pressed |
| `--cy-deep-600` → `--cy-deep-950` | `#016c78` → `#030712` | Sections premium, fonds dark |
| `--cy-gray-300` → `--cy-gray-900` | `#d1d5db` → `#111827` | Neutres |
| `--cy-success` `--cy-error` `--cy-warning` `--cy-info` | `#10b981` `#ef4444` `#f59e0b` `#05d37e` | États |

### Mapping Tailwind shadcn → Cyrano (couche app)

| Classe | Token | | Classe | Token |
|---|---|---|---|---|
| `bg-primary` | `--cy-green-500` | | `text-primary-foreground` | `--cy-deep-950` |
| `bg-background` | `--cy-bg` | | `text-foreground` | `--cy-text-primary` |
| `bg-card` / `bg-popover` | `--cy-bg-elevated` | | `text-card-foreground` / `text-popover-foreground` | `--cy-text-primary` |
| `bg-muted` / `bg-secondary` / `bg-accent` | `--cy-bg-muted` | | `text-muted-foreground` / `text-secondary-foreground` | `--cy-text-secondary` |
| `border` / `border-input` | `--cy-border` | | `ring` (focus) | `--cy-green-500` |
| `bg-destructive` | `--cy-error` | | `text-destructive-foreground` | `#ffffff` |

L'opacity Tailwind fonctionne (`bg-primary/90`, `text-foreground/60`) via RGB triplets.

### Typo

`font-heading` = Poppins (titres, weights 600-800, letter-spacing -0.02em). `font-body` = Satoshi (corps, 400-600). Tailles `text-xs` (12px) → `text-6xl` (56px).

---

## 4. Conventions opérationnelles

### Dark / light mode

`<html data-theme="dark">` ou `data-theme="light"` (default : dark). Tailwind `darkMode: ['class', '[data-theme="dark"]']`. Les tokens CSS `--cy-bg`, `--cy-text-primary`, etc. switchent automatiquement. Quand tu codes dans `app/`, utilise `bg-background`, `text-foreground`, `bg-muted` — ils s'adaptent au theme tout seuls.

### Z-index (paliers, jamais arbitraire)

| Niveau | Valeur | Usage |
|---|---|---|
| Base | `0` | DynamicBackground, particules |
| Content | `10` | Contenu principal |
| Header | `50` | Header sticky |
| Hellobar | `60` | Bandeau supérieur |
| Dropdown | `100` | Menus, tooltips |
| Mobile menu | `500` | Drawer mobile |
| Modal | `1000` | AppDialog |
| Overlay | `9999` | Overlays fullscreen |

### Focus a11y

Ring vert sur tous les interactifs : `focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 outline-offset-2`. Toujours visible.

### Breakpoints Tailwind

`sm` 640 / `md` 768 / `lg` 1024 / `xl` 1280 / `2xl` 1536. Containers : `max-w-7xl` (layout), `max-w-2xl` (formulaires).

### Animations

Hover : `scale 1.02-1.03` + shadow intensify. Active : `scale 0.97-0.98`. Durée : `250ms` par défaut, `cubic-bezier(0.4, 0, 0.2, 1)`.

---

## 5. Inventaire `core/` (inline styles + tokens)

### CyButton
`variant: 'primary' | 'icon' | 'secondary' | 'outlined' | 'ghost'` × `size: 'sm' | 'md' | 'lg'` × `loading?` × `icon?` × `iconPosition?`.
```tsx
<CyButton variant="primary" size="lg">Démarrer</CyButton>
<CyButton variant="icon" size="md" icon={<Download size={18} />}>Télécharger</CyButton>
```

### CyAnimatedButton
CTA majeur (un par vue). `size: 'sm' | 'md' | 'lg'`, `href?` ou `onClick?`, `icon?`.
```tsx
<CyAnimatedButton size="lg" href="/signup">Démarrer gratuitement</CyAnimatedButton>
```

### CyCard
`featured?`, `image?`, `imageAlt?`, `tags?: string[]`, `title?`, `description?`, `action?: ReactNode`.
```tsx
<CyCard featured title="Outbound autopilot" description="Lance tes séquences en 30s." action={<CyButton size="sm">Voir</CyButton>} />
```

### CyBadge
`variant: 'default' | 'outlined' | 'featured' | 'success' | 'error' | 'warning'`, `icon?`. Toujours `rounded-full`.
```tsx
<CyBadge variant="success" icon={<Check size={14} />}>Actif</CyBadge>
```

### CyInput / CyTextarea
Hérite des props natives. `label?`, `error?`, `hint?`, `iconLeft?`, `iconRight?` (Input). `rows?` (Textarea).
```tsx
<CyInput label="Email" type="email" iconLeft={<Mail size={18} />} />
<CyTextarea label="Message" rows={5} />
```

### CyStatus
`type: 'success' | 'error' | 'warning' | 'info'`, `title`, `message?`. Icônes auto.
```tsx
<CyStatus type="success" title="Campagne envoyée" message="2 134 emails livrés." />
```

### CyLogo
`variant: 'long' | 'square'`, `theme: 'auto' | 'white' | 'black'`, `size?: number`.
```tsx
<CyLogo variant="long" theme="auto" size={32} />
```

### CySpinner
Wrapper Lucide LoaderCircle. `size?: number`.
```tsx
<CySpinner size={24} />
```

### CyMenuToggle
Hamburger animé. Contrôlé (`open` + `onChange`) ou non (`defaultOpen`).
```tsx
<CyMenuToggle open={isOpen} onChange={setOpen} />
```

### CyShaderBg
Background animé WebGL (wrapper `Warp` de `@paper-design/shaders-react`). `preset: 'brand' | 'muted'` × `intensity: 'low' | 'medium' | 'high'`. Parent en `position: relative`. **Un seul `intensity="high"` par page.**
```tsx
<div className="relative overflow-hidden">
  <CyShaderBg preset="brand" intensity="medium" />
  <div className="relative z-10">…</div>
</div>
```

### CyLiveDot
Point pulse animé (eyebrows, status indicators, badges live). `size?`, `color?`, `pulse?`. `aria-hidden` auto.
```tsx
<CyLiveDot size={6} pulse />
```

### CyLinkPill
Mini-CTA secondaire en pill glassmorphic vert. **Pas un CTA primaire** (utiliser CyButton pour ça). `href`, `external?`, `icon?`.
```tsx
<CyLinkPill href="https://..." external icon={<ArrowUpRight size={12} />}>Lire l'article</CyLinkPill>
```

### CyGradientText
Helper background-clip text. `preset: 'green' | 'green-soft' | 'green-strong'`. Un mot par titre, jamais une phrase.
```tsx
<h1>Votre <CyGradientText>bras droit IA</CyGradientText>.</h1>
```

### CyAuroraBg
Fond animé pure CSS (3 blobs verts qui dérivent + grain SVG + vignette). Alternative à `CyShaderBg` pour les cartes statiques (pas de lag GPU mobile). Parent en `position: relative; overflow: hidden; isolation: isolate`.
```tsx
<article style={{ position: 'relative', overflow: 'hidden', isolation: 'isolate' }}>
  <CyAuroraBg intensity="medium" />
  <div style={{ position: 'relative', zIndex: 1 }}>…</div>
</article>
```

### CyScrollHint
Chevron-down animé bounce, indication "continue à scroller". Décoratif par défaut (`aria-hidden`).
```tsx
<CyScrollHint />
```

### CyReveal
Wrapper qui fade-up les enfants à l'entrée du viewport via `IntersectionObserver`. `delay: 0|1|2|3|4|5` pour stagger.
```tsx
<CyReveal>Titre</CyReveal>
<CyReveal delay={1}>Lede</CyReveal>
```

### CyRoadmapStrip
Strip horizontal de pills numérotées + flèches. 3-6 étapes idéalement. Decorative (`aria-hidden`).
```tsx
<CyRoadmapStrip steps={[{ num: '01', label: 'Audit' }, { num: '02', label: 'Cibles' }]} />
```

### CyCtaBanner
Banner CTA section pleine largeur, signature Cyrano. Compose `CyAuroraBg` + `CyGradientText` + `CyRoadmapStrip` (optionnel) + `CyButton`. **Un seul par page.**
```tsx
<CyCtaBanner
  eyebrow="La roadmap"
  titleBefore="Comment ça se passe "
  titleAccent="concrètement"
  titleAfter=" ?"
  subtitle="Votre roadmap en 6 étapes."
  buttonLabel="Découvrir"
  href="/#agence"
/>
```

---

## 6. Inventaire `app/` (Tailwind + cn)

**Règle vert** : sur `app/`, le vert est réservé aux états signifiants (sélection, action principale, focus, toggle ON). Pas sur les hovers neutres — utilise `hover:bg-accent`.

### AppButton
`variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'` × `size: 'default' | 'sm' | 'lg' | 'icon'` + `asChild`.
```tsx
<AppButton variant="outline" size="sm">Filtrer</AppButton>
<AppButton asChild><a href="/login">Se connecter</a></AppButton>
```

### AppCounterButton
`count: number | string`, `icon?`, `size: 'sm' | 'default' | 'lg'`. Outline figé.
```tsx
<AppCounterButton count={12} icon={<Inbox size={16} />}>Inbox</AppCounterButton>
```

### AppCheckbox
Wrapper Radix.
```tsx
<AppCheckbox id="opt" defaultChecked /> <label htmlFor="opt">Notifications</label>
```

### AppSelect (composé)
`AppSelect` + `AppSelectTrigger` (`size: 'sm' | 'default'`) + `AppSelectValue` + `AppSelectContent` + `AppSelectItem` (+ Group / Label / Separator).
```tsx
<AppSelect>
  <AppSelectTrigger><AppSelectValue placeholder="Choisir" /></AppSelectTrigger>
  <AppSelectContent>
    <AppSelectItem value="a">Option A</AppSelectItem>
  </AppSelectContent>
</AppSelect>
```

### AppCombobox
Sélecteur avec recherche (cmdk + AppPopover). À utiliser dès >10 options ou besoin de filtre.
`options: { value, label }[]`, `value?`, `onValueChange?`, `placeholder?`, `searchPlaceholder?`, `emptyMessage?`, `disabled?`, `trigger?` (custom).
```tsx
const [value, setValue] = useState<string>();
<AppCombobox
  options={[
    { value: 'louis', label: 'Louis Orliange' },
    { value: 'pierre', label: 'Pierre Felut-Paris' },
  ]}
  value={value}
  onValueChange={setValue}
  placeholder="Assigner à..."
/>
```

Pour cas avancés (palette Cmd+K, multi-section, regroupement) : utiliser les primitives `AppCommand`, `AppCommandInput`, `AppCommandList`, `AppCommandEmpty`, `AppCommandGroup`, `AppCommandItem`, `AppCommandSeparator`.

### AppTabs (composé)
`variant: 'default' | 'underline'`. Sous-composants : `AppTabsList`, `AppTabsTab`, `AppTabsPanel`.
```tsx
<AppTabs defaultValue="overview" variant="default">
  <AppTabsList>
    <AppTabsTab value="overview">Vue</AppTabsTab>
  </AppTabsList>
  <AppTabsPanel value="overview">…</AppTabsPanel>
</AppTabs>
```

### AppToggle
`checked?` / `defaultChecked?`, `onChange?`, `labels: { off, on }`, `showLabels?`, `disabled?`.
```tsx
<AppToggle defaultChecked labels={{ off: 'Manuel', on: 'Auto' }} />
```

### AppEditableChip
`defaultLabel?`, `onChange?`. Seul le stylo passe en édition.
```tsx
<AppEditableChip defaultLabel="Watchlist" onChange={save} />
```

### AppDropdownMenu (composé)
Radix + drill-down (`AppDropdownMenuPage` / `AppDropdownMenuPageTrigger`). Items normaux, checkbox, radio, séparateurs.
```tsx
<AppDropdownMenu>
  <AppDropdownMenuTrigger asChild><AppButton variant="outline">Options</AppButton></AppDropdownMenuTrigger>
  <AppDropdownMenuContent>
    <AppDropdownMenuItem>Profil</AppDropdownMenuItem>
  </AppDropdownMenuContent>
</AppDropdownMenu>
```

### AppPopover (composé)
Radix Popover. Pour filtres contextuels, mini-formulaires, date pickers. Plus léger qu'un Dialog (pas de backdrop), plus riche qu'un Tooltip (interactif). Composés : `AppPopover` + `AppPopoverTrigger` (`asChild`) + `AppPopoverContent` (`align?`, `sideOffset?`) + `AppPopoverClose` + `AppPopoverAnchor`.
```tsx
<AppPopover>
  <AppPopoverTrigger asChild><AppButton variant="outline">Filtrer</AppButton></AppPopoverTrigger>
  <AppPopoverContent>
    <label className="flex items-center gap-2"><AppCheckbox /> Actives</label>
  </AppPopoverContent>
</AppPopover>
```

### AppDialog (composé)
Pour formulaires d'édition, dialogues de saisie. Close en X dans le header par défaut (`hideCloseButton?` pour le masquer). Composés : `AppDialogTrigger` / `Content` / `Header` / `Body` / `Footer` / `Title` / `Description` / `Close`.
```tsx
<AppDialog>
  <AppDialogTrigger asChild><AppButton>Modifier</AppButton></AppDialogTrigger>
  <AppDialogContent>
    <AppDialogHeader>
      <AppDialogTitle>Modifier le profil</AppDialogTitle>
      <AppDialogDescription>Met à jour ton nom et ton email.</AppDialogDescription>
    </AppDialogHeader>
    <AppDialogBody><CyInput label="Nom" /></AppDialogBody>
    <AppDialogFooter>
      <AppDialogClose asChild><AppButton variant="outline">Annuler</AppButton></AppDialogClose>
      <AppButton>Enregistrer</AppButton>
    </AppDialogFooter>
  </AppDialogContent>
</AppDialog>
```

### AppAlertDialog (composé)
**Pour confirmations destructives ou critiques** (suppression, déconnexion, validation finale). Différences vs `AppDialog` : `role="alertdialog"` (annoncé aux lecteurs d'écran), pas de fermeture par clic outside, pas de croix close, choix explicite entre `Cancel` et `Action`. Composés : `AppAlertDialogTrigger` / `Content` / `Header` / `Body` / `Footer` / `Title` / `Description` / `Action` / `Cancel`.
```tsx
<AppAlertDialog>
  <AppAlertDialogTrigger asChild><AppButton variant="destructive">Supprimer</AppButton></AppAlertDialogTrigger>
  <AppAlertDialogContent>
    <AppAlertDialogHeader>
      <AppAlertDialogTitle>Supprimer cette tâche ?</AppAlertDialogTitle>
      <AppAlertDialogDescription>Cette action est définitive.</AppAlertDialogDescription>
    </AppAlertDialogHeader>
    <AppAlertDialogFooter>
      <AppAlertDialogCancel asChild><AppButton variant="outline">Annuler</AppButton></AppAlertDialogCancel>
      <AppAlertDialogAction asChild><AppButton variant="destructive">Supprimer</AppButton></AppAlertDialogAction>
    </AppAlertDialogFooter>
  </AppAlertDialogContent>
</AppAlertDialog>
```

### AppSheet (composé)
Panneau coulissant ancré à un bord. Pour drawer mobile, panneau de détail latéral (clic sur row de DataTable), filtres avancés, navigation secondaire. 4 sides : `right` (défaut), `left`, `top`, `bottom`. Composés : `AppSheetTrigger` / `Content` (`side`, `hideCloseButton?`) / `Header` / `Body` (scrollable) / `Footer` / `Title` / `Description` / `Close`.
```tsx
<AppSheet>
  <AppSheetTrigger asChild><AppButton variant="outline">Voir détails</AppButton></AppSheetTrigger>
  <AppSheetContent side="right">
    <AppSheetHeader>
      <AppSheetTitle>Refactor du flux d'auth</AppSheetTitle>
      <AppSheetDescription>Tâche assignée à Pierre.</AppSheetDescription>
    </AppSheetHeader>
    <AppSheetBody>...contenu...</AppSheetBody>
    <AppSheetFooter>
      <AppSheetClose asChild><AppButton variant="outline">Fermer</AppButton></AppSheetClose>
      <AppButton>Enregistrer</AppButton>
    </AppSheetFooter>
  </AppSheetContent>
</AppSheet>
```

### AppSidebar
Shell rail icon + panel collapsible. Props : `rail`, `activeId`, `onNavChange`, `panelTitle`, `sections`, `bottomRail?`, `user?`, `brand?`, `searchable?`.

### AppPagination (composé)
Wrapper sémantique. À combiner avec `AppButton` (ghost = page non active, outline = courante).
```tsx
<AppPagination>
  <AppPaginationContent>
    <AppPaginationItem><AppButton variant="ghost" size="sm">1</AppButton></AppPaginationItem>
    <AppPaginationItem><AppButton variant="outline" size="sm">2</AppButton></AppPaginationItem>
    <AppPaginationEllipsis />
  </AppPaginationContent>
</AppPagination>
```

### AppToast (hook)
`const t = useToasts();` → `{ message, success, warning, error }`. Auto-dismiss 3s, pause au hover.
```tsx
const t = useToasts();
t.success('Campagne envoyée');
t.message({ text: 'Lead supprimé', action: 'Annuler', onAction: undo });
```

### AppDataTable (générique)
`data`, `columns: ColumnDef<TData>[]` (`{ key, label, render?, cellClassName?, headClassName? }`), `visibleColumns?`, `emptyMessage?`.
```tsx
<AppDataTable
  data={leads}
  columns={[
    { key: 'name', label: 'Nom' },
    { key: 'email', label: 'Email', render: (r) => <a href={`mailto:${r.email}`}>{r.email}</a> },
  ]}
/>
```

### AppTable (primitives bas niveau)
`AppTable` + `Header` / `Body` / `Row` / `Head` / `Cell` / `Caption`. À utiliser si `AppDataTable` est trop opinié.

### AppAvatar (composé)
Radix Avatar + fallback. Empilable via `flex -space-x-2 + border-2 border-background`.
```tsx
<AppAvatar><AppAvatarImage src="/u.jpg" /><AppAvatarFallback>LO</AppAvatarFallback></AppAvatar>
```

### AppSkeleton
`<div className="animate-pulse rounded-lg bg-muted" />`. Dimensions via `className`.
```tsx
<AppSkeleton className="h-10 w-10 rounded-full" />
<AppSkeleton className="h-4 w-32" />
```

### Tooltip (composé)
`TooltipProvider` (à monter une fois) + `Tooltip` + `TooltipTrigger` (`asChild`) + `TooltipContent` (`side?`, `sideOffset?`).
```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><AppButton variant="ghost" size="icon"><Info size={16} /></AppButton></TooltipTrigger>
    <TooltipContent>Info contextuelle</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

## 7. Quand utiliser quoi

### Boutons : Cy* vs CyAnimated vs App*
```
Landing / page produit ?
├── CTA principal (hero, fin de tunnel) ? → CyAnimatedButton (un par vue)
└── Sinon → CyButton
Dashboard / outil interne ? → AppButton
```

### Carte vs div
```
Contenu structuré (article/produit/feature) ? → CyCard
Conteneur visuel simple ? → <div className="rounded-xl border p-6">
```

### Modal vs menu vs select vs tooltip
```
Action complexe / formulaire / confirmation ? → AppDialog
Liste de choix depuis trigger ? → AppDropdownMenu
Sélection de valeur dans formulaire ? → AppSelect
Hint au survol ? → Tooltip
```

### Saisie & feedback
```
Texte → CyInput (toujours, AppInput n'existe pas)
Multi-lignes → CyTextarea
On/off → AppToggle
Cocher dans liste → AppCheckbox
Status permanent → CyStatus
Toast éphémère → useToasts
Loading placeholder → AppSkeleton
Spinner inline → CySpinner
```

---

## 8. Patterns / recettes

### Hero landing avec CTA primary + secondary

```tsx
<section className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 py-20 text-center">
  <h1 className="font-heading text-5xl font-extrabold tracking-tight">
    Ton outbound, en pilote auto.
  </h1>
  <p className="font-body text-lg text-secondary">Lance des séquences B2B AI-native en 30 secondes.</p>
  <div className="flex gap-4">
    <CyAnimatedButton size="lg" href="/signup">Démarrer gratuitement</CyAnimatedButton>
    <CyButton variant="outlined" size="lg">Voir la démo</CyButton>
  </div>
</section>
```

### Login form

```tsx
<form className="mx-auto max-w-md space-y-6 p-8">
  <CyInput label="Email" type="email" iconLeft={<Mail size={18} />} required />
  <CyInput label="Mot de passe" type="password" required />
  <CyButton variant="primary" size="lg" type="submit" loading={pending}>Se connecter</CyButton>
</form>
```

### Settings card (dashboard)

```tsx
<div className="rounded-xl border bg-card p-6 space-y-4">
  <div className="flex items-center justify-between">
    <div>
      <h3 className="font-heading text-lg font-semibold">Notifications email</h3>
      <p className="text-sm text-muted-foreground">Recevoir un résumé quotidien.</p>
    </div>
    <AppToggle defaultChecked labels={{ off: 'Off', on: 'On' }} />
  </div>
  <AppButton variant="outline" size="sm">Configurer les destinataires</AppButton>
</div>
```

### Data list avec filtres + pagination

```tsx
<div className="space-y-4">
  <div className="flex justify-between">
    <AppSelect>
      <AppSelectTrigger size="sm"><AppSelectValue placeholder="Statut" /></AppSelectTrigger>
      <AppSelectContent>
        <AppSelectItem value="all">Tous</AppSelectItem>
        <AppSelectItem value="active">Actifs</AppSelectItem>
      </AppSelectContent>
    </AppSelect>
    <AppCounterButton count={filtered.length} icon={<Filter size={16} />}>Résultats</AppCounterButton>
  </div>
  <AppDataTable data={leads} columns={columns} />
  <AppPagination>
    <AppPaginationContent>
      <AppPaginationItem><AppButton variant="outline" size="sm">1</AppButton></AppPaginationItem>
      <AppPaginationItem><AppButton variant="ghost" size="sm">2</AppButton></AppPaginationItem>
    </AppPaginationContent>
  </AppPagination>
</div>
```

### Confirmation de suppression destructive

```tsx
const t = useToasts();

<AppAlertDialog>
  <AppAlertDialogTrigger asChild>
    <AppButton variant="destructive" size="sm">Supprimer</AppButton>
  </AppAlertDialogTrigger>
  <AppAlertDialogContent>
    <AppAlertDialogHeader>
      <AppAlertDialogTitle>Supprimer cette tâche ?</AppAlertDialogTitle>
      <AppAlertDialogDescription>
        Cette action est définitive. La tâche et ses sous-tâches seront perdues.
      </AppAlertDialogDescription>
    </AppAlertDialogHeader>
    <AppAlertDialogFooter>
      <AppAlertDialogCancel asChild><AppButton variant="outline">Annuler</AppButton></AppAlertDialogCancel>
      <AppAlertDialogAction asChild>
        <AppButton variant="destructive" onClick={async () => {
          await deleteTask(task.id);
          t.success('Tâche supprimée');
        }}>Supprimer</AppButton>
      </AppAlertDialogAction>
    </AppAlertDialogFooter>
  </AppAlertDialogContent>
</AppAlertDialog>
```

### Panneau de détail latéral (Sheet sur clic de row)

```tsx
const [openTask, setOpenTask] = useState<Task | null>(null);

<AppDataTable
  data={tasks}
  columns={[
    { key: 'title', label: 'Titre', render: (r) => (
      <button onClick={() => setOpenTask(r)} className="text-left hover:underline">
        {r.title}
      </button>
    )},
    { key: 'assignee', label: 'Assigné' },
  ]}
/>

<AppSheet open={!!openTask} onOpenChange={(o) => !o && setOpenTask(null)}>
  <AppSheetContent side="right">
    <AppSheetHeader>
      <AppSheetTitle>{openTask?.title}</AppSheetTitle>
      <AppSheetDescription>Assignée à {openTask?.assignee}</AppSheetDescription>
    </AppSheetHeader>
    <AppSheetBody>
      <CyTextarea label="Description" defaultValue={openTask?.description} rows={6} />
    </AppSheetBody>
    <AppSheetFooter>
      <AppSheetClose asChild><AppButton variant="outline">Fermer</AppButton></AppSheetClose>
      <AppButton>Enregistrer</AppButton>
    </AppSheetFooter>
  </AppSheetContent>
</AppSheet>
```

### Filtre rapide dans un Popover

```tsx
const [filters, setFilters] = useState({ active: true, done: false, archived: false });

<AppPopover>
  <AppPopoverTrigger asChild>
    <AppButton variant="outline" size="sm">
      <Filter size={14} /> Filtres
    </AppButton>
  </AppPopoverTrigger>
  <AppPopoverContent align="start">
    <div className="flex flex-col gap-2">
      <div className="text-sm font-semibold">Statut</div>
      {(['active', 'done', 'archived'] as const).map((k) => (
        <label key={k} className="flex items-center gap-2 text-sm">
          <AppCheckbox
            checked={filters[k]}
            onCheckedChange={(v) => setFilters({ ...filters, [k]: v === true })}
          />
          {k}
        </label>
      ))}
    </div>
  </AppPopoverContent>
</AppPopover>
```

### Assignation utilisateur avec recherche (Combobox)

```tsx
const [assignee, setAssignee] = useState<string>();

<AppCombobox
  options={teamMembers.map((m) => ({ value: m.id, label: m.name }))}
  value={assignee}
  onValueChange={setAssignee}
  placeholder="Assigner à..."
  searchPlaceholder="Rechercher un membre..."
  emptyMessage="Aucun membre trouvé."
/>
```

### Layout complet dashboard (sidebar rail + main + détail)

```tsx
<div className="flex h-screen">
  <AppSidebar
    rail={[{ id: 'tasks', icon: <ListChecks />, label: 'Tâches' }]}
    activeId="tasks"
    onNavChange={setSection}
    panelTitle="Tâches"
    sections={[
      { label: 'Mes vues', items: [{ id: 'today', label: "Aujourd'hui" }, { id: 'week', label: 'Cette semaine' }] },
    ]}
  />
  <main className="flex-1 overflow-y-auto p-6">
    <div className="mb-6 flex items-center justify-between">
      <h1 className="font-heading text-2xl font-semibold">Tâches</h1>
      <AppButton><Plus size={16} /> Nouvelle tâche</AppButton>
    </div>
    <AppDataTable data={tasks} columns={columns} />
  </main>
</div>
```

---

## 8.1 Patterns responsive critiques

> Issus d'une passe responsive complète sur le site Cyrano (2026-05-13). Tout
> composant DS ou page consumer doit respecter ces 8 patterns. Ignorer un seul
> casse le responsive de façon souvent invisible jusqu'à ce qu'un viewport
> spécifique le révèle.

### 1. Cascade min-content sur wrappers

Tout wrapper qui contient un enfant à `width: max-content` (marquees,
scrollers horizontaux, tables larges, illustrations en grid fixe) doit avoir :

```css
.wrapper {
  min-width: 0;
  width: 100%;          /* explicite, pas auto */
}
```

Sans ça, le wrapper prend la largeur max-content de son enfant (capped à
max-width) et refuse de shrink en dessous. À 768 viewport, un `.wrap` avec
`max-width: 1280px` peut rester à 1280 si un marquee interne pousse la
cascade. Le `min-width: 0` brise la chaîne, le `width: 100%` force
l'adaptation au parent.

### 2. Jamais d'inline `style={{ padding }}` sur les containers

Les inline styles **écrasent toutes les media queries CSS** (specificity
infinie). Un `style={{ padding: '75px 64px' }}` sur un shell rend toute
règle responsive invisible côté CSS — debugger en JSX, pas dans la
stylesheet.

Règle : padding/margin de structure = CSS uniquement. Réserver les inline
styles à des valeurs runtime (états animés, calculs dynamiques).

### 3. Sticky + ancestor `overflow: hidden`

Un `position: sticky` est bloqué par un ancêtre en `overflow: hidden` (ou
`clip`). Le sticky s'arrête à la frontière de cet ancêtre.

Pattern fréquent : sections desktop avec scroll-stacking (`.diff-section`)
ont `.diff-inner { overflow: hidden }` pour cropper l'animation. À
mobile/tablet où le scroll-stacking est désactivé, il faut `overflow:
visible` sur l'inner pour permettre aux titres sticky de fonctionner.

### 4. Grid responsive avec `minmax(0, 1fr)`

`grid-template-columns: 1fr` ne shrink pas en dessous du min-content de
ses cellules. Utiliser `minmax(0, 1fr)` + `min-width: 0` sur les items :

```css
.grid {
  grid-template-columns: minmax(0, 1fr) minmax(0, 2.2fr);
}
.grid > * { min-width: 0; }
```

### 5. Mobile 95% viewport

Sur mobile (≤639px), le `.wrap` global passe à `padding: 0 10px` pour que
le contenu occupe ~95% du viewport. Les cards internes doivent avoir un
padding réduit (14-22px max, pas 32-40px desktop), sinon le double padding
mange ~30% de la largeur.

Si un wrapper est purement décoratif (un "shell" avec background + border
+ radius), il peut devenir transparent à mobile (`padding: 0; background:
transparent; border: none`) pour donner toute la largeur aux cards
internes.

Token disponible pour les shells : `--cy-bg-shell`, `--cy-bg-shell-hover`,
`--cy-bg-shell-border`.

### 6. Sticky title fallback à mobile/tablet

Les sections desktop avec scroll-stacking (titre fixe à gauche, cards
animées à droite) se stackent verticalement en mobile/tablet. Le titre se
retrouve tout en haut puis disparaît au scroll.

Pattern : à mobile/tablet, rendre le titre sticky `top: 64px` (sous le
header) avec un bg solide pour qu'il reste visible pendant le scroll des
cards :

```css
@media (max-width: 1024px) {
  .section-title-block {
    position: sticky;
    top: 64px;
    z-index: 5;
    background: var(--cy-bg);
    padding: 16px 0 20px;
  }
}
```

### 7. Burger jusqu'à 1023px

Le breakpoint hamburger standard est `max-width: 1023px`. À 768 viewport,
une nav full avec 4-5 items wrap inévitablement. Le burger doit prendre
le relais dès qu'on quitte le desktop strict (≥1024).

### 8. Line-height mobile resserré

Body et citations à `line-height: 1.4-1.7` desktop deviennent
illisiblement aérés sur 375. À mobile :

- Citations : `1.4 → 1.3`
- FAQ answer / body long : `1.7 → 1.55`
- Question FAQ : `1.5 → 1.3`

Et réduire la font des questions/titres secondaires : `xl → lg → base`
selon la taille de viewport.

---

## 9. Anti-patterns

- ❌ Sparkles, particules, magnetic pull, diamond spin, pulse glow agressifs sur les CTAs
- ❌ SVG inline maison ou autre lib d'icônes que `lucide-react`
- ❌ Hex hardcodés pour les couleurs d'identité (utilise `--cy-*` ou classes Tailwind mappées)
- ❌ Vert sur les hovers/textes neutres dans `app/` (réservé aux états signifiants)
- ❌ Recoloriage / déformation / outline du logo
- ❌ Z-index arbitraire (utilise les paliers de la section 4)
- ❌ Réimplémenter un composant qui existe (regarde sections 5-6)
- ❌ `core/` qui importe `app/` (cycle interdit)
- ❌ Plus d'un `CyAnimatedButton` par vue
- ❌ `rounded-full` sauf variant `icon` (alors `rounded-xl`)

---

## 10. Checklist post-génération

Avant de soumettre du code, vérifie :

- [ ] Imports séparés par couche : `@/components/core` / `@/components/landing` / `@/components/app` (jamais le barrel global `@/components`)
- [ ] Toutes les icônes viennent de `lucide-react`
- [ ] Aucun hex hardcodé hors `--cy-*` ou couleurs Tailwind mappées
- [ ] Tous les composants utilisés existent dans les sections 5-6 (sinon : tu inventes, stop)
- [ ] Au plus un `CyAnimatedButton` par vue
- [ ] Pas d'import croisé entre `core/` / `landing/` / `app/` qui viole les règles §1
- [ ] Focus visible sur tous les interactifs
- [ ] **Si tu as ajouté ou modifié un composant dans `src/components/`** : lance `npm run ds:gen` pour régénérer `ds-index.json`. Sinon la doc machine-readable diverge du code.
- [ ] **Si tu as ajouté un composant** : update aussi `src/docs/codeBlockImports.ts` (sets `KNOWN_*`) sinon les auto-imports CodeBlock ne le détecteront pas.
- [ ] Lance `npm run ds:check` pour valider tokens + TS.

---

## 11. Migration DS → projet consumer (Next.js App Router)

Le DS Cyrano est servi en **Vite** (CSR pur). Les projets consumer (site Cyrano, futurs dashboards) tournent en **Next.js App Router** où le SSR est le défaut. Quand un composant `Cy*` est copié depuis `business/ds/src/components/core/` vers `src/components/core/` du projet Next, il faut **systématiquement ajouter `'use client';` en première ligne du `.tsx`**.

**Pourquoi** : Next.js considère tout composant comme Server Component par défaut. Tout hook React (`useState`, `useEffect`, `useRef`) ou event handler (`onClick`, `onMouseEnter`, `onChange`) plante en SSR avec une erreur HTTP 500. Le DS Vite n'a pas cette contrainte (tout client), donc ne porte pas la directive — mais le consumer Next doit la rajouter.

**Convention** : appliquer `'use client'` à **tous** les composants `Cy*` migrés, même les purement présentationnels (`CyGradientText`, `CyLiveDot`). Uniformité, et zéro friction si le composant évolue plus tard pour intégrer un hook.

```tsx
// Vue côté DS (~/Desktop/claude-core/business/ds/src/components/core/CyReveal.tsx)
'use client';  // ← présent côté DS aussi par cohérence (inerte en Vite)

import React, { useEffect, useRef, useState } from 'react';
// ...
```

```tsx
// Vue côté site Next (src/components/core/CyReveal.tsx) — strictement identique
'use client';

import React, { useEffect, useRef, useState } from 'react';
// ...
```

Côté site, `index.ts` ré-exporte. Côté pages Next (`app/.../page.tsx`), les imports passent toujours par `@/components/core` sans `'use client'` au-dessus (le SC parent peut importer un CC).

---

## 12. Preview hébergée

Deploy preview à jour : **https://ds.hellocyrano.com** (sous-domaine Vercel, alias secondaire `cyrano-ds.vercel.app`). Mise à jour manuelle via `npx vercel --prod` depuis `business/ds/` (auto-deploy GitHub à brancher).

**Pour qui le DS hébergé** : principalement les humains (Louis, futurs collaborateurs, partage de lien). Les IA du workflow Cyrano (Claude Code, Claude Design, Cursor) lisent directement les fichiers locaux de `business/ds/`, elles n'ont pas besoin de l'URL.

---

## 13. Si tu doutes

Source de vérité ultime = le code source. Si tu hésites sur une prop ou un comportement, ouvre directement le fichier :

- `src/components/core/<Composant>.tsx` pour les Cy*
- `src/components/app/<Composant>.tsx` pour les App*
- `src/styles/tokens.css` pour la liste exhaustive des tokens
- `tailwind.config.js` pour le mapping shadcn

Pour les détails (edge cases, props secondaires, exemples étendus) : `DESIGN_SYSTEM.md`.
