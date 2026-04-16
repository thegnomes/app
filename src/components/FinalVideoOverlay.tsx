import { useEffect, useRef, useState } from 'react';

interface FinalVideoOverlayProps {
  isActive: boolean;
  onEnded?: () => void;
  onAstronautPhase?: () => void;
}

type VideoTextPhase = 'zoom' | 'gap' | 'astronaut' | null;

const GAP_DURATION_MS = 1200;

const ZOOM_OUT_END_S = 5.5;
const TEXT_TRANSITION_MS = 1400;

export function FinalVideoOverlay({ isActive, onEnded, onAstronautPhase }: FinalVideoOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<VideoTextPhase>(null);
  const [showZoomHeader2, setShowZoomHeader2] = useState(false);

  useEffect(() => {
    videoRef.current?.load();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isActive) {
      video.pause();
      setPhase(null);
      setShowZoomHeader2(false);
      return;
    }

    video.currentTime = 0;
    setPhase('zoom');
    setShowZoomHeader2(false);
    const t = setTimeout(() => setShowZoomHeader2(true), 1400);
    void video.play();
    return () => clearTimeout(t);
  }, [isActive]);

  useEffect(() => {
    if (phase !== 'gap') return;
    const timer = setTimeout(() => {
      setPhase('astronaut');
      onAstronautPhase?.();
    }, GAP_DURATION_MS);
    return () => clearTimeout(timer);
  }, [phase, onAstronautPhase]);

  const gapTriggeredRef = useRef(false);

  useEffect(() => {
    if (!isActive) {
      gapTriggeredRef.current = false;
    }
  }, [isActive]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const t = video.currentTime;
    if (phase === 'zoom' && t >= ZOOM_OUT_END_S && !gapTriggeredRef.current) {
      gapTriggeredRef.current = true;
      setPhase('gap');
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
            {/* Zoom-out sequence: two headers stacked */}
            <div
              className="absolute inset-0 flex w-full flex-col items-center justify-center text-center transition-all ease-out"
              style={{
                opacity: phase === 'zoom' ? 1 : 0,
                transform: `translate3d(0, ${phase === 'zoom' ? 0 : 14}px, 0)`,
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
                Its influence becomes order.
              </h1>
              <h1
                className="font-orbitron flex min-h-[1.6em] items-center justify-center px-5 py-2 text-center text-[24px] font-normal leading-none gradient-text drop-shadow-[0_0_16px_rgba(168,85,247,0.85)] transition-all ease-out"
                style={{
                  opacity: showZoomHeader2 ? 1 : 0,
                  transform: `translate3d(0, ${showZoomHeader2 ? 0 : 14}px, 0)`,
                  textShadow: '0 0 30px rgba(168, 85, 247, 0.6)',
                  transitionDuration: `${TEXT_TRANSITION_MS}ms`,
                }}
              >
                That order sets a universe in motion.
              </h1>
            </div>
            {renderTextBlock(
              'At the edge of fantasy and reality, a traveller bears witness',
              'I plot coordinates for ideas — navigating narrative, platforms, and the systems that bring them into form.',
              phase === 'astronaut'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
