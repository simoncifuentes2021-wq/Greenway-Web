import Image from 'next/image';

type ReferenceMediaProps = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  disclaimer?: string;
};

export function ReferenceMedia({ src, alt, label = 'Referencia visual', className = '', imageClassName = '', priority = false, disclaimer = 'Imagen temporal · reemplazar por material real de Greenway' }: ReferenceMediaProps) {
  return (
    <figure data-reference-media className={`group relative isolate min-h-80 overflow-hidden bg-forest ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1024px) 50vw, 100vw" className={`object-cover ${imageClassName}`} />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest/78 via-transparent to-forest/12" />
      <div aria-hidden="true" className="absolute inset-4 border border-white/24" />
      <figcaption className="absolute inset-x-5 bottom-5 flex flex-col gap-2 text-white sm:inset-x-7 sm:bottom-7 sm:flex-row sm:items-end sm:justify-between">
        <p className="eyebrow text-eco">{label}</p>
        <p className="max-w-xs text-[.62rem] font-bold uppercase leading-4 tracking-[.13em] text-white/72 sm:text-right">{disclaimer}</p>
      </figcaption>
    </figure>
  );
}
