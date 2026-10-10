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

/* Portada de la tarjeta: la captura principal o, mientras no exista, un marcador. */
export function ProjectThumbnail({ project, projectIndex }: ProjectThumbnailProps) {
  const translation = useTranslation();
  const coverScreenshot = project.screenshots?.[0];

  return (
    <span className={styles.thumbnail}>
      {coverScreenshot ? (
        <img src={coverScreenshot.imageUrl} alt="" loading="lazy" className={styles.cover} />
      ) : (
        <>
          <span className={styles.reference}>P/{formatAsTwoDigits(projectIndex + 1)}</span>
          <span className={styles.glyph} aria-hidden="true">
            {project.glyph}
          </span>
          <span className={styles.pendingNote}>{translation.projects.screenshotPending}</span>
        </>
      )}
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
