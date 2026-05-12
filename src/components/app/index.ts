// App primitives — couche additive pour les surfaces interactives (dashboards, outils internes).
//
// Règles :
// - Un composant app/ peut importer librement depuis core/ (couche additive).
// - Un composant core/ ne doit JAMAIS importer depuis app/ (cycle interdit).
// - Si un composant est utile aux apps ET aux landings, il appartient à core/, pas à app/.

export { AppCounterButton } from './AppCounterButton';
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './Tooltip';
export { AppButton, appButtonVariants, type AppButtonProps } from './AppButton';
export { AppCheckbox } from './AppCheckbox';
export {
  AppSelect,
  AppSelectGroup,
  AppSelectValue,
  AppSelectTrigger,
  AppSelectContent,
  AppSelectLabel,
  AppSelectItem,
  AppSelectSeparator,
  AppSelectScrollUpButton,
  AppSelectScrollDownButton,
} from './AppSelect';
export {
  AppTabs,
  AppTabsList,
  AppTabsTab,
  AppTabsPanel,
  AppTabsTrigger,
  AppTabsContent,
  type AppTabsVariant,
} from './AppTabs';
export { AppToggle } from './AppToggle';
export { AppEditableChip } from './AppEditableChip';
export {
  AppDropdownMenu,
  AppDropdownMenuTrigger,
  AppDropdownMenuContent,
  AppDropdownMenuItem,
  AppDropdownMenuCheckboxItem,
  AppDropdownMenuRadioGroup,
  AppDropdownMenuRadioItem,
  AppDropdownMenuLabel,
  AppDropdownMenuSeparator,
  AppDropdownMenuPage,
  AppDropdownMenuPageTrigger,
} from './AppDropdownMenu';
export {
  AppSidebar,
  type AppSidebarProps,
  type AppSidebarRailItem,
  type AppSidebarItem,
  type AppSidebarSection,
  type AppSidebarSubItem,
} from './AppSidebar';
export {
  AppPagination,
  AppPaginationContent,
  AppPaginationItem,
  AppPaginationEllipsis,
} from './AppPagination';
export { useToasts } from './AppToast';
export {
  AppDialog,
  AppDialogTrigger,
  AppDialogPortal,
  AppDialogClose,
  AppDialogOverlay,
  AppDialogContent,
  AppDialogBody,
  AppDialogHeader,
  AppDialogFooter,
  AppDialogTitle,
  AppDialogDescription,
} from './AppDialog';
export {
  AppTable,
  AppTableHeader,
  AppTableBody,
  AppTableFooter,
  AppTableRow,
  AppTableHead,
  AppTableCell,
  AppTableCaption,
} from './AppTable';
export { AppAvatar, AppAvatarImage, AppAvatarFallback } from './AppAvatar';
export { AppDataTable, type ColumnDef, type AppDataTableProps } from './AppDataTable';
export { AppSkeleton } from './AppSkeleton';
