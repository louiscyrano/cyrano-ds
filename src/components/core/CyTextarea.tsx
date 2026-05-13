import React, { useState } from 'react';

type Props = {
  /** Label affiché au-dessus du champ. Lié au textarea via htmlFor automatique. Omettre pour un textarea sans label visible. */
  label?: string;
  /** Message d'erreur affiché en rouge sous le champ. Sa présence active l'état visuel d'erreur (border rouge, focus ring rouge). */
  error?: string;
  /** Texte d'aide affiché en gris sous le champ. Ignoré si `error` est fourni. */
  hint?: string;
  /** Classes additionnelles sur le wrapper externe (le `<div>` qui contient label + textarea + hint/error). */
  className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const CyTextarea: React.FC<Props> = ({
  label,
  error,
  hint,
  className = '',
  id,
  rows = 4,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const reactId = React.useId();
  const fieldId = id || reactId;
  const hasError = Boolean(error);

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--cy-space-2)' }}>
      {label ? (
        <label
          htmlFor={fieldId}
          style={{
            fontSize: 'var(--cy-text-sm)',
            color: 'var(--cy-text-secondary)',
            fontWeight: 500,
          }}
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={fieldId}
        rows={rows}
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
          background: 'var(--cy-bg-code)',
          border: `1px solid ${hasError ? 'var(--cy-error)' : focused ? 'var(--cy-green-500)' : 'var(--cy-border)'}`,
          borderRadius: 'var(--cy-radius-lg)',
          padding: '0.75rem 1rem',
          color: 'var(--cy-text-primary)',
          fontSize: 'var(--cy-text-base)',
          fontFamily: 'var(--cy-font-body)',
          outline: 'none',
          resize: 'vertical',
          boxShadow: focused && !hasError ? '0 0 0 3px rgb(var(--cy-green-500-rgb) / 0.30)' : 'none',
          transition: 'border-color var(--cy-transition-base), box-shadow var(--cy-transition-base)',
        }}
      />
      {hasError ? (
        <span style={{ fontSize: 'var(--cy-text-xs)', color: 'var(--cy-error)' }}>{error}</span>
      ) : hint ? (
        <span style={{ fontSize: 'var(--cy-text-xs)', color: 'var(--cy-text-tertiary)' }}>{hint}</span>
      ) : null}
    </div>
  );
};
