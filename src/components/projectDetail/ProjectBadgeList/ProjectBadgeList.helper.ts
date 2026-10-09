import { listProjectsInGroup, type Project } from '@/content/projects';

/* "Panadería Rubicón · 2/3": a qué grupo pertenece el proyecto y qué lugar ocupa en él. */
export function describeGroupMembership(project: Project): string | null {
  if (!project.group) return null;

  const groupProjects = listProjectsInGroup(project.group.id);
  const positionInGroup = groupProjects.indexOf(project) + 1;

  return `${project.group.name} · ${positionInGroup}/${groupProjects.length}`;
}
