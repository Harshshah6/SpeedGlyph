import { ANSI_60 } from '@/lib/keyboardLayouts';
import { Key } from './Key';

export function Keyboard() {
  return (
    <div className="flex flex-col gap-1.5 p-4 bg-[color:var(--color-surface)] rounded-xl border border-[color:var(--color-border)] w-full">
      {ANSI_60.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1.5">
          {row.map((keyDef) => (
            <Key key={keyDef.code} def={keyDef} />
          ))}
        </div>
      ))}
    </div>
  );
}
