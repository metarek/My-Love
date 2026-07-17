import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number; // duration per letter in seconds
}

export default function TypewriterText({ text, className = "", delay = 0, speed = 0.05 }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let isMounted = true;
    let timerId: NodeJS.Timeout;

    // Reset displayed text on text change
    setDisplayedText("");

    const startDelay = setTimeout(() => {
      if (!isMounted) return;

      let currentIndex = 0;
      const intervalMs = speed * 1000;

      const tick = () => {
        if (!isMounted) return;

        if (currentIndex <= text.length) {
          setDisplayedText(text.substring(0, currentIndex));
          currentIndex++;
          timerId = setTimeout(tick, intervalMs);
        }
      };

      tick();
    }, delay * 1000);

    return () => {
      isMounted = false;
      clearTimeout(startDelay);
      clearTimeout(timerId);
    };
  }, [text, delay, speed]);

  return (
    <span className={`relative inline-block ${className}`}>
      {displayedText}
      
      {/* Cinematic Typing Pulse vertical bar cursor */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        className="inline-block w-2.5 h-[1.1em] ml-1 bg-rose-pink-400 shadow-[0_0_8px_#ff4d6d]"
        style={{ verticalAlign: "middle" }}
      />
    </span>
  );
}
