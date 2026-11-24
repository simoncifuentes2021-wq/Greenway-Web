import { GreenwayFlow } from './greenway-flow';
import styles from './internal-flow.module.css';

export function InternalFlow() {
  return <GreenwayFlow variant="connection" intensity={.55} className={styles.flow} />;
}
