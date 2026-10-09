import { AvatarStage } from '@/components/layout/AvatarStage/AvatarStage';
import { Section } from '@/components/layout/Section/Section';
import { SectionDecoration } from '@/components/layout/SectionDecoration/SectionDecoration';
import { SectionHeader } from '@/components/layout/SectionHeader/SectionHeader';
import { ProjectsScrollProgress } from '@/components/sections/ProjectsScrollProgress/ProjectsScrollProgress';
import { ProjectsTrack } from '@/components/sections/ProjectsTrack/ProjectsTrack';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import { RevealDirections, RevealOrders } from '@/components/ui/Reveal/Reveal.types';
import { formatSectionNumber, SectionIds } from '@/content/sections';
import { useTranslation } from '@/i18n/useTranslation';

import { computePinnedHeight, useProjectsTrackOverflow } from './ProjectsSection.helper';
import styles from './ProjectsSection.module.css';

export function ProjectsSection() {
  const translation = useTranslation();
  const { trackWindowReference, trackReference, overflowDistance } = useProjectsTrackOverflow();

  return (
    <Section id={SectionIds.Projects} pinnedHeight={computePinnedHeight(overflowDistance)}>
      <SectionDecoration
        sectionId={SectionIds.Projects}
        label={formatSectionNumber(SectionIds.Projects)}
      />
      <div className={styles.layout}>
        <Reveal direction={RevealDirections.None} fadesOnExit={false}>
          <div className={styles.header}>
            <SectionHeader
              sectionId={SectionIds.Projects}
              sectionName={translation.sections.projects}
              title={translation.sections.projects}
            />
            <ProjectsScrollProgress />
          </div>
        </Reveal>
        <div className={styles.stage}>
          <AvatarStage sectionId={SectionIds.Projects} />
        </div>
        <div ref={trackWindowReference} className={styles.trackWindow}>
          <Reveal order={RevealOrders.Second} direction={RevealDirections.None} fadesOnExit={false}>
            <ProjectsTrack ref={trackReference} overflowDistance={overflowDistance} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
