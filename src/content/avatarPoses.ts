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
  imageUrl: string;
}

/* Una pose por sección, en el mismo orden que SECTIONS. La descripción la da la traducción. */
export const AVATAR_POSES: readonly AvatarPose[] = [
  { sectionId: SectionIds.Home, imageUrl: greetingImageUrl },
  { sectionId: SectionIds.About, imageUrl: armsCrossedImageUrl },
  { sectionId: SectionIds.Experience, imageUrl: laptopImageUrl },
  { sectionId: SectionIds.Projects, imageUrl: handsInPocketsImageUrl },
  { sectionId: SectionIds.Achievements, imageUrl: trophyImageUrl },
  { sectionId: SectionIds.Education, imageUrl: graduationCapImageUrl },
  { sectionId: SectionIds.Skills, imageUrl: armsRaisedImageUrl },
  { sectionId: SectionIds.Contact, imageUrl: greetingImageUrl },
];

export const ORBITING_TECHNOLOGY_LABELS: readonly string[] = ['TS', 'R', 'JS', 'AWS'];
