import { ReferenceMedia } from '@/components/ui/reference-media';

export function PurposeSection() {
  return (
    <section aria-labelledby="proposito-title" className="section-space bg-ivory">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <ReferenceMedia src="/media/temporary/greenway-operations.jpg" alt="Referencia temporal de una operación de reciclaje en terreno" label="Operación en terreno" className="min-h-[420px] lg:min-h-[610px]" imageClassName="object-[58%_center]" />
        <div>
          <p className="eyebrow text-petroleum">Qué nos impulsa</p>
          <h2 id="proposito-title" className="mt-5 max-w-3xl font-display text-[clamp(2.35rem,5vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-forest">Celebrar sin dejar una huella negativa.</h2>
          <div className="mt-8 max-w-2xl space-y-5 text-[clamp(1.05rem,1.5vw,1.25rem)] leading-8 text-charcoal/78">
            <p>Creemos que los eventos masivos pueden celebrarse sin dejar una huella negativa.</p>
            <p>Trabajamos para transformar su impacto ambiental mediante soluciones que fomentan la economía circular, las energías limpias y el respeto por el entorno.</p>
            <p>Buscamos que cada proyecto sea un ejemplo de responsabilidad y sustentabilidad.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
