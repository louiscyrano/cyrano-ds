# CYRANO DESIGN SYSTEM — BRIEF DE GÉNÉRATION (v2 STRICT)

> **CRITIQUE :** Ce brief est strict. Ne fais aucun choix esthétique de ton côté. La référence visuelle est **IQ Project** (https://iq-project.ai/design-system). Tu copies sa structure et sa mise en page **à l'identique**. Les seules différences avec IQ sont la palette (vert au lieu d'orange), la typo (Poppins/Satoshi), les logos (Cyrano), et l'absence de sparkles/particules/magnetic pull.

---

## 1. CONTEXTE

Cyrano est une agence cold email B2B AI-native (Louis & Pierre, ~10-12 clients).

Ce DS sert : site marketing (Framer), lead magnets, outils interactifs, dashboards clients (à venir), outils internes, et toutes les IAs (Cursor, Lovable, Claude Code) qui produisent du code Cyrano.

---

## 2. CE QUE TU NE DOIS PAS FAIRE

Tu vas vouloir "améliorer" la doc, "rendre plus moderne", ajouter du flair. **Ne le fais pas.** Tout ce qui suit est INTERDIT et invalide la génération :

- **Pas de hero section** avec mega-titre et boutons CTA. IQ commence par un paragraphe et passe direct au H2.
- **Pas de numérotation** des sections (01, 02, 1.1, 7.5, etc.). Aucune.
- **Pas de labels** "SECTION 01" / "SECTION 02" en uppercase au-dessus des H2.
- **Pas de nav horizontale en haut.** IQ a une sidebar verticale fixe à gauche.
- **Pas de pill / badge** "DS v0.1" ou autre à côté du logo.
- **Pas de slogan / tagline** dans le header.
- **Pas de boutons** "Explorer le DS" / "Guidelines IA" en haut de page.
- **Pas de footer** (IQ n'en a pas).
- **Pas d'animations d'apparition** (fade-in au scroll).
- **Pas de backdrop blur** ailleurs que sur le header sticky.
- **Pas de cards "EXEMPLE" / "RÈGLES"** avec label uppercase au-dessus. IQ pose juste les blocs nus.
- **Pas de tableaux** pour le z-index. IQ utilise un bloc de code coloré.
- **Pas de sparkles, particules, magnetic pull, diamond spin, pulse glow.** Bannis.
- **Pas de couleur** orange / purple / indigo / violet / pink / cyan / teal pur / yellow.

---

## 3. STRUCTURE VISUELLE OBLIGATOIRE

### Layout global

```
┌────────────────────────────────────────────────────────┐
│ [Logo Cyrano]              [Retour au site] [☀/☾]     │  ← Header sticky 64px
├──────────┬─────────────────────────────────────────────┤
│ Couleurs │  Paragraphe d'intro (gray-400, 14px, court) │
│ Typogr.  │                                             │
│ Boutons  │  Palette de couleurs  ← H2 blanc bold       │
│ Animat.  │                                             │
│ Compos.  │  Couleur primaire — Green  ← H3 vert        │
│ Layout   │  Description courte secondary               │
│ Interac. │  [5 swatches verts]                         │
│ Z-Index  │                                             │
│ Brand    │  Couleur secondaire — Deep                  │
│ Guidel.  │  ...                                        │
│  IA      │                                             │
│ ↑sticky  │                                             │
└──────────┴─────────────────────────────────────────────┘
```

### Header

- Hauteur 64px, sticky top: 0, z-index 50.
- Background `var(--cy-bg)` avec `backdrop-blur-md` et opacity 80%.
- Border-bottom 1px `var(--cy-border)`.
- Padding 16px 32px.
- À gauche : `<CyLogo variant="long" theme="auto" size={28} />` — RIEN d'autre. Pas de "DS v0.1", pas de tagline, pas de pill.
- À droite : un lien "Retour au site" (vers https://hellocyrano.com), `var(--cy-text-secondary)`, hover `var(--cy-green-500)`. Suivi du toggle theme (icône sun/moon, bouton 32px rond, fond `var(--cy-bg-muted)`).

### Sidebar

- Largeur 220px, position sticky top: 64px, height `calc(100vh - 64px)`, overflow-y auto.
- Padding 32px 16px. Background `var(--cy-bg)`. Border-right 1px subtile optionnelle.
- Liste verticale, items dans cet ordre EXACT :

```
Couleurs
Typographie
Boutons
Animations
Composants
Layout & Spacing
Interactions
Z-Index
Brand
Guidelines IA
```

- Chaque item : padding 8px 16px, font-size 14px, font-weight 500, color `var(--cy-text-secondary)`, border-radius 8px (pas full).
- Hover : color `var(--cy-text-primary)`, background `var(--cy-bg-muted)`.
- Actif (section visible au scroll, IntersectionObserver) : background `rgb(5 211 126 / 0.15)`, color `var(--cy-green-500)`.
- **Aucune numérotation. Aucun chiffre. Juste les noms.**

### Contenu principal

- Marge gauche : 220px (sidebar). Padding 48px. Max-width 920px.
- **Premier élément** : paragraphe d'intro (font Satoshi, 14-15px, color secondary, max 3 lignes). Texte EXACT :

> "Ce document présente le design system complet de Cyrano. Il sert de référence pour les développeurs humains et les IAs (Cursor, Lovable, Claude Code) pour maintenir une cohérence visuelle et technique à travers tout le projet."

- **Deuxième élément** : H2 "Palette de couleurs". Direct. **Pas de hero. Pas de boutons. Pas de pill. Pas d'image.**

### H2 (sections)

- Tag `<h2>`, font Poppins 700, font-size 32px, letter-spacing -0.02em.
- Color `var(--cy-text-primary)`. Margin-bottom 24px. Margin-top 96px (sauf 1ère = 48px).
- **Aucune numérotation. Aucun label "SECTION XX" au-dessus.**

### H3 (sous-sections)

- Tag `<h3>`, font Poppins 600, font-size 18px.
- Color `var(--cy-green-400)` (dark) / `var(--cy-green-700)` (light).
- Margin-top 48px, margin-bottom 12px.
- **Aucune numérotation.**

### Description sous H3

- Font Satoshi 400, font-size 14px, color secondary, line-height 1.6, margin-bottom 20px. Max 2-3 lignes.

### Encadrés (DocBlock)

- Background `var(--cy-bg-elevated)` (#0a1019 dark / #ffffff light).
- Border 1px `var(--cy-border)`. Border-radius 12px. Padding 24px. Margin-bottom 16px.
- **Sans label "EXEMPLE" ou "CODE" en uppercase au-dessus.** Le bloc se présente nu.

### Encadrés de code

- Wrapper border-radius 12px, border `var(--cy-border)`.
- Header : padding 8px 16px, border-bottom 1px subtile. À gauche : label `tsx` / `css` / `bash` en monospace 11px secondary. À droite : icône "Copier" (cliquable, 11px secondary, hover green-500).
- Body : padding 16px, font-mono 12px, line-height 1.6. Background `var(--cy-bg-code)` (#06090f). Texte en `var(--cy-green-300)`.

### RulesBox (encadrés de règles)

- "Bonnes pratiques" : bg `rgb(5 211 126 / 0.10)`, border `rgb(5 211 126 / 0.30)`, padding 20px, radius 12px. H4 en green-400 préfixé `✓`.
- "Règles absolues" / "Couleurs interdites" : bg `rgb(239 68 68 / 0.10)`, border `rgb(239 68 68 / 0.30)`. H4 en `#ef4444` préfixé `✕`.

---

## 4. STRUCTURE DE FICHIERS

```
ds/
├── README.md
├── DESIGN_SYSTEM.md
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── styles/
│   │   ├── global.css
│   │   ├── tokens.css
│   │   └── fonts.css
│   ├── components/
│   │   ├── CyButton.tsx
│   │   ├── CyAnimatedButton.tsx
│   │   ├── CyAnimatedButton.css
│   │   ├── CyCard.tsx
│   │   ├── CyBadge.tsx
│   │   ├── CyInput.tsx
│   │   ├── CyTextarea.tsx
│   │   ├── CyStatus.tsx
│   │   ├── CyLogo.tsx
│   │   ├── CySpinner.tsx
│   │   └── index.ts
│   └── docs/
│       ├── Sidebar.tsx
│       ├── Header.tsx
│       ├── DocSection.tsx
│       ├── DocSubSection.tsx
│       ├── DocBlock.tsx
│       ├── CodeBlock.tsx
│       ├── ColorSwatch.tsx
│       ├── RulesBox.tsx
│       └── ThemeToggle.tsx
├── public/
│   ├── fonts/poppins/
│   ├── fonts/satoshi/
│   └── logos/
└── prompts/
    └── system-prompt.md
```

Copie les assets depuis `../assets/fonts/` et `../assets/logos/` vers `ds/public/fonts/` et `ds/public/logos/` pendant la génération.

---

## 5. TOKENS — `src/styles/tokens.css`

```css
:root {
  --cy-green-300: #74ffc5;
  --cy-green-400: #30f8a5;
  --cy-green-500: #05d37e;
  --cy-green-600: #00bc6f;
  --cy-green-700: #029358;

  --cy-deep-600: #016c78;
  --cy-deep-700: #014751;
  --cy-deep-800: #063841;
  --cy-deep-900: #111827;
  --cy-deep-950: #030712;

  --cy-gray-300: #d1d5db;
  --cy-gray-400: #9ca3af;
  --cy-gray-500: #6b7280;
  --cy-gray-600: #4b5563;
  --cy-gray-700: #374151;
  --cy-gray-800: #1f2937;
  --cy-gray-900: #111827;

  --cy-success: #10b981;
  --cy-error: #ef4444;
  --cy-warning: #f59e0b;
  --cy-info: var(--cy-green-500);

  --cy-gradient-primary: linear-gradient(to right, var(--cy-green-400), var(--cy-green-500));
  --cy-gradient-alt: linear-gradient(to right, var(--cy-green-500), var(--cy-green-600));
  --cy-gradient-hover: linear-gradient(to right, var(--cy-green-600), var(--cy-green-700));
  --cy-gradient-featured: linear-gradient(to right, var(--cy-deep-950), var(--cy-deep-600) 50%, var(--cy-green-400));
  --cy-gradient-disabled: linear-gradient(to right, var(--cy-gray-700), var(--cy-gray-800));

  --cy-font-heading: 'Poppins', -apple-system, sans-serif;
  --cy-font-body: 'Satoshi', -apple-system, sans-serif;

  --cy-text-xs: 0.75rem;
  --cy-text-sm: 0.875rem;
  --cy-text-base: 1rem;
  --cy-text-lg: 1.125rem;
  --cy-text-xl: 1.25rem;
  --cy-text-2xl: 1.5rem;
  --cy-text-3xl: 2rem;
  --cy-text-4xl: 2.5rem;
  --cy-text-5xl: 3rem;
  --cy-text-6xl: 3.5rem;

  --cy-tracking-tight: -0.02em;
  --cy-tracking-tighter: -0.03em;

  --cy-space-1: 0.25rem;
  --cy-space-2: 0.5rem;
  --cy-space-3: 0.75rem;
  --cy-space-4: 1rem;
  --cy-space-6: 1.5rem;
  --cy-space-8: 2rem;
  --cy-space-12: 3rem;
  --cy-space-20: 5rem;

  --cy-radius-sm: 4px;
  --cy-radius-lg: 8px;
  --cy-radius-xl: 12px;
  --cy-radius-2xl: 16px;
  --cy-radius-full: 9999px;

  --cy-transition-fast: 150ms ease;
  --cy-transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --cy-transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);

  --cy-blur-sm: blur(8px);
  --cy-blur-md: blur(12px);
  --cy-blur-lg: blur(20px);

  --cy-z-base: 0;
  --cy-z-content: 10;
  --cy-z-header: 50;
  --cy-z-hellobar: 60;
  --cy-z-dropdown: 100;
  --cy-z-mobile-menu: 500;
  --cy-z-modal: 1000;
  --cy-z-overlay: 9999;
}

[data-theme='dark'] {
  --cy-bg: var(--cy-deep-950);
  --cy-bg-elevated: #0a1019;
  --cy-bg-code: #06090f;
  --cy-bg-muted: var(--cy-gray-800);
  --cy-text-primary: #ffffff;
  --cy-text-secondary: var(--cy-gray-400);
  --cy-text-tertiary: var(--cy-gray-500);
  --cy-text-accent: var(--cy-green-400);
  --cy-border: var(--cy-gray-800);
  --cy-border-subtle: var(--cy-gray-800);
}

[data-theme='light'] {
  --cy-bg: #fafafa;
  --cy-bg-elevated: #ffffff;
  --cy-bg-code: #f5f5f7;
  --cy-bg-muted: #f0f0f3;
  --cy-text-primary: var(--cy-deep-950);
  --cy-text-secondary: var(--cy-gray-600);
  --cy-text-tertiary: var(--cy-gray-500);
  --cy-text-accent: var(--cy-green-700);
  --cy-border: #e5e7eb;
  --cy-border-subtle: #f0f0f3;
}
```

Default theme : `dark` (posé sur `<html>`).

---

## 6. TAILWIND CONFIG

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          300: 'var(--cy-green-300)',
          400: 'var(--cy-green-400)',
          500: 'var(--cy-green-500)',
          600: 'var(--cy-green-600)',
          700: 'var(--cy-green-700)',
        },
        deep: {
          600: 'var(--cy-deep-600)',
          700: 'var(--cy-deep-700)',
          800: 'var(--cy-deep-800)',
          900: 'var(--cy-deep-900)',
          950: 'var(--cy-deep-950)',
        },
      },
      fontFamily: {
        heading: 'var(--cy-font-heading)',
        body: 'var(--cy-font-body)',
      },
    },
  },
  plugins: [],
}
```

---

## 7. FONTS — `src/styles/fonts.css`

```css
@font-face { font-family: 'Poppins'; src: url('/fonts/poppins/Poppins-Regular.ttf') format('truetype'); font-weight: 400; font-display: swap; }
@font-face { font-family: 'Poppins'; src: url('/fonts/poppins/Poppins-Medium.ttf') format('truetype'); font-weight: 500; font-display: swap; }
@font-face { font-family: 'Poppins'; src: url('/fonts/poppins/Poppins-SemiBold.ttf') format('truetype'); font-weight: 600; font-display: swap; }
@font-face { font-family: 'Poppins'; src: url('/fonts/poppins/Poppins-Bold.ttf') format('truetype'); font-weight: 700; font-display: swap; }
@font-face { font-family: 'Poppins'; src: url('/fonts/poppins/Poppins-ExtraBold.ttf') format('truetype'); font-weight: 800; font-display: swap; }

