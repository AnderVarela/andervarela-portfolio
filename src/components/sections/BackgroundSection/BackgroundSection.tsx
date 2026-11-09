import { Section } from '@/components/layout/Section/Section';
import { SectionDecoration } from '@/components/layout/SectionDecoration/SectionDecoration';
import { SectionHeader } from '@/components/layout/SectionHeader/SectionHeader';
import { SubsectionTitle } from '@/components/layout/SubsectionTitle/SubsectionTitle';
import { AchievementCard } from '@/components/sections/AchievementCard/AchievementCard';
import { DegreeEntry } from '@/components/sections/DegreeEntry/DegreeEntry';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import { RevealDirections, RevealOrders } from '@/components/ui/Reveal/Reveal.types';
import { listCertifications, listHackathonAwards } from '@/content/achievements';
import { listDegrees } from '@/content/education';
import { formatSectionNumber, SectionIds } from '@/content/sections';
import { useTranslation } from '@/i18n/useTranslation';

import styles from './BackgroundSection.module.css';

/* Estudios, premios y certificaciones en un solo bloque: apoyan la experiencia, no la encabezan. */
export function BackgroundSection() {
  const translation = useTranslation();
  const awards = [...listHackathonAwards(translation), ...listCertifications()];

  return (
    <Section id={SectionIds.Background}>
      <SectionDecoration
        sectionId={SectionIds.Background}
        label={formatSectionNumber(SectionIds.Background)}
      />
      <div className={styles.layout}>
        <Reveal>
          <SectionHeader
            sectionId={SectionIds.Background}
            sectionName={translation.sections.background}
            title={translation.sections.background}
          />
        </Reveal>
        <div className={styles.columns}>
          <Reveal order={RevealOrders.Second} direction={RevealDirections.None}>
            <div className={styles.block}>
              <SubsectionTitle label={translation.education.title} />
              {listDegrees(translation).map((degree) => (
                <DegreeEntry key={degree.period} degree={degree} />
              ))}
            </div>
          </Reveal>
          <Reveal order={RevealOrders.Third} direction={RevealDirections.None}>
            <div className={styles.block}>
              <SubsectionTitle label={translation.achievements.title} />
              <div className={styles.awards}>
                {awards.map((award) => (
                  <AchievementCard key={award.title} achievement={award} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
