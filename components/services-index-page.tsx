import { InternalFlow } from '@/components/living-system/internal-flow';
import { ServicesEcosystem } from '@/components/sections/services-ecosystem';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { ButtonLink } from '@/components/ui/button-link';
import { ServiceIcon } from '@/components/ui/service-icon';
import { services } from '@/data/site';

const serviceGroups = [
  {
    number: '01',
    title: 'Operación ambiental y sanitaria',
    description: 'Para ejecutar en terreno la limpieza, separación, gestión y recuperación de los residuos de una operación.',
    slugs: ['reciclaje', 'limpieza', 'manejo-de-residuos', 'economia-circular'],
  },
  {
    number: '02',
    title: 'Medición, planificación y reportabilidad',
    description: 'Para comprender impactos, definir acciones y respaldar la gestión mediante información organizada.',
    slugs: ['huella-de-carbono', 'asesoria-ambiental', 'gestion-y-trazabilidad'],
  },
  {
    number: '03',
    title: 'Energía y movilidad',
    description: 'Para incorporar soluciones solares y alternativas de desplazamiento en eventos, faenas y recintos.',
    slugs: ['energias-renovables', 'movilidad-sostenible'],
  },
  {
    number: '04',
    title: 'Soluciones para industria audiovisual',
    description: 'Para integrar criterios ambientales en la planificación y operación de producciones audiovisuales.',
    slugs: ['sustentabilidad-audiovisual'],
  },
] as const;

export function ServicesIndexPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="internal-hero pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
          <InternalFlow />
          <div className="container-site">
            <Breadcrumbs light items={[{ name: 'Inicio', href: '/' }, { name: 'Servicios', href: '/servicios' }]} />
            <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
              <div>
                <p className="eyebrow text-eco">Servicios ambientales y sanitarios</p>
                <h1 className="display-title mt-5 max-w-5xl">Soluciones conectadas para cada operación.</h1>
              </div>
              <div className="max-w-xl lg:justify-self-end">
                <p className="text-lg leading-8 text-white/72">Encuentra la solución según lo que necesitas ejecutar, medir o planificar. Greenway adapta cada servicio al contexto y los requerimientos del proyecto.</p>
                <ButtonLink href="/cotizar" className="mt-8 !border-white !bg-white !text-forest hover:!bg-ivory">Cotizar servicio <span aria-hidden="true">→</span></ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <ServicesEcosystem />
        <section aria-labelledby="service-groups-title" className="section-space bg-ivory">
          <div className="container-site">
            <div className="max-w-3xl">
              <p className="eyebrow text-petroleum">Ecosistema de servicios</p>
              <h2 id="service-groups-title" className="mt-5 font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-none tracking-[-0.055em] text-forest">¿Qué necesita resolver tu proyecto?</h2>
            </div>

            <div className="mt-14 divide-y divide-line border-y border-line">
              {serviceGroups.map((group, groupIndex) => {
                const groupServices = group.slugs.map((slug) => services.find((service) => service.slug === slug)).filter((service): service is (typeof services)[number] => Boolean(service));
                return (
                  <article key={group.number} className={`grid gap-8 py-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20 lg:py-16 ${groupIndex === 1 ? '-mx-[var(--page-gutter)] bg-forest px-[var(--page-gutter)] text-white' : ''}`}>
                    <div className={groupIndex % 2 === 1 ? 'lg:order-2' : ''}>
                      <p className="font-display text-sm font-bold text-eco">{group.number}</p>
                      <h3 className={`mt-5 font-display text-3xl font-semibold tracking-[-0.045em] sm:text-4xl ${groupIndex === 1 ? 'text-white' : 'text-forest'}`}>{group.title}</h3>
                      <p className={`mt-5 max-w-lg text-base leading-7 ${groupIndex === 1 ? 'text-white/65' : 'text-muted'}`}>{group.description}</p>
                    </div>
                    <ul className={`${groupIndex % 2 === 1 ? 'lg:order-1' : ''} border-t ${groupIndex === 1 ? 'border-white/18' : 'border-line'}`}>
                      {groupServices.map((service) => (
                        <li key={service.slug} className={`border-b ${groupIndex === 1 ? 'border-white/18' : 'border-line'}`}>
                          <Link href={`/servicios/${service.slug}`} className="group grid gap-3 py-6 sm:grid-cols-[3rem_.7fr_1.3fr_auto] sm:items-start sm:gap-6">
                            <span className={`grid size-10 place-items-center rounded-full border ${groupIndex === 1 ? 'border-white/25 text-eco' : 'border-line text-petroleum'}`}><ServiceIcon slug={service.slug} className="size-5" /></span>
                            <span className={`font-display text-xl font-semibold tracking-[-0.03em] ${groupIndex === 1 ? 'text-white' : 'text-forest'}`}>{service.name}</span>
                            <span className={`text-sm leading-6 ${groupIndex === 1 ? 'text-white/62' : 'text-muted'}`}>{service.description}</span>
                            <span aria-hidden="true" className={groupIndex === 1 ? 'text-eco' : 'text-forest'}>→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section aria-labelledby="services-cta-title" className="bg-eco py-16 sm:py-20 lg:py-28">
          <div className="container-site">
            <p className="eyebrow text-forest/65">Solución personalizada</p>
            <h2 id="services-cta-title" className="mt-5 max-w-5xl font-display text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[.95] tracking-[-0.065em] text-forest">¿Necesitas combinar varios servicios?</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-forest/70">Cuéntanos el contexto de tu operación. Greenway puede planificar una solución conectada según sus requerimientos.</p>
            <ButtonLink href="/cotizar" className="mt-9">Cotizar servicio <span aria-hidden="true">→</span></ButtonLink>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
