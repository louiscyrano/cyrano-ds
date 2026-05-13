import React from 'react';
import './CySecondaryHero.css';

export type CySecondaryHeroProps = {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  ctas?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
};

export function CySecondaryHero({
  eyebrow,
  title,
  lead,
  ctas,
  rightSlot,
  className,
}: CySecondaryHeroProps) {
  const split = Boolean(rightSlot);
  const cls = ['cy-secondary-hero', className].filter(Boolean).join(' ');
  const bodyCls = split
    ? 'cy-secondary-hero__body cy-secondary-hero__body--split'
    : 'cy-secondary-hero__body cy-secondary-hero__body--single';

  return (
    <section className={cls}>
      <div className={bodyCls}>
        <div className="cy-secondary-hero__col-l">
          <div className="cy-secondary-hero__eyebrow">{eyebrow}</div>
          <h1 className="cy-secondary-hero__title">{title}</h1>
          {lead && <p className="cy-secondary-hero__lead">{lead}</p>}
          {ctas && <div className="cy-secondary-hero__ctas">{ctas}</div>}
        </div>
        {split && <div className="cy-secondary-hero__col-r">{rightSlot}</div>}
      </div>
    </section>
  );
}