@font-face { font-family: 'Satoshi'; src: url('/fonts/satoshi/Satoshi-Variable.woff2') format('woff2-variations'); font-weight: 100 900; font-style: normal; font-display: swap; }
@font-face { font-family: 'Satoshi'; src: url('/fonts/satoshi/Satoshi-VariableItalic.woff2') format('woff2-variations'); font-weight: 100 900; font-style: italic; font-display: swap; }
```

---

## 8. ANIMATEDBUTTON — CODE COMPLET

### `src/components/CyAnimatedButton.tsx`

```tsx
import React from 'react';
import './CyAnimatedButton.css';

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
};

export const CyAnimatedButton = ({
  children, href, onClick, size = 'md', icon, className = '',
}: Props) => {
  const Tag = href ? 'a' : 'button';
  const props = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick };
  return (
    <Tag className={`cy-animated cy-animated--${size} ${className}`} {...props as any}>
      <span className="cy-animated__rotating-stroke" aria-hidden="true" />
      <span className="cy-animated__rotating-glow" aria-hidden="true" />
      <span className="cy-animated__uniform-stroke" aria-hidden="true" />
      <span className="cy-animated__uniform-glow" aria-hidden="true" />
      <span className="cy-animated__fill">
        {icon && <span className="cy-animated__icon">{icon}</span>}
        <span>{children}</span>
      </span>
    </Tag>
  );
};
```

### `src/components/CyAnimatedButton.css`

```css
@property --cy-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.cy-animated {
  --cy-angle: 0deg;
  --cy-border-thickness: 1.5px;
  --cy-rotation-duration: 4s;
  --cy-stroke-color: var(--cy-green-300);

  position: relative;
  display: inline-flex;
  isolation: isolate;
  border-radius: var(--cy-radius-xl);
  background: var(--cy-deep-800);
  padding: var(--cy-border-thickness);
  text-decoration: none;
  cursor: pointer;
  border: none;
  font-family: var(--cy-font-body);
  font-weight: 600;
  transition: transform var(--cy-transition-base);
}

