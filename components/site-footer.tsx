import Link from 'next/link';
import { Logo } from '@/components/logo';
import { ButtonLink } from '@/components/ui/button-link';
import { contactInformation, navigation, services, socialLinks } from '@/data/site';
import { GreenwayFlow } from '@/components/living-system/greenway-flow';
import styles from './site-footer.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <GreenwayFlow variant="footer" className={styles.path} />
      <div className="container-site py-16 lg:py-24">
        <div className="grid gap-12 border-b border-white/20 pb-14 md:grid-cols-2 lg:grid-cols-[1.6fr_.8fr_1.2fr]">
          <div>
            <Logo light />
            <p className="mt-7 max-w-md font-display text-[clamp(1.6rem,3vw,2.8rem)] font-semibold leading-[1.05] tracking-[-.045em] text-white/85">Gestión ambiental para eventos, empresas e instituciones.</p>
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
        <div className={styles.signature} aria-hidden="true"><span>Greenway</span><span>Terreno.<br />Conexión.<br />Continuidad.</span></div>
        <div className={styles.contactStrip}>
          <div className={styles.socialGroup} aria-label="Redes sociales pendientes de confirmar">
            {socialLinks.length > 0 ? (
              <nav aria-label="Redes sociales">{socialLinks.map((item) => <Link key={item.href} href={item.href} className={styles.socialLink}>{item.label}</Link>)}</nav>
            ) : (
              <div className={styles.socialIcons} aria-hidden="true">
                <span><FooterIcon kind="facebook" /></span>
                <span><FooterIcon kind="linkedin" /></span>
                <span><FooterIcon kind="instagram" /></span>
              </div>
            )}
            {socialLinks.length === 0 && <span className={styles.pending}>Redes por confirmar</span>}
          </div>
          <div className={styles.contactGroup}>
            <span className={styles.contactItem}><FooterIcon kind="phone" />{contactInformation.phone ?? 'Teléfono por confirmar'}</span>
            <span className={styles.contactItem}><FooterIcon kind="mail" />{contactInformation.email ?? 'Correo por confirmar'}</span>
          </div>
        </div>
        <div className={styles.legal}>© {new Date().getFullYear()} Greenway. Todos los derechos reservados.</div>
      </div>
    </footer>
  );
}

function FooterIcon({ kind }: { kind: 'facebook' | 'linkedin' | 'instagram' | 'phone' | 'mail' }) {
  if (kind === 'facebook') return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.6 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.2-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.4V13h2.8v8h3.4Z" /></svg>;
  if (kind === 'linkedin') return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.1 8.5a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8ZM3.5 10h3.2v10H3.5V10Zm5.2 0h3.1v1.4h.1a3.4 3.4 0 0 1 3.1-1.7c3.3 0 3.9 2.1 3.9 4.9V20h-3.2v-4.8c0-1.2 0-2.7-1.7-2.7s-2 1.3-2 2.6V20H8.7V10Z" /></svg>;
  if (kind === 'instagram') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17.3" cy="6.9" r=".9" fill="currentColor" stroke="none" /></svg>;
  if (kind === 'phone') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.5 3.7 8.8 3l2 4.1-1.8 1.8a15.7 15.7 0 0 0 6.1 6.1l1.8-1.8 4.1 2-.7 3.3a2 2 0 0 1-2 1.5C10.3 20 4 13.7 4 5.7a2 2 0 0 1 1.5-2Z" /></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2" /><path d="m3.5 6 8.5 7 8.5-7" /></svg>;
}
