import { AvatarStage } from '@/components/layout/AvatarStage/AvatarStage';
import { Section } from '@/components/layout/Section/Section';
import { SectionDecoration } from '@/components/layout/SectionDecoration/SectionDecoration';
import { SectionHeader } from '@/components/layout/SectionHeader/SectionHeader';
import { DegreeEntry } from '@/components/sections/DegreeEntry/DegreeEntry';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import { getStaggeredRevealOrder } from '@/components/ui/Reveal/Reveal.helper';
import { listDegrees } from '@/content/education';
import { formatSectionNumber, SectionIds } from '@/content/sections';
import { useTranslation } from '@/i18n/useTranslation';

import styles from './EducationSection.module.css';

const DEGREES_FIRST_REVEAL_STEP = 1;

export function EducationSection() {
  const translation = useTranslation();

  return (
    <Section id={SectionIds.Education}>
      <SectionDecoration
        sectionId={SectionIds.Education}
        label={formatSectionNumber(SectionIds.Education)}
      />
      <div className={styles.layout}>
        <div className={styles.content}>
          <Reveal>
            <SectionHeader
              sectionId={SectionIds.Education}
              sectionName={translation.sections.education}
              title={translation.sections.education}
            />
          </Reveal>
          <AvatarStage sectionId={SectionIds.Education} />
          {listDegrees(translation).map((degree, index) => (
            <Reveal
              key={degree.period}
              order={getStaggeredRevealOrder(DEGREES_FIRST_REVEAL_STEP + index)}
            >
              <DegreeEntry degree={degree} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
