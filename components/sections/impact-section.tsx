import { impactMetrics } from '@/data/home';

export function ImpactSection() {
  return (
    <section aria-labelledby="impact-title" className="bg-forest py-16 text-white lg:py-24">
      <div className="container-site">
        <div className="flex flex-col gap-5 border-b border-white/20 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-eco">Nuestro impacto</p>
            <h2 id="impact-title" className="mt-4 font-display text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.055em]">Resultados que deben poder verificarse.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/60">Valores preparados para reemplazarse con información consolidada y aprobada.</p>
        </div>
        <dl className="grid grid-cols-2 border-y border-white/18 lg:grid-cols-4">
          {impactMetrics.map((metric) => (
            <div key={metric.label} className="min-h-40 border-b border-r border-white/18 px-4 py-9 sm:px-7 lg:min-h-52 lg:border-b-0 lg:py-12">
              <dd className="font-display text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-none tracking-[-0.065em] text-white/20">—</dd>
              <dt className="mt-5 max-w-[12rem] text-xs font-medium uppercase leading-5 tracking-[.11em] text-white/55">{metric.label}</dt>
              <span className="sr-only">Dato pendiente de confirmar</span>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
