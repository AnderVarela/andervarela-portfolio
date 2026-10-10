import spanishCurriculumUrl from '@/assets/curriculum/cv-web.pdf';
import { Languages, type Language } from '@/i18n/languages';

/* Rutas de los PDF publicados. Mientras un idioma no tenga fichero se usa el español. */
export const CURRICULUM_URL_BY_LANGUAGE: Partial<Record<Language, string>> = {
  [Languages.Spanish]: spanishCurriculumUrl,
};

export function buildCurriculumFileName(language: Language): string {
  return `CV_AnderVarela_${language.toUpperCase()}.pdf`;
}
