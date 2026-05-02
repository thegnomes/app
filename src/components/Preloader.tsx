import { useEffect, useRef, useState } from 'react';

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
        return new Promise<void>((resolve) => {
          const video = document.createElement('video');
          video.preload = 'auto';
          video.muted = true;
          video.playsInline = true;
          video.src = src;
          const onReady = () => {
            cleanup();
            resolve();
          };
          const cleanup = () => {
            video.removeEventListener('canplaythrough', onReady);
            video.removeEventListener('error', onReady);
          };
          video.addEventListener('canplaythrough', onReady);
          video.addEventListener('error', onReady);
          if (video.readyState >= 4) {
            onReady();
          }
        });
      }
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      });
    });

    // Also wait for fonts (same as App.tsx beginning preloader)
    promises.push(document.fonts.ready.then(() => {}));

    promises.forEach((p) => p.then(checkComplete));

    return () => {
      mountedRef.current = false;
    };
  }, [assets, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div className="font-russo text-white/70 text-sm tracking-[0.2em]">
        {progress}%
      </div>
    </div>
  );
}
