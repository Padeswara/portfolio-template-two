import React, { useState } from 'react';
import { PixelCard } from '../ui/PixelCard';
import { PixelButton } from '../ui/PixelButton';
import { SocialInventory } from './SocialInventory';
import { useAudio } from '../../context/AudioContext';
import { useGame } from '../../context/GameContext';
import { Send, Save, Home } from 'lucide-react';

interface ContactSectionProps {
  onNavigateStage?: (stageIndex: number) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNavigateStage }) => {
  const { playVictory, playClick } = useAudio();
  const { unlockAchievement, addExp, addCoins } = useGame();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    questType: 'Full-time Harvest',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields in the letter!');
      return;
    }

    setIsSubmitting(true);
    playClick();

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      playVictory();
      unlockAchievement('quest_contact');
      addExp(250);
      addCoins(5);
    }, 1200);
  };

  const handleReset = () => {
    playClick();
    setIsSuccess(false);
    setFormData({
      name: '',
      email: '',
      questType: 'Full-time Harvest',
      message: '',
    });
  };

  return (
    <section className="h-full overflow-y-auto py-6 sm:py-8 px-4 sm:px-8 select-none max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Side: Title & Save Diary & Social Beacons Panel */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-2">
          {/* Section Header */}
          <div className="space-y-1.5 border-b-2 border-[#8c5835]/30 pb-3">
            <div className="inline-block bg-[#fff8eb] border-2 border-[#8c5835] px-2.5 py-1 font-press-start text-[8px] sm:text-[9px] text-[#5c3a21] shadow-[2px_2px_0_0_rgba(0,0,0,0.25)]">
              STAGE 06 // TOWN MAILBOX
            </div>
            <h2 className="font-press-start text-xl sm:text-2xl text-[#fffdf5] uppercase drop-shadow-[2px_2px_0_#4a2e18] leading-tight">
              TOWN MAILBOX & CONTACT
            </h2>
            <p className="font-mono text-xs text-[#faecd4] leading-relaxed drop-shadow-[1px_1px_0_#2c1808]">
              Save your diary progress, send a carrier letter, or recruit me for upcoming web projects.
            </p>
          </div>

          {/* Farm Diary / Save Crystal Box */}
          <div className="bg-[#fff8eb] border-4 border-[#8c5835] p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] text-center relative overflow-hidden">
            <div className="w-11 h-11 mx-auto mb-2 bg-[#faecd4] border-2 border-[#8c5835] flex items-center justify-center text-xl shadow-[0_0_15px_rgba(230,157,36,0.3)] animate-pixel-float">
              📖
            </div>

            <h3 className="font-press-start text-[9px] sm:text-xs text-[#5c3a21] uppercase">
              ★ FARM DIARY ARCHIVE ★
            </h3>
            <p className="font-mono text-xs text-[#5c3a21] mt-1 leading-relaxed">
              Stamina & Progress saved! Leave a letter to establish a direct correspondence.
            </p>

            <div className="mt-2.5 pt-2 border-t border-[#8c5835]/20 flex items-center justify-center space-x-2 text-[8px] sm:text-[9px] font-press-start text-[#5a8740]">
              <Save className="w-3 h-3 animate-pulse" />
              <span>AUTOSAVE ACTIVE</span>
            </div>
          </div>

          {/* Social Beacons */}
          <SocialInventory />

          {/* Return Home Button */}
          {onNavigateStage && (
            <PixelButton
              variant="wood"
              size="md"
              soundType="jump"
              onClick={() => onNavigateStage(0)}
              icon={<Home className="w-3.5 h-3.5" />}
              className="w-full justify-between"
            >
              <span>RETURN TO TITLE (00)</span>
            </PixelButton>
          )}
        </div>

        {/* Right Side: Letter Mailbox Contact Form */}
        <div className="lg:col-span-7">
          <PixelCard
            title="TOWN DISPATCH LETTER"
            badge="PARCHMENT"
            headerColor="green"
            borderColor="green"
          >
            {isSuccess ? (
              <div className="py-6 text-center space-y-3 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 bg-[#faecd4] border-2 border-[#5a8740] flex items-center justify-center mx-auto text-2xl">
                  🕊️
                </div>
                <h3 className="font-press-start text-xs sm:text-sm text-[#4a6b36]">
                  CARRIER LETTER DISPATCHED!
                </h3>
                <p className="font-mono text-xs text-[#5c3a21] max-w-sm mx-auto leading-relaxed">
                  Your letter has been sent via carrier pigeon to my farm mailbox. I will write back within 1 standard day!
                </p>
                <div className="pt-2">
                  <PixelButton
                    variant="primary"
                    size="md"
                    onClick={handleReset}
                  >
                    SEND ANOTHER LETTER
                  </PixelButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Name */}
                <div className="space-y-1">
                  <label
                    htmlFor="contact-name"
                    className="block font-press-start text-[8px] sm:text-[9px] text-[#5c3a21] uppercase"
                  >
                    SENDER NAME / GUILD ID *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Mayor Thomas from Mineral Town"
                    className="w-full bg-[#faecd4] border-2 border-[#8c5835]/40 px-3 py-1.5 text-xs font-mono text-[#362213] placeholder-gray-500 focus:outline-none focus:border-[#5a8740] transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label
                    htmlFor="contact-email"
                    className="block font-press-start text-[8px] sm:text-[9px] text-[#8c5835] uppercase"
                  >
                    CORRESPONDENCE EMAIL *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. traveler@mineraltown.com"
                    className="w-full bg-[#faecd4] border-2 border-[#8c5835]/40 px-3 py-1.5 text-xs font-mono text-[#362213] placeholder-gray-500 focus:outline-none focus:border-[#8c5835] transition-colors"
                  />
                </div>

                {/* Quest Type */}
                <div className="space-y-1">
                  <label
                    htmlFor="contact-quest-type"
                    className="block font-press-start text-[8px] sm:text-[9px] text-[#c48114] uppercase"
                  >
                    OPPORTUNITY TYPE
                  </label>
                  <select
                    id="contact-quest-type"
                    name="questType"
                    value={formData.questType}
                    onChange={handleChange}
                    className="w-full bg-[#faecd4] border-2 border-[#8c5835]/40 px-3 py-1.5 text-xs font-mono text-[#5c3a21] focus:outline-none focus:border-[#c48114] transition-colors cursor-pointer"
                  >
                    <option value="Full-time Harvest">🌻 Full-time Front-End Engineering</option>
                    <option value="Contract Harvest">🌾 Contract / Freelance Web Project</option>
                    <option value="UI Consultation">🎨 UI/UX & Performance Consultation</option>
                    <option value="Tea & Networking">🍵 Friendly Chat & Networking</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label
                    htmlFor="contact-message"
                    className="block font-press-start text-[8px] sm:text-[9px] text-[#4a6b36] uppercase"
                  >
                    LETTER BRIEF / INQUIRY *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your web project, timeline, tech preferences, or greeting..."
                    className="w-full bg-[#faecd4] border-2 border-[#8c5835]/40 px-3 py-1.5 text-xs font-mono text-[#362213] placeholder-gray-500 focus:outline-none focus:border-[#5a8740] transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="pt-1 flex justify-end">
                  <PixelButton
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    icon={<Send className="w-3.5 h-3.5 text-[#2c1808]" />}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? 'DISPATCHING...' : 'DISPATCH LETTER'}
                  </PixelButton>
                </div>
              </form>
            )}
          </PixelCard>
        </div>
      </div>
    </section>
  );
};
