import React from 'react';

type Props = {
  href: string;
  children: React.ReactNode;
  /** Icône lucide affichée à droite du label. */
  icon?: React.ReactNode;
  /** Si le lien est externe : ajoute target=_blank + rel=noopener noreferrer. */
  external?: boolean;
  /** Override de target. */
  target?: React.HTMLAttributeAnchorTarget;
  /** Override de rel. */
  rel?: string;
  /** aria-label si le label visible n'est pas suffisant. */
  'aria-label'?: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * CyLinkPill - Mini-CTA secondaire en forme de pill glassmorphic vert.
 *
 * Pour les liens contextuels (sources, citations, lectures complémentaires)
 * qui appellent un design plus délicat qu'un CyButton standard. Fond
 * translucide avec backdrop-filter, border vert, hover plus opaque. Pas un
 * CTA primaire, plutôt un "lire plus".
 */
export const CyLinkPill: React.FC<Props> = ({
  href,
  children,
  icon,
  external = false,
  target,
  rel,
  className = '',
  style,
  ...rest
}) => {
  const resolvedTarget = target ?? (external ? '_blank' : undefined);
  const resolvedRel = rel ?? (external ? 'noopener noreferrer' : undefined);

  return (
    <a
      href={href}
      target={resolvedTarget}
      rel={resolvedRel}
      className={`cy-link-pill ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: 'var(--cy-font-body)',
        fontSize: 'var(--cy-text-xs)',
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--cy-green-400)',
        padding: '7px 13px',
        borderRadius: 'var(--cy-radius-full)',
        background: 'rgb(var(--cy-green-500-rgb) / 0.08)',
        border: '1px solid rgb(var(--cy-green-500-rgb) / 0.25)',
        textDecoration: 'none',
        transition: 'var(--cy-transition-base)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgb(var(--cy-green-500-rgb) / 0.16)';
        e.currentTarget.style.borderColor = 'rgb(var(--cy-green-500-rgb) / 0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgb(var(--cy-green-500-rgb) / 0.08)';
        e.currentTarget.style.borderColor = 'rgb(var(--cy-green-500-rgb) / 0.25)';
      }}
      {...rest}
    >
      {children}
      {icon ? <span style={{ display: 'inline-flex' }}>{icon}</span> : null}
    </a>
  );
};
