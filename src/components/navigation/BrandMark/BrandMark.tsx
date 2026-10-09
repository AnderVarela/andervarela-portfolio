import { PROFILE_INITIALS } from '@/content/profile';

import styles from './BrandMark.module.css';

export function BrandMark() {
  return <span className={styles.brandMark}>{PROFILE_INITIALS}</span>;
}
