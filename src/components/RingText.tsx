import { useCallback, useEffect, useId, useMemo, useRef, useState, type CSSProperties } from 'react';

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
  const pathRef = useRef<SVGPathElement>(null);
  const measureRef = useRef<SVGTextElement>(null);
  const ellipseRadiusX = radiusX ?? radius;
  const ellipseRadiusY = radiusY ?? Math.max(36, Math.round(radius * 0.46));
  const padding = 28;
  const width = ellipseRadiusX * 2 + padding * 2;
  const height = ellipseRadiusY * 2 + padding * 2;
  const centerX = width / 2;
  const centerY = height / 2;
  const startX = centerX - ellipseRadiusX;
  const endX = centerX + ellipseRadiusX;
  const patternText = useMemo(() => {
    const trimmedItems = items.map((item) => item.trim()).filter(Boolean);
    return trimmedItems.join('   ');
  }, [items]);
  const baseUnitText = patternText ? `${patternText}   ` : '';
  const [cycleLength, setCycleLength] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const ellipsePath =
    arc === 'top'
      ? `M ${startX} ${centerY} A ${ellipseRadiusX} ${ellipseRadiusY} 0 0 1 ${endX} ${centerY}`
      : arc === 'bottom'
        ? `M ${startX} ${centerY} A ${ellipseRadiusX} ${ellipseRadiusY} 0 0 0 ${endX} ${centerY}`
        : [
            `M ${startX} ${centerY}`,
            `a ${ellipseRadiusX} ${ellipseRadiusY} 0 1 1 ${ellipseRadiusX * 2} 0`,
            `a ${ellipseRadiusX} ${ellipseRadiusY} 0 1 1 ${-ellipseRadiusX * 2} 0`,
          ].join(' ');

  const measureText = useCallback(() => {
    if (!pathRef.current || !measureRef.current || !baseUnitText) return;

    const nextPathLength = pathRef.current.getTotalLength();
    const nextCycleLength = measureRef.current.getComputedTextLength();

    if (Number.isFinite(nextPathLength) && nextPathLength > 0) {
      setPathLength(nextPathLength);
    }
    if (Number.isFinite(nextCycleLength) && nextCycleLength > 0) {
      setCycleLength(nextCycleLength);
    }
  }, [baseUnitText]);

  useEffect(() => {
    const frameId = requestAnimationFrame(measureText);
    window.addEventListener('resize', measureText);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', measureText);
    };
  }, [measureText]);

  const repeatedText = useMemo(() => {
    if (!baseUnitText) return '';

    const safeCycleLength = cycleLength || 1;
    const safePathLength = pathLength || ellipseRadiusX * 2;
    const copyCount = Math.max(6, Math.ceil((safePathLength * 2) / safeCycleLength) + 4);

    return Array(copyCount).fill(baseUnitText).join('');
  }, [baseUnitText, cycleLength, ellipseRadiusX, pathLength]);

  const animationFrom = 0;
  const animationTo = direction === 'forward' ? -cycleLength || -120 : cycleLength || 120;

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
          <path ref={pathRef} id={pathId} d={ellipsePath} />
        </defs>
        <text
          ref={measureRef}
          className={`uppercase ${itemClassName}`}
          style={{
            visibility: 'hidden',
            pointerEvents: 'none',
            textTransform: 'uppercase',
            ...itemStyle,
          }}
          xmlSpace="preserve"
        >
          {baseUnitText || ' '}
        </text>
        <text
          className={`uppercase ${itemClassName}`}
          style={{
            dominantBaseline: 'middle',
            textTransform: 'uppercase',
            fill: 'currentColor',
            filter: 'drop-shadow(0 0 6px rgba(168,85,247,0.9)) drop-shadow(0 0 12px rgba(168,85,247,0.5))',
            ...itemStyle,
          }}
          xmlSpace="preserve"
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
