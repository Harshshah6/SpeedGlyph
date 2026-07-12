import { useTypingEngine } from "@/stores/useTypingEngine";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { Zap, Target, Clock, Flame, Trophy } from "lucide-react";

export function Sidebar() {
  const { 
    level, setLevel, mode, setMode, 
    status, keystrokes, startTime, endTime, 
    streak, bestWpm, cursor, words,
    timeRemaining
  } = useTypingEngine();

  const [liveTime, setLiveTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'running') {
      interval = setInterval(() => {
        setLiveTime(Date.now() - (startTime || Date.now()));
      }, 1000);
    } else if (status === 'finished') {
      setLiveTime((endTime || Date.now()) - (startTime || Date.now()));
    } else {
      setLiveTime(0);
    }
    return () => clearInterval(interval);
  }, [status, startTime, endTime]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const correctChars = keystrokes.filter(k => k.isCorrect).length;
  const accuracy = keystrokes.length > 0 ? Math.round((correctChars / keystrokes.length) * 100) : 100;
  
  const elapsedMinutes = liveTime / 60000;
  const currentWpm = elapsedMinutes > 0 ? Math.round((correctChars / 5) / elapsedMinutes) : 0;
  
  const progressPercent = words.length > 0 ? Math.round((cursor / words.length) * 100) : 0;

  return (
    <div className="flex flex-col w-64 gap-4 p-4 h-full justify-between">
      
      <div className="flex flex-col gap-4">
        {/* Level Section */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold tracking-widest text-[color:var(--color-muted)] uppercase">Level</span>
          <div className="grid grid-cols-2 gap-1.5">
            <Button variant={level === 'easy' ? 'default' : 'outline'} size="sm" onClick={() => setLevel('easy')} className="text-xs h-7">Easy</Button>
            <Button variant={level === 'medium' ? 'default' : 'outline'} size="sm" onClick={() => setLevel('medium')} className="text-xs h-7">Medium</Button>
            <Button variant={level === 'hard' ? 'default' : 'outline'} size="sm" onClick={() => setLevel('hard')} className="text-xs h-7">Hard</Button>
            <Button variant={level === 'custom' ? 'default' : 'outline'} size="sm" onClick={() => setLevel('custom')} className="text-xs h-7">Custom</Button>
          </div>
        </div>

        {/* Mode Section */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold tracking-widest text-[color:var(--color-muted)] uppercase">Mode</span>
          <div className="grid grid-cols-2 gap-1.5">
            <Button variant={mode === 'zen' ? 'default' : 'outline'} size="sm" onClick={() => setMode('zen')} className="text-xs h-7">Zen</Button>
            <Button variant={mode === 'timed' ? 'default' : 'outline'} size="sm" onClick={() => setMode('timed')} className="text-xs h-7">Timed</Button>
          </div>
        </div>

        {/* Progress Section */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-bold tracking-widest text-[color:var(--color-muted)] uppercase">Progress</span>
            <span className="text-xs font-bold">{progressPercent}%</span>
          </div>
          <div className="h-1.5 w-full bg-[color:var(--color-border)] rounded-full overflow-hidden mt-0.5">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 mt-auto pb-2">
        
        {/* WPM */}
        <div className="flex flex-col p-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)] gap-1">
          <div className="flex items-center text-[color:var(--color-muted)] gap-1 text-[10px] font-bold tracking-widest uppercase">
            <Zap className="w-3 h-3" /> WPM
          </div>
          <div className="text-2xl font-bold font-mono">{currentWpm}</div>
        </div>
        
        {/* ACCURACY */}
        <div className="flex flex-col p-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)] gap-1">
          <div className="flex items-center text-[color:var(--color-muted)] gap-1 text-[10px] font-bold tracking-widest uppercase">
            <Target className="w-3 h-3" /> Accuracy
          </div>
          <div className="text-2xl font-bold font-mono">{accuracy}%</div>
        </div>

        {/* TIME */}
        <div className="flex flex-col p-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)] gap-1">
          <div className="flex items-center text-[color:var(--color-muted)] gap-1 text-[10px] font-bold tracking-widest uppercase">
            <Clock className="w-3 h-3" /> {mode === 'timed' ? 'Left' : 'Time'}
          </div>
          <div className="text-2xl font-bold font-mono">{mode === 'timed' ? formatTime(timeRemaining * 1000) : formatTime(liveTime)}</div>
        </div>

        {/* STREAK */}
        <div className="flex flex-col p-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)] gap-1">
          <div className="flex items-center text-[color:var(--color-muted)] gap-1 text-[10px] font-bold tracking-widest uppercase">
            <Flame className="w-3 h-3" /> Streak
          </div>
          <div className="text-2xl font-bold font-mono">{streak}</div>
        </div>

        {/* BEST WPM */}
        <div className="flex flex-col p-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)] gap-1 col-span-2">
          <div className="flex items-center text-[color:var(--color-muted)] gap-1 text-[10px] font-bold tracking-widest uppercase">
            <Trophy className="w-3 h-3" /> Best WPM
          </div>
          <div className="text-2xl font-bold font-mono">{bestWpm}</div>
        </div>

      </div>
    </div>
  );
}
