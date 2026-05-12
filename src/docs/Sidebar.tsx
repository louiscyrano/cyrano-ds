import React, { useEffect, useState } from 'react';

const ITEMS: ReadonlyArray<{ id: string; label: string }> = [
  { id: 'colors', label: 'Couleurs' },
  { id: 'typography', label: 'Typographie' },
  { id: 'buttons', label: 'Boutons' },
  { id: 'animations', label: 'Animations' },
  { id: 'components-core', label: 'Composants core' },
  { id: 'components-app', label: 'Composants app' },
  { id: 'layout', label: 'Layout & Spacing' },
  { id: 'interactions', label: 'Interactions' },
  { id: 'zindex', label: 'Z-Index' },
  { id: 'brand', label: 'Brand' },
  { id: 'ai-guidelines', label: 'Guidelines IA' },
];

export const Sidebar: React.FC = () => {
  const [active, setActive] = useState<string>(ITEMS[0]!.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: [0, 0.3, 0.6] },
    );
    ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      style={{
        width: 220,
        flexShrink: 0,
        position: 'sticky',
        top: 64,
        height: 'calc(100vh - 64px)',
        overflowY: 'auto',
        padding: '32px 16px',
        background: 'var(--cy-bg)',
        borderRight: '1px solid var(--cy-border-subtle)',
      }}
    >
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {ITEMS.map((item) => (
            <SidebarItem key={item.id} id={item.id} label={item.label} active={item.id === active} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

const SidebarItem: React.FC<{ id: string; label: string; active: boolean }> = ({ id, label, active }) => {
  const [hovered, setHovered] = useState(false);

  let background = 'transparent';
  let color: string = 'var(--cy-text-secondary)';
  if (active) {
    background = 'rgb(5 211 126 / 0.15)';
    color = 'var(--cy-green-500)';
  } else if (hovered) {
    background = 'var(--cy-bg-muted)';
    color = 'var(--cy-text-primary)';
  }

  return (
    <li>
      <a
        href={`#${id}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'block',
          padding: '8px 16px',
          fontSize: 'var(--cy-text-sm)',
          fontWeight: 500,
          fontFamily: 'var(--cy-font-body)',
          borderRadius: 'var(--cy-radius-lg)',
          color,
          background,
          transition: 'color var(--cy-transition-base), background var(--cy-transition-base)',
        }}
      >
        {label}
      </a>
    </li>
  );
};
