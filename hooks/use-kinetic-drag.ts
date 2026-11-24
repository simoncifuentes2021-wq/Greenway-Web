'use client';

import { useEffect, useEffectEvent, type RefObject } from 'react';
import { clamp, stepSpring } from '@/utils/motion-physics';
import { useLivingSystem } from '@/components/living-system/living-provider';

/** Horizontal intent only; vertical touch scrolling remains entirely native. */
export function useKineticDrag(rootRef: RefObject<HTMLElement | null>, { step = 36, onStep, onFrame }: { step?: number; onStep: (steps: number) => void; onFrame: (angle: number) => void }) {
  const engine = useLivingSystem();
  const reportStep = useEffectEvent(onStep);
  const reportFrame = useEffectEvent(onFrame);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let pointer = -1, startX = 0, startY = 0, previousX = 0, last = 0, velocity = 0, angle = 0, origin = 0, target = 0, frame = 0, dragging = false;
    const spring = { position: 0, velocity: 0 };
    const settle = (time: number) => {
      const dt = last ? Math.min((time - last) / 1000, .033) : 1 / 60;
      last = time;
      if (engine.state.reduced) { spring.position = target; spring.velocity = 0; }
      angle = engine.state.reduced ? target : stepSpring(spring, target, dt, 90, 22);
      reportFrame(angle);
      if (Math.abs(angle - target) > .01 || Math.abs(spring.velocity) > .02) frame = requestAnimationFrame(settle);
      else { angle = target; spring.position = target; spring.velocity = 0; reportFrame(target); frame = 0; }
    };
    const down = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      if (event.target instanceof Element && event.target.closest('a, button, input, select, textarea, [role="button"]')) {
        pointer = -1;
        return;
      }
      cancelAnimationFrame(frame); frame = 0;
      dragging = false; root.dataset.dragging = 'false';
      pointer = event.pointerId; startX = previousX = event.clientX; startY = event.clientY; last = performance.now(); origin = angle; velocity = 0;
    };
    const move = (event: PointerEvent) => {
      if (event.pointerId !== pointer) return;
      if (event.buttons !== 1) { pointer = -1; dragging = false; root.dataset.dragging = 'false'; return; }
      const dx = event.clientX - startX, dy = event.clientY - startY;
      if (!dragging && Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { pointer = -1; return; }
      if (!dragging && Math.abs(dx) < 8) return;
      if (!dragging) { dragging = true; root.setPointerCapture(pointer); root.dataset.dragging = 'true'; engine.emit({ type: 'drag-start', source: root }); }
      const now = performance.now();
      const ratio = step / Math.max(root.clientWidth * .28, 80);
      velocity = clamp((event.clientX - previousX) / Math.max(now - last, 8) * ratio, -.6, .6);
      angle = origin + dx * ratio;
      previousX = event.clientX; last = now;
      reportFrame(engine.state.reduced ? 0 : angle);
    };
    const finish = (event: PointerEvent) => {
      if (event.pointerId !== pointer) return;
      pointer = -1;
      if (!dragging) return;
      dragging = false; root.dataset.dragging = 'false';
      if (root.hasPointerCapture(event.pointerId)) root.releasePointerCapture(event.pointerId);
      const cancelled = event.type === 'pointercancel';
      const projected = angle + (engine.state.reduced || cancelled ? 0 : velocity * 90);
      const steps = cancelled ? 0 : clamp(Math.round((projected - origin) / step), -2, 2);
      target = origin + steps * step;
      spring.position = angle; spring.velocity = engine.state.reduced ? 0 : clamp(velocity * 1000, -120, 120);
      if (steps) reportStep(-steps);
      engine.emit({ type: 'drag-end', source: root });
      last = 0;
      if (engine.state.reduced) { angle = target; reportFrame(0); } else frame = requestAnimationFrame(settle);
    };
    const cancelOnHidden = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; pointer = -1; dragging = false; root.dataset.dragging = 'false'; } };
    root.addEventListener('pointerdown', down); root.addEventListener('pointermove', move); root.addEventListener('pointerup', finish); root.addEventListener('pointercancel', finish);
    document.addEventListener('visibilitychange', cancelOnHidden);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener('pointerdown', down); root.removeEventListener('pointermove', move); root.removeEventListener('pointerup', finish); root.removeEventListener('pointercancel', finish);
      document.removeEventListener('visibilitychange', cancelOnHidden);
    };
  }, [engine, rootRef, step]);
}
