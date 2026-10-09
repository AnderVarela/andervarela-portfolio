import styles from './SkillChip.module.css';

interface SkillChipProps {
  label: string;
}

export function SkillChip({ label }: SkillChipProps) {
  return <li className={styles.chip}>{label}</li>;
}
