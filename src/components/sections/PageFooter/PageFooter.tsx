import { SITE_SOURCE_CODE_URL } from '@/content/contact';
import { PROFILE_NAME } from '@/content/profile';
import { useTranslation } from '@/i18n/useTranslation';

import styles from './PageFooter.module.css';

const CURRENT_YEAR = new Date().getFullYear();

export function PageFooter() {
  const translation = useTranslation();

  return (
    <footer className={styles.footer}>
      <span>
        © {CURRENT_YEAR} {PROFILE_NAME}
      </span>
      <a
        href={SITE_SOURCE_CODE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.sourceLink}
      >
        {translation.contact.sourceCode} ↗
      </a>
    </footer>
  );
}
