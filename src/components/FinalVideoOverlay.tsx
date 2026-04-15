import { useEffect, useRef, useState } from 'react';

interface FinalVideoOverlayProps {
  isActive: boolean;
}

type VideoTextPhase = 'zoom' | 'astronaut' | null;

const ZOOM_OUT_END_S = 5.5;
const TEXT_TRANSITION_MS = 800;

export function FinalVideoOverlay({ isActive }: FinalVideoOverlayProps) {
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
      video.currentTime = 0;
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
        className="absolute left-0 top-0 grid w-full grid-cols-[minmax(0,1fr)_clamp(72px,16vw,220px)_minmax(0,1fr)] items-center transition-all ease-out"
        style={{
          opacity,
          transform: `translate3d(0, ${y}px, 0)`,
          transitionDuration: `${TEXT_TRANSITION_MS}ms`,
        }}
      >
        <h1
          className="font-orbitron col-start-1 flex min-h-[1.6em] items-center justify-end px-5 py-2 text-right text-[24px] font-normal leading-none gradient-text transition-all ease-out"
          style={{
            textShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
            transitionDuration: `${TEXT_TRANSITION_MS}ms`,
          }}
        >
          {header}
        </h1>
        <p
          className="font-orbitron col-start-3 flex min-h-[1.6em] items-center justify-start px-5 py-2 text-left text-[12px] sm:text-[13.5px] font-normal leading-none text-white transition-all ease-out"
          style={{
            textShadow: '0 0 20px rgba(255, 255, 255, 0.18)',
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
