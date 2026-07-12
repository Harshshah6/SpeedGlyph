import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Radius = 'small' | 'medium' | 'large' | 'pill' | 'square';
export type Shadow = 'none' | 'soft' | 'floating' | 'neo-brutalism' | 'material';
export type Border = 'thin' | 'medium' | 'thick' | 'brutalist' | 'rounded' | 'square';
export type FontFamily = 'Inter' | 'Geist' | 'JetBrains Mono' | 'Cascadia' | 'IBM Plex' | 'Fira Code' | 'Roboto Mono';
export type ColorScheme = 'default' | 'neo' | 'pastel';

export interface ThemeState {
  mode: 'light' | 'dark';
  colorScheme: ColorScheme;
  radius: Radius;
  shadow: Shadow;
  border: Border;
  fontFamily: FontFamily;
  
  // Custom colors (if overridden)
  customColors?: {
    background?: string;
    surface?: string;
    border?: string;
    text?: string;
    muted?: string;
    accent?: string;
    success?: string;
    warning?: string;
    danger?: string;
  };

  setMode: (mode: 'light' | 'dark') => void;
  setColorScheme: (scheme: ColorScheme) => void;
  setRadius: (radius: Radius) => void;
  setShadow: (shadow: Shadow) => void;
  setBorder: (border: Border) => void;
  setFontFamily: (font: FontFamily) => void;
  setCustomColors: (colors: ThemeState['customColors']) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'light',
      colorScheme: 'neo',
      radius: 'square',
      shadow: 'neo-brutalism',
      border: 'brutalist',
      fontFamily: 'Inter',
      customColors: undefined,

      setMode: (mode) => set({ mode }),
      setColorScheme: (colorScheme) => set({ colorScheme }),
      setRadius: (radius) => set({ radius }),
      setShadow: (shadow) => set({ shadow }),
      setBorder: (border) => set({ border }),
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setCustomColors: (customColors) => set({ customColors }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
