import { useEffect, useState } from 'react';

interface AstronautTextOverlayProps {
  isActive: boolean;
}

export function AstronautTextOverlay({ isActive }: AstronautTextOverlayProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isActive) {
      const raf = requestAnimationFrame(() => setVisible(false));
      return () => cancelAnimationFrame(raf);
    }
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [isActive]);

  if (!isActive && !visible) return null;

  return (
    <div className="fixed inset-0 z-[55] pointer-events-none">
      <div className="absolute left-1/2 top-1/2 w-[min(92vw,1120px)] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2">
        <div
          className="flex min-h-fit flex-col items-center justify-center text-center transition-all ease-out duration-1000"
          style={{
            opacity: visible ? 1 : 0,
            transform: `translate3d(0, ${visible ? 0 : 20}px, 0)`,
          }}
        >
          <h1
            className="font-orbitron flex min-h-[1.6em] items-center justify-center px-5 py-2 text-center text-[24px] font-normal leading-relaxed gradient-text drop-shadow-[0_0_16px_rgba(168,85,247,0.85)]"
            style={{ textShadow: '0 0 30px rgba(168, 85, 247, 0.6)' }}
          >
            At the edge of fantasy and reality,
            <br />
            a traveller bears witness
          </h1>
          <p
            className="font-orbitron flex min-h-[1.6em] items-center justify-center px-5 py-2 text-center text-[12px] sm:text-[13.5px] font-normal leading-loose text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] tracking-[0.15em]"
            style={{ textShadow: '0 0 20px rgba(0, 0, 0, 0.8)' }}
          >
            I plot coordinates for ideas
            <br />
            — navigating narrative,
            <br />
            platforms,
            <br />
            and the systems
            <br />
            that bring them into form.
          </p>
        </div>
      </div>
    </div>
  );
}
