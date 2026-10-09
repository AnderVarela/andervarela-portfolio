import type { ReactNode } from 'react';

import { joinClassNames } from '@/utils/classNames';

import styles from './Reveal.module.css';
import {
  RevealDirections,
  RevealOrders,
  type RevealDirection,
  type RevealOrder,
} from './Reveal.types';

interface RevealProps {
  children: ReactNode;
  order?: RevealOrder;
  direction?: RevealDirection;
  fadesOnExit?: boolean;
}

/* Revela su contenido según avanza la entrada de la sección que lo contiene. */
export function Reveal({
  children,
  order = RevealOrders.First,
  direction = RevealDirections.Up,
  fadesOnExit = true,
}: RevealProps) {
  const revealClassName = joinClassNames(
    styles.reveal,
    styles[order],
    styles[direction],
    fadesOnExit && styles.fadesOnExit,
  );

  return <div className={revealClassName}>{children}</div>;
}
