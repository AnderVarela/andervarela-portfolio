import type { ProjectLink } from '@/content/projects';
import { useTranslation } from '@/i18n/useTranslation';
import { useToastStore } from '@/stores/useToastStore';

interface ProjectLinkAction {
  getLinkLabel: (link: ProjectLink) => string;
  followLink: (link: ProjectLink) => void;
}

export function useProjectLinkAction(): ProjectLinkAction {
  const translation = useTranslation();
  const showToast = useToastStore((state) => state.showToast);

  function getLinkLabel(link: ProjectLink): string {
    return translation.projectDetail.links[link.kind];
  }

  function followLink(link: ProjectLink): void {
    if (link.url) {
      window.open(link.url, '_blank', 'noopener,noreferrer');
      return;
    }

    showToast(`${getLinkLabel(link)} · ${translation.projectDetail.linkPending}`);
  }

  return { getLinkLabel, followLink };
}
