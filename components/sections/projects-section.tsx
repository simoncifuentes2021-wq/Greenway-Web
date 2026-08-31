import Link from 'next/link';
import { MediaPlaceholder } from '@/components/ui/media-placeholder';
import { featuredProjects } from '@/data/home';

export function ProjectsSection() {
  const [primary, ...secondary] = featuredProjects;

  return (
    <section aria-labelledby="projects-title" className="section-space bg-ivory">
      <div className="container-site">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow text-petroleum">Proyectos destacados</p>
            <h2 id="projects-title" className="mt-5 font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-none tracking-[-0.055em] text-forest">El impacto se demuestra en terreno.</h2>
          </div>
          <Link href="/proyectos" className="text-sm font-semibold text-forest underline-offset-4 hover:underline">Ver todos los proyectos →</Link>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
          <article>
            <MediaPlaceholder label="Referencia de proyecto principal" description="No representa un caso real · reemplazar con material aprobado" className="min-h-[480px] lg:min-h-[650px]" src="/media/temporary/greenway-hero-event.jpg" />
            <ProjectCaption project={primary} large />
          </article>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            {secondary.map((project) => (
              <article key={project.slug}>
                <MediaPlaceholder label="Referencia de proyecto" description="No representa un caso real · reemplazar" className="min-h-[260px] lg:min-h-[270px]" tone="petroleum" src={project.slug.includes('uno') ? '/media/temporary/greenway-operations.jpg' : '/media/temporary/greenway-audiovisual.jpg'} />
                <ProjectCaption project={project} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCaption({ project, large = false }: { project: (typeof featuredProjects)[number]; large?: boolean }) {
  return (
    <div className="border-b border-line py-5">
      <div>
        <p className="eyebrow text-muted">Contenido por confirmar</p>
        <h3 className={`mt-2 font-display font-semibold tracking-[-0.035em] text-forest ${large ? 'text-3xl' : 'text-xl'}`}>{project.title}</h3>
        <p className="mt-2 text-sm text-muted">{project.services.join(' · ')}</p>
      </div>
    </div>
  );
}
