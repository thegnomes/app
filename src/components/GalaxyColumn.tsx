import { useEffect, useRef, useState } from 'react';
import { RingText } from './RingText';

interface GalaxyColumnProps {
  srcWebm: string;
  srcMov: string;
  label: string;
  alignTop?: boolean;
}

export function GalaxyColumn({ srcWebm, srcMov, label, alignTop = false }: GalaxyColumnProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const overlay = overlayRef.current;
    if (!video || !overlay) return;

    if (isHovered) {
      void video.play();
      void overlay.play();
    } else {
      video.pause();
      video.currentTime = 0;
      overlay.pause();
      overlay.currentTime = 0;
    }
  }, [isHovered]);

  const ringItems = Array(12).fill(label);

  return (
    <div
      className={`relative flex h-full w-1/3 justify-center overflow-hidden ${alignTop ? 'items-start' : 'items-center'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative flex items-center justify-center transition-all duration-700 ease-out"
        style={{
          width: '50%',
          height: '50%',
          transform: `scale(${isHovered ? 1 : 0.5})`,
          filter: isHovered ? 'saturate(1)' : 'saturate(0)',
        }}
      >
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

        <video
          ref={overlayRef}
          muted
          playsInline
          loop
          preload="auto"
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover mix-blend-screen transition-opacity duration-500 ${
            isHovered ? 'opacity-80' : 'opacity-0'
          }`}
        >
          <source src="/webm/target-lock.webm" type="video/webm" />
        </video>

        <RingText items={ringItems} radius={140} duration={12} />
      </div>
    </div>
  );
}
