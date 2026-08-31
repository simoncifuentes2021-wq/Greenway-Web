import { ReferenceMedia } from '@/components/ui/reference-media';
import { energySolutions } from '@/data/home';

export function SolarEnergySection() {
  return (
    <section aria-labelledby="solar-title" className="section-space bg-white">
      <div className="container-site">
        <div className="max-w-4xl">
          <p className="eyebrow text-petroleum">Energías limpias</p>
          <h2 id="solar-title" className="mt-5 font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-none tracking-[-0.055em] text-forest">Energía donde la operación la necesita.</h2>
        </div>

        <div className="mt-14 divide-y divide-line border-y border-line">
          {energySolutions.map((solution, index) => (
            <article key={solution.title} className="grid gap-9 py-12 lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-20">
              <ReferenceMedia src="/media/temporary/greenway-clean-energy.jpg" alt={`Referencia temporal para ${solution.title}`} label={`Energía / referencia 0${index + 1}`} className={`min-h-[360px] sm:min-h-[480px] ${index % 2 === 1 ? 'lg:order-2' : ''}`} imageClassName={index === 0 ? 'object-[38%_center]' : 'object-[78%_center]'} />
              <div>
                <p className="font-display text-sm font-bold text-eco">0{index + 1}</p>
                <h3 className="mt-5 font-display text-[clamp(2.1rem,4vw,3.8rem)] font-semibold leading-none tracking-[-0.05em] text-forest">{solution.title}</h3>
                <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{solution.description}</p>
                <dl className="mt-10 grid grid-cols-2 gap-px bg-line">
                  {solution.specs.map((spec) => (
                    <div key={spec.label} className="min-h-28 bg-white px-4 py-5 sm:min-h-36 sm:px-5">
                      <dd className="font-display text-[clamp(1.75rem,3vw,3.1rem)] font-semibold leading-none tracking-[-0.055em] text-forest">{spec.value}</dd>
                      <dt className="mt-4 text-xs leading-5 text-muted">{spec.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
