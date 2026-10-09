import armsCrossedImageUrl from '@/assets/avatar/arms-crossed.png';
import armsRaisedImageUrl from '@/assets/avatar/arms-raised.png';
import graduationCapImageUrl from '@/assets/avatar/graduation-cap.png';
import greetingImageUrl from '@/assets/avatar/greeting.png';
import handsInPocketsImageUrl from '@/assets/avatar/hands-in-pockets.png';
import laptopImageUrl from '@/assets/avatar/laptop.png';
import trophyImageUrl from '@/assets/avatar/trophy.png';

import { SectionIds, type SectionId } from './sections';

export interface AvatarPose {
  sectionId: SectionId;
  description: string;
  imageUrl: string;
}

/* Una pose por sección, en el mismo orden que SECTIONS. */
export const AVATAR_POSES: readonly AvatarPose[] = [
  {
    sectionId: SectionIds.Home,
    description: 'Saluda con la mano y sonríe',
    imageUrl: greetingImageUrl,
  },
  {
    sectionId: SectionIds.About,
    description: 'Relajado, brazos cruzados',
    imageUrl: armsCrossedImageUrl,
  },
  { sectionId: SectionIds.Experience, description: 'Con el portátil', imageUrl: laptopImageUrl },
  {
    sectionId: SectionIds.Projects,
    description: 'Manos en el bolsillo, mira la tarjeta del cursor',
    imageUrl: handsInPocketsImageUrl,
  },
  {
    sectionId: SectionIds.Achievements,
    description: 'Levanta un trofeo',
    imageUrl: trophyImageUrl,
  },
  {
    sectionId: SectionIds.Education,
    description: 'Con birrete',
    imageUrl: graduationCapImageUrl,
  },
  {
    sectionId: SectionIds.Skills,
    description: 'Brazos arriba, con iconos de tecnologías',
    imageUrl: armsRaisedImageUrl,
  },
  { sectionId: SectionIds.Contact, description: 'Se despide', imageUrl: greetingImageUrl },
];

export const ORBITING_TECHNOLOGY_LABELS: readonly string[] = ['TS', 'R', 'JS', 'AWS'];
