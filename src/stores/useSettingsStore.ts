import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  soundEnabled: boolean;
  volume: number;
  zenMode: boolean;
  keyboardVisible: boolean;
  
  // Actions
  toggleSound: () => void;
  setVolume: (volume: number) => void;
  toggleZenMode: () => void;
  toggleKeyboard: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      soundEnabled: true,
      volume: 0.5,
      zenMode: false,
      keyboardVisible: true,
      
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      setVolume: (volume: number) => set({ volume }),
      toggleZenMode: () => set((state) => ({ zenMode: !state.zenMode })),
      toggleKeyboard: () => set((state) => ({ keyboardVisible: !state.keyboardVisible })),
    }),
    {
      name: 'keys-settings-storage',
    }
  )
);
