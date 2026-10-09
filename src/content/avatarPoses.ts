import avatarPlaceholderUrl from '@/assets/avatar/avatar-placeholder.svg';

import { SectionIds, type SectionId } from './sections';

export interface AvatarPose {
  sectionId: SectionId;
  description: string;
  imageUrl: string;
}

/*
 * Una pose por sección, en el mismo orden que SECTIONS.
 * Las ilustraciones definitivas sustituyen al marcador de posición cambiando solo imageUrl.
 */
export const AVATAR_POSES: readonly AvatarPose[] = [
  {
    sectionId: SectionIds.Home,
    description: 'Saluda con la mano y sonríe',
    imageUrl: avatarPlaceholderUrl,
  },
  {
    sectionId: SectionIds.About,
    description: 'Relajado, brazos cruzados',
    imageUrl: avatarPlaceholderUrl,
  },
  {
    sectionId: SectionIds.Experience,
    description: 'Con el portátil',
    imageUrl: avatarPlaceholderUrl,
  },
  {
    sectionId: SectionIds.Projects,
    description: 'Manos en el bolsillo, mira la tarjeta del cursor',
    imageUrl: avatarPlaceholderUrl,
  },
  {
    sectionId: SectionIds.Achievements,
    description: 'Levanta un trofeo',
    imageUrl: avatarPlaceholderUrl,
  },
  { sectionId: SectionIds.Education, description: 'Con birrete', imageUrl: avatarPlaceholderUrl },
  {
    sectionId: SectionIds.Skills,
    description: 'Brazos arriba, con iconos de tecnologías',
    imageUrl: avatarPlaceholderUrl,
  },
  { sectionId: SectionIds.Contact, description: 'Se despide', imageUrl: avatarPlaceholderUrl },
];

export const ORBITING_TECHNOLOGY_LABELS: readonly string[] = ['TS', 'R', 'JS', 'AWS'];
