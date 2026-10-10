export interface ExperienceMilestone {
  description: string;
  technologies: readonly string[];
}

export interface ExperiencePosition {
  title: string;
  placeAndPeriod: string;
  milestones: readonly ExperienceMilestone[];
}

export const CURRENT_POSITION: ExperiencePosition = {
  title: 'Frontend Developer · Kelea',
  placeAndPeriod: 'A Coruña · may. 2025 – actualidad',
  milestones: [
    {
      description:
        'Estandaricé los componentes de UI con React y TypeScript estricto: menos bugs y menos horas de QA.',
      technologies: ['React', 'TypeScript'],
    },
    {
      description:
        'Monté el estado global con Zustand para evitar re-renderizados innecesarios y datos desincronizados.',
      technologies: ['Zustand'],
    },
    {
      description: 'Protegí el repositorio con Husky, Commitlint y Playwright.',
      technologies: ['Husky', 'Commitlint', 'Playwright'],
    },
    {
      description: 'Hago de puente entre front y back al definir contratos y consumir APIs.',
      technologies: ['APIs REST', 'Contratos'],
    },
  ],
};
