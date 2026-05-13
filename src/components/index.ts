// DEPRECATED — ne pas importer depuis ce barrel global.
//
// Discipline DS Cyrano : importer explicitement depuis l'une des trois couches.
//
//   Universel (toutes surfaces)        : import { CyButton } from '@/components/core';
//   Landing / site marketing           : import { CyCtaBanner } from '@/components/landing';
//   App / dashboard interne            : import { AppButton } from '@/components/app';
//
// Dépendances autorisées :
//   - landing/ peut importer depuis core/
//   - app/     peut importer depuis core/
//   - core/    ne doit JAMAIS importer depuis landing/ ou app/ (cycle interdit)
//   - app/     ne doit pas importer depuis landing/ (séparation préoccupations)
//
// Ce barrel reste exporté pour back-compat. Sera supprimé dans une version future.
export * from './core';
export * from './landing';
export * from './app';
