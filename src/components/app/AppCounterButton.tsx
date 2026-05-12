import * as React from 'react';
import { cn } from '@/lib/utils';

type Size = 'sm' | 'default' | 'lg';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  count: number | string;
  icon?: React.ReactNode;
  size?: Size;
};

const sizeClasses: Record<Size, string> = {
  // Sizes du Button shadcn fourni dans le prompt (à l'identique)
  default: 'h-9 px-4 py-2',
  sm: 'h-8 rounded-lg px-3 text-xs',
  lg: 'h-10 rounded-lg px-8',
};

/**
 * AppCounterButton — composant autonome (ne dépend pas d'AppButton).
 *
 * Style strictement identique au prompt shadcn fourni : variant `outline` +
 * sizes default/sm/lg. Toute évolution d'AppButton ne doit PAS impacter ce
 * composant.
 *
 *     <Button variant="outline">
 *       Messages
 *       <span className="-me-1 ms-3 inline-flex h-5 ...">18</span>
 *     </Button>
 */
export const AppCounterButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, children, count, icon, size = 'default', ...rest }, ref) => (
    <button
      ref={ref}
      className={cn(
        // Base shadcn (du prompt, à l'identique)
        'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        // Variant outline (du prompt, à l'identique)
        'border border-input bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground',
        // Size (du prompt, à l'identique)
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      {icon ? <span className="me-2 inline-flex">{icon}</span> : null}
      {children}
      <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground">
        {count}
      </span>
    </button>
  ),
);

AppCounterButton.displayName = 'AppCounterButton';
