import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export function AudioPlayer({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Attempt auto-play on mount (will likely be blocked by browser until user interaction)
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [src]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-[#2d4f1e] text-[#f7f3ee] p-4 rounded-3xl shadow-lg border border-[#3a6627]">
      <audio ref={audioRef} src={src} loop />
      
      <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
        <button
          onClick={togglePlay}
          className="text-white hover:text-[#d8c3a5] transition-colors"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
        </button>
      </div>
      
      <div className="hidden sm:block">
        <p className="text-[10px] uppercase tracking-widest opacity-70">Lagu Angkatan</p>
        <p className="text-sm font-bold truncate max-w-[120px]">Mars Tambang UPN</p>
      </div>

      <div className="flex gap-2 items-center border-l border-white/20 pl-4 ml-2">
        {isPlaying && (
          <div className="flex gap-1 items-end h-6 mr-2">
            <div className="w-1 h-4 bg-white/60 animate-[bounce_1s_infinite]"></div>
            <div className="w-1 h-6 bg-white animate-[bounce_1.2s_infinite]"></div>
            <div className="w-1 h-3 bg-white/40 animate-[bounce_0.8s_infinite]"></div>
          </div>
        )}
        <button
          onClick={toggleMute}
          className="text-white/80 hover:text-white transition-colors p-1"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
}
