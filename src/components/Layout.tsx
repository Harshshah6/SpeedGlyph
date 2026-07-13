import React from 'react';
import { Titlebar } from './Titlebar';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <div className="flex flex-col h-screen overflow-hidden text-[color:var(--color-text)] bg-[color:var(--color-background)] selection:bg-[color:var(--color-accent)] selection:text-white transition-colors duration-300">
      <Titlebar />
      <main className="flex-1 overflow-auto relative">
        <div className="mx-auto max-w-7xl p-6 h-full">
          {children}
        </div>
      </main>
    </div>
  );
};
