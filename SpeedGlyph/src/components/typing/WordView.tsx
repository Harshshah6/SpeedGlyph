import { useTypingEngine } from '@/stores/useTypingEngine';
import clsx from 'clsx';
import { useMemo, memo } from 'react';

const WordToken = memo(({ 
  token, 
  typed, 
  cursor 
}: { 
  token: { chars: { char: string; index: number }[] }; 
  typed: string; 
  cursor: number; 
}) => {
  return (
    <div className="flex">
      {token.chars.map((c) => {
        const typedChar = typed[c.index];
        let state = 'pending';
        
        if (typedChar !== undefined) {
          if (typedChar === '\0') {
            state = 'omitted';
          } else {
            state = typedChar === c.char ? 'correct' : 'incorrect';
          }
        }

        return (
          <span
            key={c.index}
            id={`char-${c.index}`}
            className={clsx(
              "relative inline-block transition-colors duration-100 font-mono",
              state === 'pending' && "text-[color:var(--color-muted)]",
              state === 'correct' && "text-[color:var(--color-text)]",
              state === 'incorrect' && "text-[color:var(--color-danger)]",
              state === 'omitted' && "text-[color:var(--color-danger)] opacity-50"
            )}
          >
            {c.char === ' ' ? (
              <span className="inline-block w-[1ch]">&nbsp;</span>
            ) : (
              c.char
            )}
          </span>
        );
      })}
    </div>
  );
});

export function WordView() {
  const words = useTypingEngine((state) => state.words);
  const typed = useTypingEngine((state) => state.typed);
  const cursor = useTypingEngine((state) => state.cursor);
  
  // We split the words by spaces to render them grouped,
  // but we maintain the global character index for ID mapping.
  
  const wordTokens = useMemo(() => {
    const tokens: { chars: { char: string; index: number }[] }[] = [];
    let globalIndex = 0;
    
    const parts = words.split(' ');
    parts.forEach((word, wordIdx) => {
      const chars = [];
      for (let i = 0; i < word.length; i++) {
        chars.push({ char: word[i], index: globalIndex });
        globalIndex++;
      }
      
      // Add space if it's not the last word
      if (wordIdx < parts.length - 1) {
        chars.push({ char: ' ', index: globalIndex });
        globalIndex++;
      }
      tokens.push({ chars });
    });
    
    return tokens;
  }, [words]);

  return (
    <div className="flex flex-wrap text-2xl font-medium tracking-wide text-[color:var(--color-muted)] w-full text-left leading-relaxed">
      {wordTokens.map((token, wIdx) => (
        <WordToken key={wIdx} token={token} typed={typed} cursor={cursor} />
      ))}
    </div>
  );
}
