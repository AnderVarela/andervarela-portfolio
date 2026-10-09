export const CONTACT_EMAIL = 'ander@andervarela.es';

export interface ExternalProfile {
  name: string;
  url: string;
  displayUrl: string;
}

export const EXTERNAL_PROFILES: readonly ExternalProfile[] = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/andervarela',
    displayUrl: 'linkedin.com/in/andervarela',
  },
  { name: 'GitHub', url: 'https://github.com/AnderVarela', displayUrl: 'github.com/AnderVarela' },
];

export const SITE_SOURCE_CODE_URL = 'https://github.com/AnderVarela';
