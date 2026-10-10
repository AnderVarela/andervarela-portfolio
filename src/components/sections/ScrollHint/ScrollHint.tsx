import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import { useTranslation } from '@/i18n/useTranslation';

import styles from './ScrollHint.module.css';

/* Invita a bajar y se desvanece en cuanto empieza el scroll. */
export function ScrollHint() {
  const translation = useTranslation();

  return (
    <div aria-hidden="true" className={styles.scrollHint}>
      <span className={styles.line} />
      <Text kind={TextTypes.Label} label={translation.hero.scrollHint} tone={TextTones.Muted} />
    </div>
  );
}
