import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';

import styles from './SectionEyebrow.module.css';

interface SectionEyebrowProps {
  sectionNumber: string;
  label: string;
}

export function SectionEyebrow({ sectionNumber, label }: SectionEyebrowProps) {
  return (
    <div className={styles.eyebrow}>
      <Text kind={TextTypes.Eyebrow} label={sectionNumber} tone={TextTones.Default} />
      <span className={styles.rule} aria-hidden="true" />
      <Text kind={TextTypes.Eyebrow} label={label} tone={TextTones.Muted} />
    </div>
  );
}
