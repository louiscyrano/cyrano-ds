/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Tokens Cyrano natifs
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

        // Mapping shadcn → Cyrano via RGB triplets pour supporter l'opacity (`bg-primary/90`).
        // Pattern : `rgb(var(--cy-xxx-rgb) / <alpha-value>)` que Tailwind résout au build.
        background: 'rgb(var(--cy-bg-rgb) / <alpha-value>)',
        foreground: 'rgb(var(--cy-text-primary-rgb) / <alpha-value>)',
        card: {
          DEFAULT: 'rgb(var(--cy-bg-elevated-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--cy-text-primary-rgb) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'rgb(var(--cy-bg-elevated-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--cy-text-primary-rgb) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--cy-green-500-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--cy-deep-950-rgb) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--cy-bg-muted-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--cy-text-primary-rgb) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgb(var(--cy-bg-muted-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--cy-text-secondary-rgb) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--cy-bg-muted-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--cy-text-primary-rgb) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgb(var(--cy-error-rgb) / <alpha-value>)',
          foreground: 'rgb(255 255 255 / <alpha-value>)',
        },
        border: 'rgb(var(--cy-border-rgb) / <alpha-value>)',
        input: 'rgb(var(--cy-border-rgb) / <alpha-value>)',
        ring: 'rgb(var(--cy-green-500-rgb) / <alpha-value>)',
      },
      fontFamily: {
        heading: 'var(--cy-font-heading)',
        body: 'var(--cy-font-body)',
      },
      // Échelle de texte par rôle (AGENT.md §3). La valeur suit le palier d'écran via tokens.css.
      fontSize: {
        'titre-1': ['var(--cy-titre-1)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'titre-2': ['var(--cy-titre-2)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'titre-3': ['var(--cy-titre-3)', { lineHeight: '1.3' }],
        'titre-4': ['var(--cy-titre-4)', { lineHeight: '1.3' }],
        chapo: ['var(--cy-chapo)', { lineHeight: '1.5' }],
        corps: ['var(--cy-corps)', { lineHeight: '1.55' }],
        secondaire: ['var(--cy-secondaire)', { lineHeight: '1.45' }],
        dense: ['var(--cy-dense)', { lineHeight: '1.5' }],
        legende: ['var(--cy-legende)', { lineHeight: '1.4' }],
        surtitre: ['var(--cy-surtitre)', { lineHeight: '1.4' }],
        micro: ['var(--cy-micro)', { lineHeight: '1.3' }],
        chiffre: ['var(--cy-chiffre)', { lineHeight: '1' }],
        'chiffre-vedette': ['var(--cy-chiffre-vedette)', { lineHeight: '1' }],
      },
      // Table des arrondis (AGENT.md §3). sm et md branchés sur les tokens : sans ça, Tailwind donne 2 et 6 px.
      borderRadius: {
        sm: 'var(--cy-radius-sm)',
        md: 'var(--cy-radius-md)',
        lg: 'var(--cy-radius-lg)',
        xl: 'var(--cy-radius-xl)',
        '2xl': 'var(--cy-radius-2xl)',
        '3xl': 'var(--cy-radius-3xl)',
      },
      keyframes: {
        'fade-in-0': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-out-0': { from: { opacity: '1' }, to: { opacity: '0' } },
        'zoom-in-95': { from: { opacity: '0', transform: 'scale(0.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
        'zoom-out-95': { from: { opacity: '1', transform: 'scale(1)' }, to: { opacity: '0', transform: 'scale(0.95)' } },
      },
      animation: {
        'fade-in-0': 'fade-in-0 150ms ease-out',
        'fade-out-0': 'fade-out-0 100ms ease-in',
        'zoom-in-95': 'zoom-in-95 150ms ease-out',
        'zoom-out-95': 'zoom-out-95 100ms ease-in',
      },
    },
  },
  plugins: [],
}
