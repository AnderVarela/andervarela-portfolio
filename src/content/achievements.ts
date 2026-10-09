export interface Achievement {
  figure: string;
  title: string;
  detail?: string;
  relatedProjectId?: string;
}

export const HACKATHON_AWARDS: readonly Achievement[] = [
  {
    figure: '1.º',
    title: "HackSpain '26",
    detail: '1.er premio · THEKER Robotics · 36 h',
    relatedProjectId: 'hackspain-26',
  },
  {
    figure: '1.º',
    title: "HackUDC '25",
    detail: '1.er premio · reto de Denodo · 36 h',
    relatedProjectId: 'hackudc-25',
  },
];

export const ACADEMIC_AND_CERTIFIED_MERITS: readonly Achievement[] = [
  { figure: '10', title: 'Matrícula de Honor (10)', detail: 'defensa del TFM' },
  { figure: 'AWS', title: 'AWS Certified Cloud Practitioner' },
];
