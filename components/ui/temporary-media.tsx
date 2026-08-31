import Image from 'next/image';

type TemporaryMediaProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  objectPosition?: string;
  sizes?: string;
  priority?: boolean;
};

export function TemporaryMedia({
  src,
  alt,
  className = '',
  imageClassName = '',
  objectPosition = 'center',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false,
}: TemporaryMediaProps) {
  return (
    <figure data-temporary-media className={`relative isolate overflow-hidden rounded-[1.5rem] bg-petroleum ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${imageClassName}`}
        style={{ objectPosition }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest/75 via-transparent to-transparent" />
      <figcaption className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-forest/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-white backdrop-blur-sm sm:bottom-5 sm:left-5">
        Visual temporal · reemplazar
      </figcaption>
    </figure>
  );
}
