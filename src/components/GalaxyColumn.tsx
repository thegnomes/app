import { useEffect, useRef, useState } from 'react';
import { getAlphaVideoSources } from '@/lib/alphaVideoSources';
import { resolveAssetUrl } from '@/lib/assets';
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

  // Derive poster from webm path: /webm/name.webm -> /webm/name.png
  const posterSrc = resolveAssetUrl(srcWebm.replace(/\.webm$/i, '.png'));
  const overlayPosterSrc = resolveAssetUrl('/webm/target-lock.png');

  const [videoReady, setVideoReady] = useState(false);
  const [overlayReady, setOverlayReady] = useState(false);

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
          {/* Poster fallback — visible immediately, stays if video fails */}
          <img
            src={posterSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-contain mix-blend-screen"
            style={{ opacity: videoReady ? 0 : 1, transition: 'opacity 0.8s ease-out' }}
          />
          <video
            ref={videoRef}
            muted
            playsInline
            loop
            preload="metadata"
            className="absolute inset-0 h-full w-full object-contain"
            style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 0.8s ease-out' }}
            onCanPlay={() => setVideoReady(true)}
            onCanPlayThrough={() => setVideoReady(true)}
            onLoadedData={() => setVideoReady(true)}
          >
            {videoSources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
        </div>

        {/* Poster fallback for overlay */}
        <img
          src={overlayPosterSrc}
          alt=""
          className={`pointer-events-none absolute left-1/2 top-1/2 z-20 h-[145%] w-[145%] -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-screen transition-opacity duration-500 ${
            isHovered && !overlayReady ? 'opacity-80' : 'opacity-0'
          }`}
        />
        <video
          ref={overlayRef}
          muted
          playsInline
          loop
          preload="metadata"
          className={`pointer-events-none absolute left-1/2 top-1/2 z-20 h-[145%] w-[145%] -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-screen transition-opacity duration-500 ${
            isHovered && overlayReady ? 'opacity-80' : 'opacity-0'
          }`}
          onCanPlay={() => setOverlayReady(true)}
          onCanPlayThrough={() => setOverlayReady(true)}
          onLoadedData={() => setOverlayReady(true)}
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
          itemClassName="font-orbitron text-[12px] font-medium tracking-[0.38em] text-white/85 sm:text-[13px] md:text-[14px] lg:text-[16px]"
          itemStyle={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.85))' }}
        />
      </div>
    </a>
  );
}
