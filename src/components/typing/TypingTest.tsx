import { useEffect, useRef, useMemo } from 'react';
import { useTypingEngine } from '@/stores/useTypingEngine';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { WordView } from './WordView';
import { Caret } from './Caret';
import { Keyboard } from '@/components/keyboard/Keyboard';
import { Button } from '@/components/ui/Button';
import { RotateCcw, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playKeystrokeSound } from '@/lib/audio';

export function TypingTest() {
  const { status, keystrokes, startTime, endTime, handleKeydown, addPressedKey, removePressedKey, reset, level, wordCount, textType, mode, timeRemaining } = useTypingEngine();
  const { soundEnabled, volume, zenMode, keyboardVisible } = useSettingsStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus the container automatically so we can listen to key events without a visible input
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [status]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Prevent default scrolling for Space
    if (e.key === ' ' || e.key === 'Backspace') {
      e.preventDefault();
    }
    
    // Track physical key press
    addPressedKey(e.code);

    // Ignore modifiers and command keys for the typing logic
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    
    if (soundEnabled && e.key.length === 1) {
      playKeystrokeSound(volume);
    }

    handleKeydown(e.key);
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    removePressedKey(e.code);
  };

  // Calculate stats
  const stats = useMemo(() => {
    if (keystrokes.length === 0) return { wpm: 0, accuracy: 100 };
    
    const timeToUse = endTime ? endTime : Date.now();
    const elapsedMinutes = (timeToUse - (startTime || timeToUse)) / 60000;
    
    const correctChars = keystrokes.filter(k => k.isCorrect).length;
    const wpm = elapsedMinutes > 0 ? Math.round((correctChars / 5) / elapsedMinutes) : 0;
    
    const accuracy = Math.round((correctChars / keystrokes.length) * 100);
    
    return { wpm, accuracy };
  }, [keystrokes, startTime, endTime]);

  const isZenModeActive = zenMode && status === 'running';

  return (
    <div 
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      className="typing-container relative w-full flex flex-col outline-none mt-4"
    >
      
      {/* Top Bar for Mode/Next */}
      <div className={`flex justify-between items-center mb-4 transition-opacity duration-500 ${isZenModeActive ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-[color:var(--color-primary)] text-white text-xs font-bold uppercase rounded-sm">
            {level}
          </span>
          <span className="px-3 py-1 bg-[color:var(--color-surface)] border border-[color:var(--color-border)] text-[color:var(--color-muted)] text-xs font-bold rounded-sm">
            {mode === 'timed' ? `${timeRemaining}s` : (textType === 'words' ? `${wordCount} words` : 'quote')}
          </span>
          <span className="px-3 py-1 bg-[color:var(--color-surface)] border border-[color:var(--color-border)] text-[color:var(--color-muted)] text-xs font-bold rounded-sm capitalize">
            {mode}
          </span>
        </div>
        
        <Button variant="outline" size="sm" onClick={() => { reset(); containerRef.current?.focus(); }} className="text-xs h-8">
          <ChevronRight className="w-3.5 h-3.5 mr-1" /> Next
        </Button>
      </div>

      {/* Typing Area */}
      <div className={`relative overflow-hidden p-8 min-h-[200px] text-left cursor-text border border-[color:var(--color-border)] rounded-lg bg-[color:var(--color-card)] transition-colors duration-500 ${isZenModeActive ? 'border-transparent bg-transparent' : ''}`} onClick={() => containerRef.current?.focus()}>
        <WordView />
        <Caret />
      </div>

      {/* Virtual Keyboard */}
      <div className={`flex justify-center transition-all duration-500 overflow-hidden ${keyboardVisible && !isZenModeActive ? 'opacity-100 max-h-[400px] mt-8' : 'opacity-0 max-h-0 mt-0 pointer-events-none'}`}>
        <Keyboard />
      </div>

      {/* End Screen Overlay */}
      <AnimatePresence>
        {status === 'finished' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm rounded-xl border border-[color:var(--color-border)] p-8"
          >
            <h2 className="text-3xl font-bold mb-8 tracking-tight">Test Complete</h2>
            <div className="flex gap-16">
              <div className="flex flex-col items-center">
                <span className="text-6xl font-bold text-primary">{stats.wpm}</span>
                <span className="text-sm uppercase tracking-widest text-[color:var(--color-muted)] mt-2">WPM</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-6xl font-bold text-primary">{stats.accuracy}%</span>
                <span className="text-sm uppercase tracking-widest text-[color:var(--color-muted)] mt-2">Accuracy</span>
              </div>
            </div>
            
            <div className="mt-12 flex gap-4">
              <Button onClick={() => { reset(); containerRef.current?.focus(); }} size="lg">
                <RotateCcw className="w-4 h-4 mr-2" /> Restart
              </Button>
              <Button variant="outline" onClick={() => { reset(); containerRef.current?.focus(); }} size="lg">
                <ChevronRight className="w-4 h-4 mr-2" /> Next Test
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
