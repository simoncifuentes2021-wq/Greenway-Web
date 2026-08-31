import { ButtonLink } from '@/components/ui/button-link';
import { organizations } from '@/data/home';

export function OrganizationsSection() {
  return (
    <section aria-labelledby="organizations-title" className="section-space bg-ivory">
      <div className="container-site grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow text-petroleum">Empresas e instituciones</p>
          <h2 id="organizations-title" className="mt-5 font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-none tracking-[-0.055em] text-forest">La gestión ambiental va más allá de los eventos.</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">Adaptamos nuestra experiencia operativa a organizaciones que necesitan avanzar con criterios ambientales claros y trazables.</p>
          <ButtonLink href="/empresas" variant="secondary" className="mt-8">Soluciones para empresas e instituciones <span aria-hidden="true">→</span></ButtonLink>
        </div>
        <div className="self-end">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Organizaciones mencionadas en material aprobado</p>
          <ul className="divide-y divide-line border-y border-line">
            {organizations.map((organization, index) => (
              <li key={organization} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5 sm:py-6">
                <span className="font-display text-xs font-bold text-eco">0{index + 1}</span>
                <span className="font-display text-xl font-semibold tracking-[-0.025em] text-forest sm:text-2xl">{organization}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">Logos pendientes de autorización y archivos oficiales.</p>
        </div>
      </div>
    </section>
  );
}
