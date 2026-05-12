import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { X, Undo2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppButton } from './AppButton';

/* ============================================================
   AppToast — système de notifications éphémères avec stack
   accordéon, pause au hover, animations slide-in.
   ============================================================ */

type ToastType = 'message' | 'success' | 'warning' | 'error';

type Toast = {
  id: number;
  text: string | React.ReactNode;
  type: ToastType;
  measuredHeight?: number;
  timeout?: ReturnType<typeof setTimeout>;
  remaining?: number;
  start?: number;
  pause?: () => void;
  resume?: () => void;
  preserve?: boolean;
  action?: string;
  onAction?: () => void;
  onUndoAction?: () => void;
};

let containerRoot: ReturnType<typeof createRoot> | null = null;
let toastIdCounter = 0;

const toastStore = {
  toasts: [] as Toast[],
  listeners: new Set<() => void>(),

  add(
    text: string | React.ReactNode,
    type: ToastType,
    preserve?: boolean,
    action?: string,
    onAction?: () => void,
    onUndoAction?: () => void,
  ) {
    const id = toastIdCounter++;

    const toast: Toast = {
      id,
      text,
      type,
      preserve,
      action,
      onAction,
      onUndoAction,
    };

    if (!toast.preserve) {
      toast.remaining = 3000;
      toast.start = Date.now();

      const close = () => {
        toastStore.toasts = toastStore.toasts.filter((t) => t.id !== id);
        toastStore.notify();
      };

      toast.timeout = setTimeout(close, toast.remaining);

      toast.pause = () => {
        if (!toast.timeout) return;
        clearTimeout(toast.timeout);
        toast.timeout = undefined;
        toast.remaining! -= Date.now() - toast.start!;
      };

      toast.resume = () => {
        if (toast.timeout) return;
        toast.start = Date.now();
        toast.timeout = setTimeout(close, toast.remaining);
      };
    }

    this.toasts.push(toast);
    this.notify();
  },

  remove(id: number) {
    toastStore.toasts = toastStore.toasts.filter((t) => t.id !== id);
    toastStore.notify();
  },

  subscribe(listener: () => void) {
    toastStore.listeners.add(listener);
    return () => {
      toastStore.listeners.delete(listener);
    };
  },

  notify() {
    toastStore.listeners.forEach((fn) => fn());
  },
};

/* ============================================================
   Couleurs par type — adaptées à l'identité Cyrano.
   Toasts en fond plein contrasté (lisibilité sur tout contenu).
   ============================================================ */

const typeStyles: Record<ToastType, string> = {
  message: 'bg-card text-card-foreground border border-border',
  success: 'bg-[#16a34a] text-white border border-[#15803d]',
  warning: 'bg-[#ca8a04] text-white border border-[#a16207]',
  error: 'bg-[#dc2626] text-white border border-[#b91c1c]',
};

/* ============================================================
   ToastContainer — rendu unique attaché au body.
   ============================================================ */

