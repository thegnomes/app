import { useEffect, useRef } from 'react';

interface FinalVideoOverlayProps {
  isActive: boolean;
}

export function FinalVideoOverlay({ isActive }: FinalVideoOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isActive) return;

    video.currentTime = 0;
    void video.play();
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-40 overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="h-full w-full object-cover"
      >
        <source src="/zoom-compiled-edit-latest-web.webm" type="video/webm" />
        <source src="/zoom-compiled-edit-latest.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