.cy-animated:hover { transform: scale(1.02); }
.cy-animated:active { transform: scale(0.98); }

.cy-animated__rotating-stroke,
.cy-animated__rotating-glow {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: conic-gradient(
    from var(--cy-angle),
    transparent 0deg,
    transparent 270deg,
    var(--cy-stroke-color) 340deg,
    transparent 360deg
  );
  animation: cy-rotate var(--cy-rotation-duration) linear infinite;
  opacity: 1;
  transition: opacity var(--cy-transition-base);
}

.cy-animated__rotating-glow {
  filter: blur(12px);
  opacity: 0.7;
  z-index: -1;
  inset: -2px;
}

.cy-animated__uniform-stroke,
.cy-animated__uniform-glow {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(135deg, var(--cy-green-300), var(--cy-green-400), var(--cy-green-500));
  opacity: 0;
  transition: opacity var(--cy-transition-base);
}

.cy-animated__uniform-glow {
  filter: blur(16px);
  z-index: -1;
  inset: -3px;
}

.cy-animated:hover .cy-animated__rotating-stroke,
.cy-animated:hover .cy-animated__rotating-glow { opacity: 0; }

.cy-animated:hover .cy-animated__uniform-stroke { opacity: 1; }
.cy-animated:hover .cy-animated__uniform-glow { opacity: 0.6; }

