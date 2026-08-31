import Image from 'next/image';
import Link from 'next/link';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="site-logo inline-flex shrink-0 items-center" aria-label="Greenway, inicio">
      <Image
        src="/media/logo.png"
        alt=""
        width={2172}
        height={724}
        priority
        sizes="(min-width: 640px) 150px, 132px"
        className={`h-auto w-[8.25rem] sm:w-[9.4rem] ${light ? '' : '[filter:brightness(0)_saturate(100%)_invert(20%)_sepia(18%)_saturate(1215%)_hue-rotate(113deg)_brightness(88%)_contrast(91%)]'}`}
      />
    </Link>
  );
}
