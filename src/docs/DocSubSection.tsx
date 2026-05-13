import React, { useState } from 'react';
import { Info } from 'lucide-react';

type Props = {
  title: string;
  description?: string;
  id?: string;
  children: React.ReactNode;
};

const slugify = (str: string): string =>
  str
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const DocSubSection: React.FC<Props> = ({ title, description, id, children }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div id={id ?? slugify(title)} style={{ marginTop: 48, scrollMarginTop: 80 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <h3
          style={{
            fontFamily: 'var(--cy-font-heading)',
            fontWeight: 600,
            fontSize: 'var(--cy-text-lg)',
            color: 'var(--cy-text-accent)',
            margin: 0,
          }}
        >
          {title}
        </h3>
        {description ? (
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            <button
              type="button"
              aria-label="Voir la description"
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
              onFocus={() => setShowInfo(true)}
              onBlur={() => setShowInfo(false)}
              style={{
                border: 'none',
                background: 'transparent',
                color: 'var(--cy-text-tertiary)',
                cursor: 'help',
                padding: 2,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--cy-radius-full)',
              }}
            >
              <Info size={14} />
            </button>
            {showInfo ? (
              <div
                role="tooltip"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: 6,
                  padding: '10px 14px',
                  background: 'var(--cy-bg-elevated)',
                  border: '1px solid var(--cy-border)',
                  borderRadius: 'var(--cy-radius-lg)',
                  fontFamily: 'var(--cy-font-body)',
                  fontSize: 'var(--cy-text-sm)',
                  color: 'var(--cy-text-secondary)',
                  lineHeight: 1.6,
                  maxWidth: 420,
                  width: 'max-content',
                  zIndex: 100,
                  boxShadow: 'var(--cy-shadow-md)',
                  pointerEvents: 'none',
                }}
              >
                {description}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      {children}
    </div>
  );
};
