import type { ReactNode } from 'react';

import { Icon } from '@/components/ui/Icon/Icon';
import { IconNames, IconSizes } from '@/components/ui/Icon/Icon.types';
import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import { VisuallyHidden } from '@/components/ui/VisuallyHidden/VisuallyHidden';
import { useTranslation } from '@/i18n/useTranslation';

import styles from './ContactRow.module.css';

interface ContactRowProps {
  label: string;
  href: string;
  value: string;
  opensInNewTab?: boolean;
  action?: ReactNode;
}

export function ContactRow({ label, href, value, opensInNewTab = false, action }: ContactRowProps) {
  const translation = useTranslation();

  return (
    <div className={styles.row}>
      <span className={styles.label}>
        <Text kind={TextTypes.Label} label={label} tone={TextTones.Muted} />
      </span>
      <a
        href={href}
        className={styles.value}
        target={opensInNewTab ? '_blank' : undefined}
        rel={opensInNewTab ? 'noopener noreferrer' : undefined}
      >
        {value}
        {opensInNewTab && <VisuallyHidden label={`(${translation.accessibility.opensInNewTab})`} />}
      </a>
      <span className={styles.trailing} aria-hidden={action ? undefined : 'true'}>
        {action ?? <Icon name={IconNames.ArrowUpRight} size={IconSizes.ExtraLarge} />}
      </span>
    </div>
  );
}
