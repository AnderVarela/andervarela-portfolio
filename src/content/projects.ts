import portfolioExperienceScreenshotUrl from '@/assets/projects/portfolio/experience.jpg';
import portfolioHomeScreenshotUrl from '@/assets/projects/portfolio/home.jpg';
import portfolioSkillsScreenshotUrl from '@/assets/projects/portfolio/skills.jpg';
import hackspainEpisodeDashboardScreenshotUrl from '@/assets/projects/hackspain/episode-dashboard.png';
import hackspainSimulationCellScreenshotUrl from '@/assets/projects/hackspain/simulation-cell.gif';
import hackspainControlPanelScreenshotUrl from '@/assets/projects/hackspain/simulation-control-panel.png';
import hackudcChatAnswerScreenshotUrl from '@/assets/projects/hackudc/chat-answer.jpg';
import hackudcNewChatScreenshotUrl from '@/assets/projects/hackudc/new-chat.jpg';
import invoicesBatchFinishedScreenshotUrl from '@/assets/projects/rubicon-invoices/batch-finished.jpg';
import invoicesBatchQueueScreenshotUrl from '@/assets/projects/rubicon-invoices/batch-queue.jpg';
import invoicesCompleteDataScreenshotUrl from '@/assets/projects/rubicon-invoices/complete-invoice-data.jpg';
import requifyActiveRuleScreenshotUrl from '@/assets/projects/requify/active-rule.jpg';
import requifyControlPanelScreenshotUrl from '@/assets/projects/requify/control-panel.jpg';
import requifyNewRuleScreenshotUrl from '@/assets/projects/requify/new-rule.jpg';
import catalogueCategoriesScreenshotUrl from '@/assets/projects/rubicon-catalogue/categories.jpg';
import catalogueNoticeBannerScreenshotUrl from '@/assets/projects/rubicon-catalogue/notice-banner.jpg';
import catalogueProductsScreenshotUrl from '@/assets/projects/rubicon-catalogue/products.jpg';
import rubiconWebHomeScreenshotUrl from '@/assets/projects/rubicon-web/home.jpg';
import rubiconWebProductDetailScreenshotUrl from '@/assets/projects/rubicon-web/product-detail.jpg';
import rubiconWebReviewsScreenshotUrl from '@/assets/projects/rubicon-web/reviews.jpg';
import type { Translation } from '@/i18n/translations/es';

export const ProjectLinkKinds = {
  Web: 'web',
  Code: 'code',
  Demo: 'demo',
} as const;

export type ProjectLinkKind = (typeof ProjectLinkKinds)[keyof typeof ProjectLinkKinds];

export interface ProjectLink {
  kind: ProjectLinkKind;
  /* Sin URL el enlace se anuncia como pendiente. */
  url?: string;
}

export interface ProjectScreenshot {
  imageUrl: string;
  description: string;
}

export interface ProjectGroup {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  /* Nombre corto para cuando el grupo ya da el contexto. */
  shortName: string;
  glyph: string;
  type: string;
  summary: string;
  problem: string;
  contribution: string;
  technologies: readonly string[];
  links: readonly ProjectLink[];
  /* La primera captura es la principal y hace de portada de la tarjeta. */
  screenshots: readonly ProjectScreenshot[];
  awardBadge?: string;
  isPrivate?: boolean;
  group?: ProjectGroup;
}

/* Clave de los textos de cada proyecto en los ficheros de traducción. */
export const ProjectTextKeys = {
  Requify: 'requify',
  Portfolio: 'portfolio',
  RubiconWeb: 'rubiconWeb',
  RubiconInvoices: 'rubiconInvoices',
  RubiconCatalogue: 'rubiconCatalogue',
  Hackspain: 'hackspain',
  Hackudc: 'hackudc',
} as const;

export type ProjectTextKey = (typeof ProjectTextKeys)[keyof typeof ProjectTextKeys];

/* Lo que cada idioma escribe de un proyecto. Las descripciones siguen el orden de las capturas. */
export interface ProjectText {
  name: string;
  shortName: string;
  type: string;
  summary: string;
  problem: string;
  contribution: string;
  awardBadge?: string;
  screenshotDescriptions: readonly string[];
}

interface ProjectGroupDefinition {
  id: string;
  textKey: keyof Translation['projects']['groups'];
}

/* Lo que no cambia con el idioma: identidad, stack, enlaces e imágenes. */
interface ProjectDefinition {
  id: string;
  textKey: ProjectTextKey;
  glyph: string;
  technologies: readonly string[];
  links: readonly ProjectLink[];
  screenshotUrls: readonly string[];
  isPrivate?: boolean;
  group?: ProjectGroupDefinition;
}

const RUBICON_BAKERY_GROUP: ProjectGroupDefinition = {
  id: 'panaderia-rubicon',
  textKey: 'rubiconBakery',
};

