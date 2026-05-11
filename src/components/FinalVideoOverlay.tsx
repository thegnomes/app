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
const MAX_VIDEO_DURATION_MS = 20000; // generous fallback so normal playback is never clipped
const STALL_THRESHOLD_MS = 4000;

export function FinalVideoOverlay({ isActive, onEnded, onAstronautPhase }: FinalVideoOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<VideoTextPhase>(null);
  const lastTimeRef = useRef(0);
  const stallTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxDurationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endedRef = useRef(false);

  useEffect(() => {
    videoRef.current?.load();
  }, []);

  const clearTimers = () => {
    if (stallTimerRef.current) {
      clearTimeout(stallTimerRef.current);
      stallTimerRef.current = null;
    }
    if (maxDurationTimerRef.current) {
      clearTimeout(maxDurationTimerRef.current);
      maxDurationTimerRef.current = null;
    }
  };

  const triggerEnded = () => {
    if (endedRef.current) return;
    endedRef.current = true;
    clearTimers();
    onEnded?.();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isActive) {
      video.pause();
      clearTimers();
      endedRef.current = false;
      requestAnimationFrame(() => {
        setPhase(null);
      });
      return;
    }

    endedRef.current = false;
    video.currentTime = 0;
    lastTimeRef.current = 0;
    requestAnimationFrame(() => {
      setPhase('zoom');
    });

    // Absolute timeout: never trap the user even if video stalls
    maxDurationTimerRef.current = setTimeout(() => {
      triggerEnded();
    }, MAX_VIDEO_DURATION_MS);

    void video.play().catch(() => {
      // Playback failed — advance route so user is never stuck
      triggerEnded();
    });

    return () => {
      clearTimers();
    };
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

    // Reset stall timer whenever time progresses
    if (stallTimerRef.current) clearTimeout(stallTimerRef.current);
    stallTimerRef.current = setTimeout(() => {
      // Video stalled — advance so user isn't trapped
      triggerEnded();
    }, STALL_THRESHOLD_MS);
    lastTimeRef.current = t;

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
        preload="metadata"
        className="h-full w-full object-cover"
        style={isSafari ? { mixBlendMode: 'screen', filter: 'brightness(1)' } : undefined}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => triggerEnded()}
      >
        <source src={resolveAssetUrl('/zoom-compiled-edit-latest-web.webm')} type="video/webm" />
        <source src={resolveAssetUrl('/zoom-compiled-edit-latest.mp4')} type="video/mp4" />
      </video>
    </div>
  );
}
