import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Check, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * AppCommand* — primitives cmdk wrappées DS Cyrano.
 *
 * Sert deux usages :
 * 1. Combobox : input avec autocomplete sur liste, ancré sous un trigger.
 *    Composer avec AppPopover (voir exemple ci-dessous).
 * 2. Command palette : interface de recherche globale (Cmd+K), à insérer
 *    dans un AppDialog plein écran.
 *
 * Pour le cas combobox simple, utiliser le wrapper AppCombobox plus haut niveau
 * (props value/onChange/options) qui assemble Popover + Command pour toi.
 *
 * Usage combobox composable :
 *
 *     <AppPopover>
 *       <AppPopoverTrigger asChild>
 *         <AppButton variant="outline">{selected ?? 'Sélectionner'}</AppButton>
 *       </AppPopoverTrigger>
 *       <AppPopoverContent className="p-0">
 *         <AppCommand>
 *           <AppCommandInput placeholder="Rechercher..." />
 *           <AppCommandList>
 *             <AppCommandEmpty>Aucun résultat.</AppCommandEmpty>
 *             <AppCommandGroup>
 *               {options.map(o => (
 *                 <AppCommandItem key={o.value} value={o.value} onSelect={setSelected}>
 *                   {o.label}
 *                 </AppCommandItem>
 *               ))}
 *             </AppCommandGroup>
 *           </AppCommandList>
 *         </AppCommand>
 *       </AppPopoverContent>
 *     </AppPopover>
 */

export const AppCommand = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'flex h-full w-full flex-col overflow-hidden rounded-lg bg-background text-foreground',
      className,
    )}
    {...props}
  />
));
AppCommand.displayName = 'AppCommand';

export const AppCommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center gap-2 border-b border-border px-3" cmdk-input-wrapper="">
    <Search className="size-4 shrink-0 text-muted-foreground" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  </div>
));
AppCommandInput.displayName = 'AppCommandInput';

export const AppCommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('max-h-72 overflow-y-auto overflow-x-hidden p-1', className)}
    {...props}
  />
));
AppCommandList.displayName = 'AppCommandList';

export const AppCommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm text-muted-foreground" {...props} />
));
AppCommandEmpty.displayName = 'AppCommandEmpty';

export const AppCommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
      className,
    )}
    {...props}
  />
));
AppCommandGroup.displayName = 'AppCommandGroup';

export const AppCommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn('-mx-1 h-px bg-border', className)} {...props} />
));
AppCommandSeparator.displayName = 'AppCommandSeparator';

export const AppCommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled='true']:pointer-events-none data-[disabled='true']:opacity-50 [&_svg:not([class*=size-])]:size-4",
      className,
    )}
    {...props}
  />
));
AppCommandItem.displayName = 'AppCommandItem';

/* ============================================================
   AppCombobox — wrapper haut niveau (Popover + Command).
   ============================================================ */

import {
  AppPopover,
  AppPopoverTrigger,
  AppPopoverContent,
} from './AppPopover';

export type AppComboboxOption = {
  /** Identifiant unique de l'option, retourné via `onValueChange`. */
  value: string;
  /** Texte affiché et utilisé pour le filtre fuzzy. */
  label: string;
};

export type AppComboboxProps = {
  /** Liste des options sélectionnables. Filtrées par cmdk via fuzzy search sur `label`. */
  options: ReadonlyArray<AppComboboxOption>;
  /** Valeur actuellement sélectionnée (controlled). Compare avec `option.value`. */
  value?: string;
  /** Callback déclenché quand l'utilisateur sélectionne une option. Reçoit la nouvelle `value`. */
  onValueChange?: (value: string) => void;
  /** Texte affiché dans le trigger quand aucune valeur n'est sélectionnée. Défaut "Sélectionner...". */
  placeholder?: string;
  /** Placeholder de l'input de recherche dans le popover. Défaut "Rechercher...". */
  searchPlaceholder?: string;
  /** Message affiché quand le filtre ne retourne aucune option. Défaut "Aucun résultat.". */
  emptyMessage?: string;
  /** Classes additionnelles sur le bouton trigger par défaut. Ignoré si `trigger` custom est fourni. */
  className?: string;
  /** Désactive le combobox (cursor not-allowed, opacity 50, pas de click). */
  disabled?: boolean;
  /** Trigger custom à utiliser à la place du bouton par défaut. Doit accepter `asChild` (pattern Radix). */
  trigger?: React.ReactNode;
};

export const AppCombobox: React.FC<AppComboboxProps> = ({
  options,
  value,
  onValueChange,
  placeholder = 'Sélectionner...',
  searchPlaceholder = 'Rechercher...',
  emptyMessage = 'Aucun résultat.',
  className,
  disabled,
  trigger,
}) => {
  const [open, setOpen] = React.useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <AppPopover open={open} onOpenChange={setOpen}>
      <AppPopoverTrigger asChild>
        {trigger ?? (
          <button
            type="button"
            disabled={disabled}
            className={cn(
              'flex h-9 w-full items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors hover:bg-accent/50 focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
          >
            <span className={cn('truncate', !selected && 'text-muted-foreground')}>
              {selected?.label ?? placeholder}
            </span>
            <Search className="size-4 shrink-0 opacity-50" />
          </button>
        )}
      </AppPopoverTrigger>
      <AppPopoverContent className="w-72 p-0" align="start">
        <AppCommand>
          <AppCommandInput placeholder={searchPlaceholder} />
          <AppCommandList>
            <AppCommandEmpty>{emptyMessage}</AppCommandEmpty>
            <AppCommandGroup>
              {options.map((option) => (
                <AppCommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    onValueChange?.(option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'size-4',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option.label}
                </AppCommandItem>
              ))}
            </AppCommandGroup>
          </AppCommandList>
        </AppCommand>
      </AppPopoverContent>
    </AppPopover>
  );
};
