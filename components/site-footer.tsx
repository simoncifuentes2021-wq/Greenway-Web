import Link from 'next/link';
import { Logo } from '@/components/logo';
import { ButtonLink } from '@/components/ui/button-link';
import { contactInformation, navigation, services, socialLinks } from '@/data/site';

export function SiteFooter() {
  return (
    <footer className="bg-forest text-white">
      <div className="container-site py-16 lg:py-24">
        <div className="grid gap-12 border-b border-white/20 pb-14 md:grid-cols-2 lg:grid-cols-[1.6fr_.8fr_1.2fr]">
          <div>
            <Logo light />
            <p className="mt-7 max-w-md font-display text-[clamp(1.6rem,3vw,2.8rem)] font-semibold leading-[1.05] tracking-[-.045em] text-white/85">Gestión ambiental y sanitaria para eventos, empresas e instituciones.</p>
            <ButtonLink href="/cotizar" className="mt-8 !border-white !bg-white !text-forest hover:!bg-ivory">Conversemos sobre tu proyecto</ButtonLink>
          </div>
          <div>
            <h2 className="eyebrow text-white/50">Navegación</h2>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => <li key={item.href}><Link className="text-sm text-white/80 hover:text-white" href={item.href}>{item.label}</Link></li>)}
              <li><Link className="text-sm text-white/80 hover:text-white" href="/cotizar">Cotizar</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="eyebrow text-white/50">Servicios</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
              {services.map((service) => <li key={service.slug}><Link className="text-xs leading-5 text-white/72 hover:text-white" href={`/servicios/${service.slug}`}>{service.name}</Link></li>)}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-white/15 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Greenway. Todos los derechos reservados.</p>
          <p>{contactInformation.email ?? 'Datos de contacto pendientes de confirmación'}</p>
          {socialLinks.length > 0 ? <nav aria-label="Redes sociales">{socialLinks.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav> : null}
        </div>
      </div>
    </footer>
  );
}
