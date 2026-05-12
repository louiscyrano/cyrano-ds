import React, { useEffect, useRef, useState } from 'react';
import './CyReveal.css';

type Props = {
  children: React.ReactNode;
  /** Décalage de l'animation (0-5). Permet d'orchestrer un stagger sur des éléments adjacents. Default 0. */
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  /** Threshold IntersectionObserver (0-1). Default 0.08. */
  threshold?: number;
  /** rootMargin IntersectionObserver. Default '0px 0px -8% 0px'. */
  rootMargin?: string;
  /** Element rendu. Default div. */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * CyReveal - Wrapper qui applique un fade-up à l'entrée du viewport.
 *
 * Utilise IntersectionObserver natif (pas motion lib). L'élément est invisible
 * au mount, et passe à visible avec un transform translateY(0) une fois
 * détecté. `delay` ajoute un stagger entre éléments adjacents.
 *
 * Respect de prefers-reduced-motion : l'élément est rendu visible directement.
 *
 * Usage :
 *   <CyReveal>Title</CyReveal>
 *   <CyReveal delay={1}>Lede</CyReveal>
 *   <CyReveal delay={2}>Body</CyReveal>
 */
export const CyReveal: React.FC<Props> = ({
  children,
  delay = 0,
  threshold = 0.08,
  rootMargin = '0px 0px -8% 0px',
  as = 'div',
  className = '',
  style,
}) => {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.unobserve(entry.target);
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  const Tag = as as React.ElementType;
  const delayClass = delay > 0 ? ` cy-reveal--d${delay}` : '';
  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={`cy-reveal${shown ? ' is-in' : ''}${delayClass} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
};
