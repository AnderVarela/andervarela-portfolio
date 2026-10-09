import { Text } from '@/components/ui/Text/Text';
import { TextTypes } from '@/components/ui/Text/Text.types';
import { formatSectionNumber, type SectionId } from '@/content/sections';
import { buildSectionHash } from '@/scroll/locationHash.helper';
import { createSectionLinkHandler } from '@/scroll/sectionNavigation';
import { joinClassNames } from '@/utils/classNames';

import styles from './SectionRailLink.module.css';

interface SectionRailLinkProps {
  sectionId: SectionId;
  label: string;
  isActive: boolean;
}

export function SectionRailLink({ sectionId, label, isActive }: SectionRailLinkProps) {
  return (
    <a
      href={buildSectionHash(sectionId)}
      onClick={createSectionLinkHandler(sectionId)}
      aria-current={isActive ? 'true' : undefined}
      aria-label={label}
      className={joinClassNames(styles.link, isActive && styles.active)}
    >
      <span className={styles.marker} aria-hidden="true" />
      <Text kind={TextTypes.Note} label={formatSectionNumber(sectionId)} />
      <span className={styles.name}>
        <Text kind={TextTypes.Label} label={label} />
      </span>
    </a>
  );
}
