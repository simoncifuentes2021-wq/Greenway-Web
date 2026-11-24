'use client';

import { useRef, type ReactNode } from 'react';
import { useKineticDrag } from '@/hooks/use-kinetic-drag';
import { ServiceIcon } from '@/components/ui/service-icon';
import { services } from '@/data/site';
import { EcosystemSignal } from '@/components/ui/ecosystem-signal';
import { GreenwayFlow } from './greenway-flow';
import styles from './service-orbit.module.css';

export function ServiceOrbit({ active, visited, hasActivated, signalKey, children, onSelect, onStep }: { active: string; visited: Set<string>; hasActivated: boolean; signalKey: number; children: ReactNode; onSelect: (slug: string) => void; onStep: (steps: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const activeIndex = Math.max(0, services.findIndex((service) => service.slug === active));
  const activeAngle = activeIndex * Math.PI * 2 / services.length - Math.PI / 2;
  const signalX = 50 + Math.cos(activeAngle) * 43;
  const signalY = 50 + Math.sin(activeAngle) * 43;
  useKineticDrag(ref, {
    onStep,
    onFrame(angle) {
      const ring = ref.current?.querySelector<HTMLElement>('[data-touch-ring]');
      if (ring) ring.style.transform = `rotate(${angle}deg)`;
      ref.current?.querySelectorAll<HTMLElement>('[data-touch-node]').forEach((node) => { node.style.transform = `translate(-50%, -50%) rotate(${-angle}deg)`; });
    },
  });
  return (
    <div className={styles.wrapper}>
      <div ref={ref} className={styles.stage} data-service-drag="mobile" aria-label="Ecosistema táctil de servicios. Arrastra horizontalmente o usa los botones.">
        <GreenwayFlow variant="services" className={styles.flow} />
        <div key={`${active}-${signalKey}`} className={styles.core}>{children}</div>
        <div data-touch-ring className={styles.ring}>
          {hasActivated ? <svg key={signalKey} className={styles.signal} viewBox="0 0 1000 1000" aria-hidden="true"><EcosystemSignal x={signalX} y={signalY} /></svg> : null}
          {services.map((service, index) => {
            const angle = index * Math.PI * 2 / services.length - Math.PI / 2;
            return <button key={service.slug} type="button" data-touch-node data-visited={visited.has(service.slug)} aria-label={service.name} aria-pressed={active === service.slug} aria-controls="ecosystem-mobile-center" style={{ left: `${(50 + Math.cos(angle) * 43).toFixed(3)}%`, top: `${(50 + Math.sin(angle) * 43).toFixed(3)}%` }} onClick={() => onSelect(service.slug)}><ServiceIcon slug={service.slug} /></button>;
          })}
        </div>
      </div>
      <p className={styles.hint}><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M5 12l3-3m-3 3 3 3m11-3-3-3m3 3-3 3" /></svg> Arrastra para explorar · toca para seleccionar</p>
      <div className={styles.controls}><button type="button" onClick={() => onStep(-1)} aria-label="Explorar servicio anterior"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m6 6-6-6 6-6" /></svg></button><span>{services.find((service) => service.slug === active)?.name}</span><button type="button" onClick={() => onStep(1)} aria-label="Explorar servicio siguiente"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></button></div>
    </div>
  );
}
