import React, { useEffect, useState } from 'react';

type Item = { id: string; label: string };
type Group = { label: string; items: ReadonlyArray<Item> };

const GROUPS: ReadonlyArray<Group> = [
  {
    label: 'Fondations',
    items: [
      { id: 'colors', label: 'Couleurs' },
      { id: 'typography', label: 'Typographie' },
      { id: 'layout', label: 'Layout & Spacing' },
      { id: 'animations', label: 'Animations' },
      { id: 'zindex', label: 'Z-Index' },
    ],
  },
  {
    label: 'Composants',
    items: [
      { id: 'buttons', label: 'Boutons' },
      { id: 'components-core', label: 'Core (universel)' },
      { id: 'components-landing', label: 'Landing (marketing)' },
      { id: 'components-app', label: 'App (dashboard)' },
      { id: 'interactions', label: 'Interactions' },
    ],
  },
  {
    label: 'Brand & IA',
    items: [
      { id: 'brand', label: 'Brand' },
      { id: 'ai-guidelines', label: 'Guidelines IA' },
    ],
  },
];

const ALL_IDS: ReadonlyArray<string> = GROUPS.flatMap((g) => g.items.map((i) => i.id));

export const Sidebar: React.FC = () => {
  const [active, setActive] = useState<string>(ALL_IDS[0]!);

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
    ALL_IDS.forEach((id) => {
      const el = document.getElementById(id);
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
        {GROUPS.map((group, idx) => (
          <div key={group.label} style={{ marginTop: idx === 0 ? 0 : 24 }}>
            <SidebarGroupLabel label={group.label} />
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              {group.items.map((item) => (
                <SidebarItem key={item.id} id={item.id} label={item.label} active={item.id === active} />
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

const SidebarGroupLabel: React.FC<{ label: string }> = ({ label }) => (
  <div
    style={{
      padding: '0 16px',
      marginBottom: 8,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      fontFamily: 'var(--cy-font-body)',
      color: 'var(--cy-text-tertiary)',
    }}
  >
    {label}
  </div>
);

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
