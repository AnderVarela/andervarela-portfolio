import portfolioExperienceScreenshotUrl from '@/assets/projects/portfolio/experience.jpg';
import portfolioHomeScreenshotUrl from '@/assets/projects/portfolio/home.jpg';
import portfolioSkillsScreenshotUrl from '@/assets/projects/portfolio/skills.jpg';
import hackspainEpisodeDashboardScreenshotUrl from '@/assets/projects/hackspain/episode-dashboard.png';
import hackspainSimulationCellScreenshotUrl from '@/assets/projects/hackspain/simulation-cell.gif';
import hackspainControlPanelScreenshotUrl from '@/assets/projects/hackspain/simulation-control-panel.png';
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
    summary: 'Web de la panadería: catálogo, reseñas y horario.',
    problem:
      'La panadería no tenía un sitio propio donde enseñar sus productos, su horario y cómo llegar.',
    contribution:
      'Construí la web de la panadería: catálogo de productos por categorías con ficha de detalle e ingredientes, reseñas de Google, horario que indica si está abierta en ese momento, avisos puntuales y cómo llegar.',
    technologies: ['React', 'TypeScript', 'Vite', 'Zustand', 'CSS Modules', 'Vitest'],
    links: [{ kind: ProjectLinkKinds.Web, url: 'https://panaderiarubicon.es' }],
    screenshots: [
      {
        imageUrl: rubiconWebHomeScreenshotUrl,
        description:
          'Portada de la web de Panadería Rubicón, con el logotipo, el horario de hoy y una foto del mostrador',
      },
      {
        imageUrl: rubiconWebProductDetailScreenshotUrl,
        description: 'Ficha de un pan abierta sobre el catálogo, con precio e ingredientes',
      },
      {
        imageUrl: rubiconWebReviewsScreenshotUrl,
        description: 'Sección de reseñas de Google, con la valoración media y varias opiniones',
      },
    ],
    group: RUBICON_BAKERY_GROUP,
  },
  {
    id: 'rubicon-facturas',
    name: 'Gestión de facturas · Panadería Rubicón',
    shortName: 'Gestión de facturas',
    glyph: 'R/F',
    type: 'Aplicación de escritorio',
    summary: 'Lee, renombra y archiva las facturas recibidas.',
    problem:
      'Clasificar a mano las facturas recibidas: abrir cada una, renombrarla y guardarla en la carpeta de su proveedor y trimestre.',
    contribution:
      'Construí una aplicación de escritorio para macOS y Windows: se arrastran PDF o fotos y la app lee con OCR el proveedor, el número, el mes y el año, renombra cada factura y la archiva en su carpeta. Si falta un dato, pregunta; lo que no puede procesar va a revisión manual y nunca sobrescribe nada. Todo se ejecuta en local: ninguna factura sale del equipo.',
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
    screenshots: [
      {
        imageUrl: invoicesCompleteDataScreenshotUrl,
        description:
          'La aplicación pide completar los datos que no pudo leer de una factura, con el documento al lado',
      },
      {
        imageUrl: invoicesBatchQueueScreenshotUrl,
        description: 'Zona para arrastrar facturas y lista de las cuatro que se van a procesar',
      },
      {
        imageUrl: invoicesBatchFinishedScreenshotUrl,
        description:
          'Resumen de una tanda terminada: tres facturas archivadas y una enviada a revisión manual',
      },
    ],
    isPrivate: true,
    group: RUBICON_BAKERY_GROUP,
  },
  {
    id: 'rubicon-catalogo',
    name: 'Gestión de catálogo · Panadería Rubicón',
    shortName: 'Gestión de catálogo',
    glyph: 'R/C',
    type: 'SPA',
    summary: 'Panel para gestionar todo lo que muestra la web.',
    problem:
      'Cambiar un precio, el horario o un aviso de la web no puede depender de pedírselo a un desarrollador.',
    contribution:
      'Construí el panel desde el que la panadería gestiona su web sin tocar código: productos y categorías (alta, edición, orden y visibilidad), portada, franja de aviso con fecha de retirada, horario, equipo, reseñas y contacto. Los cambios se publican al instante.',
    technologies: ['React', 'TypeScript', 'Vite', 'Zustand', 'CSS Modules'],
    links: [],
    isPrivate: true,
    screenshots: [
      {
        imageUrl: catalogueProductsScreenshotUrl,
        description:
          'Listado de productos del panel, con pestañas por categoría, buscador e interruptor de visibilidad',
      },
      {
        imageUrl: catalogueCategoriesScreenshotUrl,
        description: 'Gestión de categorías: orden, visibilidad y alta de una categoría nueva',
      },
      {
        imageUrl: catalogueNoticeBannerScreenshotUrl,
        description:
          'Edición de la franja de aviso de la web, con vista previa y fecha de retirada automática',
      },
    ],
    group: RUBICON_BAKERY_GROUP,
  },
  {
    id: 'hackspain-26',
    name: "STACKSPECT · HackSpain '26",
    shortName: 'STACKSPECT',
    glyph: 'HS26',
    type: 'Hackatón · 36 h',
    summary: 'Paletizado robótico medido episodio a episodio, para THEKER Robotics.',
    problem:
      "Reto de THEKER Robotics en HackSpain '26: que un brazo robótico apile paquetes en un palé sin que se derrumbe y demostrar con datos cuánto mejora la solución.",
    contribution:
      'En equipo construimos una celda simulada en la que un brazo UR10e paletiza cajas vigilando el centro de gravedad, y una plataforma de observabilidad que mide cada episodio: estabilidad, tiempo de ciclo, utilización y eventos, en directo y comparando ejecuciones entre commits. Yo trabajé en la plataforma web.',
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
    screenshots: [
      {
        imageUrl: hackspainEpisodeDashboardScreenshotUrl,
        description:
          'Panel de un episodio de paletizado: vista cenital y alzado del palé, indicadores y registro de eventos',
      },
      {
        imageUrl: hackspainSimulationCellScreenshotUrl,
        description: 'Celda simulada: un brazo robótico pasa cajas de un contenedor a un palé',
      },
      {
        imageUrl: hackspainControlPanelScreenshotUrl,
        description:
          'Panel de ejecución de la simulación, con la lista de experimentos y los controles de velocidad',
      },
    ],
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
