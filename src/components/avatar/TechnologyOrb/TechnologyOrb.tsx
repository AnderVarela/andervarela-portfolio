import styles from './TechnologyOrb.module.css';

interface TechnologyOrbProps {
  label: string;
}

const ORB_SIZE = 52;
const LABEL_BASELINE = 33;

export function TechnologyOrb({ label }: TechnologyOrbProps) {
  return (
    <g data-technology-orb>
      <rect width={ORB_SIZE} height={ORB_SIZE} className={styles.frame} />
      <text x={ORB_SIZE / 2} y={LABEL_BASELINE} textAnchor="middle" className={styles.label}>
        {label}
      </text>
    </g>
  );
}
