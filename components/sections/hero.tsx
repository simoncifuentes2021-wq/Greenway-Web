import { ButtonLink } from '@/components/ui/button-link';
import { getImageProps } from 'next/image';
import { DepthSurface } from '@/components/animations/depth-surface';
import { GreenwayFlow } from '@/components/living-system/greenway-flow';
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
    quality: 75,
  });
  const {
    props: { srcSet: mobileSrcSet, ...mobileImageProps },
  } = getImageProps({
    ...commonImageProps,
    src: '/media/temporary/headercelular.png',
    width: 941,
    height: 1672,
    quality: 75,
  });

  return (
    <section id="home-hero" aria-labelledby="home-hero-title" className={styles.hero}>
      <DepthSurface className={styles.scene}>
      <div data-depth-plane className={styles.photoPlane}>
      <picture className={styles.media}>
        <source media="(min-width: 640px)" srcSet={desktopSrcSet} />
        <source media="(max-width: 639px)" srcSet={mobileSrcSet} />
        <img {...mobileImageProps} alt={commonImageProps.alt} className={styles.image} />
      </picture>
      </div>
      <div className={styles.shade} aria-hidden="true" />
      <GreenwayFlow variant="hero" className={styles.route} />
      <div className={`container-site ${styles.layout}`}>
        <div className={styles.content}>
          <h1 id="home-hero-title" className={styles.title}>Sostenibilidad en cada evento</h1>
          <div className={styles.bottomGrid}>
            <p className={styles.description}>Creamos soluciones ambientales concretas y medibles para cada evento, producción y organización.</p>
            <div className={styles.actions}>
              <ButtonLink href="/cotizar" className="!border-white !bg-white !text-forest hover:!bg-ivory">Cotizar servicio <span aria-hidden="true">→</span></ButtonLink>
              <ButtonLink href="/servicios" variant="secondary" className="!border-white/50 !text-white hover:!bg-white hover:!text-forest">Conocer nuestros servicios</ButtonLink>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.reference}>Referencia visual · reemplazar por material real</p>
      </DepthSurface>
      <span id="home-hero-header-boundary" aria-hidden="true" className="pointer-events-none absolute bottom-[100px] left-0 size-px" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/15" />
    </section>
  );
}
