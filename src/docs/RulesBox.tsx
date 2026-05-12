import React from 'react';
import { Check, X } from 'lucide-react';

type Props = {
  variant: 'good' | 'bad';
  title: string;
  children: React.ReactNode;
};

export const RulesBox: React.FC<Props> = ({ variant, title, children }) => {
  const isGood = variant === 'good';
  const bg = isGood ? 'rgb(5 211 126 / 0.10)' : 'rgb(239 68 68 / 0.10)';
  const border = isGood ? 'rgb(5 211 126 / 0.30)' : 'rgb(239 68 68 / 0.30)';
  const headColor = isGood ? 'var(--cy-green-400)' : 'var(--cy-error)';
  const PrefixIcon = isGood ? Check : X;

  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${border}`,
        padding: 20,
        borderRadius: 'var(--cy-radius-xl)',
        marginBottom: 16,
      }}
    >
      <h4
        style={{
          fontFamily: 'var(--cy-font-heading)',
          fontWeight: 600,
          fontSize: 'var(--cy-text-base)',
          color: headColor,
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span aria-hidden="true" style={{ display: 'inline-flex', lineHeight: 0 }}>
          <PrefixIcon size={16} strokeWidth={2.5} />
        </span>
        <span>{title}</span>
      </h4>
      <div style={{ color: 'var(--cy-text-secondary)', fontSize: 'var(--cy-text-sm)', lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  );
};
