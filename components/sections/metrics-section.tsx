import type { CSSProperties } from 'react';
import { metrics } from '@/data/site';
import { AnimatedMetricValue } from '@/components/ui/animated-metric-value';
import styles from './metrics-section.module.css';

export function MetricsSection() {
  return (
    <section aria-labelledby="impacto-title" className={styles.section}>
      <div className={`container-site ${styles.container}`}>
        <h2 id="impacto-title" className="sr-only">Impacto y experiencia</h2>
        <dl className={styles.strip}>
          {metrics.map((metric, index) => (
            <div key={metric.label} data-metric className={styles.metric} style={{ '--metric-index': index } as CSSProperties}>
              <MetricIcon index={index} />
              <dd className={styles.value}><AnimatedMetricValue value={metric.value} delay={index * 80} /></dd>
              <dt>{metric.label}</dt>
              <span className={styles.confirmedStatus}>
                <i aria-hidden="true" />
                Confirmado
              </span>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function MetricIcon({ index }: { index: number }) {
  const paths = [
    <g key="experience"><rect x="4" y="5.5" width="16" height="14.5" rx="2" /><path d="M8 3v5M16 3v5M4 10h16M8.2 15l2 2 5-5" /></g>,
    <g key="projects"><path d="M8 20v-2.5a4 4 0 0 1 8 0V20M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM5.5 18v-1.5a3 3 0 0 1 2.2-2.9M18.5 18v-1.5a3 3 0 0 0-2.2-2.9M6.5 11a2.5 2.5 0 1 1 0-5M17.5 11a2.5 2.5 0 1 0 0-5" /></g>,
    <g key="residues"><path d="m8.1 7.2 2-3.2 1.6 2.5M10.1 4l-1.4 4.1-4.2-.5M16.9 8.1l3.7.1-1.4 2.5M20.6 8.2l-2.8-3.3-2.5 3.4M15.3 17.6l-1.9 3.2-1.6-2.5M13.4 20.8l1.3-4.1 4.3.5M8.1 16.6H5.2l-1.8-3.1 1.8-3.1M15.9 16.6h2.9l1.8-3.1M8.1 7.2H6.2" /></g>,
    <g key="clients"><path d="M5 21V5h10v16M15 10h4v11M8 8h4M8 12h4M8 16h4M3 21h18" /></g>,
  ];

  return <svg aria-hidden="true" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths[index]}</svg>;
}
