import { ProjectThumbnail } from '@/components/sections/ProjectThumbnail/ProjectThumbnail';
import { TagList } from '@/components/ui/TagList/TagList';
import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import type { Project } from '@/content/projects';
import { openProjectDetailFromElement } from '@/stores/projectDetail.helper';

import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  projectIndex: number;
  title: string;
}

export function ProjectCard({ project, projectIndex, title }: ProjectCardProps) {
  return (
    <button
      type="button"
      data-project-card={project.id}
      aria-haspopup="dialog"
      className={styles.card}
      onClick={(event) => openProjectDetailFromElement(project.id, event.currentTarget)}
    >
      <ProjectThumbnail project={project} projectIndex={projectIndex} />
      <Text kind={TextTypes.Label} label={project.type} tone={TextTones.Muted} />
      <Text kind={TextTypes.Title} label={title} />
      <Text kind={TextTypes.P} label={project.summary} tone={TextTones.Muted} isInline />
      <TagList labels={project.technologies} />
    </button>
  );
}
