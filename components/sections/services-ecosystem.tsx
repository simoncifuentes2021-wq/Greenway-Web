'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { EcosystemSignal } from '@/components/ui/ecosystem-signal';
import { ServiceIcon } from '@/components/ui/service-icon';
import { servicePages } from '@/data/service-pages';
import { services } from '@/data/site';
import styles from './services-ecosystem.module.css';

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
  const [selectedSlug, setSelectedSlug] = useState('energias-renovables');
  const [centerSlug, setCenterSlug] = useState('energias-renovables');
  const [signalKey, setSignalKey] = useState(0);
  const [hasActivated, setHasActivated] = useState(false);
  const centerTimerRef = useRef<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const coreFeedbackRef = useRef<HTMLDivElement>(null);
  const coreAuraRef = useRef<HTMLDivElement>(null);
  const activeSlug = selectedSlug;
  const activeIndex = services.findIndex((service) => service.slug === activeSlug);
  const active = services[activeIndex] ?? services[0];
  const activeNode = nodes.find((node) => node.slug === activeSlug) ?? nodes[0];
  const media = mediaByService[activeSlug];
  const details = servicePages[activeSlug as keyof typeof servicePages];
  const outcomes = details.outcomes.slice(0, 3);
  const centerIndex = services.findIndex((service) => service.slug === centerSlug);
  const centerActive = services[centerIndex] ?? services[0];
  const centerMedia = mediaByService[centerSlug] ?? mediaByService[services[0].slug];

  useEffect(() => () => {
    if (centerTimerRef.current !== null) window.clearTimeout(centerTimerRef.current);
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    const feedback = coreFeedbackRef.current;
    const aura = coreAuraRef.current;
    if (!panel || !feedback || !aura || !hasActivated) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktopOrbit = window.matchMedia('(min-width: 1100px)').matches;
    const coreDelay = reduce || !desktopOrbit ? 0 : 620;
    const panelAnimation = panel.animate(
      reduce ? [{ opacity: .72 }, { opacity: 1 }] : [{ opacity: .64, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: reduce ? 160 : 220, easing: 'cubic-bezier(.23, 1, .32, 1)', fill: 'both' },
    );
    const coreAnimation = feedback.animate(
      reduce ? [{ opacity: .22 }, { opacity: .72 }, { opacity: .22 }] : [{ opacity: .18, transform: 'scale(.985)' }, { opacity: .96, transform: 'scale(1.025)', offset: .44 }, { opacity: .24, transform: 'scale(1)' }],
      { duration: reduce ? 180 : 680, delay: coreDelay, easing: 'cubic-bezier(.23, 1, .32, 1)', fill: 'both' },
    );
    const auraAnimation = aura.animate(
      reduce
        ? [{ opacity: 0 }, { opacity: .5 }, { opacity: 0 }]
        : [
            { opacity: 0, transform: 'translate(-50%, -50%) scale(.97)' },
            { opacity: .9, transform: 'translate(-50%, -50%) scale(1.045)', offset: .42 },
            { opacity: 0, transform: 'translate(-50%, -50%) scale(1.08)' },
          ],
      { duration: reduce ? 180 : 820, delay: coreDelay, easing: 'cubic-bezier(.23, 1, .32, 1)', fill: 'both' },
    );
    return () => { panelAnimation.cancel(); coreAnimation.cancel(); auraAnimation.cancel(); };
  }, [activeSlug, hasActivated, signalKey]);

  const selectService = (slug: string) => {
    setSelectedSlug(slug);
    setHasActivated(true);
    setSignalKey((current) => current + 1);
    if (centerTimerRef.current !== null) window.clearTimeout(centerTimerRef.current);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktopOrbit = window.matchMedia('(min-width: 1100px)').matches;
    centerTimerRef.current = window.setTimeout(() => {
      setCenterSlug(slug);
      centerTimerRef.current = null;
    }, desktopOrbit && !reduce ? 620 : 0);
  };

  const moveSelection = (direction: -1 | 1) => {
    const next = (activeIndex + direction + services.length) % services.length;
    selectService(services[next].slug);
  };

  const centerLabel = useMemo(() => `${String(centerIndex + 1).padStart(2, '0')} / 10 · Evento / Operación Greenway`, [centerIndex]);

  return (
    <section aria-labelledby="ecosistema-title" className={styles.section}>
      <div className="container-site">
        <div className={styles.heroGrid}>
          <div className={styles.intro}>
            <p className="eyebrow text-eco">Ecosistema de servicios</p>
            <h2 id="ecosistema-title">Una operación <em>conectada,</em> de principio a fin.</h2>
            <p>Integramos soluciones según la escala, el contexto y los objetivos ambientales de cada proyecto.</p>
            <div className={styles.introMeta} aria-label="Diez soluciones para una operación conectada"><span>10 soluciones</span><span>01 operación</span></div>
          </div>

          <div className={styles.orbitStage} aria-label="Ecosistema interactivo de servicios">
            <svg className={styles.connections} viewBox="0 0 1000 1000" aria-hidden="true">
              {hasActivated ? <EcosystemSignal key={signalKey} x={activeNode.x} y={activeNode.y} /> : null}
            </svg>

            <div ref={coreAuraRef} data-core-aura className={styles.centerAura} aria-hidden="true" />
            <div className={styles.center} id="ecosystem-center" aria-live="polite">
              <Image key={`center-media-${centerSlug}`} src={centerMedia.src} alt={`Imagen temporal de referencia para ${centerActive.name}`} fill sizes="(min-width: 1024px) 19rem, 82vw" className={styles.centerImage} style={{ objectPosition: centerMedia.position }} />
              <div className={styles.centerShade} />
              <div ref={coreFeedbackRef} className={styles.centerFeedback} aria-hidden="true" />
              <div key={`center-brand-${centerSlug}`} className={styles.centerBrand}><span className={styles.centerIcon}><ServiceIcon slug={centerSlug} /></span><p>{centerActive.name}</p><strong>{centerLabel}</strong></div>
              <span className={styles.reference}>Visual referencial</span>
            </div>

            <div className={styles.desktopNodes} aria-label="Seleccionar servicio">
              {nodes.map((node) => {
                const service = services.find((item) => item.slug === node.slug) ?? services[0];
                const index = services.findIndex((item) => item.slug === node.slug);
                const selected = node.slug === activeSlug;
                return (
                  <button
                    key={node.slug}
                    type="button"
                    aria-label={service.name}
                    aria-pressed={selected}
                    aria-controls="service-panel-desktop"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className={`${styles.node} ${node.x < 50 ? styles.nodeLeft : ''} ${selected ? styles.activeNode : ''}`}
                    onClick={() => selectService(node.slug)}
                  >
                    <span className={styles.nodeIcon}><ServiceIcon slug={node.slug} /></span>
                    <span className={styles.nodeCopy}><small>{String(index + 1).padStart(2, '0')}</small><strong>{service.name}</strong></span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.mobileArea}>
          <div className={styles.mobileCenter} aria-live="polite">
            <Image key={`mobile-media-${centerSlug}`} src={centerMedia.src} alt={`Imagen temporal de referencia para ${centerActive.name}`} fill sizes="82vw" className={styles.centerImage} style={{ objectPosition: centerMedia.position }} />
            <div className={styles.centerShade} />
            <div key={`mobile-brand-${centerSlug}`} className={styles.centerBrand}><span className={styles.centerIcon}><ServiceIcon slug={centerSlug} /></span><p>{centerActive.name}</p><strong>{centerLabel}</strong></div>
            <span className={styles.reference}>Visual referencial</span>
          </div>
          <div className={styles.mobileSelector} aria-label="Seleccionar servicio">
            {services.map((service, index) => (
              <button key={service.slug} type="button" aria-label={service.name} aria-pressed={service.slug === activeSlug} aria-controls="service-panel-mobile" className={service.slug === activeSlug ? styles.mobileActive : ''} onClick={() => selectService(service.slug)}>
                <ServiceIcon slug={service.slug} /><span>{String(index + 1).padStart(2, '0')}</span><strong>{service.name}</strong>
              </button>
            ))}
          </div>
        </div>

        <ActivePanel panelRef={panelRef} service={active} index={activeIndex} media={media} outcomes={outcomes} onPrevious={() => moveSelection(-1)} onNext={() => moveSelection(1)} />
      </div>
    </section>
  );
}

type ActivePanelProps = {
  panelRef: RefObject<HTMLDivElement | null>;
  service: (typeof services)[number];
  index: number;
  media: { src: string; position: string; label: string };
  outcomes: string[];
  onPrevious: () => void;
  onNext: () => void;
};

function ActivePanel({ panelRef, service, index, media, outcomes, onPrevious, onNext }: ActivePanelProps) {
  return (
    <div ref={panelRef} id="service-panel-desktop" className={styles.panel} aria-live="polite">
      <div id="service-panel-mobile" className={styles.panelCopy}>
        <p>{String(index + 1).padStart(2, '0')} / 10</p>
        <h3>{service.name}</h3>
        <span>{service.description}</span>
        <Link href={`/servicios/${service.slug}`}>Conocer servicio <span aria-hidden="true">→</span></Link>
      </div>
      <div className={styles.panelMedia}>
        <Image key={media.src} src={media.src} alt={`Imagen temporal de referencia para ${service.name}`} fill sizes="(min-width: 1024px) 34vw, 100vw" style={{ objectPosition: media.position }} />
        <span>{media.label} · referencia temporal</span>
      </div>
      <div className={styles.panelOutcomes}>
        {outcomes.map((outcome, outcomeIndex) => <div key={outcome}><ServiceIcon slug={service.slug} /><span><small>0{outcomeIndex + 1}</small>{outcome}</span></div>)}
      </div>
      <div className={styles.panelNavigation}>
        <button type="button" onClick={onPrevious} aria-label="Servicio anterior">↑</button>
        <div aria-hidden="true">{services.map((item) => <span key={item.slug} className={item.slug === service.slug ? styles.activeDot : ''} />)}</div>
        <button type="button" onClick={onNext} aria-label="Servicio siguiente">↓</button>
      </div>
    </div>
  );
}
