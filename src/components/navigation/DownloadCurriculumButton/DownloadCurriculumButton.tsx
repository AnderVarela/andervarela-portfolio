import { Button } from '@/components/ui/Button/Button';
import {
  ButtonSizes,
  ButtonVariants,
  type ButtonSize,
  type ButtonVariant,
} from '@/components/ui/Button/Button.types';
import { IconNames } from '@/components/ui/Icon/Icon.types';
import { useTranslation } from '@/i18n/useTranslation';

import { useCurriculumDownload } from './DownloadCurriculumButton.helper';

interface DownloadCurriculumButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isFullWidth?: boolean;
}

export function DownloadCurriculumButton({
  variant = ButtonVariants.Primary,
  size = ButtonSizes.Small,
  isFullWidth = false,
}: DownloadCurriculumButtonProps) {
  const translation = useTranslation();
  const downloadCurriculum = useCurriculumDownload();

  return (
    <Button
      label={translation.curriculum.download}
      iconName={IconNames.Download}
      variant={variant}
      size={size}
      isFullWidth={isFullWidth}
      onClick={downloadCurriculum}
    />
  );
}
