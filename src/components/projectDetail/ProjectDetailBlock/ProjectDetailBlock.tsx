import type { ReactNode } from 'react';

import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';

import styles from './ProjectDetailBlock.module.css';

interface ProjectDetailBlockProps {
  label: string;
  children: ReactNode;
}

export function ProjectDetailBlock({ label, children }: ProjectDetailBlockProps) {
  return (
    <section aria-label={label} className={styles.block}>
      <Text kind={TextTypes.Label} label={label} tone={TextTones.Muted} />
      {children}
    </section>
  );
}
