import { useEffect, useRef, useState } from 'react';

interface FinalVideoOverlayProps {
  isActive: boolean;
  onEnded?: () => void;
}

type VideoTextPhase = 'zoom' | 'astronaut' | null;

const ZOOM_OUT_END_S = 5.5;
const TEXT_TRANSITION_MS = 800;

export function FinalVideoOverlay({ isActive, onEnded }: FinalVideoOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<VideoTextPhase>(null);

  useEffect(() => {
    videoRef.current?.load();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isActive) {
      video.pause();
      setPhase(null);
      return;
    }

    video.currentTime = 0;
    setPhase('zoom');
    void video.play();
  }, [isActive]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const t = video.currentTime;
    if (phase !== 'astronaut' && t >= ZOOM_OUT_END_S) {
      setPhase('astronaut');
    }
  };

  const renderTextBlock = (
    header: string,
    subtext: string,
    isVisible: boolean
  ) => {
    const opacity = isVisible ? 1 : 0;
    const y = isVisible ? 0 : 14;

    return (
      <div
        className="absolute inset-0 flex w-full flex-col items-center justify-center text-center transition-all ease-out"
        style={{
          opacity,
          transform: `translate3d(0, ${y}px, 0)`,
          transitionDuration: `${TEXT_TRANSITION_MS}ms`,
        }}
      >
        <h1
          className="font-orbitron flex min-h-[1.6em] items-center justify-center px-5 py-2 text-center text-[24px] font-normal leading-none gradient-text drop-shadow-[0_0_16px_rgba(168,85,247,0.85)] transition-all ease-out"
          style={{
            textShadow: '0 0 30px rgba(168, 85, 247, 0.6)',
            transitionDuration: `${TEXT_TRANSITION_MS}ms`,
          }}
        >
          {header}
        </h1>
        <p
          className="font-orbitron flex min-h-[1.6em] items-center justify-center px-5 py-2 text-center text-[12px] sm:text-[13.5px] font-normal leading-none text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] transition-all ease-out"
          style={{
            textShadow: '0 0 20px rgba(0, 0, 0, 0.8)',
            transitionDuration: `${TEXT_TRANSITION_MS}ms`,
          }}
        >
          {subtext}
        </p>
      </div>
    );
  };

  return (
    <div
      className={`fixed inset-0 z-40 overflow-hidden bg-black ${
        isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!isActive}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onEnded={onEnded}
      >
        <source src="/zoom-compiled-edit-latest-web.webm" type="video/webm" />
        <source src="/zoom-compiled-edit-latest.mp4" type="video/mp4" />
      </video>

      <div className="fixed inset-0 z-50 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 w-[min(92vw,1120px)] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2">
          <div className="relative min-h-fit">
            {renderTextBlock(
              'Great ideas have gravity.',
              'Drawing others into orbit, and finding their place in the universe.',
              phase === 'zoom'
            )}
            {renderTextBlock(
              'At the edge of fantasy and reality,',
              'the traveller appears—charting a course through uncertainty.',
              phase === 'astronaut'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
