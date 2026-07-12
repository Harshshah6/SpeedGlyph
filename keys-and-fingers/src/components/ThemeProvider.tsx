import React, { useEffect } from 'react';
import { useThemeStore } from '@/stores/useThemeStore';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mode, colorScheme, radius, shadow, border, fontFamily, customColors } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;

    // Mode (Light/Dark)
    root.setAttribute('data-theme', mode);
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Border Radius
    const radiusMap = {
      small: '0.25rem',
      medium: '0.5rem',
      large: '1rem',
      pill: '9999px',
      square: '0px',
    };
    root.style.setProperty('--radius', radiusMap[radius]);

    // Border Width
    const borderMap = {
      thin: '1px',
      medium: '2px',
      thick: '4px',
      brutalist: '3px',
      rounded: '2px',
      square: '1px',
    };
    root.style.setProperty('--border-width', borderMap[border]);

    // Shadow
    const shadowMap = {
      none: 'none',
      soft: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      floating: '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
      'neo-brutalism': '4px 4px 0px 0px rgba(0,0,0,1)',
      material: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    };
    root.style.setProperty('--shadow-custom', shadowMap[shadow]);
    
    if (shadow === 'neo-brutalism' || border === 'brutalist') {
       if (mode === 'dark') {
         root.style.setProperty('--shadow-custom', '4px 4px 0px 0px rgba(255,255,255,1)');
       }
    }

    // Typography
    const fontMap = {
      'Inter': '"Inter", sans-serif',
      'Geist': '"Geist", sans-serif',
      'JetBrains Mono': '"JetBrains Mono", monospace',
      'Cascadia': '"Cascadia Code", monospace',
      'IBM Plex': '"IBM Plex Mono", monospace',
      'Fira Code': '"Fira Code", monospace',
      'Roboto Mono': '"Roboto Mono", monospace',
    };
    root.style.setProperty('--font-family', fontMap[fontFamily]);
    root.style.fontFamily = fontMap[fontFamily];

    // Custom Colors (if provided)
    if (customColors) {
      Object.entries(customColors).forEach(([key, value]) => {
        if (value) root.style.setProperty(`--${key}`, value);
      });
    } else if (colorScheme === 'neo') {
      if (mode === 'light') {
        root.style.setProperty('--background', '#ffffff');
        root.style.setProperty('--surface', '#f4f4f4');
        root.style.setProperty('--border', '#000000');
        root.style.setProperty('--text', '#000000');
        root.style.setProperty('--muted', '#666666');
        root.style.setProperty('--accent', '#ff00ff'); // bright magenta
        root.style.setProperty('--success', '#00ff00');
        root.style.setProperty('--warning', '#ffff00');
        root.style.setProperty('--danger', '#ff0000');
      } else {
        root.style.setProperty('--background', '#000000');
        root.style.setProperty('--surface', '#111111');
        root.style.setProperty('--border', '#ffffff');
        root.style.setProperty('--text', '#ffffff');
        root.style.setProperty('--muted', '#aaaaaa');
        root.style.setProperty('--accent', '#00ffff'); // bright cyan
        root.style.setProperty('--success', '#00ff00');
        root.style.setProperty('--warning', '#ffff00');
        root.style.setProperty('--danger', '#ff0000');
      }
    } else if (colorScheme === 'pastel') {
      if (mode === 'light') {
        root.style.setProperty('--background', '#fdf6e3');
        root.style.setProperty('--surface', '#fffbf0');
        root.style.setProperty('--border', '#e0d8c3');
        root.style.setProperty('--text', '#5c544b');
        root.style.setProperty('--muted', '#9e9587');
        root.style.setProperty('--accent', '#ffb3ba');
        root.style.setProperty('--success', '#baffc9');
        root.style.setProperty('--warning', '#ffffba');
        root.style.setProperty('--danger', '#ffdfba');
      } else {
        root.style.setProperty('--background', '#2c2826');
        root.style.setProperty('--surface', '#3a3431');
        root.style.setProperty('--border', '#5c544b');
        root.style.setProperty('--text', '#fdf6e3');
        root.style.setProperty('--muted', '#a69e94');
        root.style.setProperty('--accent', '#d69fa5');
        root.style.setProperty('--success', '#9ecfb0');
        root.style.setProperty('--warning', '#d4d49a');
        root.style.setProperty('--danger', '#d9b998');
      }
    } else {
      // Remove custom overrides so default CSS applies
      ['background', 'surface', 'border', 'text', 'muted', 'accent', 'success', 'warning', 'danger'].forEach(key => {
        root.style.removeProperty(`--${key}`);
      });
    }
  }, [mode, colorScheme, radius, shadow, border, fontFamily, customColors]);

  return <>{children}</>;
};
