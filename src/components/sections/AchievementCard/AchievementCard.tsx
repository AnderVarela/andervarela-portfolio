import { Button } from '@/components/ui/Button/Button';
import { ButtonVariants } from '@/components/ui/Button/Button.types';
import { IconNames } from '@/components/ui/Icon/Icon.types';
import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import type { Achievement } from '@/content/achievements';
import { useTranslation } from '@/i18n/useTranslation';
import { openProjectDetailFromElement } from '@/stores/projectDetail.helper';

import styles from './AchievementCard.module.css';

interface AchievementCardProps {
  achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const translation = useTranslation();
  const { figure, title, detail, relatedProjectId } = achievement;

  return (
    <article className={styles.card}>
      <Text kind={TextTypes.Figure} label={figure} tone={TextTones.Accent} />
      <Text kind={TextTypes.Title} label={title} />
      {detail && <Text kind={TextTypes.Caption} label={detail} tone={TextTones.Muted} />}
      {relatedProjectId && (
        <Button
          label={translation.achievements.seeProject}
          iconName={IconNames.ArrowRight}
          variant={ButtonVariants.Ghost}
          opensDialog
          onClick={(event) => openProjectDetailFromElement(relatedProjectId, event.currentTarget)}
        />
      )}
    </article>
  );
}
