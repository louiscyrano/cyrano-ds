#!/usr/bin/env node
/**
 * Génère ds-index.json à la racine du DS Cyrano.
 *
 * Source de vérité unique pour les listes de composants et tokens.
 * Consommable par :
 * - Les IAs (charge 2-3KB au lieu de 25KB d'AGENT.md pour avoir l'inventaire)
 * - Les scripts internes (ex : check de cohérence, génération de doc)
 *
 * Usage : node scripts/generate-ds-index.mjs
 *          ou npm run ds:index
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const read = (relPath) => readFileSync(join(ROOT, relPath), 'utf8');

const extractComponentExports = (indexFile) => {
  const src = read(indexFile);
  const exports = new Set();
  // Pattern: export { Foo, Bar } from './X';  ou  export { Foo } from './X';
  const re = /export\s*\{([^}]+)\}\s*from/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const items = m[1].split(',').map((s) => s.trim());
    for (const item of items) {
      // Garde uniquement les valeurs (pas les types), nettoie "type X" et "X as Y"
      if (item.startsWith('type ')) continue;
      const name = item.split(/\s+as\s+/)[0].trim();
      if (name && /^[A-Z]/.test(name)) exports.add(name);
      // Hooks (commencent par "use")
      if (name && /^use[A-Z]/.test(name)) exports.add(name);
    }
  }
  return Array.from(exports).sort();
};

const extractTokens = () => {
  const src = read('src/styles/tokens.css');
  const tokens = new Set();
  const re = /--cy-[a-z0-9-]+/g;
  let m;
  while ((m = re.exec(src)) !== null) tokens.add(m[0]);
  return Array.from(tokens).sort();
};

const groupTokens = (tokens) => {
  const groups = {
    colors: [],
    typography: [],
    spacing: [],
    radii: [],
    shadows: [],
    motion: [],
    blur: [],
    opacity: [],
    zIndex: [],
    bg: [],
    text: [],
    border: [],
    gradient: [],
    other: [],
  };
  for (const t of tokens) {
    if (/^--cy-(green|deep|gray|success|error|warning|info)/.test(t)) groups.colors.push(t);
    else if (/^--cy-font|--cy-text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)|--cy-tracking/.test(t)) groups.typography.push(t);
    else if (/^--cy-space/.test(t)) groups.spacing.push(t);
    else if (/^--cy-radius/.test(t)) groups.radii.push(t);
    else if (/^--cy-shadow/.test(t)) groups.shadows.push(t);
    else if (/^--cy-transition/.test(t)) groups.motion.push(t);
    else if (/^--cy-blur/.test(t)) groups.blur.push(t);
    else if (/^--cy-opacity/.test(t)) groups.opacity.push(t);
    else if (/^--cy-z-/.test(t)) groups.zIndex.push(t);
    else if (/^--cy-bg/.test(t)) groups.bg.push(t);
    else if (/^--cy-text-(primary|secondary|tertiary|accent)/.test(t)) groups.text.push(t);
    else if (/^--cy-border/.test(t)) groups.border.push(t);
    else if (/^--cy-gradient/.test(t)) groups.gradient.push(t);
    else groups.other.push(t);
  }
  return groups;
};

const pkg = JSON.parse(read('package.json'));

const core = extractComponentExports('src/components/core/index.ts');
const landing = extractComponentExports('src/components/landing/index.ts');
const app = extractComponentExports('src/components/app/index.ts');
const tokens = extractTokens();
const tokensGrouped = groupTokens(tokens);

const index = {
  name: 'cyrano-ds',
  version: pkg.version,
  generatedAt: new Date().toISOString(),
  description:
    'Index machine-readable du DS Cyrano. Pour les règles de génération, voir AGENT.md. Pour la doc humaine, voir DESIGN_SYSTEM.md ou la preview locale (npm run dev).',
  layers: {
    core: {
      path: 'src/components/core/',
      style: 'inline styles + CSS variables tokens',
      import: "import { CyButton } from '@/components/core'",
      use: 'universel (apps, landings, outils internes)',
      count: core.length,
      components: core,
    },
    landing: {
      path: 'src/components/landing/',
      style: 'composites visuels lourds (WebGL, CSS animations)',
      import: "import { CyCtaBanner } from '@/components/landing'",
      use: 'pages marketing uniquement (site Cyrano, lead magnets, cas clients)',
      count: landing.length,
      components: landing,
    },
    app: {
      path: 'src/components/app/',
      style: 'Tailwind classes + cn helper (pattern shadcn)',
      import: "import { AppButton } from '@/components/app'",
      use: 'dashboards, outils internes, surfaces interactives',
      count: app.length,
      components: app,
    },
  },
  rules: [
    'Toujours réutiliser un composant existant avant d\'en créer un nouveau',
    'Landing → core/ + landing/. Dashboard → core/ + app/. Jamais croiser landing/ et app/',
    'core/ peut être importé partout. landing/ et app/ peuvent importer core/',
    'core/ ne doit JAMAIS importer landing/ ou app/ (cycle interdit)',
    'app/ ne doit pas importer landing/ (séparation des préoccupations)',
    'Si un composant est utile aux deux usages (landing + app) : il appartient à core/',
    'Imports séparés par couche, jamais via le barrel global @/components',
    'Icônes : lucide-react uniquement',
  ],
  tokens: {
    count: tokens.length,
    grouped: tokensGrouped,
  },
};

writeFileSync(join(ROOT, 'ds-index.json'), JSON.stringify(index, null, 2) + '\n');
console.log(
  `ds-index.json généré : ${core.length} composants core, ${landing.length} composants landing, ${app.length} composants app, ${tokens.length} tokens.`,
);
