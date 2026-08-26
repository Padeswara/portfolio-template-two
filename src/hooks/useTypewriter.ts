import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
  texts: string[];
  typingSpeed?: number;
  pauseTime?: number;
  onCharTyped?: () => void;
  loop?: boolean;
}

export const useTypewriter = ({
  texts,
  typingSpeed = 40,
  pauseTime = 3000,
  onCharTyped,
  loop = true,
}: UseTypewriterOptions) => {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentFullText = texts[textIndex] || '';
  const displayedText = currentFullText.slice(0, charIndex);

  useEffect(() => {
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        if (loop) {
          setIsDeleting(true);
        }
      }, pauseTime);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting) {
      if (charIndex > 0) {
        const deleteTimer = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, typingSpeed / 2);
        return () => clearTimeout(deleteTimer);
      } else {
        const resetTimer = setTimeout(() => {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }, 100);
        return () => clearTimeout(resetTimer);
      }
    } else {
      if (charIndex < currentFullText.length) {
        const typeTimer = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
          if (onCharTyped && charIndex % 2 === 0) {
            onCharTyped();
          }
        }, typingSpeed);
        return () => clearTimeout(typeTimer);
      } else {
        const pauseSetTimer = setTimeout(() => {
          setIsPaused(true);
        }, 50);
        return () => clearTimeout(pauseSetTimer);
      }
    }
  }, [charIndex, isDeleting, isPaused, textIndex, currentFullText, typingSpeed, pauseTime, onCharTyped, loop, texts.length]);

  const nextDialogue = useCallback(() => {
    setIsPaused(false);
    setIsDeleting(false);
    setCharIndex(0);
    setTextIndex((prev) => (prev + 1) % texts.length);
  }, [texts.length]);

  return {
    displayedText,
    currentIndex: textIndex,
    isComplete: !loop && charIndex === currentFullText.length,
    nextDialogue,
  };
};
