import React from 'react';
import { useAudio } from '../../context/AudioContext';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'green' | 'dark' | 'ghost';
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
    primary: 'bg-[#00f3ff] text-black border-2 border-black hover:bg-[#80f9ff]',
    secondary: 'bg-[#ff007f] text-white border-2 border-black hover:bg-[#ff4da6]',
    accent: 'bg-[#ffe600] text-black border-2 border-black hover:bg-[#fff04d]',
    green: 'bg-[#39ff14] text-black border-2 border-black hover:bg-[#73ff5a]',
    dark: 'bg-[#1a0c33] text-[#00f3ff] border-2 border-[#ff007f] hover:bg-[#2c1556] hover:text-white',
    ghost: 'bg-transparent text-white border-2 border-white/40 hover:border-white hover:bg-white/10',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-3 py-1.5 gap-1.5',
    md: 'text-xs px-4 py-2.5 gap-2',
    lg: 'text-sm px-6 py-3.5 gap-3',
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
      className={`pixel-btn transition-all duration-75 font-press-start active:translate-y-1 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {icon && <span className="inline-flex items-center justify-center shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

