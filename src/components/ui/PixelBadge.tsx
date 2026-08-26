import React from 'react';

interface PixelBadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'pink' | 'yellow' | 'green' | 'purple' | 'red' | 'gray' | 'wood';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const PixelBadge: React.FC<PixelBadgeProps> = ({
  children,
  variant = 'green',
  size = 'md',
  icon,
  className = '',
}) => {
  const variantStyles = {
    green: 'bg-[#5a8740]/20 text-[#2c471c] border-[#5a8740]',
    yellow: 'bg-[#e69d24]/20 text-[#613e07] border-[#e69d24]',
    pink: 'bg-[#d64545]/20 text-[#6e1818] border-[#d64545]',
    red: 'bg-[#c0392b]/20 text-[#54140c] border-[#c0392b]',
    cyan: 'bg-[#5f9ea0]/20 text-[#1f4243] border-[#5f9ea0]',
    purple: 'bg-[#7b5294]/20 text-[#361947] border-[#7b5294]',
    wood: 'bg-[#8c5835]/20 text-[#4a2e18] border-[#8c5835]',
    gray: 'bg-black/10 text-[#4a2e18] border-[#4a2e18]/30',
  };

  const sizeStyles = {
    sm: 'text-[8px] px-1.5 py-0.5 font-press-start gap-1 border',
    md: 'text-[9px] sm:text-[10px] px-2 py-0.5 font-press-start gap-1.5 border-2',
  };

  return (
    <span
      className={`inline-flex items-center justify-center font-semibold uppercase tracking-wider ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="inline-flex items-center shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
