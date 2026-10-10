import type { ProjectText, ProjectTextKey } from '@/content/projects';

const projectTexts: Record<ProjectTextKey, ProjectText> = {
  requify: {
    name: 'RequiFy',
    shortName: 'RequiFy',
    type: 'Extensión de Chrome + SPA',
    summary: 'Mocking de peticiones HTTP para no depender del backend.',
    problem:
      'El frontend se queda bloqueado cada vez que un endpoint del backend no está listo o falla.',
    contribution:
      'Construí una extensión de Chrome (Manifest V3) que intercepta las peticiones HTTP de cualquier web y devuelve respuestas simuladas, y una SPA de panel de control para gestionar las reglas por colecciones: método y patrón de URL, código de estado, retardo, cabeceras y cuerpo, con importación y exportación. No necesita backend: todo se guarda en el navegador. Fue mi TFM y lo defendí con Matrícula de Honor (10).',
    awardBadge: 'TFM · Matrícula de Honor',
    screenshotDescriptions: [
      'Panel de control de RequiFy, con las colecciones de reglas y el editor de una respuesta simulada',
      'Popup de RequiFy con una regla activa que cambia los artículos y precios de una cesta de la compra',
      'Formulario de RequiFy para crear una regla nueva',
    ],
  },
  portfolio: {
    name: 'Este portfolio',
    shortName: 'Este portfolio',
    type: 'Web',
    summary: 'Avatar ilustrado, capas y scroll animado.',
    problem: 'Un CV en PDF no enseña cómo trabajo en frontend.',
    contribution:
      'Esta web: un avatar ilustrado que guía el recorrido y cambia de pose en cada sección, un sistema de capas con animaciones ligadas al scroll, dos idiomas y tema claro y oscuro.',
    screenshotDescriptions: [
      'Inicio del portfolio, con el avatar saludando junto al titular',
      'Sección de experiencia, con el avatar sentado con el portátil',
      'Sección de skills, con el avatar rodeado de iconos de tecnologías',
    ],
  },
  rubiconWeb: {
    name: 'Web de Panadería Rubicón',
    shortName: 'Web corporativa',
    type: 'Web corporativa',
    summary: 'Web de la panadería: catálogo, reseñas y horario.',
    problem:
      'La panadería no tenía un sitio propio donde enseñar sus productos, su horario y cómo llegar.',
    contribution:
      'Construí la web de la panadería: catálogo de productos por categorías con ficha de detalle e ingredientes, reseñas de Google, horario que indica si está abierta en ese momento, avisos puntuales y cómo llegar.',
    screenshotDescriptions: [
      'Portada de la web de Panadería Rubicón, con el logotipo, el horario de hoy y una foto del mostrador',
      'Ficha de un pan abierta sobre el catálogo, con precio e ingredientes',
      'Sección de reseñas de Google, con la valoración media y varias opiniones',
    ],
  },
  rubiconInvoices: {
    name: 'Gestión de facturas · Panadería Rubicón',
    shortName: 'Gestión de facturas',
    type: 'Aplicación de escritorio',
    summary: 'Lee, renombra y archiva las facturas recibidas.',
    problem:
      'Clasificar a mano las facturas recibidas: abrir cada una, renombrarla y guardarla en la carpeta de su proveedor y trimestre.',
    contribution:
      'Construí una aplicación de escritorio para macOS y Windows: se arrastran PDF o fotos y la app lee con OCR el proveedor, el número, el mes y el año, renombra cada factura y la archiva en su carpeta. Si falta un dato, pregunta; lo que no puede procesar va a revisión manual y nunca sobrescribe nada. Todo se ejecuta en local: ninguna factura sale del equipo.',
    screenshotDescriptions: [
      'La aplicación pide completar los datos que no pudo leer de una factura, con el documento al lado',
      'Zona para arrastrar facturas y lista de las cuatro que se van a procesar',
      'Resumen de una tanda terminada: tres facturas archivadas y una enviada a revisión manual',
    ],
  },
  rubiconCatalogue: {
    name: 'Gestión de catálogo · Panadería Rubicón',
    shortName: 'Gestión de catálogo',
    type: 'SPA',
    summary: 'Panel para gestionar todo lo que muestra la web.',
    problem:
      'Cambiar un precio, el horario o un aviso de la web no puede depender de pedírselo a un desarrollador.',
    contribution:
      'Construí el panel desde el que la panadería gestiona su web sin tocar código: productos y categorías (alta, edición, orden y visibilidad), portada, franja de aviso con fecha de retirada, horario, equipo, reseñas y contacto. Los cambios se publican al instante.',
    screenshotDescriptions: [
      'Listado de productos del panel, con pestañas por categoría, buscador e interruptor de visibilidad',
      'Gestión de categorías: orden, visibilidad y alta de una categoría nueva',
      'Edición de la franja de aviso de la web, con vista previa y fecha de retirada automática',
    ],
  },
  hackspain: {
    name: "STACKSPECT · HackSpain '26",
    shortName: 'STACKSPECT',
    type: 'Hackatón · 36 h',
    summary: 'Paletizado robótico medido episodio a episodio, para THEKER Robotics.',
    problem:
      "Reto de THEKER Robotics en HackSpain '26: que un brazo robótico apile paquetes en un palé sin que se derrumbe y demostrar con datos cuánto mejora la solución.",
    contribution:
      'En equipo construimos una celda simulada en la que un brazo UR10e paletiza cajas vigilando el centro de gravedad, y una plataforma de observabilidad que mide cada episodio: estabilidad, tiempo de ciclo, utilización y eventos, en directo y comparando ejecuciones entre commits. Yo trabajé en la plataforma web.',
    awardBadge: '1.er premio',
    screenshotDescriptions: [
      'Panel de un episodio de paletizado: vista cenital y alzado del palé, indicadores y registro de eventos',
      'Celda simulada: un brazo robótico pasa cajas de un contenedor a un palé',
      'Panel de ejecución de la simulación, con la lista de experimentos y los controles de velocidad',
    ],
  },
  hackudc: {
    name: "Chatbot para Denodo · HackUDC '25",
    shortName: 'Chatbot para Denodo',
    type: 'Hackatón · 36 h',
    summary: 'Chat para consultar bases de datos en lenguaje natural, reto de Denodo.',
    problem:
      "Reto de Denodo en HackUDC '25: consultar los datos de una organización preguntando en lenguaje natural, sin escribir consultas.",
    contribution:
      'En equipo construimos un chat web que envía las preguntas al AI SDK de Denodo y muestra la respuesta con formato y tablas, con historial de conversaciones, y unos scripts que usan Gemini para describir los datos de origen y generar sus vistas en Denodo. Yo me encargué del frontend.',
    awardBadge: '1.er premio',
    screenshotDescriptions: [
      'Conversación del chat: a la pregunta «qué bases de datos tengo» responde con la lista de tablas y sus relaciones',
      'Pantalla de un chat nuevo, con el cuadro para escribir la pregunta',
    ],
  },
};

