import { useEffect, useRef, useState } from 'react';
import { getAlphaVideoSources } from '@/lib/alphaVideoSources';
import { RingText } from './RingText';

interface GalaxyColumnProps {
  srcWebm: string;
  srcMov: string;
  label: string;
  subtitle: string;
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
  subtitle,
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
      void video.play().catch(() => undefined);
      void overlay.play().catch(() => undefined);
    } else {
      video.pause();
      video.currentTime = 0;
      overlay.pause();
      overlay.currentTime = 0;
    }
  }, [isHovered]);

  const titleRingItems = [label];
  const yearRingItems = [year];

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
          transform: `scale(${isHovered ? 1.02 : 0.58})`,
          filter: isHovered ? 'saturate(1)' : 'saturate(0) brightness(0.9)',
          opacity: isHovered ? 1 : 0.84,
        }}
      >
        <div className="relative z-10 h-full w-full">
          <video
            ref={videoRef}
            muted
            playsInline
            loop
            preload="metadata"
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
          preload="metadata"
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
          className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
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
          className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          direction="reverse"
          itemClassName="font-orbitron text-[12px] font-bold tracking-[0.38em] text-white sm:text-[13px] md:text-[14px] lg:text-[16px]"
          itemStyle={{
            filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.95)) drop-shadow(0 0 14px rgba(255,255,255,0.28))',
          }}
        />
        <div
          className={`pointer-events-none absolute left-1/2 top-[72%] z-30 w-[min(19rem,82%)] -translate-x-1/2 text-center transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-85'
          }`}
        >
          <p className="font-orbitron text-[11px] font-bold uppercase tracking-[0.24em] text-white drop-shadow-[0_0_14px_rgba(0,0,0,0.95)] md:text-[12px] lg:text-[13px]">
            {year}
          </p>
          <p className="mt-2 font-russo text-[12px] font-semibold uppercase leading-tight tracking-[0.12em] text-white/95 drop-shadow-[0_0_16px_rgba(0,0,0,0.95)] md:text-[13px] lg:text-[14px]">
            {subtitle}
          </p>
        </div>
      </div>
    </a>
  );
}
