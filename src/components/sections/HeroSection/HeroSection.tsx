import { AvatarStage } from '@/components/layout/AvatarStage/AvatarStage';
import { Section } from '@/components/layout/Section/Section';
import { SectionDecoration } from '@/components/layout/SectionDecoration/SectionDecoration';
import { SectionEyebrow } from '@/components/layout/SectionEyebrow/SectionEyebrow';
import { HeroActions } from '@/components/sections/HeroActions/HeroActions';
import { ScrollHint } from '@/components/sections/ScrollHint/ScrollHint';
import { Heading } from '@/components/ui/Heading/Heading';
import { HeadingLevels, HeadingTypes } from '@/components/ui/Heading/Heading.types';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import { RevealDirections, RevealOrders } from '@/components/ui/Reveal/Reveal.types';
import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import { PROFILE_FIRST_NAME, PROFILE_NAME_IN_TWO_LINES } from '@/content/profile';
import { buildSectionTitleId, formatSectionNumber, SectionIds } from '@/content/sections';
import { useTranslation } from '@/i18n/useTranslation';

import styles from './HeroSection.module.css';

export function HeroSection() {
  const translation = useTranslation();

  return (
    <Section id={SectionIds.Home}>
      <SectionDecoration sectionId={SectionIds.Home} label={PROFILE_FIRST_NAME.toUpperCase()} />
      <div className={styles.layout}>
        <div className={styles.content}>
          <Reveal direction={RevealDirections.None}>
            <SectionEyebrow
              sectionNumber={formatSectionNumber(SectionIds.Home)}
              label={translation.sections.home}
            />
          </Reveal>
          <Reveal direction={RevealDirections.LiftOnExit}>
            <Text kind={TextTypes.Greeting} label={translation.hero.greeting} />
            <Heading
              id={buildSectionTitleId(SectionIds.Home)}
              kind={HeadingTypes.Giant}
              level={HeadingLevels.Page}
              label={PROFILE_NAME_IN_TWO_LINES}
            />
          </Reveal>
          <Reveal order={RevealOrders.Second} direction={RevealDirections.LiftOnExit}>
            <div className={styles.role}>
              <Text kind={TextTypes.Role} label={translation.hero.role} tone={TextTones.Accent} />
              <Text
                kind={TextTypes.Caption}
                label={translation.hero.location}
                tone={TextTones.Muted}
              />
            </div>
          </Reveal>
          <AvatarStage sectionId={SectionIds.Home} isCompact />
          <Reveal order={RevealOrders.Third} direction={RevealDirections.LiftOnExit}>
            <div className={styles.tagline}>
              <Text kind={TextTypes.Lead} label={translation.hero.tagline} />
            </div>
          </Reveal>
          <Reveal order={RevealOrders.Fourth} direction={RevealDirections.None}>
            <HeroActions />
          </Reveal>
        </div>
      </div>
      <ScrollHint />
    </Section>
  );
}
