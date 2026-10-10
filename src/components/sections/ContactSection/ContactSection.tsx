import { AvatarStage } from '@/components/layout/AvatarStage/AvatarStage';
import { Section } from '@/components/layout/Section/Section';
import { SectionDecoration } from '@/components/layout/SectionDecoration/SectionDecoration';
import { SectionHeader } from '@/components/layout/SectionHeader/SectionHeader';
import { DownloadCurriculumButton } from '@/components/navigation/DownloadCurriculumButton/DownloadCurriculumButton';
import { ContactRow } from '@/components/sections/ContactRow/ContactRow';
import { CopyEmailButton } from '@/components/sections/CopyEmailButton/CopyEmailButton';
import { PageFooter } from '@/components/sections/PageFooter/PageFooter';
import { ButtonSizes } from '@/components/ui/Button/Button.types';
import { HeadingTypes } from '@/components/ui/Heading/Heading.types';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import { RevealDirections, RevealOrders } from '@/components/ui/Reveal/Reveal.types';
import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import { CONTACT_EMAIL, EXTERNAL_PROFILES } from '@/content/contact';
import { formatSectionNumber, SectionIds } from '@/content/sections';
import { useTranslation } from '@/i18n/useTranslation';

import styles from './ContactSection.module.css';

export function ContactSection() {
  const translation = useTranslation();

  return (
    <Section id={SectionIds.Contact}>
      <SectionDecoration
        sectionId={SectionIds.Contact}
        label={formatSectionNumber(SectionIds.Contact)}
      />
      <div className={styles.layout}>
        <div className={styles.content}>
          <Reveal fadesOnExit={false}>
            <div className={styles.introduction}>
              <SectionHeader
                sectionId={SectionIds.Contact}
                sectionName={translation.sections.contact}
                title={translation.contact.title}
                headingKind={HeadingTypes.Contact}
              />
              <div className={styles.subtitle}>
                <Text
                  kind={TextTypes.ParagraphLarge}
                  label={translation.contact.subtitle}
                  tone={TextTones.Muted}
                />
              </div>
            </div>
          </Reveal>
          <AvatarStage sectionId={SectionIds.Contact} />
          <Reveal order={RevealOrders.Second} fadesOnExit={false}>
            <div className={styles.rows}>
              <ContactRow
                label={translation.contact.email}
                href={`mailto:${CONTACT_EMAIL}`}
                value={CONTACT_EMAIL}
                action={<CopyEmailButton />}
              />
              {EXTERNAL_PROFILES.map((profile) => (
                <ContactRow
                  key={profile.name}
                  label={profile.name}
                  href={profile.url}
                  value={profile.displayUrl}
                  opensInNewTab
                />
              ))}
            </div>
          </Reveal>
          <Reveal order={RevealOrders.Third} direction={RevealDirections.None} fadesOnExit={false}>
            <DownloadCurriculumButton size={ButtonSizes.Large} />
          </Reveal>
        </div>
        <PageFooter />
      </div>
    </Section>
  );
}
