import { useEffect, useRef, useState } from 'react';
import { resolveAssetUrl } from '@/lib/assets';
import { isSafari } from '@/lib/isSafari';

interface FinalVideoOverlayProps {
  isActive: boolean;
  onEnded?: () => void;
  onAstronautPhase?: () => void;
}

type VideoTextPhase = 'zoom' | 'gap' | 'astronaut' | null;

const GAP_DURATION_MS = 1200;

const ZOOM_OUT_END_S = 5.5;

export function FinalVideoOverlay({ isActive, onEnded, onAstronautPhase }: FinalVideoOverlayProps) {
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
      requestAnimationFrame(() => {
        setPhase(null);
      });
      return;
    }

    video.currentTime = 0;
    requestAnimationFrame(() => {
      setPhase('zoom');
    });
    void video.play();
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

  return (
    <div
      className={`fixed inset-0 z-40 overflow-hidden ${
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
        style={isSafari ? { mixBlendMode: 'screen', filter: 'brightness(1)' } : undefined}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onEnded}
      >
        <source src={resolveAssetUrl('/zoom-compiled-edit-latest-web.webm')} type="video/webm" />
        <source src={resolveAssetUrl('/zoom-compiled-edit-latest.mp4')} type="video/mp4" />
      </video>
    </div>
  );
}
