import { useRef } from 'react';

import { usePointerSpotlight } from './PageBackground.helper';
import styles from './PageBackground.module.css';

/* Capa 0: color base que se tiñe según la sección, rejilla con parallax lento, foco y grano. */
export function PageBackground() {
  const spotlightReference = useRef<HTMLDivElement>(null);

  usePointerSpotlight(spotlightReference);

  return (
    <div aria-hidden="true" className={styles.background}>
      <div className={styles.grid} />
      <div ref={spotlightReference} className={styles.spotlight} />
      <div className={styles.grain} />
    </div>
  );
}
