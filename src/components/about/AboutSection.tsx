import React from 'react';
import { PixelCard } from '../ui/PixelCard';
import { PixelButton } from '../ui/PixelButton';
import { EquipmentCard } from './EquipmentCard';
import { DEVELOPER_INFO, EQUIPMENT_LOADOUT } from '../../data/portfolioData';
import { Zap, Sparkles, MapPin, Coffee, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onNavigateStage?: (stageIndex: number) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigateStage }) => {
  const statsList = [
    { label: 'CLEAN CODE & A11Y', value: DEVELOPER_INFO.stats.cleanCode, color: '#00f3ff' },
    { label: 'LIGHTHOUSE SPEED', value: DEVELOPER_INFO.stats.performance, color: '#39ff14' },
    { label: 'UI/UX & ANIMATION MAGIC', value: DEVELOPER_INFO.stats.uiUxMagic, color: '#ff007f' },
    { label: 'STATE & ARCHITECTURE', value: DEVELOPER_INFO.stats.stateArchitecture, color: '#ffe600' },
    { label: 'RESPONSIVE DEFENSE', value: DEVELOPER_INFO.stats.responsiveDefense, color: '#aa00ff' },
    { label: 'CAFFEINE RECHARGE', value: DEVELOPER_INFO.stats.caffeineBuff, color: '#ff6600' },
  ];

  return (
    <section className="h-full overflow-y-auto py-6 sm:py-8 px-4 sm:px-6 select-none max-w-6xl mx-auto w-full">
      <div className="space-y-6">
        {/* Section Header */}
        <div className="text-left space-y-2">
          <div className="inline-block bg-black border-2 border-[#00f3ff] px-3 py-1 font-press-start text-[9px] text-[#00f3ff] shadow-[2px_2px_0_0_#ff007f]">
            STAGE 01 // CHARACTER BIO
          </div>
          <h2 className="font-press-start text-xl sm:text-2xl text-white uppercase drop-shadow-[2px_2px_0_#ff007f]">
            CHARACTER STATS & GEAR
          </h2>
          <p className="font-mono text-xs sm:text-sm text-gray-400 max-w-xl">
            Inspect player attributes, passive traits, and equipped enchanted tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Player Attributes & Lore */}
          <div className="lg:col-span-6 space-y-5">
            <PixelCard
              title="PLAYER ATTRIBUTES"
              badge="LV. 99"
              headerColor="cyan"
              borderColor="cyan"
            >
              <div className="space-y-3.5">
                {statsList.map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-semibold text-gray-200">{stat.label}</span>
                      <span className="font-press-start text-[9px]" style={{ color: stat.color }}>
                        {stat.value}/100
                      </span>
                    </div>
                    {/* Retro Segmented Bar */}
                    <div className="w-full h-3 bg-black border border-white/20 p-0.5 relative flex">
                      <div
                        className="h-full transition-all duration-1000"
                        style={{
                          width: `${stat.value}%`,
                          backgroundColor: stat.color,
                          boxShadow: `0 0 8px ${stat.color}`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </PixelCard>

            {/* Backstory & Guild Status */}
            <PixelCard
              title="QUEST LOG // ORIGIN STORY"
              badge="BIO"
              headerColor="pink"
              borderColor="pink"
            >
              <div className="space-y-3 font-mono text-xs sm:text-sm text-gray-300">
                <p className="leading-relaxed">
                  Greetings! I am a passionate <strong className="text-[#00f3ff]">Front End Developer</strong> dedicated to turning complex problems into elegant, pixel-perfect, and ultra-responsive digital realities.
                </p>
                <p className="leading-relaxed">
                  With deep expertise in modern ecosystems like <span className="text-[#00f3ff]">React 19</span>, <span className="text-[#ff007f]">Tailwind CSS v4</span>, and <span className="text-[#ffe600]">TypeScript</span>, I bridge the gap between creative visual artistry and robust engineering rigor.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10 text-xs font-mono">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <MapPin className="w-3.5 h-3.5 text-[#ff007f] shrink-0" />
                    <span>{DEVELOPER_INFO.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#39ff14]">
                    <Sparkles className="w-3.5 h-3.5 text-[#39ff14] shrink-0 animate-spin" />
                    <span>{DEVELOPER_INFO.availability}</span>
                  </div>
                </div>
              </div>
            </PixelCard>
          </div>

          {/* Right: Equipped Loadout Items */}
          <div className="lg:col-span-6 space-y-5">
            <PixelCard
              title="EQUIPPED LOADOUT // ARTIFACTS"
              badge="5 SLOTS"
              headerColor="yellow"
              borderColor="yellow"
            >
              <p className="font-mono text-xs text-gray-400 mb-3">
                Click any equipped artifact to view detailed stats and enchanted perks:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {EQUIPMENT_LOADOUT.map((item) => (
                  <EquipmentCard key={item.slot} item={item} />
                ))}

                {/* Bonus Slot: Coffee Mana Station */}
                <div className="bg-[#100722] border-2 border-dashed border-[#ffe600]/40 p-2.5 flex flex-col justify-center items-center text-center shadow-[3px_3px_0_0_#000]">
                  <Coffee className="w-6 h-6 text-[#ffe600] animate-bounce mb-1" />
                  <span className="font-press-start text-[8px] text-[#ffe600]">
                    MANA REGEN: 100%
                  </span>
                  <span className="font-mono text-[9px] text-gray-400 mt-0.5">
                    Powered by Espresso
                  </span>
                </div>
              </div>
            </PixelCard>

            {/* Special Perks & Passive Talents */}
            <div className="bg-[#140828] border-2 border-[#39ff14] p-3.5 shadow-[4px_4px_0_0_#000]">
              <div className="font-press-start text-[9px] text-[#39ff14] mb-2.5 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#39ff14]" />
                <span>PASSIVE BUFFS ACTIVE</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
                <div className="bg-black/60 p-2 border border-white/10">
                  <div className="text-[#00f3ff] font-bold">⚡ Zero CLS</div>
                  <div className="text-gray-400 text-[10px]">Sub-pixel layout stability</div>
                </div>
                <div className="bg-black/60 p-2 border border-white/10">
                  <div className="text-[#ff007f] font-bold">🛡️ Type Safe</div>
                  <div className="text-gray-400 text-[10px]">99.9% bug immunity</div>
                </div>
                <div className="bg-black/60 p-2 border border-white/10">
                  <div className="text-[#ffe600] font-bold">🚀 100 PageSpeed</div>
                  <div className="text-gray-400 text-[10px]">Instantaneous load times</div>
                </div>
              </div>
            </div>

            {/* Next Stage Button */}
            {onNavigateStage && (
              <div className="flex justify-end pt-1">
                <PixelButton
                  variant="primary"
                  size="md"
                  soundType="jump"
                  onClick={() => onNavigateStage(2)}
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  NEXT: SPELLBOOK (STAGE 02) ▶
                </PixelButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
