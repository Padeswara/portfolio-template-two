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
    { id: 'all', label: 'ALL SPELLS', icon: '🌟' },
    { id: 'core', label: 'CORE SORCERY', icon: '⚡' },
    { id: 'framework', label: 'FRAMEWORKS', icon: '⚛️' },
    { id: 'styling', label: 'STYLING & FX', icon: '🎨' },
    { id: 'tools', label: 'RUNES & TOOLS', icon: '🛠️' },
  ];

  const filteredSkills = activeCategory === 'all'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === activeCategory);

  const handleCategoryChange = (catId: string) => {
    playClick();
    setActiveCategory(catId);
  };

  return (
    <section className="h-full overflow-y-auto py-6 sm:py-8 px-4 sm:px-6 select-none max-w-6xl mx-auto w-full">
      <div className="space-y-6">
        {/* Section Header */}
        <div className="text-left space-y-2">
          <div className="inline-block bg-black border-2 border-[#ff007f] px-3 py-1 font-press-start text-[9px] text-[#ff007f] shadow-[2px_2px_0_0_#00f3ff]">
            STAGE 02 // ABILITY MATRIX
          </div>
          <h2 className="font-press-start text-xl sm:text-2xl text-white uppercase drop-shadow-[2px_2px_0_#00f3ff]">
            SPELLBOOK & SKILL TREE
          </h2>
          <p className="font-mono text-xs sm:text-sm text-gray-400 max-w-xl">
            Select ability spells to inspect incantations, elemental affinity, and mana costs.
          </p>
        </div>

        {/* Filter Categories Bar */}
        <div className="flex flex-wrap items-center justify-start gap-1.5 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-2.5 sm:px-3 py-1.5 sm:py-2 font-press-start text-[8px] sm:text-[9px] uppercase transition-all duration-75 border-2 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#00f3ff] text-black border-black shadow-[2px_2px_0_0_#ff007f] -translate-y-0.5'
                  : 'bg-[#15082a] text-gray-300 border-white/20 hover:border-white hover:text-white'
              }`}
            >
              <span className="mr-1">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Skills Main Grid & Spellbook Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Skill Tree Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {filteredSkills.map((skill) => (
              <SkillNode
                key={skill.name}
                skill={skill}
                isSelected={selectedSkill.name === skill.name}
                onSelect={() => setSelectedSkill(skill)}
              />
            ))}
          </div>

          {/* Right: Selected Spell Grimoire / Detail Inspector */}
          <div className="lg:col-span-5 space-y-4">
            <PixelCard
              title="SPELLBOOK GRIMOIRE"
              badge={`MP: ${selectedSkill.mpCost}`}
              headerColor="pink"
              borderColor="pink"
            >
              <div className="space-y-3.5">
                {/* Spell Name & Element Header */}
                <div className="flex items-center space-x-3 border-b border-white/10 pb-2.5">
                  <div className="w-10 h-10 bg-black border-2 border-[#ff007f] flex items-center justify-center text-xl shadow-[2px_2px_0_0_#ffe600]">
                    {selectedSkill.icon}
                  </div>
                  <div>
                    <h3 className="font-press-start text-xs sm:text-sm text-white">
                      {selectedSkill.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 font-mono text-xs">
                      <span className="text-[#ffe600]">
                        Class: {selectedSkill.category.toUpperCase()}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-[#00f3ff]">
                        {selectedSkill.element}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Spell Description */}
                <div className="bg-black/60 p-2.5 border border-white/10 space-y-1">
                  <div className="font-press-start text-[8px] text-[#39ff14] flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#39ff14]" />
                    <span>SPELL INCANTATION</span>
                  </div>
                  <p className="font-mono text-xs text-gray-200 leading-relaxed italic">
                    "{selectedSkill.description}"
                  </p>
                </div>

                {/* Spell Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-[#180933] p-2 border border-white/10">
                    <div className="text-gray-400 text-[9px]">MASTERY LEVEL</div>
                    <div className="text-[#ffe600] font-press-start text-[9px] mt-0.5">
                      LV. {selectedSkill.level} / {selectedSkill.maxLevel}
                    </div>
                  </div>
                  <div className="bg-[#180933] p-2 border border-white/10">
                    <div className="text-gray-400 text-[9px]">CAST COOLDOWN</div>
                    <div className="text-[#00f3ff] font-press-start text-[9px] mt-0.5">
                      0.00s (PASSIVE)
                    </div>
                  </div>
                </div>

                {/* Spell Power Gauge */}
                <div className="space-y-1 pt-0.5">
                  <div className="flex justify-between text-[8px] font-press-start text-gray-300">
                    <span>CAST PROFICIENCY</span>
                    <span className="text-[#39ff14]">100% SUCCESS</span>
                  </div>
                  <div className="w-full h-2.5 bg-black border border-white/30 p-0.5">
                    <div className="w-full h-full bg-gradient-to-r from-[#00f3ff] via-[#39ff14] to-[#ffe600]" />
                  </div>
                </div>
              </div>
            </PixelCard>

            {/* Next Stage CTA Button */}
            {onNavigateStage && (
              <div className="flex justify-end">
                <PixelButton
                  variant="primary"
                  size="md"
                  soundType="jump"
                  onClick={() => onNavigateStage(3)}
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  NEXT: QUESTS (STAGE 03) ▶
                </PixelButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
