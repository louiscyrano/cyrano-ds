import React from 'react';
import './CyAuroraBg.css';

type Intensity = 'subtle' | 'medium' | 'strong';

type Props = {
  /** Intensité des blobs (opacity + saturation). Default medium. */
  intensity?: Intensity;
  /** Affiche la vignette gradient haut-bas. Default true. */
  vignette?: boolean;
  /** Affiche le grain SVG en surimpression. Default true. */
  grain?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * CyAuroraBg - Fond animé "aurora" : 3 blobs verts qui dérivent + grain SVG
 * + vignette.
 *
 * À placer en background absolu d'une carte ou banner premium (CTA, winner
 * card, hero section). Pure CSS, pas de WebGL (vs CyShaderBg qui utilise
 * Warp). Les blobs respectent prefers-reduced-motion.
 *
 * Usage :
 *   <article style={{ position: 'relative', overflow: 'hidden', isolation: 'isolate' }}>
 *     <CyAuroraBg intensity="medium" />
 *     <div style={{ position: 'relative', zIndex: 1 }}>{your content}</div>
 *   </article>
 */
export const CyAuroraBg: React.FC<Props> = ({
  intensity = 'medium',
  vignette = true,
  grain = true,
  className = '',
  style,
}) => {
  return (
    <div
      aria-hidden="true"
      className={`cy-aurora-bg cy-aurora-bg--${intensity} ${className}`}
      style={style}
    >
      <span className="cy-aurora-bg__blob cy-aurora-bg__blob--a" />
      <span className="cy-aurora-bg__blob cy-aurora-bg__blob--b" />
      <span className="cy-aurora-bg__blob cy-aurora-bg__blob--c" />
      {grain && <span className="cy-aurora-bg__grain" />}
      {vignette && <span className="cy-aurora-bg__vignette" />}
    </div>
  );
};
