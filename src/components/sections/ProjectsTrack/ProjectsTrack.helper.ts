import type { FocusEvent } from 'react';

import type { Project, ProjectGroup } from '@/content/projects';
import { clamp } from '@/utils/math';

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

const SECTION_SELECTOR = '[data-section]';
const HORIZONTAL_TRACK_DIRECTION = 'row';

/*
 * La pista avanza con el scroll vertical, así que una tarjeta enfocada con el teclado
 * puede quedar fuera de la ventana. Se lleva el scroll al punto que la alinea al inicio.
 */
export function scrollFocusedCardIntoView(
  event: FocusEvent<HTMLDivElement>,
  overflowDistance: number,
): void {
  const trackElement = event.currentTarget;
  const focusedElement = event.target;
  const sectionElement = trackElement.closest(SECTION_SELECTOR);
  const isHorizontalTrack =
    window.getComputedStyle(trackElement).flexDirection === HORIZONTAL_TRACK_DIRECTION;
  const isKeyboardFocus = focusedElement.matches(':focus-visible');

  if (!sectionElement || !isHorizontalTrack || !isKeyboardFocus || overflowDistance === 0) return;

  const cardOffsetInTrack =
    focusedElement.getBoundingClientRect().left - trackElement.getBoundingClientRect().left;
  const trackProgress = clamp(cardOffsetInTrack / overflowDistance);
  const sectionRectangle = sectionElement.getBoundingClientRect();
  const pinnedScrollDistance = sectionRectangle.height - window.innerHeight;

  window.scrollTo({
    top: sectionRectangle.top + window.scrollY + trackProgress * pinnedScrollDistance,
    behavior: 'auto',
  });
}
