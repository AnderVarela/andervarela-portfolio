import { DownloadCurriculumButton } from '@/components/navigation/DownloadCurriculumButton/DownloadCurriculumButton';
import { Button } from '@/components/ui/Button/Button';
import { ButtonSizes, ButtonVariants } from '@/components/ui/Button/Button.types';
import { IconNames } from '@/components/ui/Icon/Icon.types';
import { SectionIds } from '@/content/sections';
import { useTranslation } from '@/i18n/useTranslation';
import { scrollToSection } from '@/scroll/sectionNavigation';

import styles from './HeroActions.module.css';

export function HeroActions() {
  const translation = useTranslation();

  return (
    <div className={styles.actions}>
      <Button
        label={translation.hero.seeProjects}
        iconName={IconNames.ArrowRight}
        variant={ButtonVariants.Primary}
        size={ButtonSizes.Large}
        onClick={() => scrollToSection(SectionIds.Projects)}
      />
      <DownloadCurriculumButton variant={ButtonVariants.Secondary} size={ButtonSizes.Large} />
    </div>
  );
}
