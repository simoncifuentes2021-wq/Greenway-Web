import { ButtonLink } from '@/components/ui/button-link';
import { organizationCases } from '@/data/home';

export function OrganizationsSection() {
  return (
    <section aria-labelledby="organizations-title" className="section-space bg-ivory">
      <div className="container-site">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow text-petroleum">Empresas e instituciones</p>
          <h2 id="organizations-title" className="mt-5 font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-none tracking-[-0.055em] text-forest">Servicios para diversos rubros</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted">Además del sector de espectáculos y eventos, prestamos servicios ambientales y de asesoría especializada a instituciones públicas, empresas privadas y emprendedores.</p>
        </div>
        <div className="mt-12">
          <h3 className="mb-5 font-display text-xl font-bold text-forest">Casos destacados</h3>
          <ul className="grid gap-4 md:grid-cols-2">
            {organizationCases.map((item, index) => (
              <li key={item.organization} className="border border-line bg-white p-6 sm:p-8">
                <p className="font-display text-xs font-bold tracking-[0.14em] text-eco">0{index + 1} / CASO</p>
                <h4 className="mt-4 font-display text-xl font-semibold tracking-[-0.025em] text-forest sm:text-2xl">{item.organization}</h4>
                <p className="mt-3 text-base leading-7 text-muted">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-9 flex justify-center">
          <ButtonLink href="/empresas" variant="secondary">Soluciones para empresas e instituciones <span aria-hidden="true">→</span></ButtonLink>
        </div>
      </div>
    </section>
  );
}
