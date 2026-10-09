import { create } from 'zustand';

import { PROJECT_COUNT } from '@/content/projects';

export interface ViewportRectangle {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface ProjectDetailState {
  openProjectIndex: number | null;
  /* Rectángulo del elemento que abrió el detalle; desde ahí crece el panel. */
  originRectangle: ViewportRectangle | null;
  openProject: (projectIndex: number, originRectangle?: ViewportRectangle) => void;
  showAdjacentProject: (step: number) => void;
  closeProject: () => void;
}

export const useProjectDetailStore = create<ProjectDetailState>((set, get) => ({
  openProjectIndex: null,
  originRectangle: null,
  openProject: (projectIndex, originRectangle) => {
    set({ openProjectIndex: projectIndex, originRectangle: originRectangle ?? null });
  },
  showAdjacentProject: (step) => {
    const { openProjectIndex } = get();
    if (openProjectIndex === null) return;

    set({ openProjectIndex: (openProjectIndex + step + PROJECT_COUNT) % PROJECT_COUNT });
  },
  closeProject: () => {
    set({ openProjectIndex: null, originRectangle: null });
  },
}));
