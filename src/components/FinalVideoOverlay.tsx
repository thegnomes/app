import { useEffect, useRef } from 'react';

interface FinalVideoOverlayProps {
  isActive: boolean;
}

export function FinalVideoOverlay({ isActive }: FinalVideoOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.load();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isActive) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    video.currentTime = 0;
    void video.play();
  }, [isActive]);

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
      >
        <source src="/zoom-compiled-edit-latest-web.webm" type="video/webm" />
        <source src="/zoom-compiled-edit-latest.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
