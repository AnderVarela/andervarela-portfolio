import type { ReactNode } from 'react';

import styles from './ColumnsAroundAvatar.module.css';

interface ColumnsAroundAvatarProps {
  leftColumn: ReactNode;
  rightColumn: ReactNode;
}

/* Dos columnas de contenido con un hueco central reservado para el avatar. */
export function ColumnsAroundAvatar({ leftColumn, rightColumn }: ColumnsAroundAvatarProps) {
  return (
    <div className={styles.columns}>
      <div className={styles.column}>{leftColumn}</div>
      <div aria-hidden="true" className={styles.avatarGap} />
      <div className={styles.rightColumn}>{rightColumn}</div>
    </div>
  );
}
