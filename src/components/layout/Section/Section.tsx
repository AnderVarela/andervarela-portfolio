import type { CSSProperties, ReactNode } from 'react';

import { buildSectionTitleId, type SectionId } from '@/content/sections';
import { joinClassNames } from '@/utils/classNames';

import styles from './Section.module.css';

interface SectionProps {
  id: SectionId;
  children: ReactNode;
  /*
   * Altura total de una sección fijada: mientras se recorre, su contenido queda
   * anclado a la pantalla. Solo se aplica a partir de tableta.
   */
  pinnedHeight?: string;
}

export function Section({ id, children, pinnedHeight }: SectionProps) {
  const isPinned = pinnedHeight !== undefined;
  const pinnedStyle = { '--section-pinned-height': pinnedHeight } as CSSProperties;

  return (
    <section
      id={id}
      data-section
      aria-labelledby={buildSectionTitleId(id)}
      className={joinClassNames(styles.section, isPinned && styles.pinned)}
      style={isPinned ? pinnedStyle : undefined}
    >
      <div className={styles.viewport}>{children}</div>
    </section>
  );
}
