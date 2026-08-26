export interface Skill {
  name: string;
  category: 'core' | 'framework' | 'styling' | 'tools';
  level: number; // 1-5
  maxLevel: number;
  mpCost: number;
  icon: string;
  description: string;
  element: 'Lightning' | 'Fire' | 'Arcane' | 'Wind' | 'Holy';
}

export interface Project {
  id: string;
  stageNumber: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  bossName: string;
  bossRank: 'Rank S+' | 'Rank S' | 'Rank A+' | 'Rank A';
  tags: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  keyFeatures: string[];
  lootDrops: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  questRank: string;
  summary: string;
  achievements: string[];
  skillsUsed: string[];
}

export interface Equipment {
  slot: 'Weapon' | 'Shield' | 'Armor' | 'Accessory' | 'Potion';
  name: string;
  icon: string;
  stats: string;
  description: string;
  rarity: 'Legendary' | 'Epic' | 'Mythic' | 'Rare';
}

export const DEVELOPER_INFO = {
  name: 'BIMA PADESWARA',
  handle: '@bimapadeswara',
  classTitle: 'LV. 99 FRONT-END WARRIOR & UI MAGE',
  tagline: 'Crafting pixel-perfect web experiences with modern magic & vintage soul.',
  location: 'Bandung / Remote, Earth',
  availability: 'READY FOR QUESTS (Available for Hire)',
  stats: {
    cleanCode: 98,
    performance: 96,
    uiUxMagic: 99,
    stateArchitecture: 94,
    responsiveDefense: 100,
    caffeineBuff: 100,
  },
  dialogueLines: [
    "Greetings, traveler! Welcome to my digital arcade sanctuary.",
    "I forge responsive, lightning-fast interfaces using React, Tailwind & modern web spells.",
    "Bugs tremble before my clean architecture and typed enchantments.",
    "Check out my quests below or challenge the arcade mini-game!",
  ],
};

export const EQUIPMENT_LOADOUT: Equipment[] = [
  {
    slot: 'Weapon',
    name: 'VS Code of Luminescence +10',
    icon: '⚔️',
    stats: '+99 Productivity, +40 Keystroke Speed',
    description: 'Enchanted text editor loaded with Vim keys, Turbo console, and pixel themes.',
    rarity: 'Legendary',
  },
  {
    slot: 'Shield',
    name: 'Tailwind CSS Aegis',
    icon: '🛡️',
    stats: '+100 Responsive Defense, Zero CSS Bloat',
    description: 'Impenetrable utility-first defense against layout breaks and media query anomalies.',
    rarity: 'Mythic',
  },
  {
    slot: 'Armor',
    name: 'TypeScript Plate of Type-Safety',
    icon: '🥋',
    stats: '+95 Runtime Bug Immunity, Strict Mode Active',
    description: 'Heavy armor preventing null references and unexpected undefined hazards.',
    rarity: 'Epic',
  },
  {
    slot: 'Accessory',
    name: 'React 19 Core Crystal',
    icon: '💎',
    stats: '+85 Component Reusability, Ultra Virtual DOM',
    description: 'Glowing reactive gem that synchronizes state across parallel dimensions.',
    rarity: 'Mythic',
  },
  {
    slot: 'Potion',
    name: 'Double Espresso Mana Elixir',
    icon: '☕',
    stats: '+100 Focus Regeneration, Sleep Delay 8h',
    description: 'Brewed from dark roasted beans to sustain marathon coding raids.',
    rarity: 'Rare',
  },
];

