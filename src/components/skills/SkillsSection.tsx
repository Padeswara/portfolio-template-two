import React, { useState } from 'react';
import { SKILLS_DATA, type Skill } from '../../data/portfolioData';
import { SkillNode } from './SkillNode';
import { PixelCard } from '../ui/PixelCard';
import { PixelButton } from '../ui/PixelButton';
import { useAudio } from '../../context/AudioContext';
import { BookOpen, ArrowRight } from 'lucide-react';

interface SkillsSectionProps {
  onNavigateStage?: (stageIndex: number) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onNavigateStage }) => {
  const { playClick } = useAudio();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill>(SKILLS_DATA[0]);

  const categories = [
    { id: 'all', label: 'ALL SEEDS & CROPS', icon: '🌾' },
    { id: 'core', label: 'CORE CROPS', icon: '⚡' },
    { id: 'framework', label: 'GOLDEN FRUITS', icon: '⚛️' },
    { id: 'styling', label: 'FLORISTRY & STYLES', icon: '🌿' },
    { id: 'tools', label: 'FARM TOOLS', icon: '🛠️' },
  ];

  const filteredSkills = activeCategory === 'all'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === activeCategory);

  const handleCategoryChange = (catId: string) => {
    playClick();
    setActiveCategory(catId);
  };

  return (
    <section className="h-full overflow-y-auto py-6 sm:py-8 px-4 sm:px-8 select-none max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Side: Title & Category Filter Panel */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-2">
          {/* Section Header */}
          <div className="space-y-1.5 border-b-2 border-[#8c5835]/30 pb-3">
            <div className="inline-block bg-[#fff8eb] border-2 border-[#8c5835] px-2.5 py-1 font-press-start text-[8px] sm:text-[9px] text-[#5c3a21] shadow-[2px_2px_0_0_rgba(0,0,0,0.25)]">
              STAGE 02 // SEEDS & CROPS
            </div>
            <h2 className="font-press-start text-xl sm:text-2xl text-[#fffdf5] uppercase drop-shadow-[2px_2px_0_#4a2e18] leading-tight">
              SPELLBOOK & SKILLS
            </h2>
            <p className="font-mono text-xs text-[#faecd4] leading-relaxed drop-shadow-[1px_1px_0_#2c1808]">
              Inspect cultivated web abilities, elemental affinity, and harvest stamina cost.
            </p>
          </div>

          {/* Spell Class Filter Menu */}
          <PixelCard
            title="CROP CATEGORIES"
            badge="FILTER"
            headerColor="wood"
            borderColor="wood"
          >
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`w-full px-3 py-1.5 text-left font-press-start text-[8px] sm:text-[9px] uppercase transition-all duration-75 border-2 flex items-center justify-between cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#e69d24] text-[#2c1808] border-[#4a2e18] shadow-[2px_2px_0_0_#241308] font-bold translate-x-1'
                      : 'bg-[#fff8eb] text-[#5c3a21] border-[#8c5835]/40 hover:border-[#e69d24] hover:bg-[#faecd4]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </span>
                  {activeCategory === cat.id && <span>◀</span>}
                </button>
              ))}
            </div>
          </PixelCard>

          {/* Next Stage Navigation CTA */}
          {onNavigateStage && (
            <PixelButton
              variant="primary"
              size="md"
              soundType="jump"
              onClick={() => onNavigateStage(3)}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              className="w-full justify-between"
            >
              <span>NEXT: PRODUCE & QUESTS (03)</span>
            </PixelButton>
          )}
        </div>

        {/* Right Side: Skill Tree Nodes & Inspector Grimoire */}
        <div className="lg:col-span-8 space-y-5">
          {/* Selected Spell Grimoire / Detail Inspector */}
          <PixelCard
            title="SEED ALMANAC & GRIMOIRE"
            badge={`MP: ${selectedSkill.mpCost}`}
            headerColor="green"
            borderColor="green"
          >
            <div className="space-y-2.5">
              {/* Spell Header */}
              <div className="flex items-center space-x-3 border-b border-[#8c5835]/20 pb-2">
                <div className="w-10 h-10 bg-[#faecd4] border-2 border-[#8c5835] flex items-center justify-center text-xl shadow-[2px_2px_0_0_rgba(0,0,0,0.2)]">
                  {selectedSkill.icon}
                </div>
                <div>
                  <h3 className="font-press-start text-xs sm:text-sm text-[#362213]">
                    {selectedSkill.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5 font-mono text-xs">
                    <span className="text-[#8c5835] font-bold">
                      Class: {selectedSkill.category.toUpperCase()}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-[#5a8740] font-bold">
                      Affinity: {selectedSkill.element}
                    </span>
                  </div>
                </div>
              </div>

              {/* Incantation */}
              <div className="bg-[#faecd4] p-2.5 border border-[#8c5835]/30 space-y-0.5">
                <div className="font-press-start text-[8px] text-[#4a6b36] flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-[#5a8740]" />
                  <span>CROP ATTRIBUTES</span>
                </div>
                <p className="font-mono text-xs text-[#362213] leading-relaxed italic">
                  "{selectedSkill.description}"
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-[#fff8eb] p-2 border border-[#8c5835]/30">
                  <div className="text-[#785a44] text-[9px]">MASTERY LEVEL</div>
                  <div className="text-[#8c5835] font-press-start text-[9px] mt-0.5">
                    LV. {selectedSkill.level} / {selectedSkill.maxLevel}
                  </div>
                </div>
                <div className="bg-[#fff8eb] p-2 border border-[#8c5835]/30">
                  <div className="text-[#785a44] text-[9px]">EFFICIENCY RATE</div>
                  <div className="text-[#5a8740] font-press-start text-[9px] mt-0.5">
                    100% YIELD
                  </div>
                </div>
              </div>

              {/* Power Gauge */}
              <div className="space-y-1 pt-0.5">
                <div className="flex justify-between text-[8px] font-press-start text-[#5c3a21]">
                  <span>GROWTH PROFICIENCY</span>
                  <span className="text-[#5a8740]">HARVEST READY</span>
                </div>
                <div className="w-full h-2.5 bg-[#faecd4] border border-[#8c5835]/40 p-0.5">
                  <div className="w-full h-full bg-gradient-to-r from-[#7cb359] via-[#e69d24] to-[#5a8740]" />
                </div>
              </div>
            </div>
          </PixelCard>

          {/* Skill Tree Grid */}
          <div className="space-y-1.5">
            <div className="font-press-start text-[8px] sm:text-[9px] text-[#ffe082] tracking-wider drop-shadow-[1px_1px_0_#4a2e18]">
              SELECT ABILITY SEED TO INSPECT:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredSkills.map((skill) => (
                <SkillNode
                  key={skill.name}
                  skill={skill}
                  isSelected={selectedSkill.name === skill.name}
                  onSelect={() => setSelectedSkill(skill)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
