'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/logo';
import { ButtonLink } from '@/components/ui/button-link';
import { clientPortalUrl, navigation } from '@/data/site';

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const [overHero, setOverHero] = useState(overlay);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!overlay) {
      return;
    }

    const boundary = document.getElementById('home-hero-header-boundary');
    if (!boundary) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setOverHero(entry.boundingClientRect.top > 0);
    });
    observer.observe(boundary);
    return () => observer.disconnect();
  }, [overlay]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const transparent = overlay && overHero && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b text-white ${overlay ? 'home-header' : ''} ${transparent ? 'border-white/12' : 'border-white/10 shadow-[0_1px_0_rgba(255,255,255,.04)]'}`}
      data-menu-open={open}
      style={{ backgroundColor: transparent ? 'transparent' : 'var(--forest)' }}
    >
      <div className="home-header-inner container-site flex h-[4.75rem] items-center justify-between gap-8">
        <Logo light />
        <nav aria-label="Navegación principal" className="home-header-navigation hidden lg:block">
          <ul className="flex items-center gap-7">
            {navigation.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
              <li key={item.href}>
                <Link href={item.href} aria-current={active ? 'page' : undefined} className={`relative py-2 text-[.82rem] font-semibold text-white transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-eco after:transition-transform ${active ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}>
                  {item.label}
                </Link>
              </li>
            );})}
          </ul>
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink href={clientPortalUrl} variant="ghost" className="home-header-action !text-white hover:!bg-white/10">Acceso clientes</ButtonLink>
          <ButtonLink href="/cotizar" className="home-header-action !border-white !bg-white !text-forest hover:!bg-ivory">Cotizar servicio</ButtonLink>
        </div>
        <button
          ref={menuButtonRef}
          type="button"
          className="pressable grid size-11 place-items-center rounded-[.6rem] border border-white/30 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true" className="relative block size-5">
            <span className={`absolute left-0 top-[5px] h-0.5 w-5 bg-current transition-transform ${open ? 'translate-y-1 rotate-45' : ''}`} />
            <span className={`absolute left-0 top-[13px] h-0.5 w-5 bg-current transition-transform ${open ? '-translate-y-1 -rotate-45' : ''}`} />
          </span>
        </button>
      </div>
      {open ? (
        <nav id="mobile-menu" aria-label="Navegación móvil" className="min-h-[calc(100svh-4.75rem)] border-t border-line bg-ivory px-5 pb-8 pt-5 lg:hidden">
          <ul className="container-site flex flex-col">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={(item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)) ? 'page' : undefined} className="flex min-h-16 items-center justify-between border-b border-line font-display text-2xl font-semibold tracking-[-.04em] text-forest aria-[current=page]:text-petroleum" onClick={() => setOpen(false)}>{item.label}<span aria-hidden="true" className="text-sm font-normal text-muted">↗</span></Link>
              </li>
            ))}
          </ul>
          <div className="container-site mt-5 grid gap-3 sm:grid-cols-2">
            <ButtonLink href={clientPortalUrl} variant="secondary">Acceso clientes</ButtonLink>
            <ButtonLink href="/cotizar">Cotizar servicio</ButtonLink>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
