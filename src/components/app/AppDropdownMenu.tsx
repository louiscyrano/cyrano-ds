import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ChevronRight, ChevronLeft, Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ============================================================
   DRILL-DOWN CONTEXT — gère la navigation entre sub-pages
   ============================================================ */

type DrilldownCtx = {
  activePage: string;
  history: string[];
  navigate: (page: string) => void;
  goBack: () => void;
  menuHeight: number | null;
  setMenuHeight: (h: number) => void;
};

const DrilldownContext = React.createContext<DrilldownCtx | null>(null);

function useDrilldown() {
  const ctx = React.useContext(DrilldownContext);
  if (!ctx) throw new Error('Composant DropdownMenu requis comme parent');
  return ctx;
}

/* ============================================================
   ROOT — wraps Radix Root + provider drill-down
   ============================================================ */

export const AppDropdownMenu: React.FC<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>
> = ({ onOpenChange, ...props }) => {
  const [history, setHistory] = React.useState<string[]>(['main']);
  const activePage = history[history.length - 1] || 'main';
  const [menuHeight, setMenuHeight] = React.useState<number | null>(null);

  const navigate = React.useCallback((page: string) => {
    setHistory((prev) => (prev[prev.length - 1] === page ? prev : [...prev, page].slice(-10)));
  }, []);

  const goBack = React.useCallback(() => {
    setHistory((prev) => (prev.length <= 1 ? prev : prev.slice(0, -1)));
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setHistory(['main']);
      setMenuHeight(null);
    }
    onOpenChange?.(open);
  };

  return (
    <DrilldownContext.Provider value={{ activePage, history, navigate, goBack, menuHeight, setMenuHeight }}>
      <DropdownMenuPrimitive.Root onOpenChange={handleOpenChange} {...props} />
    </DrilldownContext.Provider>
  );
};

/* ============================================================
   TRIGGER
   ============================================================ */

export const AppDropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

/* ============================================================
   CONTENT — animation transform-origin + transition height (drill-down)
   ============================================================ */

export const AppDropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 8, children, style, ...props }, ref) => {
  const ctx = React.useContext(DrilldownContext);

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        style={{
          background: 'var(--cy-bg-elevated)',
          height: ctx?.menuHeight ? `${ctx.menuHeight}px` : 'auto',
          transition: ctx?.menuHeight
            ? 'height 350ms cubic-bezier(0.2, 0, 0, 1), opacity 200ms linear'
            : 'opacity 200ms linear',
          ...style,
        }}
        className={cn(
          'z-50 min-w-[12rem] overflow-hidden rounded-xl border border-border text-popover-foreground shadow-lg outline-none relative',
          'origin-[var(--radix-dropdown-menu-content-transform-origin)]',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          className,
        )}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
});
AppDropdownMenuContent.displayName = 'AppDropdownMenuContent';

/* ============================================================
   ITEM — base item, hauteur 40px, hover/focus muted
   ============================================================ */

const itemBaseClass = cn(
  'group relative flex cursor-pointer select-none items-center gap-3 px-4 min-h-10 text-sm font-medium tracking-[0.01em] outline-none transition-colors',
  'focus:bg-accent focus:text-accent-foreground',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
  '[&_svg]:pointer-events-none [&_svg:not([class*=size-])]:size-4 [&_svg:not([class*=text-])]:text-muted-foreground',
);

export const AppDropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(itemBaseClass, inset && 'pl-12', className)}
    {...props}
  />
));
AppDropdownMenuItem.displayName = 'AppDropdownMenuItem';

/* ============================================================
   CHECKBOX & RADIO ITEMS
   ============================================================ */

export const AppDropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(itemBaseClass, 'pl-10', className)}
    {...props}
  >
    <span className="absolute left-3 flex size-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="size-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
AppDropdownMenuCheckboxItem.displayName = 'AppDropdownMenuCheckboxItem';

export const AppDropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const AppDropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem ref={ref} className={cn(itemBaseClass, 'pl-10', className)} {...props}>
    <span className="absolute left-3 flex size-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="size-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
AppDropdownMenuRadioItem.displayName = 'AppDropdownMenuRadioItem';

/* ============================================================
   LABEL & SEPARATOR
   ============================================================ */

export const AppDropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'px-4 py-2 text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase',
      inset && 'pl-12',
      className,
    )}
    {...props}
  />
));
AppDropdownMenuLabel.displayName = 'AppDropdownMenuLabel';

export const AppDropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('h-px my-1 bg-gradient-to-r from-transparent via-border to-transparent', className)}
    {...props}
  />
));
AppDropdownMenuSeparator.displayName = 'AppDropdownMenuSeparator';

/* ============================================================
   DRILL-DOWN PAGES — sub-pages avec slide horizontal
   ============================================================ */

const DropdownMenuInternalBack: React.FC = () => {
  const ctx = useDrilldown();
  return (
    <AppDropdownMenuItem
      onSelect={(e) => {
        e.preventDefault();
        ctx.goBack();
      }}
    >
      <ChevronLeft className="size-4 text-foreground" />
      <span>Retour</span>
    </AppDropdownMenuItem>
  );
};

export const AppDropdownMenuPage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { id: string }
>(({ id, children, className, ...props }, ref) => {
  const ctx = useDrilldown();
  const { activePage, history, setMenuHeight } = ctx;
  const isActive = activePage === id;
  const isLeft = history.includes(id) && !isActive;

  const [pageNode, setPageNode] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (isActive && pageNode) {
      const observer = new ResizeObserver((entries) => {
        const h = entries[0].borderBoxSize?.[0]?.blockSize ?? entries[0].contentRect.height;
        setMenuHeight(h);
      });
      observer.observe(pageNode);
      return () => observer.disconnect();
    }
    return undefined;
  }, [isActive, pageNode, setMenuHeight]);

  return (
    <div
      ref={(node) => {
        setPageNode(node);
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={cn(
        'w-full absolute top-0 left-0 transition-all duration-[350ms] ease-[cubic-bezier(0.2,0,0,1)] py-1',
        isActive
          ? 'translate-x-0 opacity-100 pointer-events-auto'
          : isLeft
            ? '-translate-x-[20%] opacity-0 pointer-events-none'
            : 'translate-x-[20%] opacity-0 pointer-events-none',
        className,
      )}
      {...props}
    >
      {id !== 'main' && <DropdownMenuInternalBack />}
      {children}
    </div>
  );
});
AppDropdownMenuPage.displayName = 'AppDropdownMenuPage';

export const AppDropdownMenuPageTrigger = React.forwardRef<
  React.ElementRef<typeof AppDropdownMenuItem>,
  React.ComponentPropsWithoutRef<typeof AppDropdownMenuItem> & { targetId: string }
>(({ targetId, children, ...props }, ref) => {
  const ctx = useDrilldown();
  return (
    <AppDropdownMenuItem
      ref={ref}
      onSelect={(e) => {
        e.preventDefault();
        ctx.navigate(targetId);
      }}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto size-4 text-muted-foreground opacity-70" />
    </AppDropdownMenuItem>
  );
});
AppDropdownMenuPageTrigger.displayName = 'AppDropdownMenuPageTrigger';
