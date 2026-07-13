import { useState, useEffect } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { X, Minus, Square } from 'lucide-react';
import logoImg from '@/assets/logo.png';

const appWindow = getCurrentWindow();

export const Titlebar = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const checkMaximized = async () => {
      setIsMaximized(await appWindow.isMaximized());
    };
    checkMaximized();

    const unlisten = appWindow.onResized(() => {
      checkMaximized();
    });

    return () => {
      unlisten.then(f => f());
    };
  }, []);

  return (
    <div 
      data-tauri-drag-region
      className="h-10 flex select-none justify-between items-center px-2 z-50 sticky top-0"
    >
      {/* Window Controls (Left side for Mac, Right side for Windows - we'll just put them on right for now, but user requested 'Apple Human Interface' & 'Windows 11' vibes, so maybe left side like Arc? Let's put them on the right for Windows default feel) */}
      
      <div className="flex-1 flex items-center gap-2 pointer-events-none px-2 text-sm font-semibold text-[color:var(--color-muted)]">
        <img src={logoImg} alt="logo" className="w-4 h-4 rounded-sm" /> SpeedGlyph
      </div>

      <div className="flex items-center gap-1">
        <button 
          onClick={() => appWindow.minimize()}
          className="w-8 h-8 flex items-center justify-center hover:bg-[color:var(--color-border)] rounded-md transition-colors text-[color:var(--color-muted)] hover:text-[color:var(--color-text)]"
        >
          <Minus size={16} />
        </button>
        <button 
          onClick={() => appWindow.toggleMaximize()}
          className="w-8 h-8 flex items-center justify-center hover:bg-[color:var(--color-border)] rounded-md transition-colors text-[color:var(--color-muted)] hover:text-[color:var(--color-text)]"
        >
          <Square size={14} className={isMaximized ? "opacity-50" : ""} />
        </button>
        <button 
          onClick={() => appWindow.close()}
          className="w-8 h-8 flex items-center justify-center hover:bg-[color:var(--color-danger)] hover:text-white rounded-md transition-colors text-[color:var(--color-muted)]"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
