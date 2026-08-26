export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rewardExp: number;
  rewardCoins: number;
  unlockedAt?: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_coin',
    title: 'First Golden Harvest',
    description: 'Harvested your very first Gold (G) coin on the farm.',
    icon: '🪙',
    rewardExp: 50,
    rewardCoins: 1,
  },
  {
    id: 'konami_god_mode',
    title: 'Harvest Goddess Whisperer',
    description: 'Entered the secret ancient code (↑ ↑ ↓ ↓ ← → ← → B A) for infinite stamina blessing!',
    icon: '🌻',
    rewardExp: 500,
    rewardCoins: 10,
  },
  {
    id: 'theme_changer',
    title: 'Four Seasons Master',
    description: 'Switched the farm season between Spring, Autumn, Winter, and Night.',
    icon: '🍂',
    rewardExp: 75,
    rewardCoins: 2,
  },
  {
    id: 'sound_toggle',
    title: 'Pastoral Bard',
    description: 'Listened to the village chiptune acoustic BGM or sound effects.',
    icon: '🎵',
    rewardExp: 50,
    rewardCoins: 1,
  },
  {
    id: 'skill_master',
    title: 'Seed & Crop Botanist',
    description: 'Inspected multiple frontend crop abilities in the seed almanac.',
    icon: '🌱',
    rewardExp: 100,
    rewardCoins: 3,
  },
  {
    id: 'project_inspector',
    title: 'Blueprint Connoisseur',
    description: 'Inspected a shipped project blueprint from the farm catalog.',
    icon: '📦',
    rewardExp: 100,
    rewardCoins: 3,
  },
  {
    id: 'arcade_player',
    title: 'Greenhorn Farm Defender',
    description: 'Started a round of Harvest Valley Defender mini-game.',
    icon: '🚜',
    rewardExp: 150,
    rewardCoins: 4,
  },
  {
    id: 'arcade_champion',
    title: 'Master Farm Defender',
    description: 'Scored 500+ Gold points defending the farm from pests in a single run.',
    icon: '👑',
    rewardExp: 300,
    rewardCoins: 8,
  },
  {
    id: 'quest_contact',
    title: 'Town Letter Sent',
    description: 'Dispatched a carrier letter via the town mailbox.',
    icon: '📮',
    rewardExp: 250,
    rewardCoins: 5,
  },
  {
    id: 'level_up',
    title: 'Village Artisan Tier',
    description: 'Reached Farm Level 2 by harvesting EXP across the portfolio.',
    icon: '⭐',
    rewardExp: 200,
    rewardCoins: 5,
  },
];
