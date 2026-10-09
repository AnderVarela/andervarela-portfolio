import { TechnologyOrb } from '@/components/avatar/TechnologyOrb/TechnologyOrb';
import { ORBITING_TECHNOLOGY_LABELS } from '@/content/avatarPoses';

import styles from './TechnologyOrbit.module.css';

interface TechnologyOrbitProps {
  /* Pose a la que acompaña: la órbita aparece y desaparece con ella. */
  poseIndex: number;
}

export function TechnologyOrbit({ poseIndex }: TechnologyOrbitProps) {
  return (
    <svg data-avatar-pose={poseIndex} viewBox="0 0 400 717" className={styles.orbit}>
      {ORBITING_TECHNOLOGY_LABELS.map((label) => (
        <TechnologyOrb key={label} label={label} />
      ))}
    </svg>
  );
}
