export const ScrollProgressOrientations = {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
} as const;

export type ScrollProgressOrientation =
  (typeof ScrollProgressOrientations)[keyof typeof ScrollProgressOrientations];
