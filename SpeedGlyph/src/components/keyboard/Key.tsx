import { KeyDef } from '@/lib/keyboardLayouts';
import { useTypingEngine } from '@/stores/useTypingEngine';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { useMemo } from 'react';

const FINGER_COLORS: Record<string, string> = {
  'left-pinky': 'bg-pink-500/20 text-pink-500 border-pink-500/50',
  'left-ring': 'bg-purple-500/20 text-purple-500 border-purple-500/50',
  'left-middle': 'bg-blue-500/20 text-blue-500 border-blue-500/50',
  'left-index': 'bg-cyan-500/20 text-cyan-500 border-cyan-500/50',
  'left-thumb': 'bg-green-500/20 text-green-500 border-green-500/50',
  'right-thumb': 'bg-green-500/20 text-green-500 border-green-500/50',
  'right-index': 'bg-cyan-500/20 text-cyan-500 border-cyan-500/50',
  'right-middle': 'bg-blue-500/20 text-blue-500 border-blue-500/50',
  'right-ring': 'bg-purple-500/20 text-purple-500 border-purple-500/50',
  'right-pinky': 'bg-pink-500/20 text-pink-500 border-pink-500/50',
  'none': 'bg-transparent text-[color:var(--color-muted)] border-[color:var(--color-border)]',
};

interface KeyProps {
  def: KeyDef;
}

export function Key({ def }: KeyProps) {
  const pressedKeys = useTypingEngine((state) => state.pressedKeys);
  const words = useTypingEngine((state) => state.words);
  const cursor = useTypingEngine((state) => state.cursor);
  const status = useTypingEngine((state) => state.status);
  
  const isPressed = pressedKeys.has(def.code);
  
  const isExpected = useMemo(() => {
    if (status !== 'running' && status !== 'idle') return false;
    const expectedChar = words[cursor];
    if (!expectedChar) return false;
    
    // Map expectedChar to Key code loosely
    if (expectedChar === ' ' && def.code === 'Space') return true;
    if (expectedChar.toUpperCase() === def.label.toUpperCase()) return true;
    if (expectedChar === def.shiftLabel) return true;
    
    return false;
  }, [words, cursor, status, def.code, def.label, def.shiftLabel]);

  // Width is relative to a standard key (e.g., 40px)
  // 1 = 40px, 1.25 = 50px, etc. We'll use flex basis or width directly
  
  return (
    <motion.div
      layout
      style={{
        flex: `${def.width} 1 0%`,
      }}
      className={clsx(
        "h-10 rounded-md border flex flex-col justify-center px-2 select-none relative overflow-hidden transition-colors",
        isPressed ? "bg-[color:var(--color-muted)] border-[color:var(--color-foreground)] text-background" : 
        isExpected ? FINGER_COLORS[def.finger] || FINGER_COLORS['none'] :
        "bg-[color:var(--color-background)] border-[color:var(--color-border)] text-[color:var(--color-muted)]"
      )}
      animate={{
        scale: isPressed ? 0.92 : 1,
        y: isPressed ? 2 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 800,
        damping: 30
      }}
    >
      <div className="flex flex-col text-xs font-medium">
        {def.shiftLabel && (
          <span className="opacity-70 text-[10px] absolute top-1 left-2">{def.shiftLabel}</span>
        )}
        <span className={clsx(def.shiftLabel && "mt-3")}>{def.label}</span>
      </div>
    </motion.div>
  );
}
