import { useEffect, useState } from 'react';

import { findProjectIndex } from '@/content/projects';
import { SECTIONS } from '@/content/sections';
import { useProjectDetailStore } from '@/stores/useProjectDetailStore';
import { useScrollStore } from '@/stores/useScrollStore';

import {
  buildSectionHash,
  parseDeepLink,
  replaceLocationHash,
  type DeepLink,
} from './locationHash.helper';
import { scrollToSection } from './sectionNavigation';

/* Margen para que las secciones tengan su altura definitiva tras cargar las fuentes. */
const LAYOUT_SETTLE_MILLISECONDS = 80;

function waitForFonts(): Promise<unknown> {
  return 'fonts' in document ? document.fonts.ready : Promise.resolve();
}

function restoreDeepLink(deepLink: DeepLink): void {
  if (deepLink.sectionId) scrollToSection(deepLink.sectionId, true);
  if (!deepLink.projectId) return;

  const projectIndex = findProjectIndex(deepLink.projectId);
  if (projectIndex !== -1) useProjectDetailStore.getState().openProject(projectIndex);
}

function syncHashWithActiveSection(): () => void {
  return useScrollStore.subscribe((state, previousState) => {
    const hasSectionChanged = state.activeSectionIndex !== previousState.activeSectionIndex;
    const isProjectOpen = useProjectDetailStore.getState().openProjectIndex !== null;
    const activeSection = SECTIONS[state.activeSectionIndex];

    if (hasSectionChanged && !isProjectOpen && activeSection) {
      replaceLocationHash(buildSectionHash(activeSection.id));
    }
  });
}

/* Abre la página en la sección o proyecto de la URL y mantiene la URL al día al hacer scroll. */
export function useDeepLinking(): void {
  const [initialDeepLink] = useState(() => parseDeepLink(window.location.hash));

  useEffect(() => {
    let settleTimeoutId: ReturnType<typeof setTimeout> | undefined;
    let isCancelled = false;

    void waitForFonts().then(() => {
      if (isCancelled) return;
      settleTimeoutId = setTimeout(() => {
        restoreDeepLink(initialDeepLink);
      }, LAYOUT_SETTLE_MILLISECONDS);
    });

    return () => {
      isCancelled = true;
      clearTimeout(settleTimeoutId);
    };
  }, [initialDeepLink]);

  useEffect(syncHashWithActiveSection, []);
}
