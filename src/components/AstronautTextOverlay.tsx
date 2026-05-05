import { useEffect, useState } from 'react';

interface AstronautTextOverlayProps {
  isActive: boolean;
}

export function AstronautTextOverlay({ isActive }: AstronautTextOverlayProps) {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<'hidden' | 'block1' | 'block2'>('hidden');

  useEffect(() => {
    if (!isActive) {
      setVisible(false);
      setPhase('hidden');
      return;
    }
    setVisible(true);
    const t1 = setTimeout(() => setPhase('block1'), 200);
    const t2 = setTimeout(() => setPhase('block2'), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isActive]);

  if (!isActive && !visible) return null;

  return (
    <div className="fixed inset-0 z-[55] pointer-events-none">
      <div className="absolute left-1/2 top-1/2 w-[min(92vw,1120px)] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2">
        <div className="flex min-h-fit flex-col items-center justify-center text-center">
          <div
            className="transition-all ease-out duration-1000"
            style={{
              opacity: phase !== 'hidden' ? 1 : 0,
              transform: `translate3d(0, ${phase !== 'hidden' ? 0 : 18}px, 0)`,
              filter: `blur(${phase !== 'hidden' ? '0px' : '6px'})`,
            }}
          >
            <h1
              className="font-russo flex min-h-[1.6em] items-center justify-center px-5 py-2 text-center text-[32px] sm:text-[42px] md:text-[52px] font-normal leading-relaxed gradient-text drop-shadow-[0_0_16px_rgba(168,85,247,0.85)] uppercase"
              style={{ textShadow: '0 0 30px rgba(168, 85, 247, 0.6)' }}
            >
              At the edge of fantasy and reality,
              <br />
              a traveller appears.
            </h1>
          </div>
          <div
            className="transition-all ease-out duration-1000"
            style={{
              opacity: phase === 'block2' ? 1 : 0,
              transform: `translate3d(0, ${phase === 'block2' ? 0 : 14}px, 0)`,
              filter: `blur(${phase === 'block2' ? '0px' : '5px'})`,
              transitionDelay: '200ms',
            }}
          >
            <p
              className="font-russo flex min-h-[1.6em] items-center justify-center px-5 py-2 text-center text-[12px] sm:text-[13.5px] font-normal leading-loose text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] tracking-[0.15em]"
              style={{ textShadow: '0 0 20px rgba(0, 0, 0, 0.8)' }}
            >
              Plotting coordinates for ideas —
              <br />
              through narrative, platforms,
              <br />
              and the systems that bring them into form.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
