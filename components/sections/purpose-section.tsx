import { ReferenceMedia } from '@/components/ui/reference-media';
import { GreenwayFlow } from '@/components/living-system/greenway-flow';
import styles from './purpose-section.module.css';

export function PurposeSection() {
  return (
    <section aria-labelledby="proposito-title" className={styles.section}>
      <GreenwayFlow variant="connection" className={styles.path} />
      <div className={`container-site ${styles.layout}`}>
        <div className={styles.media}>
        <span className={styles.caption}>01 / El terreno</span>
        <ReferenceMedia src="/media/temporary/greenway-operations.jpg" alt="Referencia temporal de una operación de reciclaje en terreno" label="Operación en terreno" className={styles.photo} imageClassName="object-[58%_center]" />
        </div>
        <div className={styles.copy}>
          <h2 id="proposito-title" data-story-heading className={styles.title}>¿Qué nos impulsa?</h2>
          <div className="mt-8 max-w-2xl space-y-5 text-[clamp(1.05rem,1.5vw,1.25rem)] leading-8 text-charcoal/78">
            <p>Nos mueve la convicción de que cada evento puede ser una oportunidad para transformar e innovar, sin dejar una huella negativa.</p>
          </div>
        </div>
      </div>
      <div className={`container-site ${styles.bridge}`}><span>Del propósito a la operación</span><a href="#ecosistema-title">Explora cómo se conecta <span aria-hidden="true">↓</span></a></div>
    </section>
  );
}
