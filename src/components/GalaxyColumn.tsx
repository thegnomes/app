import { useEffect, useRef, useState } from 'react';
import { getAlphaVideoSources } from '@/lib/alphaVideoSources';
import { RingText } from './RingText';

interface GalaxyColumnProps {
  srcWebm: string;
  srcMov: string;
  label: string;
  href: string;
  alignTop?: boolean;
  hoverId?: string;
  onHoverChange?: (hoverId: string | null) => void;
}

export function GalaxyColumn({
  srcWebm,
  srcMov,
  label,
  href,
  alignTop = false,
  hoverId,
  onHoverChange,
}: GalaxyColumnProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const videoSources = getAlphaVideoSources(srcWebm, srcMov);
  const overlaySources = getAlphaVideoSources('/webm/target-lock.webm', '/webm/target-lock.mov');

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
    <a
      href={href}
      className={`relative flex h-full w-1/3 cursor-pointer justify-center overflow-visible ${alignTop ? 'items-start' : 'items-center'}`}
      style={{ zIndex: isHovered ? 20 : 10 }}
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverChange?.(hoverId ?? null);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverChange?.(null);
      }}
      onFocus={() => {
        setIsHovered(true);
        onHoverChange?.(hoverId ?? null);
      }}
      onBlur={() => {
        setIsHovered(false);
        onHoverChange?.(null);
      }}
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
        <div className="h-full w-full">
          <video
            ref={videoRef}
            muted
            playsInline
            loop
            preload="auto"
            className="h-full w-full"
          >
            {videoSources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
        </div>

        <video
          ref={overlayRef}
          muted
          playsInline
          loop
          preload="auto"
          className={`pointer-events-none absolute inset-0 h-full w-full mix-blend-screen transition-opacity duration-500 ${
            isHovered ? 'opacity-80' : 'opacity-0'
          }`}
        >
          {overlaySources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>

        <RingText items={ringItems} radius={120} duration={12} />
      </div>
    </a>
  );
}
