import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import { SPOKEN_LANGUAGES_LABEL, SPOKEN_LANGUAGES_SUMMARY } from '@/content/profile';

import styles from './SpokenLanguages.module.css';

export function SpokenLanguages() {
  return (
    <div className={styles.spokenLanguages}>
      <Text kind={TextTypes.Label} label={SPOKEN_LANGUAGES_LABEL} tone={TextTones.Muted} />
      <Text kind={TextTypes.ParagraphLarge} label={SPOKEN_LANGUAGES_SUMMARY} />
    </div>
  );
}
