import React from 'react';

interface PixelBadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'pink' | 'yellow' | 'green' | 'purple' | 'red' | 'gray';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const PixelBadge: React.FC<PixelBadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'md',
  icon,
  className = '',
}) => {
  const variantStyles = {
    cyan: 'bg-[#00f3ff]/15 text-[#00f3ff] border-[#00f3ff]',
    pink: 'bg-[#ff007f]/15 text-[#ff007f] border-[#ff007f]',
    yellow: 'bg-[#ffe600]/15 text-[#ffe600] border-[#ffe600]',
    green: 'bg-[#39ff14]/15 text-[#39ff14] border-[#39ff14]',
    purple: 'bg-[#aa00ff]/15 text-[#aa00ff] border-[#aa00ff]',
    red: 'bg-[#ff3838]/15 text-[#ff3838] border-[#ff3838]',
    gray: 'bg-white/10 text-white/80 border-white/30',
  };

  const sizeStyles = {
    sm: 'text-[9px] px-1.5 py-0.5 font-press-start gap-1 border',
    md: 'text-[11px] px-2.5 py-1 font-press-start gap-1.5 border-2',
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

