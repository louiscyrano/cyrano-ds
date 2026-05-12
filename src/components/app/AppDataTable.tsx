import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  AppTable,
  AppTableHeader,
  AppTableBody,
  AppTableRow,
  AppTableHead,
  AppTableCell,
} from './AppTable';

/**
 * AppDataTable — table de données générique avec animation row-by-row,
 * support de colonnes configurables (label + render custom), visibilité
 * dynamique des colonnes, et message vide.
 *
 * Usage :
 *
 *     type Lead = { id: string; name: string; email: string; status: string };
 *
 *     const columns: ColumnDef<Lead>[] = [
 *       { key: 'name', label: 'Nom' },
 *       { key: 'email', label: 'Email' },
 *       { key: 'status', label: 'Statut',
 *         render: (row) => <CyBadge variant="success">{row.status}</CyBadge>
 *       },
 *     ];
 *
 *     <AppDataTable data={leads} columns={columns} />
 */

export type ColumnDef<TData> = {
  key: string;
  label: string;
  /**
   * Render personnalisé pour la cellule. Si absent, affiche `row[key]` tel quel.
   */
  render?: (row: TData, index: number) => React.ReactNode;
  /**
   * Classes Tailwind appliquées au <td> de cette colonne.
   */
  cellClassName?: string;
  /**
   * Classes Tailwind appliquées au <th> de cette colonne.
   */
  headClassName?: string;
};

export interface AppDataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  /**
   * Si fourni, ne rend que les colonnes dont la `key` est dans le Set.
   * Sinon, rend toutes les colonnes.
   */
  visibleColumns?: Set<string>;
  /**
   * Message affiché quand `data` est vide.
   */
  emptyMessage?: string;
  /**
   * Désactive l'animation framer-motion d'entrée des rows.
   */
  disableRowAnimation?: boolean;
  className?: string;
}

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.25,
      ease: 'easeOut' as const,
    },
  }),
};

export function AppDataTable<TData>({
  data,
  columns,
  visibleColumns,
  emptyMessage = 'Aucun résultat.',
  disableRowAnimation = false,
  className,
}: AppDataTableProps<TData>) {
  const cols = visibleColumns ? columns.filter((c) => visibleColumns.has(c.key)) : columns;

  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-card text-card-foreground shadow-sm',
        className,
      )}
    >
      <AppTable>
        <AppTableHeader>
          <AppTableRow>
            {cols.map((col) => (
              <AppTableHead key={col.key} className={col.headClassName}>
                {col.label}
              </AppTableHead>
            ))}
          </AppTableRow>
        </AppTableHeader>
        <AppTableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => {
              const cellsContent = cols.map((col) => (
                <AppTableCell key={col.key} className={col.cellClassName}>
                  {col.render
                    ? col.render(row, rowIndex)
                    : ((row as Record<string, unknown>)[col.key] as React.ReactNode)}
                </AppTableCell>
              ));

              if (disableRowAnimation) {
                return <AppTableRow key={rowIndex}>{cellsContent}</AppTableRow>;
              }

              return (
                <motion.tr
                  key={rowIndex}
                  custom={rowIndex}
                  initial="hidden"
                  animate="visible"
                  variants={rowVariants}
                  className="border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  {cellsContent}
                </motion.tr>
              );
            })
          ) : (
            <AppTableRow>
              <AppTableCell
                colSpan={cols.length}
                className="h-24 text-center text-muted-foreground"
              >
                {emptyMessage}
              </AppTableCell>
            </AppTableRow>
          )}
        </AppTableBody>
      </AppTable>
    </div>
  );
}
