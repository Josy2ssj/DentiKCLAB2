import { useState } from 'react';

export function MusicWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(70);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div className="h-full flex flex-col" style={{ 
      background: 'rgba(255, 255, 255, 0.94)',
      borderRadius: '24px',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 8px 32px rgba(17, 26, 53, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
    }}>
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-[15px] font-bold" style={{ color: '#111A35' }}>
          Música
        </h3>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-4 flex flex-col">
        {/* Album Art */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-bold truncate" style={{ color: '#111A35' }}>
              Focus Flow
            </div>
            <div className="text-[11px] truncate mt-0.5" style={{ color: '#7B8BA5' }}>
              Lo-fi Beats
            </div>
          </div>

          {/* Favorite Button */}
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 hover:bg-gray-100"
            aria-label="Favorito"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7B8BA5" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${progress}%, #E2E8F0 ${progress}%, #E2E8F0 100%)`,
            }}
          />
          <div className="flex items-center justify-between mt-1">
            <span className="text-[9px]" style={{ color: '#7B8BA5' }}>
              {Math.floor(progress * 2.28)}:{String(Math.floor((progress * 2.28 % 1) * 60)).padStart(2, '0')}
            </span>
            <span className="text-[9px]" style={{ color: '#7B8BA5' }}>
              3:48
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 hover:bg-gray-100 active:scale-95"
            aria-label="Anterior"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3D4F6F" strokeWidth="2">
              <polygon points="19 20 9 12 19 4 19 20" />
              <line x1="5" y1="19" x2="5" y2="5" />
            </svg>
          </button>

          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
            }}
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>

          <button
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 hover:bg-gray-100 active:scale-95"
            aria-label="Siguiente"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3D4F6F" strokeWidth="2">
              <polygon points="5 4 15 12 5 20 5 4" />
              <line x1="19" y1="5" x2="19" y2="19" />
            </svg>
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7B8BA5" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
          </svg>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${volume}%, #E2E8F0 ${volume}%, #E2E8F0 100%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
