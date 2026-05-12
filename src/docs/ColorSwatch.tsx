import React from 'react';

type Props = {
  name: string;
  hex: string;
  height?: number;
};

export const ColorSwatch: React.FC<Props> = ({ name, hex, height = 80 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div
      style={{
        height,
        borderRadius: 'var(--cy-radius-lg)',
        background: hex,
        border: '1px solid var(--cy-border)',
      }}
    />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span
        style={{
          fontSize: 'var(--cy-text-xs)',
          fontWeight: 600,
          color: 'var(--cy-text-primary)',
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontSize: 'var(--cy-text-xs)',
          color: 'var(--cy-text-tertiary)',
          fontFamily: 'ui-monospace, monospace',
        }}
      >
        {hex}
      </span>
    </div>
  </div>
);
