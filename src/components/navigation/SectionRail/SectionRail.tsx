import { BrandMark } from '@/components/navigation/BrandMark/BrandMark';
import { ScrollProgressBar } from '@/components/navigation/ScrollProgressBar/ScrollProgressBar';
import { ScrollProgressOrientations } from '@/components/navigation/ScrollProgressBar/ScrollProgressBar.types';
import { SectionRailLink } from '@/components/navigation/SectionRailLink/SectionRailLink';
import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import { PROFILE_DOMAIN } from '@/content/profile';
import { SECTIONS, SectionIds } from '@/content/sections';
import { useTranslation } from '@/i18n/useTranslation';
import { buildSectionHash } from '@/scroll/locationHash.helper';
import { createSectionLinkHandler } from '@/scroll/sectionNavigation';
import { useScrollStore } from '@/stores/useScrollStore';

import styles from './SectionRail.module.css';

/* Raíl lateral de navegación para tableta y escritorio. */
export function SectionRail() {
  const translation = useTranslation();
  const activeSectionIndex = useScrollStore((state) => state.activeSectionIndex);

  return (
    <nav aria-label={translation.accessibility.sectionsNavigation} className={styles.rail}>
      <ScrollProgressBar orientation={ScrollProgressOrientations.Vertical} />
      <a
        href={buildSectionHash(SectionIds.Home)}
        onClick={createSectionLinkHandler(SectionIds.Home)}
        className={styles.brand}
      >
        <BrandMark />
        <span className={styles.desktopOnly}>
          <Text kind={TextTypes.Micro} label={PROFILE_DOMAIN} tone={TextTones.Muted} />
        </span>
      </a>
      <ol className={styles.links}>
        {SECTIONS.map((section, index) => (
          <li key={section.id}>
            <SectionRailLink
              sectionId={section.id}
              label={translation.sections[section.nameKey]}
              isActive={index === activeSectionIndex}
            />
          </li>
        ))}
      </ol>
      <div className={styles.location}>
        <Text kind={TextTypes.Micro} label={translation.rail.city} tone={TextTones.Muted} />
        <Text kind={TextTypes.Micro} label={translation.rail.workMode} tone={TextTones.Muted} />
      </div>
    </nav>
  );
}