.cy-animated__fill {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: var(--cy-space-2);
  background: var(--cy-deep-950);
  border-radius: calc(var(--cy-radius-xl) - var(--cy-border-thickness));
  color: #ffffff;
  font-family: var(--cy-font-body);
  font-weight: 600;
  transition: background var(--cy-transition-base);
}

.cy-animated:hover .cy-animated__fill { background: var(--cy-deep-900); }

.cy-animated__icon { display: inline-flex; align-items: center; }

.cy-animated--sm .cy-animated__fill { padding: 8px 18px; font-size: var(--cy-text-sm); }
.cy-animated--md .cy-animated__fill { padding: 12px 24px; font-size: var(--cy-text-base); }
.cy-animated--lg .cy-animated__fill { padding: 16px 32px; font-size: var(--cy-text-lg); }

@keyframes cy-rotate { to { --cy-angle: 360deg; } }
```

---

## 9. CONTENU EXACT DE `App.tsx`

L'ordre exact des sections dans le main, avec leur contenu attendu. **Reproduis fidèlement.**

### Top-level

```tsx
<div data-theme="dark">
  <Header />
  <div className="flex">
    <Sidebar />
    <main className="flex-1 p-12 max-w-[920px]">
      <p className="text-sm text-secondary mb-12 max-w-[680px]">
        Ce document présente le design system complet de Cyrano. Il sert de référence
        pour les développeurs humains et les IAs (Cursor, Lovable, Claude Code) pour
        maintenir une cohérence visuelle et technique à travers tout le projet.
      </p>

      <DocSection id="colors" title="Palette de couleurs"> ... </DocSection>
      <DocSection id="typography" title="Typographie"> ... </DocSection>
      <DocSection id="buttons" title="Boutons"> ... </DocSection>
      <DocSection id="animations" title="Animations"> ... </DocSection>
      <DocSection id="components" title="Composants"> ... </DocSection>
      <DocSection id="layout" title="Layout & Spacing"> ... </DocSection>
      <DocSection id="interactions" title="Interactions"> ... </DocSection>
      <DocSection id="zindex" title="Z-Index"> ... </DocSection>
      <DocSection id="brand" title="Brand"> ... </DocSection>
      <DocSection id="ai-guidelines" title="Guidelines IA"> ... </DocSection>
    </main>
  </div>
