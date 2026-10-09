import { findProjectIndex } from '@/content/projects';

import { useProjectDetailStore, type ViewportRectangle } from './useProjectDetailStore';

export function measureViewportRectangle(element: Element): ViewportRectangle {
  const { top, left, width, height } = element.getBoundingClientRect();

  return { top, left, width, height };
}

/* Abre el detalle haciendo que el panel crezca desde el elemento que lo ha pedido. */
export function openProjectDetailFromElement(projectId: string, originElement: Element): void {
  const projectIndex = findProjectIndex(projectId);
  if (projectIndex === -1) return;

  useProjectDetailStore
    .getState()
    .openProject(projectIndex, measureViewportRectangle(originElement));
}
