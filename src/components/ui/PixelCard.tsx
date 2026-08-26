import React from 'react';

interface PixelCardProps {
  children: React.ReactNode;
  title?: string;
  badge?: string;
  headerColor?: 'cyan' | 'pink' | 'yellow' | 'green' | 'purple' | 'wood' | 'berry';
  borderColor?: 'cyan' | 'pink' | 'yellow' | 'green' | 'default' | 'wood';
  hoverEffect?: boolean;
  className?: string;
}

export const PixelCard: React.FC<PixelCardProps> = ({
  children,
  title,
  badge,
  headerColor = 'wood',
  borderColor = 'default',
  hoverEffect = true,
  className = '',
}) => {
  const headerColors = {
    wood: 'bg-[#8c5835] text-[#fff8eb] border-b-2 border-[#4a2e18]',
    cyan: 'bg-[#5f9ea0] text-white border-b-2 border-[#325253]',
    pink: 'bg-[#d64545] text-white border-b-2 border-[#4a1818]',
    berry: 'bg-[#c94c4c] text-white border-b-2 border-[#4a1818]',
    yellow: 'bg-[#e69d24] text-[#2c1808] border-b-2 border-[#4a2e18]',
    green: 'bg-[#5a8740] text-white border-b-2 border-[#2c471c]',
    purple: 'bg-[#7b5294] text-white border-b-2 border-[#3d244c]',
  };

  const borderStyles = {
    default: 'border-4 border-[var(--theme-border)] shadow-[4px_4px_0_0_rgba(0,0,0,0.35)]',
    wood: 'border-4 border-[#4a2e18] shadow-[4px_4px_0_0_rgba(0,0,0,0.35)]',
    cyan: 'border-4 border-[#325253] shadow-[4px_4px_0_0_rgba(0,0,0,0.35)]',
    pink: 'border-4 border-[#4a1818] shadow-[4px_4px_0_0_rgba(0,0,0,0.35)]',
    yellow: 'border-4 border-[#8c5835] shadow-[4px_4px_0_0_rgba(0,0,0,0.35)]',
    green: 'border-4 border-[#2c471c] shadow-[4px_4px_0_0_rgba(0,0,0,0.35)]',
  };

  return (
    <div
      className={`relative bg-[var(--theme-card)] text-[var(--theme-text)] transition-all duration-150 wood-box ${borderStyles[borderColor]} ${
        hoverEffect ? 'hover:-translate-y-0.5' : ''
      } ${className}`}
    >
      {/* Corner wooden pegs */}
      <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-[#4a2e18] opacity-60 pointer-events-none" />
      <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#4a2e18] opacity-60 pointer-events-none" />
      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-[#4a2e18] opacity-60 pointer-events-none" />
      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#4a2e18] opacity-60 pointer-events-none" />

      {/* Header Bar */}
      {title && (
        <div className={`px-3 py-1.5 flex items-center justify-between font-press-start text-[9px] sm:text-[10px] tracking-wider ${headerColors[headerColor]}`}>
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 bg-[#fff8eb] opacity-80" />
            <span className="truncate">{title}</span>
          </div>
          {badge && (
            <span className="px-1.5 py-0.5 bg-[#2c1808] text-[#faecd4] text-[8px] font-mono uppercase">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Card Body */}
      <div className="p-3.5 sm:p-4.5 text-[var(--theme-text)]">
        {children}
      </div>
    </div>
  );
};
