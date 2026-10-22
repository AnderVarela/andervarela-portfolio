import type { Translation } from '@/i18n/translations/es';
import { formatAsTwoDigits } from '@/utils/formatting';

export const SectionIds = {
  Home: 'inicio',
  About: 'sobre-mi',
  Experience: 'experiencia',
  Projects: 'proyectos',
  Skills: 'skills',
  Background: 'formacion',
  Contact: 'contacto',
} as const;

export type SectionId = (typeof SectionIds)[keyof typeof SectionIds];

export interface SectionDefinition {
  id: SectionId;
  nameKey: keyof Translation['sections'];
  /* Cuánto se tiñe el fondo con el color de acento mientras la sección está en pantalla. */
  backgroundTintPercentage: number;
  /* El avatar solo acompaña la entrada y la despedida; el resto de secciones es contenido. */
  hasAvatar: boolean;
}

export const SECTIONS: readonly SectionDefinition[] = [
  { id: SectionIds.Home, nameKey: 'home', backgroundTintPercentage: 0, hasAvatar: true },
  { id: SectionIds.About, nameKey: 'about', backgroundTintPercentage: 3, hasAvatar: false },
  {
    id: SectionIds.Experience,
    nameKey: 'experience',
    backgroundTintPercentage: 5,
    hasAvatar: false,
  },
  { id: SectionIds.Projects, nameKey: 'projects', backgroundTintPercentage: 2, hasAvatar: false },
  { id: SectionIds.Skills, nameKey: 'skills', backgroundTintPercentage: 4, hasAvatar: false },
  {
    id: SectionIds.Background,
    nameKey: 'background',
    backgroundTintPercentage: 3,
    hasAvatar: false,
  },
  { id: SectionIds.Contact, nameKey: 'contact', backgroundTintPercentage: 6, hasAvatar: true },
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

/* Id del titular de una sección: con él la región se anuncia por su nombre. */
export function buildSectionTitleId(sectionId: SectionId): string {
  return `${sectionId}-title`;
}
