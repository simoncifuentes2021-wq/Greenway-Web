'use client';

import { useRef, type ReactNode } from 'react';
import { useKineticDrag } from '@/hooks/use-kinetic-drag';
import { ServiceIcon } from '@/components/ui/service-icon';
import { services } from '@/data/site';
import { GreenwayFlow } from './greenway-flow';
import styles from './service-orbit.module.css';

export function ServiceOrbit({ active, visited, children, onSelect, onStep }: { active: string; visited: Set<string>; children: ReactNode; onSelect: (slug: string) => void; onStep: (steps: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
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
        <div className={styles.core}>{children}</div>
        <div data-touch-ring className={styles.ring}>
          {services.map((service, index) => {
            const angle = index * Math.PI * 2 / services.length - Math.PI / 2;
            return <button key={service.slug} type="button" data-touch-node data-visited={visited.has(service.slug)} aria-label={service.name} aria-pressed={active === service.slug} aria-controls="ecosystem-mobile-center" style={{ left: `${(50 + Math.cos(angle) * 43).toFixed(3)}%`, top: `${(50 + Math.sin(angle) * 43).toFixed(3)}%` }} onClick={() => onSelect(service.slug)}><ServiceIcon slug={service.slug} /></button>;
          })}
        </div>
      </div>
      <p className={styles.hint}><span aria-hidden="true">↔</span> Arrastra para explorar · toca para seleccionar</p>
      <div className={styles.controls}><button type="button" onClick={() => onStep(-1)} aria-label="Explorar servicio anterior">←</button><span>{services.find((service) => service.slug === active)?.name}</span><button type="button" onClick={() => onStep(1)} aria-label="Explorar servicio siguiente">→</button></div>
    </div>
  );
}
