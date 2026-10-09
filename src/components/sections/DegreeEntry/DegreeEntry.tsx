import { Tag } from '@/components/ui/Tag/Tag';
import { TagVariants } from '@/components/ui/Tag/Tag.types';
import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import type { Degree } from '@/content/education';

import styles from './DegreeEntry.module.css';

interface DegreeEntryProps {
  degree: Degree;
}

export function DegreeEntry({ degree }: DegreeEntryProps) {
  return (
    <article className={styles.entry}>
      <span className={styles.period}>{degree.period}</span>
      <div className={styles.details}>
        <Text kind={TextTypes.Title} label={degree.title} />
        <Text kind={TextTypes.P} label={degree.institution} tone={TextTones.Muted} />
        {degree.distinction && <Tag label={degree.distinction} variant={TagVariants.Accent} />}
      </div>
    </article>
  );
}
