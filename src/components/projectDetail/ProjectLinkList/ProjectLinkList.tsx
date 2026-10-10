import { Button } from '@/components/ui/Button/Button';
import { ButtonSizes, ButtonVariants } from '@/components/ui/Button/Button.types';
import { IconNames } from '@/components/ui/Icon/Icon.types';
import type { ProjectLink } from '@/content/projects';

import { useProjectLinkAction } from './ProjectLinkList.helper';
import styles from './ProjectLinkList.module.css';

interface ProjectLinkListProps {
  links: readonly ProjectLink[];
}

export function ProjectLinkList({ links }: ProjectLinkListProps) {
  const { getLinkLabel, followLink } = useProjectLinkAction();

  return (
    <div className={styles.links}>
      {links.map((link, index) => (
        <Button
          key={link.kind}
          label={getLinkLabel(link)}
          iconName={IconNames.ArrowUpRight}
          variant={index === 0 ? ButtonVariants.Primary : ButtonVariants.Secondary}
          size={ButtonSizes.Medium}
          onClick={() => followLink(link)}
        />
      ))}
    </div>
  );
}
