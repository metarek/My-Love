import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX, Sparkles } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [chimeEnabled, setChimeEnabled] = useState(true);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const backgroundLoopTimerRef = useRef<number | null>(null);
  const delayNodeRef = useRef<DelayNode | null>(null);
  const synthVolumeRef = useRef<GainNode | null>(null);

  // Initialize Web Audio API on first user interaction
  const initAudio = () => {
    if (audioContextRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      // Create a global feedback delay for lush, cathedral-like reverb
      const delay = ctx.createDelay(1.0);
      delay.delayTime.value = 0.6; // 600ms delay

      const feedback = ctx.createGain();
      feedback.gain.value = 0.4; // feedback amount

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 800; // soft high cut

      // Connect delay loop
      delay.connect(filter);
      filter.connect(feedback);
      feedback.connect(delay);

      // Main volume for synthesizer
      const mainVolume = ctx.createGain();
      mainVolume.gain.value = 0.15; // Soft volume

      // Connections: Synth Node -> mainVolume -> Destination & Delay
      mainVolume.connect(ctx.destination);
      delay.connect(ctx.destination);
      mainVolume.connect(delay);

      delayNodeRef.current = delay;
      synthVolumeRef.current = mainVolume;
      
      // Start the romantic chord progression loop
      startAmbientMelody();
    } catch (e) {
      console.warn("Web Audio API is not supported in this browser.", e);
    }
  };

  // Helper to synthesize a soft, dreamy piano-like note
  const playAmbientNote = (freq: number, startTime: number, duration: number, velocity = 0.5) => {
    const ctx = audioContextRef.current;
    const dest = synthVolumeRef.current;
    if (!ctx || !dest) return;

    // Create oscillator (soft triangle/sine blend for warm piano tone)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = "sine";
    osc2.type = "triangle";

    // Slight detune for chorus/warmth
    osc1.frequency.setValueAtTime(freq, startTime);
    osc2.frequency.setValueAtTime(freq + 1, startTime);

    gainNode.gain.setValueAtTime(0, startTime);
    // Soft attack (like a physical piano string being struck gently)
    gainNode.gain.linearRampToValueAtTime(velocity * 0.4, startTime + 0.1);
    // Slow decay/sustain
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(dest);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
  };

  // Fairy chime generator for clicks
  const playFairyChime = () => {
    const ctx = audioContextRef.current;
    const dest = synthVolumeRef.current;
    if (!ctx || !dest || !chimeEnabled) return;

    const now = ctx.currentTime;
    // Pentatonic scale of lovely high sparkles (C6, D6, E6, G6, A6, C7)
    const sparkles = [1046.50, 1174.66, 1318.51, 1567.98, 1760.00, 2093.00];
    
    // Play a quick arpeggiated sparkle chord
    sparkles.forEach((freq, index) => {
      const noteTime = now + index * 0.04;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, noteTime);
      
      gain.gain.setValueAtTime(0, noteTime);
      gain.gain.linearRampToValueAtTime(0.06, noteTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.4);
      
      osc.connect(gain);
      gain.connect(dest);
      
      osc.start(noteTime);
      osc.stop(noteTime + 0.5);
    });
  };

  // Romantic ambient chord progression loop
  // Progressions:
  // Chord 1: Cmaj7 (C3, G3, B3, E4)
  // Chord 2: Am9   (A2, E3, G3, B3, C4)
  // Chord 3: Fmaj7 (F2, C3, A3, E4)
  // Chord 4: G6    (G2, D3, B3, E4)
  const startAmbientMelody = () => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    let beat = 0;
    const chords = [
      // Cmaj7 (Dreamy, soft)
      [130.81, 196.00, 246.94, 329.63, 440.00], // C3, G3, B3, E4, A4
      // Am9 (Emotional)
      [110.00, 164.81, 196.00, 246.94, 261.63], // A2, E3, G3, B3, C4
      // Fmaj7 (Warm, hopeful)
      [87.31, 130.81, 220.00, 329.63, 392.00],  // F2, C3, A3, E4, G4
      // G6 (Resolving)
      [98.00, 146.83, 246.94, 329.63, 493.88]   // G2, D3, B3, E4, B4
    ];

    const scheduler = () => {
      const now = ctx.currentTime;
      const currentChord = chords[beat % chords.length];
      
      // Play bass notes (slow, very gentle)
      playAmbientNote(currentChord[0], now, 5.0, 0.4);
      playAmbientNote(currentChord[1], now + 0.2, 4.5, 0.3);

      // Play arpeggiated melody notes
      playAmbientNote(currentChord[2], now + 0.5, 4.0, 0.35);
      playAmbientNote(currentChord[3], now + 1.2, 3.5, 0.35);
      playAmbientNote(currentChord[4], now + 1.8, 3.0, 0.3);

      // Occasional random gentle high melody sparkle
      if (Math.random() > 0.4) {
        const extraNote = currentChord[Math.floor(Math.random() * 3) + 2] * 2; // Octave up
        playAmbientNote(extraNote, now + 2.5, 2.0, 0.2);
      }

      beat++;
      // Repeat chord every 4.5 seconds
      backgroundLoopTimerRef.current = window.setTimeout(scheduler, 4500);
    };

    scheduler();
  };

  const togglePlayback = async () => {
    initAudio();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    if (isPlaying) {
      // Suspend audio context to pause
      await ctx.suspend();
      setIsPlaying(false);
    } else {
      // Resume audio context to play
      await ctx.resume();
      setIsPlaying(true);
      // Play a lovely entrance chime
      setTimeout(() => playFairyChime(), 100);
    }
  };

  // Play a chime whenever the user clicks on any clickable element
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" || 
        target.closest("button") || 
        target.classList.contains("clickable") ||
        target.closest(".clickable")
      ) {
        if (audioContextRef.current && isPlaying) {
          playFairyChime();
        }
      }
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isPlaying, chimeEnabled]);

  // Cleanup loops
  useEffect(() => {
    return () => {
      if (backgroundLoopTimerRef.current) {
        clearTimeout(backgroundLoopTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Sound active status indicator */}
      {isPlaying && (
        <div className="glass-card flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-rose-pink-300/30 text-rose-pink-300 text-[10px] uppercase tracking-wider font-mono shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-pink-500"></span>
          </span>
          Melody Playing
        </div>
      )}

      {/* Chimes Toggle */}
      <button
        onClick={() => setChimeEnabled(!chimeEnabled)}
        className={`p-3 rounded-full border transition-all duration-300 shadow-md ${
          chimeEnabled 
            ? "bg-rose-pink-500/20 border-rose-pink-400/40 text-rose-pink-200" 
            : "bg-white/5 border-white/10 text-white/40"
        } hover:scale-105 active:scale-95`}
        title={chimeEnabled ? "Fairy Chimes Enabled" : "Fairy Chimes Muted"}
        id="chimes-toggle"
      >
        <Sparkles size={18} className={chimeEnabled ? "animate-pulse" : ""} />
      </button>

      {/* Main Music Toggle */}
      <button
        onClick={togglePlayback}
        className={`p-3 rounded-full border transition-all duration-500 shadow-lg flex items-center justify-center ${
          isPlaying 
            ? "bg-gradient-to-r from-rose-pink-500 to-purple-romantic border-rose-pink-400/50 text-white scale-110 shadow-rose-pink-500/20 animate-pulse" 
            : "bg-black/40 border-white/20 text-white/80 hover:bg-black/60"
        } hover:scale-105 active:scale-95`}
        title={isPlaying ? "Mute Melody" : "Play Romantic Melody"}
        id="music-toggle"
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </div>
  );
}
