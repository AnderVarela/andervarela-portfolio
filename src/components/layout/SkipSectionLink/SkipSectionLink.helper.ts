import {
  SECTIONS,
  findSectionIndex,
  type SectionDefinition,
  type SectionId,
} from '@/content/sections';

interface SkipDestination {
  section: SectionDefinition;
  /* La última sección no tiene siguiente: su enlace devuelve al principio. */
  isBackToTop: boolean;
}

export function findSkipDestination(sectionId: SectionId): SkipDestination | null {
  const nextSection = SECTIONS[findSectionIndex(sectionId) + 1];
  const destination = nextSection ?? SECTIONS[0];

  return destination ? { section: destination, isBackToTop: !nextSection } : null;
}
