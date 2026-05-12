import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils';

/**
 * AppAvatar — wrapper Radix Avatar.
 * Image avec fallback (initiales / texte) en cas d'erreur de chargement.
 *
 *     <AppAvatar>
 *       <AppAvatarImage src="..." alt="Louis" />
 *       <AppAvatarFallback>LO</AppAvatarFallback>
 *     </AppAvatar>
 */

export const AppAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
    {...props}
  />
));
AppAvatar.displayName = 'AppAvatar';

export const AppAvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
));
AppAvatarImage.displayName = 'AppAvatarImage';

export const AppAvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-[inherit] bg-secondary text-xs font-medium',
      className,
    )}
    {...props}
  />
));
AppAvatarFallback.displayName = 'AppAvatarFallback';
