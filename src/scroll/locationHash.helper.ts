import { SectionIds, findSectionIndex, type SectionId } from '@/content/sections';

export interface DeepLink {
  sectionId: SectionId | null;
  projectId: string | null;
}

const HASH_PREFIX = '#';
const HASH_SEGMENT_SEPARATOR = '/';

function isSectionId(candidate: string): candidate is SectionId {
  return findSectionIndex(candidate) !== -1;
}

/* Formatos admitidos: "#proyectos" y "#proyectos/requify". */
export function parseDeepLink(hash: string): DeepLink {
  const [sectionSegment = '', projectSegment] = hash
    .replace(HASH_PREFIX, '')
    .split(HASH_SEGMENT_SEPARATOR);

  return {
    sectionId: isSectionId(sectionSegment) ? sectionSegment : null,
    projectId: projectSegment ?? null,
  };
}

export function buildSectionHash(sectionId: SectionId): string {
  return `${HASH_PREFIX}${sectionId}`;
}

export function buildProjectHash(projectId: string): string {
  return `${buildSectionHash(SectionIds.Projects)}${HASH_SEGMENT_SEPARATOR}${projectId}`;
}

export function replaceLocationHash(hash: string): void {
  try {
    window.history.replaceState(null, '', hash);
  } catch {
    // En contextos sin historial (previsualizaciones) la URL simplemente no se actualiza.
  }
}
