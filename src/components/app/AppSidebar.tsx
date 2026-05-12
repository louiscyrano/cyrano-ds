import * as React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ============================================================
   TYPES — toutes les data sont passées en props (pas de hardcoded)
   ============================================================ */

export type AppSidebarRailItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
};

export type AppSidebarSubItem = {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
};

export type AppSidebarItem = {
  icon?: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  children?: AppSidebarSubItem[];
};

export type AppSidebarSection = {
  title: string;
  items: AppSidebarItem[];
};

export type AppSidebarProps = {
  brand?: React.ReactNode;
  rail: AppSidebarRailItem[];
  activeId: string;
  onNavChange: (id: string) => void;
  bottomRail?: AppSidebarRailItem[];
  user?: React.ReactNode;
  panelTitle: string;
  sections: AppSidebarSection[];
  searchable?: boolean;
  defaultPanelCollapsed?: boolean;
  className?: string;
};

const easing = 'cubic-bezier(0.25, 1.1, 0.4, 1)';

/* ============================================================
   APP SIDEBAR — shell : rail icon + panel détail (configurable)
   ============================================================ */

export const AppSidebar: React.FC<AppSidebarProps> = ({
  brand,
  rail,
  activeId,
  onNavChange,
  bottomRail = [],
  user,
  panelTitle,
  sections,
  searchable = true,
  defaultPanelCollapsed = false,
  className,
}) => {
  const [collapsed, setCollapsed] = React.useState(defaultPanelCollapsed);
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());
  const [search, setSearch] = React.useState('');

  const toggleExpanded = (key: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  return (
    <div className={cn('flex flex-row bg-black text-neutral-50 rounded-2xl overflow-hidden', className)} data-theme="dark">
      {/* RAIL ICON GAUCHE */}
      <aside className="bg-black flex flex-col gap-2 items-center p-4 w-16 border-r border-neutral-800">
        {brand && <div className="mb-2 size-10 flex items-center justify-center">{brand}</div>}
        <nav className="flex flex-col gap-2 w-full items-center" aria-label="Navigation principale">
          {rail.map((item) => (
            <RailButton
              key={item.id}
              isActive={activeId === item.id}
              onClick={() => onNavChange(item.id)}
              label={item.label}
            >
              {item.icon}
            </RailButton>
          ))}
        </nav>
        <div className="flex-1" />
        {bottomRail.length > 0 && (
          <div className="flex flex-col gap-2 w-full items-center">
            {bottomRail.map((item) => (
              <RailButton
                key={item.id}
                isActive={activeId === item.id}
                onClick={() => onNavChange(item.id)}
                label={item.label}
              >
                {item.icon}
              </RailButton>
            ))}
          </div>
        )}
      </aside>

      {/* PANEL DÉTAIL */}
      <aside
        className={cn(
          'bg-black flex flex-col gap-4 p-4 transition-all duration-500',
          collapsed ? 'w-16 items-center !px-0' : 'w-72 items-start',
        )}
        style={{ transitionTimingFunction: easing }}
      >
        {/* Header collapse toggle */}
        <div className="w-full">
          {collapsed ? (
            <div className="w-full flex justify-center">
              <button
                type="button"
                onClick={() => setCollapsed(false)}
                aria-label="Étendre le panneau"
                className="flex size-10 items-center justify-center rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-neutral-50 transition-colors"
              >
                <ChevronDown size={16} className="rotate-180" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <h2 className="px-2 py-1 font-heading text-lg font-semibold text-neutral-50">{panelTitle}</h2>
              <button
                type="button"
                onClick={() => setCollapsed(true)}
                aria-label="Réduire le panneau"
                className="flex size-10 items-center justify-center rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-neutral-50 transition-colors"
              >
                <ChevronDown size={16} className="-rotate-90" />
              </button>
            </div>
          )}
        </div>

        {/* Search */}
        {searchable && (
          <div
            className={cn(
              'transition-all duration-500',
              collapsed ? 'w-full flex justify-center' : 'w-full',
            )}
            style={{ transitionTimingFunction: easing }}
          >
            <div
              className={cn(
                'bg-black h-10 rounded-lg flex items-center border border-neutral-800 transition-all duration-500',
                collapsed ? 'w-10 justify-center' : 'w-full',
              )}
              style={{ transitionTimingFunction: easing }}
            >
              <div className="flex size-10 items-center justify-center shrink-0 text-neutral-400">
                <Search size={16} />
              </div>
              {!collapsed && (
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-neutral-50 placeholder:text-neutral-500 pr-3"
                />
              )}
            </div>
          </div>
        )}

        {/* Sections */}
        <div
          className={cn(
            'flex flex-col w-full overflow-y-auto transition-all duration-500',
            collapsed ? 'gap-2 items-center' : 'gap-4 items-start',
          )}
          style={{ transitionTimingFunction: easing }}
        >
          {sections.map((section, sectionIdx) => (
            <SectionBlock
              key={`${section.title}-${sectionIdx}`}
              section={section}
              collapsed={collapsed}
              expanded={expanded}
              onToggleExpanded={toggleExpanded}
            />
          ))}
        </div>

        {/* User slot */}
        {!collapsed && user && (
          <div className="w-full mt-auto pt-2 border-t border-neutral-800">
            {user}
          </div>
        )}
      </aside>
    </div>
  );
};

