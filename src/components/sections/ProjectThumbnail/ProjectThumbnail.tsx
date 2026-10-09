import { IconNames } from '@/components/ui/Icon/Icon.types';
import { Tag } from '@/components/ui/Tag/Tag';
import { TagVariants } from '@/components/ui/Tag/Tag.types';
import type { Project } from '@/content/projects';
import { useTranslation } from '@/i18n/useTranslation';
import { formatAsTwoDigits } from '@/utils/formatting';

import styles from './ProjectThumbnail.module.css';

interface ProjectThumbnailProps {
  project: Project;
  projectIndex: number;
}

/* Marcador de la captura del proyecto mientras no haya una imagen real. */
export function ProjectThumbnail({ project, projectIndex }: ProjectThumbnailProps) {
  const translation = useTranslation();

  return (
    <span className={styles.thumbnail}>
      <span className={styles.reference}>P/{formatAsTwoDigits(projectIndex + 1)}</span>
      <span className={styles.glyph} aria-hidden="true">
        {project.glyph}
      </span>
      <span className={styles.pendingNote}>{translation.projects.screenshotPending}</span>
      <span className={styles.badge}>
        {project.awardBadge && <Tag label={project.awardBadge} variant={TagVariants.Solid} />}
        {project.isPrivate && (
          <Tag
            label={translation.projects.privateProject}
            variant={TagVariants.Outline}
            iconName={IconNames.Lock}
          />
        )}
      </span>
    </span>
  );
}
