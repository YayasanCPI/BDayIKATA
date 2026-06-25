import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import YouTube, { YouTubeProps } from 'react-youtube';

export function AudioPlayer({ youtubeId }: { youtubeId: string | null }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef<any>(null);

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
    // Attempt auto-play when ready
    event.target.playVideo();
  };

  const onPlayerStateChange: YouTubeProps['onStateChange'] = (event) => {
    // 1 = playing, 2 = paused
    if (event.data === 1) {
      setIsPlaying(true);
    } else if (event.data === 2 || event.data === 0) {
      setIsPlaying(false);
    }
  };

  if (!youtubeId) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-[#2d4f1e] text-[#f7f3ee] p-4 rounded-3xl shadow-lg border border-[#3a6627]">
      <div className="hidden">
        <YouTube 
          videoId={youtubeId} 
          opts={{
            height: '0',
            width: '0',
            playerVars: {
              autoplay: 1,
              controls: 0,
              loop: 1,
              playlist: youtubeId, // Needed for loop to work
            },
          }} 
          onReady={onPlayerReady} 
          onStateChange={onPlayerStateChange}
        />
      </div>
      
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
        <p className="text-sm font-bold truncate max-w-[120px]">Memutar Musik</p>
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