/* ============================================================
   SOUS-COMPOSANTS INTERNES
   ============================================================ */

const RailButton: React.FC<{
  isActive?: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}> = ({ isActive, onClick, label, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      'flex size-10 items-center justify-center rounded-lg transition-colors duration-300',
      isActive
        ? 'bg-neutral-800 text-neutral-50'
        : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-50',
    )}
  >
    {children}
  </button>
);

const SectionBlock: React.FC<{
  section: AppSidebarSection;
  collapsed: boolean;
  expanded: Set<string>;
  onToggleExpanded: (key: string) => void;
}> = ({ section, collapsed, expanded, onToggleExpanded }) => (
  <div className="flex flex-col w-full">
    {!collapsed && (
      <div className="flex items-center h-10 px-4">
        <span className="text-sm text-neutral-400">{section.title}</span>
      </div>
    )}
    {section.items.map((item, itemIdx) => {
      const itemKey = `${section.title}-${itemIdx}`;
      const isExpanded = expanded.has(itemKey);
      return (
        <div key={itemKey} className="w-full flex flex-col">
          <ItemRow
            item={item}
            collapsed={collapsed}
            isExpanded={isExpanded}
            onToggle={() => (item.children ? onToggleExpanded(itemKey) : item.onClick?.())}
          />
          {isExpanded && item.children && !collapsed && (
            <div className="flex flex-col gap-1 mb-2">
              {item.children.map((child, childIdx) => (
                <SubItemRow key={`${itemKey}-${childIdx}`} item={child} />
              ))}
            </div>
          )}
        </div>
      );
    })}
  </div>
);

const ItemRow: React.FC<{
  item: AppSidebarItem;
  collapsed: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ item, collapsed, isExpanded, onToggle }) => (
  <div
    className={cn(
      'transition-all duration-500',
      collapsed ? 'w-full flex justify-center' : 'w-full',
    )}
    style={{ transitionTimingFunction: easing }}
  >
    <button
      type="button"
      onClick={onToggle}
      title={collapsed ? item.label : undefined}
      className={cn(
        'rounded-lg cursor-pointer flex items-center relative transition-colors',
        item.isActive ? 'bg-neutral-800' : 'hover:bg-neutral-800',
        collapsed ? 'size-10 justify-center' : 'w-full h-10 px-4 py-2',
      )}
    >
      {item.icon && <span className="flex items-center justify-center shrink-0">{item.icon}</span>}
      {!collapsed && (
        <span className="flex-1 ml-3 truncate text-sm text-neutral-50 text-left">{item.label}</span>
      )}
      {!collapsed && item.children && (
        <ChevronDown
          size={16}
          className="ml-2 text-neutral-50 transition-transform duration-300"
          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      )}
    </button>
  </div>
);

const SubItemRow: React.FC<{ item: AppSidebarSubItem }> = ({ item }) => (
  <div className="w-full pl-9 pr-1">
    <button
      type="button"
      onClick={item.onClick}
      className="h-9 w-full rounded-lg cursor-pointer transition-colors hover:bg-neutral-800 flex items-center px-3 text-left"
    >
      {item.icon && <span className="mr-2 flex items-center">{item.icon}</span>}
      <span className="flex-1 truncate text-sm text-neutral-400">{item.label}</span>
    </button>
  </div>
);
