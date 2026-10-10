import { AvatarPoseImage } from '@/components/avatar/AvatarPoseImage/AvatarPoseImage';
import { TechnologyOrbit } from '@/components/avatar/TechnologyOrbit/TechnologyOrbit';
import { AVATAR_POSES } from '@/content/avatarPoses';
import {
  SECTION_COUNT,
  SectionIds,
  findSectionIndex,
  getSectionNameKey,
  type SectionId,
} from '@/content/sections';
import { useTranslation } from '@/i18n/useTranslation';
import { joinClassNames } from '@/utils/classNames';
import { formatAsTwoDigits, formatPositionInTotal } from '@/utils/formatting';

import styles from './AvatarStage.module.css';

interface AvatarStageProps {
  sectionId: SectionId;
  isCompact?: boolean;
}

/*
 * Hueco que cada sección reserva al avatar en móvil. El avatar va dibujado dentro, con la
 * pose de la sección, y se desplaza con la página; así nunca tapa texto ni botones.
 */
export function AvatarStage({ sectionId, isCompact = false }: AvatarStageProps) {
  const translation = useTranslation();
  const sectionIndex = findSectionIndex(sectionId);
  const sectionPosition = sectionIndex + 1;
  const pose = AVATAR_POSES[sectionIndex];
  const poseDescription = translation.avatarPoses[getSectionNameKey(sectionId)];

  return (
    <div
      data-avatar-stage={sectionIndex}
      className={joinClassNames(styles.stage, isCompact && styles.compact)}
    >
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
          className={joinClassNames(styles.avatar, sectionIndex === 0 && styles.openingAvatar)}
        >
          <AvatarPoseImage pose={pose} isPriority={sectionIndex === 0} />
          {sectionId === SectionIds.Skills && <TechnologyOrbit poseIndex={sectionIndex} />}
        </div>
      )}
    </div>
  );
}
