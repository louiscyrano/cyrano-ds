import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import './Tooltip.css';

export const TooltipProvider: React.FC<React.ComponentProps<typeof TooltipPrimitive.Provider>> = ({
  delayDuration = 100,
  ...props
}) => <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />;

export const Tooltip: React.FC<React.ComponentProps<typeof TooltipPrimitive.Root> & { delayDuration?: number }> = ({
  delayDuration,
  ...props
}) => (
  <TooltipProvider delayDuration={delayDuration}>
    <TooltipPrimitive.Root {...props} />
  </TooltipProvider>
);

export const TooltipTrigger = TooltipPrimitive.Trigger;

type ContentProps = React.ComponentProps<typeof TooltipPrimitive.Content>;

export const TooltipContent: React.FC<ContentProps> = ({
  className = '',
  sideOffset = 6,
  children,
  ...props
}) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      sideOffset={sideOffset}
      className={`cy-tooltip-content ${className}`.trim()}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="cy-tooltip-arrow" width={10} height={5} />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
);
