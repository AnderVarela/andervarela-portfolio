import type { Language } from '@/i18n/languages';
import { usePreferencesStore } from '@/stores/usePreferencesStore';
import { joinClassNames } from '@/utils/classNames';

import styles from './LanguageOption.module.css';

interface LanguageOptionProps {
  language: Language;
}

export function LanguageOption({ language }: LanguageOptionProps) {
  const isSelected = usePreferencesStore((state) => state.language === language);
  const selectLanguage = usePreferencesStore((state) => state.selectLanguage);

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      lang={language}
      onClick={() => selectLanguage(language)}
      className={joinClassNames(styles.option, isSelected && styles.selected)}
    >
      {language.toUpperCase()}
    </button>
  );
}
