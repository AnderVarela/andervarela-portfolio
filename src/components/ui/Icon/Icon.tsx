import { joinClassNames } from '@/utils/classNames';

import { getIconPath } from './Icon.helper';
import styles from './Icon.module.css';
import { IconSizes, type IconName, type IconSize } from './Icon.types';

interface IconProps {
  name: IconName;
  size?: IconSize;
}

export function Icon({ name, size = IconSizes.Medium }: IconProps) {
  return (
    <svg
      className={joinClassNames(styles.icon, styles[size])}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path d={getIconPath(name)} />
    </svg>
  );
}