</div>
```

### Section "Palette de couleurs"

- H3 "Couleur primaire — Green" — desc + grille 5 swatches green-300 à 700
- H3 "Couleur secondaire — Deep" — desc + grille 5 swatches deep-600 à 950
- H3 "Couleurs neutres — Gray" — desc + grille 7 swatches gray-300 à 900 (height 70)
- H3 "Dégradés signatures" — desc + 5 cards (gradient block 80×50, name+usage, code Tailwind à droite). Items : Principal `from-green-400 to-green-500`, Alternatif `from-green-500 to-green-600`, Hover `from-green-600 to-green-700`, Featured `from-deep-950 via-deep-600 to-green-400`, Disabled `from-gray-700 to-gray-800`.
- H3 "Exemple d'utilisation" — bloc de code TSX montrant 3 cas (gradient button, gradient text via bg-clip-text, bg avec opacity)
- RulesBox rouge "✕ Couleurs interdites" : "Ces couleurs ne doivent **JAMAIS** apparaître. Si une IA en produit, c'est un bug à corriger." + 4 swatches (orange #f97316, purple #a855f7, indigo #6366f1, pink #ec4899) en height 50, opacity 0.6, nom en dessous en rouge.

### Section "Typographie"

- H3 "Familles de polices" — desc + grille 2 colonnes : "HEADING FONT / Poppins / weights 400-900" et "BODY FONT / Satoshi / variable 100-1000".
- H3 "Hiérarchie des titres" — DocBlock avec H1 (56px Poppins 800, "Hero Title" en gradient text), H2 (36px Poppins 700), H3 (24px Poppins 600), H4 (18px Poppins 600). Code en dessous de chaque.
- H3 "Tailles de texte" — DocBlock 5 lignes (text-xs 12px à text-xl 20px) avec usage.
- H3 "Couleurs de texte" — DocBlock 4 lignes : text-primary, text-secondary, text-tertiary, text-accent.

### Section "Boutons"

- H3 "CyAnimatedButton" — desc ("Bouton signature pour les CTAs majeurs. Bordure verte qui tourne en idle, glow uniforme au hover. À utiliser avec parcimonie — un seul par vue.") + DocBlock avec `<CyAnimatedButton size="lg">Réserver un audit</CyAnimatedButton>` + code TSX.
- H3 "Bouton primaire" — desc + DocBlock avec 4 boutons (Large, Medium, Small, Disabled) + code.
- H3 "Bouton secondaire" — desc + DocBlock avec 3 tailles.
- H3 "Bouton outlined" — desc + DocBlock.
- H3 "Bouton ghost" — desc + DocBlock.
- H3 "États et transitions" — DocBlock 2×2 grille : Normal, Hover, Active, Loading.
- RulesBox vert "✓ Bonnes pratiques" : un seul bouton primaire par vue, rounded-full sur tous, hover scale-1.03 + dégradé intensifié, active scale-0.97, disabled opacity-50 + dégradé gris, texte primaire en deep-950 sur le vert.

### Section "Animations"

- H3 "Rotating border" — desc ("Animation utilisée par CyAnimatedButton. @property --angle + conic-gradient.") + DocBlock avec le bouton + code CSS principal.
- H3 "Hover transitions" — desc + DocBlock avec un bouton à survoler et une card à survoler (bordure verte au hover).
- H3 "Float ambient (optionnel)" — desc ("Pour les backgrounds décoratifs. Lent 10-30s, faible opacity, blur. Jamais sur du contenu.").
- H3 "Transitions standards" — DocBlock font-mono : `transition-colors`, `transition-transform`, `transition-all duration-250`, `ease-out`.
- RulesBox rouge "✕ Animations interdites" : sparkles/particules sur CTAs, magnetic pull, diamond spin, pulse glow, tout effet "AI magique" qui distrait.

### Section "Composants"

- H3 "Cards" — desc + grille 2 colonnes (Card standard avec image preview tag titre desc bouton, Card featured avec badge ★ FEATURED top-left, bordure verte, glow vert).
- H3 "Badges & Tags" — DocBlock avec 6 badges en ligne : Tag standard, Tag outlined, ★ FEATURED, ✓ Succès, ✕ Erreur, ⚠ Attention.
- H3 "Inputs & Formulaires" — DocBlock avec formulaire fonctionnel (Email rounded-full, Message textarea rounded-2xl, focus en vert).
- H3 "Messages de statut" — 4 alertes (Succès, Erreur, Attention, Information) padding 14, radius 12, fond couleur/10%, border couleur/30%, icône à gauche.
- H3 "Spinner / Loading" — DocBlock avec spinner cercle 32px (border-3 gray-700, top vert, animation spin) + 3 dots animés bounce delay.

### Section "Layout & Spacing"

- H3 "Containers" — DocBlock 4 lignes : max-w-7xl 1280px Layout principal, max-w-5xl 1024px Articles, max-w-4xl 896px Hero, max-w-2xl 672px Formulaires.
- H3 "Spacing" — DocBlock 6 lignes avec barre verte de la largeur correspondante (p-2 8px, p-4 16px, p-6 24px, p-8 32px, p-12 48px, p-20 80px).
- H3 "Border radius" — DocBlock 5 cards (rectangle vert 60px de haut, radius variable, nom + usage) : rounded sm/lg/xl/2xl/full.
- H3 "Breakpoints" — DocBlock font-mono : sm: 640, md: 768, lg: 1024, xl: 1280, 2xl: 1536.

### Section "Interactions"

- H3 "États hover" — DocBlock avec un bouton à survoler + une card à survoler.
- H3 "Focus (a11y)" — desc ("Toujours visible pour la nav clavier.") + input avec focus ring vert.
- H3 "Transitions" — Liste font-mono des 6 transitions (transition-colors, transform, all, duration-150 250 400, ease-out).

### Section "Z-Index"

- H3 "Échelle stricte" — desc ("Toujours utiliser ces valeurs. Jamais de z-index arbitraire.") + DocBlock avec un bloc en font-mono :

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

Les valeurs `z-X` en green-500, le reste en text-secondary, line-height 2.2. **PAS un tableau.** Un bloc de texte stylé.

### Section "Brand"

- H3 "Logos" — desc ("Le logo Cyrano existe en 2 variantes : long (avec wordmark) et square (symbole seul). Long en priorité, square uniquement quand l'espace ne permet pas.") + grille 2×2 de 4 cards montrant chaque logo : long_white sur deep-950, long_black sur #ffffff, square_white sur deep-950, square_black sur #ffffff. En dessous de chaque, le filename en monospace text-secondary.
- H3 "Règles d'usage" — DocBlock avec liste : clear-space minimum (hauteur du C), taille min 24px (long) / 32px (square), white sur fond sombre, black sur fond clair ou vert, jamais de recoloriage, jamais d'effets, jamais de déformation.

### Section "Guidelines IA"

- Texte d'intro avant les blocs : "Section critique. Ces règles sont à injecter dans le contexte de Claude Code, Cursor, Lovable, ou tout agent qui produit du code Cyrano."
- RulesBox vert "✓ Règles absolues" : (liste de 8 règles fournies dans le prompt système, voir section 11).
- H3 "Tokens couleurs" — bloc de code CSS avec les variables :root green/deep/gray.
- H3 "Prompt système IA" — desc ("À coller en tête de chaque conversation Claude Code / Cursor / Lovable.") + bloc de code markdown contenant le contenu de `prompts/system-prompt.md`.
- H3 "Composants réutilisables" — DocBlock avec liste : CyButton, CyAnimatedButton, CyCard, CyBadge, CyInput / CyTextarea, CyStatus, CyLogo, CySpinner — chacun avec ses props principales.

---

## 10. PAS DE FOOTER

IQ n'a pas de footer. Le contenu se termine après la dernière section avec un padding-bottom de 80px.

---

## 11. PROMPT SYSTÈME — `prompts/system-prompt.md`

```markdown
# Cyrano Design System — System Prompt

