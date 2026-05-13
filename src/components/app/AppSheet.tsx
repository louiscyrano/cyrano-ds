import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * AppSheet — panneau coulissant ancré à un bord de l'écran, basé sur Radix Dialog.
 *
 * À utiliser pour : drawer mobile, panneau de détail latéral (clic sur une row de
 * DataTable), filtres avancés, navigation secondaire mobile. Pour un dialog
 * centré, utiliser AppDialog. Pour un menu d'actions, utiliser DropdownMenu.
 *
 * 4 sides supportés : right (défaut, panneau de détail), left (nav secondaire),
 * top (filtres), bottom (action sheet mobile).
 *
 * Usage typique :
 *
 *     <AppSheet>
 *       <AppSheetTrigger asChild>
 *         <AppButton variant="outline">Voir détails</AppButton>
 *       </AppSheetTrigger>
 *       <AppSheetContent side="right">
 *         <AppSheetHeader>
 *           <AppSheetTitle>Détails de la tâche</AppSheetTitle>
 *           <AppSheetDescription>Refactor du flux d'auth.</AppSheetDescription>
 *         </AppSheetHeader>
 *         <AppSheetBody>...</AppSheetBody>
 *         <AppSheetFooter>
 *           <AppSheetClose asChild>
 *             <AppButton variant="outline">Fermer</AppButton>
 *           </AppSheetClose>
 *         </AppSheetFooter>
 *       </AppSheetContent>
 *     </AppSheet>
 */

export const AppSheet: React.FC<React.ComponentProps<typeof DialogPrimitive.Root>> = (props) => (
  <DialogPrimitive.Root {...props} />
);

export const AppSheetTrigger: React.FC<React.ComponentProps<typeof DialogPrimitive.Trigger>> = (
  props,
) => <DialogPrimitive.Trigger {...props} />;

export const AppSheetClose: React.FC<React.ComponentProps<typeof DialogPrimitive.Close>> = (
  props,
) => <DialogPrimitive.Close {...props} />;

export const AppSheetPortal: React.FC<React.ComponentProps<typeof DialogPrimitive.Portal>> = (
  props,
) => <DialogPrimitive.Portal {...props} />;

export const AppSheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-background/50 backdrop-blur',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
));
AppSheetOverlay.displayName = 'AppSheetOverlay';

const sheetVariants = cva(
  'fixed z-50 flex flex-col gap-0 border-border bg-background shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
      },
    },
    defaultVariants: { side: 'right' },
  },
);

type AppSheetContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
  VariantProps<typeof sheetVariants> & {
    /** Masque la croix close en haut à droite. Pour les sheets avec confirmation explicite (Cancel/Save) où la fermeture silencieuse n'est pas souhaitée. Défaut `false`. */
    hideCloseButton?: boolean;
    /** Bord d'ancrage du panneau. `right` (défaut, panneau de détail), `left` (nav secondaire), `top` (filtres), `bottom` (action sheet mobile). Détermine l'animation slide. */
    side?: VariantProps<typeof sheetVariants>['side'];
  };

export const AppSheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  AppSheetContentProps
>(({ className, children, side = 'right', hideCloseButton = false, ...props }, ref) => (
  <AppSheetPortal>
    <AppSheetOverlay />
    <DialogPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
      {children}
      {!hideCloseButton && (
        <DialogPrimitive.Close
          className="absolute top-4 right-4 inline-flex size-7 items-center justify-center rounded-full opacity-80 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4"
          aria-label="Fermer"
        >
          <X />
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </AppSheetPortal>
));
AppSheetContent.displayName = 'AppSheetContent';

export const AppSheetHeader: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div
    className={cn(
      'flex flex-col gap-2 border-b border-border bg-muted/30 p-4 text-left',
      className,
    )}
    {...props}
  />
);

export const AppSheetBody: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div className={cn('flex-1 overflow-y-auto px-4 py-6', className)} {...props} />
);

export const AppSheetFooter: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div
    className={cn(
      'flex flex-col-reverse gap-2 border-t border-border bg-muted/30 px-4 py-3 sm:flex-row sm:justify-end',
      className,
    )}
    {...props}
  />
);

export const AppSheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('font-heading text-lg font-medium leading-none', className)}
    {...props}
  />
));
AppSheetTitle.displayName = 'AppSheetTitle';

export const AppSheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
AppSheetDescription.displayName = 'AppSheetDescription';
