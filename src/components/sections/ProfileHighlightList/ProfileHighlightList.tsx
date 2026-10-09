import { ProfileHighlightItem } from '@/components/sections/ProfileHighlightItem/ProfileHighlightItem';
import { PROFILE_HIGHLIGHTS } from '@/content/profile';

import styles from './ProfileHighlightList.module.css';

export function ProfileHighlightList() {
  return (
    <ul className={styles.highlights}>
      {PROFILE_HIGHLIGHTS.map((highlight) => (
        <ProfileHighlightItem key={highlight.description} highlight={highlight} />
      ))}
    </ul>
  );
}
