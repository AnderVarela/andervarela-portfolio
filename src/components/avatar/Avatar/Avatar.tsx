import { useRef } from 'react';

import { AvatarPoseImage } from '@/components/avatar/AvatarPoseImage/AvatarPoseImage';
import { TechnologyOrbit } from '@/components/avatar/TechnologyOrbit/TechnologyOrbit';
import { AVATAR_POSES } from '@/content/avatarPoses';
import { findSectionIndex, SectionIds } from '@/content/sections';
import { useTranslation } from '@/i18n/useTranslation';
import { useScrollStore } from '@/stores/useScrollStore';

import styles from './Avatar.module.css';
import { useAvatarMotion } from './Avatar.motion.helper';

const SKILLS_POSE_INDEX = findSectionIndex(SectionIds.Skills);

/* Capa 3: el personaje que acompaña todo el recorrido y cambia de pose en cada sección. */
export function Avatar() {
  const translation = useTranslation();
  const avatarReference = useRef<HTMLDivElement>(null);
  const activePoseIndex = useScrollStore((state) => state.avatarTimeline.poseIndex);
  const triggerWink = useAvatarMotion(avatarReference);
  const poseDescription = AVATAR_POSES[activePoseIndex]?.description ?? '';

  return (
    <div
      ref={avatarReference}
      role="img"
      aria-label={`${translation.accessibility.avatarDescription}: ${poseDescription}`}
      className={styles.avatar}
    >
      <div data-avatar-tilt className={styles.tilt}>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className={styles.winkArea}
          onClick={triggerWink}
        />
        {AVATAR_POSES.map((pose, poseIndex) => (
          <AvatarPoseImage key={pose.sectionId} poseIndex={poseIndex} imageUrl={pose.imageUrl} />
        ))}
        <TechnologyOrbit poseIndex={SKILLS_POSE_INDEX} />
      </div>
    </div>
  );
}
