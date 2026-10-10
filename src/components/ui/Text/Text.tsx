import { joinClassNames } from '@/utils/classNames';

import { rendersAsParagraph } from './Text.helper';
import styles from './Text.module.css';
import { TextTones, type TextTone, type TextType } from './Text.types';

interface TextProps {
  kind: TextType;
  label: string;
  tone?: TextTone;
  /* Para padres que solo admiten contenido en línea, como un botón. */
  isInline?: boolean;
}

export function Text({ kind, label, tone = TextTones.Default, isInline = false }: TextProps) {
  const textClassName = joinClassNames(styles.text, styles[kind], styles[tone]);

  return rendersAsParagraph(kind, isInline) ? (
    <p className={textClassName}>{label}</p>
  ) : (
    <span className={textClassName}>{label}</span>
  );
}
