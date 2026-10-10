import { BrandMark } from '@/components/navigation/BrandMark/BrandMark';
import { ScrollProgressBar } from '@/components/navigation/ScrollProgressBar/ScrollProgressBar';
import { ScrollProgressOrientations } from '@/components/navigation/ScrollProgressBar/ScrollProgressBar.types';
import { Button } from '@/components/ui/Button/Button';
import { IconNames } from '@/components/ui/Icon/Icon.types';
import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import { SECTION_COUNT, SECTIONS, SectionIds } from '@/content/sections';
import { useTranslation } from '@/i18n/useTranslation';
import { buildSectionHash } from '@/scroll/locationHash.helper';
import { createSectionLinkHandler } from '@/scroll/sectionNavigation';
import { useMobileMenuStore } from '@/stores/useMobileMenuStore';
import { useScrollStore } from '@/stores/useScrollStore';
import { formatPositionInTotal } from '@/utils/formatting';

import styles from './MobileBar.module.css';

/* Barra superior de móvil: marca, sección actual y acceso al menú. */
export function MobileBar() {
  const translation = useTranslation();
  const activeSectionIndex = useScrollStore((state) => state.activeSectionIndex);
  const isMenuOpen = useMobileMenuStore((state) => state.isOpen);
  const openMenu = useMobileMenuStore((state) => state.openMenu);
  const activeSection = SECTIONS[activeSectionIndex] ?? SECTIONS[0];
  const activeSectionName = activeSection ? translation.sections[activeSection.nameKey] : '';
  const sectionStatus = `${formatPositionInTotal(activeSectionIndex + 1, SECTION_COUNT)} · ${activeSectionName}`;

  return (
    <header className={styles.mobileBar}>
      <a
        href={buildSectionHash(SectionIds.Home)}
        onClick={createSectionLinkHandler(SectionIds.Home)}
        className={styles.brand}
      >
        <BrandMark />
        <Text kind={TextTypes.Micro} label={sectionStatus} tone={TextTones.Muted} />
      </a>
      <Button
        label={translation.actions.menu}
        iconName={IconNames.Menu}
        isExpanded={isMenuOpen}
        opensDialog
        onClick={openMenu}
      />
      <ScrollProgressBar orientation={ScrollProgressOrientations.Horizontal} />
    </header>
  );
}
