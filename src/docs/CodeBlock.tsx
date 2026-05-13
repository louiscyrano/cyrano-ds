import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { detectImports } from './codeBlockImports';

type Lang = 'tsx' | 'css' | 'bash' | 'md';

type Props = {
  lang?: Lang;
  code: string;
  imports?: string;
  /** Désactive l'auto-détection des imports DS (pour les snippets non-DS) */
  noAutoImports?: boolean;
};

export const CodeBlock: React.FC<Props> = ({
  lang = 'tsx',
  code,
  imports,
  noAutoImports = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [copyHovered, setCopyHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const resolvedImports =
    imports ?? (lang === 'tsx' && !noAutoImports ? detectImports(code) : null);
  const fullCode = resolvedImports ? `${resolvedImports}\n\n${code}` : code;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(fullCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard indisponible */
    }
  };

  return (
    <div
      style={{
        borderRadius: 'var(--cy-radius-xl)',
        border: '1px solid var(--cy-border-subtle)',
        overflow: 'hidden',
        marginBottom: 16,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          background: 'var(--cy-bg-elevated)',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: 'inherit',
          borderBottom: open ? '1px solid var(--cy-border-subtle)' : 'none',
          transition: 'border-color var(--cy-transition-base)',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'ui-monospace, monospace',
            fontSize: 11,
            color: 'var(--cy-text-tertiary)',
          }}
        >
          <ChevronDown
            size={12}
            style={{
              transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform var(--cy-transition-base)',
            }}
          />
          {lang}
        </span>
        <span
          onClick={handleCopy}
          onMouseEnter={() => setCopyHovered(true)}
          onMouseLeave={() => setCopyHovered(false)}
          style={{
            fontSize: 11,
            color: copied || copyHovered ? 'var(--cy-green-500)' : 'var(--cy-text-tertiary)',
            cursor: 'pointer',
            transition: 'color var(--cy-transition-base)',
          }}
        >
          {copied ? 'Copié' : 'Copier'}
        </span>
      </button>
      {open ? (
        <>
          {resolvedImports ? (
            <pre
              style={{
                margin: 0,
                padding: '10px 16px',
                fontFamily: 'ui-monospace, monospace',
                fontSize: 11,
                lineHeight: 1.5,
                color: 'var(--cy-text-tertiary)',
                background: 'var(--cy-bg-code)',
                borderBottom: '1px solid var(--cy-border-subtle)',
                overflowX: 'auto',
              }}
            >
              <code>{resolvedImports}</code>
            </pre>
          ) : null}
          <pre
            style={{
              margin: 0,
              padding: 16,
              fontFamily: 'ui-monospace, monospace',
              fontSize: 12,
              lineHeight: 1.6,
              color: 'var(--cy-green-300)',
              background: 'var(--cy-bg-code)',
              overflowX: 'auto',
            }}
          >
            <code>{code}</code>
          </pre>
        </>
      ) : null}
    </div>
  );
};
