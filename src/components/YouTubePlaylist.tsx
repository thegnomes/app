import { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

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
    <p
      className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-4"
      style={{ fontFamily: "'Fragment Mono', monospace" }}
    >
      {children}
    </p>
  );
}

export default function YouTubePlaylist({
  title,
  subtitle,
  videos,
  playlistId,
}: YouTubePlaylistProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const activeVideo = videos[activeIndex];

  const handleVideoClick = (index: number) => {
    setActiveIndex(index);
    if (listRef.current) {
      const item = listRef.current.children[index] as HTMLElement;
      if (item) {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  return (
    <section className="px-6 md:px-10 py-16 md:py-24 border-t border-neutral-900 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <FadeIn>
            <Label>Media</Label>
          </FadeIn>
          <FadeIn delay={100}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-neutral-100">
              {title}
            </h2>
          </FadeIn>
          {subtitle && (
            <FadeIn delay={150}>
              <p className="text-base md:text-lg text-neutral-400 mt-3 max-w-xl">
                {subtitle}
              </p>
            </FadeIn>
          )}
        </div>

        {/* Player + Playlist */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Main Player */}
          <FadeIn className="lg:col-span-3">
            <div className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl shadow-black/60">
              <div className="relative aspect-video">
                <iframe
                  key={activeVideo?.id ?? playlistId}
                  src={`https://www.youtube.com/embed/${activeVideo?.id ?? ''}?list=${playlistId}&autoplay=1&rel=0`}
                  title={activeVideo?.title ?? 'YouTube Playlist'}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="px-5 py-4 border-t border-neutral-800">
                <p className="text-sm text-neutral-500 mb-1">
                  Now playing
                </p>
                <h3 className="text-base md:text-lg font-medium text-neutral-100 leading-snug">
                  {activeVideo?.title ?? 'Select a video'}
                </h3>
              </div>
            </div>
          </FadeIn>

          {/* Playlist Sidebar */}
          <FadeIn delay={100} className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 h-full max-h-[500px] lg:max-h-none flex flex-col">
              <div className="px-4 py-3 border-b border-neutral-800 bg-neutral-900/50 flex items-center justify-between">
                <p className="text-xs font-medium text-neutral-300 uppercase tracking-wide">
                  Playlist
                </p>
                <p className="text-xs text-neutral-500">
                  {videos.length} videos
                </p>
              </div>
              <div
                ref={listRef}
                className="overflow-y-auto flex-1 p-2 space-y-1 custom-scrollbar"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#404040 #171717',
                }}
              >
                {videos.map((video, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={video.id}
                      type="button"
                      onClick={() => handleVideoClick(index)}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-lg text-left transition-all duration-200 group ${
                        isActive
                          ? 'bg-neutral-800/80'
                          : 'hover:bg-neutral-900'
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="relative flex-shrink-0 w-28 aspect-video rounded-md overflow-hidden bg-neutral-900">
                        <img
                          src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                            <Play className="w-4 h-4 text-neutral-900 fill-neutral-900 ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 rounded text-[10px] font-medium text-neutral-200">
                          {video.duration}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 py-0.5">
                        <p
                          className={`text-sm leading-snug line-clamp-2 ${
                            isActive
                              ? 'text-neutral-100 font-medium'
                              : 'text-neutral-400 group-hover:text-neutral-200'
                          }`}
                        >
                          {video.title}
                        </p>
                        <p className="text-xs text-neutral-600 mt-1">
                          {video.duration}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
