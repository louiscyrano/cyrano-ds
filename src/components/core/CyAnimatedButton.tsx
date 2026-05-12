import React from 'react';
import './CyAnimatedButton.css';

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
};

export const CyAnimatedButton = ({
  children, href, onClick, size = 'md', icon, className = '',
}: Props) => {
  const Tag = href ? 'a' : 'button';
  const props = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick };
  return (
    <Tag className={`cy-animated cy-animated--${size} ${className}`} {...props as any}>
      <span className="cy-animated__rotating-stroke" aria-hidden="true" />
      <span className="cy-animated__rotating-glow" aria-hidden="true" />
      <span className="cy-animated__uniform-stroke" aria-hidden="true" />
      <span className="cy-animated__uniform-glow" aria-hidden="true" />
      <span className="cy-animated__fill">
        {icon && <span className="cy-animated__icon">{icon}</span>}
        <span>{children}</span>
      </span>
    </Tag>
  );
};
