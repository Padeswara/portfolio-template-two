import React from 'react';
import { useAudio } from '../../context/AudioContext';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'green' | 'dark' | 'ghost' | 'wood';
  size?: 'sm' | 'md' | 'lg';
  soundType?: 'click' | 'coin' | 'laser' | 'jump' | 'powerup' | 'none';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  variant = 'primary',
  size = 'md',
  soundType = 'click',
  children,
  icon,
  className = '',
  onClick,
  ...props
}) => {
  const audio = useAudio();

  const variantStyles = {
    primary: 'bg-[#e69d24] text-[#2c1808] border-[#4a2e18] hover:bg-[#f5b33d]',
    secondary: 'bg-[#d64545] text-white border-[#4a1818] hover:bg-[#e65c5c]',
    accent: 'bg-[#7cb359] text-[#1c3311] border-[#36541f] hover:bg-[#91c76d]',
    green: 'bg-[#5a8740] text-white border-[#2c471c] hover:bg-[#6fa34f]',
    wood: 'bg-[#8c5835] text-[#fff8eb] border-[#4a2e18] hover:bg-[#a1673e]',
    dark: 'bg-[#2d1b0d] text-[#e69d24] border-[#e69d24] hover:bg-[#422915] hover:text-white',
    ghost: 'bg-transparent text-[#4a2e18] border-[#4a2e18]/40 hover:border-[#4a2e18] hover:bg-[#4a2e18]/10',
  };

  const sizeStyles = {
    sm: 'text-[9px] px-2.5 py-1 gap-1',
    md: 'text-[10px] sm:text-xs px-3.5 py-2 gap-1.5',
    lg: 'text-xs sm:text-sm px-5 py-2.5 gap-2',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.disabled) return;

    if (soundType === 'click') audio.playClick();
    else if (soundType === 'coin') audio.playCoin();
    else if (soundType === 'laser') audio.playLaser();
    else if (soundType === 'jump') audio.playJump();
    else if (soundType === 'powerup') audio.playPowerUp();

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`farm-btn font-press-start active:translate-y-1 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {icon && <span className="inline-flex items-center justify-center shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
