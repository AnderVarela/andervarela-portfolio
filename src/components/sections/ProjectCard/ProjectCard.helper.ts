import type { Project } from '@/content/projects';

/*
 * Nombre accesible de la tarjeta: lo esencial del proyecto sin el ruido del
 * marcador de captura (referencia, glifo y aviso de captura pendiente).
 */
export function describeProjectCard(
  project: Project,
  title: string,
  privateProjectLabel: string,
): string {
  const distinctions = [project.awardBadge, project.isPrivate ? privateProjectLabel : undefined];

  return [title, project.type, ...distinctions, project.summary]
    .filter((fragment) => fragment !== undefined)
    .join('. ');
}
