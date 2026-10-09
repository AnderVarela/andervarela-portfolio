import { Text } from '@/components/ui/Text/Text';
import { TextTypes } from '@/components/ui/Text/Text.types';
import { formatSectionNumber, type SectionId } from '@/content/sections';
import { buildSectionHash } from '@/scroll/locationHash.helper';
import { createSectionLinkHandler } from '@/scroll/sectionNavigation';
import { useMobileMenuStore } from '@/stores/useMobileMenuStore';
import { joinClassNames } from '@/utils/classNames';

import styles from './MobileMenuLink.module.css';

interface MobileMenuLinkProps {
  sectionId: SectionId;
  label: string;
  isActive: boolean;
}

export function MobileMenuLink({ sectionId, label, isActive }: MobileMenuLinkProps) {
  const closeMenu = useMobileMenuStore((state) => state.closeMenu);

  return (
    <a
      href={buildSectionHash(sectionId)}
      onClick={createSectionLinkHandler(sectionId, closeMenu)}
      aria-current={isActive ? 'true' : undefined}
      className={joinClassNames(styles.link, isActive && styles.active)}
    >
      <span className={styles.number}>
        <Text kind={TextTypes.Caption} label={formatSectionNumber(sectionId)} />
      </span>
      <span className={styles.name}>{label}</span>
    </a>
  );
}
