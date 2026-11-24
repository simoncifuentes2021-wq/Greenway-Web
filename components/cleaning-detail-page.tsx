import Link from 'next/link';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { ButtonLink } from '@/components/ui/button-link';
import { ReferenceMedia } from '@/components/ui/reference-media';

const pages = {
  eventos: {
    title: 'Limpieza en eventos',
    eyebrow: 'Eventos y producciones',
    description: 'Ejecutamos limpieza profesional antes, durante y después del evento. Coordinamos personal, supervisión e insumos junto al equipo de producción, de acuerdo con las características de cada recinto.',
    image: '/media/limpieza/Imagen2.jpg',
    alt: 'Estación de lavado de vasos reutilizables instalada en un evento',
    points: ['Preparación de espacios antes de la apertura', 'Limpieza y mantención durante el evento', 'Limpieza de cierre y entrega de espacios'],
  },
  domiciliaria: {
    title: 'Limpieza domiciliaria profunda',
    eyebrow: 'Hogar',
    description: 'Un servicio de limpieza profunda para el hogar, organizado según los espacios, superficies y requerimientos de cada vivienda.',
    image: '/media/limpieza/Imagen1.jpg',
    alt: 'Living de una vivienda para servicio de limpieza domiciliaria profunda',
    points: ['Limpieza detallada de espacios interiores', 'Plan de trabajo ajustado a cada vivienda', 'Insumos y tareas definidos según requerimientos'],
  },
} as const;

export function CleaningDetailPage({ type }: { type: keyof typeof pages }) {
  const page = pages[type];
  return (
    <>
      <SiteHeader />
      <main>
        <section className="internal-hero pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
          <div className="container-site">
            <Breadcrumbs light items={[{ name: 'Inicio', href: '/' }, { name: 'Servicios', href: '/servicios' }, { name: 'Limpieza', href: '/servicios/limpieza' }, { name: page.eyebrow, href: `/servicios/limpieza/${type}` }]} />
            <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className="eyebrow text-eco">{page.eyebrow}</p>
                <h1 className="display-title mt-5 max-w-3xl text-balance">{page.title}</h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75">{page.description}</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <ButtonLink href="/cotizar?servicio=limpieza" className="!border-white !bg-white !text-forest hover:!bg-ivory">Cotizar servicio <span aria-hidden="true">→</span></ButtonLink>
                  <ButtonLink href="/servicios/limpieza" variant="secondary" className="!border-white/45 !text-white hover:!bg-white hover:!text-forest">Volver a limpieza</ButtonLink>
                </div>
              </div>
              <ReferenceMedia src={page.image} alt={page.alt} label={page.eyebrow} disclaimer="" className="min-h-[340px] sm:min-h-[460px]" priority />
            </div>
          </div>
        </section>
        <section className="section-space bg-ivory">
          <div className="container-site grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow text-petroleum">Alcance del servicio</p>
              <h2 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.055em] text-forest">Una solución pensada para cada espacio</h2>
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {page.points.map((point, index) => <li key={point} className="grid grid-cols-[2.5rem_1fr] gap-4 py-6"><span className="font-display text-xs font-bold text-eco">0{index + 1}</span><span className="font-display text-lg font-semibold leading-7 text-forest">{point}</span></li>)}
            </ul>
          </div>
        </section>
        <section className="bg-white py-10">
          <div className="container-site flex flex-wrap items-center justify-between gap-5">
            <p className="text-sm leading-6 text-muted">¿Buscas otro tipo de limpieza?</p>
            <Link href="/servicios/limpieza" className="text-sm font-semibold text-forest underline-offset-4 hover:underline">Ver las opciones de limpieza →</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
