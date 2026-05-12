import React from 'react';

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export const DocSubSection: React.FC<Props> = ({ title, description, children }) => (
  <div style={{ marginTop: 48 }}>
    <h3
      style={{
        fontFamily: 'var(--cy-font-heading)',
        fontWeight: 600,
        fontSize: 'var(--cy-text-lg)',
        color: 'var(--cy-text-accent)',
        marginBottom: 12,
      }}
    >
      {title}
    </h3>
    {description ? (
      <p
        style={{
          fontFamily: 'var(--cy-font-body)',
          fontWeight: 400,
          fontSize: 'var(--cy-text-sm)',
          color: 'var(--cy-text-secondary)',
          lineHeight: 1.6,
          marginBottom: 20,
          maxWidth: 680,
        }}
      >
        {description}
      </p>
    ) : null}
    {children}
  </div>
);
