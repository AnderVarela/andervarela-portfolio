import { useEffect } from 'react';

import { SECTIONS } from '@/content/sections';
import { useScrollStore } from '@/stores/useScrollStore';

import {
  computeAvatarTimeline,
  computeBackgroundTint,
  computeDocumentProgress,
  computeSectionMotion,
  findActiveSectionIndex,
  type SectionBounds,
} from './scrollChoreography.helper';

const SECTION_SELECTOR = '[data-section]';
const TINT_BY_SECTION = SECTIONS.map((section) => section.backgroundTintPercentage);

/* Todo lo que, al cambiar, obliga a recalcular la coreografía. */
function readLayoutSignature(): string {
  const { scrollHeight } = document.documentElement;
  return [window.scrollY, window.innerWidth, window.innerHeight, scrollHeight].join('|');
}

function applySectionMotion(sectionElement: HTMLElement, sectionRectangle: DOMRect): void {
  const motion = computeSectionMotion(
    sectionRectangle.top,
    sectionRectangle.height,
    window.innerHeight,
  );

  sectionElement.style.setProperty('--section-enter', motion.enterProgress.toFixed(3));
  sectionElement.style.setProperty('--section-exit', motion.exitProgress.toFixed(3));
  sectionElement.style.setProperty('--section-progress', motion.pinnedProgress.toFixed(4));
  sectionElement.style.setProperty('--section-top', sectionRectangle.top.toFixed(1));
}

function applyChoreography(): void {
  const scrollPosition = window.scrollY;
  const viewportHeight = window.innerHeight;
  const rootElement = document.documentElement;
  const sectionElements = [...document.querySelectorAll<HTMLElement>(SECTION_SELECTOR)];
  const sectionRectangles = sectionElements.map((element) => element.getBoundingClientRect());
  const sectionBounds: SectionBounds[] = sectionRectangles.map((rectangle) => ({
    top: rectangle.top + scrollPosition,
    height: rectangle.height,
  }));

  sectionElements.forEach((sectionElement, index) => {
    const sectionRectangle = sectionRectangles[index];
    if (sectionRectangle) applySectionMotion(sectionElement, sectionRectangle);
  });

  const avatarTimeline = computeAvatarTimeline(sectionBounds, scrollPosition, viewportHeight);
  const documentProgress = computeDocumentProgress(
    scrollPosition,
    rootElement.scrollHeight,
    viewportHeight,
  );
  const backgroundTint = computeBackgroundTint(TINT_BY_SECTION, avatarTimeline);

  rootElement.style.setProperty('--scroll-progress', documentProgress.toFixed(4));
  rootElement.style.setProperty('--scroll-position', scrollPosition.toFixed(1));
  rootElement.style.setProperty('--background-tint', `${backgroundTint.toFixed(2)}%`);

  useScrollStore
    .getState()
    .updateScrollPosition(
      findActiveSectionIndex(sectionBounds, scrollPosition, viewportHeight),
      avatarTimeline,
    );
}

/*
 * Traduce la posición de scroll a variables CSS que las capas leen para animarse.
 * Las animaciones avanzan y retroceden con el scroll; no hay temporizadores.
 */
export function useScrollChoreography(): void {
  useEffect(() => {
    let appliedLayoutSignature = '';

    function applyChoreographyWhenLayoutChanges(): void {
      const layoutSignature = readLayoutSignature();
      if (layoutSignature !== appliedLayoutSignature) {
        applyChoreography();
        // La propia coreografía no debe contar como cambio: se vuelve a leer tras aplicarla.
        appliedLayoutSignature = readLayoutSignature();
      }
      animationFrameId = requestAnimationFrame(applyChoreographyWhenLayoutChanges);
    }

    let animationFrameId = requestAnimationFrame(applyChoreographyWhenLayoutChanges);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
}
