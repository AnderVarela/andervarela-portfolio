import { Section } from '@/components/layout/Section/Section';
import { SectionDecoration } from '@/components/layout/SectionDecoration/SectionDecoration';
import { SectionHeader } from '@/components/layout/SectionHeader/SectionHeader';
import { SubsectionTitle } from '@/components/layout/SubsectionTitle/SubsectionTitle';
import { SkillAreaGroup } from '@/components/sections/SkillAreaGroup/SkillAreaGroup';
import { WorkingPrincipleList } from '@/components/sections/WorkingPrincipleList/WorkingPrincipleList';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import { RevealDirections, RevealOrders } from '@/components/ui/Reveal/Reveal.types';
import { formatSectionNumber, SectionIds } from '@/content/sections';
import { listSkillAreas } from '@/content/skills';
import { useTranslation } from '@/i18n/useTranslation';

import styles from './SkillsSection.module.css';

export function SkillsSection() {
  const translation = useTranslation();

  return (
    <Section id={SectionIds.Skills}>
      <SectionDecoration
        sectionId={SectionIds.Skills}
        label={formatSectionNumber(SectionIds.Skills)}
      />
      <div className={styles.layout}>
        <Reveal>
          <SectionHeader
            sectionId={SectionIds.Skills}
            sectionName={translation.sections.skills}
            title={translation.sections.skills}
          />
        </Reveal>
        <Reveal order={RevealOrders.Second} direction={RevealDirections.None}>
          <div className={styles.areas}>
            {listSkillAreas(translation).map((skillArea) => (
              <SkillAreaGroup key={skillArea.code} skillArea={skillArea} />
            ))}
          </div>
        </Reveal>
        <Reveal order={RevealOrders.Third} direction={RevealDirections.None}>
          <div className={styles.principles}>
            <SubsectionTitle label={translation.skills.principlesTitle} />
            <WorkingPrincipleList />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
