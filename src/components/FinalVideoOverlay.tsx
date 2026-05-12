import { useCallback, useEffect, useRef, useState } from 'react';
import { resolveAssetUrl } from '@/lib/assets';
import { isSafari } from '@/lib/isSafari';

interface FinalVideoOverlayProps {
  isActive: boolean;
  onEnded?: () => void;
  onAstronautPhase?: () => void;
}

type VideoTextPhase = 'zoom' | 'gap' | 'astronaut' | null;

const GAP_DURATION_MS = 1200;
const PLAY_FAILURE_GAP_DELAY_MS = 1200;
const FALLBACK_ASTRONAUT_READ_MS = 5500;

const ZOOM_OUT_END_S = 5.5;
const STALL_THRESHOLD_MS = 4000;

export function FinalVideoOverlay({ isActive, onEnded, onAstronautPhase }: FinalVideoOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<VideoTextPhase>(null);
  const phaseRef = useRef<VideoTextPhase>(null);
  const stallTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fallbackTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const gapTriggeredRef = useRef(false);
  const endedRef = useRef(false);
  const playAttemptRef = useRef(0);

  useEffect(() => {
    videoRef.current?.load();
  }, []);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const clearTimers = useCallback(() => {
    if (stallTimerRef.current) {
      clearTimeout(stallTimerRef.current);
      stallTimerRef.current = null;
    }
    fallbackTimersRef.current.forEach((timerId) => clearTimeout(timerId));
    fallbackTimersRef.current = [];
  }, []);

  const triggerEnded = useCallback(() => {
    if (endedRef.current) return;
    endedRef.current = true;
    clearTimers();
    onEnded?.();
  }, [clearTimers, onEnded]);

  const startFallbackReveal = useCallback(
    (playAttempt: number) => {
      if (playAttemptRef.current !== playAttempt || endedRef.current) return;

      clearTimers();

      const currentPhase = phaseRef.current;
      if (currentPhase === 'astronaut') {
        fallbackTimersRef.current.push(
          setTimeout(() => {
            if (playAttemptRef.current === playAttempt) {
              triggerEnded();
            }
          }, FALLBACK_ASTRONAUT_READ_MS)
        );
        return;
      }

      if (currentPhase !== 'gap') {
        setPhase('zoom');
      }

      const gapDelay = currentPhase === 'gap' ? 0 : PLAY_FAILURE_GAP_DELAY_MS;
      fallbackTimersRef.current.push(
        setTimeout(() => {
          if (playAttemptRef.current !== playAttempt || endedRef.current) return;
          gapTriggeredRef.current = true;
          setPhase('gap');
        }, gapDelay),
        setTimeout(() => {
          if (playAttemptRef.current === playAttempt) {
            triggerEnded();
          }
        }, gapDelay + GAP_DURATION_MS + FALLBACK_ASTRONAUT_READ_MS)
      );
    },
    [clearTimers, triggerEnded]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isActive) {
      playAttemptRef.current += 1;
      video.pause();
      clearTimers();
      endedRef.current = false;
      requestAnimationFrame(() => {
        setPhase(null);
      });
      return;
    }

    clearTimers();
    endedRef.current = false;
    gapTriggeredRef.current = false;
    const playAttempt = playAttemptRef.current + 1;
    playAttemptRef.current = playAttempt;
    video.currentTime = 0;
    requestAnimationFrame(() => {
      setPhase('zoom');
    });

    void video.play().catch(() => {
      startFallbackReveal(playAttempt);
    });

    return () => {
      clearTimers();
    };
  }, [clearTimers, isActive, startFallbackReveal]);

  useEffect(() => {
    if (phase !== 'gap') return;
    const timer = setTimeout(() => {
      setPhase('astronaut');
      onAstronautPhase?.();
    }, GAP_DURATION_MS);
    return () => clearTimeout(timer);
  }, [phase, onAstronautPhase]);

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
      startFallbackReveal(playAttemptRef.current);
    }, STALL_THRESHOLD_MS);

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
        onEnded={triggerEnded}
      >
        <source src={resolveAssetUrl('/zoom-compiled-edit-latest-web.webm')} type="video/webm" />
        <source src={resolveAssetUrl('/zoom-compiled-edit-latest.mp4')} type="video/mp4" />
      </video>
    </div>
  );
}
