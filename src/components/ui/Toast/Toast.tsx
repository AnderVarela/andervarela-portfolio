import { useToastStore } from '@/stores/useToastStore';

import styles from './Toast.module.css';

export function Toast() {
  const message = useToastStore((state) => state.message);

  return (
    <div role="status" className={styles.toastRegion}>
      {message && <span className={styles.toast}>{message}</span>}
    </div>
  );
}
