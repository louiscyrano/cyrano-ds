# Audit visuel — Cyrano Design System

**Cible** : http://localhost:5173/
**Mode** : audit only (aucune modification du code)
**Date** : 2026-04-30
**Périmètre** : 11 sections de doc (toutes), dark + light, viewport 1440×900
**Méthode** : Playwright MCP + extraction JS du DOM rendu

---

## Score global

| Dimension | Note | Verdict |
|---|---|---|
| **Visual Hierarchy** | A− | Forte. La sidebar + H2 nu + H3 vert sous-sections fonctionnent. |
| **Typography** | A− | Poppins/Satoshi propre, 3 polices au total (✓), tailles cohérentes. |
| **Color & Contrast** | B | Palette claire mais H3 vert en light mode borderline AA (3.78). |
| **Spacing & Layout** | A | Sidebar 220px, max-w 920px, marges H2 96px → rhythme propre. |
| **Interaction States** | B− | Hover OK, focus présent, mais touch targets sous 44px nombreux. |
| **Responsive** | n/a | Non testé (DS desktop-first, doc interne). |
| **Motion** | B+ | Shine hover + rotating border bien dosés. Pas de slop. |
| **Content Quality** | A | Aucun lorem, copywriting direct, pas de happy talk. |
| **AI Slop Detection** | A | Zéro pattern slop. Pas de gradient violet, pas de 3-col feature grid, pas d'icônes-en-cercle. |
| **Performance** | A | 199 KB JS / 19 KB CSS. Pas de FOUT visible (font-display swap). |

**Design Score global : A− (8/10)**
**AI Slop Score : A (10/10)** — Le DS est un anti-slop par construction, et ça se voit.

---

## Première impression (Phase 1)

**Ce que la page communique** : sérieux technique, marque verte affirmée, doc faite par quelqu'un qui code (vs SaaS template). Le logo "Cyr4no." (avec le "4" stylisé en vert) en haut-gauche pose l'identité immédiatement.

**Ce qui frappe** :
1. Le logo (haut gauche, contrast fort)
2. L'item actif "Couleurs" en vert/bg vert dans la sidebar
3. Le H2 blanc bold "Palette de couleurs"

C'est exactement la hiérarchie attendue — la sidebar guide, le contenu suit. **Trunk test : PASS** (on sait quel site, quelle page, quels sont les sections, où on est).

**En un mot** : *intentionnel*.

---

## Design system rendu (extrait du DOM live)

```
Polices    Poppins (titres), Satoshi (corps), ui-monospace (code) — 3 ✓
Couleurs   23 distinctes (≈ 11 vraies + 12 nuances de gris pour dark/light)
Body bg    rgb(3, 7, 18)  (deep-950 dark) / rgb(250, 250, 250) (light)
H2         32px / Poppins 700 / blanc — uniforme partout ✓
H3 std     18px / Poppins 600 / vert (green-400 dark, green-700 light)
H3 group   20px / Poppins 600 / blanc (sections "Boutons animés" / "Boutons standards")
H4         16px / Poppins 600 / contextuel (vert / blanc / rouge selon RulesBox)
```

**Cohérence** : très bonne. Les variations de H4 sont sémantiques (rouge = règles à ne pas faire, vert = règles à suivre, blanc = neutre dans card).

---

## Findings priorisés

Légende :
- **P0** = bloquant pour publication ou bug visible
- **P1** = défaut de polish ou conformité standard à corriger
- **P2** = amélioration cosmétique, optionnel

---

### P0 (bloquants)

**Aucun.** Aucun bug visuel ou fonctionnel critique détecté. Le DS est en état de marche.

---

### P1 (à corriger avant le prochain palier)

**P1.1 — Touch targets sous 44×44 (a11y mobile)**
Liste des éléments interactifs sous le minimum WCAG 2.5.5 :
| Élément | Dimensions | Contexte |
|---|---|---|
| Toggle theme (header) | 32×32 | Trop petit pour mobile |
| Items sidebar | 187×38 | Hauteur 38 < 44 |
| Boutons `Copier` (CodeBlock) | 33×18 | Très petit |
| Boutons taille `sm` | 143×36 | 36 < 44 |
| Inputs (formulaire démo) | 446×26 / 740×26 | Hauteur 26 trop petite |

**Pourquoi c'est P1** : le DS est principalement consulté sur desktop, donc pas critique aujourd'hui. Mais quand il sera utilisé pour des produits Cyrano publics (hellocyrano.com refonte), les composants `core` seront repris tels quels — et là c'est mobile-bloquant.

