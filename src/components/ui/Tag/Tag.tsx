import { Icon } from '@/components/ui/Icon/Icon';
import { IconSizes, type IconName } from '@/components/ui/Icon/Icon.types';
import { joinClassNames } from '@/utils/classNames';

import styles from './Tag.module.css';
import { TagVariants, type TagVariant } from './Tag.types';

interface TagProps {
  label: string;
  variant?: TagVariant;
  iconName?: IconName;
}

export function Tag({ label, variant = TagVariants.Neutral, iconName }: TagProps) {
  return (
    <span className={joinClassNames(styles.tag, styles[variant])}>
      {iconName && <Icon name={iconName} size={IconSizes.Small} />}
      {label}
    </span>
  );
}
