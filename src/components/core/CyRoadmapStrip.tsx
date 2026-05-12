import React from 'react';
import './CyRoadmapStrip.css';

export type RoadmapStep = {
  num: string;
  label: string;
};

type Props = {
  steps: RoadmapStep[];
  /** Largeur max du strip (px). Default 800. */
  maxWidth?: number;
  /** Sépare les groupes par une flèche. Default true. */
  arrows?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * CyRoadmapStrip - Strip horizontal de pills numérotées séparées par des
 * flèches. Pour roadmaps, pipelines, parcours utilisateur, étapes d'un process.
 *
 * Desktop : tout sur une ligne. Mobile : wrap en 3 par ligne (flèches
 * masquées).
 *
 * Note: par défaut, le composant est purement décoratif (aria-hidden). Si tu
 * veux le rendre sémantique, wrapper avec un nav + aria-label côté usage.
 */
export const CyRoadmapStrip: React.FC<Props> = ({
  steps,
  maxWidth = 800,
  arrows = true,
  className = '',
  style,
}) => {
  return (
    <div
      aria-hidden="true"
      className={`cy-roadmap-strip ${className}`}
      style={{ maxWidth, ...style }}
    >
      {steps.map((s, i) => (
        <span key={`${s.num}-${i}`} className="cy-roadmap-strip__group">
          <span className="cy-roadmap-strip__node">
            <span className="cy-roadmap-strip__num">{s.num}</span>
            {s.label}
          </span>
          {arrows && i < steps.length - 1 && (
            <span className="cy-roadmap-strip__arrow">→</span>
          )}
        </span>
      ))}
    </div>
  );
};