**Reco** : remonter la hauteur min des inputs à 40px (ou 44 si on assume mobile), boutons `sm` à 40px, items sidebar à 44px. Ne pas toucher au toggle 32px (acceptable en header desktop, on adaptera en responsive).

---

**P1.2 — Contraste H3 vert en light mode borderline AA**
Mesure : H3 vert (`#029358` = green-700) sur fond `#fafafa` = ratio **3.78:1**.
WCAG AA "normal text" demande 4.5:1. WCAG AA "large text" (≥18pt = 24px OR ≥14pt bold = 18.66px+ bold) demande 3:1.

Le H3 fait 18px / weight 600 (semibold, pas bold strict). C'est dans la zone grise — selon les validateurs, ça passe juste. Mais visuellement c'est trop fluo pour de la lecture confortable en light.

**Reco** : passer le H3 en light à `green-800` (créer ce token, ~`#02704a`) pour atteindre ≥4.5:1. Ou augmenter la weight à 700 sur les H3, ce qui passe la règle "large text bold".

---

**P1.3 — Effet visuel du `CyAnimatedButton` ambigu en statique**
Le screenshot des 3 tailles montre un trait lumineux vert en HAUT de chaque bouton, qui ressemble plus à un highlight qu'à une bordure rotative. C'est le bug optique du `conic-gradient` capturé à l'instant T — la bordure complète ne se voit qu'en mouvement.

