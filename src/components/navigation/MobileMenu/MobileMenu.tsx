import { BrandMark } from '@/components/navigation/BrandMark/BrandMark';
import { DownloadCurriculumButton } from '@/components/navigation/DownloadCurriculumButton/DownloadCurriculumButton';
import { LanguageSwitcher } from '@/components/navigation/LanguageSwitcher/LanguageSwitcher';
import { MobileMenuLink } from '@/components/navigation/MobileMenuLink/MobileMenuLink';
import { ThemeToggle } from '@/components/navigation/ThemeToggle/ThemeToggle';
import { Button } from '@/components/ui/Button/Button';
import {
  ButtonLabelVisibilities,
  ButtonSizes,
  ButtonVariants,
} from '@/components/ui/Button/Button.types';
import { IconNames } from '@/components/ui/Icon/Icon.types';
import { SECTIONS } from '@/content/sections';
import { useTranslation } from '@/i18n/useTranslation';
import { useMobileMenuStore } from '@/stores/useMobileMenuStore';
import { useScrollStore } from '@/stores/useScrollStore';

import { useMobileMenuDismissal } from './MobileMenu.helper';
import styles from './MobileMenu.module.css';

/* Capa 5: menú a pantalla completa con las mismas opciones que el raíl y la barra de utilidades. */
export function MobileMenu() {
  const translation = useTranslation();
  const isOpen = useMobileMenuStore((state) => state.isOpen);
  const closeMenu = useMobileMenuStore((state) => state.closeMenu);
  const activeSectionIndex = useScrollStore((state) => state.activeSectionIndex);

  useMobileMenuDismissal(isOpen);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={translation.actions.menu}
      className={styles.menu}
    >
      <div className={styles.topBar}>
        <BrandMark />
        <Button
          label={translation.actions.close}
          iconName={IconNames.Close}
          variant={ButtonVariants.Primary}
          labelVisibility={ButtonLabelVisibilities.Never}
          onClick={closeMenu}
        />
      </div>
      <nav aria-label={translation.accessibility.sectionsNavigation}>
        <ol className={styles.links}>
          {SECTIONS.map((section, index) => (
            <li key={section.id}>
              <MobileMenuLink
                sectionId={section.id}
                label={translation.sections[section.nameKey]}
                isActive={index === activeSectionIndex}
              />
            </li>
          ))}
        </ol>
      </nav>
      <div className={styles.preferences}>
        <LanguageSwitcher isStretched />
        <ThemeToggle isLabelVisible />
      </div>
      <DownloadCurriculumButton size={ButtonSizes.Medium} isFullWidth />
    </div>
  );
}
