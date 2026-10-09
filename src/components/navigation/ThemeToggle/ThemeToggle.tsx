import { Button } from '@/components/ui/Button/Button';
import { ButtonLabelVisibilities } from '@/components/ui/Button/Button.types';
import { IconNames } from '@/components/ui/Icon/Icon.types';
import { useTranslation } from '@/i18n/useTranslation';
import { Themes } from '@/stores/preferences.helper';
import { usePreferencesStore } from '@/stores/usePreferencesStore';

interface ThemeToggleProps {
  isLabelVisible?: boolean;
}

export function ThemeToggle({ isLabelVisible = false }: ThemeToggleProps) {
  const translation = useTranslation();
  const isDarkTheme = usePreferencesStore((state) => state.theme === Themes.Dark);
  const toggleTheme = usePreferencesStore((state) => state.toggleTheme);

  return (
    <Button
      label={isDarkTheme ? translation.theme.switchToLight : translation.theme.switchToDark}
      iconName={isDarkTheme ? IconNames.Sun : IconNames.Moon}
      labelVisibility={
        isLabelVisible ? ButtonLabelVisibilities.Always : ButtonLabelVisibilities.Never
      }
      onClick={toggleTheme}
    />
  );
}
