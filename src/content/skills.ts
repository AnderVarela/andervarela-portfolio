import type { Translation } from '@/i18n/translations/es';

import { localizeTechnologies, TranslatedTechnologies } from './technologies';

export interface SkillArea {
  code: string;
  name: string;
  technologies: readonly string[];
}

export interface WorkingPrinciple {
  title: string;
  description: string;
}

/* El stack principal: se destaca sobre el resto para que se lea primero. */
const FEATURED_TECHNOLOGIES: ReadonlySet<string> = new Set(['React', 'TypeScript']);

export function isFeaturedTechnology(technology: string): boolean {
  return FEATURED_TECHNOLOGIES.has(technology);
}

/*
 * Solo lo que se domina y se usa en producción, de más a menos profundidad. Lo que se da por
 * supuesto en el oficio (Git, HTML, hooks de commit) no se enumera.
 */
export function listSkillAreas(translation: Translation): readonly SkillArea[] {
  const { skills } = translation;

  return [
    {
      code: 'A/01',
      name: skills.frontend,
      technologies: ['React', 'TypeScript', 'JavaScript', 'Zustand', 'Vite', 'CSS Modules'],
    },
    {
      code: 'A/02',
      name: skills.testingAndQuality,
      technologies: ['Playwright', 'Vitest', 'Testing Library'],
    },
    {
      code: 'A/03',
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
    {
      code: 'A/04',
      name: skills.appliedArtificialIntelligence,
      technologies: [TranslatedTechnologies.AgentsAndSkills, 'MCPs'],
    },
  ].map((skillArea) => ({
    ...skillArea,
    technologies: localizeTechnologies(skillArea.technologies, translation),
  }));
}

export function listWorkingPrinciples(translation: Translation): readonly WorkingPrinciple[] {
  const { strictTyping, accessibility, performance, testing } = translation.skills.principles;

  return [strictTyping, accessibility, performance, testing];
}
