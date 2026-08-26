import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const CrtOverlay: React.FC = () => {
  const { crtEnabled, flickerEnabled } = useTheme();

  if (!crtEnabled) return null;

  return (
    <>
      {/* CRT Scanline horizontal grid */}
      <div className={`crt-overlay ${flickerEnabled ? 'crt-flicker' : ''}`} />
      
      {/* CRT Vignette shadow around edges */}
      <div className="crt-vignette" />
      
      {/* Moving scanline beam */}
      <div className="scanline-beam" />
    </>
  );
};

