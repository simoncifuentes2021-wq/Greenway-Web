'use client';

import { useRef, useState, type ReactNode } from 'react';
import { useKineticDrag } from '@/hooks/use-kinetic-drag';
import { clamp } from '@/utils/motion-physics';
import { useLivingSystem } from './living-provider';
import styles from './technology-experience.module.css';

export function TechnologyExperience({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [device, setDevice] = useState<'desktop' | 'phone'>('desktop');
  const engine = useLivingSystem();
  const choose = (next: 'desktop' | 'phone') => {
    setDevice(next);
    engine.emit({ type: 'technology', source: ref.current ?? undefined });
  };
  useKineticDrag(ref, {
    step: 16,
    onStep: (steps) => { if (steps) choose(device === 'desktop' ? 'phone' : 'desktop'); },
    onFrame: (angle) => {
      if (innerWidth >= 1100) return;
      ref.current?.querySelectorAll<HTMLElement>('[data-depth-plane]').forEach((plane, index) => {
        plane.style.translate = engine.state.reduced ? '' : `${clamp(angle, -16, 16) * (index ? -.3 : .2)}px 0`;
      });
    },
  });
  return <div ref={ref} data-technology-drag data-device={device} className={styles.experience}>
    {children}
    <div className={styles.controls} role="group" aria-label="Explorar dispositivos EcoEvent 360">
      <span>Desliza para explorar</span>
      <button type="button" aria-pressed={device === 'desktop'} onClick={() => choose('desktop')}>Escritorio</button>
      <button type="button" aria-pressed={device === 'phone'} onClick={() => choose('phone')}>Móvil</button>
    </div>
  </div>;
}
