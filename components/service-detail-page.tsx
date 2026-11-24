import { InternalFlow } from '@/components/living-system/internal-flow';
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
  if (service.slug === 'limpieza') return <CleaningLanding />;
  const mode = getServiceMode(service.slug);
  return (
    <>
      <SiteHeader />
      <main data-service-mode={mode}>
        <ServiceHero service={service} />
        <ServiceIntroduction service={service} />
        <ServiceFeatures service={service} />
        {service.slug !== 'reciclaje' && <ServiceProcess service={service} />}
        <ServiceProof service={service} />
        <ServiceApplications service={service} />
        <ServiceRelated service={service} />
        <ServiceCta service={service} />
      </main>
      <SiteFooter />
    </>
  );
}

const cleaningOptions = [
  {
    title: 'Limpieza en eventos',
    description: 'Personal, supervisión y coordinación para mantener los espacios limpios antes, durante y después de cada evento.',
    href: '/servicios/limpieza/eventos',
    image: '/media/limpieza/Imagen2.jpg',
    alt: 'Estación de lavado de vasos reutilizables instalada en un evento',
    label: 'EVENTOS Y PRODUCCIONES',
  },
  {
    title: 'Limpieza domiciliaria profunda',
    description: 'Limpieza detallada de espacios del hogar, planificada según las condiciones y necesidades de cada vivienda.',
    href: '/servicios/limpieza/domiciliaria',
    image: '/media/limpieza/Imagen1.jpg',
    alt: 'Living de una vivienda para servicio de limpieza domiciliaria profunda',
    label: 'HOGAR',
  },
];

