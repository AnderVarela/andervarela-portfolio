import type { Translation } from '@/i18n/translations/es';

import { localizeTechnologies, TranslatedTechnologies } from './technologies';

export interface SkillArea {
  code: string;
  name: string;
  technologies: readonly string[];
}

const AREAS_BESIDE_EACH_SIDE_OF_AVATAR = 2;

/* El stack principal: se destaca sobre el resto para que se lea primero. */
const FEATURED_TECHNOLOGIES: ReadonlySet<string> = new Set(['React', 'TypeScript']);

export function isFeaturedTechnology(technology: string): boolean {
  return FEATURED_TECHNOLOGIES.has(technology);
}

function listSkillAreas(translation: Translation): readonly SkillArea[] {
  const { skills } = translation;

  return [
    {
      code: 'A/01',
      name: skills.frontend,
      technologies: ['React', 'TypeScript', 'JavaScript', 'Zustand', 'Vite', 'HTML', 'CSS Modules'],
    },
    {
      code: 'A/02',
      name: skills.testingAndQuality,
      technologies: ['Playwright', 'Husky', 'Commitlint', 'Git'],
    },
    {
      code: 'A/03',
      name: skills.appliedArtificialIntelligence,
      technologies: [
        'Prompt engineering',
        TranslatedTechnologies.AgentsAndSkills,
        'MCPs',
        TranslatedTechnologies.TokenOptimisation,
      ],
    },
    {
      code: 'A/04',
      name: skills.fullStack,
      technologies: [
        'Java',
        'Spring Boot',
        'Node.js',
        TranslatedTechnologies.RestApis,
        'Docker',
        'AWS',
      ],
    },
  ].map((skillArea) => ({
    ...skillArea,
    technologies: localizeTechnologies(skillArea.technologies, translation),
  }));
}

export function listSkillAreasLeftOfAvatar(translation: Translation): readonly SkillArea[] {
  return listSkillAreas(translation).slice(0, AREAS_BESIDE_EACH_SIDE_OF_AVATAR);
}

export function listSkillAreasRightOfAvatar(translation: Translation): readonly SkillArea[] {
  return listSkillAreas(translation).slice(AREAS_BESIDE_EACH_SIDE_OF_AVATAR);
}
