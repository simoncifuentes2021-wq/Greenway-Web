import { ReferenceMedia } from '@/components/ui/reference-media';

export function TeamSection() {
  return (
    <section aria-labelledby="team-title" className="section-space bg-ivory">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
          <div>
            <p className="eyebrow text-petroleum">Equipo</p>
            <h2 id="team-title" className="mt-5 font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-none tracking-[-0.055em] text-forest">Personas que conocen el terreno.</h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-muted">Un equipo cercano y especializado, preparado para coordinar, implementar y acompañar cada proyecto donde sucede.</p>
          </div>
          <ReferenceMedia src="/media/temporary/greenway-team.jpg" alt="Referencia temporal de un equipo operativo reunido en terreno" label="Equipo / referencia" disclaimer="Personas ficticias · reemplazar por equipo Greenway" className="min-h-[430px] sm:min-h-[560px]" />
        </div>
      </div>
    </section>
  );
}
