interface RingTextProps {
  items: string[];
  radius?: number;
  duration?: number;
  className?: string;
}

export function RingText({ items, radius = 140, duration = 12, className = '' }: RingTextProps) {
  const angleStep = 360 / items.length;

  return (
    <div
      className={`pointer-events-none absolute left-1/2 top-1/2 z-10 ${className}`}
      style={{
        perspective: '800px',
        transform: 'translate(-50%, -50%) rotateX(-10deg) rotateY(15deg)',
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
      }}
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          animation: `ring-spin ${duration}s linear infinite`,
        }}
      >
        {items.map((text, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] text-white"
            style={{
              transform: `translate(-50%, -50%) rotateY(${i * angleStep}deg) translateZ(${radius}px)`,
              backfaceVisibility: 'hidden',
              textShadow: '0 0 6px rgba(168,85,247,0.9), 0 0 12px rgba(168,85,247,0.5)',
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
