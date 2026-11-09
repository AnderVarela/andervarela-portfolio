import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import { listWorkingPrinciples } from '@/content/skills';
import { useTranslation } from '@/i18n/useTranslation';

import styles from './WorkingPrincipleList.module.css';

/* Cómo se trabaja, no solo con qué: el criterio que hay detrás del stack. */
export function WorkingPrincipleList() {
  const translation = useTranslation();

  return (
    <ul className={styles.principles}>
      {listWorkingPrinciples(translation).map((principle) => (
        <li key={principle.title} className={styles.principle}>
          <Text kind={TextTypes.Title} label={principle.title} />
          <Text kind={TextTypes.P} label={principle.description} tone={TextTones.Muted} />
        </li>
      ))}
    </ul>
  );
}
