import React, { useState } from 'react';

type Props = {
  label?: string;
  error?: string;
  hint?: string;
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
