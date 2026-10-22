import { useRef } from 'react';

import { AvatarPoseImage } from '@/components/avatar/AvatarPoseImage/AvatarPoseImage';
import { AVATAR_POSES, describeAvatarPose } from '@/content/avatarPoses';
import { findSectionIndex, SECTIONS } from '@/content/sections';
import { useTranslation } from '@/i18n/useTranslation';
import { useScrollStore } from '@/stores/useScrollStore';

import styles from './Avatar.module.css';
import { useAvatarMotion } from './Avatar.motion.helper';

/* Capa 3: el personaje que abre la página y la despide. Entre medias se retira. */
export function Avatar() {
  const translation = useTranslation();
  const avatarReference = useRef<HTMLDivElement>(null);
  const activePoseIndex = useScrollStore((state) => state.avatarTimeline.poseIndex);
  const triggerWink = useAvatarMotion(avatarReference);
  const activePose = AVATAR_POSES.find((pose) => pose.sectionId === SECTIONS[activePoseIndex]?.id);
  const poseDescription = activePose ? describeAvatarPose(activePose, translation) : '';

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
          {AVATAR_POSES.map((pose, index) => (
            <AvatarPoseImage
              key={pose.sectionId}
              pose={pose}
              poseIndex={findSectionIndex(pose.sectionId)}
              isPriority={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
