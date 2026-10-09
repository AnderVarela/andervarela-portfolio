export const spanishTranslation = {
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
  achievements: {
    title: 'Hackatones y logros',
    seeProject: 'Ver proyecto',
  },
  projects: {
    countLabel: 'proyectos',
    screenshotPending: 'captura pendiente',
    privateProject: 'Proyecto privado',
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
