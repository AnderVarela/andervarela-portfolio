import { joinClassNames } from '@/utils/classNames';

import styles from './SkillChip.module.css';

interface SkillChipProps {
  label: string;
  isFeatured?: boolean;
}

export function SkillChip({ label, isFeatured = false }: SkillChipProps) {
  return <li className={joinClassNames(styles.chip, isFeatured && styles.featured)}>{label}</li>;
}
