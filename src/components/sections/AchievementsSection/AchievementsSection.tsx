import { AvatarStage } from '@/components/layout/AvatarStage/AvatarStage';
import { ColumnsAroundAvatar } from '@/components/layout/ColumnsAroundAvatar/ColumnsAroundAvatar';
import { Section } from '@/components/layout/Section/Section';
import { SectionDecoration } from '@/components/layout/SectionDecoration/SectionDecoration';
import { SectionHeader } from '@/components/layout/SectionHeader/SectionHeader';
import { AchievementCard } from '@/components/sections/AchievementCard/AchievementCard';
import { HeadingTypes } from '@/components/ui/Heading/Heading.types';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import { getStaggeredRevealOrder } from '@/components/ui/Reveal/Reveal.helper';
import { RevealDirections } from '@/components/ui/Reveal/Reveal.types';
import { ACADEMIC_AND_CERTIFIED_MERITS, HACKATHON_AWARDS } from '@/content/achievements';
import { formatSectionNumber, SectionIds } from '@/content/sections';
import { useTranslation } from '@/i18n/useTranslation';

const HACKATHONS_FIRST_REVEAL_STEP = 1;
const MERITS_FIRST_REVEAL_STEP = 2;

export function AchievementsSection() {
  const translation = useTranslation();

  return (
    <Section id={SectionIds.Achievements}>
      <SectionDecoration
        sectionId={SectionIds.Achievements}
        label={formatSectionNumber(SectionIds.Achievements)}
      />
      <ColumnsAroundAvatar
        leftColumn={
          <>
            <Reveal>
              <SectionHeader
                sectionId={SectionIds.Achievements}
                sectionName={translation.sections.achievements}
                title={translation.achievements.title}
                headingKind={HeadingTypes.SectionCompact}
              />
            </Reveal>
            <AvatarStage sectionId={SectionIds.Achievements} />
            {HACKATHON_AWARDS.map((award, index) => (
              <Reveal
                key={award.title}
                order={getStaggeredRevealOrder(HACKATHONS_FIRST_REVEAL_STEP + index)}
                direction={RevealDirections.FromLeft}
              >
                <AchievementCard achievement={award} />
              </Reveal>
            ))}
          </>
        }
        rightColumn={ACADEMIC_AND_CERTIFIED_MERITS.map((merit, index) => (
          <Reveal
            key={merit.title}
            order={getStaggeredRevealOrder(MERITS_FIRST_REVEAL_STEP + index)}
            direction={RevealDirections.FromRight}
          >
            <AchievementCard achievement={merit} />
          </Reveal>
        ))}
      />
    </Section>
  );
}
