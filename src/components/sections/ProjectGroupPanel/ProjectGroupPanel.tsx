import { ProjectCard } from '@/components/sections/ProjectCard/ProjectCard';
import type { IndexedProject } from '@/components/sections/ProjectsTrack/ProjectsTrack.helper';
import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import type { ProjectGroup } from '@/content/projects';
import { useTranslation } from '@/i18n/useTranslation';

import styles from './ProjectGroupPanel.module.css';

interface ProjectGroupPanelProps {
  group: ProjectGroup;
  members: readonly IndexedProject[];
}

/* Agrupa visualmente los proyectos hechos para un mismo cliente. */
export function ProjectGroupPanel({ group, members }: ProjectGroupPanelProps) {
  const translation = useTranslation();
  const memberCountLabel = `${members.length} ${translation.projects.countLabel}`;

  return (
    <div role="group" aria-label={`${group.name} · ${memberCountLabel}`} className={styles.panel}>
      <div className={styles.header}>
        <Text kind={TextTypes.Label} label={group.name} tone={TextTones.Accent} />
        <Text kind={TextTypes.Label} label={memberCountLabel} tone={TextTones.Muted} />
      </div>
      <div className={styles.members}>
        {members.map(({ project, projectIndex }) => (
          <ProjectCard
            key={project.id}
            project={project}
            projectIndex={projectIndex}
            title={project.shortName}
          />
        ))}
      </div>
    </div>
  );
}
