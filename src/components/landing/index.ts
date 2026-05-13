// Landing primitives — composants composites spécifiques aux pages marketing.
//
// Règles :
// - Un composant landing/ peut importer librement depuis core/ (couche additive).
// - Un composant core/ ne doit JAMAIS importer depuis landing/ (cycle interdit).
// - Un composant app/ ne doit pas importer depuis landing/ (séparation des préoccupations).
// - Une landing combine core/ + landing/. Un dashboard utilise core/ + app/, jamais landing/.

export { CyShaderBg } from './CyShaderBg';
export { CyAuroraBg } from './CyAuroraBg';
export { CyRoadmapStrip } from './CyRoadmapStrip';
export type { RoadmapStep } from './CyRoadmapStrip';
export { CyCtaBanner } from './CyCtaBanner';
export { CySecondaryHero } from './CySecondaryHero';
export type { CySecondaryHeroProps } from './CySecondaryHero';
