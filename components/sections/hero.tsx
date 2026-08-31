import { ButtonLink } from '@/components/ui/button-link';
import { getImageProps } from 'next/image';
import styles from './hero.module.css';

export function Hero() {
  const commonImageProps = {
    alt: 'Vista aérea referencial de un evento con infraestructura para gestión ambiental',
    sizes: '100vw',
    fetchPriority: 'high' as const,
  };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...commonImageProps,
    src: '/media/temporary/header.png',
    width: 1672,
    height: 941,
    quality: 85,
  });
  const {
    props: { srcSet: mobileSrcSet, ...mobileImageProps },
  } = getImageProps({
    ...commonImageProps,
    src: '/media/temporary/headercelular.png',
    width: 941,
    height: 1672,
    quality: 82,
  });

  return (
    <section id="home-hero" aria-labelledby="home-hero-title" className="relative isolate flex min-h-[100svh] overflow-hidden bg-forest pt-24 text-white">
      <picture className={`absolute inset-0 -z-30 ${styles.media}`}>
        <source media="(min-width: 640px)" srcSet={desktopSrcSet} />
        <source media="(max-width: 639px)" srcSet={mobileSrcSet} />
        <img {...mobileImageProps} alt={commonImageProps.alt} className={styles.image} />
      </picture>
      <div className="container-site grid min-w-0 items-stretch">
        <div className="flex min-w-0 max-w-[49rem] flex-col justify-end pb-14 pt-20 lg:pb-20 lg:pt-28">
          <div className={`flex items-center gap-4 ${styles.eyebrow}`}><span aria-hidden="true" className={`size-2 rounded-full bg-eco ${styles.signal}`} /><p className="eyebrow text-eco">Gestión ambiental en terreno</p></div>
          <h1 id="home-hero-title" className={`display-title mt-7 max-w-5xl text-balance ${styles.title}`}>Hacemos eventos más sustentables.</h1>
          <p className={`body-lead mt-8 max-w-2xl text-white/72 ${styles.description}`}>Transformamos el impacto ambiental de eventos, producciones y organizaciones mediante soluciones concretas, trazables y adaptadas a cada proyecto.</p>
          <div className={`mt-9 flex flex-col gap-3 sm:flex-row ${styles.actions}`}>
            <ButtonLink href="/cotizar" className="!border-white !bg-white !text-forest hover:!bg-ivory">Cotizar servicio <span aria-hidden="true">→</span></ButtonLink>
            <ButtonLink href="/servicios" variant="secondary" className="!border-white/50 !text-white hover:!bg-white hover:!text-forest">Conocer nuestros servicios</ButtonLink>
          </div>
          <div className={`mt-14 grid max-w-2xl grid-cols-3 border-y border-white/15 py-5 ${styles.proof}`}>
            {['Ejecución', 'Soluciones', 'Trazabilidad'].map((item, index) => <div key={item} className="border-r border-white/15 px-3 first:pl-0 last:border-r-0"><p className="font-display text-[.62rem] font-bold text-eco">0{index + 1}</p><p className="mt-2 text-xs font-semibold text-white/72 sm:text-sm">{item}</p></div>)}
          </div>
        </div>
      </div>
      <p className={`absolute bottom-4 right-4 z-10 border border-white/25 bg-forest/78 px-3 py-2 text-[.58rem] font-bold uppercase tracking-[.14em] text-white/78 sm:bottom-6 sm:right-6 ${styles.reference}`}>Referencia visual · reemplazar por material real</p>
      <span id="home-hero-header-boundary" aria-hidden="true" className="pointer-events-none absolute bottom-[100px] left-0 size-px" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/15" />
    </section>
  );
}
