import React from 'react';
import { CyBadge } from './CyBadge';

type Props = {
  /** Active la variante "featured" (bordure verte, halo vert, badge FEATURED en overlay top-left). */
  featured?: boolean;
  /** URL de l'image en background du header (160px de haut). Si absente, fallback sur un gradient deep→green. */
  image?: string;
  /** Texte alternatif pour l'image (a11y). */
  imageAlt?: string;
  /** Tags affichés au-dessus du titre. Chaque string devient un CyBadge variant="outlined". */
  tags?: string[];
  /** Titre de la card (h4 600 weight). */
  title?: string;
  /** Description courte sous le titre, texte secondaire. */
  description?: string;
  /** Élément d'action affiché en bas (typiquement un CyButton). */
  action?: React.ReactNode;
  /** Classes additionnelles sur le wrapper externe. */
  className?: string;
};

export const CyCard: React.FC<Props> = ({
  featured = false,
  image,
  imageAlt = '',
  tags,
  title,
  description,
  action,
  className = '',
}) => {
  const wrapper: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--cy-bg-elevated)',
    border: `1px solid ${featured ? 'rgb(var(--cy-green-500-rgb) / 0.50)' : 'var(--cy-border)'}`,
    borderRadius: 'var(--cy-radius-xl)',
    overflow: 'hidden',
    boxShadow: featured ? '0 0 30px rgb(var(--cy-green-500-rgb) / 0.20)' : 'none',
  };

  const previewStyle: React.CSSProperties = image
    ? {
        height: 160,
        width: '100%',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        height: 160,
        width: '100%',
        background: 'linear-gradient(135deg, var(--cy-deep-800), var(--cy-green-700))',
      };

  return (
    <div className={className} style={wrapper}>
      {featured ? (
        <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 1 }}>
          <CyBadge variant="featured">FEATURED</CyBadge>
        </div>
      ) : null}
      <div role="img" aria-label={imageAlt} style={previewStyle} />
      <div
        style={{
          padding: 'var(--cy-space-6)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--cy-space-3)',
        }}
      >
        {tags && tags.length > 0 ? (
          <div style={{ display: 'flex', gap: 'var(--cy-space-2)', flexWrap: 'wrap' }}>
            {tags.map((tag) => (
              <CyBadge key={tag} variant="outlined">
                {tag}
              </CyBadge>
            ))}
          </div>
        ) : null}
        {title ? (
          <h4
            style={{
              fontFamily: 'var(--cy-font-heading)',
              fontWeight: 600,
              fontSize: 'var(--cy-text-lg)',
              color: 'var(--cy-text-primary)',
              letterSpacing: 'var(--cy-tracking-tight)',
            }}
          >
            {title}
          </h4>
        ) : null}
        {description ? (
          <p style={{ fontSize: 'var(--cy-text-sm)', color: 'var(--cy-text-secondary)', lineHeight: 1.6 }}>
            {description}
          </p>
        ) : null}
        {action ? <div style={{ marginTop: 'var(--cy-space-2)' }}>{action}</div> : null}
      </div>
    </div>
  );
};
