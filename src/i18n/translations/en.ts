import type { ProjectText, ProjectTextKey } from '@/content/projects';

import type { Translation } from './es';

const projectTexts: Record<ProjectTextKey, ProjectText> = {
  requify: {
    name: 'RequiFy',
    shortName: 'RequiFy',
    type: 'Chrome extension + SPA',
    summary: "HTTP request mocking so the frontend doesn't depend on the backend.",
    problem: "The frontend gets blocked every time a backend endpoint isn't ready or fails.",
    contribution:
      'I built a Chrome extension (Manifest V3) that intercepts the HTTP requests of any website and returns mocked responses, and a control-panel SPA to manage the rules in collections: method and URL pattern, status code, delay, headers and body, with import and export. It needs no backend: everything is stored in the browser.',
    outcome:
      "I defended it as my master's thesis with Honours (10/10). The code is open source on GitHub.",
    awardBadge: "Master's thesis · Honours",
    screenshotDescriptions: [
      'RequiFy control panel, with the rule collections and the editor of a mocked response',
      'RequiFy popup with an active rule that changes the items and prices of a shopping cart',
      'RequiFy form to create a new rule',
    ],
  },
  rubiconWeb: {
    name: 'Rubicón Bakery website',
    shortName: 'Corporate website',
    type: 'Corporate website',
    summary: "The bakery's website: catalogue, reviews and opening hours.",
    problem:
      'The bakery had no site of its own to show its products, its opening hours and how to get there.',
    contribution:
      "I built the bakery's website: a product catalogue by category with a detail sheet and ingredients, Google reviews, opening hours that show whether it is open right now, occasional notices and directions.",
    outcome:
      'It is live at panaderiarubicon.es and the bakery keeps its content up to date from its own panel.',
    screenshotDescriptions: [
      "Home page of the Rubicón Bakery website, with the logo, today's opening hours and a photo of the counter",
      'Detail sheet of a bread open over the catalogue, with price and ingredients',
      'Google reviews section, with the average rating and several reviews',
    ],
  },
  rubiconInvoices: {
    name: 'Invoice management · Rubicón Bakery',
    shortName: 'Invoice management',
    type: 'Desktop application',
    summary: 'Reads, renames and files incoming invoices.',
    problem:
      'Sorting incoming invoices by hand: opening each one, renaming it and saving it in the folder for its supplier and quarter.',
    contribution:
      'I built a desktop application for macOS and Windows: you drag in PDFs or photos and the app reads the supplier, number, month and year with OCR, renames each invoice and files it in its folder. If a piece of data is missing, it asks; whatever it cannot process goes to manual review and it never overwrites anything. Everything runs locally: no invoice leaves the computer.',
    outcome:
      'Manual sorting is gone: invoices are dragged in and come out renamed and filed, without any document leaving the computer.',
    screenshotDescriptions: [
      'The application asks to complete the data it could not read from an invoice, with the document alongside',
      'Area to drag invoices in and the list of the four about to be processed',
      'Summary of a finished batch: three invoices filed and one sent to manual review',
    ],
  },
  rubiconCatalogue: {
    name: 'Catalogue management · Rubicón Bakery',
    shortName: 'Catalogue management',
    type: 'SPA',
    summary: 'Panel to manage everything the website shows.',
    problem:
      "Changing a price, the opening hours or a notice on the website shouldn't depend on asking a developer.",
    contribution:
      'I built the panel the bakery uses to manage its website without touching code: products and categories (creation, editing, order and visibility), home page, notice banner with a removal date, opening hours, team, reviews and contact.',
    outcome:
      'The bakery changes prices, opening hours and notices on its own, without asking a developer, and changes are published instantly.',
    screenshotDescriptions: [
      'Product list of the panel, with a tab per category, a search box and a visibility switch',
      'Category management: order, visibility and adding a new category',
      "Editing the website's notice banner, with a preview and an automatic removal date",
    ],
  },
  hackspain: {
    name: "STACKSPECT · HackSpain '26",
    shortName: 'STACKSPECT',
    type: 'Hackathon · 36 h',
    summary: 'Robotic palletising measured episode by episode, for THEKER Robotics.',
    problem:
      "THEKER Robotics challenge at HackSpain '26: get a robotic arm to stack packages on a pallet without it collapsing, and prove with data how much the solution improves.",
    contribution:
      'As a team we built a simulated cell in which a UR10e arm palletises boxes while watching the centre of gravity, and an observability platform that measures every episode: stability, cycle time, utilisation and events, live and comparing runs between commits. I worked on the web platform.',
    outcome: "1st prize in the THEKER Robotics challenge at HackSpain '26.",
    awardBadge: '1st prize',
    screenshotDescriptions: [
      'Dashboard of a palletising episode: top view and elevation of the pallet, indicators and event log',
      'Simulated cell: a robotic arm moves boxes from a container to a pallet',
      'Simulation run panel, with the list of experiments and the speed controls',
    ],
  },
  hackudc: {
    name: "Chatbot for Denodo · HackUDC '25",
    shortName: 'Chatbot for Denodo',
    type: 'Hackathon · 36 h',
    summary: 'Chat to query databases in natural language, Denodo challenge.',
    problem:
      "Denodo challenge at HackUDC '25: query an organisation's data by asking in natural language, without writing queries.",
    contribution:
      "As a team we built a web chat that sends the questions to Denodo's AI SDK and shows the answer with formatting and tables, with conversation history, plus scripts that use Gemini to describe the source data and generate its views in Denodo. I was in charge of the frontend.",
    outcome: "1st prize in the Denodo challenge at HackUDC '25.",
    awardBadge: '1st prize',
    screenshotDescriptions: [
      'Chat conversation: asked which databases are available, it answers with the list of tables and their relationships',
      'Screen of a new chat, with the box to type the question',
    ],
  },
};

