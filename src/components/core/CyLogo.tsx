import React, { useEffect, useState } from 'react';

type Props = {
  variant?: 'long' | 'square';
  theme?: 'auto' | 'white' | 'black';
  size?: number;
  className?: string;
};

const resolveTheme = (theme: 'auto' | 'white' | 'black'): 'white' | 'black' => {
  if (theme !== 'auto') return theme;
  if (typeof document === 'undefined') return 'white';
  const data = document.documentElement.getAttribute('data-theme');
  return data === 'light' ? 'black' : 'white';
};

export const CyLogo: React.FC<Props> = ({
  variant = 'long',
  theme = 'auto',
  size = 28,
  className = '',
}) => {
  const [resolved, setResolved] = useState<'white' | 'black'>(() => resolveTheme(theme));

  useEffect(() => {
    if (theme !== 'auto') {
      setResolved(theme);
      return;
    }
    setResolved(resolveTheme('auto'));
    const observer = new MutationObserver(() => setResolved(resolveTheme('auto')));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [theme]);

  const src = `/logos/cyrano_${variant}_${resolved}.svg`;
  const alt = `Cyrano ${variant === 'long' ? 'logo' : 'symbol'}`;
  const style: React.CSSProperties = variant === 'long' ? { height: size } : { height: size, width: size };

  return <img src={src} alt={alt} style={style} className={className} />;
};
