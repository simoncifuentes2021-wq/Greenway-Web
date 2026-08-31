import Link from 'next/link';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { ButtonLink } from '@/components/ui/button-link';
import { ServiceIcon } from '@/components/ui/service-icon';
import { ReferenceMedia } from '@/components/ui/reference-media';
import type { ServicePageContent } from '@/data/service-pages';
import { services } from '@/data/site';

export function ServiceDetailPage({ service }: { service: ServicePageContent }) {
  const mode = getServiceMode(service.slug);
  return (
    <>
      <SiteHeader />
      <main data-service-mode={mode}>
        <ServiceHero service={service} />
        <ServiceIntroduction service={service} />
        <ServiceFeatures service={service} />
        <ServiceProcess service={service} />
        <ServiceProof service={service} />
        <ServiceApplications service={service} />
        <ServiceRelated service={service} />
        <ServiceCta service={service} />
      </main>
      <SiteFooter />
    </>
  );
}

function ServiceHero({ service }: { service: ServicePageContent }) {
  const serviceIndex = services.findIndex((item) => item.slug === service.slug);
  const mediaFirst = serviceIndex % 3 === 1;
  return (
    <section className={`internal-hero pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36 ${getServiceMode(service.slug) === 'insight' ? '!bg-petroleum' : ''}`}>
      <div className="container-site">
        <Breadcrumbs
          light
          items={[
            { name: 'Inicio', href: '/' },
            { name: 'Servicios', href: '/servicios' },
            { name: service.eyebrow, href: `/servicios/${service.slug}` },
          ]}
        />
        <div className="mt-12 grid items-end gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-20">
          <div className={mediaFirst ? 'lg:order-2' : ''}>
            <div className="flex items-center gap-4"><span className="grid size-12 place-items-center rounded-full border border-white/25 text-eco"><ServiceIcon slug={service.slug} className="size-6" /></span><p className="eyebrow text-eco">{service.eyebrow}</p></div>
            <h1 className="display-title mt-6 max-w-4xl text-balance">{service.title}</h1>
            <p className="mt-7 max-w-2xl text-[clamp(1.05rem,1.5vw,1.25rem)] leading-8 text-white/75">{service.heroDescription}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/cotizar?servicio=${service.slug}`} className="!border-white !bg-white !text-forest hover:!bg-ivory">Cotizar servicio <span aria-hidden="true">→</span></ButtonLink>
              <ButtonLink href="/servicios" variant="secondary" className="!border-white/45 !text-white hover:!bg-white hover:!text-forest">Conocer otros servicios</ButtonLink>
            </div>
          </div>
          <div className={mediaFirst ? 'lg:order-1' : ''}><ReferenceMedia src={getServiceReference(service.slug)} alt={`Referencia visual temporal para el servicio ${service.eyebrow}`} label={`${service.eyebrow} / referencia`} className="min-h-[320px] sm:min-h-[400px] lg:min-h-[520px]" priority /></div>
        </div>
      </div>
    </section>
  );
}

function ServiceIntroduction({ service }: { service: ServicePageContent }) {
  return (
    <section aria-labelledby="service-introduction-title" className="section-space bg-ivory">
      <div className="container-site grid gap-12 lg:grid-cols-[.86fr_1.14fr] lg:gap-20">
        <div>
          <p className="eyebrow text-petroleum">Qué resuelve</p>
          <h2 id="service-introduction-title" className="mt-5 font-display text-[clamp(2.4rem,5vw,4.7rem)] font-semibold leading-none tracking-[-0.055em] text-forest">{service.introductionTitle}</h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">{service.introduction}</p>
        </div>
        <ol className="self-end border-y border-line">
          {service.outcomes.map((outcome, index) => (
            <li key={outcome} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-5 last:border-b-0 sm:py-6">
              <span className="font-display text-xs font-bold text-eco">0{index + 1}</span>
              <span className="font-display text-lg font-semibold leading-7 tracking-[-0.025em] text-forest sm:text-xl">{outcome}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ServiceFeatures({ service }: { service: ServicePageContent }) {
  const mode = getServiceMode(service.slug);
  return (
    <section aria-labelledby="service-features-title" className="section-space bg-white">
      <div className="container-site">
        <div className="grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow text-petroleum">Alcance del servicio</p>
            <h2 id="service-features-title" className="mt-5 font-display text-[clamp(2.4rem,5vw,4.7rem)] font-semibold leading-none tracking-[-0.055em] text-forest">{service.featureTitle}</h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-muted lg:justify-self-end">{service.featureIntroduction}</p>
        </div>

        {service.solutions ? <ServiceSolutions solutions={service.solutions} /> : (
          <div className={`mt-14 grid border-t border-line ${mode === 'operational' ? 'md:grid-cols-[1.2fr_.9fr_.9fr]' : mode === 'insight' ? 'md:grid-cols-[.9fr_1.2fr_.9fr]' : 'md:grid-cols-3'}`}>
            {service.featureGroups.map((group, index) => (
              <article key={group.title} className="border-b border-line py-8 md:px-7 md:first:pl-0 md:last:pr-0">
                <p className="font-display text-xs font-bold text-eco">0{index + 1}</p>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.035em] text-forest">{group.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{group.description}</p>
                <ul className="mt-6 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-charcoal/80">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-eco" />{item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ServiceSolutions({ solutions }: { solutions: NonNullable<ServicePageContent['solutions']> }) {
  return (
    <div className="mt-14 divide-y divide-line border-y border-line">
      {solutions.map((solution, index) => (
        <article key={solution.title} className="grid gap-9 py-12 lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-20">
          <ReferenceMedia src="/media/temporary/greenway-clean-energy.jpg" alt={`Referencia visual temporal para ${solution.title}`} label={`Equipo técnico / referencia 0${index + 1}`} className={`min-h-[340px] sm:min-h-[460px] ${index % 2 === 1 ? 'lg:order-2' : ''}`} imageClassName={index === 0 ? 'object-[38%_center]' : 'object-[78%_center]'} />
          <div>
            <p className="font-display text-sm font-bold text-eco">0{index + 1}</p>
            <h3 className="mt-5 font-display text-[clamp(2.1rem,4vw,3.8rem)] font-semibold leading-none tracking-[-0.05em] text-forest">{solution.title}</h3>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{solution.description}</p>
            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-7">
              {solution.specs.map((spec) => (
                <div key={spec.label} className="border-t border-line pt-4">
                  <dt className="text-xs leading-5 text-muted">{spec.label}</dt>
                  <dd className="mt-1 font-display text-xl font-semibold tracking-[-0.03em] text-forest sm:text-2xl">{spec.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[.14em] text-muted">Aplicaciones</p>
            <p className="mt-2 text-sm leading-6 text-charcoal/75">{solution.applications.join(' · ')}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function ServiceProcess({ service }: { service: ServicePageContent }) {
  return (
    <section aria-labelledby="service-process-title" className="section-space bg-ivory">
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="eyebrow text-petroleum">Cómo trabajamos</p>
          <h2 id="service-process-title" className="mt-5 font-display text-[clamp(2.4rem,5vw,4.7rem)] font-semibold leading-none tracking-[-0.055em] text-forest">Un proceso ajustado a cada operación</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">Cada proyecto se planifica de forma personalizada, desde la comprensión del contexto hasta el cierre y la información disponible del servicio.</p>
        </div>
        <ol className="relative mt-14 grid gap-0 md:grid-cols-5 md:border-t md:border-line">
          {service.steps.map((step, index) => (
            <li key={step.title} className="relative border-l border-line pb-10 pl-8 last:pb-0 md:border-l-0 md:pb-0 md:pl-0 md:pr-6 md:pt-9">
              <span aria-hidden="true" className="absolute -left-[5px] top-1 size-2.5 rounded-full bg-eco md:-top-[5px] md:left-0" />
              <p className="font-display text-sm font-bold text-eco">0{index + 1}</p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.03em] text-forest">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ServiceProof({ service }: { service: ServicePageContent }) {
  return (
    <section aria-labelledby="service-proof-title" className="section-space bg-petroleum text-white">
      <div className="container-site grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="eyebrow text-eco">Evidencia y trazabilidad</p>
          <h2 id="service-proof-title" className="mt-5 font-display text-[clamp(2.4rem,5vw,4.7rem)] font-semibold leading-none tracking-[-0.055em]">{service.proofTitle}</h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/70">{service.proofDescription}</p>
          {service.portalRelevant ? (
            <ButtonLink href="/#portal" className="mt-9 !border-white !bg-white !text-forest hover:!bg-ivory">Conocer EcoEvent 360 <span aria-hidden="true">→</span></ButtonLink>
          ) : null}
        </div>
        <ul className="self-end border-y border-white/20">
          {service.proofItems.map((item, index) => (
            <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/20 py-5 last:border-b-0">
              <span className="font-display text-xs font-bold text-eco">0{index + 1}</span>
              <span className="font-display text-lg font-semibold tracking-[-0.025em] text-white/90">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceApplications({ service }: { service: ServicePageContent }) {
  return (
    <section aria-labelledby="service-applications-title" className="section-space bg-white">
      <div className="container-site grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow text-petroleum">Aplicaciones</p>
          <h2 id="service-applications-title" className="mt-5 font-display text-[clamp(2.4rem,5vw,4.7rem)] font-semibold leading-none tracking-[-0.055em] text-forest">{service.applicationsTitle}</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{service.applicationsIntroduction}</p>
        </div>
        <ul className="grid content-end gap-px bg-line sm:grid-cols-2">
          {service.applications.map((application) => (
            <li key={application} className="flex min-h-28 items-end bg-ivory p-6 font-display text-lg font-semibold tracking-[-0.025em] text-forest">{application}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceRelated({ service }: { service: ServicePageContent }) {
  const related = service.relatedSlugs
    .map((slug) => services.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is (typeof services)[number] => Boolean(candidate));

  return (
    <section aria-labelledby="related-services-title" className="border-y border-line bg-ivory py-14 lg:py-20">
      <div className="container-site">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-petroleum">Servicios relacionados</p>
            <h2 id="related-services-title" className="mt-3 font-display text-3xl font-semibold tracking-[-0.045em] text-forest sm:text-4xl">Conecta esta solución con el resto de la operación.</h2>
          </div>
          <Link href="/proyectos" className="text-sm font-semibold text-forest underline-offset-4 hover:underline">Ver proyectos <span aria-hidden="true">→</span></Link>
        </div>
        <div className="mt-10 grid gap-px bg-line md:grid-cols-2">
          {related.map((item) => (
            <Link key={item.slug} href={`/servicios/${item.slug}`} className="group flex min-h-44 flex-col justify-between bg-white p-6 sm:p-8">
              <span className="eyebrow text-muted">Servicio</span>
              <span>
                <span className="font-display text-2xl font-semibold tracking-[-0.035em] text-forest">{item.name}</span>
                <span className="mt-3 block max-w-xl text-sm leading-6 text-muted">{item.description}</span>
                <span className="mt-5 inline-flex text-sm font-semibold text-forest">Conocer servicio <span aria-hidden="true" className="ml-2 transition-transform group-hover:translate-x-1">→</span></span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCta({ service }: { service: ServicePageContent }) {
  return (
    <section aria-labelledby="service-cta-title" className="bg-eco py-16 sm:py-20 lg:py-28">
      <div className="container-site">
        <p className="eyebrow text-forest/65">Próximo paso</p>
        <h2 id="service-cta-title" className="mt-5 max-w-5xl font-display text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[.95] tracking-[-0.065em] text-forest">Planifiquemos este servicio para tu proyecto.</h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-forest/70">Cuéntanos el contexto y los requerimientos de la operación para preparar una propuesta de {service.eyebrow.toLocaleLowerCase('es-CL')}.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/cotizar?servicio=${service.slug}`}>Cotizar servicio <span aria-hidden="true">→</span></ButtonLink>
          <ButtonLink href="/servicios" variant="secondary">Conocer otros servicios</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function getServiceMode(slug: string) {
  if (['reciclaje', 'limpieza', 'manejo-de-residuos', 'economia-circular'].includes(slug)) return 'operational';
  if (['huella-de-carbono', 'asesoria-ambiental'].includes(slug)) return 'insight';
  if (['energias-renovables', 'movilidad-sostenible'].includes(slug)) return 'infrastructure';
  return 'specialty';
}

function getServiceReference(slug: string) {
  if (slug === 'energias-renovables' || slug === 'movilidad-sostenible') return '/media/temporary/greenway-clean-energy.jpg';
  if (slug === 'sustentabilidad-audiovisual') return '/media/temporary/greenway-audiovisual.jpg';
  if (slug === 'huella-de-carbono' || slug === 'asesoria-ambiental' || slug === 'gestion-y-trazabilidad') return '/media/temporary/greenway-field-assessment.jpg';
  return '/media/temporary/greenway-operations.jpg';
}
