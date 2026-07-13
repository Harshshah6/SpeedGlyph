import { create } from 'zustand';
import { getRandomWords, getRandomQuote } from '@/lib/dictionary';
import { insertTestResult } from '@/lib/db';

export type TestStatus = 'idle' | 'running' | 'finished';
export type TestMode = 'zen' | 'timed';
export type TextType = 'words' | 'quote';
export type Level = 'easy' | 'medium' | 'hard' | 'custom';

export interface Keystroke {
  expected: string;
  actual: string;
  isCorrect: boolean;
  time: number;
}

const LEVEL_WORD_COUNTS: Record<Level, number> = {
  easy: 15,
  medium: 30,
  hard: 60,
  custom: 40,
};

const TIMED_DURATIONS: Record<Level, number> = {
  easy: 60,
  medium: 30,
  hard: 15,
  custom: 60,
};

function generateText(textType: TextType, level: Level): string {
  if (textType === 'quote') return getRandomQuote();
  return getRandomWords(LEVEL_WORD_COUNTS[level]);
}

interface TypingEngineState {
  status: TestStatus;
  words: string;
  typed: string;
  cursor: number;
  keystrokes: Keystroke[];
  pressedKeys: Set<string>;
  startTime: number | null;
  endTime: number | null;
  
  // Settings
  wordCount: number;
  mode: TestMode;
  textType: TextType;
  level: Level;
  timerDuration: number; // seconds for timed mode
  timeRemaining: number; // seconds remaining in timed mode
  timerInterval: ReturnType<typeof setInterval> | null;

  // Stats
  streak: number;
  bestWpm: number;

  // Actions
  start: () => void;
  reset: () => void;
  setMode: (mode: TestMode) => void;
  setTextType: (type: TextType) => void;
  setLevel: (level: Level) => void;
  handleKeydown: (key: string) => void;
  addPressedKey: (code: string) => void;
  removePressedKey: (code: string) => void;
  tickTimer: () => void;
}

