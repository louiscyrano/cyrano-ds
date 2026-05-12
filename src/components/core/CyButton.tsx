import React from 'react';
import { CySpinner } from './CySpinner';
import './CyButton.css';

type Variant = 'primary' | 'icon' | 'secondary' | 'outlined' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  type?: 'button' | 'submit';
};

const sizeDimensions: Record<Size, { minWidth: number; height: number; paddingX: number }> = {
  sm: { minWidth: 143, height: 36, paddingX: 18 },
  md: { minWidth: 184, height: 48, paddingX: 22 },
  lg: { minWidth: 250, height: 52, paddingX: 28 },
};

const sizeFont: Record<Size, string> = {
  sm: 'var(--cy-text-sm)',
  md: 'var(--cy-text-base)',
  lg: 'var(--cy-text-lg)',
};

const spinnerSize: Record<Size, number> = { sm: 14, md: 18, lg: 22 };

const variantStyles: Record<Variant, React.CSSProperties> = {
  primary: {
    background: 'var(--cy-gradient-primary)',
    color: 'var(--cy-deep-950)',
    boxShadow: '0 6px 20px rgb(var(--cy-green-500-rgb) / 0.4)',
    border: '1px solid transparent',
    borderRadius: 'var(--cy-radius-full)',
  },
  icon: {
    background: 'var(--cy-gradient-primary)',
    color: 'var(--cy-deep-950)',
    boxShadow: '0 6px 20px rgb(var(--cy-green-500-rgb) / 0.4)',
    border: '1px solid transparent',
    borderRadius: 'var(--cy-radius-xl)',
  },
  secondary: {
    background: 'var(--cy-bg-muted)',
    color: 'var(--cy-text-primary)',
    border: '1px solid var(--cy-border)',
    borderRadius: 'var(--cy-radius-full)',
  },
  outlined: {
    background: 'transparent',
    color: 'var(--cy-green-500)',
    border: '2px solid var(--cy-green-500)',
    borderRadius: 'var(--cy-radius-full)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--cy-green-500)',
    border: '1px solid transparent',
    borderRadius: 'var(--cy-radius-full)',
  },
};

export const CyButton = React.forwardRef<HTMLButtonElement, Props>(({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  ...rest
}, ref) => {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const isDisabled = disabled || loading;
  const hasShine = (variant === 'primary' || variant === 'icon') && !isDisabled;

  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--cy-space-2)',
    minWidth: sizeDimensions[size].minWidth,
    height: sizeDimensions[size].height,
    padding: `0 ${sizeDimensions[size].paddingX}px`,
    fontSize: sizeFont[size],
    fontFamily: 'var(--cy-font-body)',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition:
      'transform var(--cy-transition-base), box-shadow var(--cy-transition-base), background var(--cy-transition-base)',
    transform: !isDisabled && pressed ? 'scale(0.97)' : !isDisabled && hovered ? 'scale(1.03)' : 'scale(1)',
    opacity: isDisabled ? 0.5 : 1,
    ...variantStyles[variant],
  };

  if ((variant === 'primary' || variant === 'icon') && !isDisabled && hovered) {
    base.background = 'var(--cy-gradient-alt)';
    base.boxShadow = '0 8px 24px rgb(var(--cy-green-500-rgb) / 0.55)';
  }
  if (variant === 'secondary' && !isDisabled && hovered) {
    base.borderColor = 'var(--cy-green-500)';
  }
  if (variant === 'outlined' && !isDisabled && hovered) {
    base.background = 'rgb(var(--cy-green-500-rgb) / 0.10)';
  }
  if (variant === 'ghost' && !isDisabled && hovered) {
    base.background = 'rgb(var(--cy-green-500-rgb) / 0.10)';
  }

  if (isDisabled && (variant === 'primary' || variant === 'icon')) {
    base.background = 'var(--cy-gradient-disabled)';
    base.color = 'var(--cy-gray-400)';
    base.boxShadow = 'none';
  }

  const iconNode = loading ? <CySpinner size={spinnerSize[size]} /> : icon;
  const finalClassName = [hasShine ? 'cy-btn-shine' : '', className].filter(Boolean).join(' ');

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={finalClassName}
      style={base}
      onMouseEnter={(e) => {
        setHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        setPressed(false);
        onMouseLeave?.(e);
      }}
      onMouseDown={(e) => {
        setPressed(true);
        onMouseDown?.(e);
      }}
      onMouseUp={(e) => {
        setPressed(false);
        onMouseUp?.(e);
      }}
    >
      {iconNode && iconPosition === 'left' ? <span style={{ display: 'inline-flex' }}>{iconNode}</span> : null}
      <span>{children}</span>
      {iconNode && iconPosition === 'right' ? <span style={{ display: 'inline-flex' }}>{iconNode}</span> : null}
    </button>
  );
});

CyButton.displayName = 'CyButton';
