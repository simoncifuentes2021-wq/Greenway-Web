'use client';

import { useEffect, useRef } from 'react';
import { clamp, damp } from '@/utils/motion-physics';
import { useLivingSystem } from './living-provider';
import { flowGeometry, pathData, pointOnFlow, type FlowVariant } from './flow-geometry';
import type { FlowMode } from './motion-engine';
import styles from './greenway-flow.module.css';

const modes: Record<FlowVariant, FlowMode> = { hero: 'awakening', connection: 'flowing', services: 'connecting', impact: 'expanding', technology: 'digitizing', footer: 'completing' };

export function GreenwayFlow({ variant = 'connection', className = '', intensity = 1 }: { variant?: FlowVariant; className?: string; intensity?: number }) {
  const engine = useLivingSystem();
  const svgRef = useRef<SVGSVGElement>(null);
  const initial = flowGeometry(variant, variant === 'footer' ? 1 : .3);
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const section = svg.closest('section, footer') ?? svg.parentElement!;
    const plane = svg.querySelector<SVGGElement>('[data-flow-plane]')!;
    const paths = svg.querySelectorAll<SVGPathElement>('[data-flow-path]');
    const particles = svg.querySelectorAll<SVGCircleElement>('[data-flow-particle]');
    const grid = svg.querySelector<SVGGElement>('[data-flow-grid]')!;
    const ripple = svg.querySelector<SVGCircleElement>('[data-flow-ripple]')!;
    let progress = .3, lastShape = -1, lastGeometryTime = 0, lastRipple = -2000, pulse: Animation | null = null;
    let points = flowGeometry(variant, progress), active = false;
    let drawable = true;
    const visibility = new IntersectionObserver(([entry]) => {
      drawable = entry.isIntersecting;
      if (!drawable) svg.dataset.running = 'false';
      engine.wake();
    });
    visibility.observe(svg);
    let particleTime = 0;
    const attraction = { x: 0, y: 0, strength: 0 };
    let metricsStarted = false;
    const metricTimers: ReturnType<typeof setTimeout>[] = [];
    const pulseAt = (x = 360, y = 320) => {
      if (engine.state.reduced || engine.state.quality === 'minimal') return;
      lastRipple = performance.now();
      ripple.setAttribute('cx', String(x)); ripple.setAttribute('cy', String(y));
      ripple.style.transformOrigin = `${x}px ${y}px`;
      pulse?.cancel();
      pulse = ripple.animate([{ opacity: .55, transform: 'scale(.72)' }, { opacity: 0, transform: 'scale(1.65)' }], { duration: 1400, easing: 'cubic-bezier(.16,1,.3,1)' });
    };
    const unwatch = engine.watch(section, (input) => {
      const frame = input.quality === 'minimal' ? { ...input, reduced: true, scrollVelocity: 0, pointerEnergy: 0 } : input;
      active = frame.visible && drawable;
      svg.dataset.running = String(active && !frame.reduced && frame.quality !== 'minimal');
      svg.dataset.quality = frame.quality;
      svg.dataset.mode = frame.reduced ? modes[variant] : variant === 'hero' && frame.pointerEnergy + Math.abs(frame.scrollVelocity) < .025 ? 'dormant' : modes[variant];
      if (!active) { pulse?.cancel(); return; }
      if (variant === 'impact' && !metricsStarted && frame.progress > .18) {
        metricsStarted = true;
        section.querySelectorAll<HTMLElement>('[data-metric]').forEach((metric, index) => {
          metricTimers.push(setTimeout(() => {
            metric.dataset.flowReached = 'true';
            engine.emit({ type: 'metric', source: metric });
          }, frame.reduced ? 0 : index * 220));
        });
      }
      if (frame.reduced) pulse?.cancel();
      if (!frame.reduced) particleTime += frame.dt * 1000;
      const targetProgress = variant === 'footer'
        ? clamp(1 - (frame.rect.bottom - innerHeight) / Math.min(frame.rect.height, innerHeight), 0, 1)
        : frame.progress;
      progress = frame.reduced ? (variant === 'footer' ? 1 : .65) : damp(progress, targetProgress, 7, frame.dt);
      const isPointerNear = frame.fine && frame.pointerY >= frame.rect.top && frame.pointerY <= frame.rect.bottom;
      const x = isPointerNear && !frame.reduced ? frame.x : 0;
      const y = isPointerNear && !frame.reduced ? frame.y : 0;
      attraction.strength = frame.reduced ? 0 : damp(attraction.strength, 0, 2, frame.dt);
      const stretch = frame.reduced ? 1 : 1 + Math.abs(frame.scrollVelocity) * .025;
      plane.style.transform = `translate(${x * 5 + attraction.x * attraction.strength * 6}px, ${y * 4 + frame.scrollVelocity * 5 + attraction.y * attraction.strength * 6}px) rotate(${x * 1.5}deg) scale(1, ${stretch})`;
      plane.style.opacity = String(clamp((variant === 'hero' ? .65 : .85) + frame.pointerEnergy * .14, 0, 1) * intensity);
      if ((Math.abs(progress - lastShape) > .002 && frame.time - lastGeometryTime > (frame.quality === 'full' ? 32 : 65)) || frame.reduced) {
        points = flowGeometry(variant, progress, frame.pointerEnergy);
        paths.forEach((path) => path.setAttribute('d', pathData(points)));
        lastShape = progress; lastGeometryTime = frame.time;
        if (variant === 'technology') {
          const reveal = frame.reduced ? 1 : clamp((progress - .1) * 4, 0, 1);
          section.querySelectorAll<HTMLElement>('[data-device-plane]').forEach((device, index) => {
            device.style.clipPath = `inset(0 ${Math.max(0, Math.round((1 - reveal) * 100 - index * 5))}% 0 0)`;
          });
        }
      }
      const digitizing = variant === 'technology' ? clamp((progress - .2) * 2.5, 0, 1) : 0;
      grid.style.opacity = String(digitizing * .8);
      grid.style.transform = `translateY(${(1 - digitizing) * 12}px)`;
      particles.forEach((particle, index) => {
        const offset = frame.reduced ? 0 : particleTime / (18000 + index * 1130);
        const point = pointOnFlow(points, (.12 + index * .14 + offset) % 1);
        particle.setAttribute('cx', point.x.toFixed(2)); particle.setAttribute('cy', point.y.toFixed(2));
      });
      svg.dataset.phase = String(Math.round(progress * 100));
      if (isPointerNear && frame.pointerEnergy > .45 && frame.time - lastRipple > 1700) {
        const bounds = svg.getBoundingClientRect();
        const px = (frame.pointerX - bounds.left) / Math.max(bounds.width, 1) * 640;
        const py = (frame.pointerY - bounds.top) / Math.max(bounds.height, 1) * 640;
        const nearest = Array.from({ length: 15 }, (_, index) => pointOnFlow(points, index / 15)).sort((a, b) => Math.hypot(a.x - px, a.y - py) - Math.hypot(b.x - px, b.y - py))[0];
        if (Math.hypot(nearest.x - px, nearest.y - py) < 80) pulseAt(nearest.x, nearest.y);
      }
    }, modes[variant]);
    const unlisten = engine.onEvent((event) => {
      if (!active || event.type === 'section') return;
      if (event.source && !section.contains(event.source)) return;
      if (!event.source && variant !== 'services') return;
      if ((event.type === 'cta' || event.type === 'activate') && event.source) {
        const button = event.source.getBoundingClientRect(), bounds = svg.getBoundingClientRect();
        attraction.x = clamp((button.left + button.width / 2 - bounds.left - bounds.width / 2) / Math.max(bounds.width / 2, 1));
        attraction.y = clamp((button.top + button.height / 2 - bounds.top - bounds.height / 2) / Math.max(bounds.height / 2, 1));
        attraction.strength = 1;
      }
      pulseAt(event.type === 'cta' || event.type === 'activate' ? 240 : 360, 360);
    });
    return () => {
      unwatch(); unlisten(); visibility.disconnect(); pulse?.cancel(); metricTimers.forEach(clearTimeout);
      if (variant === 'technology') section.querySelectorAll<HTMLElement>('[data-device-plane]').forEach((device) => { device.style.clipPath = ''; });
    };
  }, [engine, variant, intensity]);

  return (
    <svg ref={svgRef} data-greenway-flow={variant} data-mode={variant === 'hero' ? 'dormant' : modes[variant]} className={`${styles.flow} ${className}`} viewBox="0 0 640 640" fill="none" aria-hidden="true">
      <g className={styles.breath}>
        <g data-flow-plane className={styles.plane}>
          {[0, 1, 2, 3].map((index) => <path key={index} data-flow-path d={pathData(initial)} pathLength="1" transform={`translate(${index * 2.5} ${-index * 5})`} stroke="currentColor" strokeWidth={index === 1 ? 1.4 : .7} opacity={index === 1 ? .85 : .35} />)}
          {[0, 1, 2, 3, 4, 5].map((index) => { const point = pointOnFlow(initial, .1 + index * .15); return <circle key={index} data-flow-particle cx={point.x.toFixed(3)} cy={point.y.toFixed(3)} r={index % 2 ? 2 : 3} fill="currentColor" opacity=".75" />; })}
          <g data-flow-grid className={styles.grid}>
            {[0, 1, 2, 3, 4].map((row) => <path key={row} d={`M180 ${180 + row * 55}H560M${220 + row * 70} 150V470`} stroke="currentColor" strokeWidth=".8" opacity=".45" />)}
            {[0, 1, 2, 3, 4, 5].map((index) => <rect key={index} x={215 + index % 3 * 105} y={215 + Math.floor(index / 3) * 110} width="8" height="8" rx="1" fill="currentColor" />)}
          </g>
        </g>
      </g>
      <circle data-flow-ripple cx="360" cy="320" r="45" stroke="currentColor" strokeWidth="1" opacity="0" />
    </svg>
  );
}
