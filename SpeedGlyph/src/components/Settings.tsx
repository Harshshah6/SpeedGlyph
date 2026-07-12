import { useThemeStore, ColorScheme } from "@/stores/useThemeStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function Settings() {
  const { mode, setMode, colorScheme, setColorScheme } = useThemeStore();
  const { soundEnabled, toggleSound, volume, setVolume, zenMode, toggleZenMode, keyboardVisible, toggleKeyboard } = useSettingsStore();

  const colorSchemeOptions: ColorScheme[] = ['default', 'neo', 'pastel', 'moon', 'evil', 'cute', 'coffee', 'ocean', 'forest', 'inferno', 'royal', 'frost', 'cyber'];

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-300">
      
      <Card>
        <CardHeader>
          <CardTitle>Behavior & Audio</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Keystroke Sounds</div>
              <div className="text-sm text-[color:var(--color-muted)]">Play a synthesized click on every keystroke</div>
            </div>
            <Button variant={soundEnabled ? 'default' : 'outline'} onClick={toggleSound}>
              {soundEnabled ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
          
          {soundEnabled && (
            <div className="flex flex-col gap-2">
              <span className="font-medium text-sm">Volume</span>
              <input 
                type="range" 
                min="0" max="1" step="0.1" 
                value={volume} 
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full max-w-xs cursor-pointer accent-primary"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Zen Mode</div>
              <div className="text-sm text-[color:var(--color-muted)]">Hide all UI elements while typing</div>
            </div>
            <Button variant={zenMode ? 'default' : 'outline'} onClick={toggleZenMode}>
              {zenMode ? 'Enabled' : 'Disabled'}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Virtual Keyboard</div>
              <div className="text-sm text-[color:var(--color-muted)]">Show the interactive keyboard below the text</div>
            </div>
            <Button variant={keyboardVisible ? 'default' : 'outline'} onClick={toggleKeyboard}>
              {keyboardVisible ? 'Visible' : 'Hidden'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          
          <div className="flex items-center justify-between">
            <span className="font-medium">Mode</span>
            <Button variant="outline" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
              Toggle {mode === 'light' ? 'Dark' : 'Light'} Mode
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-medium text-sm">Color Scheme</span>
            <div className="flex gap-2 flex-wrap">
              {colorSchemeOptions.map(scheme => (
                <Button key={scheme} variant={colorScheme === scheme ? 'accent' : 'outline'} size="sm" onClick={() => setColorScheme(scheme)} className="capitalize">
                  {scheme}
                </Button>
              ))}
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  );
}
