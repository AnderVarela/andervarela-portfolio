import { create } from 'zustand';

export interface AvatarTimeline {
  /* Sección cuya pose se está abandonando (o manteniendo, si no hay transición). */
  sectionIndex: number;
  /* Avance de 0 a 1 hacia la pose de la sección siguiente. */
  transitionProgress: number;
  /* Pose que predomina en este punto del recorrido. */
  poseIndex: number;
}

interface ScrollState {
  activeSectionIndex: number;
  avatarTimeline: AvatarTimeline;
  updateScrollPosition: (activeSectionIndex: number, avatarTimeline: AvatarTimeline) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  activeSectionIndex: 0,
  avatarTimeline: { sectionIndex: 0, transitionProgress: 0, poseIndex: 0 },
  updateScrollPosition: (activeSectionIndex, avatarTimeline) => {
    set({ activeSectionIndex, avatarTimeline });
  },
}));
