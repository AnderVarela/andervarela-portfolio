import { buildCurriculumFileName, CURRICULUM_URL_BY_LANGUAGE } from '@/content/curriculum';
import { DEFAULT_LANGUAGE, type Language } from '@/i18n/languages';
import { useTranslation } from '@/i18n/useTranslation';
import { usePreferencesStore } from '@/stores/usePreferencesStore';
import { useToastStore } from '@/stores/useToastStore';

interface CurriculumFile {
  url: string;
  fileName: string;
}

/* Devuelve el CV del idioma activo y, si aún no existe, el español. */
export function findCurriculumFile(language: Language): CurriculumFile | null {
  const availableLanguage = [language, DEFAULT_LANGUAGE].find(
    (candidate) => CURRICULUM_URL_BY_LANGUAGE[candidate] !== undefined,
  );
  const url = availableLanguage && CURRICULUM_URL_BY_LANGUAGE[availableLanguage];

  return url ? { url, fileName: buildCurriculumFileName(availableLanguage) } : null;
}

function triggerFileDownload({ url, fileName }: CurriculumFile): void {
  const temporaryLink = document.createElement('a');
  temporaryLink.href = url;
  temporaryLink.download = fileName;
  temporaryLink.click();
}

export function useCurriculumDownload(): () => void {
  const translation = useTranslation();
  const language = usePreferencesStore((state) => state.language);
  const showToast = useToastStore((state) => state.showToast);

  return () => {
    const curriculumFile = findCurriculumFile(language);

    if (curriculumFile) {
      triggerFileDownload(curriculumFile);
      return;
    }

    showToast(`${buildCurriculumFileName(language)} · ${translation.curriculum.filePending}`);
  };
}
