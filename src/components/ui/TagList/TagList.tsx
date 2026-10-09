import { Tag } from '@/components/ui/Tag/Tag';

import styles from './TagList.module.css';

interface TagListProps {
  labels: readonly string[];
}

export function TagList({ labels }: TagListProps) {
  return (
    <span className={styles.tagList}>
      {labels.map((label) => (
        <Tag key={label} label={label} />
      ))}
    </span>
  );
}
