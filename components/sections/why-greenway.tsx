import { differentiators } from '@/data/home';

export function WhyGreenway() {
  return (
    <section aria-labelledby="why-title" className="section-space bg-white">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow text-petroleum">Por qué Greenway</p>
            <h2 id="why-title" className="mt-5 font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-none tracking-[-0.055em] text-forest">Experiencia para pasar del compromiso a la acción.</h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-muted lg:justify-self-end">Combinamos conocimiento técnico, respuesta operativa y mejora continua para construir soluciones que funcionan en condiciones reales.</p>
        </div>
        <ol className="mt-14 grid border-y border-line lg:grid-cols-[1.05fr_1.95fr]">
          {differentiators.map((item, index) => (
            <li key={item.title} className={`${index === 0 ? 'flex min-h-[25rem] flex-col justify-between bg-forest p-8 text-white lg:row-span-3 lg:p-10' : 'grid min-h-32 gap-4 border-b border-line py-7 lg:grid-cols-[4rem_1fr_1.1fr] lg:items-start lg:px-8'} last:border-b-0`}>
              <p className="font-display text-xs font-bold text-eco">0{index + 1}</p>
              <h3 className={`${index === 0 ? 'font-display text-[clamp(3.6rem,7vw,7rem)] font-semibold leading-[.86] tracking-[-.07em]' : 'font-display text-xl font-semibold tracking-[-.035em] text-forest'}`}>{index === 0 ? <><span className="block">+10</span><span className="mt-4 block text-2xl leading-none tracking-[-.04em]">años de experiencia</span></> : item.title}</h3>
              <p className={`${index === 0 ? 'mt-8 max-w-sm text-sm leading-6 text-white/65' : 'max-w-md text-sm leading-6 text-muted'}`}>{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
