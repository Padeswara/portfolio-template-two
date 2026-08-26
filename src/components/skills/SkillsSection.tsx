import React, { useState } from 'react';
import { SKILLS_DATA, type Skill } from '../../data/portfolioData';
import { SkillNode } from './SkillNode';
import { PixelCard } from '../ui/PixelCard';
import { PixelButton } from '../ui/PixelButton';
import { useAudio } from '../../context/AudioContext';
import { BookOpen, ArrowRight, Wand2 } from 'lucide-react';

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
    <section className="h-full overflow-y-auto py-6 sm:py-8 px-4 sm:px-8 select-none max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Side: Title & Vertical Category Filter Panel */}
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-2">
          {/* Section Header */}
          <div className="space-y-2 border-b-2 border-white/10 pb-4">
            <div className="inline-block bg-black border-2 border-[#ff007f] px-2.5 py-1 font-press-start text-[8px] sm:text-[9px] text-[#ff007f] shadow-[2px_2px_0_0_#00f3ff]">
              STAGE 02 // ABILITY MATRIX
            </div>
            <h2 className="font-press-start text-xl sm:text-2xl text-white uppercase drop-shadow-[2px_2px_0_#00f3ff] leading-tight">
              SPELLBOOK & SKILL TREE
            </h2>
            <p className="font-mono text-xs text-gray-400 leading-relaxed">
              Select ability spells to inspect incantations, elemental affinity, and mana costs.
            </p>
          </div>

          {/* Spell Class Filter Menu */}
          <PixelCard
            title="SPELL CATEGORIES"
            badge="FILTER"
            headerColor="yellow"
            borderColor="yellow"
          >
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`w-full px-3 py-2 text-left font-press-start text-[9px] uppercase transition-all duration-75 border-2 flex items-center justify-between cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#00f3ff] text-black border-black shadow-[2px_2px_0_0_#ff007f] font-bold translate-x-1'
                      : 'bg-black/60 text-gray-300 border-white/10 hover:border-[#00f3ff] hover:text-white'
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
              <span>NEXT: QUESTS (03)</span>
            </PixelButton>
          )}
        </div>

        {/* Right Side: Skill Tree Nodes & Inspector Grimoire */}
        <div className="lg:col-span-8 space-y-6">
          {/* Selected Spell Grimoire / Detail Inspector */}
          <PixelCard
            title="SPELLBOOK GRIMOIRE"
            badge={`MP: ${selectedSkill.mpCost}`}
            headerColor="pink"
            borderColor="pink"
          >
            <div className="space-y-3">
              {/* Spell Header */}
              <div className="flex items-center space-x-3 border-b border-white/10 pb-2.5">
                <div className="w-11 h-11 bg-black border-2 border-[#ff007f] flex items-center justify-center text-xl shadow-[2px_2px_0_0_#ffe600]">
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
                      Element: {selectedSkill.element}
                    </span>
                  </div>
                </div>
              </div>

              {/* Incantation */}
              <div className="bg-black/60 p-2.5 border border-white/10 space-y-1">
                <div className="font-press-start text-[8px] text-[#39ff14] flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-[#39ff14]" />
                  <span>SPELL INCANTATION</span>
                </div>
                <p className="font-mono text-xs text-gray-200 leading-relaxed italic">
                  "{selectedSkill.description}"
                </p>
              </div>

              {/* Metrics */}
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

              {/* Power Gauge */}
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

          {/* Skill Tree Grid */}
          <div className="space-y-2">
            <div className="font-press-start text-[9px] text-[#ffe600] tracking-wider">
              SELECT SPELL NODE TO INSPECT:
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
