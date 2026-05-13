import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cn } from '@/lib/utils';

/**
 * AppAlertDialog — modal de confirmation forcée basée sur Radix AlertDialog.
 *
 * Différences clés vs AppDialog :
 * - role="alertdialog" (annoncé comme alerte par les lecteurs d'écran)
 * - Pas de fermeture en cliquant sur l'overlay (interaction explicite obligatoire)
 * - Pas de bouton close en croix dans le header
 * - 2 boutons explicites : Cancel (action neutre) et Action (action confirmée)
 *
 * À utiliser pour : suppression, déconnexion, opération destructive, validation
 * critique. Pour les dialogues d'édition courants, utiliser AppDialog.
 *
 * Usage typique :
 *
 *     <AppAlertDialog>
 *       <AppAlertDialogTrigger asChild>
 *         <AppButton variant="destructive">Supprimer</AppButton>
 *       </AppAlertDialogTrigger>
 *       <AppAlertDialogContent>
 *         <AppAlertDialogHeader>
 *           <AppAlertDialogTitle>Supprimer cette tâche ?</AppAlertDialogTitle>
 *           <AppAlertDialogDescription>
 *             Cette action est définitive. La tâche et ses sous-tâches seront perdues.
 *           </AppAlertDialogDescription>
 *         </AppAlertDialogHeader>
 *         <AppAlertDialogFooter>
 *           <AppAlertDialogCancel asChild>
 *             <AppButton variant="outline">Annuler</AppButton>
 *           </AppAlertDialogCancel>
 *           <AppAlertDialogAction asChild>
 *             <AppButton variant="destructive">Supprimer</AppButton>
 *           </AppAlertDialogAction>
 *         </AppAlertDialogFooter>
 *       </AppAlertDialogContent>
 *     </AppAlertDialog>
 */

export const AppAlertDialog: React.FC<React.ComponentProps<typeof AlertDialogPrimitive.Root>> = (
  props,
) => <AlertDialogPrimitive.Root {...props} />;

export const AppAlertDialogTrigger: React.FC<
  React.ComponentProps<typeof AlertDialogPrimitive.Trigger>
> = (props) => <AlertDialogPrimitive.Trigger {...props} />;

export const AppAlertDialogPortal: React.FC<
  React.ComponentProps<typeof AlertDialogPrimitive.Portal>
> = (props) => <AlertDialogPrimitive.Portal {...props} />;

export const AppAlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-background/50 backdrop-blur',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
));
AppAlertDialogOverlay.displayName = 'AppAlertDialogOverlay';

export const AppAlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AppAlertDialogPortal>
    <AppAlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed top-1/2 left-1/2 z-50 w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background shadow-lg duration-200 sm:max-w-lg',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className,
      )}
      {...props}
    >
      {children}
    </AlertDialogPrimitive.Content>
  </AppAlertDialogPortal>
));
AppAlertDialogContent.displayName = 'AppAlertDialogContent';

export const AppAlertDialogHeader: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      'flex flex-col gap-2 rounded-t-lg border-b border-border bg-muted/30 p-4 text-center sm:text-left',
      className,
    )}
    {...props}
  />
);

export const AppAlertDialogBody: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...props
}) => <div className={cn('px-4 py-6', className)} {...props} />;

export const AppAlertDialogFooter: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      'flex flex-col-reverse gap-2 rounded-b-lg border-t border-border bg-muted/30 px-4 py-3 sm:flex-row sm:justify-end',
      className,
    )}
    {...props}
  />
);

export const AppAlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('font-heading text-lg font-medium leading-none', className)}
    {...props}
  />
));
AppAlertDialogTitle.displayName = 'AppAlertDialogTitle';

export const AppAlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
AppAlertDialogDescription.displayName = 'AppAlertDialogDescription';

export const AppAlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>((props, ref) => <AlertDialogPrimitive.Action ref={ref} {...props} />);
AppAlertDialogAction.displayName = 'AppAlertDialogAction';

export const AppAlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>((props, ref) => <AlertDialogPrimitive.Cancel ref={ref} {...props} />);
AppAlertDialogCancel.displayName = 'AppAlertDialogCancel';
