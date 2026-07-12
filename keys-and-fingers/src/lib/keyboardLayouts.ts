export type Finger = 
  | 'left-pinky' | 'left-ring' | 'left-middle' | 'left-index' | 'left-thumb'
  | 'right-thumb' | 'right-index' | 'right-middle' | 'right-ring' | 'right-pinky'
  | 'none';

export interface KeyDef {
  code: string; // The event.code, e.g., 'KeyA'
  label: string; // The primary display label
  shiftLabel?: string; // The secondary display label when shift is held
  width: number; // Width relative to a standard key (1)
  finger: Finger;
}

export const ANSI_60: KeyDef[][] = [
  // Row 1 (Numbers)
  [
    { code: 'Backquote', label: '`', shiftLabel: '~', width: 1, finger: 'left-pinky' },
    { code: 'Digit1', label: '1', shiftLabel: '!', width: 1, finger: 'left-pinky' },
    { code: 'Digit2', label: '2', shiftLabel: '@', width: 1, finger: 'left-ring' },
    { code: 'Digit3', label: '3', shiftLabel: '#', width: 1, finger: 'left-middle' },
    { code: 'Digit4', label: '4', shiftLabel: '$', width: 1, finger: 'left-index' },
    { code: 'Digit5', label: '5', shiftLabel: '%', width: 1, finger: 'left-index' },
    { code: 'Digit6', label: '6', shiftLabel: '^', width: 1, finger: 'right-index' },
    { code: 'Digit7', label: '7', shiftLabel: '&', width: 1, finger: 'right-index' },
    { code: 'Digit8', label: '8', shiftLabel: '*', width: 1, finger: 'right-middle' },
    { code: 'Digit9', label: '9', shiftLabel: '(', width: 1, finger: 'right-ring' },
    { code: 'Digit0', label: '0', shiftLabel: ')', width: 1, finger: 'right-pinky' },
    { code: 'Minus', label: '-', shiftLabel: '_', width: 1, finger: 'right-pinky' },
    { code: 'Equal', label: '=', shiftLabel: '+', width: 1, finger: 'right-pinky' },
    { code: 'Backspace', label: 'Backspace', width: 2, finger: 'right-pinky' },
  ],
  // Row 2 (QWERTY)
  [
    { code: 'Tab', label: 'Tab', width: 1.5, finger: 'left-pinky' },
    { code: 'KeyQ', label: 'Q', width: 1, finger: 'left-pinky' },
    { code: 'KeyW', label: 'W', width: 1, finger: 'left-ring' },
    { code: 'KeyE', label: 'E', width: 1, finger: 'left-middle' },
    { code: 'KeyR', label: 'R', width: 1, finger: 'left-index' },
    { code: 'KeyT', label: 'T', width: 1, finger: 'left-index' },
    { code: 'KeyY', label: 'Y', width: 1, finger: 'right-index' },
    { code: 'KeyU', label: 'U', width: 1, finger: 'right-index' },
    { code: 'KeyI', label: 'I', width: 1, finger: 'right-middle' },
    { code: 'KeyO', label: 'O', width: 1, finger: 'right-ring' },
    { code: 'KeyP', label: 'P', width: 1, finger: 'right-pinky' },
    { code: 'BracketLeft', label: '[', shiftLabel: '{', width: 1, finger: 'right-pinky' },
    { code: 'BracketRight', label: ']', shiftLabel: '}', width: 1, finger: 'right-pinky' },
    { code: 'Backslash', label: '\\', shiftLabel: '|', width: 1.5, finger: 'right-pinky' },
  ],
  // Row 3 (ASDF)
  [
    { code: 'CapsLock', label: 'Caps', width: 1.75, finger: 'left-pinky' },
    { code: 'KeyA', label: 'A', width: 1, finger: 'left-pinky' },
    { code: 'KeyS', label: 'S', width: 1, finger: 'left-ring' },
    { code: 'KeyD', label: 'D', width: 1, finger: 'left-middle' },
    { code: 'KeyF', label: 'F', width: 1, finger: 'left-index' },
    { code: 'KeyG', label: 'G', width: 1, finger: 'left-index' },
    { code: 'KeyH', label: 'H', width: 1, finger: 'right-index' },
    { code: 'KeyJ', label: 'J', width: 1, finger: 'right-index' },
    { code: 'KeyK', label: 'K', width: 1, finger: 'right-middle' },
    { code: 'KeyL', label: 'L', width: 1, finger: 'right-ring' },
    { code: 'Semicolon', label: ';', shiftLabel: ':', width: 1, finger: 'right-pinky' },
    { code: 'Quote', label: '\'', shiftLabel: '"', width: 1, finger: 'right-pinky' },
    { code: 'Enter', label: 'Enter', width: 2.25, finger: 'right-pinky' },
  ],
  // Row 4 (ZXCV)
  [
    { code: 'ShiftLeft', label: 'Shift', width: 2.25, finger: 'left-pinky' },
    { code: 'KeyZ', label: 'Z', width: 1, finger: 'left-pinky' },
    { code: 'KeyX', label: 'X', width: 1, finger: 'left-ring' },
    { code: 'KeyC', label: 'C', width: 1, finger: 'left-middle' },
    { code: 'KeyV', label: 'V', width: 1, finger: 'left-index' },
    { code: 'KeyB', label: 'B', width: 1, finger: 'left-index' },
    { code: 'KeyN', label: 'N', width: 1, finger: 'right-index' },
    { code: 'KeyM', label: 'M', width: 1, finger: 'right-index' },
    { code: 'Comma', label: ',', shiftLabel: '<', width: 1, finger: 'right-middle' },
    { code: 'Period', label: '.', shiftLabel: '>', width: 1, finger: 'right-ring' },
    { code: 'Slash', label: '/', shiftLabel: '?', width: 1, finger: 'right-pinky' },
    { code: 'ShiftRight', label: 'Shift', width: 2.75, finger: 'right-pinky' },
  ],
  // Row 5 (Spacebar row)
  [
    { code: 'ControlLeft', label: 'Ctrl', width: 1.25, finger: 'left-pinky' },
    { code: 'MetaLeft', label: 'Win', width: 1.25, finger: 'left-thumb' },
    { code: 'AltLeft', label: 'Alt', width: 1.25, finger: 'left-thumb' },
    { code: 'Space', label: '', width: 6.25, finger: 'right-thumb' },
    { code: 'AltRight', label: 'Alt', width: 1.25, finger: 'right-thumb' },
    { code: 'MetaRight', label: 'Win', width: 1.25, finger: 'right-thumb' },
    { code: 'ContextMenu', label: 'Menu', width: 1.25, finger: 'right-pinky' },
    { code: 'ControlRight', label: 'Ctrl', width: 1.25, finger: 'right-pinky' },
  ]
];