export const englishTranslation: Translation = {
  document: {
    title: 'Ander Varela — Frontend Developer',
    description:
      "Ander Varela, Frontend Developer in A Coruña. I build interfaces that don't break as the project grows.",
  },
  sections: {
    home: 'Home',
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
    background: 'Education & awards',
    contact: 'Contact',
  },
  hero: {
    greeting: "Hi, I'm",
    role: 'Frontend Developer',
    tagline: "I build interfaces that don't break as the project grows.",
    location: 'A Coruña · hybrid / remote',
    seeProjects: 'See projects',
    scrollHint: 'Scroll',
  },
  rail: {
    city: 'A Coruña',
    workMode: 'hybrid / remote',
  },
  about: {
    summary:
      "I'm a frontend developer with a full-stack mindset. I work to keep code predictable: well-typed components, state under control and a repository nothing broken gets into. I agree contracts with the backend before building, I ship to real clients and I use AI every day to move faster without lowering the bar.",
    highlights: {
      currentRole: 'Frontend Developer since 2025',
      clientProducts: 'products shipped to a client: website, admin panel and desktop app',
      hackathonWins: "at HackSpain '26 and HackUDC '25, as a team",
    },
    spokenLanguagesLabel: 'Languages',
    spokenLanguagesSummary: 'Spanish and Galician (native), technical English.',
  },
  experience: {
    position: 'Frontend Developer · Kelea',
    placeAndPeriod: 'A Coruña · May 2025 – present',
    milestones: {
      uiComponents:
        'I defined the UI component foundation with React and strict TypeScript, so every new screen starts from tested pieces. Result: fewer bugs and fewer QA hours.',
      globalState:
        'I designed global state with Zustand: each view subscribes only to what it uses, with no unnecessary re-renders or out-of-sync data.',
      repositoryQuality:
        'I set the rules that keep anything broken out of the repository: commits checked with Husky and Commitlint, and end-to-end tests with Playwright.',
      apiContracts:
        'I agree API contracts with the backend before building, so front and back move in parallel without blocking each other.',
    },
  },
  achievements: {
    title: 'Awards & certifications',
    seeProject: 'See project',
    firstPlaceFigure: '1st',
    hackspainDetail: '1st prize · THEKER Robotics · 36 h',
    hackudcDetail: '1st prize · Denodo challenge · 36 h',
  },
  education: {
    title: 'Education',
    mastersTitle: "Master's Degree in Computer Engineering",
    mastersInstitution: 'Universidade da Coruña',
    mastersDistinction: "Master's thesis with Honours",
    bachelorsTitle: "Bachelor's Degree in Computer Engineering",
    bachelorsInstitution: 'Specialisation in Software Engineering · Universidade da Coruña',
  },
  skills: {
    frontend: 'Frontend',
    testingAndQuality: 'Testing & quality',
    appliedArtificialIntelligence: 'Applied AI',
    fullStack: 'Full-stack',
    principlesTitle: 'How I work',
    principles: {
      strictTyping: {
        title: 'Strict typing',
        description:
          'TypeScript without shortcuts: errors show up at compile time, not in production.',
      },
      accessibility: {
        title: 'Accessible from the start',
        description: 'Keyboard, visible focus and screen readers from the first component.',
      },
      performance: {
        title: 'Measured performance',
        description:
          "Optimised images, animations that don't block and state that doesn't over-render.",
      },
      testing: {
        title: 'Tests where they matter',
        description: "Unit tests on the logic and end-to-end tests on the flows that can't fail.",
      },
    },
  },
  technologies: {
    restApis: 'REST APIs',
    contracts: 'Contracts',
    agentsAndSkills: 'Agents and skills',
  },
  avatarPoses: {
    home: 'Waves and smiles',
    contact: 'Waves goodbye',
  },
  projects: {
    countLabel: 'projects',
    screenshotPending: 'screenshot pending',
    privateProject: 'Private project',
    groups: {
      rubiconBakery: 'Rubicón Bakery',
    },
    items: projectTexts,
  },
  projectDetail: {
    problem: 'The problem',
    contribution: 'What I did',
    outcome: 'The result',
    stack: 'Stack',
    gallery: 'Screenshots',
    mainScreenshot: 'Main screenshot',
    screenshot: 'Screenshot',
    privateNote: 'Private project: shown as a case study, with no external links.',
    linkPending: 'link pending',
    links: {
      web: 'View site',
      code: 'View code',
      demo: 'View demo',
    },
  },
  contact: {
    title: 'Shall we talk?',
    subtitle: "If you have a project or a role where I'd fit, write to me.",
    email: 'Email',
    sourceCode: 'Source of this site',
  },
  curriculum: {
    download: 'Download CV',
    filePending: 'file pending',
  },
  theme: {
    switchToLight: 'Light theme',
    switchToDark: 'Dark theme',
  },
  actions: {
    menu: 'Menu',
    close: 'Close',
    previous: 'Previous',
    next: 'Next',
    copy: 'Copy',
    copied: 'Copied',
  },
  accessibility: {
    skipToContent: 'Skip to content',
    skipToSection: 'Skip to',
    backToTop: 'Back to top',
    sectionsNavigation: 'Sections',
    languageSelector: 'Language',
    avatarDescription: 'Avatar of Ander, decorative illustration',
    opensInNewTab: 'opens in a new tab',
    copyEmail: 'Copy email',
    emailCopied: 'Email copied',
    projectDetailContent: 'Project detail',
  },
};
