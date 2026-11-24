'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { EcosystemSignal } from '@/components/ui/ecosystem-signal';
import { ServiceIcon } from '@/components/ui/service-icon';
import { services } from '@/data/site';
import styles from './services-ecosystem.module.css';
import { GreenwayFlow } from '@/components/living-system/greenway-flow';
import { useLivingSystem } from '@/components/living-system/living-provider';
import { useKineticDrag } from '@/hooks/use-kinetic-drag';
import { ServiceOrbit } from '@/components/living-system/service-orbit';
import { areServicesRelated } from '@/data/service-relations';
import { wrapIndex } from '@/utils/motion-physics';

const nodes = [
  { slug: 'reciclaje', x: 50, y: 4 },
  { slug: 'limpieza', x: 77.04, y: 12.79 },
  { slug: 'economia-circular', x: 93.75, y: 35.78 },
  { slug: 'huella-de-carbono', x: 93.75, y: 64.22 },
  { slug: 'energias-renovables', x: 77.04, y: 87.21 },
  { slug: 'asesoria-ambiental', x: 50, y: 96 },
  { slug: 'gestion-y-trazabilidad', x: 22.96, y: 87.21 },
  { slug: 'manejo-de-residuos', x: 6.25, y: 64.22 },
  { slug: 'movilidad-sostenible', x: 6.25, y: 35.78 },
  { slug: 'sustentabilidad-audiovisual', x: 22.96, y: 12.79 },
] as const;

const mediaByService: Record<string, { src: string; position: string; label: string }> = {
  reciclaje: { src: '/media/temporary/greenway-operations.jpg', position: 'center', label: 'Operación de reciclaje' },
  limpieza: { src: '/media/temporary/greenway-operations.jpg', position: '64% center', label: 'Operación de limpieza' },
  'economia-circular': { src: '/media/temporary/greenway-operations.jpg', position: '38% center', label: 'Continuidad de materiales' },
  'huella-de-carbono': { src: '/media/temporary/greenway-field-assessment.jpg', position: 'center', label: 'Medición ambiental' },
  'energias-renovables': { src: '/media/temporary/greenway-clean-energy.jpg', position: 'center', label: 'Energía e infraestructura' },
  'asesoria-ambiental': { src: '/media/temporary/greenway-field-assessment.jpg', position: '42% center', label: 'Análisis y planificación' },
  'gestion-y-trazabilidad': { src: '/media/temporary/greenway-field-assessment.jpg', position: '68% center', label: 'Datos y evidencia' },
  'manejo-de-residuos': { src: '/media/temporary/greenway-operations.jpg', position: '70% center', label: 'Clasificación y gestión' },
  'movilidad-sostenible': { src: '/media/temporary/greenway-clean-energy.jpg', position: '72% center', label: 'Movilidad sostenible' },
  'sustentabilidad-audiovisual': { src: '/media/temporary/greenway-audiovisual.jpg', position: 'center', label: 'Producción audiovisual' },
};

