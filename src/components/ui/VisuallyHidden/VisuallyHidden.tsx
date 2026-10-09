import styles from './VisuallyHidden.module.css';

interface VisuallyHiddenProps {
  label: string;
  /* Anuncia el texto a los lectores de pantalla cada vez que cambia. */
  announcesChanges?: boolean;
}

/* Texto que no se ve pero que los lectores de pantalla sí leen. */
export function VisuallyHidden({ label, announcesChanges = false }: VisuallyHiddenProps) {
  return (
    <span className={styles.visuallyHidden} role={announcesChanges ? 'status' : undefined}>
      {label}
    </span>
  );
}
