import * as React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * AppPagination — wrapper sémantique pour les contrôles de pagination.
 * Composants strictement copiés du prompt shadcn fourni.
 *
 * Usage typique avec AppButton :
 *
 *     <AppPagination>
 *       <AppPaginationContent>
 *         <AppPaginationItem>
 *           <AppButton variant="ghost">
 *             <ChevronLeft /> Previous
 *           </AppButton>
 *         </AppPaginationItem>
 *         <AppPaginationItem>
 *           <AppButton variant="outline" size="icon">2</AppButton>
 *         </AppPaginationItem>
 *         <AppPaginationItem>
 *           <AppPaginationEllipsis />
 *         </AppPaginationItem>
 *         ...
 *       </AppPaginationContent>
 *     </AppPagination>
 */
export const AppPagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);

export const AppPaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
  ),
);
AppPaginationContent.displayName = 'AppPaginationContent';

export const AppPaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn(className)} {...props} />,
);
AppPaginationItem.displayName = 'AppPaginationItem';

export const AppPaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
