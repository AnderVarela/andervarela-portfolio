export const Languages = {
  Spanish: 'es',
  English: 'en',
  Galician: 'gl',
} as const;

export type Language = (typeof Languages)[keyof typeof Languages];

export const SUPPORTED_LANGUAGES: readonly Language[] = Object.values(Languages);

export const DEFAULT_LANGUAGE: Language = Languages.Spanish;

export function isSupportedLanguage(candidate: string | null): candidate is Language {
  return SUPPORTED_LANGUAGES.some((language) => language === candidate);
}
