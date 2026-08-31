'use client';

import { useEffect, useRef } from 'react';

export function AnimatedMetricValue({ value, delay = 0 }: { value: string; delay?: number }) {
  const visualRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = visualRef.current;
    if (!element) return;

    const target = Number(value.replace(/\D/g, ''));
    const prefix = value.startsWith('+') ? '+' : '';
    const suffix = value.endsWith('+') ? '+' : '';
    const formatter = new Intl.NumberFormat('es-CL');
    const finalValue = `${prefix}${formatter.format(target)}${suffix}`;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.textContent = finalValue;
      return;
    }

    let frame = 0;
    let animation: Animation | null = null;
    let countStart = 0;
    let running = false;
    const observedElement = element.closest('[data-metric]') ?? element;

    const stop = () => {
      window.cancelAnimationFrame(frame);
      animation?.cancel();
      animation = null;
      countStart = 0;
      running = false;
      element.textContent = finalValue;
    };

    const play = () => {
      running = true;
      countStart = 0;
      element.textContent = `${prefix}0${suffix}`;
      animation = element.animate(
        [
          { opacity: 0, transform: 'translateY(0.75rem)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration: 500, delay, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'both' },
      );

      const update = (timestamp: number) => {
        if (!countStart) countStart = timestamp;
        const elapsed = timestamp - countStart - delay;
        const progress = Math.min(Math.max(elapsed / 1000, 0), 1);
        element.textContent = `${prefix}${formatter.format(Math.round(target * progress))}${suffix}`;
        if (progress === 1) {
          element.textContent = finalValue;
          return;
        }
        frame = window.requestAnimationFrame(update);
      };
      frame = window.requestAnimationFrame(update);
    };

    let scrollFrame = 0;
    const updateVisibility = () => {
      window.cancelAnimationFrame(scrollFrame);
      scrollFrame = window.requestAnimationFrame(() => {
        const rect = observedElement.getBoundingClientRect();
        const visible = rect.top <= window.innerHeight * .8 && rect.bottom >= window.innerHeight * .2;
        if (visible && !running) play();
        if (!visible && running) stop();
      });
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
      window.cancelAnimationFrame(scrollFrame);
      stop();
    };
  }, [delay, value]);

  return (
    <>
      <span ref={visualRef} aria-hidden="true">{value}</span>
      <span className="sr-only">{value}</span>
    </>
  );
}
