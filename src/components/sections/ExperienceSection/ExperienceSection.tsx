import { AvatarStage } from '@/components/layout/AvatarStage/AvatarStage';
import { Section } from '@/components/layout/Section/Section';
import { SectionDecoration } from '@/components/layout/SectionDecoration/SectionDecoration';
import { SectionHeader } from '@/components/layout/SectionHeader/SectionHeader';
import { ExperiencePositionSummary } from '@/components/sections/ExperiencePositionSummary/ExperiencePositionSummary';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline/ExperienceTimeline';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import { RevealDirections, RevealOrders } from '@/components/ui/Reveal/Reveal.types';
import { CURRENT_POSITION } from '@/content/experience';
import { formatSectionNumber, SectionIds } from '@/content/sections';
import { useTranslation } from '@/i18n/useTranslation';

import styles from './ExperienceSection.module.css';

/* Scroll que se recorre con la sección fijada mientras avanzan los hitos. */
const PINNED_HEIGHT = '300vh';

export function ExperienceSection() {
  const translation = useTranslation();

  return (
    <Section id={SectionIds.Experience} pinnedHeight={PINNED_HEIGHT}>
      <SectionDecoration
        sectionId={SectionIds.Experience}
        label={formatSectionNumber(SectionIds.Experience)}
      />
      <div className={styles.layout}>
        <div className={styles.content}>
          <Reveal direction={RevealDirections.None} fadesOnExit={false}>
            <div className={styles.introduction}>
              <SectionHeader
                sectionId={SectionIds.Experience}
                sectionName={translation.sections.experience}
                title={translation.sections.experience}
              />
              <AvatarStage sectionId={SectionIds.Experience} />
              <ExperiencePositionSummary position={CURRENT_POSITION} />
            </div>
          </Reveal>
          <Reveal order={RevealOrders.Second} direction={RevealDirections.None} fadesOnExit={false}>
            <ExperienceTimeline milestones={CURRENT_POSITION.milestones} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
