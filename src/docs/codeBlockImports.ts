// Auto-imports pour CodeBlock — généré à partir de ds-index.json.
//
// Maintenu en synchro via `npm run ds:gen-known` (qui régénère ce fichier
// depuis ds-index.json). Si tu ajoutes un composant au DS, lance la commande
// pour mettre à jour ce fichier.

export const KNOWN_CORE: ReadonlySet<string> = new Set([
  'CyAnimatedButton',
  'CyBadge',
  'CyButton',
  'CyCard',
  'CyGradientText',
  'CyInput',
  'CyLinkPill',
  'CyLiveDot',
  'CyLogo',
  'CyMenuToggle',
  'CyReveal',
  'CyScrollHint',
  'CySpinner',
  'CyStatus',
  'CyTextarea',
]);

export const KNOWN_LANDING: ReadonlySet<string> = new Set([
  'CyAuroraBg',
  'CyCtaBanner',
  'CyRoadmapStrip',
  'CySecondaryHero',
  'CyShaderBg',
]);

export const KNOWN_APP: ReadonlySet<string> = new Set([
  'AppAlertDialog',
  'AppAlertDialogAction',
  'AppAlertDialogCancel',
  'AppAlertDialogContent',
  'AppAlertDialogDescription',
  'AppAlertDialogFooter',
  'AppAlertDialogHeader',
  'AppAlertDialogTitle',
  'AppAlertDialogTrigger',
  'AppAvatar',
  'AppAvatarFallback',
  'AppAvatarImage',
  'AppButton',
  'AppCheckbox',
  'AppCombobox',
  'AppCommand',
  'AppCommandEmpty',
  'AppCommandGroup',
  'AppCommandInput',
  'AppCommandItem',
  'AppCommandList',
  'AppCommandSeparator',
  'AppCounterButton',
  'AppDataTable',
  'AppDialog',
  'AppDialogBody',
  'AppDialogClose',
  'AppDialogContent',
  'AppDialogDescription',
  'AppDialogFooter',
  'AppDialogHeader',
  'AppDialogTitle',
  'AppDialogTrigger',
  'AppDropdownMenu',
  'AppDropdownMenuCheckboxItem',
  'AppDropdownMenuContent',
  'AppDropdownMenuItem',
  'AppDropdownMenuLabel',
  'AppDropdownMenuPage',
  'AppDropdownMenuPageTrigger',
  'AppDropdownMenuRadioGroup',
  'AppDropdownMenuRadioItem',
  'AppDropdownMenuSeparator',
  'AppDropdownMenuTrigger',
  'AppEditableChip',
  'AppPagination',
  'AppPaginationContent',
  'AppPaginationEllipsis',
  'AppPaginationItem',
  'AppPopover',
  'AppPopoverContent',
  'AppPopoverTrigger',
  'AppPopoverAnchor',
  'AppPopoverClose',
  'AppSelect',
  'AppSelectContent',
  'AppSelectGroup',
  'AppSelectItem',
  'AppSelectLabel',
  'AppSelectTrigger',
  'AppSelectValue',
  'AppSheet',
  'AppSheetBody',
  'AppSheetClose',
  'AppSheetContent',
  'AppSheetDescription',
  'AppSheetFooter',
  'AppSheetHeader',
  'AppSheetTitle',
  'AppSheetTrigger',
  'AppSkeleton',
  'AppTable',
  'AppTableBody',
  'AppTableCell',
  'AppTableHead',
  'AppTableHeader',
  'AppTableRow',
  'AppTabs',
  'AppTabsContent',
  'AppTabsList',
  'AppTabsPanel',
  'AppTabsTab',
  'AppTabsTrigger',
  'AppToggle',
  'Tooltip',
  'TooltipContent',
  'TooltipProvider',
  'TooltipTrigger',
]);

export const KNOWN_APP_HOOKS: ReadonlySet<string> = new Set(['useToasts']);

/**
 * Détecte les composants/hooks DS utilisés dans une snippet TSX et génère
 * les import statements groupés par couche.
 *
 * Retourne `null` si aucun composant DS détecté.
 */
export function detectImports(code: string): string | null {
  const found = {
    core: new Set<string>(),
    landing: new Set<string>(),
    app: new Set<string>(),
  };

  // Match : <ComponentName / </ComponentName / type ComponentName / useHook(
  const identifierRe = /\b([A-Z][a-zA-Z0-9]+|use[A-Z][a-zA-Z0-9]+)\b/g;
  let m: RegExpExecArray | null;
  while ((m = identifierRe.exec(code)) !== null) {
    const name = m[1];
    if (KNOWN_CORE.has(name)) found.core.add(name);
    else if (KNOWN_LANDING.has(name)) found.landing.add(name);
    else if (KNOWN_APP.has(name) || KNOWN_APP_HOOKS.has(name)) found.app.add(name);
  }

  const lines: string[] = [];
  if (found.core.size > 0) {
    lines.push(`import { ${[...found.core].sort().join(', ')} } from '@/components/core';`);
  }
  if (found.landing.size > 0) {
    lines.push(`import { ${[...found.landing].sort().join(', ')} } from '@/components/landing';`);
  }
  if (found.app.size > 0) {
    lines.push(`import { ${[...found.app].sort().join(', ')} } from '@/components/app';`);
  }

  return lines.length > 0 ? lines.join('\n') : null;
}