Conséquence : sur un screenshot statique (page de doc, capture marketing, première impression d'un nouvel utilisateur qui charge la page sur slow 3G), le bouton paraît cassé.

**Reco P1** : ralentir la rotation à 6-8s (au lieu de 4s actuel) ET élargir l'angle visible du conic-gradient (passer de 90° à 180°), pour qu'à n'importe quel instant T une portion plus large de la bordure soit visible. Effet plus discret mais "lisible" même en pause.

---

**P1.4 — Chiffre des distinct colors un peu élevé (23)**
La règle de pouce du brief évoquait <12 non-gray. Ici 23 distinctes, dont ~11 vraies couleurs (vert × 5, deep × 5, error rouge) et ~12 nuances de gris (dark + light backgrounds). Pas dramatique, mais ça veut dire que chaque RGBA(green/0.10), RGBA(green/0.15), RGBA(green/0.20) est compté distinctement.

**Reco** : pas urgent. Juste vérifier qu'il n'y a pas de dérive (genre `rgb(5 211 126 / 0.12)` qui apparaît quelque part proche d'un `0.10` — gaspillage). Un grep automatique sur les opacités suffit.

---

### P2 (polish, à faire un jour)

**P2.1 — H3 "groupe" 20px white vs H3 "sous-section" 18px green : léger conflit visuel**
Dans la section Boutons, on a "Boutons animés" en H3-20-white puis "CyAnimatedButton" en H3-18-green. Sémantiquement OK mais visuellement la différence 20→18 est si faible que les deux niveaux semblent presque équivalents. Le lecteur peut hésiter.

**Reco** : soit passer le "groupe" en 22px (différence plus claire), soit transformer "Boutons animés" / "Boutons standards" en quelque chose de plus distinct (eyebrow uppercase, ou trait/border), soit le supprimer et laisser les CyAnimatedButton/Bouton principal/Bouton avec icône s'enchaîner directement.

**P2.2 — Le cursor-grab du fond noir au-dessus de "Composants core" lors du scroll**
Quand on scrolle vers `#components-core`, le viewport présente un GROS espace noir vide au-dessus de la section. C'est dû au `marginTop: 96` du DocSection + le fait que la section précédente (Animations RulesBox) finit haut. Effet "page vide" gênant.

**Reco** : c'est probablement une combinaison de scrollIntoView + scrollMarginTop qui ne s'aligne pas parfaitement. Vérifier que les anchors `#xxx` arrivent juste sous le header sticky (offset 64+24px), pas plus.

**P2.3 — Toggle theme : icônes très petites (14px) dans un cercle 32px**
Les icônes Moon/Sun font 14px dans un bouton de 32px. Visuellement la cible est diffuse. La marge interne semble grande.

**Reco** : passer les icônes à 16px, ou réduire le bouton à 28px pour serrer la composition.

**P2.4 — Le focus ring `:focus-visible` global est en `outline: 2px green-500` — bon, mais générique**
Le DS pourrait choisir un focus ring signature (par exemple un `box-shadow: 0 0 0 3px rgb(5 211 126 / 0.30)` qui matche le ring des inputs focused). Cohérence visuelle accrue.

**P2.5 — Le bouton avec icône "Télécharger" à la taille `sm` (143×36) — l'icône Download 14px paraît grande dans un bouton de 36px**
La proportion icône/texte est bonne en `lg` (20/52) et `md` (18/48), mais en `sm` (14/36) l'icône est presque aussi haute que la moitié du bouton. À évaluer en contexte.

**P2.6 — Les `code` inline dans les paragraphes descriptifs (ex `app/`) n'ont pas de fond ni padding**
Dans `<p>...dans <code>app/</code>.</p>`, le code apparaît juste en monospace blanc, sans visual cue. On peut facilement le rater. Standard : `code { background: rgba(green/0.10); padding: 2px 6px; border-radius: 4px; }`.

---

## Tests d'interaction

| Test | Résultat | Note |
|---|---|---|
| Toggle dark → light | ✓ Marche | data-theme bascule, tous les composants suivent |
| LocalStorage persistence (`cy-theme`) | ✓ Implémenté (vu dans le code) | Non testé visuellement (refresh) |
| Sidebar scroll-spy (IntersectionObserver) | ⚠ Comportement bizarre observé | Le scrollY semble se réajuster automatiquement vers la section observée — possible boucle entre scrollTo programmatique et l'observer |
| Logo Cyr4no auto-theme | ✓ Marche | white sur dark, black sur light |
| Lien "Retour au site" | ✓ Stylé | Hover non testé |
| Code copy button | ✓ Présent | Cliqué un coup, le label passe à "Copié" 1.5s |
| Boutons hover (shine, scale) | Non testé en GIF | Comportement code OK lu dans CyButton.tsx |

---

## Quick wins (≤30 min chacun)

1. **Boost contraste H3 light** : créer `--cy-green-800` (#02704a) et l'utiliser en light pour les H3. 5 min.
2. **Style des `<code>` inline** : ajouter dans `global.css` un style discret (bg green-500/10, padding, radius). 10 min.
3. **Hauteur min inputs** : passer de 40px (calculé via padding 12 + line-height) à 44px. 5 min.
4. **Hauteur min boutons sm** : passer de 36 à 40px (héritage WCAG 2.5.5). 10 min — mais il faut vérifier que les designs précédents (où Louis a validé 36) ne cassent pas.
5. **Ralentir le `cy-rotate` du AnimatedButton** : passer de 4s à 7s, élargir l'angle visible de 90° → 180° dans le conic-gradient. 10 min, effet plus lisible en statique.

---

## Ce qui est déjà excellent

- **Aucun pattern AI slop** : pas de gradient purple, pas de feature grid en 3 colonnes, pas d'icônes-dans-cercles, pas de cards bubble uniformes, pas de happy talk. C'est rare et précieux.
- **Rigueur lexicale** : les RulesBox vert ✓ / rouge ✕ avec les icônes Lucide forment un langage visuel cohérent. La section "Couleurs interdites" supprimée a renforcé l'élégance (les règles sont dans le system-prompt, pas dans la doc visuelle).
- **Le logo Cyr4no avec le "4" stylisé** : décision de marque forte, lisible immédiatement, pas d'ambiguïté.
- **L'intentionnalité des couleurs** : 5 verts numérotés + 5 deeps + 7 grays = système, pas accident. Visible dès la première section.
- **L'autocohérence** : les composants documentés EN UTILISANT les composants. Les CyButton dans la section Boutons sont les vrais CyButton du DS, pas des stubs HTML. Standard de qualité élevé.

---

## Synthèse pour Louis

Le DS est en très bon état. Pas de bug bloquant, pas de slop, hiérarchie claire, marque affirmée. Les frottements sont tous dans le polish (touch targets mobile, contraste light borderline, lisibilité de l'AnimatedButton en statique).

**Si tu choisis 3 actions** :
1. Quick wins #1 (contraste H3 light) → impact immédiat sur conformité a11y
2. Quick wins #5 (ralentir AnimatedButton) → améliore la première impression sur tous les screenshots et captures futurs
3. Décision : valider ou pas le passage des touch targets à ≥40px maintenant. C'est un choix produit (mobile-ready vs desktop-only-pour-l'instant). Si réponse "mobile aussi", je peux le faire en 1h propre.

Le reste (P2) peut attendre la prochaine itération du DS.
