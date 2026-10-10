import type { CSSProperties } from 'react';

import { joinClassNames } from '@/utils/classNames';

import styles from './Skeleton.module.css';

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
}

/*
 * Superficie con un brillo que la recorre mientras llega el contenido. Tamaño, posición y
 * forma los pone quien la usa; el color de fondo se ajusta con --skeleton-color.
 */
export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <span aria-hidden="true" style={style} className={joinClassNames(styles.skeleton, className)} />
  );
}
