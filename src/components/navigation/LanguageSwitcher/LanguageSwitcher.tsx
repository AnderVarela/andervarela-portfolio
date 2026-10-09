import { LanguageOption } from '@/components/navigation/LanguageOption/LanguageOption';
import { SUPPORTED_LANGUAGES } from '@/i18n/languages';
import { useTranslation } from '@/i18n/useTranslation';
import { joinClassNames } from '@/utils/classNames';

import styles from './LanguageSwitcher.module.css';

interface LanguageSwitcherProps {
  isStretched?: boolean;
}

export function LanguageSwitcher({ isStretched = false }: LanguageSwitcherProps) {
  const translation = useTranslation();

  return (
    <div
      role="group"
      aria-label={translation.accessibility.languageSelector}
      className={joinClassNames(styles.switcher, isStretched && styles.stretched)}
    >
      {SUPPORTED_LANGUAGES.map((language) => (
        <LanguageOption key={language} language={language} />
      ))}
    </div>
  );
}
