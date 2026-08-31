import type { CSSProperties } from 'react';

type EditorialMediaProps = {
  index?: string;
  eyebrow?: string;
  label: string;
  description?: string;
  className?: string;
  tone?: 'forest' | 'petroleum' | 'ivory' | 'light';
  ratio?: string;
  compact?: boolean;
};

export function EditorialMedia({ index = 'GW', eyebrow = 'Material pendiente', label, description, className = '', tone = 'forest', ratio, compact = false }: EditorialMediaProps) {
  return (
    <figure
      data-editorial-placeholder
      style={ratio ? ({ aspectRatio: ratio } as CSSProperties) : undefined}
      className={`editorial-media editorial-media--${tone} ${compact ? 'editorial-media--compact' : ''} ${className}`}
    >
      <div aria-hidden="true" className="editorial-media__grid" />
      <span aria-hidden="true" className="editorial-media__axis editorial-media__axis--x" />
      <span aria-hidden="true" className="editorial-media__axis editorial-media__axis--y" />
      <div aria-hidden="true" className="editorial-media__mark"><span /><span /></div>
      <div className="editorial-media__top"><span>{index}</span><span>{eyebrow}</span></div>
      <figcaption className="editorial-media__caption">
        <p>{label}</p>
        {description ? <span>{description}</span> : null}
      </figcaption>
    </figure>
  );
}
