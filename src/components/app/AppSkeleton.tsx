import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * AppSkeleton — placeholder de chargement minimaliste.
 *
 * Un `<div>` avec `animate-pulse` (opacity 1 ↔ 0.5 natif Tailwind) et un fond
 * gris muted adaptatif au theme. Les dimensions et la forme sont passées via
 * `className` — pas de variants circle/text/button. La composition Tailwind
 * est plus explicite et plus flexible.
 *
 *     // Avatar
 *     <AppSkeleton className="h-10 w-10 rounded-full" />
 *
 *     // Ligne de texte
 *     <AppSkeleton className="h-4 w-32" />
 *
 *     // Bloc image
 *     <AppSkeleton className="h-32 w-full" />
 */
export const AppSkeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn('animate-pulse rounded-lg bg-muted', className)} {...props} />;
