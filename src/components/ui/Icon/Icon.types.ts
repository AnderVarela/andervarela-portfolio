export const IconNames = {
  ArrowRight: 'arrowRight',
  ArrowUpRight: 'arrowUpRight',
  ChevronLeft: 'chevronLeft',
  ChevronRight: 'chevronRight',
  Close: 'close',
  Copy: 'copy',
  Download: 'download',
  Lock: 'lock',
  Menu: 'menu',
  Moon: 'moon',
  Sun: 'sun',
} as const;

export type IconName = (typeof IconNames)[keyof typeof IconNames];

export const IconSizes = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
  ExtraLarge: 'extraLarge',
} as const;

export type IconSize = (typeof IconSizes)[keyof typeof IconSizes];
