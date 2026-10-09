export const Languages = {
  Spanish: 'es',
  English: 'en',
  Galician: 'gl',
} as const;

export type Language = (typeof Languages)[keyof typeof Languages];

export const SUPPORTED_LANGUAGES: readonly Language[] = Object.values(Languages);

/* Cada idioma se anuncia con su propio nombre, sea cual sea el idioma activo. */
export const LANGUAGE_NAMES: Record<Language, string> = {
  [Languages.Spanish]: 'Español',
  [Languages.English]: 'English',
  [Languages.Galician]: 'Galego',
};

export const DEFAULT_LANGUAGE: Language = Languages.Spanish;

export function isSupportedLanguage(candidate: string | null): candidate is Language {
  return SUPPORTED_LANGUAGES.some((language) => language === candidate);
}
