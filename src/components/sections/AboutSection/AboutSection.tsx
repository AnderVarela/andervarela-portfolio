import { Section } from '@/components/layout/Section/Section';
import { SectionDecoration } from '@/components/layout/SectionDecoration/SectionDecoration';
import { SectionHeader } from '@/components/layout/SectionHeader/SectionHeader';
import { ProfileHighlightList } from '@/components/sections/ProfileHighlightList/ProfileHighlightList';
import { SpokenLanguages } from '@/components/sections/SpokenLanguages/SpokenLanguages';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import { RevealDirections, RevealOrders } from '@/components/ui/Reveal/Reveal.types';
import { Text } from '@/components/ui/Text/Text';
import { TextTypes } from '@/components/ui/Text/Text.types';
import { formatSectionNumber, SectionIds } from '@/content/sections';
import { useTranslation } from '@/i18n/useTranslation';

import styles from './AboutSection.module.css';

export function AboutSection() {
  const translation = useTranslation();

  return (
    <Section id={SectionIds.About}>
      <SectionDecoration
        sectionId={SectionIds.About}
        label={formatSectionNumber(SectionIds.About)}
      />
      <div className={styles.layout}>
        <div className={styles.content}>
          <Reveal>
            <SectionHeader
              sectionId={SectionIds.About}
              sectionName={translation.sections.about}
              title={translation.sections.about}
            />
          </Reveal>
          <Reveal order={RevealOrders.Second}>
            <Text kind={TextTypes.Lead} label={translation.about.summary} />
          </Reveal>
          <Reveal order={RevealOrders.Third}>
            <ProfileHighlightList />
          </Reveal>
          <Reveal order={RevealOrders.Fourth} direction={RevealDirections.None}>
            <SpokenLanguages />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
