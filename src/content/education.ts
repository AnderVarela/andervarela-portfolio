import type { Translation } from '@/i18n/translations/es';

export interface Degree {
  period: string;
  title: string;
  institution: string;
  distinction?: string;
}

export function listDegrees(translation: Translation): readonly Degree[] {
  const { education } = translation;

  return [
    {
      period: '2024–2026',
      title: education.mastersTitle,
      institution: education.mastersInstitution,
      distinction: education.mastersDistinction,
    },
    {
      period: '2020–2024',
      title: education.bachelorsTitle,
      institution: education.bachelorsInstitution,
    },
  ];
}
