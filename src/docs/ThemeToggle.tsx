import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const STORAGE_KEY = 'cy-theme';

const getInitialTheme = (): 'dark' | 'light' => {
  if (typeof document === 'undefined') return 'dark';
  const current = document.documentElement.getAttribute('data-theme');
  return current === 'light' ? 'light' : 'dark';
};

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage indisponible */
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      style={{
        width: 32,
        height: 32,
        borderRadius: 'var(--cy-radius-full)',
        background: 'var(--cy-bg-muted)',
        border: '1px solid var(--cy-border)',
        color: 'var(--cy-text-secondary)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'color var(--cy-transition-base), background var(--cy-transition-base)',
        padding: 0,
      }}
    >
      <span aria-hidden="true" style={{ display: 'inline-flex', lineHeight: 0 }}>
        {isDark ? <Moon size={14} strokeWidth={2} /> : <Sun size={14} strokeWidth={2} />}
      </span>
    </button>
  );
};
