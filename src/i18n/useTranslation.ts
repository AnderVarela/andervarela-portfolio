import { usePreferencesStore } from '@/stores/usePreferencesStore';

import { Languages, type Language } from './languages';
import { englishTranslation } from './translations/en';
import { spanishTranslation, type Translation } from './translations/es';

const TRANSLATION_BY_LANGUAGE: Record<Language, Translation> = {
  [Languages.Spanish]: spanishTranslation,
  [Languages.English]: englishTranslation,
};

export function useTranslation(): Translation {
  const language = usePreferencesStore((state) => state.language);

  return TRANSLATION_BY_LANGUAGE[language];
}
