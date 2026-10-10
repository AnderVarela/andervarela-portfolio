import { useRef } from 'react';

import {
  useDialogFocus,
  useDialogKeyboard,
  usePageScrollLock,
} from '@/accessibility/dialogBehaviours';
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

import { useCloseMenuBeyondMobile } from './MobileMenuPanel.helper';
import styles from './MobileMenuPanel.module.css';

/* Mismas opciones que el raíl y la barra de utilidades, con el foco retenido dentro. */
export function MobileMenuPanel() {
  const translation = useTranslation();
  const panelReference = useRef<HTMLDivElement>(null);
  const closeButtonReference = useRef<HTMLButtonElement>(null);
  const closeMenu = useMobileMenuStore((state) => state.closeMenu);
  const activeSectionIndex = useScrollStore((state) => state.activeSectionIndex);

  useDialogKeyboard(panelReference, closeMenu);
  useDialogFocus(closeButtonReference);
  usePageScrollLock();
  useCloseMenuBeyondMobile();

  return (
    <div
      ref={panelReference}
      role="dialog"
      aria-modal="true"
      aria-label={translation.actions.menu}
      className={styles.menu}
    >
      <div className={styles.topBar}>
        <BrandMark />
        <Button
          ref={closeButtonReference}
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
      <div className={styles.footer}>
        <div className={styles.preferences}>
          <LanguageSwitcher isStretched />
          <ThemeToggle isLabelVisible />
        </div>
        <DownloadCurriculumButton size={ButtonSizes.Medium} isFullWidth />
      </div>
    </div>
  );
}
