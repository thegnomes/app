import { useId, type CSSProperties } from 'react';

interface RingTextProps {
  items: string[];
  radius?: number;
  radiusX?: number;
  radiusY?: number;
  arc?: 'full' | 'top' | 'bottom';
  duration?: number;
  className?: string;
  itemClassName?: string;
  itemStyle?: CSSProperties;
  verticalOffset?: number;
  direction?: 'forward' | 'reverse';
}

export function RingText({
  items,
  radius = 140,
  radiusX,
  radiusY,
  arc = 'full',
  duration = 12,
  className = '',
  itemClassName = '',
  itemStyle,
  verticalOffset = 0,
  direction = 'forward',
}: RingTextProps) {
  const pathId = useId().replace(/:/g, '');
  const ellipseRadiusX = radiusX ?? radius;
  const ellipseRadiusY = radiusY ?? Math.max(36, Math.round(radius * 0.46));
  const padding = 28;
  const width = ellipseRadiusX * 2 + padding * 2;
  const height = ellipseRadiusY * 2 + padding * 2;
  const centerX = width / 2;
  const centerY = height / 2;
  const startX = centerX - ellipseRadiusX;
  const endX = centerX + ellipseRadiusX;
  const repeatedText = items.join('     ');
  const animationFrom = direction === 'forward' ? '0%' : '100%';
  const animationTo = direction === 'forward' ? '100%' : '0%';
  const ellipsePath =
    arc === 'top'
      ? `M ${startX} ${centerY} A ${ellipseRadiusX} ${ellipseRadiusY} 0 0 1 ${endX} ${centerY}`
      : arc === 'bottom'
        ? `M ${endX} ${centerY} A ${ellipseRadiusX} ${ellipseRadiusY} 0 0 1 ${startX} ${centerY}`
        : [
            `M ${startX} ${centerY}`,
            `a ${ellipseRadiusX} ${ellipseRadiusY} 0 1 1 ${ellipseRadiusX * 2} 0`,
            `a ${ellipseRadiusX} ${ellipseRadiusY} 0 1 1 ${-ellipseRadiusX * 2} 0`,
          ].join(' ');

  return (
    <div
      className={`pointer-events-none absolute left-1/2 top-1/2 z-10 ${className}`}
      style={{
        transform: `translate(-50%, -50%) translateY(${verticalOffset}px)`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <svg
        className="h-full w-full overflow-visible"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <path id={pathId} d={ellipsePath} />
        </defs>
        <text
          className={`uppercase ${itemClassName}`}
          style={{
            dominantBaseline: 'middle',
            textTransform: 'uppercase',
            fill: 'currentColor',
            filter: 'drop-shadow(0 0 6px rgba(168,85,247,0.9)) drop-shadow(0 0 12px rgba(168,85,247,0.5))',
            ...itemStyle,
          }}
        >
          <textPath href={`#${pathId}`} startOffset={animationFrom}>
            {repeatedText}
            <animate
              attributeName="startOffset"
              from={animationFrom}
              to={animationTo}
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </textPath>
        </text>
      </svg>
    </div>
  );
}
