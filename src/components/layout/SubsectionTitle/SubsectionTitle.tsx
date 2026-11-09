import styles from './SubsectionTitle.module.css';

interface SubsectionTitleProps {
  label: string;
}

/* Titular de un bloque dentro de una sección: nivel 3, bajo el titular de la sección. */
export function SubsectionTitle({ label }: SubsectionTitleProps) {
  return <h3 className={styles.title}>{label}</h3>;
}
