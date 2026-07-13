let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playKeystrokeSound(volume: number = 0.5) {
  if (volume <= 0) return;
  
  try {
    const ctx = getAudioContext();
    
    // Create oscillator and gain node
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Quick "thock" / click sound profile
    // Fast attack, fast decay
    const now = ctx.currentTime;
    
    // Pitch profile: high to low quickly
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.02);
    
    // Volume envelope
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    
    osc.start(now);
    osc.stop(now + 0.05);
    
    // Cleanup
    osc.onended = () => {
      osc.disconnect();
      gainNode.disconnect();
    };
  } catch (err) {
    console.error('Audio play failed:', err);
  }
}