export const SKILLS_DATA: Skill[] = [
  // Core Sorcery
  {
    name: 'TypeScript',
    category: 'core',
    level: 5,
    maxLevel: 5,
    mpCost: 25,
    icon: '📘',
    element: 'Arcane',
    description: 'Strict typing enchantment that eliminates runtime chaos and guarantees deterministic builds.',
  },
  {
    name: 'JavaScript (ESNext)',
    category: 'core',
    level: 5,
    maxLevel: 5,
    mpCost: 15,
    icon: '⚡',
    element: 'Lightning',
    description: 'Mastery over asynchronous magic, closures, event loops, and web worker parallel realms.',
  },
  {
    name: 'HTML5 & Semantic Web',
    category: 'core',
    level: 5,
    maxLevel: 5,
    mpCost: 10,
    icon: '🧱',
    element: 'Holy',
    description: 'Rock-solid accessible foundation (a11y), SEO architecture, and semantic landmarks.',
  },
  {
    name: 'CSS3 / Modern Layouts',
    category: 'core',
    level: 5,
    maxLevel: 5,
    mpCost: 20,
    icon: '🎨',
    element: 'Wind',
    description: 'Subgrid, CSS Grid, Flexbox, Container Queries, and complex fluid layout bending.',
  },

  // Framework Realms
  {
    name: 'React 19 / Hooks',
    category: 'framework',
    level: 5,
    maxLevel: 5,
    mpCost: 35,
    icon: '⚛️',
    element: 'Arcane',
    description: 'Component alchemy, custom hook runes, server components, and concurrent rendering.',
  },
  {
    name: 'Next.js 15 (App Router)',
    category: 'framework',
    level: 5,
    maxLevel: 5,
    mpCost: 40,
    icon: '▲',
    element: 'Holy',
    description: 'SSR, SSG, streaming architecture, Server Actions, and blazing SEO delivery.',
  },
  {
    name: 'Vue.js / Nuxt',
    category: 'framework',
    level: 4,
    maxLevel: 5,
    mpCost: 30,
    icon: '🟢',
    element: 'Wind',
    description: 'Composition API, reactive refs, Pinia state store, and fast lightweight rendering.',
  },
  {
    name: 'State Mastery (Zustand/Redux)',
    category: 'framework',
    level: 5,
    maxLevel: 5,
    mpCost: 30,
    icon: '🔄',
    element: 'Arcane',
    description: 'Zero-boilerplate global states, middleware persistence, and TanStack query caching.',
  },

  // Styling & Visual Magic
  {
    name: 'Tailwind CSS v4',
    category: 'styling',
    level: 5,
    maxLevel: 5,
    mpCost: 15,
    icon: '🌊',
    element: 'Wind',
    description: 'High-velocity atomic styling, bespoke design systems, and rapid responsive engineering.',
  },
  {
    name: 'Framer Motion & Animations',
    category: 'styling',
    level: 5,
    maxLevel: 5,
    mpCost: 30,
    icon: '✨',
    element: 'Fire',
    description: 'Choreographed spring physics, layout transitions, gesture controls, and micro-interactions.',
  },
  {
    name: 'Canvas API & WebGL',
    category: 'styling',
    level: 4,
    maxLevel: 5,
    mpCost: 45,
    icon: '🎮',
    element: 'Lightning',
    description: '2D pixel render loops, particle vortexes, sprite sheets, and retro shaders.',
  },
  {
    name: 'Responsive & Mobile First',
    category: 'styling',
    level: 5,
    maxLevel: 5,
    mpCost: 10,
    icon: '📱',
    element: 'Holy',
    description: 'Seamless adaptive layouts crafted from tiny smartwatch screens to ultrawide battle stations.',
  },

  // Tooling & Runes
  {
    name: 'Vite & Build Tooling',
    category: 'tools',
    level: 5,
    maxLevel: 5,
    mpCost: 20,
    icon: '⚡',
    element: 'Lightning',
    description: 'Instant HMR, rollup optimizations, chunk splitting, and modern bundler tuning.',
  },
  {
    name: 'Git & Version Control',
    category: 'tools',
    level: 5,
    maxLevel: 5,
    mpCost: 15,
    icon: '🌿',
    element: 'Arcane',
    description: 'Clean commit histories, complex rebasing, branch strategies, and GitHub workflows.',
  },
  {
    name: 'Testing (Vitest / Playwright)',
    category: 'tools',
    level: 4,
    maxLevel: 5,
    mpCost: 35,
    icon: '🧪',
    element: 'Holy',
    description: 'Unit testing, component mocking, visual regression, and end-to-end user journeys.',
  },
  {
    name: 'Figma to Pixel-Perfect Code',
    category: 'tools',
    level: 5,
    maxLevel: 5,
    mpCost: 20,
    icon: '📐',
    element: 'Fire',
    description: 'Translating design tokens, vector paths, and design systems into pristine components.',
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'stage-1',
    stageNumber: 'STAGE 01',
    title: 'CYBER-NEXUS STORE',
    subtitle: 'High-Performance E-Commerce & Gear Forge',
    description: 'A lightning-fast cyber-themed storefront featuring real-time inventory, Stripe checkout, 3D product previews, and instant search.',
    longDescription: 'Engineered from scratch using Next.js 15 App Router and Tailwind CSS. Implements optimistic UI updates, server-side caching strategies for sub-50ms TTFB, and an interactive 3D model viewer for cyber apparel.',
    bossName: 'THE CART ABANDONER',
    bossRank: 'Rank S+',
    tags: ['Next.js 15', 'Tailwind CSS', 'Stripe API', 'Zustand', 'TypeScript'],
    image: '🛒',
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    keyFeatures: [
      'Sub-50ms page transitions with Next.js streaming',
      'Full Stripe Checkout & Webhook synchronization',
      'Persistent cart with optimistic offline updates',
      'Accessible keyboard navigation & screen-reader certified',
    ],
    lootDrops: ['+5000 EXP', 'Rare Next.js Artifact', 'Stripe Shield'],
  },
  {
    id: 'stage-2',
    stageNumber: 'STAGE 02',
    title: 'RETRO OS & CLOUD TERMINAL',
    subtitle: 'Browser-Based Nostalgic Desktop Environment',
    description: 'A multi-window operating system simulator in the browser with draggable retro windows, file manager, text editor, and chiptune player.',
    longDescription: 'Built with React and custom window management state. Includes a fully functional virtual filesystem, syntax-highlighted code runner, and an interactive terminal that accepts Linux-like bash commands.',
    bossName: 'MEMORY LEAK SPECTER',
    bossRank: 'Rank S',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Web Audio'],
    image: '💻',
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    keyFeatures: [
      'Draggable, resizable retro windows with z-index stacking',
      'Virtual bash terminal with 15+ interactive commands',
      '8-bit chiptune synthesizer with waveform visualizer',
      'Zero-dependency virtual filesystem persisted in IndexedDB',
    ],
    lootDrops: ['+4500 EXP', 'Arcade OS Rune', 'Sound Synthesizer Key'],
  },
  {
    id: 'stage-3',
    stageNumber: 'STAGE 03',
    title: 'NEO-METRICS ANALYTICS',
    subtitle: 'Cyberpunk FinTech Data Visualization Hub',
    description: 'Real-time telemetry dashboard visualizing cryptocurrency trends, server health, user retention, and live WebSocket trade tickers.',
    longDescription: 'Designed for traders who demand speed and neon aesthetics. Features high-frequency Canvas-based chart rendering, custom interactive timeframes, and instant CSV telemetry export.',
    bossName: 'DATA OVERLOAD GOLIATH',
    bossRank: 'Rank A+',
    tags: ['React', 'Recharts', 'Tailwind CSS', 'TanStack Query', 'WebSocket'],
    image: '📊',
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    keyFeatures: [
      '60 FPS smooth candlestick & area telemetry graphs',
      'Live WebSocket data stream simulation with auto-reconnect',
      'Custom color grading themes (Neon Matrix / Amber / Cyber)',
      'Exportable reports in PDF & CSV format',
    ],
    lootDrops: ['+4000 EXP', 'Telemetry Crown', 'WebSocket Ring'],
  },
  {
    id: 'stage-4',
    stageNumber: 'STAGE 04',
    title: 'PIXEL ARCADE DUNGEON',
    subtitle: 'Full 2D Canvas Retro Rogue-lite Web Game',
    description: 'An action-packed 2D top-down dungeon crawler coded directly with HTML5 Canvas and React state management.',
    longDescription: 'Features procedural room generation, retro sprite animations, enemy AI pathfinding, boss fight phases, and a global high score leaderboard.',
    bossName: 'NULL POINTER DRAGON',
    bossRank: 'Rank S+',
    tags: ['Canvas API', 'TypeScript', 'Web Audio API', 'React', 'Tailwind'],
    image: '👾',
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    keyFeatures: [
      'Procedural tilemap dungeon generator',
      'A* pathfinding algorithm for hostile mob AI',
      'Procedural 8-bit sound effects & boss music loops',
      'Touch virtual joystick support for smartphones',
    ],
    lootDrops: ['+6000 EXP', 'Master Arcade Cartridge', 'Dragon Slayer Trophy'],
  },
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: 'exp-1',
    role: 'Lead Frontend Adventurer',
    company: 'HYPERPIXEL GUILD',
    period: '2023 - PRESENT',
    location: 'Bandung / Remote',
    questRank: 'RANK S GUILD RAID',
    summary: 'Led the UI architecture modernization, boosting Core Web Vitals score from 68 to 99 and decreasing bundle weight by 45%.',
    achievements: [
      'Spearheaded the migration of legacy multi-repo to modern Next.js 15 & Tailwind design system.',
      'Mentored 6 junior/mid frontend developers in clean TypeScript architecture and a11y standards.',
      'Constructed internal component library used by 12+ production micro-frontends.',
    ],
    skillsUsed: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Turborepo'],
  },
  {
    id: 'exp-2',
    role: 'Senior UI/UX Engineer',
    company: 'CYBERSHIFT LABS',
    period: '2021 - 2023',
    location: 'Jakarta / Hybrid',
    questRank: 'RANK A EXPEDITION',
    summary: 'Crafted high-velocity FinTech dashboards, onboarding funnels, and real-time transaction screens for 500k+ active users.',
    achievements: [
      'Engineered real-time transaction streaming views with 99.98% uptime.',
      'Reduced initial page load time by 60% through code splitting and asset optimization.',
      'Collaborated closely with design team to build pixel-perfect interactive design tokens.',
    ],
    skillsUsed: ['React', 'Zustand', 'Tailwind CSS', 'Framer Motion', 'REST APIs'],
  },
  {
    id: 'exp-3',
    role: 'Frontend Apprentice & UI Alchemist',
    company: 'INDIE VOXEL STUDIOS',
    period: '2019 - 2021',
    location: 'Remote',
    questRank: 'RANK B DUNGEON',
    summary: 'Forged responsive web portals, interactive mini-apps, and promotional landing pages for indie game titles.',
    achievements: [
      'Constructed 15+ award-winning landing pages with 95+ PageSpeed scores.',
      'Built custom Canvas particle effects and Web Audio interactive elements.',
      'Standardized CSS naming conventions and responsive grid systems across the team.',
    ],
    skillsUsed: ['JavaScript', 'HTML5', 'CSS3', 'Vue.js', 'Canvas API'],
  },
];

export const SOCIAL_LINKS = [
  {
    name: 'GITHUB',
    url: 'https://github.com',
    icon: '🐙',
    handle: 'github.com/developer',
    badge: 'Code Vault',
  },
  {
    name: 'LINKEDIN',
    url: 'https://linkedin.com',
    icon: '💼',
    handle: 'linkedin.com/in/developer',
    badge: 'Guild Network',
  },
  {
    name: 'X / TWITTER',
    url: 'https://x.com',
    icon: '🐦',
    handle: '@retrodeveloper',
    badge: 'Broadcast Pigeon',
  },
  {
    name: 'DISCORD',
    url: 'https://discord.com',
    icon: '💬',
    handle: 'pixelmage#1337',
    badge: 'Party Comms',
  },
  {
    name: 'EMAIL',
    url: 'mailto:contact@developer.pixel',
    icon: '✉️',
    handle: 'contact@developer.pixel',
    badge: 'Direct Transmission',
  },
];

