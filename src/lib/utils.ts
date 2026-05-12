import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes — déduplique les conflits (ex: "px-2 px-4" → "px-4").
 * Utilisé par les composants de la couche app/ qui suivent la convention shadcn.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
