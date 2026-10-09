import type { Translation } from '@/i18n/translations/es';
import { formatAsTwoDigits } from '@/utils/formatting';

export const SectionIds = {
  Home: 'inicio',
  About: 'sobre-mi',
  Experience: 'experiencia',
  Projects: 'proyectos',
  Achievements: 'logros',
  Education: 'estudios',
  Skills: 'skills',
  Contact: 'contacto',
} as const;

export type SectionId = (typeof SectionIds)[keyof typeof SectionIds];

export interface SectionDefinition {
  id: SectionId;
  nameKey: keyof Translation['sections'];
  /* Cuánto se tiñe el fondo con el color de acento mientras la sección está en pantalla. */
  backgroundTintPercentage: number;
}

export const SECTIONS: readonly SectionDefinition[] = [
  { id: SectionIds.Home, nameKey: 'home', backgroundTintPercentage: 0 },
  { id: SectionIds.About, nameKey: 'about', backgroundTintPercentage: 3 },
  { id: SectionIds.Experience, nameKey: 'experience', backgroundTintPercentage: 5 },
  { id: SectionIds.Projects, nameKey: 'projects', backgroundTintPercentage: 2 },
  { id: SectionIds.Achievements, nameKey: 'achievements', backgroundTintPercentage: 7 },
  { id: SectionIds.Education, nameKey: 'education', backgroundTintPercentage: 3 },
  { id: SectionIds.Skills, nameKey: 'skills', backgroundTintPercentage: 4 },
  { id: SectionIds.Contact, nameKey: 'contact', backgroundTintPercentage: 6 },
];

export const SECTION_COUNT = SECTIONS.length;

export function findSectionIndex(sectionId: string): number {
  return SECTIONS.findIndex((section) => section.id === sectionId);
}

export function formatSectionNumber(sectionId: SectionId): string {
  return formatAsTwoDigits(findSectionIndex(sectionId) + 1);
}

export type SectionNameKey = SectionDefinition['nameKey'];

export function getSectionNameKey(sectionId: SectionId): SectionNameKey {
  return SECTIONS.find((section) => section.id === sectionId)?.nameKey ?? 'home';
}
