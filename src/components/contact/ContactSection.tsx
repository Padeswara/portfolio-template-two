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
    questType: 'Full-time Raid',
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
      alert('Please fill out all required fields in the terminal!');
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
      questType: 'Full-time Raid',
      message: '',
    });
  };

  return (
    <section className="h-full overflow-y-auto py-6 sm:py-8 px-4 sm:px-6 select-none max-w-5xl mx-auto w-full">
      <div className="space-y-6">
        {/* Section Header */}
        <div className="text-left space-y-2">
          <div className="inline-block bg-black border-2 border-[#39ff14] px-3 py-1 font-press-start text-[9px] text-[#39ff14] shadow-[2px_2px_0_0_#ff007f]">
            STAGE 06 // SAVE POINT & COMMS
          </div>
          <h2 className="font-press-start text-xl sm:text-2xl text-white uppercase drop-shadow-[2px_2px_0_#39ff14]">
            SAVE POINT // SEND TRANSMISSION
          </h2>
          <p className="font-mono text-xs sm:text-sm text-gray-400 max-w-xl">
            Save your progress, forge a party alliance, or recruit me for upcoming web campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Save Point Crystal & Social Beacons */}
          <div className="lg:col-span-5 space-y-5">
            {/* Save Point Crystal Card */}
            <div className="bg-[#140828] border-4 border-[#00f3ff] p-4 sm:p-5 shadow-[5px_5px_0_0_#000] text-center relative overflow-hidden">
              <div className="w-14 h-14 mx-auto mb-2.5 bg-cyan-950/60 border-2 border-[#00f3ff] flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(0,243,255,0.5)] animate-pixel-float">
                💎
              </div>

              <h3 className="font-press-start text-xs text-[#00f3ff] uppercase">
                ★ RECOVERY CRYSTAL ACTIVE ★
              </h3>
              <p className="font-mono text-xs text-gray-300 mt-1.5 leading-relaxed">
                HP & Mana fully restored! Your journey data is securely archived. Leave a message to establish an encrypted comm channel.
              </p>

              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-center space-x-2 text-[9px] font-press-start text-[#39ff14]">
                <Save className="w-3 h-3 animate-pulse" />
                <span>AUTOSAVE ENABLED</span>
              </div>
            </div>

            {/* Social Beacons */}
            <SocialInventory />
          </div>

          {/* Right: Retro Terminal Contact Form */}
          <div className="lg:col-span-7">
            <PixelCard
              title="TRANSMISSION TERMINAL v1.0"
              badge="PORT 8080"
              headerColor="green"
              borderColor="green"
            >
              {isSuccess ? (
                <div className="py-6 text-center space-y-3 animate-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 bg-green-950/60 border-2 border-[#39ff14] flex items-center justify-center mx-auto text-2xl">
                    🎉
                  </div>
                  <h3 className="font-press-start text-xs sm:text-sm text-[#39ff14]">
                    TRANSMISSION DISPATCHED!
                  </h3>
                  <p className="font-mono text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
                    Your quest proposal has been successfully broadcast to my guild terminal. I will respond within 24 standard game ticks!
                  </p>
                  <div className="pt-2">
                    <PixelButton
                      variant="primary"
                      size="md"
                      onClick={handleReset}
                    >
                      SEND ANOTHER TRANSMISSION
                    </PixelButton>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Name Input */}
                  <div className="space-y-1">
                    <label
                      htmlFor="contact-name"
                      className="block font-press-start text-[8px] sm:text-[9px] text-[#00f3ff] uppercase"
                    >
                      PLAYER NAME / GUILD ID *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Satoshi from Pixel Labs"
                      className="w-full bg-black/80 border-2 border-white/20 px-3 py-1.5 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-[#00f3ff] transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1">
                    <label
                      htmlFor="contact-email"
                      className="block font-press-start text-[8px] sm:text-[9px] text-[#ff007f] uppercase"
                    >
                      COMMS EMAIL / TRANSMITTER *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. adventurer@guild.com"
                      className="w-full bg-black/80 border-2 border-white/20 px-3 py-1.5 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-[#ff007f] transition-colors"
                    />
                  </div>

                  {/* Quest Type Selector */}
                  <div className="space-y-1">
                    <label
                      htmlFor="contact-quest-type"
                      className="block font-press-start text-[8px] sm:text-[9px] text-[#ffe600] uppercase"
                    >
                      QUEST MISSION TYPE
                    </label>
                    <select
                      id="contact-quest-type"
                      name="questType"
                      value={formData.questType}
                      onChange={handleChange}
                      className="w-full bg-black border-2 border-white/20 px-3 py-1.5 text-xs font-mono text-[#ffe600] focus:outline-none focus:border-[#ffe600] transition-colors cursor-pointer"
                    >
                      <option value="Full-time Raid">⚔️ Full-time Front-End Engineering</option>
                      <option value="Freelance Mission">🛡️ Freelance / Contract Web Project</option>
                      <option value="UI Consultation">🎨 Design System & UI/UX Audit</option>
                      <option value="Coffee & Chill">☕ Coffee, Networking & Chitchat</option>
                    </select>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1">
                    <label
                      htmlFor="contact-message"
                      className="block font-press-start text-[8px] sm:text-[9px] text-[#39ff14] uppercase"
                    >
                      QUEST BRIEF / MESSAGE *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Detail your quest requirements, tech stack preferences, and timeline..."
                      className="w-full bg-black/80 border-2 border-white/20 px-3 py-1.5 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-[#39ff14] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
                    {onNavigateStage && (
                      <button
                        type="button"
                        onClick={() => onNavigateStage(0)}
                        className="font-press-start text-[8px] text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <Home className="w-3 h-3" />
                        <span>RETURN TO TITLE</span>
                      </button>
                    )}
                    <PixelButton
                      type="submit"
                      variant="green"
                      size="md"
                      disabled={isSubmitting}
                      icon={<Send className="w-3.5 h-3.5 text-black" />}
                    >
                      {isSubmitting ? 'DISPATCHING...' : 'TRANSMIT MESSAGE'}
                    </PixelButton>
                  </div>
                </form>
              )}
            </PixelCard>
          </div>
        </div>
      </div>
    </section>
  );
};
