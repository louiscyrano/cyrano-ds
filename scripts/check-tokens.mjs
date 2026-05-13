#!/usr/bin/env node
/**
 * Vérifie qu'aucun fichier source du DS ne contient de couleur hex hardcodée
 * en dehors de tokens.css.
 *
 * Toute couleur doit passer par un token (--cy-*) ou par une classe Tailwind
 * mappée. Les seules exceptions tolérées : tokens.css lui-même + commentaires.
 *
 * Exit code 0 si OK, 1 si violations trouvées.
 *
 * Usage : node scripts/check-tokens.mjs
 *          ou npm run ds:check-tokens
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC = join(ROOT, 'src');

// Whitelist : fichiers où les hex sont OK
const WHITELIST_FILES = new Set([
  // Définition canonique des tokens
  'src/styles/tokens.css',
  // ColorSwatch montre les hex en preview, c'est sa fonction
  'src/docs/ColorSwatch.tsx',
  // App.tsx affiche les hex de la palette dans la section Couleurs (doc)
  'src/App.tsx',
  // CyGradientText définit 3 gradients avec stops/percentages spécifiques. Les
  // hex correspondent aux tokens green-300/400/500/600/700 + une nuance
  // intermédiaire green-200 non tokenisée. Refactor possible si --cy-green-200
  // est ajouté.
  'src/components/core/CyGradientText.tsx',
  // AppButton variant destructive utilise une saturation distincte du
  // --cy-error pour le shadow. Couleur d'état spécifique au pattern shadcn.
  'src/components/app/AppButton.tsx',
  // AppToast définit la palette tonale success/warning/error des toasts
  // (saturations spécifiques + bordures), distincte des --cy-success/error/warning.
  'src/components/app/AppToast.tsx',
]);

// Whitelist : hex tolérés partout (couleurs system / standards web)
const WHITELIST_HEX = new Set([
  '#000', '#000000', '#fff', '#ffffff',
  // Transparent et autres patterns techniques utilisés dans rgba
]);

const HEX_REGEX = /#[0-9a-fA-F]{3,8}\b/g;

const walk = (dir, out = []) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else if (/\.(tsx?|css)$/.test(entry)) out.push(full);
  }
  return out;
};

const stripComments = (source, ext) => {
  if (ext === 'css') {
    return source.replace(/\/\*[\s\S]*?\*\//g, '');
  }
  // ts/tsx : single-line // et multi-line /* */
  return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
};

const violations = [];
for (const file of walk(SRC)) {
  const rel = relative(ROOT, file);
  if (WHITELIST_FILES.has(rel)) continue;
  const ext = file.split('.').pop();
  const raw = readFileSync(file, 'utf8');
  const stripped = stripComments(raw, ext);
  const lines = stripped.split('\n');
  lines.forEach((line, idx) => {
    const matches = line.match(HEX_REGEX);
    if (!matches) return;
    for (const hex of matches) {
      const normalized = hex.toLowerCase();
      if (WHITELIST_HEX.has(normalized)) continue;
      violations.push({ file: rel, line: idx + 1, hex, context: line.trim() });
    }
  });
}

if (violations.length === 0) {
  console.log('OK : aucune couleur hex hardcodée hors tokens.css.');
  process.exit(0);
}

console.error(`${violations.length} violation(s) détectée(s) :`);
console.error('');
for (const v of violations) {
  console.error(`  ${v.file}:${v.line} → ${v.hex}`);
  console.error(`     ${v.context.slice(0, 100)}${v.context.length > 100 ? '…' : ''}`);
}
console.error('');
console.error('Toute couleur doit passer par un token --cy-* (tokens.css) ou une classe Tailwind mappée.');
console.error('Si une exception est justifiée, l\'ajouter à WHITELIST_FILES ou WHITELIST_HEX dans scripts/check-tokens.mjs.');
process.exit(1);
