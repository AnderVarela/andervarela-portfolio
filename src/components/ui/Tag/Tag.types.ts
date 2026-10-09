export const TagVariants = {
  Neutral: 'neutral',
  Accent: 'accent',
  Outline: 'outline',
  Solid: 'solid',
} as const;

export type TagVariant = (typeof TagVariants)[keyof typeof TagVariants];
