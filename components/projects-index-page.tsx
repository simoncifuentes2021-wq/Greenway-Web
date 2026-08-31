import { Breadcrumbs } from '@/components/breadcrumbs';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { ButtonLink } from '@/components/ui/button-link';
import { MediaPlaceholder } from '@/components/ui/media-placeholder';
import { approvedProjects } from '@/data/projects';

export function ProjectsIndexPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="internal-hero pb-16 pt-28 text-white sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
          <div className="container-site">
            <Breadcrumbs light items={[{ name: 'Inicio', href: '/' }, { name: 'Proyectos', href: '/proyectos' }]} />
            <div className="mt-12 max-w-5xl">
              <p className="eyebrow text-eco">Proyectos</p>
              <h1 className="display-title mt-5">Experiencia que se demuestra en terreno.</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">Esta sección está preparada para presentar casos reales con su contexto, solución, resultados y evidencia cuando el cliente apruebe la información.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="projects-list-title" className="section-space bg-ivory">
          <div className="container-site">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow text-petroleum">Casos de proyecto</p>
                <h2 id="projects-list-title" className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-none tracking-[-0.055em] text-forest">Resultados reales, cuando exista evidencia aprobada.</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted">No hay casos autorizados para publicación en este momento.</p>
            </div>

            {approvedProjects.length > 0 ? null : (
              <div className="mt-14 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
                <MediaPlaceholder label="Referencia de caso principal" description="No representa un proyecto real · reemplazar con material aprobado" className="min-h-[480px] lg:min-h-[620px]" src="/media/temporary/greenway-hero-event.jpg" />
                <div className="grid gap-5">
                  <MediaPlaceholder label="Referencia de caso secundario" description="Cliente, servicios y resultados pendientes" className="min-h-[280px]" tone="petroleum" src="/media/temporary/greenway-operations.jpg" />
                  <MediaPlaceholder label="Referencia de caso secundario" description="No representa un proyecto real · reemplazar" className="min-h-[280px]" tone="ivory" src="/media/temporary/greenway-audiovisual.jpg" />
                </div>
              </div>
            )}
          </div>
        </section>

        <section aria-labelledby="project-model-title" className="section-space bg-white">
          <div className="container-site grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
            <div>
              <p className="eyebrow text-petroleum">Estructura preparada</p>
              <h2 id="project-model-title" className="mt-5 font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-none tracking-[-0.055em] text-forest">Cada caso deberá explicar el proyecto completo.</h2>
            </div>
            <ol className="self-end border-y border-line">
              {[
                'Nombre, cliente o evento, fecha y ubicación',
                'Servicios implementados y desafío abordado',
                'Solución desarrollada y fotografías aprobadas',
                'Métricas, resultados y evidencia verificable',
              ].map((item, index) => <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-5 last:border-b-0"><span className="font-display text-xs font-bold text-eco">0{index + 1}</span><span className="font-display text-lg font-semibold tracking-[-0.025em] text-forest">{item}</span></li>)}
            </ol>
          </div>
        </section>

        <section aria-labelledby="projects-cta-title" className="bg-eco py-16 sm:py-20 lg:py-28">
          <div className="container-site">
            <p className="eyebrow text-forest/65">Tu proyecto</p>
            <h2 id="projects-cta-title" className="mt-5 max-w-5xl font-display text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[.95] tracking-[-0.065em] text-forest">Construyamos una solución adaptada a tu operación.</h2>
            <ButtonLink href="/cotizar" className="mt-9">Cotizar servicio <span aria-hidden="true">→</span></ButtonLink>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