const PROJECT_DEFINITIONS: readonly ProjectDefinition[] = [
  {
    id: 'requify',
    textKey: ProjectTextKeys.Requify,
    glyph: 'RQ',
    technologies: ['Manifest V3', 'React', 'TypeScript', 'Zustand', 'Vite', 'Vitest', 'Playwright'],
    links: [{ kind: ProjectLinkKinds.Code, url: 'https://github.com/AnderVarela/RequiFy' }],
    screenshotUrls: [
      requifyControlPanelScreenshotUrl,
      requifyActiveRuleScreenshotUrl,
      requifyNewRuleScreenshotUrl,
    ],
  },
  {
    id: 'portfolio',
    textKey: ProjectTextKeys.Portfolio,
    glyph: 'AV',
    technologies: ['React', 'TypeScript', 'Vite', 'Zustand', 'CSS Modules', 'Vitest'],
    links: [
      { kind: ProjectLinkKinds.Code, url: 'https://github.com/AnderVarela/andervarela-portfolio' },
    ],
    screenshotUrls: [
      portfolioHomeScreenshotUrl,
      portfolioExperienceScreenshotUrl,
      portfolioSkillsScreenshotUrl,
    ],
  },
  {
    id: 'rubicon-web',
    textKey: ProjectTextKeys.RubiconWeb,
    glyph: 'R/W',
    technologies: ['React', 'TypeScript', 'Vite', 'Zustand', 'CSS Modules', 'Vitest'],
    links: [{ kind: ProjectLinkKinds.Web, url: 'https://panaderiarubicon.es' }],
    screenshotUrls: [
      rubiconWebHomeScreenshotUrl,
      rubiconWebProductDetailScreenshotUrl,
      rubiconWebReviewsScreenshotUrl,
    ],
    group: RUBICON_BAKERY_GROUP,
  },
  {
    id: 'rubicon-facturas',
    textKey: ProjectTextKeys.RubiconInvoices,
    glyph: 'R/F',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Tauri',
      'Python',
      'FastAPI',
      'OCR',
      'Playwright',
    ],
    links: [],
    screenshotUrls: [
      invoicesCompleteDataScreenshotUrl,
      invoicesBatchQueueScreenshotUrl,
      invoicesBatchFinishedScreenshotUrl,
    ],
    isPrivate: true,
    group: RUBICON_BAKERY_GROUP,
  },
  {
    id: 'rubicon-catalogo',
    textKey: ProjectTextKeys.RubiconCatalogue,
    glyph: 'R/C',
    technologies: ['React', 'TypeScript', 'Vite', 'Zustand', 'CSS Modules'],
    links: [],
    screenshotUrls: [
      catalogueProductsScreenshotUrl,
      catalogueCategoriesScreenshotUrl,
      catalogueNoticeBannerScreenshotUrl,
    ],
    isPrivate: true,
    group: RUBICON_BAKERY_GROUP,
  },
  {
    id: 'hackspain-26',
    textKey: ProjectTextKeys.Hackspain,
    glyph: 'HS26',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Supabase',
      'TanStack Query',
      'Python',
      'MuJoCo',
    ],
    links: [{ kind: ProjectLinkKinds.Code, url: 'https://github.com/STACKSPECT/Platform' }],
    screenshotUrls: [
      hackspainEpisodeDashboardScreenshotUrl,
      hackspainSimulationCellScreenshotUrl,
      hackspainControlPanelScreenshotUrl,
    ],
  },
  {
    id: 'hackudc-25',
    textKey: ProjectTextKeys.Hackudc,
    glyph: 'HU25',
    technologies: ['React', 'Redux Toolkit', 'JavaScript', 'Python', 'Flask', 'Denodo', 'Gemini'],
    links: [
      { kind: ProjectLinkKinds.Code, url: 'https://github.com/AnderVarela/HackUDC25-Denodo' },
    ],
    screenshotUrls: [hackudcChatAnswerScreenshotUrl, hackudcNewChatScreenshotUrl],
  },
];

export const PROJECT_COUNT = PROJECT_DEFINITIONS.length;

export function findProjectIndex(projectId: string): number {
  return PROJECT_DEFINITIONS.findIndex((project) => project.id === projectId);
}

function buildProject(definition: ProjectDefinition, translation: Translation): Project {
  const { textKey, screenshotUrls, group, ...languageIndependentData } = definition;
  const { screenshotDescriptions, ...text } = translation.projects.items[textKey];

  return {
    ...languageIndependentData,
    ...text,
    screenshots: screenshotUrls.map((imageUrl, screenshotIndex) => ({
      imageUrl,
      description: screenshotDescriptions[screenshotIndex] ?? '',
    })),
    group: group && { id: group.id, name: translation.projects.groups[group.textKey] },
  };
}

const projectsByTranslation = new WeakMap<Translation, readonly Project[]>();

/* Los proyectos en el idioma de la traducción; cada idioma se construye una sola vez. */
export function listProjects(translation: Translation): readonly Project[] {
  const existingProjects = projectsByTranslation.get(translation);
  if (existingProjects) return existingProjects;

  const projects = PROJECT_DEFINITIONS.map((definition) => buildProject(definition, translation));
  projectsByTranslation.set(translation, projects);

  return projects;
}

export function listProjectsInGroup(
  projects: readonly Project[],
  groupId: string,
): readonly Project[] {
  return projects.filter((project) => project.group?.id === groupId);
}
