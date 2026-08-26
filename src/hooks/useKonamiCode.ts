import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export const useKonamiCode = (onSuccess: () => void) => {
  const [inputSequence, setInputSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expectedKey = KONAMI_CODE[inputSequence.length];

      if (key === expectedKey || key.toLowerCase() === expectedKey.toLowerCase()) {
        const nextSequence = [...inputSequence, key];
        setInputSequence(nextSequence);

        if (nextSequence.length === KONAMI_CODE.length) {
          onSuccess();
          setInputSequence([]);
        }
      } else {
        // Check if first key matches to restart sequence
        if (key === KONAMI_CODE[0]) {
          setInputSequence([key]);
        } else {
          setInputSequence([]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputSequence, onSuccess]);

  return {
    progress: inputSequence.length,
    total: KONAMI_CODE.length,
  };
};

