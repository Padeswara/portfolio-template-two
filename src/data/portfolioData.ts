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
  classTitle: 'LV. 99 CODE CULTIVATOR & FRONT-END ARTISAN',
  tagline: 'Planting clean code seeds, nurturing responsive layouts & harvesting delightful digital experiences.',
  location: 'Mineral Valley / Remote, Earth',
  availability: 'READY FOR NEW HARVEST (Available for Hire)',
  stats: {
    cleanCode: 98,
    performance: 96,
    uiUxMagic: 99,
    stateArchitecture: 94,
    responsiveDefense: 100,
    caffeineBuff: 100,
  },
  dialogueLines: [
    "Hello there, traveler! Welcome to my peaceful digital farm sanctuary.",
    "I cultivate responsive, lightning-fast interfaces using React 19, Tailwind CSS & warm craftsmanship.",
    "Every line of code is carefully planted, pruned, and watered for peak performance.",
    "Feel free to inspect my shipped produce or try your hand at the harvest mini-game!",
  ],
};

export const EQUIPMENT_LOADOUT: Equipment[] = [
  {
    slot: 'Weapon',
    name: 'Golden Watering Can of React 19',
    icon: '🌻',
    stats: '+99 Reactive Hydration, Zero Re-render Waste',
    description: 'Enchanted golden watering can that keeps components vibrant and synchronizes UI state across all pastures.',
    rarity: 'Mythic',
  },
  {
    slot: 'Shield',
    name: 'Mystrile Hoe of Tailwind CSS',
    icon: '🌾',
    stats: '+100 Responsive Defense, Zero CSS Tangle',
    description: 'Forged from rare mystrile ore to plow responsive grids with atomic utility precision.',
    rarity: 'Legendary',
  },
  {
    slot: 'Armor',
    name: 'Blessed Overalls of TypeScript',
    icon: '🧑‍🌾',
    stats: '+95 Runtime Bug Immunity, Strict Type Weave',
    description: 'Durable denim overalls protecting against null references and undefined weeds.',
    rarity: 'Epic',
  },
  {
    slot: 'Accessory',
    name: 'Harvest Basket of Vite Tools',
    icon: '🧺',
    stats: '+80 Bundling Velocity, Sub-second HMR',
    description: 'Lightweight woven basket that gathers dependencies and serves hot modules instantly.',
    rarity: 'Legendary',
  },
  {
    slot: 'Potion',
    name: 'Hot Spring Herbal Tea',
    icon: '🍵',
    stats: '+100 Energy Recovery, Restful Calm Buff',
    description: 'Freshly brewed tea leaves from the mountain spring to sustain joyful coding sessions.',
    rarity: 'Rare',
  },
];

