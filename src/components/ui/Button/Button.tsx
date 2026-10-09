import type { MouseEventHandler, Ref } from 'react';

import { Icon } from '@/components/ui/Icon/Icon';
import { IconSizes, type IconName } from '@/components/ui/Icon/Icon.types';
import { joinClassNames } from '@/utils/classNames';

import styles from './Button.module.css';
import {
  ButtonIconPositions,
  ButtonLabelVisibilities,
  ButtonSizes,
  ButtonVariants,
  type ButtonIconPosition,
  type ButtonLabelVisibility,
  type ButtonSize,
  type ButtonVariant,
} from './Button.types';

interface ButtonProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconName?: IconName;
  iconPosition?: ButtonIconPosition;
  labelVisibility?: ButtonLabelVisibility;
  isFullWidth?: boolean;
  isExpanded?: boolean;
  opensDialog?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

export function Button({
  label,
  onClick,
  variant = ButtonVariants.Secondary,
  size = ButtonSizes.Small,
  iconName,
  iconPosition = ButtonIconPositions.Trailing,
  labelVisibility = ButtonLabelVisibilities.Always,
  isFullWidth = false,
  isExpanded,
  opensDialog = false,
  ref,
}: ButtonProps) {
  const buttonClassName = joinClassNames(
    styles.button,
    styles[variant],
    styles[size],
    styles[iconPosition],
    styles[labelVisibility],
    isFullWidth && styles.fullWidth,
  );

  return (
    <button
      ref={ref}
      type="button"
      className={buttonClassName}
      onClick={onClick}
      aria-label={label}
      aria-expanded={isExpanded}
      aria-haspopup={opensDialog ? 'dialog' : undefined}
    >
      <span className={styles.label}>{label}</span>
      {iconName && <Icon name={iconName} size={IconSizes.Large} />}
    </button>
  );
}