export const spanishTranslation = {
  document: {
    title: 'Ander Varela — Frontend Developer',
    description:
      'Ander Varela, Frontend Developer en A Coruña. Construyo interfaces que no se rompen cuando el proyecto crece.',
  },
  sections: {
    home: 'Inicio',
    about: 'Sobre mí',
    experience: 'Experiencia',
    projects: 'Proyectos',
    achievements: 'Logros',
    education: 'Estudios',
    skills: 'Skills',
    contact: 'Contacto',
  },
  hero: {
    greeting: 'Hola, soy',
    role: 'Frontend Developer',
    tagline: 'Construyo interfaces que no se rompen cuando el proyecto crece.',
    location: 'A Coruña · híbrido / remoto',
    seeProjects: 'Ver proyectos',
    scrollHint: 'Haz scroll',
  },
  rail: {
    city: 'A Coruña',
    workMode: 'híbrido / remoto',
  },
  about: {
    summary:
      'Soy desarrollador frontend con visión full-stack. Me gusta que el código sea predecible: componentes bien tipados, estado bajo control y un repositorio en el que no entra nada roto. Uso la IA a diario para ir más rápido sin perder calidad.',
    highlights: {
      thesisHonours: 'Matrícula de Honor en el TFM',
      hackathonsWon: 'hackatones ganados',
      cloudCertification: 'Certified Cloud Practitioner',
    },
    spokenLanguagesLabel: 'Idiomas',
    spokenLanguagesSummary: 'Español y gallego (nativos), inglés técnico.',
  },
  experience: {
    position: 'Frontend Developer · Kelea',
    placeAndPeriod: 'A Coruña · may. 2025 – actualidad',
    milestones: {
      uiComponents:
        'Estandaricé los componentes de UI con React y TypeScript estricto: menos bugs y menos horas de QA.',
      globalState:
        'Monté el estado global con Zustand para evitar re-renderizados innecesarios y datos desincronizados.',
      repositoryQuality: 'Protegí el repositorio con Husky, Commitlint y Playwright.',
      apiContracts: 'Hago de puente entre front y back al definir contratos y consumir APIs.',
    },
  },
  achievements: {
    title: 'Hackatones y logros',
    seeProject: 'Ver proyecto',
    firstPlaceFigure: '1.º',
    hackspainDetail: '1.er premio · THEKER Robotics · 36 h',
    hackudcDetail: '1.er premio · reto de Denodo · 36 h',
    thesisHonoursTitle: 'Matrícula de Honor (10)',
    thesisHonoursDetail: 'defensa del TFM',
  },
  education: {
    mastersTitle: 'Máster Universitario en Ingeniería Informática',
    mastersInstitution: 'Universidade da Coruña',
    mastersDistinction: 'TFM con Matrícula de Honor',
    bachelorsTitle: 'Grado en Ingeniería Informática',
    bachelorsInstitution: 'Mención en Ingeniería del Software · Universidade da Coruña',
  },
  skills: {
    frontend: 'Frontend',
    testingAndQuality: 'Testing y calidad',
    appliedArtificialIntelligence: 'IA aplicada',
    fullStack: 'Full-stack',
  },
  technologies: {
    restApis: 'APIs REST',
    contracts: 'Contratos',
    agentsAndSkills: 'Agentes y skills',
    tokenOptimisation: 'Optimización de tokens',
  },
  avatarPoses: {
    home: 'Saluda con la mano y sonríe',
    about: 'Relajado, brazos cruzados',
    experience: 'Con el portátil',
    projects: 'Manos en el bolsillo, mira la tarjeta del cursor',
    achievements: 'Levanta un trofeo',
    education: 'Con birrete',
    skills: 'Brazos arriba, con iconos de tecnologías',
    contact: 'Se despide',
  },
  projects: {
    countLabel: 'proyectos',
    screenshotPending: 'captura pendiente',
    privateProject: 'Proyecto privado',
    groups: {
      rubiconBakery: 'Panadería Rubicón',
    },
    items: projectTexts,
  },
  projectDetail: {
    problem: 'El problema',
    contribution: 'Qué hice',
    stack: 'Stack',
    gallery: 'Capturas',
    mainScreenshot: 'Captura principal',
    screenshot: 'Captura',
    privateNote: 'Proyecto privado: se muestra como caso de estudio, sin enlaces externos.',
    linkPending: 'enlace pendiente',
    links: {
      web: 'Ver web',
      code: 'Ver código',
      demo: 'Ver demo',
    },
  },
  contact: {
    title: '¿Hablamos?',
    subtitle: 'Si tienes un proyecto o un puesto en el que encaje, escríbeme.',
    email: 'Email',
    sourceCode: 'Código de esta web',
  },
  curriculum: {
    download: 'Descargar CV',
    filePending: 'archivo pendiente',
  },
  theme: {
    switchToLight: 'Tema claro',
    switchToDark: 'Tema oscuro',
  },
  actions: {
    menu: 'Menú',
    close: 'Cerrar',
    previous: 'Anterior',
    next: 'Siguiente',
    copy: 'Copiar',
    copied: 'Copiado',
  },
  accessibility: {
    skipToContent: 'Saltar al contenido',
    skipToSection: 'Saltar a',
    backToTop: 'Volver al inicio',
    sectionsNavigation: 'Secciones',
    languageSelector: 'Idioma',
    avatarDescription: 'Avatar de Ander, ilustración decorativa',
    opensInNewTab: 'se abre en una pestaña nueva',
    copyEmail: 'Copiar email',
    emailCopied: 'Email copiado',
    projectDetailContent: 'Detalle del proyecto',
  },
};

export type Translation = typeof spanishTranslation;
