import type { Translation } from '@/i18n/translations/es';

type TranslatedTechnologyKey = keyof Translation['technologies'];

/* Casi todas las tecnologías son nombres propios; estas son las que cambian con el idioma. */
export const TranslatedTechnologies = {
  RestApis: 'restApis',
  Contracts: 'contracts',
  AgentsAndSkills: 'agentsAndSkills',
  TokenOptimisation: 'tokenOptimisation',
} as const satisfies Record<string, TranslatedTechnologyKey>;

function isTranslatedTechnology(
  technology: string,
  translation: Translation,
): technology is TranslatedTechnologyKey {
  return technology in translation.technologies;
}

export function localizeTechnologies(
  technologies: readonly string[],
  translation: Translation,
): readonly string[] {
  return technologies.map((technology) =>
    isTranslatedTechnology(technology, translation)
      ? translation.technologies[technology]
      : technology,
  );
}
