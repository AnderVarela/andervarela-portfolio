import type { Project, ProjectGroup } from '@/content/projects';

export interface IndexedProject {
  project: Project;
  /* Posición en el listado completo: numera la tarjeta y abre su detalle. */
  projectIndex: number;
}

export const TrackItemKinds = {
  SingleProject: 'singleProject',
  ProjectGroup: 'projectGroup',
} as const;

export interface SingleProjectTrackItem extends IndexedProject {
  kind: typeof TrackItemKinds.SingleProject;
}

export interface ProjectGroupTrackItem {
  kind: typeof TrackItemKinds.ProjectGroup;
  group: ProjectGroup;
  members: IndexedProject[];
}

export type TrackItem = SingleProjectTrackItem | ProjectGroupTrackItem;

/* Conserva el orden del listado y junta en un solo panel los proyectos de un mismo grupo. */
export function arrangeProjectsForTrack(projects: readonly Project[]): TrackItem[] {
  const trackItems: TrackItem[] = [];
  const groupItemById = new Map<string, ProjectGroupTrackItem>();

  projects.forEach((project, projectIndex) => {
    if (!project.group) {
      trackItems.push({ kind: TrackItemKinds.SingleProject, project, projectIndex });
      return;
    }

    const existingGroupItem = groupItemById.get(project.group.id);
    if (existingGroupItem) {
      existingGroupItem.members.push({ project, projectIndex });
      return;
    }

    const groupItem: ProjectGroupTrackItem = {
      kind: TrackItemKinds.ProjectGroup,
      group: project.group,
      members: [{ project, projectIndex }],
    };
    groupItemById.set(project.group.id, groupItem);
    trackItems.push(groupItem);
  });

  return trackItems;
}
