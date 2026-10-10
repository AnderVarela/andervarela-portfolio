import type { CSSProperties } from 'react';

import { TagList } from '@/components/ui/TagList/TagList';
import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import type { ExperienceMilestone } from '@/content/experience';
import { formatPositionInTotal } from '@/utils/formatting';

import styles from './ExperienceMilestoneItem.module.css';

interface ExperienceMilestoneItemProps {
  milestone: ExperienceMilestone;
  milestoneIndex: number;
  milestoneCount: number;
}

export function ExperienceMilestoneItem({
  milestone,
  milestoneIndex,
  milestoneCount,
}: ExperienceMilestoneItemProps) {
  const milestoneStyle = { '--milestone-index': milestoneIndex } as CSSProperties;

  return (
    <li className={styles.milestone} style={milestoneStyle}>
      <span className={styles.marker} aria-hidden="true" />
      <Text kind={TextTypes.ParagraphLarge} label={milestone.description} />
      <div className={styles.footer}>
        <Text
          kind={TextTypes.Note}
          label={formatPositionInTotal(milestoneIndex + 1, milestoneCount)}
          tone={TextTones.Muted}
        />
        <TagList labels={milestone.technologies} />
      </div>
    </li>
  );
}
