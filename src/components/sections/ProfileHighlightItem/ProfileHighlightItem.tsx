import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import type { ProfileHighlight } from '@/content/profile';

import styles from './ProfileHighlightItem.module.css';

interface ProfileHighlightItemProps {
  highlight: ProfileHighlight;
}

export function ProfileHighlightItem({ highlight }: ProfileHighlightItemProps) {
  return (
    <li className={styles.highlight}>
      <Text kind={TextTypes.Figure} label={highlight.figure} tone={TextTones.Default} />
      <Text kind={TextTypes.P} label={highlight.description} tone={TextTones.Muted} isInline />
    </li>
  );
}
