import type { MouseEvent } from 'react';

import type { SectionId } from '@/content/sections';
import { useTranslation } from '@/i18n/useTranslation';
import { buildSectionHash } from '@/scroll/locationHash.helper';
import { moveToSection } from '@/scroll/sectionNavigation';

import { findSkipDestination } from './SkipSectionLink.helper';
import styles from './SkipSectionLink.module.css';

interface SkipSectionLinkProps {
  sectionId: SectionId;
}

/*
 * Primer elemento de cada sección al navegar con el teclado: permite saltársela
 * entera. Solo se ve cuando recibe el foco con el tabulador.
 */
export function SkipSectionLink({ sectionId }: SkipSectionLinkProps) {
  const translation = useTranslation();
  const destination = findSkipDestination(sectionId);

  if (!destination) return null;

  const destinationId = destination.section.id;
  const destinationName = translation.sections[destination.section.nameKey];
  const label = destination.isBackToTop
    ? translation.accessibility.backToTop
    : `${translation.accessibility.skipToSection} ${destinationName}`;

  function skipSection(event: MouseEvent<HTMLAnchorElement>): void {
    event.preventDefault();
    moveToSection(destinationId);
  }

  return (
    <a href={buildSectionHash(destinationId)} onClick={skipSection} className={styles.skipLink}>
      {label}
    </a>
  );
}
