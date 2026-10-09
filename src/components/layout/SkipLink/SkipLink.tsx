import { useTranslation } from '@/i18n/useTranslation';

import styles from './SkipLink.module.css';

interface SkipLinkProps {
  targetId: string;
}

export function SkipLink({ targetId }: SkipLinkProps) {
  const translation = useTranslation();

  return (
    <a href={`#${targetId}`} className={styles.skipLink}>
      {translation.accessibility.skipToContent}
    </a>
  );
}