export const SKILLS_DATA: Skill[] = [
  // Core Crops
  {
    name: 'TypeScript',
    category: 'core',
    level: 5,
    maxLevel: 5,
    mpCost: 20,
    icon: '📘',
    element: 'Arcane',
    description: 'Strict typing seeds that ensure every component blossoms with predictable, bug-free beauty.',
  },
  {
    name: 'JavaScript (ESNext)',
    category: 'core',
    level: 5,
    maxLevel: 5,
    mpCost: 15,
    icon: '⚡',
    element: 'Lightning',
    description: 'Deep knowledge of async loops, closures, promises, and modern event architectures.',
  },
  {
    name: 'HTML5 & Semantic Web',
    category: 'core',
    level: 5,
    maxLevel: 5,
    mpCost: 10,
    icon: '🪵',
    element: 'Holy',
    description: 'Solid, accessible timber foundation (a11y) welcoming all visitors to the village.',
  },
  {
    name: 'CSS3 / Fluid Layouts',
    category: 'core',
    level: 5,
    maxLevel: 5,
    mpCost: 15,
    icon: '🎨',
    element: 'Wind',
    description: 'Flexbox, CSS Grid, Container Queries, and organic layout arrangements.',
  },

  // Golden Fruits (Frameworks)
  {
    name: 'React 19 / Hooks',
    category: 'framework',
    level: 5,
    maxLevel: 5,
    mpCost: 30,
    icon: '⚛️',
    element: 'Arcane',
    description: 'Crafting reusable component greenhouses with custom hooks and seamless state flows.',
  },
  {
    name: 'Next.js 15 (App Router)',
    category: 'framework',
    level: 5,
    maxLevel: 5,
    mpCost: 35,
    icon: '▲',
    element: 'Holy',
    description: 'Server components, streaming SSR, and SEO produce delivered at record speed.',
  },
  {
    name: 'Vue.js / Nuxt',
    category: 'framework',
    level: 4,
    maxLevel: 5,
    mpCost: 25,
    icon: '🟢',
    element: 'Wind',
    description: 'Clean reactive template syntax, Pinia store barns, and lightweight builds.',
  },
  {
    name: 'State Mastery (Zustand/Redux)',
    category: 'framework',
    level: 5,
    maxLevel: 5,
    mpCost: 25,
    icon: '🔄',
    element: 'Arcane',
    description: 'Zero-boilerplate global silos, persist middleware, and query cache replenishment.',
  },

  // Floristry & Visuals (Styling)
  {
    name: 'Tailwind CSS v4',
    category: 'styling',
    level: 5,
    maxLevel: 5,
    mpCost: 15,
    icon: '🌿',
    element: 'Wind',
    description: 'Rapid design systems, pastel & rustic palette themes, and instant responsive tuning.',
  },
  {
    name: 'Framer Motion & Animations',
    category: 'styling',
    level: 5,
    maxLevel: 5,
    mpCost: 25,
    icon: '✨',
    element: 'Fire',
    description: 'Gentle spring physics, soft floating micro-interactions, and pleasant scene transitions.',
  },
  {
    name: 'Canvas 2D API',
    category: 'styling',
    level: 4,
    maxLevel: 5,
    mpCost: 35,
    icon: '🍓',
    element: 'Lightning',
    description: 'Interactive pixel particle render loops, retro sprite sheets, and mini-games.',
  },
  {
    name: 'Responsive Craftsmanship',
    category: 'styling',
    level: 5,
    maxLevel: 5,
    mpCost: 10,
    icon: '📱',
    element: 'Holy',
    description: 'Adaptive views tailored with care from mobile touchscreens to expansive monitors.',
  },

  // Farm Tools
  {
    name: 'Vite & Modern Tooling',
    category: 'tools',
    level: 5,
    maxLevel: 5,
    mpCost: 15,
    icon: '⚡',
    element: 'Lightning',
    description: 'Lightning-fast dev server startup, optimized bundle trees, and smooth HMR.',
  },
  {
    name: 'Git & Version Control',
    category: 'tools',
    level: 5,
    maxLevel: 5,
    mpCost: 15,
    icon: '🌱',
    element: 'Arcane',
    description: 'Organized commit histories, clean branch grafts, and team collaboration workflows.',
  },
  {
    name: 'Testing (Vitest / Playwright)',
    category: 'tools',
    level: 4,
    maxLevel: 5,
    mpCost: 30,
    icon: '🧪',
    element: 'Holy',
    description: 'Ensuring every component harvest passes quality assurance with flying colors.',
  },
  {
    name: 'Figma to Pixel-Perfect Code',
    category: 'tools',
    level: 5,
    maxLevel: 5,
    mpCost: 20,
    icon: '📐',
    element: 'Fire',
    description: 'Translating design mockups and cozy aesthetics into faithful, living code.',
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'stage-1',
    stageNumber: 'PRODUCE 01',
    title: 'VALLEY HARVEST MARKET',
    subtitle: 'High-Performance E-Commerce & Artisan Shop',
    description: 'A cozy, ultra-fast online marketplace featuring real-time inventory, Stripe checkout, 3D product showcase, and instant search.',
    longDescription: 'Engineered using Next.js 15 App Router and Tailwind CSS. Implements optimistic UI updates, server-side caching strategies for sub-50ms TTFB, and an interactive 3D model viewer for artisan goods.',
    bossName: 'THE CART ABANDONER',
    bossRank: 'Rank S+',
    tags: ['Next.js 15', 'Tailwind CSS', 'Stripe API', 'Zustand', 'TypeScript'],
    image: '🧺',
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    keyFeatures: [
      'Sub-50ms page transitions with Next.js streaming',
      'Full Stripe Checkout & Webhook synchronization',
      'Persistent cart with optimistic offline updates',
      'Accessible keyboard navigation & screen-reader certified',
    ],
    lootDrops: ['+5000 EXP', 'Golden Berry Token', 'Stripe Shield'],
  },
  {
    id: 'stage-2',
    stageNumber: 'PRODUCE 02',
    title: 'RETRO DESKTOP CABIN OS',
    subtitle: 'Browser-Based Cozy Virtual Workspace',
    description: 'A multi-window desktop operating system simulator in the browser with draggable wooden windows, notes app, and chiptune radio.',
    longDescription: 'Built with React and custom window management state. Includes a fully functional virtual filesystem, syntax-highlighted code runner, and an interactive terminal that accepts friendly commands.',
    bossName: 'MEMORY LEAK SPECTER',
    bossRank: 'Rank S',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Web Audio'],
    image: '🪵',
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    keyFeatures: [
      'Draggable, resizable wooden windows with z-index stacking',
      'Virtual cozy terminal with interactive commands',
      'Pastoral chiptune synthesizer with waveform visualizer',
      'Zero-dependency virtual filesystem persisted in IndexedDB',
    ],
    lootDrops: ['+4500 EXP', 'Timber Blueprint', 'Chiptune Melody Key'],
  },
  {
    id: 'stage-3',
    stageNumber: 'PRODUCE 03',
    title: 'PASTURE TELEMETRY HUB',
    subtitle: 'Warm Data Visualization & Farm Analytics',
    description: 'Real-time telemetry dashboard visualizing crop yields, sensor health, soil moisture, and live WebSocket market trends.',
    longDescription: 'Designed for farmers and analysts who value speed and clarity. Features high-frequency Canvas-based chart rendering, custom interactive timeframes, and instant CSV telemetry export.',
    bossName: 'DATA OVERLOAD GOLIATH',
    bossRank: 'Rank A+',
    tags: ['React', 'Recharts', 'Tailwind CSS', 'TanStack Query', 'WebSocket'],
    image: '📊',
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    keyFeatures: [
      '60 FPS smooth candlestick & area telemetry graphs',
      'Live WebSocket data stream simulation with auto-reconnect',
      'Custom color grading themes (Spring, Autumn, Snowy, Night)',
      'Exportable reports in PDF & CSV format',
    ],
    lootDrops: ['+4000 EXP', 'Golden Scythe', 'WebSocket Badge'],
  },
  {
    id: 'stage-4',
    stageNumber: 'PRODUCE 04',
    title: 'HARVEST VALLEY ROGUE',
    subtitle: 'Full 2D Canvas Retro Farming RPG Mini-Game',
    description: 'An action-packed 2D top-down farm defender game coded directly with HTML5 Canvas and React state management.',
    longDescription: 'Features procedural weed generation, retro sprite animations, enemy AI pathfinding, boss fight phases, and a local high score leaderboard.',
    bossName: 'NULL POINTER BEETLE',
    bossRank: 'Rank S+',
    tags: ['Canvas API', 'TypeScript', 'Web Audio API', 'React', 'Tailwind'],
    image: '🍓',
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    keyFeatures: [
      'Procedural harvest tilemap generator',
      'Smooth 60 FPS Canvas render loop',
      'Procedural 8-bit sound effects & village tunes',
      'Touch virtual buttons for smartphone farmers',
    ],
    lootDrops: ['+6000 EXP', 'Master Farmer Cartridge', 'Harvest Crown'],
  },
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: 'exp-1',
    role: 'Lead Frontend Artisan',
    company: 'HYPERPIXEL GUILD',
    period: '2023 - PRESENT',
    location: 'Mineral Valley / Remote',
    questRank: 'RANK S GUILD HARVEST',
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
    role: 'Frontend Apprentice',
    company: 'INDIE VOXEL STUDIOS',
    period: '2019 - 2021',
    location: 'Remote',
    questRank: 'RANK B HARVEST',
    summary: 'Forged responsive web portals, interactive mini-apps, and promotional landing pages for indie games.',
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
    badge: 'Code Barn',
  },
  {
    name: 'LINKEDIN',
    url: 'https://linkedin.com',
    icon: '💼',
    handle: 'linkedin.com/in/developer',
    badge: 'Artisan Guild',
  },
  {
    name: 'X / TWITTER',
    url: 'https://x.com',
    icon: '🐦',
    handle: '@retrodeveloper',
    badge: 'Carrier Pigeon',
  },
  {
    name: 'DISCORD',
    url: 'https://discord.com',
    icon: '💬',
    handle: 'pixelmage#1337',
    badge: 'Town Chat',
  },
  {
    name: 'EMAIL',
    url: 'mailto:contact@developer.pixel',
    icon: '📮',
    handle: 'contact@developer.pixel',
    badge: 'Town Mailbox',
  },
];
