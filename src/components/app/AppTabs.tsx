import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

export type AppTabsVariant = 'default' | 'underline';

const TabsContext = React.createContext<AppTabsVariant>('default');

export const AppTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & { variant?: AppTabsVariant }
>(({ className, variant = 'default', ...props }, ref) => (
  <TabsContext.Provider value={variant}>
    <TabsPrimitive.Root
      ref={ref}
      className={cn('flex flex-col gap-2 data-[orientation=vertical]:flex-row', className)}
      {...props}
    />
  </TabsContext.Provider>
));
AppTabs.displayName = 'AppTabs';

export const AppTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(TabsContext);
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'inline-flex w-fit items-center text-muted-foreground',
        variant === 'default'
          ? 'gap-1 rounded-lg bg-muted p-1'
          : 'gap-2 border-b border-border',
        className,
      )}
      {...props}
    />
  );
});
AppTabsList.displayName = 'AppTabsList';

export const AppTabsTab = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(TabsContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'inline-flex h-8 cursor-pointer items-center justify-center whitespace-nowrap px-3 text-sm font-medium outline-none transition-all',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
        'disabled:pointer-events-none disabled:opacity-50',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
        variant === 'default'
          ? 'rounded-md text-muted-foreground hover:text-foreground data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm'
          : 'border-b-2 border-transparent text-muted-foreground hover:text-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground -mb-px',
        className,
      )}
      {...props}
    />
  );
});
AppTabsTab.displayName = 'AppTabsTab';

export const AppTabsPanel = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('flex-1 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md', className)}
    {...props}
  />
));
AppTabsPanel.displayName = 'AppTabsPanel';

// Aliases shadcn-friendly
export { AppTabsTab as AppTabsTrigger, AppTabsPanel as AppTabsContent };
