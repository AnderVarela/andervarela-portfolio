import { SECTION_COUNT, findSectionIndex, type SectionId } from '@/content/sections';
import { joinClassNames } from '@/utils/classNames';
import { formatAsTwoDigits, formatPositionInTotal } from '@/utils/formatting';

import styles from './AvatarStage.module.css';

interface AvatarStageProps {
  sectionId: SectionId;
  isCompact?: boolean;
}

/*
 * Hueco que cada sección reserva al avatar en móvil. El avatar se coloca sobre el
 * escenario más visible, así nunca tapa texto ni botones.
 */
export function AvatarStage({ sectionId, isCompact = false }: AvatarStageProps) {
  const sectionIndex = findSectionIndex(sectionId);
  const sectionPosition = sectionIndex + 1;

  return (
    <div
      data-avatar-stage={sectionIndex}
      aria-hidden="true"
      className={joinClassNames(styles.stage, isCompact && styles.compact)}
    >
      <span className={styles.floorGlow} />
      <span className={styles.backdropNumber}>{formatAsTwoDigits(sectionPosition)}</span>
      <span className={styles.position}>
        {formatPositionInTotal(sectionPosition, SECTION_COUNT)}
      </span>
    </div>
  );
}
