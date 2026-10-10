import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import { useTranslation } from '@/i18n/useTranslation';

import styles from './SpokenLanguages.module.css';

export function SpokenLanguages() {
  const { spokenLanguagesLabel, spokenLanguagesSummary } = useTranslation().about;

  return (
    <div className={styles.spokenLanguages}>
      <Text kind={TextTypes.Label} label={spokenLanguagesLabel} tone={TextTones.Muted} />
      <Text kind={TextTypes.ParagraphLarge} label={spokenLanguagesSummary} />
    </div>
  );
}
