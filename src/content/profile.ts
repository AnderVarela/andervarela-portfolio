export const PROFILE_NAME = 'Ander Varela';
export const PROFILE_FIRST_NAME = 'Ander';
export const PROFILE_NAME_IN_TWO_LINES = PROFILE_NAME.replace(' ', '\n');
export const PROFILE_INITIALS = 'AV';
export const PROFILE_DOMAIN = 'andervarela.es';

export const ABOUT_SUMMARY =
  'Soy desarrollador frontend con visión full-stack. Me gusta que el código sea predecible: componentes bien tipados, estado bajo control y un repositorio en el que no entra nada roto. Uso la IA a diario para ir más rápido sin perder calidad.';

export interface ProfileHighlight {
  figure: string;
  description: string;
}

export const PROFILE_HIGHLIGHTS: readonly ProfileHighlight[] = [
  { figure: '10', description: 'Matrícula de Honor en el TFM' },
  { figure: '2', description: 'hackatones ganados' },
  { figure: 'AWS', description: 'Certified Cloud Practitioner' },
];

export const SPOKEN_LANGUAGES_LABEL = 'Idiomas';
export const SPOKEN_LANGUAGES_SUMMARY = 'Español y gallego (nativos), inglés técnico.';
