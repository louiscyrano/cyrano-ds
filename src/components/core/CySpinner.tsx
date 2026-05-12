import React from 'react';
import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  size?: number;
  className?: string;
};

/**
 * CySpinner — spinner basé sur l'icône `LoaderCircle` de Lucide + `animate-spin`.
 * Pattern shadcn standard. Hérite de `currentColor` — couleur Cyrano vert par défaut,
 * override possible via une classe `text-...` sur le parent ou en `className`.
 */
export const CySpinner: React.FC<Props> = ({ size = 32, className }) => (
  <LoaderCircle
    role="status"
    aria-label="Chargement"
    className={cn('animate-spin text-primary', className)}
    size={size}
    strokeWidth={2}
  />
);
