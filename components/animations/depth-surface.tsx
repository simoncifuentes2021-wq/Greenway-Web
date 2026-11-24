'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from './depth-surface.module.css';
import { useLivingSystem } from '@/components/living-system/living-provider';

/** Pointer-only progressive enhancement. Static server content is always usable. */
export function DepthSurface({ children, className = '', target = '[data-depth-plane]', label, loadImagesNearViewport = false }: { children: ReactNode; className?: string; target?: string; label?: string; loadImagesNearViewport?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const engine = useLivingSystem();
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !loadImagesNearViewport) return;
    // Observe the stage rather than relying on native lazy intersection of
    // overlapping, projected device planes. Keep native lazy loading without JS.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      root.querySelectorAll('img').forEach((img) => { img.loading = 'eager'; });
      observer.disconnect();
    }, { rootMargin: '500px' });
    observer.observe(root);
    return () => observer.disconnect();
  }, [loadImagesNearViewport]);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const planes = Array.from(root.querySelectorAll<HTMLElement>(target));
    let pressing = false;
    const hold = () => { pressing = true; };
    const release = () => { pressing = false; engine.wake(); };
    const reset = () => {
      planes.forEach((plane) => { plane.style.transform = ''; });
    };
    const unwatch = engine.watch(root, (state) => {
      if (!state.visible || state.reduced || state.quality !== 'full' || !state.fine || innerWidth < 1100) { reset(); return; }
      if (pressing) return;
      const inside = state.pointerY >= state.rect.top && state.pointerY <= state.rect.bottom && state.pointerX >= state.rect.left && state.pointerX <= state.rect.right;
      const x = inside ? state.x : 0, y = inside ? state.y : 0;
      planes.forEach((plane, index) => {
        const factor = 1 / (index + 1);
        plane.style.transform = `perspective(1400px) rotateX(${-y * 1.5 * factor}deg) rotateY(${x * 2 * factor}deg) translate3d(${x * 3 * factor}px, ${y * 2 * factor}px, 0)`;
      });
    });
    root.addEventListener('focusin', reset);
    root.addEventListener('pointerdown', hold);
    document.addEventListener('pointerup', release);
    document.addEventListener('pointercancel', release);
    return () => {
      reset();
      unwatch();
      root.removeEventListener('focusin', reset);
      root.removeEventListener('pointerdown', hold);
      document.removeEventListener('pointerup', release);
      document.removeEventListener('pointercancel', release);
    };
  }, [target, engine]);
  return <div ref={rootRef} className={`${styles.surface} ${className}`} aria-label={label}>{children}</div>;
}
