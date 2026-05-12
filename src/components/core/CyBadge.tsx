import React from 'react';
import { Star } from 'lucide-react';

type Variant = 'default' | 'outlined' | 'featured' | 'success' | 'error' | 'warning';

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  icon?: React.ReactNode;
  className?: string;
};

const styles: Record<Variant, React.CSSProperties> = {
  default: {
    background: 'rgb(var(--cy-green-500-rgb) / 0.20)',
    color: 'var(--cy-green-500)',
  },
  outlined: {
    background: 'transparent',
    border: '1px solid var(--cy-green-500)',
    color: 'var(--cy-green-500)',
  },
  featured: {
    background: 'var(--cy-deep-800)',
    border: '1px solid var(--cy-green-500)',
    color: '#fff',
  },
  success: {
    background: 'rgb(var(--cy-success-rgb) / 0.15)',
    color: 'var(--cy-success)',
  },
  error: {
    background: 'rgb(var(--cy-error-rgb) / 0.15)',
    color: 'var(--cy-error)',
  },
  warning: {
    background: 'rgb(var(--cy-warning-rgb) / 0.15)',
    color: 'var(--cy-warning)',
  },
};

export const CyBadge: React.FC<Props> = ({ children, variant = 'default', icon, className = '' }) => {
  const variantStyle = styles[variant];
  const star =
    variant === 'featured' ? (
      <span style={{ color: 'var(--cy-green-400)', display: 'inline-flex', lineHeight: 0 }} aria-hidden="true">
        <Star size={11} strokeWidth={2.5} fill="currentColor" />
      </span>
    ) : null;
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--cy-space-1)',
        padding: '0.25rem 0.75rem',
        fontSize: 'var(--cy-text-xs)',
        fontWeight: 600,
        fontFamily: 'var(--cy-font-body)',
        borderRadius: 'var(--cy-radius-full)',
        letterSpacing: '0.02em',
        ...variantStyle,
      }}
    >
      {star}
      {icon ? <span style={{ display: 'inline-flex' }}>{icon}</span> : null}
      {children}
    </span>
  );
};
