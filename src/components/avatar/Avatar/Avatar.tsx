import { useRef } from 'react';

import { AvatarPoseImage } from '@/components/avatar/AvatarPoseImage/AvatarPoseImage';
import { TechnologyOrbit } from '@/components/avatar/TechnologyOrbit/TechnologyOrbit';
import { AVATAR_POSES } from '@/content/avatarPoses';
import { findSectionIndex, getSectionNameKey, SectionIds } from '@/content/sections';
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
  const activePose = AVATAR_POSES[activePoseIndex];
  const poseDescription = activePose
    ? translation.avatarPoses[getSectionNameKey(activePose.sectionId)]
    : '';

  return (
    <div ref={avatarReference} className={styles.avatar}>
      <div data-avatar-tilt className={styles.tilt}>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className={styles.winkArea}
          onClick={triggerWink}
        />
        <div
          role="img"
          aria-label={`${translation.accessibility.avatarDescription}: ${poseDescription}`}
          className={styles.poses}
        >
          {AVATAR_POSES.map((pose, poseIndex) => (
            <AvatarPoseImage
              key={pose.sectionId}
              pose={pose}
              poseIndex={poseIndex}
              isPriority={poseIndex === 0}
            />
          ))}
          <TechnologyOrbit poseIndex={SKILLS_POSE_INDEX} />
        </div>
      </div>
    </div>
  );
}
