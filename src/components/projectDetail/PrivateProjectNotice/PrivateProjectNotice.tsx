import { Icon } from '@/components/ui/Icon/Icon';
import { IconNames, IconSizes } from '@/components/ui/Icon/Icon.types';
import { Text } from '@/components/ui/Text/Text';
import { TextTypes } from '@/components/ui/Text/Text.types';
import { useTranslation } from '@/i18n/useTranslation';

import styles from './PrivateProjectNotice.module.css';

/* Explica por qué un proyecto privado no ofrece enlaces externos. */
export function PrivateProjectNotice() {
  const translation = useTranslation();

  return (
    <div className={styles.notice}>
      <span className={styles.icon}>
        <Icon name={IconNames.Lock} size={IconSizes.Large} />
      </span>
      <Text kind={TextTypes.P} label={translation.projectDetail.privateNote} />
    </div>
  );
}
