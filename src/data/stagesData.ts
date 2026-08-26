export interface StageInfo {
  id: string;
  stageNum: string;
  title: string;
  icon: string;
}

export const STAGES: StageInfo[] = [
  { id: 'hero', stageNum: 'STAGE 00', title: 'TITLE SCREEN', icon: '👾' },
  { id: 'about', stageNum: 'STAGE 01', title: 'CHARACTER STATS', icon: '👤' },
  { id: 'skills', stageNum: 'STAGE 02', title: 'SPELLBOOK', icon: '⚡' },
  { id: 'projects', stageNum: 'STAGE 03', title: 'STAGE SELECT', icon: '💎' },
  { id: 'minigame', stageNum: 'STAGE 04', title: 'ARCADE ROOM', icon: '🎮' },
  { id: 'experience', stageNum: 'STAGE 05', title: 'QUEST LOGS', icon: '📜' },
  { id: 'contact', stageNum: 'STAGE 06', title: 'SAVE POINT', icon: '💾' },
];

