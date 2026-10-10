import { DEFAULT_LANGUAGE, isSupportedLanguage, type Language } from '@/i18n/languages';
import { readStoredValue } from '@/utils/browserStorage';
import { prefersLightColorScheme } from '@/utils/mediaPreferences';

export const Themes = {
  Dark: 'dark',
  Light: 'light',
} as const;

export type Theme = (typeof Themes)[keyof typeof Themes];

export const LANGUAGE_STORAGE_KEY = 'av_lang';
export const THEME_STORAGE_KEY = 'av_theme';

const LANGUAGE_CODE_LENGTH = 2;

function isTheme(candidate: string | null): candidate is Theme {
  return candidate === Themes.Dark || candidate === Themes.Light;
}

export function resolveInitialLanguage(): Language {
  const storedLanguage = readStoredValue(LANGUAGE_STORAGE_KEY);
  if (isSupportedLanguage(storedLanguage)) return storedLanguage;

  const browserLanguage = navigator.language.slice(0, LANGUAGE_CODE_LENGTH).toLowerCase();
  return isSupportedLanguage(browserLanguage) ? browserLanguage : DEFAULT_LANGUAGE;
}

export function resolveInitialTheme(): Theme {
  const storedTheme = readStoredValue(THEME_STORAGE_KEY);
  if (isTheme(storedTheme)) return storedTheme;

  return prefersLightColorScheme() ? Themes.Light : Themes.Dark;
}

export function getOppositeTheme(theme: Theme): Theme {
  return theme === Themes.Dark ? Themes.Light : Themes.Dark;
}
