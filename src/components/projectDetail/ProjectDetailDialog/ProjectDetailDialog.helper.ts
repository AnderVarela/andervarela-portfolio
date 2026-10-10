import { useEffect, useRef, useState, type CSSProperties } from 'react';

import { SECTIONS } from '@/content/sections';
import {
  buildProjectHash,
  buildSectionHash,
  replaceLocationHash,
} from '@/scroll/locationHash.helper';
import { measureViewportRectangle } from '@/stores/projectDetail.helper';
import { useProjectDetailStore, type ViewportRectangle } from '@/stores/useProjectDetailStore';
import { useScrollStore } from '@/stores/useScrollStore';
import { prefersReducedMotion } from '@/utils/mediaPreferences';

export const DetailPhases = {
  /* El panel ocupa el hueco de la tarjeta de la que nace o a la que vuelve. */
  Collapsed: 'collapsed',
  Expanded: 'expanded',
} as const;

export type DetailPhase = (typeof DetailPhases)[keyof typeof DetailPhases];

/* Algo menos que la transición CSS del panel (0,5 s) para desmontar justo al terminar. */
const COLLAPSE_MILLISECONDS = 480;
export const OPENING_ANIMATION_MILLISECONDS = 450;
const STEP_BY_ARROW_KEY: Partial<Record<string, number>> = { ArrowLeft: -1, ArrowRight: 1 };

interface ProjectDetailTransition {
  phase: DetailPhase;
  collapsedStyle: CSSProperties | undefined;
  requestClose: () => void;
}

function isVisibleInViewport(rectangle: ViewportRectangle): boolean {
  return (
    rectangle.left + rectangle.width > 0 &&
    rectangle.left < window.innerWidth &&
    rectangle.top + rectangle.height > 0 &&
    rectangle.top < window.innerHeight
  );
}

/* Al cerrar, el panel vuelve a la tarjeta del proyecto que se está viendo si está en pantalla. */
function measureVisibleProjectCard(projectId: string): ViewportRectangle | null {
  const cardElement = document.querySelector(`[data-project-card="${projectId}"]`);
  if (!cardElement) return null;

  const cardRectangle = measureViewportRectangle(cardElement);
  return isVisibleInViewport(cardRectangle) ? cardRectangle : null;
}

function toPositionStyle(rectangle: ViewportRectangle | null): CSSProperties | undefined {
  if (!rectangle) return undefined;

  return {
    top: `${rectangle.top}px`,
    left: `${rectangle.left}px`,
    width: `${rectangle.width}px`,
    height: `${rectangle.height}px`,
  };
}

/* Hace crecer el panel desde su origen al abrir y lo devuelve a él antes de desmontarlo. */
export function useProjectDetailTransition(projectId: string): ProjectDetailTransition {
  const originRectangle = useProjectDetailStore((state) => state.originRectangle);
  const closeProject = useProjectDetailStore((state) => state.closeProject);
  const [phase, setPhase] = useState<DetailPhase>(() =>
    prefersReducedMotion() ? DetailPhases.Expanded : DetailPhases.Collapsed,
  );
  const [collapsedRectangle, setCollapsedRectangle] = useState(originRectangle);
  const collapseTimeoutId = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isClosing = useRef(false);

  useEffect(() => {
    let secondFrameId = 0;
    // Dos fotogramas: el primero pinta el panel recogido y el segundo arranca la transición.
    const firstFrameId = requestAnimationFrame(() => {
      secondFrameId = requestAnimationFrame(() => {
        setPhase(DetailPhases.Expanded);
      });
    });

    return () => {
      cancelAnimationFrame(firstFrameId);
      cancelAnimationFrame(secondFrameId);
      clearTimeout(collapseTimeoutId.current);
    };
  }, []);

  function requestClose(): void {
    if (isClosing.current) return;
    isClosing.current = true;

    if (prefersReducedMotion()) {
      closeProject();
      return;
    }

    setCollapsedRectangle(measureVisibleProjectCard(projectId) ?? collapsedRectangle);
    setPhase(DetailPhases.Collapsed);
    collapseTimeoutId.current = setTimeout(closeProject, COLLAPSE_MILLISECONDS);
  }

  return { phase, collapsedStyle: toPositionStyle(collapsedRectangle), requestClose };
}

/* Las flechas izquierda y derecha pasan al proyecto anterior y al siguiente sin cerrar. */
export function useAdjacentProjectKeys(): void {
  useEffect(() => {
    function showAdjacentProjectOnArrow(event: KeyboardEvent): void {
      const step = STEP_BY_ARROW_KEY[event.key];
      if (step !== undefined) useProjectDetailStore.getState().showAdjacentProject(step);
    }

    window.addEventListener('keydown', showAdjacentProjectOnArrow);
    return () => {
      window.removeEventListener('keydown', showAdjacentProjectOnArrow);
    };
  }, []);
}

/* Cada detalle tiene URL propia para poder compartirlo; al cerrar vuelve la de la sección. */
export function useProjectLocationHash(projectId: string): void {
  useEffect(() => {
    replaceLocationHash(buildProjectHash(projectId));
  }, [projectId]);

  useEffect(() => {
    return () => {
      const activeSection = SECTIONS[useScrollStore.getState().activeSectionIndex];
      if (activeSection) replaceLocationHash(buildSectionHash(activeSection.id));
    };
  }, []);
}
