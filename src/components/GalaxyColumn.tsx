import { useEffect, useRef } from 'react';

interface GalaxyColumnProps {
  srcWebm: string;
  srcMov: string;
  isActive: boolean;
}

export function GalaxyColumn({ srcWebm, srcMov, isActive }: GalaxyColumnProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      void video.play();
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive]);

  return (
    <div className="relative h-full w-1/3 overflow-hidden">
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        preload="auto"
        className="h-full w-full object-cover"
      >
        <source src={srcWebm} type="video/webm" />
        <source src={srcMov} type="video/quicktime" />
      </video>
    </div>
  );
}