export const useTypingEngine = create<TypingEngineState>((set, get) => ({
  status: 'idle',
  words: getRandomQuote(),
  typed: '',
  cursor: 0,
  keystrokes: [],
  pressedKeys: new Set<string>(),
  startTime: null,
  endTime: null,
  
  wordCount: 30,
  mode: 'zen',
  textType: 'quote',
  level: 'medium',
  timerDuration: 30,
  timeRemaining: 30,
  timerInterval: null,
  
  streak: 0,
  bestWpm: 0,

  start: () => {
    const { mode, level, timerInterval } = get();
    
    // Clear any existing timer
    if (timerInterval) clearInterval(timerInterval);
    
    const duration = TIMED_DURATIONS[level];
    
    if (mode === 'timed') {
      // Start the countdown timer
      const interval = setInterval(() => {
        get().tickTimer();
      }, 1000);
      
      set({
        status: 'running',
        startTime: Date.now(),
        endTime: null,
        keystrokes: [],
        timerDuration: duration,
        timeRemaining: duration,
        timerInterval: interval,
      });
    } else {
      set({
        status: 'running',
        startTime: Date.now(),
        endTime: null,
        keystrokes: [],
      });
    }
  },
  
  tickTimer: () => {
    const { timeRemaining, timerInterval, startTime, keystrokes } = get();
    const newRemaining = timeRemaining - 1;
    
    if (newRemaining <= 0) {
      // Time's up — finish
      if (timerInterval) clearInterval(timerInterval);
      
      const finalEndTime = Date.now();
      const elapsedMinutes = (finalEndTime - (startTime || finalEndTime)) / 60000;
      const correctChars = keystrokes.filter(k => k.isCorrect).length;
      const finalWpm = elapsedMinutes > 0 ? Math.round((correctChars / 5) / elapsedMinutes) : 0;
      const finalAccuracy = keystrokes.length > 0 ? Math.round((correctChars / keystrokes.length) * 100) : 100;
      
      insertTestResult({
        wpm: finalWpm,
        accuracy: finalAccuracy,
        duration: Math.round((finalEndTime - (startTime || finalEndTime)) / 1000),
        wordCount: get().wordCount,
        createdAt: Date.now()
      }).catch(console.error);
      
      set((state) => ({
        status: 'finished',
        endTime: finalEndTime,
        timeRemaining: 0,
        timerInterval: null,
        streak: state.streak + 1,
        bestWpm: Math.max(state.bestWpm, finalWpm),
      }));
    } else {
      set({ timeRemaining: newRemaining });
    }
  },

  reset: () => {
    const { textType, level, timerInterval } = get();
    if (timerInterval) clearInterval(timerInterval);
    
    set(() => ({
      status: 'idle',
      words: generateText(textType, level),
      typed: '',
      cursor: 0,
      keystrokes: [],
      pressedKeys: new Set<string>(),
      startTime: null,
      endTime: null,
      timerInterval: null,
      timeRemaining: TIMED_DURATIONS[level],
    }));
  },

  setMode: (mode) => {
    const { timerInterval, level } = get();
    if (timerInterval) clearInterval(timerInterval);
    
    set(() => ({
      mode,
      status: 'idle',
      typed: '',
      cursor: 0,
      keystrokes: [],
      pressedKeys: new Set<string>(),
      startTime: null,
      endTime: null,
      timerInterval: null,
      timeRemaining: TIMED_DURATIONS[level],
      words: generateText(mode === 'timed' ? 'words' : get().textType, level),
      textType: mode === 'timed' ? 'words' : get().textType,
    }));
  },
  
  setTextType: (textType) => {
    const { level } = get();
    set({
      textType,
      words: generateText(textType, level),
      status: 'idle',
      typed: '',
      cursor: 0,
      keystrokes: [],
      startTime: null,
      endTime: null,
    });
  },
  
  setLevel: (level) => {
    const { textType, timerInterval } = get();
    if (timerInterval) clearInterval(timerInterval);
    
    set(() => ({
      level,
      wordCount: LEVEL_WORD_COUNTS[level],
      words: generateText(textType, level),
      status: 'idle',
      typed: '',
      cursor: 0,
      keystrokes: [],
      pressedKeys: new Set<string>(),
      startTime: null,
      endTime: null,
      timerInterval: null,
      timerDuration: TIMED_DURATIONS[level],
      timeRemaining: TIMED_DURATIONS[level],
    }));
  },

  addPressedKey: (code: string) => {
    set((state) => {
      const newSet = new Set(state.pressedKeys);
      newSet.add(code);
      return { pressedKeys: newSet };
    });
  },

  removePressedKey: (code: string) => {
    set((state) => {
      const newSet = new Set(state.pressedKeys);
      newSet.delete(code);
      return { pressedKeys: newSet };
    });
  },

  handleKeydown: (key: string) => {
    const { status, words, typed, cursor, startTime, keystrokes, mode } = get();

    // Ignore if finished
    if (status === 'finished') return;

    // Start if idle
    if (status === 'idle') {
      get().start();
    }

    // Handle backspace
    if (key === 'Backspace') {
      if (cursor > 0) {
        set({
          typed: typed.slice(0, -1),
          cursor: cursor - 1
        });
      }
      return;
    }

    // Handle typing a character
    if (key.length === 1) {
      const expectedChar = words[cursor];
      if (!expectedChar) return;

      let newTyped = typed;
      let newCursor = cursor;
      let newKeystrokes = keystrokes;
      
      if (expectedChar === ' ' && key !== ' ') {
        // Extra letter in word. Ignore but register mistake.
        newKeystrokes = [...keystrokes, {
          expected: ' ',
          actual: key,
          isCorrect: false,
          time: Date.now() - (startTime || Date.now())
        }];
        set({ keystrokes: newKeystrokes });
        return;
      }
      
      if (key === ' ' && expectedChar !== ' ') {
        // Skipped to next word
        const nextSpace = words.indexOf(' ', cursor);
        if (nextSpace !== -1) {
          const skipCount = nextSpace - cursor;
          newTyped = typed + '\0'.repeat(skipCount) + ' ';
          newCursor = nextSpace + 1;
        } else {
          const skipCount = words.length - cursor;
          newTyped = typed + '\0'.repeat(skipCount);
          newCursor = words.length;
        }
        
        newKeystrokes = [...keystrokes, {
          expected: expectedChar,
          actual: ' ',
          isCorrect: false,
          time: Date.now() - (startTime || Date.now())
        }];
      } else {
        // Normal character
        const isCorrect = key === expectedChar;
        newTyped = typed + key;
        newCursor = cursor + 1;
        newKeystrokes = [...keystrokes, {
          expected: expectedChar,
          actual: key,
          isCorrect,
          time: Date.now() - (startTime || Date.now())
        }];
      }
      
      const isFinished = newCursor >= words.length;

      if (isFinished && mode === 'zen') {
        // Zen mode: finish when text is complete
        const finalEndTime = Date.now();
        const elapsedMinutes = (finalEndTime - (startTime || finalEndTime)) / 60000;
        const correctChars = newKeystrokes.filter(k => k.isCorrect).length;
        const finalWpm = elapsedMinutes > 0 ? Math.round((correctChars / 5) / elapsedMinutes) : 0;
        const finalAccuracy = Math.round((correctChars / newKeystrokes.length) * 100);
        
        insertTestResult({
          wpm: finalWpm,
          accuracy: finalAccuracy,
          duration: Math.round((finalEndTime - (startTime || finalEndTime)) / 1000),
          wordCount: get().wordCount,
          createdAt: Date.now()
        }).catch(console.error);

        set((state) => ({
          typed: newTyped,
          cursor: newCursor,
          keystrokes: newKeystrokes,
          status: 'finished',
          endTime: finalEndTime,
          streak: state.streak + 1,
          bestWpm: Math.max(state.bestWpm, finalWpm)
        }));
      } else if (isFinished && mode === 'timed') {
        // Timed mode: ran out of text, generate more and keep going
        const { level } = get();
        const moreWords = ' ' + getRandomWords(LEVEL_WORD_COUNTS[level]);
        set({
          typed: newTyped,
          cursor: newCursor,
          keystrokes: newKeystrokes,
          words: words + moreWords,
        });
      } else {
        set({
          typed: newTyped,
          cursor: newCursor,
          keystrokes: newKeystrokes
        });
      }
    }
  }
}));
