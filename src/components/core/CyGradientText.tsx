import React from 'react';

type Preset = 'green' | 'green-soft' | 'green-strong';

type Props = {
  children: React.ReactNode;
  /** Preset de gradient. Default `green` (signature Cyrano). */
  preset?: Preset;
  /** Override complet du gradient via CSS string (ex. "linear-gradient(...)"). */
  gradient?: string;
  /** Element rendu. Default span. Utile pour wrap un mot dans un h1. */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
};

const PRESETS: Record<Preset, string> = {
  green: 'linear-gradient(110deg, #74ffc5 0%, #30f8a5 35%, #05d37e 85%)',
  'green-soft': 'linear-gradient(110deg, #c2ffe4 0%, #74ffc5 50%, #30f8a5 100%)',
  'green-strong': 'linear-gradient(110deg, #30f8a5 0%, #05d37e 50%, #029358 100%)',
};

/**
 * CyGradientText - Applique un dégradé sur un mot ou une phrase.
 *
 * Pour les mots-accents dans les titres ("bras droit IA", "agence IA",
 * "concrètement"). Centralise le pattern `background-clip: text` réutilisé
 * partout sur le site et dans les apps.
 */
export const CyGradientText: React.FC<Props> = ({
  children,
  preset = 'green',
  gradient,
  as = 'span',
  className = '',
  style,
}) => {
  const Tag = as as React.ElementType;
  const bg = gradient ?? PRESETS[preset];
  return (
    <Tag
      className={className}
      style={{
        background: bg,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
};
