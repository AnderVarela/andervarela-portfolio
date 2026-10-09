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
      'Construí una extensión de Chrome (Manifest V3) y una SPA que simulan peticiones HTTP, con latencia y patrones de respuesta configurables. Fue mi TFM y lo defendí con Matrícula de Honor (10).',
    technologies: ['Manifest V3', 'React', 'TypeScript'],
    links: [{ kind: ProjectLinkKinds.Code }, { kind: ProjectLinkKinds.Demo }],
    awardBadge: 'TFM · Matrícula de Honor',
  },
  {
    id: 'portfolio',
    name: 'Este portfolio',
    shortName: 'Este portfolio',
    glyph: 'AV',
    type: 'Web',
    summary: 'Avatar 3D, capas y scroll animado.',
    problem: 'Un CV en PDF no enseña cómo trabajo en frontend.',
    contribution:
      'Esta web: un avatar 3D que guía el recorrido, un sistema de capas con animaciones ligadas al scroll, tres idiomas y tema claro y oscuro.',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Zustand',
      'Three.js',
      'GSAP',
      'CSS Modules',
      'Playwright',
    ],
    links: [{ kind: ProjectLinkKinds.Code }],
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
