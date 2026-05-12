import React from 'react';
import { ChevronDown } from 'lucide-react';
import './CyScrollHint.css';

type Props = {
  /** Taille de l'icône en px. Default 28. */
  size?: number;
  /** Couleur du chevron. Default var(--cy-text-accent). */
  color?: string;
  /** Active l'animation bounce. Default true. */
  bounce?: boolean;
  /** aria-label si le hint a une fonction sémantique. */
  'aria-label'?: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * CyScrollHint - Indicateur visuel "continue à scroller" via chevron-down
 * animé en bounce.
 *
 * À placer entre une accroche et le contenu suivant (ex : au-dessus d'un
 * embed Calendly, en fin de hero, en bas d'une carte longue). Décoratif par
 * défaut (aria-hidden), à passer en mode sémantique en fournissant
 * aria-label.
 */
export const CyScrollHint: React.FC<Props> = ({
  size = 28,
  color = 'var(--cy-text-accent)',
  bounce = true,
  className = '',
  style,
  ...rest
}) => {
  const isLabeled = Boolean(rest['aria-label']);
  return (
    <span
      aria-hidden={isLabeled ? undefined : true}
      className={`cy-scroll-hint${bounce ? ' cy-scroll-hint--bounce' : ''} ${className}`}
      style={{ color, ...style }}
      {...rest}
    >
      <ChevronDown size={size} strokeWidth={2} />
    </span>
  );
};
