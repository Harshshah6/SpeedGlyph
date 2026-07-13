import { useState, useEffect } from "react";
import { useThemeStore } from "@/stores/useThemeStore";
import { Button } from "@/components/ui/Button";
import { TypingTest } from "@/components/typing/TypingTest";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Settings } from "@/components/Settings";
import { Sidebar } from "@/components/Sidebar";
import { Titlebar } from "@/components/Titlebar";
import { getDb } from "@/lib/db";
import { Keyboard, History, Moon, Settings as SettingsIcon, X } from "lucide-react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { useTypingEngine } from "@/stores/useTypingEngine";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "@/assets/logo.png";

function App() {
  const [activeTab, setActiveTab] = useState<'practice' | 'dashboard'>('practice');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { zenMode } = useSettingsStore();
  const { status, reset } = useTypingEngine();
  const { mode, setMode } = useThemeStore();

  // Initialize DB on app load
  useEffect(() => {
    getDb().catch(console.error);
  }, []);

  // Global ESC listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isSettingsOpen) {
          setIsSettingsOpen(false);
        } else if (activeTab !== 'practice') {
          setActiveTab('practice');
        } else {
          reset();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSettingsOpen, activeTab, reset]);

  const isZenModeActive = zenMode && status === 'running' && activeTab === 'practice';

  return (
    <div className="h-screen w-screen flex flex-col bg-[color:var(--color-background)] text-[color:var(--color-text)] overflow-hidden font-sans select-none">
      
      {/* Titlebar with window controls */}
      <Titlebar />

      {/* Header */}
      <header className={`flex justify-between items-center px-6 py-3 border-b border-[color:var(--color-border)] transition-opacity duration-500 ${isZenModeActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('practice')}>
          <img src={logoImg} alt="SpeedGlyph Logo" className="w-8 h-8 rounded-md shadow-sm" />
          <h1 className="text-xl font-bold tracking-tight font-serif italic">SpeedGlyph</h1>
        </div>
        
        <div className="flex gap-1">
          <Button variant={activeTab === 'practice' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTab('practice')} className="text-xs h-8">
            <Keyboard className="w-3.5 h-3.5 mr-2" /> Practice
          </Button>
          <Button variant={activeTab === 'dashboard' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTab('dashboard')} className="text-xs h-8">
            <History className="w-3.5 h-3.5 mr-2" /> History
          </Button>
          <div className="w-px h-6 bg-[color:var(--color-border)] mx-1 self-center" />
          <Button variant="ghost" size="sm" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} className="text-xs h-8">
            <Moon className="w-3.5 h-3.5 mr-2" /> {mode === 'light' ? 'Dark' : 'Light'}
          </Button>
          <Button variant={isSettingsOpen ? 'default' : 'ghost'} size="sm" onClick={() => setIsSettingsOpen(true)} className="text-xs h-8">
            <SettingsIcon className="w-3.5 h-3.5 mr-2" /> Settings
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Left Sidebar — only on practice tab */}
        {activeTab === 'practice' && (
          <div className={`transition-opacity duration-500 border-r border-[color:var(--color-border)] ${isZenModeActive ? 'opacity-0 w-0 border-none' : 'opacity-100 w-64 flex-shrink-0'} overflow-hidden hidden md:flex flex-col`}>
            <Sidebar />
          </div>
        )}

        {/* Right Content */}
        <div className="flex-1 flex flex-col p-6 overflow-y-auto items-center">
          <div className="w-full max-w-4xl transition-all duration-500">
            {activeTab === 'practice' && <TypingTest />}
            {activeTab === 'dashboard' && <Dashboard />}
          </div>
        </div>

        {/* Settings Slide-over Overlay */}
        <AnimatePresence>
          {isSettingsOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[color:var(--color-background)]/50 backdrop-blur-sm z-40"
                onClick={() => setIsSettingsOpen(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute right-0 top-0 bottom-0 w-96 bg-[color:var(--color-surface)] border-l border-[color:var(--color-border)] shadow-2xl z-50 overflow-y-auto flex flex-col"
              >
                <div className="flex justify-between items-center p-6 border-b border-[color:var(--color-border)]">
                  <h2 className="text-xl font-bold font-serif">Settings</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsSettingsOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <div className="p-6 flex-1">
                  <Settings />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>

      {/* Footer */}
      <footer className={`flex justify-between items-center px-6 py-2 border-t border-[color:var(--color-border)] text-[color:var(--color-muted)] text-xs transition-opacity duration-500 ${isZenModeActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="font-serif italic">SpeedGlyph © 2026</div>
        <div className="flex gap-4">
          <span>esc — reset</span>
          <span>v0.1.0</span>
        </div>
      </footer>

    </div>
  );
}

export default App;
