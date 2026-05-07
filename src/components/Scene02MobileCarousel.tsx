import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import type { PortfolioProject } from '@/data/portfolio-projects';
import { getAlphaVideoSources } from '@/lib/alphaVideoSources';
import { cn } from '@/lib/utils';

type Scene02MobileProject = Pick<
  PortfolioProject,
  'title' | 'year' | 'coreCompetency' | 'accentColor' | 'accentSecondaryColor'
>;

export interface Scene02GalaxyItem {
  srcWebm: string;
  srcMov: string;
  href: string;
  hoverId: string;
  project: Scene02MobileProject;
  displayTitle?: string;
  alignTop?: boolean;
}

interface Scene02MobileCarouselProps {
  items: Scene02GalaxyItem[];
  isVisible: boolean;
}

interface Scene02MobileSlideProps {
  item: Scene02GalaxyItem;
  isActive: boolean;
  videoRef: (node: HTMLVideoElement | null) => void;
}

function Scene02MobileSlide({ item, isActive, videoRef }: Scene02MobileSlideProps) {
  const videoSources = getAlphaVideoSources(item.srcWebm, item.srcMov);
  const title = item.displayTitle ?? item.project.title;
  const accentColor = item.project.accentColor ?? '#ffffff';
  const accentSecondaryColor = item.project.accentSecondaryColor ?? accentColor;

  return (
    <a
      href={item.href}
      aria-label={`Open ${item.project.title} profile`}
      className="group relative block h-full w-full overflow-hidden text-white"
      draggable={false}
      style={{ height: '100svh' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-700"
        style={{
          background: [
            `radial-gradient(circle at 50% 48%, ${accentColor}3f 0%, transparent 42%)`,
            `radial-gradient(circle at 50% 70%, ${accentSecondaryColor}24 0%, transparent 34%)`,
          ].join(', '),
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.48),rgba(0,0,0,0)_28%,rgba(0,0,0,0)_62%,rgba(0,0,0,0.72))]" />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          preload="auto"
          className={cn(
            'h-[62svh] w-[150vw] max-w-none object-contain transition-all duration-700 ease-out',
            isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-35 blur-[1px]'
          )}
        >
          {videoSources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[calc(2.75rem+env(safe-area-inset-top))] z-20 px-6 text-center">
        <p className="scene02-mono text-xs uppercase text-white/65">{item.project.year}</p>
        <h2 className="mt-3 font-russo text-[4rem] uppercase leading-none text-white drop-shadow-[0_0_28px_rgba(0,0,0,0.85)]">
          {title}
        </h2>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[calc(2rem+env(safe-area-inset-bottom))] z-20 px-6 text-center">
        <p className="scene02-mono text-xs uppercase text-white/60">Core competency</p>
        <p className="mx-auto mt-2 max-w-[18rem] font-russo text-2xl uppercase leading-tight text-white">
          {item.project.coreCompetency}
        </p>
        <span
          className="mt-5 inline-flex h-12 min-w-56 items-center justify-center gap-2 rounded-full border bg-white/10 px-5 text-sm font-semibold uppercase text-white shadow-[0_0_28px_rgba(255,255,255,0.16)] backdrop-blur-md transition-all duration-300 group-active:scale-95"
          style={{
            borderColor: `${accentColor}8a`,
            boxShadow: `0 0 28px ${accentColor}38`,
          }}
        >
          Tap to Enter Profile
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}

export function Scene02MobileCarousel({ items, isVisible }: Scene02MobileCarouselProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => {
      setActiveIndex(carouselApi.selectedScrollSnap());
    };

    handleSelect();
    carouselApi.on('select', handleSelect);
    carouselApi.on('reInit', handleSelect);

    return () => {
      carouselApi.off('select', handleSelect);
      carouselApi.off('reInit', handleSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (isVisible && index === activeIndex) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex, isVisible]);

  return (
    <Carousel
      opts={{ align: 'center', loop: true }}
      setApi={setCarouselApi}
      className={cn(
        'absolute inset-0 z-20 md:hidden',
        'transition-opacity duration-[1500ms] ease-out',
        isVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      )}
      aria-label="Project galaxies"
    >
      <CarouselContent className="ml-0 h-full" style={{ height: '100svh' }}>
        {items.map((item, index) => (
          <CarouselItem key={item.hoverId} className="h-full pl-0" style={{ height: '100svh' }}>
            <Scene02MobileSlide
              item={item}
              isActive={activeIndex === index}
              videoRef={(node) => {
                videoRefs.current[index] = node;
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="pointer-events-auto absolute inset-x-0 bottom-[calc(11.75rem+env(safe-area-inset-bottom))] z-30 flex justify-center gap-2">
        {items.map((item, index) => (
          <button
            key={item.hoverId}
            type="button"
            aria-label={`Show ${item.project.title}`}
            className={cn(
              'h-2.5 rounded-full transition-all duration-300',
              activeIndex === index ? 'w-8 bg-white' : 'w-2.5 bg-white/35'
            )}
            onClick={() => carouselApi?.scrollTo(index)}
          />
        ))}
      </div>
    </Carousel>
  );
}
