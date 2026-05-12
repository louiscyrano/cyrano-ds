import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * AppDialog — composant modal basé sur Radix Dialog.
 * Pour formulaires d'édition rapide, confirmations, dialogues de saisie.
 *
 * Usage typique :
 *
 *     <AppDialog>
 *       <AppDialogTrigger asChild>
 *         <AppButton variant="outline">Modifier</AppButton>
 *       </AppDialogTrigger>
 *       <AppDialogContent>
 *         <AppDialogHeader>
 *           <AppDialogTitle>Modifier le profil</AppDialogTitle>
 *           <AppDialogDescription>Met à jour ton nom et ton email.</AppDialogDescription>
 *         </AppDialogHeader>
 *         <AppDialogBody>
 *           <CyInput label="Nom" />
 *         </AppDialogBody>
 *         <AppDialogFooter>
 *           <AppDialogClose asChild>
 *             <AppButton variant="outline">Annuler</AppButton>
 *           </AppDialogClose>
 *           <AppButton>Enregistrer</AppButton>
 *         </AppDialogFooter>
 *       </AppDialogContent>
 *     </AppDialog>
 */

export const AppDialog: React.FC<React.ComponentProps<typeof DialogPrimitive.Root>> = (props) => (
  <DialogPrimitive.Root {...props} />
);

export const AppDialogTrigger: React.FC<React.ComponentProps<typeof DialogPrimitive.Trigger>> = (
  props,
) => <DialogPrimitive.Trigger {...props} />;

export const AppDialogPortal: React.FC<React.ComponentProps<typeof DialogPrimitive.Portal>> = (
  props,
) => <DialogPrimitive.Portal {...props} />;

export const AppDialogClose: React.FC<React.ComponentProps<typeof DialogPrimitive.Close>> = (
  props,
) => <DialogPrimitive.Close {...props} />;

export const AppDialogOverlay = React.forwardRef<
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
AppDialogOverlay.displayName = 'AppDialogOverlay';

export const AppDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AppDialogPortal>
    <AppDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed top-1/2 left-1/2 z-50 w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background shadow-lg duration-200 sm:max-w-lg',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </AppDialogPortal>
));
AppDialogContent.displayName = 'AppDialogContent';

export const AppDialogBody: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div className={cn('px-4 py-6', className)} {...props} />
);

type DialogHeaderProps = React.ComponentProps<'div'> & {
  hideCloseButton?: boolean;
};

export const AppDialogHeader: React.FC<DialogHeaderProps> = ({
  className,
  children,
  hideCloseButton = false,
  ...props
}) => (
  <div
    className={cn(
      'relative flex flex-col gap-2 rounded-t-lg border-b border-border bg-muted/30 p-4 text-center sm:text-left',
      className,
    )}
    {...props}
  >
    {children}
    {!hideCloseButton && (
      <DialogPrimitive.Close
        className="absolute top-4 right-4 inline-flex size-7 items-center justify-center rounded-full opacity-80 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4"
        aria-label="Fermer"
      >
        <X />
      </DialogPrimitive.Close>
    )}
  </div>
);

export const AppDialogFooter: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div
    className={cn(
      'flex flex-col gap-2 rounded-b-lg border-t border-border bg-muted/30 px-4 py-3 sm:flex-row sm:justify-end',
      className,
    )}
    {...props}
  />
);

export const AppDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('font-heading text-lg font-medium leading-none', className)}
    {...props}
  />
));
AppDialogTitle.displayName = 'AppDialogTitle';

export const AppDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
AppDialogDescription.displayName = 'AppDialogDescription';
