import React from 'react';

interface PixelCardProps {
  children: React.ReactNode;
  title?: string;
  badge?: string;
  headerColor?: 'cyan' | 'pink' | 'yellow' | 'green' | 'purple';
  borderColor?: 'cyan' | 'pink' | 'yellow' | 'green' | 'default';
  hoverEffect?: boolean;
  className?: string;
}

export const PixelCard: React.FC<PixelCardProps> = ({
  children,
  title,
  badge,
  headerColor = 'cyan',
  borderColor = 'default',
  hoverEffect = true,
  className = '',
}) => {
  const headerColors = {
    cyan: 'bg-[#00f3ff] text-black border-b-2 border-black',
    pink: 'bg-[#ff007f] text-white border-b-2 border-black',
    yellow: 'bg-[#ffe600] text-black border-b-2 border-black',
    green: 'bg-[#39ff14] text-black border-b-2 border-black',
    purple: 'bg-[#aa00ff] text-white border-b-2 border-black',
  };

  const borderStyles = {
    cyan: 'border-2 border-[#00f3ff] shadow-[0_0_15px_rgba(0,243,255,0.2)]',
    pink: 'border-2 border-[#ff007f] shadow-[0_0_15px_rgba(255,0,127,0.2)]',
    yellow: 'border-2 border-[#ffe600] shadow-[0_0_15px_rgba(255,230,0,0.2)]',
    green: 'border-2 border-[#39ff14] shadow-[0_0_15px_rgba(57,255,20,0.2)]',
    default: 'border-2 border-[var(--theme-border)] shadow-[4px_4px_0_0_rgba(0,0,0,0.6)]',
  };

  return (
    <div
      className={`relative bg-[var(--theme-card)] transition-all duration-200 ${borderStyles[borderColor]} ${
        hoverEffect ? 'hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.8)]' : ''
      } ${className}`}
    >
      {/* Decorative corner pixels */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-current opacity-70" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-current opacity-70" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-current opacity-70" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-current opacity-70" />

      {/* Header Bar */}
      {title && (
        <div className={`px-3 py-1.5 flex items-center justify-between font-press-start text-[10px] tracking-wider ${headerColors[headerColor]}`}>
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 bg-black animate-pulse" />
            <span className="truncate">{title}</span>
          </div>
          {badge && (
            <span className="px-1.5 py-0.5 bg-black text-white text-[9px] font-mono uppercase">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Card Body */}
      <div className="p-4 sm:p-5 text-[var(--theme-text)]">
        {children}
      </div>
    </div>
  );
};

