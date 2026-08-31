import { ButtonLink } from '@/components/ui/button-link';

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="relative overflow-hidden bg-eco">
      <div className="container-site relative grid lg:grid-cols-[1.35fr_.65fr]">
        <div className="py-16 lg:border-r lg:border-forest/20 lg:py-28 lg:pr-16">
          <p className="eyebrow text-forest/65">Próximo proyecto</p>
          <h2 id="final-cta-title" className="display-title mt-5 max-w-5xl text-forest">Hagamos más sustentable tu próximo proyecto.</h2>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/cotizar">Cotizar servicio <span aria-hidden="true">→</span></ButtonLink>
            <button type="button" disabled aria-describedby="whatsapp-pending" className="inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-[.6rem] border border-forest/30 px-5 py-3 text-sm font-semibold text-forest/55">Hablar por WhatsApp</button>
          </div>
          <p id="whatsapp-pending" className="mt-3 text-xs text-forest/60">Disponible cuando se confirme el número oficial.</p>
        </div>
        <div aria-hidden="true" className="relative hidden min-h-full lg:block"><div className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-forest/25"><div className="absolute inset-[22%] rounded-full border border-dashed border-forest/25" /><div className="absolute inset-[43%] rounded-full bg-forest" /></div><p className="absolute bottom-8 right-0 font-display text-xs font-bold uppercase tracking-[.2em] text-forest/55">Greenway / 360°</p></div>
        </div>
    </section>
  );
}
