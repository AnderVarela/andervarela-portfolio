import { Text } from '@/components/ui/Text/Text';
import { TextTypes } from '@/components/ui/Text/Text.types';
import { PROJECT_COUNT } from '@/content/projects';
import { useTranslation } from '@/i18n/useTranslation';
import { formatAsTwoDigits } from '@/utils/formatting';

import styles from './ProjectsScrollProgress.module.css';

/* Cuántos proyectos hay y cuánto de la pista horizontal se ha recorrido. */
export function ProjectsScrollProgress() {
  const translation = useTranslation();
  const projectCountLabel = `${formatAsTwoDigits(PROJECT_COUNT)} ${translation.projects.countLabel}`;

  return (
    <div className={styles.progress}>
      <Text kind={TextTypes.Note} label={projectCountLabel} />
      <span className={styles.bar} aria-hidden="true">
        <span className={styles.barFill} />
      </span>
      <Text kind={TextTypes.Note} label={translation.hero.scrollHint} />
    </div>
  );
}
