import { SkillChip } from '@/components/sections/SkillChip/SkillChip';
import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import type { SkillArea } from '@/content/skills';

import styles from './SkillAreaGroup.module.css';

interface SkillAreaGroupProps {
  skillArea: SkillArea;
}

export function SkillAreaGroup({ skillArea }: SkillAreaGroupProps) {
  return (
    <div className={styles.area}>
      <Text
        kind={TextTypes.Label}
        label={`${skillArea.code} · ${skillArea.name}`}
        tone={TextTones.Muted}
      />
      <ul className={styles.technologies}>
        {skillArea.technologies.map((technology) => (
          <SkillChip key={technology} label={technology} />
        ))}
      </ul>
    </div>
  );
}
