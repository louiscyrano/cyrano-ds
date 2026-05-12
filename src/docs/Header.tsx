import React from 'react';
import { CyLogo } from '../components/core/CyLogo';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 32px',
        background: 'color-mix(in srgb, var(--cy-bg) 80%, transparent)',
        backdropFilter: 'var(--cy-blur-md)',
        WebkitBackdropFilter: 'var(--cy-blur-md)',
        borderBottom: '1px solid var(--cy-border)',
      }}
    >
      <CyLogo variant="long" theme="auto" size={28} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--cy-space-4)' }}>
        <a
          href="https://hellocyrano.com"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            fontSize: 'var(--cy-text-sm)',
            color: hovered ? 'var(--cy-green-500)' : 'var(--cy-text-secondary)',
            transition: 'color var(--cy-transition-base)',
            fontWeight: 500,
          }}
        >
          Retour au site
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
};
