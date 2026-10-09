import { Tag } from '@/components/ui/Tag/Tag';
import { TagVariants } from '@/components/ui/Tag/Tag.types';
import type { Project } from '@/content/projects';
import { useTranslation } from '@/i18n/useTranslation';

import { describeGroupMembership } from './ProjectBadgeList.helper';
import styles from './ProjectBadgeList.module.css';

interface ProjectBadgeListProps {
  project: Project;
}

export function ProjectBadgeList({ project }: ProjectBadgeListProps) {
  const translation = useTranslation();
  const groupMembership = describeGroupMembership(project);

  return (
    <div className={styles.badges}>
      {project.awardBadge && <Tag label={project.awardBadge} variant={TagVariants.Solid} />}
      {project.isPrivate && (
        <Tag label={translation.projects.privateProject} variant={TagVariants.Outline} />
      )}
      {groupMembership && <Tag label={groupMembership} />}
    </div>
  );
}