export function ServicesEcosystem() {
  const engine = useLivingSystem();
  const [selectedSlug, setSelectedSlug] = useState(() => engine.state.activeService ?? 'energias-renovables');
  const [signalKey, setSignalKey] = useState(0);
  const [hasActivated, setHasActivated] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [visited, setVisited] = useState(() => new Set(engine.visited));
  const [related, setRelated] = useState<[string, string] | null>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const coreFeedbackRef = useRef<HTMLDivElement>(null);
  const coreAuraRef = useRef<HTMLDivElement>(null);
  const activeSlug = selectedSlug;
  const centerSlug = selectedSlug;
  const activeIndex = services.findIndex((service) => service.slug === activeSlug);
  const activeNode = nodes.find((node) => node.slug === activeSlug) ?? nodes[0];
  const centerIndex = services.findIndex((service) => service.slug === centerSlug);
  const centerActive = services[centerIndex] ?? services[0];
  const centerMedia = mediaByService[centerSlug] ?? mediaByService[services[0].slug];
  useKineticDrag(orbitRef, {
    onStep: (steps) => moveSelection(steps),
    onFrame: (angle) => {
      orbitRef.current?.querySelectorAll<HTMLElement | SVGSVGElement>('[data-orbit-rotate]').forEach((plane) => { plane.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`; });
      orbitRef.current?.querySelectorAll<HTMLElement>('[data-orbit-node]').forEach((node) => {
        node.style.transform = `${node.dataset.nodeLeft === 'true' ? 'translate(calc(-100% + 1.675rem), -50%)' : 'translate(-1.675rem, -50%)'} rotate(${-angle}deg)`;
      });
    },
  });
  useEffect(() => {
    if (!related) return;
    const timer = setTimeout(() => setRelated(null), 2200);
    return () => clearTimeout(timer);
  }, [related]);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    return engine.watch(section, (frame) => {
      if (!frame.visible) return;
      const progress = frame.reduced ? 1 : Math.min(1, Math.max(0, (frame.progress - .05) * 3.5));
      section.querySelectorAll<SVGPathElement>('[data-living-connection]').forEach((path, index) => { path.style.strokeDashoffset = String(1 - Math.max(0, Math.min(1, progress * 1.3 - index * .025))); });
    }, 'connecting');
  }, [engine]);

  useEffect(() => {
    const feedback = coreFeedbackRef.current;
    const aura = coreAuraRef.current;
    if (!feedback || !aura || !hasActivated) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coreDelay = 0;
    const coreAnimation = feedback.animate(
      reduce ? [{ opacity: .22 }, { opacity: .5 }, { opacity: .22 }] : [{ opacity: .18, transform: 'scale(.995)' }, { opacity: .55, transform: 'scale(1.012)', offset: .46 }, { opacity: .24, transform: 'scale(1)' }],
      { duration: reduce ? 180 : 900, delay: coreDelay, easing: 'cubic-bezier(.2, .75, .25, 1)', fill: 'both' },
    );
    const auraAnimation = aura.animate(
      reduce
        ? [{ opacity: 0 }, { opacity: .5 }, { opacity: 0 }]
        : [
            { opacity: 0, transform: 'translate(-50%, -50%) scale(.99)' },
            { opacity: .5, transform: 'translate(-50%, -50%) scale(1.02)', offset: .46 },
            { opacity: 0, transform: 'translate(-50%, -50%) scale(1.045)' },
          ],
      { duration: reduce ? 180 : 1000, delay: coreDelay, easing: 'cubic-bezier(.2, .75, .25, 1)', fill: 'both' },
    );
    return () => { coreAnimation.cancel(); auraAnimation.cancel(); };
  }, [activeSlug, hasActivated, signalKey]);

  const selectService = (slug: string) => {
    engine.emit({ type: 'node', source: sectionRef.current ?? undefined, service: slug });
    setVisited(new Set(engine.visited));
    setHasActivated(true);
    if (slug === selectedSlug) return;
    setRelated(areServicesRelated(selectedSlug, slug) ? [selectedSlug, slug] : null);
    setSelectedSlug(slug);
    setSignalKey((current) => current + 1);
  };

  const moveSelection = (direction: number) => {
    const next = wrapIndex(activeIndex + direction, services.length);
    selectService(services[next].slug);
  };

  const centerLabel = useMemo(() => `${String(centerIndex + 1).padStart(2, '0')} / 10 · Evento / Operación Greenway`, [centerIndex]);

  return (
    <section ref={sectionRef} id="servicios-experiencia" aria-labelledby="ecosistema-title" className={styles.section} data-preview={hovered ?? ''}>
      <div className="container-site">
        <div className={styles.heroGrid}>
          <div className={styles.intro}>
            <p className="eyebrow text-eco">Ecosistema Greenway</p>
            <h2 id="ecosistema-title" data-story-heading>Servicios <em>y soluciones</em></h2>
            <p className={styles.description}>Sostenibilidad en acción, soluciones que reducen el impacto ambiental y aportan valor a cada evento y organización.</p>
            <p className={styles.instruction}>Selecciona un servicio en la rueda para conocerlo.</p>
          </div>

          <div className={styles.orbitStage} aria-label="Ecosistema interactivo de servicios">
            <div ref={orbitRef} data-depth-plane data-service-drag="desktop" className={styles.orbitPlane}>
            <GreenwayFlow variant="services" className={styles.brandRoute} />
            <svg data-orbit-rotate className={styles.connections} viewBox="0 0 1000 1000" aria-hidden="true">
              <ellipse cx="500" cy="500" rx="460" ry="460" className={styles.orbitLine} />
              {nodes.map((node) => <path key={node.slug} data-living-connection pathLength="1" d={`M${node.x * 10} ${node.y * 10} Q${500 + (node.x - 50) * 3} ${500 + (node.y - 50) * 7} 500 500`} className={node.slug === (hovered ?? activeSlug) ? styles.selectedConnection : styles.connection} />)}
              {related ? <path key={related.join('-')} data-service-relation d={`M${nodes.find((node) => node.slug === related[0])!.x * 10} ${nodes.find((node) => node.slug === related[0])!.y * 10} Q500 180 ${nodes.find((node) => node.slug === related[1])!.x * 10} ${nodes.find((node) => node.slug === related[1])!.y * 10}`} className={styles.relation} /> : null}
              {hasActivated ? <EcosystemSignal key={signalKey} x={activeNode.x} y={activeNode.y} /> : null}
            </svg>

            <div ref={coreAuraRef} data-core-aura className={styles.centerAura} aria-hidden="true" />
            <div className={styles.center} id="ecosystem-center" aria-live="polite">
              <Image key={`center-media-${centerSlug}`} src={centerMedia.src} alt={`Imagen temporal de referencia para ${centerActive.name}`} fill sizes="(min-width: 1200px) 21rem, 82vw" className={styles.centerImage} style={{ objectPosition: centerMedia.position }} />
              <div className={styles.centerShade} />
              <div ref={coreFeedbackRef} className={styles.centerFeedback} aria-hidden="true" />
              <div key={`center-brand-${centerSlug}`} className={styles.centerBrand}><span className={styles.centerIcon}><ServiceIcon slug={centerSlug} /></span><p>{centerActive.name}</p><strong>{centerLabel}</strong><a className={styles.centerLink} href={`/servicios/${centerSlug}`} aria-label={`Conocer servicio: ${centerActive.name}`}>Conocer servicio <span aria-hidden="true">↗</span></a></div>
              <span className={styles.reference}>Visual referencial</span>
            </div>

            <div data-orbit-rotate className={styles.desktopNodes} aria-label="Seleccionar servicio">
              {nodes.map((node) => {
                const service = services.find((item) => item.slug === node.slug) ?? services[0];
                const index = services.findIndex((item) => item.slug === node.slug);
                const selected = node.slug === activeSlug;
                return (
                  <button
                    key={node.slug}
                    data-orbit-node
                    data-node-left={node.x < 50}
                    data-visited={visited.has(node.slug)}
                    data-preview={hovered === node.slug}
                    type="button"
                    aria-label={service.name}
                    aria-pressed={selected}
                    aria-controls="ecosystem-center"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className={`${styles.node} ${node.x < 50 ? styles.nodeLeft : ''} ${selected ? styles.activeNode : ''}`}
                    onClick={() => selectService(node.slug)}
                    onPointerEnter={(event) => { if (event.pointerType === 'mouse') setHovered(node.slug); }}
                    onPointerLeave={() => setHovered(null)}
                    onFocus={() => setHovered(node.slug)}
                    onBlur={() => setHovered(null)}
                  >
                    <span className={styles.nodeIcon}><ServiceIcon slug={node.slug} /></span>
                    <span className={styles.nodeCopy}><small>{String(index + 1).padStart(2, '0')}</small><strong>{service.name}</strong></span>
                  </button>
                );
              })}
            </div>
            <span className={styles.dragHint} aria-hidden="true">ARRASTRA · EXPLORA</span>
            </div>
          </div>
        </div>

        <div className={styles.mobileArea}>
          <ServiceOrbit active={activeSlug} visited={visited} onSelect={selectService} onStep={moveSelection}>
          <div id="ecosystem-mobile-center" className={styles.touchCore} aria-live="polite">
            <Image key={`mobile-media-${centerSlug}`} src={centerMedia.src} alt={`Imagen temporal de referencia para ${centerActive.name}`} fill sizes="82vw" className={styles.centerImage} style={{ objectPosition: centerMedia.position }} />
            <div className={styles.centerShade} />
            <div key={`mobile-brand-${centerSlug}`} className={styles.centerBrand}><span className={styles.centerIcon}><ServiceIcon slug={centerSlug} /></span><p>{centerActive.name}</p><strong>{centerLabel}</strong><a className={styles.centerLink} href={`/servicios/${centerSlug}`} aria-label={`Conocer servicio: ${centerActive.name}`}>Conocer servicio <span aria-hidden="true">↗</span></a></div>
            <span className={styles.reference}>Visual referencial</span>
          </div>
          </ServiceOrbit>
        </div>

      </div>
    </section>
  );
}
