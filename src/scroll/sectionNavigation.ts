import type { MouseEvent } from 'react';

import { findSectionIndex, type SectionId } from '@/content/sections';
import { prefersReducedMotion } from '@/utils/mediaPreferences';

import { buildSectionHash, replaceLocationHash } from './locationHash.helper';

function measureSectionTop(sectionId: SectionId): number | null {
  const isFirstSection = findSectionIndex(sectionId) === 0;
  if (isFirstSection) return 0;

  const sectionElement = document.getElementById(sectionId);
  return sectionElement ? sectionElement.getBoundingClientRect().top + window.scrollY : null;
}

export function scrollToSection(sectionId: SectionId, isInstant = prefersReducedMotion()): void {
  const sectionTop = measureSectionTop(sectionId);
  if (sectionTop === null) return;

  window.scrollTo({ top: sectionTop, behavior: isInstant ? 'auto' : 'smooth' });
  replaceLocationHash(buildSectionHash(sectionId));
}

/* Sustituye el salto brusco del ancla por el scroll animado, conservando el href real. */
export function createSectionLinkHandler(sectionId: SectionId, onNavigate?: () => void) {
  return (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    onNavigate?.();
    scrollToSection(sectionId);
  };
}
