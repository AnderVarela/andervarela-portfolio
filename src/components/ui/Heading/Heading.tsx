import { joinClassNames } from '@/utils/classNames';

import styles from './Heading.module.css';
import { HeadingLevels, type HeadingLevel, type HeadingType } from './Heading.types';

interface HeadingProps {
  kind: HeadingType;
  label: string;
  level?: HeadingLevel;
  id?: string;
}

export function Heading({ kind, label, level = HeadingLevels.Section, id }: HeadingProps) {
  const Element = level === HeadingLevels.Page ? 'h1' : 'h2';

  return (
    <Element id={id} className={joinClassNames(styles.heading, styles[kind])}>
      {label}
    </Element>
  );
}
