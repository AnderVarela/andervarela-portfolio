import { ExperienceMilestoneItem } from '@/components/sections/ExperienceMilestoneItem/ExperienceMilestoneItem';
import type { ExperienceMilestone } from '@/content/experience';

import styles from './ExperienceTimeline.module.css';

interface ExperienceTimelineProps {
  milestones: readonly ExperienceMilestone[];
}

export function ExperienceTimeline({ milestones }: ExperienceTimelineProps) {
  return (
    <ol className={styles.timeline}>
      {milestones.map((milestone, index) => (
        <ExperienceMilestoneItem
          key={milestone.description}
          milestone={milestone}
          milestoneIndex={index}
          milestoneCount={milestones.length}
        />
      ))}
    </ol>
  );
}
