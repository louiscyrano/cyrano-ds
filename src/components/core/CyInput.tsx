import React, { useState } from 'react';

type Props = {
  /** Label affiché au-dessus du champ. Lié au input via htmlFor automatique. Omettre pour un input sans label visible. */
  label?: string;
  /** Message d'erreur affiché en rouge sous le champ. Sa présence active l'état visuel d'erreur (border rouge, focus ring rouge). */
  error?: string;
  /** Texte d'aide affiché en gris sous le champ. Ignoré si `error` est fourni. */
  hint?: string;
  /** Icône (lucide-react, 18px) à gauche dans le wrapper input. Pour signaler le type de donnée (Mail, Lock, etc.). */
  iconLeft?: React.ReactNode;
  /** Icône (lucide-react, 18px) à droite dans le wrapper input. Pour actions inline (clear, eye toggle, etc.). */
  iconRight?: React.ReactNode;
  /** Classes additionnelles sur le wrapper externe (le `<div>` qui contient label + input + hint/error). */
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const CyInput: React.FC<Props> = ({
  label,
  error,
  hint,
  iconLeft,
  iconRight,
  className = '',
  id,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const reactId = React.useId();
  const inputId = id || reactId;
  const hasError = Boolean(error);

  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--cy-space-2)',
    background: 'var(--cy-bg-code)',
    border: `1px solid ${hasError ? 'var(--cy-error)' : focused ? 'var(--cy-green-500)' : 'var(--cy-border)'}`,
    borderRadius: 'var(--cy-radius-lg)',
    padding: '0.75rem 1rem',
    boxShadow: focused && !hasError ? '0 0 0 3px rgb(var(--cy-green-500-rgb) / 0.30)' : 'none',
    transition: 'border-color var(--cy-transition-base), box-shadow var(--cy-transition-base)',
  };

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--cy-space-2)' }}>
      {label ? (
        <label
          htmlFor={inputId}
          style={{
            fontSize: 'var(--cy-text-sm)',
            color: 'var(--cy-text-secondary)',
            fontWeight: 500,
          }}
        >
          {label}
        </label>
      ) : null}
      <div style={wrapperStyle}>
        {iconLeft ? <span style={{ display: 'inline-flex', color: 'var(--cy-text-tertiary)' }}>{iconLeft}</span> : null}
        <input
          id={inputId}
          {...rest}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'var(--cy-text-primary)',
            fontSize: 'var(--cy-text-base)',
            fontFamily: 'var(--cy-font-body)',
          }}
        />
        {iconRight ? <span style={{ display: 'inline-flex', color: 'var(--cy-text-tertiary)' }}>{iconRight}</span> : null}
      </div>
      {hasError ? (
        <span style={{ fontSize: 'var(--cy-text-xs)', color: 'var(--cy-error)' }}>{error}</span>
      ) : hint ? (
        <span style={{ fontSize: 'var(--cy-text-xs)', color: 'var(--cy-text-tertiary)' }}>{hint}</span>
      ) : null}
    </div>
  );
};
