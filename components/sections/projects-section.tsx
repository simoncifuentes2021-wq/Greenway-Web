'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './projects-section.module.css';

// Contenido de muestra: sustituir fotos, textos y cifras por casos autorizados.
const examples = [
  {
    category: 'Evento masivo',
    title: 'Una operación ambiental integrada en cada etapa.',
    description: 'Planificación de puntos de separación, coordinación de equipos en terreno y seguimiento de los materiales al cierre del evento.',
    image: '/media/temporary/greenway-hero-event.jpg',
    imageAlt: 'Imagen referencial de un evento al aire libre',
    imagePosition: 'center',
    metrics: [
      { value: '24', label: 'puntos de separación' },
      { value: '12 t', label: 'residuos gestionados' },
      { value: '68 %', label: 'material recuperado' },
    ],
  },
  {
    category: 'Gestión en terreno',
    title: 'Cada material tiene un recorrido que se puede seguir.',
    description: 'Un equipo en terreno organiza la separación, registra los flujos y prepara información clara para evaluar los resultados de la operación.',
    image: '/media/temporary/greenway-operations.jpg',
    imageAlt: 'Imagen referencial de personal separando materiales',
    imagePosition: 'center',
    metrics: [
      { value: '18', label: 'puntos operativos' },
      { value: '8,4 t', label: 'material clasificado' },
      { value: '4', label: 'flujos registrados' },
    ],
  },
  {
    category: 'Producción audiovisual',
    title: 'Sostenibilidad que acompaña a la producción.',
    description: 'Diseño de una operación flexible con gestión de residuos, orientación al equipo y datos de cierre para una producción temporal.',
    image: '/media/temporary/greenway-audiovisual.jpg',
    imageAlt: 'Imagen referencial de una producción audiovisual al aire libre',
    imagePosition: 'center',
    metrics: [
      { value: '6', label: 'jornadas de operación' },
      { value: '3,2 t', label: 'residuos gestionados' },
      { value: '74 %', label: 'material recuperado' },
    ],
  },
] as const;

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener('change', updatePreference);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { preference.removeEventListener('change', updatePreference); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (reducedMotion || !visible) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % examples.length), 7000);
    return () => window.clearTimeout(timer);
  }, [active, reducedMotion, visible]);

  return (
    <section ref={sectionRef} aria-labelledby="projects-title" className={styles.section}>
      <div className="container-site">
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>Proyectos en acción / Vista de ejemplo</p>
            <h2 id="projects-title">Así se ve el impacto <em>en terreno.</em></h2>
          </div>
          <p>Una muestra de cómo contaremos cada proyecto: lo que hicimos, cómo lo hicimos y qué resultados obtuvimos.</p>
        </div>

        <div className={styles.showcase} aria-roledescription="carrusel" aria-label="Ejemplos de proyectos Greenway">
          <div className={styles.media}>
            {examples.map((example, index) => (
              <div key={example.image} className={styles.mediaFrame} data-active={index === active} aria-hidden={index !== active}>
                <Image src={example.image} alt={example.imageAlt} fill sizes="(min-width: 900px) 62vw, 100vw" style={{ objectPosition: example.imagePosition }} />
              </div>
            ))}
            <span className={styles.photoNote}>Fotografía referencial · reemplazar por material autorizado</span>
            <span className={styles.imageIndex}>{String(active + 1).padStart(2, '0')} <span>/ {String(examples.length).padStart(2, '0')}</span></span>
          </div>

          <div className={styles.storyStack}>
            {examples.map((example, index) => (
              <article key={example.category} className={styles.story} data-active={index === active} aria-hidden={index !== active} aria-label={`Ejemplo ${index + 1} de ${examples.length}`}>
                <div className={styles.storyTop}>
                  <p className={styles.category}><span aria-hidden="true" />{example.category}</p>
                  <span className={styles.demoBadge}>Caso ilustrativo</span>
                </div>
                <div className={styles.storyCopy}>
                  <h3>{example.title}</h3>
                  <p>{example.description}</p>
                </div>
                <div className={styles.metrics} aria-label="Cifras de ejemplo">
                  {example.metrics.map((metric) => (
                    <div key={metric.label} className={styles.metric}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <button type="button" onClick={() => setActive((current) => (current - 1 + examples.length) % examples.length)} aria-label="Proyecto anterior" className={`${styles.arrow} ${styles.previous}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m14.5 5-7 7 7 7" /></svg>
          </button>
          <button type="button" onClick={() => setActive((current) => (current + 1) % examples.length)} aria-label="Proyecto siguiente" className={`${styles.arrow} ${styles.next}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9.5 5 7 7-7 7" /></svg>
          </button>
        </div>

        <p className={styles.disclaimer}>Vista de diseño. Eventos, fotografías y cifras son ilustrativos; no corresponden a resultados reales de Greenway.</p>
      </div>
    </section>
  );
}
