export interface Degree {
  period: string;
  title: string;
  institution: string;
  distinction?: string;
}

export const DEGREES: readonly Degree[] = [
  {
    period: '2024–2026',
    title: 'Máster Universitario en Ingeniería Informática',
    institution: 'Universidade da Coruña',
    distinction: 'TFM con Matrícula de Honor',
  },
  {
    period: '2020–2024',
    title: 'Grado en Ingeniería Informática',
    institution: 'Mención en Ingeniería del Software · Universidade da Coruña',
  },
];
