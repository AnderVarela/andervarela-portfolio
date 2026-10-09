import { usePreferencesStore } from '@/stores/usePreferencesStore';

import { Languages, type Language } from './languages';
import { englishTranslation } from './translations/en';
import { spanishTranslation, type Translation } from './translations/es';
import { galicianTranslation } from './translations/gl';

const TRANSLATION_BY_LANGUAGE: Record<Language, Translation> = {
  [Languages.Spanish]: spanishTranslation,
  [Languages.English]: englishTranslation,
  [Languages.Galician]: galicianTranslation,
};

export function useTranslation(): Translation {
  const language = usePreferencesStore((state) => state.language);

  return TRANSLATION_BY_LANGUAGE[language];
}