function CleaningLanding() {
  return (
    <>
      <SiteHeader />
      <main className="bg-ivory">
        <section className="section-space">
          <div className="container-site">
            <Breadcrumbs light={false} items={[{ name: 'Inicio', href: '/' }, { name: 'Servicios', href: '/servicios' }, { name: 'Limpieza', href: '/servicios/limpieza' }]} />
            <div className="mx-auto mt-14 max-w-3xl text-center">
              <p className="eyebrow text-petroleum">Servicio de limpieza</p>
              <h1 className="mt-5 font-display text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[.98] tracking-[-0.06em] text-forest">Limpieza integral</h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">Soluciones profesionales para eventos y hogares, diseñadas según cada espacio y necesidad.</p>
            </div>
            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {cleaningOptions.map((option) => (
                <Link key={option.href} href={option.href} className="group overflow-hidden bg-white transition-shadow duration-500 hover:shadow-[0_24px_70px_rgba(18,52,44,.14)]">
                  <ReferenceMedia src={option.image} alt={option.alt} label={option.label} disclaimer="" className="min-h-[300px] sm:min-h-[420px]" />
                  <div className="flex items-start justify-between gap-6 p-7 sm:p-9">
                    <div>
                      <p className="eyebrow text-eco">{option.label}</p>
                      <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-forest sm:text-4xl">{option.title}</h2>
                      <p className="mt-4 max-w-xl leading-7 text-muted">{option.description}</p>
                    </div>
                    <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-full border border-line text-forest transition-transform duration-500 group-hover:translate-x-1">↗</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
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
      <InternalFlow />
      <div className="container-site">
        <Breadcrumbs
          light
          items={[
            { name: 'Inicio', href: '/' },
            { name: 'Servicios', href: '/servicios' },
            { name: service.eyebrow, href: `/servicios/${service.slug}` },
          ]}
        />
        <div className={`mt-12 grid gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-20 ${service.slug === 'reciclaje' ? 'items-center' : 'items-end'}`}>
          <div className={mediaFirst ? 'lg:order-2' : ''}>
            {service.slug === 'reciclaje' ? null : <div className="flex items-center gap-4"><span className="grid size-12 place-items-center rounded-full border border-white/25 text-eco"><ServiceIcon slug={service.slug} className="size-6" /></span><p className="eyebrow text-eco">{service.eyebrow}</p></div>}
            <h1 className={`display-title max-w-4xl text-balance ${service.slug === 'reciclaje' ? '' : 'mt-6'}`}>{service.title}</h1>
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
  if (service.slug === 'sustentabilidad-audiovisual') {
    return (
      <section aria-labelledby="service-introduction-title" className="section-space bg-ivory">
        <div className="container-site">
          <div className="mx-auto max-w-4xl">
            <h2 id="service-introduction-title" className="text-center font-display text-[clamp(2.4rem,5vw,4.3rem)] font-semibold leading-none tracking-[-0.055em] text-forest">{service.introductionTitle}</h2>
            <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
              <p>{service.introduction}</p>
              {service.introductionDetails?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (['manejo-de-residuos', 'movilidad-sostenible'].includes(service.slug)) {
    return (
      <section aria-labelledby="service-introduction-title" className="section-space bg-ivory">
        <div className="container-site">
          <div className="mx-auto max-w-4xl text-center">
            <h2 id="service-introduction-title" className="font-display text-[clamp(2.6rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.055em] text-forest">{service.introductionTitle}</h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted">{service.introduction}</p>
          </div>
          <div className="mx-auto mt-12 max-w-5xl">
            <h3 className="mb-4 font-display text-xl font-bold text-forest">{service.includesTitle ?? 'Incluye'}</h3>
            <ul className="divide-y divide-line border-y border-line">
              {service.includes?.map((item) => (
                <li key={item.highlight} className="grid grid-cols-[1.25rem_1fr] gap-3 py-5 text-base leading-7 text-charcoal/85 sm:py-6">
                  <span aria-hidden="true" className="mt-2.5 size-2 rounded-full bg-eco" />
                  <p><strong className="font-semibold text-forest">{item.highlight}</strong> {item.description}</p>
                </li>
              ))}
            </ul>
            {service.closingNote ? <p className="mt-7 border-l-2 border-eco pl-5 text-base leading-7 text-muted sm:text-lg">{service.closingNote}</p> : null}
            {service.closingParagraphs?.map((paragraph) => <p key={paragraph} className="mt-5 text-base leading-7 text-muted sm:text-lg">{paragraph}</p>)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="service-introduction-title" className="section-space bg-ivory">
      <div className="container-site grid gap-12 lg:grid-cols-[.86fr_1.14fr] lg:gap-20">
        <div>
          {!['reciclaje', 'economia-circular', 'huella-de-carbono', 'asesoria-ambiental'].includes(service.slug) && <p className="eyebrow text-petroleum">Qué resuelve</p>}
          <h2 id="service-introduction-title" className={`${service.slug === 'reciclaje' ? '' : 'mt-5'} font-display text-[clamp(2.4rem,5vw,4.7rem)] font-semibold leading-none tracking-[-0.055em] text-forest`}>{service.introductionTitle}</h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">{service.introduction}</p>
        </div>
        {['economia-circular', 'huella-de-carbono', 'asesoria-ambiental'].includes(service.slug) ? (
          <div className="self-end">
            <p className="mb-4 font-display text-xl font-bold text-forest">Incluye:</p>
            <ul className="divide-y divide-line border-y border-line">
              {service.outcomes.map((outcome) => <li key={outcome} className="grid grid-cols-[1.25rem_1fr] gap-3 py-4 text-base leading-7 text-charcoal/85 sm:py-5"><span aria-hidden="true" className="mt-3 size-2 rounded-full bg-eco" />{outcome}</li>)}
            </ul>
          </div>
        ) : (
          <ol className="self-end border-y border-line">
            {service.outcomes.map((outcome, index) => (
              <li key={outcome} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-5 last:border-b-0 sm:py-6">
                <span className="font-display text-xs font-bold text-eco">0{index + 1}</span>
                <span className="font-display text-lg font-semibold leading-7 tracking-[-0.025em] text-forest sm:text-xl">{outcome}</span>
              </li>
            ))}
          </ol>
        )}
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

        {service.slug === 'reciclaje' ? (
          <ul className="mt-12 divide-y divide-line border-y border-line">
            {service.featureGroups.map((item) => (
              <li key={item.title} className="grid gap-2 py-6 text-base leading-7 text-charcoal/80 md:grid-cols-[minmax(16rem,.7fr)_1.3fr] md:gap-8 md:py-7">
                <h3 className="font-display font-bold text-forest">{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        ) : service.solutions ? <ServiceSolutions solutions={service.solutions} /> : (
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
            {solution.details?.map((detail) => <p key={detail} className="mt-4 max-w-xl text-base leading-7 text-muted">{detail}</p>)}
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
            <ButtonLink href="/#portal" className="mt-9 !border-white !bg-white !text-forest hover:!bg-ivory">Conocer AppGreenway <span aria-hidden="true">→</span></ButtonLink>
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
  if (service.slug === 'reciclaje') {
    const recyclingProjects = [
      {
        title: 'Reciclaje en eventos masivos',
        description: 'Diseño de flujos, puntos limpios y orientación al público durante la operación.',
        image: '/media/temporary/greenway-hero-event.jpg',
        alt: 'Vista referencial de un evento masivo al aire libre',
      },
      {
        title: 'Gestión de residuos en producción',
        description: 'Separación de materiales y coordinación de equipos en una producción en terreno.',
        image: '/media/temporary/greenway-operations.jpg',
        alt: 'Vista referencial de una operación ambiental en terreno',
      },
      {
        title: 'Puntos limpios y clasificación',
        description: 'Infraestructura señalizada para facilitar la clasificación y el acopio de materiales.',
        image: '/media/temporary/greenway-field-assessment.jpg',
        alt: 'Vista referencial de trabajo ambiental en terreno',
      },
    ];

    return (
      <section aria-labelledby="service-applications-title" className="section-space bg-ivory">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="eyebrow text-petroleum">Reciclaje en terreno</p>
            <h2 id="service-applications-title" className="mt-5 font-display text-[clamp(2.4rem,5vw,4.7rem)] font-semibold leading-none tracking-[-0.055em] text-forest">Proyectos de reciclaje</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">Así puede presentarse el trabajo de reciclaje en eventos y producciones, desde la planificación hasta el cierre.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {recyclingProjects.map((project, index) => (
              <article key={project.title}>
                <ReferenceMedia src={project.image} alt={project.alt} label={`Referencia visual 0${index + 1}`} className="min-h-[260px] sm:min-h-[320px]" />
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.035em] text-forest">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-xs leading-5 text-muted">Imágenes y descripciones referenciales; reemplazar por registros de proyectos reales aprobados para publicación.</p>
        </div>
      </section>
    );
  }

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
