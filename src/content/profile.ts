import type { Translation } from '@/i18n/translations/es';

export const PROFILE_NAME = 'Ander Varela';
export const PROFILE_FIRST_NAME = 'Ander';
export const PROFILE_NAME_IN_TWO_LINES = PROFILE_NAME.replace(' ', '\n');
export const PROFILE_INITIALS = 'AV';
export const PROFILE_DOMAIN = 'andervarela.es';

export interface ProfileHighlight {
  figure: string;
  description: string;
}

export function listProfileHighlights(translation: Translation): readonly ProfileHighlight[] {
  const { highlights } = translation.about;
  const { firstPlaceFigure } = translation.achievements;

  return [
    { figure: 'Kelea', description: highlights.currentRole },
    { figure: '3', description: highlights.clientProducts },
    { figure: firstPlaceFigure, description: highlights.hackathonWins },
  ];
}
