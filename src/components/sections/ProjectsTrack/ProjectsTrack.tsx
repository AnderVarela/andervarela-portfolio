import type { CSSProperties, Ref } from 'react';

import { ProjectCard } from '@/components/sections/ProjectCard/ProjectCard';
import { ProjectGroupPanel } from '@/components/sections/ProjectGroupPanel/ProjectGroupPanel';
import { listProjects } from '@/content/projects';
import { useTranslation } from '@/i18n/useTranslation';

import {
  arrangeProjectsForTrack,
  scrollFocusedCardIntoView,
  TrackItemKinds,
} from './ProjectsTrack.helper';
import styles from './ProjectsTrack.module.css';

interface ProjectsTrackProps {
  overflowDistance: number;
  ref?: Ref<HTMLDivElement>;
}

/* Fila de tarjetas que en tableta y escritorio avanza en horizontal con el scroll. */
export function ProjectsTrack({ overflowDistance, ref }: ProjectsTrackProps) {
  const translation = useTranslation();
  const trackItems = arrangeProjectsForTrack(listProjects(translation));
  const trackStyle = { '--track-overflow': overflowDistance } as CSSProperties;

  return (
    <div
      ref={ref}
      className={styles.track}
      style={trackStyle}
      onFocus={(event) => scrollFocusedCardIntoView(event, overflowDistance)}
    >
      {trackItems.map((trackItem) =>
        trackItem.kind === TrackItemKinds.ProjectGroup ? (
          <ProjectGroupPanel
            key={trackItem.group.id}
            group={trackItem.group}
            members={trackItem.members}
          />
        ) : (
          <ProjectCard
            key={trackItem.project.id}
            project={trackItem.project}
            projectIndex={trackItem.projectIndex}
            title={trackItem.project.name}
          />
        ),
      )}
    </div>
  );
}
