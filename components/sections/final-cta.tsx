import { ButtonLink } from '@/components/ui/button-link';
import { GreenwayFlow } from '@/components/living-system/greenway-flow';
import styles from './final-cta.module.css';

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className={styles.section}>
      <GreenwayFlow variant="connection" className={styles.path} />
      <div className="container-site relative grid lg:grid-cols-[1.35fr_.65fr]">
        <div className="py-16 lg:border-r lg:border-forest/20 lg:py-28 lg:pr-16">
          <p className="eyebrow text-forest/65">Próximo proyecto</p>
          <h2 id="final-cta-title" className={styles.title}>Hagamos más sustentable tu próximo proyecto.</h2>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/cotizar">Cotizar servicio <span aria-hidden="true">→</span></ButtonLink>
            <button type="button" disabled aria-describedby="whatsapp-pending" className="inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-[.6rem] border border-forest/30 px-5 py-3 text-sm font-semibold text-forest/55">Hablar por WhatsApp</button>
          </div>
          <p id="whatsapp-pending" className="mt-3 text-xs text-forest/60">Disponible cuando se confirme el número oficial.</p>
        </div>
        <div aria-hidden="true" className={styles.closing}><span>El siguiente paso</span><span className={styles.arrow}>↗</span><p>Greenway / 360°</p></div>
        </div>
    </section>
  );
}
