import React from 'react';
import { CyButton } from './CyButton';
import { CyAuroraBg } from './CyAuroraBg';
import { CyGradientText } from './CyGradientText';
import { CyRoadmapStrip, type RoadmapStep } from './CyRoadmapStrip';
import './CyCtaBanner.css';

type Variant = 'aurora' | 'plain';

type Props = {
  /** Eyebrow optionnel au-dessus du titre. */
  eyebrow?: React.ReactNode;
  /** Texte avant l'accent. */
  titleBefore: string;
  /** Mot mis en gradient. */
  titleAccent?: string;
  /** Texte après l'accent. */
  titleAfter?: string;
  /** Sous-titre / description. */
  subtitle?: string;
  /** Steps optionnels affichés en strip entre subtitle et bouton. */
  steps?: RoadmapStep[];
  /** Label du bouton primaire. */
  buttonLabel: string;
  /** Cible du bouton. URL ou ancre (navigation native). */
  href: string;
  /** Variante visuelle. Default `aurora` (blobs verts animés). */
  variant?: Variant;
  /** Icône du bouton (lucide). */
  buttonIcon?: React.ReactNode;
  className?: string;
};

/**
 * CyCtaBanner - Banner CTA pleine largeur, signature Cyrano.
 *
 * Compose CyAuroraBg + CyGradientText + CyRoadmapStrip (optionnel) + CyButton.
 * À placer entre 2 sections pour relancer l'attention et offrir une porte de
 * sortie (RDV, ressource, page produit).
 *
 * Variant `aurora` : fond animé blobs verts (Cyrano-signature).
 * Variant `plain` : fond sobre, juste un wrap glow vert subtil.
 */
export const CyCtaBanner: React.FC<Props> = ({
  eyebrow,
  titleBefore,
  titleAccent,
  titleAfter = '',
  subtitle,
  steps,
  buttonLabel,
  href,
  variant = 'aurora',
  buttonIcon,
  className = '',
}) => {
  const handleClick = () => {
    if (href.startsWith('#')) {
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = href;
    }
  };

  return (
    <section className={`cy-cta-banner cy-cta-banner--${variant} ${className}`}>
      <div className="cy-cta-banner__shell">
        {variant === 'aurora' && <CyAuroraBg intensity="medium" />}

        {eyebrow && (
          <div className="cy-cta-banner__eyebrow">{eyebrow}</div>
        )}

        <h2 className="cy-cta-banner__title">
          {titleBefore}
          {titleAccent && (
            <CyGradientText>{titleAccent}</CyGradientText>
          )}
          {titleAfter}
        </h2>

        {subtitle && <p className="cy-cta-banner__sub">{subtitle}</p>}

        {steps && steps.length > 0 && (
          <div className="cy-cta-banner__strip">
            <CyRoadmapStrip steps={steps} />
          </div>
        )}

        <div className="cy-cta-banner__cta">
          <CyButton
            variant="primary"
            size="md"
            onClick={handleClick}
            icon={buttonIcon}
            iconPosition="right"
          >
            {buttonLabel}
          </CyButton>
        </div>
      </div>
    </section>
  );
};
