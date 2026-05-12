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
// Toujours via le re-export central
import { CyButton, CyCard, CyInput, AppButton, AppDialog, useToasts } from '@/components';

// Icônes : lucide-react UNIQUEMENT
import { Download, Mail, Info, ArrowRight } from 'lucide-react';

// Helpers
import { cn } from '@/lib/utils';
```

---

## 1. Architecture (2 couches)

```
src/components/
├── core/   ← primitives universelles (apps + landings). Inline styles + tokens CSS.
└── app/    ← additif pour surfaces interactives (dashboards). Tailwind + cn helper.
```

- Réutilise un `core/` avant d'en créer un nouveau.
- Une **landing** utilise UNIQUEMENT `core/`. Un **dashboard** combine `core/` + `app/`.
- `app/` peut importer `core/`. **`core/` ne peut JAMAIS importer `app/`** (cycle interdit).
- Si un composant est utile aux apps ET aux landings → il appartient à `core/`.

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

### AppDialog (composé)
`AppDialogTrigger` / `Content` / `Header` (close X auto, `hideCloseButton?`) / `Body` / `Footer` / `Title` / `Description` / `Close`.
```tsx
<AppDialog>
  <AppDialogTrigger asChild><AppButton>Ouvrir</AppButton></AppDialogTrigger>
  <AppDialogContent>
    <AppDialogHeader>
      <AppDialogTitle>Confirmation</AppDialogTitle>
      <AppDialogDescription>Cette action est irréversible.</AppDialogDescription>
    </AppDialogHeader>
    <AppDialogFooter><AppButton variant="destructive">Supprimer</AppButton></AppDialogFooter>
  </AppDialogContent>
</AppDialog>
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

- [ ] Tous les imports viennent de `@/components` (jamais de chemin profond `'@/components/core/CyButton'`)
- [ ] Toutes les icônes viennent de `lucide-react`
- [ ] Aucun hex hardcodé hors `--cy-*` ou couleurs Tailwind mappées
- [ ] Tous les composants utilisés existent dans les sections 5-6 (sinon : tu inventes, stop)
- [ ] Au plus un `CyAnimatedButton` par vue
- [ ] Pas d'import croisé `core/` ← `app/`
- [ ] Focus visible sur tous les interactifs

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
