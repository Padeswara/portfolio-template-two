export interface StageInfo {
  id: string;
  stageNum: string;
  title: string;
  icon: string;
}

export const STAGES: StageInfo[] = [
  { id: 'hero', stageNum: 'STAGE 00', title: 'FARM TITLE', icon: '🏡' },
  { id: 'about', stageNum: 'STAGE 01', title: 'FARMER STATS & TOOLS', icon: '🧑‍🌾' },
  { id: 'skills', stageNum: 'STAGE 02', title: 'SEED & CROP SKILLS', icon: '🌱' },
  { id: 'projects', stageNum: 'STAGE 03', title: 'SHIPPED PRODUCE', icon: '📦' },
  { id: 'minigame', stageNum: 'STAGE 04', title: 'HARVEST MINI-GAME', icon: '🚜' },
  { id: 'experience', stageNum: 'STAGE 05', title: 'TOWN LOGS', icon: '📜' },
  { id: 'contact', stageNum: 'STAGE 06', title: 'TOWN MAILBOX', icon: '📮' },
];
