import { ButtonLink } from '@/components/ui/button-link';
import { clientPortalUrl } from '@/data/site';
import { portalCapabilities } from '@/data/home';
import Image from 'next/image';
import styles from './portal-section.module.css';

export function PortalSection() {
  return (
    <section id="portal" aria-labelledby="portal-title" className="section-space relative scroll-mt-20 overflow-hidden bg-petroleum text-white">
      <div aria-hidden="true" className="field-grid absolute inset-0 opacity-20" />
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
        <div>
          <p className="eyebrow text-eco">EcoEvent 360</p>
          <h2 id="portal-title" className="mt-5 font-display text-[clamp(2.7rem,5.4vw,5.4rem)] font-semibold leading-[.98] tracking-[-0.06em]">Tu gestión ambiental respaldada por datos.</h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/70">Infraestructura digital que respalda los servicios que requieren reportabilidad, organizando información y evidencia disponible de la operación.</p>
          <ol className="mt-9 grid grid-cols-3 border-y border-white/18 py-5">
            {['Ejecutamos', 'Medimos', 'Demostramos'].map((step, index) => <li key={step} className="border-r border-white/18 px-3 first:pl-0 last:border-r-0"><span className="font-display text-[.62rem] font-bold text-eco">0{index + 1}</span><p className="mt-2 font-display text-xs font-semibold uppercase tracking-[.1em] text-white/85 sm:text-sm">{step}</p></li>)}
          </ol>
          <ul className="mt-9 grid gap-x-7 gap-y-3 sm:grid-cols-2">
            {portalCapabilities.map((capability) => (
              <li key={capability} className="flex items-start gap-3 border-t border-white/15 pt-3 text-sm text-white/80"><span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-eco" />{capability}</li>
            ))}
          </ul>
          <ButtonLink href={clientPortalUrl} className="mt-10 !border-white !bg-white !text-forest hover:!bg-ivory">Acceder al portal <span aria-hidden="true">→</span></ButtonLink>
          <p className="mt-3 text-xs text-white/50">Enlace definitivo pendiente de confirmación.</p>
        </div>

        <div className={styles.deviceStage} aria-label="Representaciones visuales de EcoEvent 360 en computador y teléfono">
          <div className={styles.stageLabel}>
            <span>EcoEvent 360</span>
            <strong>Gestión visible en cada dispositivo</strong>
          </div>

          <figure className={styles.desktopDevice}>
            <Image
              src="/media/computador.png"
              alt="Representación visual referencial de EcoEvent 360 en un computador"
              fill
              sizes="(min-width: 1024px) 50vw, 94vw"
              className={styles.deviceImage}
            />
          </figure>

          <figure className={styles.phoneDevice}>
            <Image
              src="/media/Celular.png"
              alt="Representación visual referencial de EcoEvent 360 en un teléfono"
              fill
              sizes="(min-width: 1024px) 16vw, 38vw"
              className={styles.deviceImage}
            />
          </figure>

          <div className={styles.deviceMeta} aria-hidden="true">
            <span>01 · Escritorio</span>
            <span>02 · Móvil</span>
          </div>

          <p className={styles.referenceNote}>Visual referencial. Los nombres, eventos y cifras mostrados son ilustrativos y deben reemplazarse por información real aprobada.</p>
        </div>
      </div>
    </section>
  );
}
