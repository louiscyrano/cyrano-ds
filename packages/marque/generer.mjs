// Genere le paquet de marque (dist/) depuis marque.json. Sans dependance : node seul.
//
//   node generer.mjs             ecrit dist/
//   node generer.mjs --verifier  genere deux fois a part et compare octet pour octet (l'Action le joue)
//
// Ce que le paquet donne :
//   dist/marque.css   les couleurs (hex et triplets RGB) et les piles de polices, en variables --cy-*
//   dist/polices.css  les @font-face de Poppins et Satoshi, fichiers dans dist/polices/
//   dist/index.js     les memes valeurs pour le code qui ne lit pas de CSS (courriels, contrat, PDF)
//   dist/marque.json  la source, sans ses commentaires, avec la version
//   dist/logos/       les logos

import { createHash } from 'node:crypto'
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ICI = dirname(fileURLToPath(import.meta.url))
const DEPOT = join(ICI, '..', '..')

const ENTETE = (version) =>
  `/* cyrano-marque ${version}. Genere depuis marque.json par generer.mjs : ne pas modifier a la main. */\n`

/** Le nom CSS de chaque famille de couleur et de chaque sens. Les noms --cy-* existaient avant le paquet. */
const FAMILLES = { vert: 'green', petrole: 'deep' }
const SENS = { succes: 'success', avertissement: 'warning', destructif: 'error', info: 'info' }
const THEMES = { clair: 'light', sombre: 'dark' }

function sansCommentaires(valeur) {
  if (Array.isArray(valeur)) return valeur.map(sansCommentaires)
  if (valeur && typeof valeur === 'object') {
    return Object.fromEntries(
      Object.entries(valeur)
        .filter(([cle]) => !cle.startsWith('$'))
        .map(([cle, v]) => [cle, sansCommentaires(v)]),
    )
  }
  return valeur
}

function hexVersRgb(hex) {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(' ')
}

