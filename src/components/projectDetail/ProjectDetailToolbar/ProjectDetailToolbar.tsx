import type { Ref } from 'react';

import { Button } from '@/components/ui/Button/Button';
import {
  ButtonIconPositions,
  ButtonLabelVisibilities,
  ButtonVariants,
} from '@/components/ui/Button/Button.types';
import { IconNames } from '@/components/ui/Icon/Icon.types';
import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import { PROJECT_COUNT } from '@/content/projects';
import { useTranslation } from '@/i18n/useTranslation';
import { useProjectDetailStore } from '@/stores/useProjectDetailStore';
import { formatAsTwoDigits, formatPositionInTotal } from '@/utils/formatting';

import styles from './ProjectDetailToolbar.module.css';

const PREVIOUS_PROJECT_STEP = -1;
const NEXT_PROJECT_STEP = 1;

interface ProjectDetailToolbarProps {
  projectIndex: number;
  closeButtonReference: Ref<HTMLButtonElement>;
  onClose: () => void;
}

export function ProjectDetailToolbar({
  projectIndex,
  closeButtonReference,
  onClose,
}: ProjectDetailToolbarProps) {
  const translation = useTranslation();
  const showAdjacentProject = useProjectDetailStore((state) => state.showAdjacentProject);
  const projectPosition = projectIndex + 1;
  const positionLabel = `P/${formatAsTwoDigits(projectPosition)} · ${formatPositionInTotal(projectPosition, PROJECT_COUNT)}`;

  return (
    <div className={styles.toolbar}>
      <span className={styles.position}>
        <Text kind={TextTypes.Note} label={positionLabel} tone={TextTones.Muted} />
      </span>
      <Button
        label={translation.actions.previous}
        iconName={IconNames.ChevronLeft}
        iconPosition={ButtonIconPositions.Leading}
        labelVisibility={ButtonLabelVisibilities.FromTablet}
        onClick={() => showAdjacentProject(PREVIOUS_PROJECT_STEP)}
      />
      <Button
        label={translation.actions.next}
        iconName={IconNames.ChevronRight}
        labelVisibility={ButtonLabelVisibilities.FromTablet}
        onClick={() => showAdjacentProject(NEXT_PROJECT_STEP)}
      />
      <Button
        ref={closeButtonReference}
        label={translation.actions.close}
        iconName={IconNames.Close}
        variant={ButtonVariants.Primary}
        labelVisibility={ButtonLabelVisibilities.Never}
        onClick={onClose}
      />
    </div>
  );
}
