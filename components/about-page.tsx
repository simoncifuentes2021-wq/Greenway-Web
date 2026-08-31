import { Breadcrumbs } from '@/components/breadcrumbs';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { ButtonLink } from '@/components/ui/button-link';
import { ReferenceMedia } from '@/components/ui/reference-media';

const principles = [
  { title: 'Experiencia operacional', description: 'Más de 10 años de experiencia declarada en proyectos y servicios que suceden en terreno.' },
  { title: 'Soluciones personalizadas', description: 'Cada proyecto se planifica según su contexto, escala y requerimientos.' },
  { title: 'Capacidad de respuesta', description: 'La coordinación cercana permite actuar ante las necesidades y contingencias de la operación.' },
  { title: 'Innovación y mejora continua', description: 'Greenway integra nuevas soluciones y aplica aprendizajes para seguir elevando su forma de trabajar.' },
];

export function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="internal-hero pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
          <div className="container-site">
            <Breadcrumbs light items={[{ name: 'Inicio', href: '/' }, { name: 'Nosotros', href: '/nosotros' }]} />
            <div className="mt-12 grid items-end gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
              <div>
                <p className="eyebrow text-eco">Nosotros</p>
                <h1 className="display-title mt-5 max-w-5xl">Experiencia para llevar la gestión ambiental a terreno.</h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">Greenway combina capacidad técnica, planificación personalizada y ejecución operacional para transformar objetivos ambientales en acciones concretas.</p>
              </div>
              <ReferenceMedia src="/media/temporary/greenway-field-assessment.jpg" alt="Referencia temporal de una evaluación operativa en terreno" label="Experiencia / referencia" className="min-h-[330px] sm:min-h-[430px]" priority />
            </div>
          </div>
        </section>

        <section aria-labelledby="about-purpose-title" className="section-space bg-ivory">
          <div className="container-site grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow text-petroleum">Nuestro propósito</p>
              <h2 id="about-purpose-title" className="mt-5 font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-none tracking-[-0.055em] text-forest">Del compromiso ambiental a una operación que funciona.</h2>
            </div>
            <div className="self-end space-y-5 text-lg leading-8 text-muted">
              <div className="mb-9 border-y border-line py-6"><p className="font-display text-[clamp(4.5rem,9vw,8rem)] font-semibold leading-[.8] tracking-[-.075em] text-forest">+10</p><p className="mt-4 eyebrow text-petroleum">Años de experiencia declarada</p></div>
              <p>Greenway busca transformar el impacto ambiental de eventos y operaciones mediante soluciones concretas, economía circular, energías limpias y respeto por el entorno.</p>
              <p>El trabajo comienza por comprender cada proyecto. Desde ese diagnóstico se coordinan los servicios, recursos y equipos necesarios para implementar una solución adaptada.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="about-principles-title" className="section-space bg-white">
          <div className="container-site">
            <p className="eyebrow text-petroleum">Cómo trabajamos</p>
            <h2 id="about-principles-title" className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-none tracking-[-0.055em] text-forest">Criterios que sostienen cada proyecto.</h2>
            <ol className="mt-14 grid border-t border-line md:grid-cols-2">
              {principles.map((principle, index) => (
                <li key={principle.title} className="border-b border-line py-8 md:px-8 md:[&:nth-child(odd)]:pl-0">
                  <p className="font-display text-xs font-bold text-eco">0{index + 1}</p>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.035em] text-forest">{principle.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-muted">{principle.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="about-team-title" className="section-space bg-ivory">
          <div className="container-site grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <p className="eyebrow text-petroleum">Equipo humano</p>
              <h2 id="about-team-title" className="mt-5 font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-none tracking-[-0.055em] text-forest">Personas que conocen la realidad de la operación.</h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-muted">El trabajo en terreno requiere coordinación, conocimiento técnico y capacidad para acompañar cada etapa. Los nombres y cargos se incorporarán cuando exista información oficial aprobada.</p>
            </div>
            <ReferenceMedia src="/media/temporary/greenway-team.jpg" alt="Referencia temporal de un equipo ambiental coordinando una operación" label="Equipo humano / referencia" disclaimer="Personas ficticias · reemplazar por equipo Greenway" className="min-h-[430px] sm:min-h-[560px]" />
          </div>
        </section>

        <section aria-labelledby="about-cta-title" className="bg-eco py-16 sm:py-20 lg:py-28">
          <div className="container-site">
            <p className="eyebrow text-forest/65">Trabajemos juntos</p>
            <h2 id="about-cta-title" className="mt-5 max-w-5xl font-display text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[.95] tracking-[-0.065em] text-forest">Conversemos sobre tu próximo proyecto.</h2>
            <ButtonLink href="/cotizar" className="mt-9">Cotizar servicio <span aria-hidden="true">→</span></ButtonLink>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
