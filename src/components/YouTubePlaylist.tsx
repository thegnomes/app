import { useState, useRef, useEffect, useCallback } from 'react';

interface PlaylistVideo {
  id: string;
  title: string;
  duration: string;
}

interface YouTubePlaylistProps {
  title: string;
  subtitle?: string;
  videos: PlaylistVideo[];
  playlistId: string;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="portfolio-template-mono mb-4 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
      {children}
    </p>
  );
}

export default function YouTubePlaylist({
  title,
  subtitle,
  videos,
}: YouTubePlaylistProps) {
  const displayVideos = videos.slice(0, 8);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeVideo = displayVideos[activeIndex];

  const startProgress = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 100;
        }
        return p + 0.5;
      });
    }, 100);
  }, []);

  const stopProgress = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
    setProgress(0);
    startProgress();
  };

  const handlePause = () => {
    setIsPlaying(false);
    stopProgress();
  };

  const handleVideoClick = (index: number) => {
    setActiveIndex(index);
    setIsPlaying(false);
    setProgress(0);
    stopProgress();
  };

  const togglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const embedUrl = isPlaying
    ? `https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0&controls=0&modestbranding=1&playsinline=1`
    : `https://www.youtube.com/embed/${activeVideo.id}?rel=0&controls=0&modestbranding=1&playsinline=1`;

  return (
    <section className="px-6 md:px-10 py-16 md:py-24 border-t border-neutral-900 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <FadeIn>
            <Label>Media</Label>
          </FadeIn>
          <FadeIn delay={100}>
            <h2 className="text-[1.5rem] font-medium text-neutral-100 md:text-[1.875rem] lg:text-[2.25rem]">
              {title}
            </h2>
          </FadeIn>
          {subtitle && (
            <FadeIn delay={150}>
              <p className="mt-3 max-w-xl text-[1rem] text-neutral-400 md:text-[1.125rem]">
                {subtitle}
              </p>
            </FadeIn>
          )}
        </div>

        {/* Player Container */}
        <FadeIn delay={200}>
          <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl shadow-black/60">
            {/* Video Area */}
            <div className="relative aspect-video bg-neutral-900">
              <iframe
                ref={iframeRef}
                key={`${activeVideo.id}-${isPlaying ? 'play' : 'pause'}`}
                src={embedUrl}
                title={activeVideo.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />

              {/* Play Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer" onClick={handlePlay}>
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-neutral-900 ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Custom Control Bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-t border-neutral-800 bg-neutral-900/80">
              <button
                type="button"
                onClick={togglePlay}
                className="w-8 h-8 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
              >
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Progress Bar */}
              <div className="flex-1 h-1 bg-neutral-700 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="h-full bg-neutral-300 rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="font-mono text-[0.75rem] text-neutral-400 tabular-nums">
                {activeVideo.duration}
              </span>

              <button type="button" className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-neutral-200 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 010 7.07" />
                </svg>
              </button>

              <button type="button" className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-neutral-200 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
              </button>

              <button type="button" className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-neutral-200 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
                </svg>
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Playlist List */}
        <FadeIn delay={250}>
          <div className="mt-6">
            <h3 className="mb-4 px-1 text-[0.875rem] font-semibold text-neutral-200">
              {title}
            </h3>
            <div className="space-y-1">
              {displayVideos.map((video, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => handleVideoClick(index)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-neutral-800/80'
                        : 'hover:bg-neutral-900/60'
                    }`}
                  >
                    <span
                      className={`w-6 text-center font-mono text-[0.875rem] tabular-nums ${
                        isActive ? 'text-neutral-100' : 'text-neutral-600'
                      }`}
                    >
                      {index + 1}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`truncate text-[0.875rem] ${
                          isActive
                            ? 'text-neutral-100 font-medium'
                            : 'text-neutral-400'
                        }`}
                      >
                        {video.title}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="font-mono text-[0.75rem] text-neutral-500 tabular-nums">
                        {video.duration}
                      </span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isActive ? 'bg-amber-500' : 'bg-transparent'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