function verifierCouleur(chemin, hex) {
  if (!/^#[0-9a-f]{6}$/.test(hex)) throw new Error(`marque.json : ${chemin} vaut « ${hex} », attendu #rrggbb en minuscules`)
}

function lireSource() {
  const version = JSON.parse(readFileSync(join(ICI, 'package.json'), 'utf8')).version
  const source = sansCommentaires(JSON.parse(readFileSync(join(ICI, 'marque.json'), 'utf8')))
  for (const [famille, rampe] of Object.entries(source.couleurs)) {
    if (!FAMILLES[famille]) throw new Error(`marque.json : famille de couleur inconnue « ${famille} »`)
    for (const [cran, hex] of Object.entries(rampe)) verifierCouleur(`couleurs.${famille}.${cran}`, hex)
  }
  for (const [theme, sens] of Object.entries(source.semantique)) {
    if (!THEMES[theme]) throw new Error(`marque.json : theme inconnu « ${theme} »`)
    for (const nom of Object.keys(SENS)) {
      if (!sens[nom]) throw new Error(`marque.json : semantique.${theme}.${nom} manque`)
      verifierCouleur(`semantique.${theme}.${nom}`, sens[nom])
    }
  }
  return { version, source }
}

function css({ version, source }) {
  const lignes = []
  for (const [famille, rampe] of Object.entries(source.couleurs)) {
    for (const [cran, hex] of Object.entries(rampe)) lignes.push(`  --cy-${FAMILLES[famille]}-${cran}: ${hex};`)
  }
  for (const [theme, sens] of Object.entries(source.semantique)) {
    for (const [nom, hex] of Object.entries(sens)) lignes.push(`  --cy-${SENS[nom]}-${THEMES[theme]}: ${hex};`)
  }
  lignes.push('')
  lignes.push('  /* Triplets RGB, pour `rgb(var(--cy-green-500-rgb) / 0.4)`. */')
  for (const [famille, rampe] of Object.entries(source.couleurs)) {
    for (const [cran, hex] of Object.entries(rampe)) lignes.push(`  --cy-${FAMILLES[famille]}-${cran}-rgb: ${hexVersRgb(hex)};`)
  }
  for (const [theme, sens] of Object.entries(source.semantique)) {
    for (const [nom, hex] of Object.entries(sens)) lignes.push(`  --cy-${SENS[nom]}-${THEMES[theme]}-rgb: ${hexVersRgb(hex)};`)
  }
  lignes.push('')
  lignes.push(`  --cy-font-system: ${source.polices.systeme};`)
  lignes.push(`  --cy-font-mono: ${source.polices.mono};`)
  lignes.push(`  --cy-font-heading: ${source.polices.titre};`)
  lignes.push(`  --cy-font-body: ${source.polices.texte};`)
  return `${ENTETE(version)}:root {\n${lignes.join('\n')}\n}\n`
}

function policesCss({ version, source }) {
  const faces = source.polices.fichiers.map((p) => {
    const style = p.style ? ` font-style: ${p.style};` : ''
    return (
      `@font-face { font-family: '${p.famille}'; src: url('./polices/${basename(p.fichier)}') format('${p.format}');` +
      ` font-weight: ${p.graisse};${style} font-display: swap; }`
    )
  })
  return `${ENTETE(version)}${faces.join('\n')}\n`
}

function module({ version, source }) {
  const couleurs = source.couleurs
  const semantique = source.semantique
  const polices = { systeme: source.polices.systeme, mono: source.polices.mono, titre: source.polices.titre, texte: source.polices.texte }
  const logos = Object.fromEntries(Object.entries(source.logos).map(([nom, chemin]) => [nom, `logos/${basename(chemin)}`]))
  const valeurs = { version, couleurs, semantique, polices, logos }
  const js =
    `// cyrano-marque ${version}. Genere depuis marque.json par generer.mjs : ne pas modifier a la main.\n` +
    Object.entries(valeurs)
      .map(([nom, v]) => `export const ${nom} = ${JSON.stringify(v, null, 2)}\n`)
      .join('\n')
  const dts =
    `// cyrano-marque ${version}. Genere depuis marque.json par generer.mjs : ne pas modifier a la main.\n` +
    Object.entries(valeurs)
      .map(([nom, v]) => `export declare const ${nom}: ${JSON.stringify(v, null, 2)}\n`)
      .join('\n')
  return { js, dts }
}

function generer(sortie) {
  const marque = lireSource()
  rmSync(sortie, { recursive: true, force: true })
  mkdirSync(join(sortie, 'polices'), { recursive: true })
  mkdirSync(join(sortie, 'logos'), { recursive: true })
  writeFileSync(join(sortie, 'marque.css'), css(marque))
  writeFileSync(join(sortie, 'polices.css'), policesCss(marque))
  const { js, dts } = module(marque)
  writeFileSync(join(sortie, 'index.js'), js)
  writeFileSync(join(sortie, 'index.d.ts'), dts)
  writeFileSync(join(sortie, 'marque.json'), `${JSON.stringify({ version: marque.version, ...marque.source }, null, 2)}\n`)
  for (const p of marque.source.polices.fichiers) copyFileSync(join(DEPOT, p.fichier), join(sortie, 'polices', basename(p.fichier)))
  for (const chemin of Object.values(marque.source.logos)) copyFileSync(join(DEPOT, chemin), join(sortie, 'logos', basename(chemin)))
}

function empreinte(dossier) {
  const hash = createHash('sha256')
  const parcourir = (d) => {
    for (const nom of readdirSync(d).sort()) {
      const chemin = join(d, nom)
      if (statSync(chemin).isDirectory()) parcourir(chemin)
      else hash.update(`${chemin.slice(dossier.length)}\0`).update(readFileSync(chemin))
    }
  }
  parcourir(dossier)
  return hash.digest('hex')
}

if (process.argv.includes('--verifier')) {
  const a = mkdtempSync(join(tmpdir(), 'marque-a-'))
  const b = mkdtempSync(join(tmpdir(), 'marque-b-'))
  generer(a)
  generer(b)
  const [ea, eb] = [empreinte(a), empreinte(b)]
  rmSync(a, { recursive: true, force: true })
  rmSync(b, { recursive: true, force: true })
  if (ea !== eb) {
    console.error('La generation n\'est pas deterministe : deux passes donnent deux paquets differents.')
    process.exit(1)
  }
  console.log(`marque verifiee, generation deterministe (${ea.slice(0, 12)}).`)
} else {
  generer(join(ICI, 'dist'))
  console.log(`dist/ genere (cyrano-marque ${lireSource().version}, ${empreinte(join(ICI, 'dist')).slice(0, 12)}).`)
}
