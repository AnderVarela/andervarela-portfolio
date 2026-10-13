import type { CSSProperties } from 'react';

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
import { formatAsTwoDigits, formatPositionInTotal } from '@/utils/formatting';

import styles from './AvatarStage.module.css';

interface AvatarStageProps {
  sectionId: SectionId;
}

/*
 * Hueco que cada sección reserva al avatar en móvil. El avatar va dibujado dentro, con la
 * pose de la sección, y se desplaza con la página; así nunca tapa texto ni botones.
 * El personaje mide lo mismo en todas: el hueco crece lo que pida la pose.
 */
export function AvatarStage({ sectionId }: AvatarStageProps) {
  const translation = useTranslation();
  const sectionIndex = findSectionIndex(sectionId);
  const sectionPosition = sectionIndex + 1;
  const pose = AVATAR_POSES[sectionIndex];
  const poseDescription = translation.avatarPoses[getSectionNameKey(sectionId)];
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
          {sectionId === SectionIds.Skills && <TechnologyOrbit poseIndex={sectionIndex} />}
        </div>
      )}
    </div>
  );
}
