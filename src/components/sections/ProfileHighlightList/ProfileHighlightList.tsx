import { ProfileHighlightItem } from '@/components/sections/ProfileHighlightItem/ProfileHighlightItem';
import { listProfileHighlights } from '@/content/profile';
import { useTranslation } from '@/i18n/useTranslation';

import styles from './ProfileHighlightList.module.css';

export function ProfileHighlightList() {
  const translation = useTranslation();

  return (
    <ul className={styles.highlights}>
      {listProfileHighlights(translation).map((highlight) => (
        <ProfileHighlightItem key={highlight.figure} highlight={highlight} />
      ))}
    </ul>
  );
}
