'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import { processSteps } from '@/data/home';
import styles from './process-section.module.css';

const trustPoints = [
  ['01', 'Planificación a medida'],
  ['02', 'Respuesta operacional'],
  ['03', 'Documentación y reportabilidad'],
  ['04', 'Equipo profesional capacitado'],
] as const;

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    section.dataset.motionReady = 'true';

    if (reduceMotion) {
      section.dataset.visible = 'true';
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.dataset.visible = 'true';
        observer.disconnect();
      },
      { threshold: 0.22, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const previewStep = (event: PointerEvent<HTMLButtonElement>, index: number) => {
    if (event.pointerType === 'mouse') setActiveStep(index);
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="process-title"
      className={styles.section}
    >
      <div className={`container-site ${styles.inner}`}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Cómo trabajamos</p>
          <h2 id="process-title">Un proceso personalizado, de principio a fin.</h2>
          <p>
            Planificamos cada operación según el servicio, la escala y los requerimientos de
            cada organización.
          </p>
        </div>

        <ol className={styles.timeline}>
          {processSteps.map((step, index) => (
            <li
              key={step.number}
              className={styles.step}
              data-state={index < activeStep ? 'complete' : index === activeStep ? 'active' : 'upcoming'}
              style={{ '--step-index': index } as CSSProperties}
            >
              {index < processSteps.length - 1 ? <span className={styles.connector} aria-hidden="true" /> : null}

              <button
                type="button"
                className={styles.stepButton}
                aria-label={`Etapa ${step.number}: ${step.title}`}
                aria-pressed={index === activeStep}
                onClick={() => setActiveStep(index)}
                onFocus={() => setActiveStep(index)}
                onPointerEnter={(event) => previewStep(event, index)}
              >
                <span className={styles.visual} aria-hidden="true">
                  <span className={styles.number}>{step.number}</span>
                  <span className={styles.orbit}>
                    <span className={styles.icon}>
                      <ProcessIcon index={index} />
                    </span>
                  </span>
                </span>

                <span className={styles.stepCopy}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div className={styles.trustBlock}>
          <div className={styles.experience}>
            <strong>+10</strong>
            <span>Años de experiencia</span>
          </div>

          <div className={styles.trustContent}>
            <p className={styles.trustStatement}>
              Experiencia en terreno para coordinar cada operación, responder ante
              contingencias y entregar la documentación y reportabilidad que corresponda al
              servicio.
            </p>

            <ul className={styles.trustPoints} aria-label="Atributos del proceso Greenway">
              {trustPoints.map(([number, label]) => (
                <li key={number}>
                  <span>{number}</span>
                  <strong>{label}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessIcon({ index }: { index: number }) {
  const paths = [
    <g key="diagnostic">
      <circle cx="10.5" cy="10.5" r="5.5" />
      <path d="m15 15 4 4M10.5 7.5v6M7.5 10.5h6" />
    </g>,
    <g key="planning">
      <path d="M7 4h10v3H7zM6 6H4v15h16V6h-2M8 11h8M8 15h5" />
      <path d="m8 18 1.5 1.5L13 16" />
    </g>,
    <g key="implementation">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
    </g>,
    <g key="traceability">
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="8" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="m8 6 8 2M7 8l1 8M10 18h6M17 10l1 6" />
    </g>,
    <g key="results">
      <path d="M4 19V5M4 19h16M7 15l4-4 3 2 5-6" />
      <path d="M16 7h3v3" />
    </g>,
  ];

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[index]}
    </svg>
  );
}
