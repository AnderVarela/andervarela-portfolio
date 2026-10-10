import { AvatarStage } from '@/components/layout/AvatarStage/AvatarStage';
import { ColumnsAroundAvatar } from '@/components/layout/ColumnsAroundAvatar/ColumnsAroundAvatar';
import { Section } from '@/components/layout/Section/Section';
import { SectionDecoration } from '@/components/layout/SectionDecoration/SectionDecoration';
import { SectionHeader } from '@/components/layout/SectionHeader/SectionHeader';
import { SkillAreaGroup } from '@/components/sections/SkillAreaGroup/SkillAreaGroup';
import { HeadingTypes } from '@/components/ui/Heading/Heading.types';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import { RevealDirections, RevealOrders } from '@/components/ui/Reveal/Reveal.types';
import { formatSectionNumber, SectionIds } from '@/content/sections';
import { listSkillAreasLeftOfAvatar, listSkillAreasRightOfAvatar } from '@/content/skills';
import { useTranslation } from '@/i18n/useTranslation';

export function SkillsSection() {
  const translation = useTranslation();

  return (
    <Section id={SectionIds.Skills}>
      <SectionDecoration
        sectionId={SectionIds.Skills}
        label={formatSectionNumber(SectionIds.Skills)}
      />
      <ColumnsAroundAvatar
        leftColumn={
          <>
            <Reveal direction={RevealDirections.None}>
              <SectionHeader
                sectionId={SectionIds.Skills}
                sectionName={translation.sections.skills}
                title={translation.sections.skills}
                headingKind={HeadingTypes.SectionCompact}
              />
            </Reveal>
            <AvatarStage sectionId={SectionIds.Skills} />
            {listSkillAreasLeftOfAvatar(translation).map((skillArea) => (
              <Reveal
                key={skillArea.code}
                order={RevealOrders.Second}
                direction={RevealDirections.FromLeft}
              >
                <SkillAreaGroup skillArea={skillArea} />
              </Reveal>
            ))}
          </>
        }
        rightColumn={listSkillAreasRightOfAvatar(translation).map((skillArea) => (
          <Reveal
            key={skillArea.code}
            order={RevealOrders.Third}
            direction={RevealDirections.FromRight}
          >
            <SkillAreaGroup skillArea={skillArea} />
          </Reveal>
        ))}
      />
    </Section>
  );
}
