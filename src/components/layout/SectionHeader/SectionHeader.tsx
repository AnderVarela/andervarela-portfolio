import { SectionEyebrow } from '@/components/layout/SectionEyebrow/SectionEyebrow';
import { Heading } from '@/components/ui/Heading/Heading';
import { HeadingTypes, type HeadingType } from '@/components/ui/Heading/Heading.types';
import { formatSectionNumber, type SectionId } from '@/content/sections';

import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  sectionId: SectionId;
  sectionName: string;
  title: string;
  headingKind?: HeadingType;
}

export function SectionHeader({
  sectionId,
  sectionName,
  title,
  headingKind = HeadingTypes.Section,
}: SectionHeaderProps) {
  return (
    <header className={styles.header}>
      <SectionEyebrow sectionNumber={formatSectionNumber(sectionId)} label={sectionName} />
      <Heading kind={headingKind} label={title} />
    </header>
  );
}
