import { IconNames, type IconName } from './Icon.types';

/* Trazos sobre una rejilla de 24 × 24. */
const PATH_BY_ICON_NAME: Record<IconName, string> = {
  [IconNames.ArrowRight]: 'M5 12h14M12 5l7 7-7 7',
  [IconNames.ArrowUpRight]: 'M7 7h10v10M7 17L17 7',
  [IconNames.ChevronLeft]: 'M15 18l-6-6 6-6',
  [IconNames.ChevronRight]: 'M9 18l6-6-6-6',
  [IconNames.Close]: 'M18 6L6 18M6 6l12 12',
  [IconNames.Copy]: 'M8 8h13v13H8zM4 16V4h12',
  [IconNames.Download]: 'M21 15v6H3v-6M7 10l5 5 5-5M12 15V3',
  [IconNames.Lock]: 'M4 11h16v10H4zM8 11V7a4 4 0 0 1 8 0v4',
  [IconNames.Menu]: 'M4 7h16M4 12h16M4 17h16',
  [IconNames.Moon]: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z',
  [IconNames.Sun]:
    'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41',
};

export function getIconPath(name: IconName): string {
  return PATH_BY_ICON_NAME[name];
}
