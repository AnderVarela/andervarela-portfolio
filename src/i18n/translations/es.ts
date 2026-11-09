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
      'Construí una extensión de Chrome (Manifest V3) que intercepta las peticiones HTTP de cualquier web y devuelve respuestas simuladas, y una SPA de panel de control para gestionar las reglas por colecciones: método y patrón de URL, código de estado, retardo, cabeceras y cuerpo, con importación y exportación. No necesita backend: todo se guarda en el navegador.',
    outcome:
      'Lo defendí como TFM con Matrícula de Honor (10). El código es abierto y está en GitHub.',
    awardBadge: 'TFM · Matrícula de Honor',
    screenshotDescriptions: [
      'Panel de control de RequiFy, con las colecciones de reglas y el editor de una respuesta simulada',
      'Popup de RequiFy con una regla activa que cambia los artículos y precios de una cesta de la compra',
      'Formulario de RequiFy para crear una regla nueva',
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
    outcome:
      'Está en producción en panaderiarubicon.es y la panadería mantiene su contenido desde su propio panel.',
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
    outcome:
      'Se acaba la clasificación a mano: se arrastran las facturas y quedan renombradas y archivadas, sin que ningún documento salga del equipo.',
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
      'Construí el panel desde el que la panadería gestiona su web sin tocar código: productos y categorías (alta, edición, orden y visibilidad), portada, franja de aviso con fecha de retirada, horario, equipo, reseñas y contacto.',
    outcome:
      'La panadería cambia precios, horario y avisos por su cuenta, sin pedírselo a un desarrollador, y los cambios se publican al instante.',
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
    outcome: "1.er premio del reto de THEKER Robotics en HackSpain '26.",
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
    outcome: "1.er premio del reto de Denodo en HackUDC '25.",
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
    skills: 'Skills',
    background: 'Formación y logros',
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
      'Soy desarrollador frontend con visión full-stack. Trabajo para que el código sea predecible: componentes bien tipados, estado bajo control y un repositorio en el que no entra nada roto. Acuerdo los contratos con backend antes de implementar, entrego a clientes reales y uso la IA a diario para ir más rápido sin bajar el listón.',
    highlights: {
      currentRole: 'Frontend Developer desde 2025',
      clientProducts:
        'productos entregados a un cliente: web, panel de gestión y app de escritorio',
      hackathonWins: "en HackSpain '26 y HackUDC '25, en equipo",
    },
    spokenLanguagesLabel: 'Idiomas',
    spokenLanguagesSummary: 'Español y gallego (nativos), inglés técnico.',
  },
  experience: {
    position: 'Frontend Developer · Kelea',
    placeAndPeriod: 'A Coruña · may. 2025 – actualidad',
    milestones: {
      uiComponents:
        'Definí la base de componentes de UI con React y TypeScript estricto, para que cada pantalla nueva parta de piezas ya probadas. Resultado: menos bugs y menos horas de QA.',
      globalState:
        'Diseñé el estado global con Zustand: cada vista se suscribe solo a lo que usa, sin re-renderizados innecesarios ni datos desincronizados.',
      repositoryQuality:
        'Puse las reglas para que no entre nada roto en el repositorio: commits validados con Husky y Commitlint, y tests end-to-end con Playwright.',
      apiContracts:
        'Acuerdo con backend los contratos de las APIs antes de implementar, para que front y back avancen en paralelo sin bloquearse.',
    },
  },
  achievements: {
    title: 'Premios y certificaciones',
    seeProject: 'Ver proyecto',
    firstPlaceFigure: '1.º',
    hackspainDetail: '1.er premio · THEKER Robotics · 36 h',
    hackudcDetail: '1.er premio · reto de Denodo · 36 h',
  },
  education: {
    title: 'Formación',
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
    principlesTitle: 'Cómo trabajo',
    principles: {
      strictTyping: {
        title: 'Tipado estricto',
        description: 'TypeScript sin atajos: los errores salen al compilar, no en producción.',
      },
      accessibility: {
        title: 'Accesible desde el inicio',
        description: 'Teclado, foco visible y lectores de pantalla desde el primer componente.',
      },
      performance: {
        title: 'Rendimiento medido',
        description:
          'Imágenes optimizadas, animaciones que no bloquean y estado que no re-renderiza de más.',
      },
      testing: {
        title: 'Tests donde importan',
        description: 'Unitarios en la lógica y end-to-end en los flujos que no pueden fallar.',
      },
    },
  },
  technologies: {
    restApis: 'APIs REST',
    contracts: 'Contratos',
    agentsAndSkills: 'Agentes y skills',
  },
  avatarPoses: {
    home: 'Saluda con la mano y sonríe',
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
    outcome: 'El resultado',
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
