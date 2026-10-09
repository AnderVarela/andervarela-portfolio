export interface SkillArea {
  code: string;
  name: string;
  technologies: readonly string[];
}

export const SKILL_AREAS: readonly SkillArea[] = [
  {
    code: 'A/01',
    name: 'Frontend',
    technologies: ['React', 'TypeScript', 'JavaScript', 'Zustand', 'Vite', 'HTML', 'CSS Modules'],
  },
  {
    code: 'A/02',
    name: 'Testing y calidad',
    technologies: ['Playwright', 'Husky', 'Commitlint', 'Git'],
  },
  {
    code: 'A/03',
    name: 'IA aplicada',
    technologies: ['Prompt engineering', 'Agentes y skills', 'MCPs', 'Optimización de tokens'],
  },
  {
    code: 'A/04',
    name: 'Full-stack',
    technologies: ['Java', 'Spring Boot', 'Node.js', 'APIs REST', 'Docker', 'AWS'],
  },
];

const AREAS_BESIDE_EACH_SIDE_OF_AVATAR = 2;

export const SKILL_AREAS_LEFT_OF_AVATAR = SKILL_AREAS.slice(0, AREAS_BESIDE_EACH_SIDE_OF_AVATAR);
export const SKILL_AREAS_RIGHT_OF_AVATAR = SKILL_AREAS.slice(AREAS_BESIDE_EACH_SIDE_OF_AVATAR);
