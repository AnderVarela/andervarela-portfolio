import { getSectionNameKey, type SectionId } from '@/content/sections';
import { joinClassNames } from '@/utils/classNames';

import styles from './SectionDecoration.module.css';

interface SectionDecorationProps {
  sectionId: SectionId;
  label: string;
}

/*
 * Tipografía gigante de fondo que se desplaza a distinto ritmo que el contenido.
 * El marco la recorta a su sección para que no asome sobre la anterior.
 */
export function SectionDecoration({ sectionId, label }: SectionDecorationProps) {
  return (
    <div aria-hidden="true" className={styles.frame}>
      <div className={joinClassNames(styles.decoration, styles[getSectionNameKey(sectionId)])}>
        {label}
      </div>
    </div>
  );
}
