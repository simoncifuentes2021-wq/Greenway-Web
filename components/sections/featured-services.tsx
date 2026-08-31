import Link from 'next/link';
import { ServiceIcon } from '@/components/ui/service-icon';
import { featuredAreas } from '@/data/home';

export function FeaturedServices() {
  const [primary, ...secondary] = featuredAreas;

  return (
    <section aria-labelledby="featured-services-title" className="section-space bg-ivory">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div>
            <p className="eyebrow text-petroleum">Servicios destacados</p>
            <h2 id="featured-services-title" className="mt-5 font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-none tracking-[-0.055em] text-forest">Soluciones que trabajan juntas.</h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-muted lg:justify-self-end">Desde la planificación hasta los resultados, conectamos capacidad operativa, tecnología y conocimiento ambiental.</p>
        </div>

        <div className="mt-14 grid gap-px bg-line lg:grid-cols-[1.08fr_.92fr]">
          <Link href={primary.href} className="group relative flex min-h-[430px] flex-col justify-between overflow-hidden bg-forest p-7 text-white sm:p-10 lg:min-h-[570px]">
            <div aria-hidden="true" className="field-grid absolute inset-0 opacity-30" />
            <div className="relative flex items-center justify-between"><p className="eyebrow text-eco">{primary.number} / Área</p><ServiceIcon slug="reciclaje" className="size-12 text-white/70" /></div>
            <div className="relative max-w-xl">
              <h3 className="font-display text-[clamp(2.2rem,4vw,4.25rem)] font-semibold leading-none tracking-[-0.05em]">{primary.title}</h3>
              <p className="mt-5 max-w-lg text-base leading-7 text-white/72">{primary.description}</p>
              <span className="mt-7 inline-flex text-sm font-semibold">Explorar área <span aria-hidden="true" className="ml-2 transition-transform group-hover:translate-x-1">→</span></span>
            </div>
          </Link>

          <div className="divide-y divide-line bg-white">
            {secondary.map((area, index) => (
              <Link key={area.number} href={area.href} className="group grid min-h-[185px] gap-5 bg-white px-6 py-7 sm:grid-cols-[3.5rem_1fr_auto] sm:items-start sm:px-8 sm:py-8">
                <span className="grid size-11 place-items-center rounded-full border border-line text-petroleum"><ServiceIcon slug={['gestion-y-trazabilidad', 'energias-renovables', 'movilidad-sostenible'][index]} className="size-5" /></span>
                <span>
                  <span className="block font-display text-2xl font-semibold tracking-[-0.035em] text-forest sm:text-3xl">{area.title}</span>
                  <span className="mt-3 block max-w-xl text-sm leading-6 text-muted">{area.description}</span>
                </span>
                <span aria-hidden="true" className="hidden size-11 items-center justify-center rounded-full border border-line text-forest transition-colors group-hover:border-forest group-hover:bg-forest group-hover:text-white sm:flex">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
