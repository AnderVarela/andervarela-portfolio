import { PrivateProjectNotice } from '@/components/projectDetail/PrivateProjectNotice/PrivateProjectNotice';
import { ProjectBadgeList } from '@/components/projectDetail/ProjectBadgeList/ProjectBadgeList';
import { ProjectDetailBlock } from '@/components/projectDetail/ProjectDetailBlock/ProjectDetailBlock';
import { ProjectLinkList } from '@/components/projectDetail/ProjectLinkList/ProjectLinkList';
import { Heading } from '@/components/ui/Heading/Heading';
import { HeadingTypes } from '@/components/ui/Heading/Heading.types';
import { TagList } from '@/components/ui/TagList/TagList';
import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import type { Project } from '@/content/projects';
import { useTranslation } from '@/i18n/useTranslation';

import styles from './ProjectDetailSummary.module.css';

interface ProjectDetailSummaryProps {
  project: Project;
  titleId: string;
}

export function ProjectDetailSummary({ project, titleId }: ProjectDetailSummaryProps) {
  const translation = useTranslation();
  const hasPublicLinks = !project.isPrivate && project.links.length > 0;

  return (
    <div className={styles.summary}>
      <Text kind={TextTypes.Label} label={project.type} tone={TextTones.Muted} />
      <Heading id={titleId} kind={HeadingTypes.Detail} label={project.name} />
      <ProjectBadgeList project={project} />
      <ProjectDetailBlock label={translation.projectDetail.problem}>
        <Text kind={TextTypes.ParagraphLarge} label={project.problem} />
      </ProjectDetailBlock>
      <ProjectDetailBlock label={translation.projectDetail.contribution}>
        <Text kind={TextTypes.ParagraphLarge} label={project.contribution} />
      </ProjectDetailBlock>
      <ProjectDetailBlock label={translation.projectDetail.outcome}>
        <Text kind={TextTypes.ParagraphLarge} label={project.outcome} />
      </ProjectDetailBlock>
      <ProjectDetailBlock label={translation.projectDetail.stack}>
        <TagList labels={project.technologies} />
      </ProjectDetailBlock>
      {hasPublicLinks && <ProjectLinkList links={project.links} />}
      {project.isPrivate && <PrivateProjectNotice />}
    </div>
  );
}
