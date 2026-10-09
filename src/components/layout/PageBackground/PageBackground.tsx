import styles from './PageBackground.module.css';

/* Capa 0: color base que se tiñe según la sección y rejilla con parallax lento. */
export function PageBackground() {
  return (
    <div aria-hidden="true" className={styles.background}>
      <div className={styles.grid} />
    </div>
  );
}
