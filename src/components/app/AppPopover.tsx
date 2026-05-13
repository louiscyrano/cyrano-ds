import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';

/**
 * AppPopover — surface flottante ancrée à un trigger, basée sur Radix Popover.
 *
 * À utiliser pour : filtres contextuels, mini-formulaires, date pickers, color
 * pickers, contenu secondaire qui n'a pas besoin d'un Dialog complet. Pour un
 * texte court d'aide, préférer Tooltip. Pour un menu d'actions, préférer
 * DropdownMenu.
 *
 * Le contenu est portalé et peut être placé sur 4 axes (top/right/bottom/left)
 * avec offset configurable. Se ferme au clic outside, à Escape, ou via close
 * programmatique.
 *
 * Usage typique :
 *
 *     <AppPopover>
 *       <AppPopoverTrigger asChild>
 *         <AppButton variant="outline">Filtrer</AppButton>
 *       </AppPopoverTrigger>
 *       <AppPopoverContent>
 *         <div className="flex flex-col gap-2">
 *           <label className="flex items-center gap-2">
 *             <AppCheckbox /> Actives uniquement
 *           </label>
 *         </div>
 *       </AppPopoverContent>
 *     </AppPopover>
 */

export const AppPopover: React.FC<React.ComponentProps<typeof PopoverPrimitive.Root>> = (props) => (
  <PopoverPrimitive.Root {...props} />
);

export const AppPopoverTrigger: React.FC<
  React.ComponentProps<typeof PopoverPrimitive.Trigger>
> = (props) => <PopoverPrimitive.Trigger {...props} />;

export const AppPopoverAnchor: React.FC<
  React.ComponentProps<typeof PopoverPrimitive.Anchor>
> = (props) => <PopoverPrimitive.Anchor {...props} />;

export const AppPopoverClose: React.FC<
  React.ComponentProps<typeof PopoverPrimitive.Close>
> = (props) => <PopoverPrimitive.Close {...props} />;

export const AppPopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 8, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-72 rounded-lg border border-border bg-background p-4 shadow-lg outline-none',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
AppPopoverContent.displayName = 'AppPopoverContent';
