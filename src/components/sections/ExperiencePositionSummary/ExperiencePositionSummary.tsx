import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import type { ExperiencePosition } from '@/content/experience';

import styles from './ExperiencePositionSummary.module.css';

interface ExperiencePositionSummaryProps {
  position: ExperiencePosition;
}

export function ExperiencePositionSummary({ position }: ExperiencePositionSummaryProps) {
  return (
    <div className={styles.summary}>
      <Text kind={TextTypes.Title} label={position.title} />
      <Text kind={TextTypes.Caption} label={position.placeAndPeriod} tone={TextTones.Muted} />
    </div>
  );
}
