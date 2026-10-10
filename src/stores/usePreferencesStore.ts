import { create } from 'zustand';

import type { Language } from '@/i18n/languages';
import { storeValue } from '@/utils/browserStorage';

import {
  getOppositeTheme,
  LANGUAGE_STORAGE_KEY,
  resolveInitialLanguage,
  resolveInitialTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from './preferences.helper';

interface PreferencesState {
  language: Language;
  theme: Theme;
  selectLanguage: (language: Language) => void;
  toggleTheme: () => void;
}

export const usePreferencesStore = create<PreferencesState>((set, get) => ({
  language: resolveInitialLanguage(),
  theme: resolveInitialTheme(),
  selectLanguage: (language) => {
    storeValue(LANGUAGE_STORAGE_KEY, language);
    set({ language });
  },
  toggleTheme: () => {
    const theme = getOppositeTheme(get().theme);
    storeValue(THEME_STORAGE_KEY, theme);
    set({ theme });
  },
}));
