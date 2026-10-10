import portfolioExperienceScreenshotUrl from '@/assets/projects/portfolio/experience.jpg';
import portfolioHomeScreenshotUrl from '@/assets/projects/portfolio/home.jpg';
import portfolioSkillsScreenshotUrl from '@/assets/projects/portfolio/skills.jpg';
import requifyActiveRuleScreenshotUrl from '@/assets/projects/requify/active-rule.jpg';
import requifyControlPanelScreenshotUrl from '@/assets/projects/requify/control-panel.jpg';
import requifyNewRuleScreenshotUrl from '@/assets/projects/requify/new-rule.jpg';

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
  isContributionPending?: boolean;
  technologies: readonly string[];
  links: readonly ProjectLink[];
  /* La primera captura es la principal y hace de portada de la tarjeta. */
  screenshots?: readonly ProjectScreenshot[];
  awardBadge?: string;
  isPrivate?: boolean;
  group?: ProjectGroup;
}

const RUBICON_BAKERY_GROUP: ProjectGroup = { id: 'panaderia-rubicon', name: 'Panadería Rubicón' };

const PENDING_CONTRIBUTION = 'Pendiente de completar.';
const PENDING_HACKATHON_CONTRIBUTION = 'Pendiente: nombre, descripción y stack del proyecto.';
const PENDING_STACK = ['Stack pendiente'];

export const PROJECTS: readonly Project[] = [
  {
    id: 'requify',
    name: 'RequiFy',
    shortName: 'RequiFy',
    glyph: 'RQ',
    type: 'Extensión de Chrome + SPA',
    summary: 'Mocking de peticiones HTTP para no depender del backend.',
    problem:
      'El frontend se queda bloqueado cada vez que un endpoint del backend no está listo o falla.',
    contribution:
      'Construí una extensión de Chrome (Manifest V3) que intercepta las peticiones HTTP de cualquier web y devuelve respuestas simuladas, y una SPA de panel de control para gestionar las reglas por colecciones: método y patrón de URL, código de estado, retardo, cabeceras y cuerpo, con importación y exportación. No necesita backend: todo se guarda en el navegador. Fue mi TFM y lo defendí con Matrícula de Honor (10).',
    technologies: ['Manifest V3', 'React', 'TypeScript', 'Zustand', 'Vite', 'Vitest', 'Playwright'],
    links: [{ kind: ProjectLinkKinds.Code, url: 'https://github.com/AnderVarela/RequiFy' }],
    screenshots: [
      {
        imageUrl: requifyControlPanelScreenshotUrl,
        description:
          'Panel de control de RequiFy, con las colecciones de reglas y el editor de una respuesta simulada',
      },
      {
        imageUrl: requifyActiveRuleScreenshotUrl,
        description:
          'Popup de RequiFy con una regla activa que cambia los artículos y precios de una cesta de la compra',
      },
      {
        imageUrl: requifyNewRuleScreenshotUrl,
        description: 'Formulario de RequiFy para crear una regla nueva',
      },
    ],
    awardBadge: 'TFM · Matrícula de Honor',
  },
  {
    id: 'portfolio',
    name: 'Este portfolio',
    shortName: 'Este portfolio',
    glyph: 'AV',
    type: 'Web',
    summary: 'Avatar ilustrado, capas y scroll animado.',
    problem: 'Un CV en PDF no enseña cómo trabajo en frontend.',
    contribution:
      'Esta web: un avatar ilustrado que guía el recorrido y cambia de pose en cada sección, un sistema de capas con animaciones ligadas al scroll, tres idiomas y tema claro y oscuro.',
    technologies: ['React', 'TypeScript', 'Vite', 'Zustand', 'CSS Modules', 'Vitest'],
    links: [
      { kind: ProjectLinkKinds.Code, url: 'https://github.com/AnderVarela/andervarela-portfolio' },
    ],
    screenshots: [
      {
        imageUrl: portfolioHomeScreenshotUrl,
        description: 'Inicio del portfolio, con el avatar saludando junto al titular',
      },
      {
        imageUrl: portfolioExperienceScreenshotUrl,
        description: 'Sección de experiencia, con el avatar sentado con el portátil',
      },
      {
        imageUrl: portfolioSkillsScreenshotUrl,
        description: 'Sección de skills, con el avatar rodeado de iconos de tecnologías',
      },
    ],
  },
  {
    id: 'rubicon-web',
    name: 'Web de Panadería Rubicón',
    shortName: 'Web corporativa',
    glyph: 'R/W',
    type: 'Web corporativa',
    summary: 'Sitio web del negocio.',
    problem: 'Sitio web del negocio.',
    contribution: PENDING_CONTRIBUTION,
    isContributionPending: true,
    technologies: PENDING_STACK,
    links: [{ kind: ProjectLinkKinds.Web }],
    group: RUBICON_BAKERY_GROUP,
  },
  {
    id: 'rubicon-facturas',
    name: 'Gestión de facturas · Panadería Rubicón',
    shortName: 'Gestión de facturas',
    glyph: 'R/F',
    type: 'Aplicación de gestión',
    summary: 'Aplicación interna para gestionar la facturación.',
    problem: 'Aplicación interna para gestionar la facturación.',
    contribution: PENDING_CONTRIBUTION,
    isContributionPending: true,
    technologies: PENDING_STACK,
    links: [],
    isPrivate: true,
    group: RUBICON_BAKERY_GROUP,
  },
  {
    id: 'rubicon-catalogo',
    name: 'Gestión de catálogo · Panadería Rubicón',
    shortName: 'Gestión de catálogo',
    glyph: 'R/C',
    type: 'SPA',
    summary: 'SPA de administración del catálogo.',
    problem: 'Administrar el catálogo de productos.',
    contribution: PENDING_CONTRIBUTION,
    isContributionPending: true,
    technologies: PENDING_STACK,
    links: [{ kind: ProjectLinkKinds.Demo }],
    group: RUBICON_BAKERY_GROUP,
  },
  {
    id: 'hackspain-26',
    name: "Proyecto HackSpain '26",
    shortName: "HackSpain '26",
    glyph: 'HS26',
    type: 'Hackatón · 36 h',
    summary: 'Automatización industrial para THEKER Robotics.',
    problem: "Reto de automatización industrial de THEKER Robotics en HackSpain '26.",
    contribution: PENDING_HACKATHON_CONTRIBUTION,
    isContributionPending: true,
    technologies: PENDING_STACK,
    links: [{ kind: ProjectLinkKinds.Code }],
    awardBadge: '1.er premio',
  },
  {
    id: 'hackudc-25',
    name: "Proyecto HackUDC '25",
    shortName: "HackUDC '25",
    glyph: 'HU25',
    type: 'Hackatón · 36 h',
    summary: 'Reto corporativo de Denodo.',
    problem: "Reto corporativo de Denodo en HackUDC '25.",
    contribution: PENDING_HACKATHON_CONTRIBUTION,
    isContributionPending: true,
    technologies: PENDING_STACK,
    links: [{ kind: ProjectLinkKinds.Code }],
    awardBadge: '1.er premio',
  },
];

export const PROJECT_COUNT = PROJECTS.length;

export function findProjectIndex(projectId: string): number {
  return PROJECTS.findIndex((project) => project.id === projectId);
}

export function listProjectsInGroup(groupId: string): readonly Project[] {
  return PROJECTS.filter((project) => project.group?.id === groupId);
}
