import type { Translation } from '@/i18n/translations/es';

import { localizeTechnologies, TranslatedTechnologies } from './technologies';

export interface ExperienceMilestone {
  description: string;
  technologies: readonly string[];
}

export interface ExperiencePosition {
  title: string;
  placeAndPeriod: string;
  milestones: readonly ExperienceMilestone[];
}

export function describeCurrentPosition(translation: Translation): ExperiencePosition {
  const { position, placeAndPeriod, milestones } = translation.experience;

  return {
    title: position,
    placeAndPeriod,
    milestones: [
      { description: milestones.uiComponents, technologies: ['React', 'TypeScript'] },
      { description: milestones.globalState, technologies: ['Zustand'] },
      {
        description: milestones.repositoryQuality,
        technologies: ['Husky', 'Commitlint', 'Playwright'],
      },
      {
        description: milestones.apiContracts,
        technologies: [TranslatedTechnologies.RestApis, TranslatedTechnologies.Contracts],
      },
    ].map((milestone) => ({
      ...milestone,
      technologies: localizeTechnologies(milestone.technologies, translation),
    })),
  };
}
