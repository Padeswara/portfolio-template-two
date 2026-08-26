export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  expReward: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_coin',
    title: 'COIN COLLECTOR',
    description: 'Inserted your first arcade coin or collected loot!',
    icon: '🪙',
    expReward: 100,
  },
  {
    id: 'theme_hopper',
    title: 'DIMENSION JUMPER',
    description: 'Switched between retro visual themes!',
    icon: '🕹️',
    expReward: 150,
  },
  {
    id: 'crt_toggle',
    title: 'RETRO PURIST',
    description: 'Toggled CRT scanlines monitor mode!',
    icon: '📺',
    expReward: 100,
  },
  {
    id: 'sound_enthusiast',
    title: 'CHIPTUNE MAESTRO',
    description: 'Turned on the retro 8-bit BGM synthesizer!',
    icon: '🎵',
    expReward: 200,
  },
  {
    id: 'skill_master',
    title: 'SPELLBOOK MASTER',
    description: 'Explored multiple ability spells in the Skill Tree!',
    icon: '📜',
    expReward: 150,
  },
  {
    id: 'project_inspector',
    title: 'LOOT HUNTER',
    description: 'Inspected a project quest cartridge in detail!',
    icon: '💎',
    expReward: 200,
  },
  {
    id: 'arcade_player',
    title: 'BUG BUSTER',
    description: 'Fought against code bugs in the Arcade Mini-Game!',
    icon: '👾',
    expReward: 300,
  },
  {
    id: 'arcade_champion',
    title: 'ARCADE LEGEND',
    description: 'Scored over 500 points in Bug Smasher arcade!',
    icon: '🏆',
    expReward: 500,
  },
  {
    id: 'konami_warrior',
    title: '30 LIVES GOD MODE',
    description: 'Successfully entered the legendary Konami Code!',
    icon: '⚡',
    expReward: 999,
  },
  {
    id: 'quest_contact',
    title: 'GUILD TRANSMITTER',
    description: 'Prepared a quest proposal or contact message!',
    icon: '✉️',
    expReward: 250,
  },
];

