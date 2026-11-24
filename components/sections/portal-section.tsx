import { ButtonLink } from '@/components/ui/button-link';
import { clientPortalUrl } from '@/data/site';
import { portalCapabilities } from '@/data/home';
import Image from 'next/image';
import styles from './portal-section.module.css';
import { DepthSurface } from '@/components/animations/depth-surface';
import { GreenwayFlow } from '@/components/living-system/greenway-flow';
import { TechnologyExperience } from '@/components/living-system/technology-experience';

export function PortalSection() {
  return (
    <section id="portal" aria-labelledby="portal-title" className={`section-space relative scroll-mt-20 overflow-hidden text-white ${styles.section}`}>
      <GreenwayFlow variant="technology" className={styles.path} />
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
        <div>
          <p className="eyebrow text-eco">Greenway / AppGreenway</p>
          <h2 id="portal-title" data-story-heading className={styles.title}>Portal de gestión y trazabilidad</h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/75">Contamos con una <strong className="font-semibold text-white">plataforma digital exclusiva</strong> donde el cliente puede acceder a la información clave de los servicios contratados, en tiempo real y con total trazabilidad.</p>
          <h3 className="mt-8 font-display text-lg font-bold text-white">En este portal encontrarás:</h3>
          <ul className="mt-3 grid gap-x-7 gap-y-3 sm:grid-cols-2">
            {portalCapabilities.map((capability) => (
              <li key={capability} className="flex items-start gap-3 border-t border-white/15 pt-3 text-sm leading-6 text-white/85"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-eco" />{capability}</li>
            ))}
          </ul>
          <p className="mt-7 max-w-xl text-sm leading-6 text-white/70">Esta herramienta fortalece la transparencia y te permite demostrar el compromiso ambiental de tu evento ante auspiciadores, instituciones o auditorías. La plataforma está pensada para los servicios que requieren reportabilidad y trazabilidad.</p>
          <ButtonLink href={clientPortalUrl} className="mt-10 !border-white !bg-white !text-forest hover:!bg-ivory">Acceder al portal <span aria-hidden="true">→</span></ButtonLink>
          <p id="portal-pendiente" tabIndex={-1} className="mt-3 text-xs text-white/70">Enlace definitivo pendiente de confirmación.</p>
        </div>

        <TechnologyExperience>
        <DepthSurface loadImagesNearViewport className={styles.deviceStage} label="Representaciones visuales de AppGreenway en computador y teléfono">
          <div className={styles.stageLabel}>
            <span>AppGreenway</span>
            <strong>Gestión visible en cada dispositivo</strong>
          </div>

          <figure data-depth-plane data-device-plane="desktop" className={styles.desktopDevice}>
            <Image
              src="/media/computador.png"
              alt="Representación visual referencial de AppGreenway en un computador"
              fill
              sizes="(min-width: 1024px) 50vw, 94vw"
              className={styles.deviceImage}
            />
          </figure>

          <figure data-depth-plane data-device-plane="phone" className={styles.phoneDevice}>
            <Image
              src="/media/Celular.png"
              alt="Representación visual referencial de AppGreenway en un teléfono"
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
        </DepthSurface>
        </TechnologyExperience>
      </div>
    </section>
  );
}
