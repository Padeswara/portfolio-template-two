import React from 'react';
import { PixelCard } from '../ui/PixelCard';
import { PixelButton } from '../ui/PixelButton';
import { EquipmentCard } from './EquipmentCard';
import { DEVELOPER_INFO, EQUIPMENT_LOADOUT } from '../../data/portfolioData';
import { Zap, MapPin, Coffee, ArrowRight, Sprout } from 'lucide-react';

interface AboutSectionProps {
  onNavigateStage?: (stageIndex: number) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigateStage }) => {
  const statsList = [
    { label: 'CLEAN CODE CRAFT', value: DEVELOPER_INFO.stats.cleanCode, color: '#5a8740' },
    { label: 'LIGHTHOUSE SPEED', value: DEVELOPER_INFO.stats.performance, color: '#e69d24' },
    { label: 'UI/UX COZINESS & CHARM', value: DEVELOPER_INFO.stats.uiUxMagic, color: '#d64545' },
    { label: 'STATE & ARCHITECTURE', value: DEVELOPER_INFO.stats.stateArchitecture, color: '#8c5835' },
    { label: 'RESPONSIVE PLOWING', value: DEVELOPER_INFO.stats.responsiveDefense, color: '#5f9ea0' },
    { label: 'TEA & CAFFEINE FOCUS', value: DEVELOPER_INFO.stats.caffeineBuff, color: '#c48114' },
  ];

  return (
    <section className="h-full overflow-y-auto py-6 sm:py-8 px-4 sm:px-8 select-none max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Side: Title & Story Overview Panel */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-2">
          {/* Section Header */}
          <div className="space-y-1.5 border-b-2 border-[#8c5835]/30 pb-3">
            <div className="inline-block bg-[#fff8eb] border-2 border-[#8c5835] px-2.5 py-1 font-press-start text-[8px] sm:text-[9px] text-[#5c3a21] shadow-[2px_2px_0_0_rgba(0,0,0,0.25)]">
              STAGE 01 // FARMER PROFILE
            </div>
            <h2 className="font-press-start text-xl sm:text-2xl text-[#fffdf5] uppercase drop-shadow-[2px_2px_0_#4a2e18] leading-tight">
              FARMER STATS & TOOLS
            </h2>
            <p className="font-mono text-xs text-[#faecd4] leading-relaxed drop-shadow-[1px_1px_0_#2c1808]">
              Inspect developer attributes, stamina buffs, and equipped enchanted tools.
            </p>
          </div>

          {/* Origin Story / Bio Card */}
          <PixelCard
            title="TOWN JOURNAL // ORIGIN"
            badge="BIO"
            headerColor="wood"
            borderColor="wood"
          >
            <div className="space-y-3 font-mono text-xs text-[#362213]">
              <p className="leading-relaxed">
                Greetings! I am a passionate <strong className="text-[#5a8740]">Front End Developer</strong> dedicated to cultivating clean, resilient, and charming web interfaces.
              </p>
              <p className="leading-relaxed">
                With deep expertise in <span className="text-[#8c5835] font-bold">React 19</span>, <span className="text-[#5a8740] font-bold">Tailwind CSS</span>, and <span className="text-[#b37a1c] font-bold">TypeScript</span>, I bring craftsmanship and care to every codebase.
              </p>

              <div className="pt-2 border-t border-[#8c5835]/20 space-y-1.5 text-xs font-mono">
                <div className="flex items-center space-x-2 text-[#5c3a21]">
                  <MapPin className="w-3.5 h-3.5 text-[#d64545] shrink-0" />
                  <span>{DEVELOPER_INFO.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-[#4a6b36]">
                  <Sprout className="w-3.5 h-3.5 text-[#5a8740] shrink-0" />
                  <span>{DEVELOPER_INFO.availability}</span>
                </div>
              </div>
            </div>
          </PixelCard>

          {/* Next Stage Navigation CTA */}
          {onNavigateStage && (
            <PixelButton
              variant="primary"
              size="md"
              soundType="jump"
              onClick={() => onNavigateStage(2)}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              className="w-full justify-between"
            >
              <span>NEXT: CROPS & SKILLS (02)</span>
            </PixelButton>
          )}
        </div>

        {/* Right Side: Main Stats & Equipment Grid */}
        <div className="lg:col-span-8 space-y-5">
          {/* Player Attributes Progress Bars */}
          <PixelCard
            title="DEVELOPER ATTRIBUTES"
            badge="LV. 99"
            headerColor="green"
            borderColor="green"
          >
            <div className="space-y-2.5">
              {statsList.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="font-semibold text-[#362213]">{stat.label}</span>
                    <span className="font-press-start text-[9px]" style={{ color: stat.color }}>
                      {stat.value}/100
                    </span>
                  </div>
                  <div className="w-full h-3 bg-[#faecd4] border border-[#8c5835] p-0.5 relative flex">
                    <div
                      className="h-full transition-all duration-1000"
                      style={{
                        width: `${stat.value}%`,
                        backgroundColor: stat.color,
                        boxShadow: `0 0 6px ${stat.color}`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </PixelCard>

          {/* Equipped Loadout Artifacts */}
          <PixelCard
            title="EQUIPPED FARM TOOLS // ARTIFACTS"
            badge="5 SLOTS"
            headerColor="yellow"
            borderColor="yellow"
          >
            <p className="font-mono text-xs text-[#5c3a21] mb-3">
              Click any equipped tool to view enchanted stats and efficiency perks:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EQUIPMENT_LOADOUT.map((item) => (
                <EquipmentCard key={item.slot} item={item} />
              ))}

              {/* Tea Station */}
              <div className="bg-[#fff8eb] border-2 border-dashed border-[#8c5835] p-2.5 flex flex-col justify-center items-center text-center shadow-[2px_2px_0_0_rgba(0,0,0,0.2)]">
                <Coffee className="w-6 h-6 text-[#8c5835] animate-bounce mb-1" />
                <span className="font-press-start text-[8px] text-[#5c3a21]">
                  STAMINA REGEN: 100%
                </span>
                <span className="font-mono text-[9px] text-[#785a44] mt-0.5">
                  Powered by Hot Spring Tea
                </span>
              </div>
            </div>
          </PixelCard>

          {/* Passive Buffs */}
          <div className="bg-[#fff8eb] border-2 border-[#5a8740] p-3 shadow-[3px_3px_0_0_rgba(0,0,0,0.25)]">
            <div className="font-press-start text-[8px] sm:text-[9px] text-[#4a6b36] mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#5a8740]" />
              <span>PASSIVE HARVEST BUFFS ACTIVE</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
              <div className="bg-[#faecd4] p-2 border border-[#8c5835]/40">
                <div className="text-[#5a8740] font-bold">⚡ Zero CLS</div>
                <div className="text-[#785a44] text-[10px]">Stable pixel placement</div>
              </div>
              <div className="bg-[#faecd4] p-2 border border-[#8c5835]/40">
                <div className="text-[#8c5835] font-bold">🛡️ Type Safe</div>
                <div className="text-[#785a44] text-[10px]">Strict compile guarantee</div>
              </div>
              <div className="bg-[#faecd4] p-2 border border-[#8c5835]/40">
                <div className="text-[#c48114] font-bold">🚀 100 PageSpeed</div>
                <div className="text-[#785a44] text-[10px]">Instantaneous load times</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
