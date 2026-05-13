import React, { useEffect, useState } from 'react';

type TocItem = { id: string; label: string };
type TocGroup = { label: string; items: ReadonlyArray<TocItem> };
type TocSection = { label: string; groups?: ReadonlyArray<TocGroup>; items?: ReadonlyArray<TocItem> };

const slug = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const SECTIONS: ReadonlyArray<TocSection> = [
  {
    label: 'Core (universel)',
    items: [
      { id: slug('Cards'), label: 'Cards' },
      { id: slug('Badges & Tags'), label: 'Badges & Tags' },
      { id: slug('Inputs & Formulaires'), label: 'Inputs & Form' },
      { id: slug('Messages de statut'), label: 'Status' },
      { id: slug('Spinner / Loading'), label: 'Spinner' },
      { id: slug('Menu toggle'), label: 'Menu toggle' },
      { id: slug('Live dot'), label: 'Live dot' },
      { id: slug('Gradient text'), label: 'Gradient text' },
      { id: slug('Scroll hint'), label: 'Scroll hint' },
      { id: slug('Reveal on scroll'), label: 'Reveal' },
    ],
  },
  {
    label: 'Landing (marketing)',
    items: [
      { id: slug('Background shader'), label: 'Shader bg' },
      { id: slug('Aurora background'), label: 'Aurora bg' },
      { id: slug('Roadmap strip'), label: 'Roadmap strip' },
      { id: slug('CTA banner'), label: 'CTA banner' },
      { id: slug('Secondary page hero'), label: 'Secondary hero' },
    ],
  },
  {
    label: 'App (dashboard)',
    groups: [
      {
        label: 'Actions',
        items: [
          { id: slug('AppButton'), label: 'AppButton' },
          { id: slug('Counter button'), label: 'Counter button' },
          { id: slug('DropdownMenu'), label: 'DropdownMenu' },
        ],
      },
      {
        label: 'Saisie & sélection',
        items: [
          { id: slug('Checkbox'), label: 'Checkbox' },
          { id: slug('Select'), label: 'Select' },
          { id: slug('Combobox'), label: 'Combobox' },
          { id: slug('Toggle'), label: 'Toggle' },
          { id: slug('EditableChip'), label: 'EditableChip' },
        ],
      },
      {
        label: 'Navigation',
        items: [
          { id: slug('Tabs'), label: 'Tabs' },
          { id: slug('Pagination'), label: 'Pagination' },
          { id: slug('DataTable'), label: 'DataTable' },
          { id: slug('Avatar'), label: 'Avatar' },
          { id: slug('Sidebar nav'), label: 'Sidebar nav' },
        ],
      },
      {
        label: 'Feedback',
        items: [{ id: slug('Skeleton'), label: 'Skeleton' }],
      },
      {
        label: 'Overlays',
        items: [
          { id: slug('Tooltip'), label: 'Tooltip' },
          { id: slug('Popover'), label: 'Popover' },
          { id: slug('Sheet'), label: 'Sheet' },
          { id: slug('Dialog'), label: 'Dialog' },
          { id: slug('AlertDialog'), label: 'AlertDialog' },
          { id: slug('Toast'), label: 'Toast' },
        ],
      },
    ],
  },
];

const ALL_IDS: ReadonlyArray<string> = SECTIONS.flatMap((section) => {
  if (section.items) return section.items.map((i) => i.id);
  if (section.groups) return section.groups.flatMap((g) => g.items.map((i) => i.id));
  return [];
});

export const ComponentToc: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

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
      className="cy-component-toc"
      style={{
        width: 200,
        flexShrink: 0,
        position: 'sticky',
        top: 64,
        alignSelf: 'flex-start',
        height: 'calc(100vh - 64px)',
        overflowY: 'auto',
        padding: '32px 16px',
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontFamily: 'var(--cy-font-body)',
          color: 'var(--cy-text-tertiary)',
          marginBottom: 16,
        }}
      >
        Composants
      </div>
      {SECTIONS.map((section) => (
        <div key={section.label} style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 'var(--cy-text-sm)',
              fontWeight: 600,
              color: 'var(--cy-text-primary)',
              marginBottom: 8,
              padding: '0 8px',
            }}
          >
            {section.label}
          </div>
          {section.items ? <TocList items={section.items} active={active} /> : null}
          {section.groups
            ? section.groups.map((group) => (
                <div key={group.label} style={{ marginTop: 10 }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--cy-text-tertiary)',
                      marginBottom: 4,
                      padding: '0 8px',
                    }}
                  >
                    {group.label}
                  </div>
                  <TocList items={group.items} active={active} />
                </div>
              ))
            : null}
        </div>
      ))}
    </aside>
  );
};

const TocList: React.FC<{ items: ReadonlyArray<TocItem>; active: string | null }> = ({ items, active }) => (
  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
    {items.map((item) => (
      <TocLink key={item.id} item={item} active={active === item.id} />
    ))}
  </ul>
);

const TocLink: React.FC<{ item: TocItem; active: boolean }> = ({ item, active }) => {
  const [hovered, setHovered] = useState(false);
  const color = active
    ? 'var(--cy-green-500)'
    : hovered
      ? 'var(--cy-text-primary)'
      : 'var(--cy-text-secondary)';
  const borderColor = active ? 'var(--cy-green-500)' : 'transparent';

  return (
    <li>
      <a
        href={`#${item.id}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'block',
          padding: '4px 8px',
          fontSize: 'var(--cy-text-sm)',
          fontWeight: active ? 600 : 400,
          fontFamily: 'var(--cy-font-body)',
          color,
          borderLeft: `2px solid ${borderColor}`,
          transition: 'color var(--cy-transition-base), border-color var(--cy-transition-base)',
        }}
      >
        {item.label}
      </a>
    </li>
  );
};
