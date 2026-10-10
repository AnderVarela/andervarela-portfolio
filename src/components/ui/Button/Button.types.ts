export const ButtonVariants = {
  Primary: 'primary',
  Secondary: 'secondary',
  Ghost: 'ghost',
} as const;

export type ButtonVariant = (typeof ButtonVariants)[keyof typeof ButtonVariants];

export const ButtonSizes = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
} as const;

export type ButtonSize = (typeof ButtonSizes)[keyof typeof ButtonSizes];

export const ButtonIconPositions = {
  Leading: 'leading',
  Trailing: 'trailing',
} as const;

export type ButtonIconPosition = (typeof ButtonIconPositions)[keyof typeof ButtonIconPositions];

export const ButtonLabelVisibilities = {
  Always: 'labelAlways',
  FromTablet: 'labelFromTablet',
  Never: 'labelNever',
} as const;

export type ButtonLabelVisibility =
  (typeof ButtonLabelVisibilities)[keyof typeof ButtonLabelVisibilities];
