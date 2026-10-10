import { DownloadCurriculumButton } from '@/components/navigation/DownloadCurriculumButton/DownloadCurriculumButton';
import { LanguageSwitcher } from '@/components/navigation/LanguageSwitcher/LanguageSwitcher';
import { ThemeToggle } from '@/components/navigation/ThemeToggle/ThemeToggle';

import styles from './UtilityBar.module.css';

/* Idioma, tema y CV: siempre a mano en tableta y escritorio. */
export function UtilityBar() {
  return (
    <div className={styles.utilityBar}>
      <LanguageSwitcher />
      <ThemeToggle />
      <DownloadCurriculumButton />
    </div>
  );
}
