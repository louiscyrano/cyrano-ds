import { motion } from 'motion/react';
import * as React from 'react';
import { cn } from '@/lib/utils';

type Props = {
  /** Valeur contrôlée (utiliser avec `onChange`). Omettre pour un mode uncontrolled avec `defaultChecked`. */
  checked?: boolean;
  /** Valeur initiale en mode uncontrolled. Ignoré si `checked` est fourni. Défaut `false`. */
  defaultChecked?: boolean;
  /** Callback déclenché quand l'état change. Reçoit le nouveau booléen. */
  onChange?: (checked: boolean) => void;
  /** Affiche les labels OFF / ON de part et d'autre du switch. Défaut `true`. */
  showLabels?: boolean;
  /** Customisation des labels affichés. Défaut `{ off: 'OFF', on: 'ON' }`. */
  labels?: { off: string; on: string };
  /** Désactive le toggle (cursor not-allowed, opacity 50). */
  disabled?: boolean;
  /** Classes additionnelles sur le wrapper externe. */
  className?: string;
};

/**
 * Toggle on/off avec animation spring. Track passe au vert, label "ON" glow vert.
 * Fond du conteneur muted pour s'intégrer en dark/light mode.
 */
export const AppToggle: React.FC<Props> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  showLabels = true,
  labels = { off: 'OFF', on: 'ON' },
  disabled = false,
  className,
}) => {
  const [uncontrolled, setUncontrolled] = React.useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const isOn = isControlled ? controlledChecked : uncontrolled;

  const toggle = () => {
    if (disabled) return;
    const next = !isOn;
    if (!isControlled) setUncontrolled(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        'inline-flex items-center gap-3 rounded-2xl border border-border bg-muted/50 p-3 backdrop-blur-sm shadow-sm cursor-pointer transition-opacity outline-none',
        'focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
    >
      {showLabels && (
        <span
          className={cn(
            'text-xs font-bold tracking-wider transition-colors duration-300',
            !isOn ? 'text-muted-foreground' : 'text-muted-foreground/40',
          )}
        >
          {labels.off}
        </span>
      )}

      <motion.span
        className="relative w-12 h-6 rounded-full shadow-inner"
        initial={false}
        animate={{ backgroundColor: isOn ? 'var(--cy-deep-700)' : 'var(--cy-bg-muted)' }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full border border-white/10 shadow-md block"
          initial={false}
          animate={{
            x: isOn ? 24 : 0,
            backgroundColor: isOn ? 'var(--cy-green-400)' : 'var(--cy-gray-600)',
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="absolute top-1 left-1 w-1.5 h-0.5 bg-white/30 rounded-full blur-[1px]" />
        </motion.span>
      </motion.span>

      {showLabels && (
        <span
          className={cn(
            'text-xs font-bold tracking-wider transition-colors duration-300',
            isOn
              ? 'text-green-400 drop-shadow-[0_0_8px_rgba(48,248,165,0.5)]'
              : 'text-muted-foreground/40',
          )}
        >
          {labels.on}
        </span>
      )}
    </button>
  );
};
