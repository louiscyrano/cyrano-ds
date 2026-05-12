import React, { useState } from 'react';
import './CyMenuToggle.css';

type Props = {
  open?: boolean;
  defaultOpen?: boolean;
  onChange?: (open: boolean) => void;
  className?: string;
  ariaLabel?: { open: string; close: string };
};

export const CyMenuToggle: React.FC<Props> = ({
  open: controlledOpen,
  defaultOpen = false,
  onChange,
  className = '',
  ariaLabel = { open: 'Ouvrir le menu', close: 'Fermer le menu' },
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const toggle = () => {
    const next = !open;
    if (!isControlled) setUncontrolledOpen(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      className={`cy-menu-toggle ${className}`.trim()}
      onClick={toggle}
      aria-expanded={open}
      aria-label={open ? ariaLabel.close : ariaLabel.open}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path className="cy-menu-toggle__path cy-menu-toggle__path--top" d="M4 12L20 12" />
        <path className="cy-menu-toggle__path cy-menu-toggle__path--middle" d="M4 12H20" />
        <path className="cy-menu-toggle__path cy-menu-toggle__path--bottom" d="M4 12H20" />
      </svg>
    </button>
  );
};