Tu produis du code pour Cyrano (agence cold email B2B AI-native).
Tu DOIS respecter strictement le design system Cyrano.

## RÈGLES ABSOLUES

### Couleurs
- AUTORISÉES : green-300/400/500/600/700, deep-600/700/800/900/950, gray-300 à 900
- INTERDITES : orange, purple, indigo, violet, pink, cyan, teal pur, jaune
- TOUJOURS via CSS variables (--cy-green-500), JAMAIS les hex en dur

### Typographie
- Titres : Poppins (font-heading), weights 600-800, letter-spacing -0.02em à -0.03em
- Corps : Satoshi (font-body), weights 400-600

### Boutons
- TOUJOURS rounded-full (pill)
- Primary : bg-gradient-primary, text deep-950, shadow vert
- CyAnimatedButton : UNIQUEMENT pour les CTAs majeurs (hero, lead magnet, fin de tunnel)
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

## SI TU HÉSITES
- Paraphrase la question avant de coder
- Ne réinvente jamais un composant qui existe (CyButton, CyCard, CyBadge, CyInput, CyStatus, CyLogo, CyAnimatedButton, CySpinner)
```

---

## 12. AUTRES COMPOSANTS — SPECS

### CyButton

```tsx
type Props = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
};
```

- Tous en `rounded-full`.
- `primary` : bg-gradient-primary, text deep-950, shadow `0 6px 20px rgb(5 211 126 / 0.4)`. Hover : gradient-alt, shadow plus intense, scale-1.03. Active : scale-0.97.
- `secondary` : bg-bg-muted, border border, hover border green-500.
- `outlined` : transparent, border 2px green-500, text green-500. Hover : bg `rgb(5 211 126 / 0.10)`.
- `ghost` : transparent, text green-500. Hover : bg `rgb(5 211 126 / 0.10)`.
- `loading` → CySpinner remplace l'icône, disabled.
- `disabled` → opacity 50%, gradient-disabled, cursor not-allowed.

### CyCard

```tsx
type Props = {
  featured?: boolean;
  image?: string;
  imageAlt?: string;
  tags?: string[];
  title?: string;
  description?: string;
  action?: React.ReactNode;
};
```

- bg-bg-elevated, border border, rounded-xl, overflow-hidden.
- `featured: true` → border `rgb(5 211 126 / 0.50)`, shadow `0 0 30px rgb(5 211 126 / 0.20)`, badge "★ FEATURED" en haut à gauche (bg deep-800, border green-500, étoile verte, texte blanc).

### CyBadge

```tsx
type Props = {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'featured' | 'success' | 'error' | 'warning';
  icon?: React.ReactNode;
};
```

- Tous rounded-full, text-xs, px-3 py-1.
- `default` : bg green-500/20, text green-500.
- `outlined` : border green-500, text green-500.
- `featured` : bg-deep-800, border green-500, text white, étoile verte. **Pas le 3-stops gradient.**

### CyInput / CyTextarea

```tsx
type InputProps = {
  label?: string;
  error?: string;
  hint?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};
