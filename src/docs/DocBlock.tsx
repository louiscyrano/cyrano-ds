import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export const DocBlock: React.FC<Props> = ({ children, className = '', style }) => (
  <div
    className={className}
    style={{
      background: 'var(--cy-bg-elevated)',
      border: '1px solid var(--cy-border)',
      borderRadius: 'var(--cy-radius-xl)',
      padding: 24,
      marginBottom: 16,
      ...style,
    }}
  >
    {children}
  </div>
);
