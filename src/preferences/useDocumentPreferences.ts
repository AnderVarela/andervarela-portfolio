import { useEffect } from 'react';

import { usePreferencesStore } from '@/stores/usePreferencesStore';

/* Refleja idioma y tema en <html> para que CSS, lectores de pantalla y buscadores los vean. */
export function useDocumentPreferences(): void {
  const language = usePreferencesStore((state) => state.language);
  const theme = usePreferencesStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
}
