import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Type = 'success' | 'error' | 'warning' | 'info';

type Props = {
  type: Type;
  title: string;
  message?: string;
  className?: string;
};

const palette: Record<Type, { bg: string; border: string; tone: string; Icon: LucideIcon }> = {
  success: {
    bg: 'var(--cy-success-soft-bg)',
    border: 'var(--cy-success-soft-border)',
    tone: 'var(--cy-success)',
    Icon: CheckCircle,
  },
  error: {
    bg: 'var(--cy-error-soft-bg)',
    border: 'var(--cy-error-soft-border)',
    tone: 'var(--cy-error)',
    Icon: XCircle,
  },
  warning: {
    bg: 'var(--cy-warning-soft-bg)',
    border: 'var(--cy-warning-soft-border)',
    tone: 'var(--cy-warning)',
    Icon: AlertCircle,
  },
  info: {
    bg: 'var(--cy-info-soft-bg)',
    border: 'var(--cy-info-soft-border)',
    tone: 'var(--cy-info)',
    Icon: Info,
  },
};

export const CyStatus: React.FC<Props> = ({ type, title, message, className = '' }) => {
  const { bg, border, tone, Icon } = palette[type];
  return (
    <div
      role="status"
      className={cn('flex items-start gap-3 rounded-xl border p-3.5 text-foreground', className)}
      style={{ background: bg, borderColor: border }}
    >
      <span
        className="inline-flex shrink-0 items-center justify-center mt-0.5"
        style={{ color: tone }}
        aria-hidden="true"
      >
        <Icon size={20} strokeWidth={2} />
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        {message ? <span className="text-sm text-muted-foreground">{message}</span> : null}
      </div>
    </div>
  );
};
