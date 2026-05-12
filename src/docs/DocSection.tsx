import React from 'react';

type Props = {
  id: string;
  title: string;
  first?: boolean;
  children: React.ReactNode;
};

export const DocSection: React.FC<Props> = ({ id, title, first = false, children }) => (
  <section id={id} style={{ scrollMarginTop: 80, marginTop: first ? 48 : 96 }}>
    <h2
      style={{
        fontFamily: 'var(--cy-font-heading)',
        fontWeight: 700,
        fontSize: 'var(--cy-text-3xl)',
        letterSpacing: 'var(--cy-tracking-tight)',
        color: 'var(--cy-text-primary)',
        marginBottom: 24,
      }}
    >
      {title}
    </h2>
    {children}
  </section>
);
