import { motion } from 'motion/react';
import { useTypingEngine } from '@/stores/useTypingEngine';
import { useEffect, useRef, useState } from 'react';

export function Caret() {
  const cursor = useTypingEngine((state) => state.cursor);
  const status = useTypingEngine((state) => state.status);
  const [position, setPosition] = useState({ top: 0, left: 0, height: 32 });
  const caretRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find the character element at the current cursor index
    const charElement = document.getElementById(`char-${cursor}`);
    if (charElement) {
      const caretHeight = 28;
      
      setPosition({
        top: charElement.offsetTop + (charElement.offsetHeight - caretHeight) / 2,
        left: charElement.offsetLeft,
        height: caretHeight,
      });
    }
  }, [cursor, status]);

  if (status === 'finished') return null;

  return (
    <motion.div
      ref={caretRef}
      className="absolute w-0.5 bg-[color:var(--color-primary)] z-10 rounded-full"
      style={{ height: position.height }}
      initial={false}
      animate={{
        top: position.top,
        left: position.left,
      }}
      transition={{
        type: "spring",
        stiffness: 1000,
        damping: 50,
        mass: 0.5,
      }}
    >
      <motion.div
        className="w-full h-full bg-[color:var(--color-primary)] rounded-full"
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}
