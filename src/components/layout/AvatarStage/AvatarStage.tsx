import type { CSSProperties } from 'react';

import { AvatarPoseImage } from '@/components/avatar/AvatarPoseImage/AvatarPoseImage';
import { describeAvatarPose, findAvatarPose } from '@/content/avatarPoses';
import { SECTION_COUNT, findSectionIndex, type SectionId } from '@/content/sections';
import { useTranslation } from '@/i18n/useTranslation';
import { formatAsTwoDigits, formatPositionInTotal } from '@/utils/formatting';

import styles from './AvatarStage.module.css';

interface AvatarStageProps {
  sectionId: SectionId;
}

/*
 * Hueco que reservan al avatar en móvil las secciones que lo llevan. El avatar va dibujado
 * dentro, con la pose de la sección, y se desplaza con la página; así nunca tapa texto ni botones.
 */
export function AvatarStage({ sectionId }: AvatarStageProps) {
  const translation = useTranslation();
  const sectionIndex = findSectionIndex(sectionId);
  const sectionPosition = sectionIndex + 1;
  const pose = findAvatarPose(sectionId);
  const poseDescription = pose ? describeAvatarPose(pose, translation) : '';
  const figureScale = { '--figure-scale': pose?.figureScale ?? 1 } as CSSProperties;

  return (
    <div data-avatar-stage={sectionIndex} style={figureScale} className={styles.stage}>
      <span aria-hidden="true" className={styles.backdrop}>
        <span className={styles.floorGlow} />
        <span className={styles.backdropNumber}>{formatAsTwoDigits(sectionPosition)}</span>
      </span>
      <span aria-hidden="true" className={styles.position}>
        {formatPositionInTotal(sectionPosition, SECTION_COUNT)}
      </span>
      {pose && (
        <div
          role="img"
          aria-label={`${translation.accessibility.avatarDescription}: ${poseDescription}`}
          className={styles.avatar}
        >
          <AvatarPoseImage pose={pose} isPriority={sectionIndex === 0} />
        </div>
      )}
    </div>
  );
}