const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const [shownIds, setShownIds] = React.useState<number[]>([]);
  const [isHovered, setIsHovered] = React.useState(false);

  const measureRef = (toast: Toast) => (node: HTMLDivElement | null) => {
    if (node && toast.measuredHeight == null) {
      toast.measuredHeight = node.getBoundingClientRect().height;
      toastStore.notify();
    }
  };

  React.useEffect(() => {
    setToasts([...toastStore.toasts]);
    return toastStore.subscribe(() => {
      setToasts([...toastStore.toasts]);
    });
  }, []);

  React.useEffect(() => {
    const unseen = toasts.filter((t) => !shownIds.includes(t.id)).map((t) => t.id);
    if (unseen.length > 0) {
      requestAnimationFrame(() => {
        setShownIds((prev) => [...prev, ...unseen]);
      });
    }
  }, [toasts, shownIds]);

  const lastVisibleCount = 3;
  const lastVisibleStart = Math.max(0, toasts.length - lastVisibleCount);

  const getFinalTransform = (index: number, length: number) => {
    if (index === length - 1) {
      return 'none';
    }
    const offset = length - 1 - index;
    let translateY = toasts[length - 1]?.measuredHeight || 63;
    for (let i = length - 1; i > index; i--) {
      if (isHovered) {
        translateY += (toasts[i - 1]?.measuredHeight || 63) + 10;
      } else {
        translateY += 20;
      }
    }
    const z = -offset;
    const scale = isHovered ? 1 : 1 - 0.05 * offset;
    return `translate3d(0, calc(100% - ${translateY}px), ${z}px) scale(${scale})`;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    toastStore.toasts.forEach((t) => t.pause?.());
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    toastStore.toasts.forEach((t) => t.resume?.());
  };

  const visibleToasts = toasts.slice(lastVisibleStart);
  const containerHeight = visibleToasts.reduce((acc, toast) => {
    return acc + (toast.measuredHeight ?? 63);
  }, 0);

  return (
    <div
      className="fixed bottom-4 right-4 z-[9999] pointer-events-none w-[420px]"
      style={{ height: containerHeight }}
    >
      <div
        className="relative pointer-events-auto w-full"
        style={{ height: containerHeight }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {toasts.map((toast, index) => {
          const isVisible = index >= lastVisibleStart;

          return (
            <div
              key={toast.id}
              ref={measureRef(toast)}
              className={cn(
                'absolute right-0 bottom-0 rounded-xl shadow-lg leading-[21px] p-4 h-fit',
                typeStyles[toast.type],
                isVisible ? 'opacity-100' : 'opacity-0',
                index < lastVisibleStart && 'pointer-events-none',
              )}
              style={{
                width: 420,
                transition: 'all .35s cubic-bezier(.25,.75,.6,.98)',
                transform: shownIds.includes(toast.id)
                  ? getFinalTransform(index, toasts.length)
                  : 'translate3d(0, 100%, 150px) scale(1)',
              }}
            >
              <div className="flex flex-col items-center justify-between text-sm">
                <div className="w-full h-full flex items-center justify-between gap-4">
                  <span className="flex-1">{toast.text}</span>
                  {!toast.action && (
                    <div className="flex gap-1 shrink-0">
                      {toast.onUndoAction && (
                        <button
                          type="button"
                          aria-label="Annuler"
                          onClick={() => {
                            toast.onUndoAction?.();
                            toastStore.remove(toast.id);
                          }}
                          className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                        >
                          <Undo2 size={14} />
                        </button>
                      )}
                      <button
                        type="button"
                        aria-label="Fermer"
                        onClick={() => toastStore.remove(toast.id)}
                        className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
                {toast.action && (
                  <div className="w-full flex items-center justify-end gap-2 mt-3">
                    <AppButton
                      variant="ghost"
                      size="sm"
                      onClick={() => toastStore.remove(toast.id)}
                    >
                      Dismiss
                    </AppButton>
                    <AppButton
                      size="sm"
                      onClick={() => {
                        toast.onAction?.();
                        toastStore.remove(toast.id);
                      }}
                    >
                      {toast.action}
                    </AppButton>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mountContainer = () => {
  if (containerRoot) return;
  if (typeof document === 'undefined') return;
  const el = document.createElement('div');
  el.setAttribute('data-cy-toast-root', 'true');
  document.body.appendChild(el);
  containerRoot = createRoot(el);
  containerRoot.render(<ToastContainer />);
};

/* ============================================================
   Hook public — useToasts() → 4 méthodes pour push un toast.
   ============================================================ */

interface MessageOptions {
  text: string | React.ReactNode;
  preserve?: boolean;
  action?: string;
  onAction?: () => void;
  onUndoAction?: () => void;
}

export const useToasts = () => {
  return {
    message: React.useCallback((opts: MessageOptions) => {
      mountContainer();
      toastStore.add(
        opts.text,
        'message',
        opts.preserve,
        opts.action,
        opts.onAction,
        opts.onUndoAction,
      );
    }, []),
    success: React.useCallback((text: string | React.ReactNode) => {
      mountContainer();
      toastStore.add(text, 'success');
    }, []),
    warning: React.useCallback((text: string | React.ReactNode) => {
      mountContainer();
      toastStore.add(text, 'warning');
    }, []),
    error: React.useCallback((text: string | React.ReactNode) => {
      mountContainer();
      toastStore.add(text, 'error');
    }, []),
  };
};
