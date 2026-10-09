import { useRef } from 'react';

import { ProjectDetailSummary } from '@/components/projectDetail/ProjectDetailSummary/ProjectDetailSummary';
import { ProjectDetailToolbar } from '@/components/projectDetail/ProjectDetailToolbar/ProjectDetailToolbar';
import { ProjectGallery } from '@/components/projectDetail/ProjectGallery/ProjectGallery';
import type { Project } from '@/content/projects';
import { joinClassNames } from '@/utils/classNames';

import {
  DetailPhases,
  useDialogFocus,
  useDialogKeyboard,
  usePageScrollLock,
  useProjectDetailTransition,
  useProjectLocationHash,
} from './ProjectDetailDialog.helper';
import styles from './ProjectDetailDialog.module.css';

const DETAIL_TITLE_ID = 'project-detail-title';

interface ProjectDetailDialogProps {
  project: Project;
  projectIndex: number;
}

export function ProjectDetailDialog({ project, projectIndex }: ProjectDetailDialogProps) {
  const panelReference = useRef<HTMLDivElement>(null);
  const closeButtonReference = useRef<HTMLButtonElement>(null);
  const { phase, collapsedStyle, requestClose } = useProjectDetailTransition(project.id);
  const isExpanded = phase === DetailPhases.Expanded;

  useDialogKeyboard(panelReference, requestClose);
  useDialogFocus(closeButtonReference);
  usePageScrollLock();
  useProjectLocationHash(project.id);

  return (
    <>
      {/* Atajo de puntero: el teclado cierra con Escape y con el botón de cerrar. */}
      <div
        aria-hidden="true"
        className={joinClassNames(styles.backdrop, isExpanded && styles.backdropVisible)}
        onClick={requestClose}
      />
      <div
        ref={panelReference}
        role="dialog"
        aria-modal="true"
        aria-labelledby={DETAIL_TITLE_ID}
        className={joinClassNames(styles.panel, styles[phase])}
        style={isExpanded ? undefined : collapsedStyle}
      >
        <div className={styles.content}>
          <ProjectDetailToolbar
            projectIndex={projectIndex}
            closeButtonReference={closeButtonReference}
            onClose={requestClose}
          />
          <div className={styles.body}>
            <ProjectDetailSummary project={project} titleId={DETAIL_TITLE_ID} />
            <ProjectGallery project={project} />
          </div>
        </div>
      </div>
    </>
  );
}
