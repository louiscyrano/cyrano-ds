import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const appButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Repos : tel quel (green-500). Hover : bg assombri 2 crans (green-700), bordures non touchées.
        default:
          'bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-green-700',
        // Repos : bg assombri 2 crans (red-700, #b91c1c). Hover : bg éclairci (retour red-500).
        destructive:
          'bg-[#b91c1c] text-destructive-foreground shadow-sm shadow-black/5 hover:bg-destructive',
        // Outline (du prompt, inchangé) : hover bg-accent + text-accent-foreground.
        outline:
          'border border-input bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground',
        // Repos : tel quel + border transparente (placeholder). Hover : border verte, bg inchangé.
        secondary:
          'border border-transparent bg-secondary text-secondary-foreground shadow-sm shadow-black/5 hover:border-primary',
        // Ghost (du prompt, inchangé) : hover bg-accent.
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        // Repos : couleur foreground (neutre). Hover : passe en green-500 (text-primary).
        link: 'text-foreground underline-offset-4 hover:text-primary',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-lg px-3 text-xs',
        lg: 'h-10 rounded-lg px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof appButtonVariants> {
  asChild?: boolean;
}

const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(appButtonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
AppButton.displayName = 'AppButton';

export { AppButton, appButtonVariants };
