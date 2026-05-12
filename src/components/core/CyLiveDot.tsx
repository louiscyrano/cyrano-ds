import React from 'react';
import './CyLiveDot.css';

type Props = {
  /** Diamètre du point en px. Default 6. */
  size?: number;
  /** Couleur du dot. Default var(--cy-green-400). */
  color?: string;
  /** Active l'animation pulse. Default true. */
  pulse?: boolean;
  /** Style additionnel inline. */
  style?: React.CSSProperties;
  className?: string;
};

/**
 * CyLiveDot - Point animé "live" / status indicator.
 *
 * Réutilisable pour : eyebrows (à gauche d'un label), badges live, status
 * dots dans des cartes ou feeds. Animation pulse opacity 1 → 0.45 → 1 sur
 * 2.4s, respect de prefers-reduced-motion.
 */
export const CyLiveDot: React.FC<Props> = ({
  size = 6,
  color = 'var(--cy-green-400)',
  pulse = true,
  style,
  className = '',
}) => {
  return (
    <span
      aria-hidden="true"
      className={`cy-live-dot${pulse ? ' cy-live-dot--pulse' : ''} ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${Math.round(size * 1.3)}px ${color}`,
        ...style,
      }}
    />
  );
};
