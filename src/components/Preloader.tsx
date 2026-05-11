import { useEffect, useRef, useState } from 'react';
import { preloadVideo, preloadImage, preloadFont } from '@/lib/safeMediaPreload';

interface PreloaderProps {
  assets: string[];
  onComplete: () => void;
}

export function Preloader({ assets, onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    if (assets.length === 0) {
      if (mountedRef.current) onComplete();
      return;
    }

    let completed = 0;
    const total = assets.length + 1; // +1 for fonts

    const checkComplete = () => {
      if (!mountedRef.current) return;
      completed++;
      setProgress(Math.min(100, Math.round((completed / total) * 100)));
      if (completed >= total) {
        onComplete();
      }
    };

    const promises = assets.map((src) => {
      const isVideo = /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(src);
      if (isVideo) {
        return preloadVideo(src, { timeoutMs: 5000, preload: 'metadata' }).then(() => {
          checkComplete();
        });
      }
      return preloadImage(src, 5000).then(() => {
        checkComplete();
      });
    });

    // Fonts preload — always resolves, never blocks forever
    promises.push(
      preloadFont(3000).then(() => {
        checkComplete();
      })
    );

    return () => {
      mountedRef.current = false;
    };
  }, [assets, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div className="font-russo text-[0.875rem] text-white/70 tracking-[0.2em] md:text-[1.125rem]">
        {progress}%
      </div>
    </div>
  );
}
