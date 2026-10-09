import { Button } from '@/components/ui/Button/Button';
import { ButtonIconPositions, ButtonLabelVisibilities } from '@/components/ui/Button/Button.types';
import { IconNames } from '@/components/ui/Icon/Icon.types';
import { CONTACT_EMAIL } from '@/content/contact';
import { useTranslation } from '@/i18n/useTranslation';

import { useClipboardCopy } from './CopyEmailButton.helper';

export function CopyEmailButton() {
  const translation = useTranslation();
  const { isCopied, copyToClipboard } = useClipboardCopy(CONTACT_EMAIL);

  return (
    <Button
      label={isCopied ? translation.actions.copied : translation.actions.copy}
      iconName={IconNames.Copy}
      iconPosition={ButtonIconPositions.Leading}
      labelVisibility={ButtonLabelVisibilities.FromTablet}
      onClick={copyToClipboard}
    />
  );
}
