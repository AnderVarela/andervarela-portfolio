import { joinClassNames } from '@/utils/classNames';

import styles from './ScrollProgressBar.module.css';
import type { ScrollProgressOrientation } from './ScrollProgressBar.types';

interface ScrollProgressBarProps {
  orientation: ScrollProgressOrientation;
}

/* Se dibuja sobre el borde del contenedor posicionado que la contiene. */
export function ScrollProgressBar({ orientation }: ScrollProgressBarProps) {
  return (
    <div aria-hidden="true" className={joinClassNames(styles.progressBar, styles[orientation])} />
  );
}
