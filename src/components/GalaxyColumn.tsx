import { useEffect, useRef, useState } from 'react';
import { getAlphaVideoSources } from '@/lib/alphaVideoSources';
import { RingText } from './RingText';

interface GalaxyColumnProps {
  srcWebm: string;
  srcMov: string;
  label: string;
  year: string;
  href: string;
  alignTop?: boolean;
  hoverId?: string;
  onHoverChange?: (hoverId: string | null) => void;
}

export function GalaxyColumn({
  srcWebm,
  srcMov,
  label,
  year,
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

  const titleRingItems = Array(12).fill(label);
  const yearRingItems = Array(14).fill(year);

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
        className="relative z-10 flex aspect-[554/430] items-center justify-center overflow-visible transition-all duration-700 ease-out"
        style={{
          width: 'clamp(13rem, 105%, 38rem)',
          transform: `scale(${isHovered ? 1.08 : 0.72})`,
          filter: isHovered ? 'saturate(1)' : 'saturate(0)',
        }}
      >
        <div className="relative z-10 h-full w-full">
          <video
            ref={videoRef}
            muted
            playsInline
            loop
            preload="auto"
            className="h-full w-full object-contain"
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
          className={`pointer-events-none absolute left-1/2 top-1/2 z-20 h-[145%] w-[145%] -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-screen transition-opacity duration-500 ${
            isHovered ? 'opacity-80' : 'opacity-0'
          }`}
        >
          {overlaySources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>

        <RingText
          items={titleRingItems}
          radius={166}
          radiusX={176}
          radiusY={68}
          arc="top"
          duration={14}
          verticalOffset={4}
          itemClassName="font-russo text-[14px] font-bold tracking-[0.28em] text-white sm:text-[16px] md:text-[18px] lg:text-[20px]"
          itemStyle={{
            filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.9)) drop-shadow(0 0 18px rgba(255,255,255,0.35))',
          }}
        />
        <RingText
          items={yearRingItems}
          radius={152}
          radiusX={176}
          radiusY={86}
          arc="bottom"
          duration={12}
          verticalOffset={18}
          itemClassName="font-orbitron text-[10px] font-medium tracking-[0.38em] text-white/85 sm:text-[11px] md:text-[12px] lg:text-[14px]"
          itemStyle={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.85))' }}
        />
      </div>
    </a>
  );
}
