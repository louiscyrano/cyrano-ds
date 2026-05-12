import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pencil, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  defaultLabel?: string;
  onChange?: (value: string) => void;
  className?: string;
};

/**
 * Chip avec édition inline + double confirmation visuelle (icône stylo → check).
 * Pour les propriétés qu'on modifie rarement et qui demandent une confirmation explicite.
 */
export const AppEditableChip: React.FC<Props> = ({ defaultLabel = 'Watchlist', onChange, className }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [label, setLabel] = React.useState(defaultLabel);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
    }
  }, [isEditing]);

  const handleSave = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    const finalValue = label.trim() === '' ? 'Untitled' : label;
    setLabel(finalValue);
    setIsEditing(false);
    onChange?.(finalValue);
  };

  const handleEdit = () => setIsEditing(true);

  return (
    <motion.div layout className={cn('inline-block', className)}>
      <div
        className={cn(
          'relative flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full border border-border bg-card py-1 pr-1 transition-all duration-300 ease-in-out select-none',
          isEditing && 'gap-8 ring-2 ring-primary',
        )}
      >
        <motion.input
          layout="position"
          key="input"
          ref={inputRef}
          type="text"
          value={label}
          readOnly={!isEditing}
          tabIndex={isEditing ? 0 : -1}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave(e)}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            'ml-4 w-32 border-none bg-transparent text-base font-medium text-foreground capitalize outline-none focus:outline-none focus-visible:outline-none focus-visible:shadow-none selection:bg-muted',
            !isEditing && 'pointer-events-none',
          )}
        />

        <AnimatePresence mode="popLayout">
          {isEditing ? (
            <motion.button
              key="done"
              type="button"
              initial={{ opacity: 0, filter: 'blur(4px)', scale: 0 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(4px)', scale: 0 }}
              layout="position"
              onClick={handleSave}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="rounded-full bg-primary p-1.5 text-primary-foreground transition-colors"
              aria-label="Confirmer"
            >
              <Check size={16} strokeWidth={2.5} />
            </motion.button>
          ) : (
            <motion.button
              key="edit"
              type="button"
              initial={{ opacity: 0, filter: 'blur(4px)', scale: 0 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(4px)', scale: 0 }}
              layout="position"
              onClick={handleEdit}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="rounded-full bg-muted p-1.5 text-muted-foreground transition-colors hover:bg-accent"
              aria-label="Éditer"
            >
              <Pencil size={16} strokeWidth={2} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
