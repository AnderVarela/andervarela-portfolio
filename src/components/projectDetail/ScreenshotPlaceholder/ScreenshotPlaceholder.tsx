import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import { joinClassNames } from '@/utils/classNames';

import styles from './ScreenshotPlaceholder.module.css';

interface ScreenshotPlaceholderProps {
  label: string;
  isFeatured?: boolean;
}

/* Hueco de una captura que todavía no existe. */
export function ScreenshotPlaceholder({ label, isFeatured = false }: ScreenshotPlaceholderProps) {
  return (
    <div className={joinClassNames(styles.placeholder, isFeatured && styles.featured)}>
      <Text kind={TextTypes.Note} label={label} tone={TextTones.Muted} />
    </div>
  );
}
