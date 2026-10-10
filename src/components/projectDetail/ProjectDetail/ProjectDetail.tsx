import { ProjectDetailDialog } from '@/components/projectDetail/ProjectDetailDialog/ProjectDetailDialog';
import { listProjects } from '@/content/projects';
import { useTranslation } from '@/i18n/useTranslation';
import { useProjectDetailStore } from '@/stores/useProjectDetailStore';

/* Capa 5: el detalle se monta solo mientras hay un proyecto abierto. */
export function ProjectDetail() {
  const translation = useTranslation();
  const openProjectIndex = useProjectDetailStore((state) => state.openProjectIndex);
  const openProject =
    openProjectIndex === null ? undefined : listProjects(translation)[openProjectIndex];

  if (openProjectIndex === null || !openProject) return null;

  return <ProjectDetailDialog project={openProject} projectIndex={openProjectIndex} />;
}
