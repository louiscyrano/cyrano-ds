import React, { useState } from 'react';

type Lang = 'tsx' | 'css' | 'bash' | 'md';

type Props = {
  lang?: Lang;
  code: string;
};

export const CodeBlock: React.FC<Props> = ({ lang = 'tsx', code }) => {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
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
        border: '1px solid var(--cy-border)',
        overflow: 'hidden',
        marginBottom: 16,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          borderBottom: '1px solid var(--cy-border-subtle)',
          background: 'var(--cy-bg-elevated)',
        }}
      >
        <span
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: 11,
            color: 'var(--cy-text-secondary)',
          }}
        >
          {lang}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            fontSize: 11,
            color: copied || hovered ? 'var(--cy-green-500)' : 'var(--cy-text-secondary)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            transition: 'color var(--cy-transition-base)',
          }}
        >
          {copied ? 'Copié' : 'Copier'}
        </button>
      </div>
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
    </div>
  );
};
