import { useEffect } from 'react';

import { useTranslation } from '@/i18n/useTranslation';
import { usePreferencesStore } from '@/stores/usePreferencesStore';

const DESCRIPTION_META_SELECTOR = 'meta[name="description"]';

/* Refleja idioma y tema en el documento para que CSS, lectores de pantalla y buscadores los vean. */
export function useDocumentPreferences(): void {
  const language = usePreferencesStore((state) => state.language);
  const theme = usePreferencesStore((state) => state.theme);
  const { title, description } = useTranslation().document;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    document.title = title;
    document.querySelector(DESCRIPTION_META_SELECTOR)?.setAttribute('content', description);
  }, [title, description]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
}
