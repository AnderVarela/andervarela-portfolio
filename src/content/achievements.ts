import type { Translation } from '@/i18n/translations/es';

export interface Achievement {
  figure: string;
  title: string;
  detail?: string;
  relatedProjectId?: string;
}

export function listHackathonAwards(translation: Translation): readonly Achievement[] {
  const { firstPlaceFigure, hackspainDetail, hackudcDetail } = translation.achievements;

  return [
    {
      figure: firstPlaceFigure,
      title: "HackSpain '26",
      detail: hackspainDetail,
      relatedProjectId: 'hackspain-26',
    },
    {
      figure: firstPlaceFigure,
      title: "HackUDC '25",
      detail: hackudcDetail,
      relatedProjectId: 'hackudc-25',
    },
  ];
}

/* La Matrícula de Honor del TFM ya figura junto al máster; aquí solo van certificaciones. */
export function listCertifications(): readonly Achievement[] {
  return [{ figure: 'AWS', title: 'AWS Certified Cloud Practitioner' }];
}
