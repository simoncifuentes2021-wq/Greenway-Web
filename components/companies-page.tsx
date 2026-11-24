import { InternalFlow } from '@/components/living-system/internal-flow';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { ButtonLink } from '@/components/ui/button-link';
import { ServiceIcon } from '@/components/ui/service-icon';
import { organizations } from '@/data/home';
import { services } from '@/data/site';

const companyServiceSlugs = ['asesoria-ambiental', 'manejo-de-residuos', 'economia-circular', 'huella-de-carbono', 'gestion-y-trazabilidad', 'energias-renovables'] as const;

export function CompaniesPage() {
  const companyServices = companyServiceSlugs.map((slug) => services.find((service) => service.slug === slug)).filter((service): service is (typeof services)[number] => Boolean(service));
  return (
    <>
      <SiteHeader />
      <main>
        <section className="internal-hero pb-16 pt-28 text-white sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
          <InternalFlow />
          <div className="container-site">
            <Breadcrumbs light items={[{ name: 'Inicio', href: '/' }, { name: 'Empresas e instituciones', href: '/empresas' }]} />
            <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
              <div>
                <p className="eyebrow text-eco">Empresas e instituciones</p>
                <h1 className="display-title mt-5 max-w-5xl">Gestión ambiental para organizaciones.</h1>
              </div>
              <div className="max-w-xl lg:justify-self-end">
                <p className="text-lg leading-8 text-white/72">Greenway adapta su experiencia operacional a empresas, instituciones y organizaciones que necesitan soluciones ambientales concretas y trazables.</p>
                <ButtonLink href="/cotizar" className="mt-8 !border-white !bg-white !text-forest hover:!bg-ivory">Cotizar servicio <span aria-hidden="true">→</span></ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="companies-needs-title" className="section-space bg-ivory">
          <div className="container-site grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow text-petroleum">Más allá de los eventos</p>
              <h2 id="companies-needs-title" className="mt-5 font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-none tracking-[-0.055em] text-forest">Soluciones ambientales conectadas con la operación.</h2>
            </div>
            <div className="self-end">
              <p className="max-w-2xl text-lg leading-8 text-muted">Una organización puede necesitar gestionar residuos, medir impactos, planificar acciones o respaldar resultados. Greenway define el alcance según el contexto y los objetivos del proyecto.</p>
              <ol className="mt-8 grid border-y border-line sm:grid-cols-3">
                {['Diagnóstico', 'Planificación', 'Implementación'].map((step, index) => <li key={step} className="border-b border-line py-5 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0"><span className="font-display text-xs font-bold text-eco">0{index + 1}</span><p className="mt-4 font-display text-lg font-semibold text-forest">{step}</p></li>)}
              </ol>
            </div>
          </div>
        </section>

        <section aria-labelledby="companies-services-title" className="section-space bg-white">
          <div className="container-site">
            <p className="eyebrow text-petroleum">Servicios para organizaciones</p>
            <h2 id="companies-services-title" className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-none tracking-[-0.055em] text-forest">Elige una capacidad o conecta varias.</h2>
            <ul className="mt-14 divide-y divide-line border-y border-line">
              {companyServices.map((service) => (
                <li key={service.slug}>
                  <Link href={`/servicios/${service.slug}`} className="group grid gap-3 py-6 sm:grid-cols-[3rem_.8fr_1.2fr_auto] sm:items-start sm:gap-6">
                    <span className="grid size-10 place-items-center rounded-full border border-line text-petroleum"><ServiceIcon slug={service.slug} className="size-5" /></span>
                    <span className="font-display text-xl font-semibold tracking-[-0.03em] text-forest">{service.name}</span>
                    <span className="text-sm leading-6 text-muted">{service.description}</span>
                    <span aria-hidden="true" className="text-forest transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="companies-experience-title" className="section-space bg-petroleum text-white">
          <div className="container-site grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow text-eco">Experiencia declarada</p>
              <h2 id="companies-experience-title" className="mt-5 font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-none tracking-[-0.055em]">Experiencia con organizaciones de distintos sectores.</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/65">El material del cliente menciona experiencia con estas organizaciones. La naturaleza y vigencia de cada relación sigue pendiente de confirmación; sus logos no se utilizan.</p>
            </div>
            <ul className="self-end border-y border-white/20">
              {organizations.map((organization, index) => <li key={organization} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/20 py-5 last:border-b-0"><span className="font-display text-xs font-bold text-eco">0{index + 1}</span><span className="font-display text-xl font-semibold tracking-[-0.025em] text-white/90">{organization}</span></li>)}
            </ul>
          </div>
        </section>

        <section aria-labelledby="companies-cta-title" className="bg-eco py-16 sm:py-20 lg:py-28">
          <div className="container-site">
            <p className="eyebrow text-forest/65">Próximo paso</p>
            <h2 id="companies-cta-title" className="mt-5 max-w-5xl font-display text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[.95] tracking-[-0.065em] text-forest">Planifiquemos una solución para tu organización.</h2>
            <ButtonLink href="/cotizar" className="mt-9">Cotizar servicio <span aria-hidden="true">→</span></ButtonLink>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