```

- Input : rounded-full, bg-bg-code, border, padding 12 16.
- Textarea : rounded-2xl (pill illisible).
- Focus : border green-500, ring 3px `rgb(5 211 126 / 0.30)`.
- Error : border red, message rouge en dessous.

### CyStatus

```tsx
type Props = {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
};
```

bg couleur/10%, border couleur/30%, padding 14, radius 12, icône à gauche.

### CyLogo

```tsx
type Props = {
  variant?: 'long' | 'square';
  theme?: 'auto' | 'white' | 'black';
  size?: number;
  className?: string;
};
```

Charge depuis `/logos/cyrano_{variant}_{theme}.svg`. `theme='auto'` lit `data-theme` et choisit white (dark) ou black (light).

### CySpinner

```tsx
type Props = { size?: number; };
```

Cercle border-3 gray-700, top vert, animation spin 0.8s linear infinite.

---

## 13. RÈGLES NON-NÉGOCIABLES

1. **Aucun hex en dur dans les composants.** Tous via CSS variables ou Tailwind.
2. **App.tsx utilise les vrais composants** (CyButton, CyCard, etc.). Pas de JSX inline qui réimplémente.
3. **Toggle dark/light fonctionne** via `data-theme` sur `<html>`. Default : dark.
4. **TypeScript strict.**
5. **Build doit passer** (`npm run build`).
6. **Pas de hero. Pas de numérotation. Pas de "SECTION XX". Pas de footer.**
7. **Le premier élément du main est le paragraphe d'intro.** Pas un titre. Pas un bouton. Le paragraphe.

---

## 14. DESIGN_SYSTEM.md

Fichier markdown à la racine, qui sert de référence textuelle exhaustive consommable par les IAs. Reproduis la même structure que la doc App.tsx, mais en markdown pur. Headings sans numérotation. Sections : Palette / Typographie / Boutons / Animations / Composants / Layout / Interactions / Z-Index / Brand / Guidelines IA.

---

## 15. README

Court (≤30 lignes). Description, install (`npm i && npm run dev`), import des composants, lien vers DESIGN_SYSTEM.md et prompts/system-prompt.md.

---

## 16. COMMANDE FINALE

```bash
cd ds && npm install && npm run dev
```

Doc visible sur http://localhost:5173. Toggle dark/light fonctionnel.

---

**Démarre la génération maintenant en respectant strictement la section 2 (interdictions) et la section 3 (structure visuelle). Si tu doutes, relis la section 2 avant chaque décision esthétique.**
