import { ProjectDetailDialog } from '@/components/projectDetail/ProjectDetailDialog/ProjectDetailDialog';
import { PROJECTS } from '@/content/projects';
import { useProjectDetailStore } from '@/stores/useProjectDetailStore';

/* Capa 5: el detalle se monta solo mientras hay un proyecto abierto. */
export function ProjectDetail() {
  const openProjectIndex = useProjectDetailStore((state) => state.openProjectIndex);
  const openProject = openProjectIndex === null ? undefined : PROJECTS[openProjectIndex];

  if (openProjectIndex === null || !openProject) return null;

  return <ProjectDetailDialog project={openProject} projectIndex={openProjectIndex} />;
}
