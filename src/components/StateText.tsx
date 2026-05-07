import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  STATE2_ABSORPTION_DURATION,
  STATE2_STABILIZE_DURATION,
} from '@/lib/particles/constants';

export type TextSceneState = 0 | 1 | '2' | 3 | 4 | 5 | 6 | 7 | 8;

type TextRole =
  | 'thesis'
  | 'atmosphere'
  | 'spark'
  | 'marker'
  | 'payoff'
  | 'resolution'
  | 'collapse'
  | 'reveal';

interface StateTextConfig {
  role: TextRole;
  lines: string[];
  transitionDuration: number;
  lingerPrevious: number;
  autoExitDelay?: number;
  lineDelay: number;
  lineDelays?: number[];
  charStagger: number;
}

const STATE_TEXT_CONFIG: Record<TextSceneState, StateTextConfig> = {
  0: {
    role: 'thesis',
    lines: ['I have a theory. Our shared universe is our collective mind made visible.'],
    transitionDuration: 800,
    lingerPrevious: 0,
    lineDelay: 200,
    charStagger: 18,
  },
  1: {
    role: 'atmosphere',
    lines: [
      'Across the endless void, most thoughts do not matter —',
      'until inspiration clicks.',
    ],
    transitionDuration: 800,
    lingerPrevious: 420,
    lineDelay: 500,
    lineDelays: [0, 2200],
    charStagger: 16,
  },
  8: {
    role: 'spark',
    lines: [
      'A spark appears.',
      'Left alone, it fades back into the dark.',
    ],
    transitionDuration: 450,
    lingerPrevious: 0,
    lineDelay: 350,
    charStagger: 14,
    autoExitDelay: 2200,
  },
  '2': {
    role: 'marker',
    lines: [],
    transitionDuration: 600,
    lingerPrevious: 0,
    lineDelay: 0,
    charStagger: 0,
  },
  3: {
    role: 'payoff',
    lines: ['A vision begins when other ideas are drawn into orbit.'],
    transitionDuration: 650,
    lingerPrevious: 260,
    lineDelay: 200,
    charStagger: 12,
  },
  4: {
    role: 'marker',
    lines: [],
    transitionDuration: 800,
    lingerPrevious: 260,
    lineDelay: 0,
    charStagger: 0,
  },
  5: {
    role: 'collapse',
    lines: ['Formation collapses. Some things burn brightly, then fade back into the dark.'],
    transitionDuration: 650,
    lingerPrevious: 320,
    lineDelay: 200,
    charStagger: 10,
    autoExitDelay: 3400,
  },
  6: {
    role: 'reveal',
    lines: [
      'At the edge of fantasy and reality,',
      'a traveller appears.',
      'Plotting coordinates for ideas —',
      'through narrative, platforms,',
      'and the systems that bring them into form.',
    ],
    transitionDuration: 800,
    lingerPrevious: 420,
    lineDelay: 400,
    charStagger: 14,
  },
  7: {
    role: 'resolution',
    lines: ['Its influence becomes order, setting an entire universe in motion.'],
    transitionDuration: 750,
    lingerPrevious: 260,
    lineDelay: 200,
    charStagger: 14,
  },
};

interface TextBlockInstance {
  id: number;
  state: TextSceneState;
  config: StateTextConfig;
  phase: 'enter' | 'visible' | 'exit' | 'leaving';
  lineVisibilities: boolean[];
  exitDuration?: number;
}

const HEADER_FADE_DURATION_MS = 1400;

function hasText(config: StateTextConfig, state: TextSceneState): boolean {
  return config.lines.length > 0 || state === '2';
}

interface TypographySpec {
  fontClass: string;
  sizeClass: string;
  trackingClass: string;
  uppercase: boolean;
  toneClass: string;
  textShadow: string;
}

function getRoleTypography(role: TextRole): TypographySpec {
  switch (role) {
    case 'thesis':
      return {
        fontClass: 'font-orbitron',
        sizeClass: 'text-[18px] sm:text-[21px] md:text-[24px]',
        trackingClass: 'tracking-[0.12em]',
        uppercase: false,
        toneClass: 'text-white',
        textShadow: '0 0 1px rgba(255, 255, 255, 0.12)',
      };
    case 'atmosphere':
      return {
        fontClass: 'font-orbitron',
        sizeClass: 'text-[17px] sm:text-[20px] md:text-[23px]',
        trackingClass: 'tracking-[0.1em]',
        uppercase: false,
        toneClass: 'text-white',
        textShadow: '0 0 1px rgba(255, 255, 255, 0.12)',
      };
    case 'spark':
      return {
        fontClass: 'font-orbitron',
        sizeClass: 'text-[16px] sm:text-[19px] md:text-[22px]',
        trackingClass: 'tracking-[0.1em]',
        uppercase: false,
        toneClass: 'text-white',
        textShadow: '0 0 1px rgba(255, 255, 255, 0.12)',
      };
    case 'payoff':
      return {
        fontClass: 'font-orbitron',
        sizeClass: 'text-[17px] sm:text-[20px] md:text-[23px]',
        trackingClass: 'tracking-[0.1em]',
        uppercase: false,
        toneClass: 'text-white',
        textShadow: '0 0 1px rgba(255, 255, 255, 0.12)',
      };
    case 'resolution':
      return {
        fontClass: 'font-orbitron',
        sizeClass: 'text-[17px] sm:text-[20px] md:text-[23px]',
        trackingClass: 'tracking-[0.1em]',
        uppercase: false,
        toneClass: 'text-white',
        textShadow: '0 0 1px rgba(255, 255, 255, 0.12)',
      };
    case 'collapse':
      return {
        fontClass: 'font-orbitron',
        sizeClass: 'text-[16px] sm:text-[19px] md:text-[22px]',
        trackingClass: 'tracking-[0.1em]',
        uppercase: false,
        toneClass: 'text-white',
        textShadow: '0 0 1px rgba(255, 255, 255, 0.1)',
      };
    case 'reveal':
      return {
        fontClass: 'font-orbitron',
        sizeClass: 'text-[16px] sm:text-[19px] md:text-[22px]',
        trackingClass: 'tracking-[0.1em]',
        uppercase: false,
        toneClass: 'text-white',
        textShadow: '0 0 1px rgba(255, 255, 255, 0.12)',
      };
    default:
      return {
        fontClass: 'font-orbitron',
        sizeClass: 'text-[14px]',
        trackingClass: 'tracking-[0.12em]',
        uppercase: false,
        toneClass: 'text-white',
        textShadow: 'none',
      };
  }
}

interface MotionSpec {
  enterY: number;
  exitY: number;
  containerY: number;
}

function getRoleMotion(role: TextRole): MotionSpec {
  switch (role) {
    case 'thesis':
      return { enterY: 6, exitY: -4, containerY: 0 };
    case 'atmosphere':
      return { enterY: 8, exitY: -8, containerY: 0 };
    case 'spark':
      return { enterY: 4, exitY: -6, containerY: 0 };
    case 'marker':
      return { enterY: 3, exitY: -6, containerY: 60 };
    case 'payoff':
      return { enterY: 4, exitY: -6, containerY: 0 };
    case 'resolution':
      return { enterY: 6, exitY: -8, containerY: 0 };
    case 'collapse':
      return { enterY: 3, exitY: -4, containerY: 0 };
    case 'reveal':
      return { enterY: 6, exitY: -8, containerY: 0 };
    default:
      return { enterY: 6, exitY: -4, containerY: 0 };
  }
}

type LinePhase = 'hidden' | 'active' | 'ghost' | 'leaving';

interface EnterOffset {
  x: number;
  y: number;
}

function renderCharReveal(
  text: string,
  linePhase: LinePhase,
  transitionDuration: number,
  charStaggerMs: number,
  enterOffset: EnterOffset,
  className?: string
): ReactNode {
  if (!text) return null;
  const chars = text.split('');
  return chars.map((char, i) => {
    const isHidden = linePhase === 'hidden';
    const isGhost = linePhase === 'ghost';
    const isLeaving = linePhase === 'leaving';
    const delay = isHidden || isGhost || isLeaving ? 0 : i * charStaggerMs;

    const tx = isHidden ? enterOffset.x : isGhost ? 0 : isLeaving ? 0 : 0;
    const ty = isHidden ? enterOffset.y : isGhost ? -3 : isLeaving ? -6 : 0;

    return (
      <span
        key={`${char}-${i}`}
        className={`inline-block ${className || ''}`}
        style={{
          opacity: isLeaving ? 0 : isGhost ? 0.18 : isHidden ? 0 : 1,
          transform: `translate3d(${tx}px, ${ty}px, 0)`,
          filter: `blur(${isLeaving ? 2 : isGhost ? 1 : 0}px)`,
          transitionDuration: `${transitionDuration}ms`,
          transitionDelay: `${delay}ms`,
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          transitionProperty: isGhost || isLeaving ? 'opacity, transform, filter' : 'transform, opacity',
          whiteSpace: 'pre',
        }}
      >
        {char}
      </span>
    );
  });
}

function State2CumulativeText({
  isVisible,
  isExiting,
}: {
  isVisible: boolean;
  isExiting?: boolean;
}) {
  const [beatState, setBeatState] = useState({ current: -1, previous: -1 });

  useEffect(() => {
    if (!isVisible) {
      setBeatState({ current: -1, previous: -1 });
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(
      setTimeout(() => {
        setBeatState({ current: 0, previous: -1 });
      }, 0)
    );
    timers.push(
      setTimeout(() => {
        setBeatState({ current: 1, previous: 0 });
      }, STATE2_ABSORPTION_DURATION)
    );
    timers.push(
      setTimeout(() => {
        setBeatState({ current: 2, previous: 1 });
      }, STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION)
    );
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  const beats = [
    ['A thought given purpose', 'becomes a notion.'],
    ['A notion tested by time', 'begins to take shape as an idea.'],
    ['To become more than itself,', 'an idea must be released.'],
  ];

  const currentBeat = beatState.current;

  return (
    <div className="box-border flex w-[33vw] max-w-[calc(100vw-2rem)] flex-col items-center justify-center px-5 py-2 text-center sm:w-[min(92vw,1120px)] sm:max-w-[calc(100vw-2rem)]">
      {beats.map((beat, i) => {
        const isCurrent = i === currentBeat;
        const isGhost = !isExiting && i < currentBeat && currentBeat >= 0;
        const isFuture = i > currentBeat || currentBeat < 0;
        const transitionProps = isExiting || isGhost
          ? 'opacity, transform, filter'
          : 'transform';

        return (
          <div
            key={i}
            className="font-orbitron text-[17px] sm:text-[20px] md:text-[23px] font-normal leading-relaxed text-white tracking-[0.1em] transition-all ease-out"
            style={{
              opacity: isExiting ? 0 : isCurrent ? 1 : isGhost ? 0.2 : 0,
              transform: `translate3d(0, ${isExiting ? -6 : isFuture ? 4 : isGhost ? -2 : 0}px, 0)`,
              filter: `blur(${isExiting ? 2 : isGhost ? 1 : 0}px)`,
              transitionDuration: `${isExiting ? HEADER_FADE_DURATION_MS : 500}ms`,
              transitionProperty: transitionProps,
              pointerEvents: 'none',
              position: isCurrent || isGhost ? 'relative' : 'absolute',
              textShadow: isGhost
                ? '0 0 1px rgba(255,255,255,0.04)'
                : '0 0 1px rgba(255,255,255,0.08)',
            }}
          >
            {(beat as string[]).map((line, li) => (
              <div key={li} style={{ marginTop: li > 0 ? '0.35em' : 0 }}>
                {line}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function createTextInstance(state: TextSceneState, id: number): TextBlockInstance {
  const config = STATE_TEXT_CONFIG[state];
  return {
    id,
    state,
    config,
    phase: 'enter',
    lineVisibilities: state === '2' ? [false] : config.lines.map(() => false),
  };
}

export function StateText({ state }: { state: TextSceneState }) {
  const [active, setActive] = useState<TextBlockInstance | null>(null);
  const [previous, setPrevious] = useState<TextBlockInstance | null>(null);
  const activeRef = useRef<TextBlockInstance | null>(null);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const nextIdRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const clearTimers = () => {
      timerRefs.current.forEach((timerId) => clearTimeout(timerId));
      timerRefs.current = [];
    };

    const queueTimer = (callback: () => void, delay: number) => {
      const timerId = setTimeout(callback, delay);
      timerRefs.current.push(timerId);
    };

    clearTimers();

    const nextConfig = STATE_TEXT_CONFIG[state];
    const outgoing = activeRef.current;

    const isTransitionable = (phase: string) =>
      phase !== 'exit' && phase !== 'leaving';

    if (
      outgoing &&
      isTransitionable(outgoing.phase) &&
      hasText(outgoing.config, outgoing.state) &&
      nextConfig.lingerPrevious > 0
    ) {
      const previousInstance: TextBlockInstance = {
        ...outgoing,
        phase: 'visible',
        lineVisibilities: outgoing.lineVisibilities.map((v) => v),
        exitDuration: nextConfig.transitionDuration,
      };
      setPrevious(previousInstance);
      queueTimer(() => {
        setPrevious((prev) =>
          prev?.id === previousInstance.id ? { ...prev, phase: 'exit' } : prev
        );
      }, 20);
      queueTimer(() => {
        setPrevious((prev) =>
          prev?.id === previousInstance.id ? { ...prev, phase: 'leaving' } : prev
        );
      }, nextConfig.lingerPrevious);
      queueTimer(() => {
        setPrevious((prev) =>
          prev?.id === previousInstance.id ? null : prev
        );
      }, nextConfig.lingerPrevious + nextConfig.transitionDuration);
    } else {
      setPrevious(null);
    }

    const nextInstance = createTextInstance(state, nextIdRef.current);
    nextIdRef.current += 1;
    setActive(nextInstance);

    if (nextInstance.state === '2') {
      queueTimer(() => {
        setActive((current) =>
          current?.id === nextInstance.id
            ? { ...current, phase: 'visible', lineVisibilities: [true] }
            : current
        );
      }, 0);
    } else {
      nextConfig.lines.forEach((_, i) => {
        const delay = nextConfig.lineDelays?.[i] ??
          (i === 0 ? Math.min(nextConfig.lineDelay, 200) : nextConfig.lineDelay * i);
        queueTimer(() => {
          setActive((current) =>
            current?.id === nextInstance.id
              ? {
                  ...current,
                  phase: 'visible',
                  lineVisibilities: current.lineVisibilities.map(
                    (v, idx) => v || idx === i
                  ),
                }
              : current
          );
        }, delay);
      });
    }

    if (nextConfig.autoExitDelay) {
      queueTimer(() => {
        setActive((current) =>
          current?.id === nextInstance.id
            ? {
                ...current,
                phase: 'exit',
                lineVisibilities: current.lineVisibilities.map(() => true),
              }
            : current
        );
      }, nextConfig.autoExitDelay);
      queueTimer(() => {
        setActive((current) =>
          current?.id === nextInstance.id
            ? { ...current, phase: 'leaving' }
            : current
        );
      }, nextConfig.autoExitDelay + nextConfig.transitionDuration);
    }

    return clearTimers;
  }, [state]);

  const renderTextBlock = (
    instance: TextBlockInstance,
    mode: 'previous' | 'active'
  ) => {
    if (!hasText(instance.config, instance.state)) return null;

    const { config, phase } = instance;
    const isGhost = phase === 'exit';
    const isLeaving = phase === 'leaving';
    const duration = instance.exitDuration ?? config.transitionDuration;
    const motion = getRoleMotion(config.role);
    const blockY = isLeaving ? motion.exitY - 2 : isGhost ? motion.exitY : motion.containerY;

    if (instance.state === '2') {
      return (
        <div
          key={`${mode}-${instance.id}-${instance.state}`}
          className="absolute inset-0 flex items-center justify-center transition-all ease-out"
          style={{
            opacity: isLeaving ? 0 : 1,
            transform: `translate3d(0, ${blockY}px, 0)`,
            transitionDuration: `${duration}ms`,
          }}
        >
          <State2CumulativeText
            isVisible={instance.lineVisibilities[0] ?? false}
            isExiting={isGhost || isLeaving}
          />
        </div>
      );
    }

    return (
      <div
        key={`${mode}-${instance.id}-${instance.state}`}
        className="absolute inset-0 flex items-center justify-center transition-all ease-out"
        style={{
          opacity: isLeaving ? 0 : 1,
          transform: `translate3d(0, ${blockY}px, 0)`,
          transitionDuration: `${duration}ms`,
        }}
      >
        <div className="flex flex-col items-center justify-center text-center px-5">
          {config.lines.map((line, i) => {
            const lineWasVisible = instance.lineVisibilities[i];
            const linePhase: LinePhase = !lineWasVisible
              ? 'hidden'
              : isLeaving
                ? 'leaving'
                : isGhost
                  ? 'ghost'
                  : 'active';
            const typography = getRoleTypography(config.role);
            const textShadow =
              linePhase === 'ghost'
                ? '0 0 1px rgba(255,255,255,0.04)'
                : linePhase === 'leaving'
                  ? '0 0 1px rgba(255,255,255,0.02)'
                  : typography.textShadow;

            return (
              <div
                key={i}
                className={`${typography.fontClass} ${typography.sizeClass} ${typography.trackingClass} ${typography.toneClass} ${typography.uppercase ? 'uppercase' : ''} leading-relaxed`}
                style={{ textShadow, marginTop: i > 0 ? '0.35em' : 0 }}
              >
                {renderCharReveal(
                  line,
                  linePhase,
                  config.transitionDuration,
                  config.charStagger,
                  { x: 12, y: 0 },
                  'transition-all ease-out'
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`fixed inset-0 pointer-events-none ${state === 7 ? 'z-50' : 'z-20'}`}>
      <div className="relative w-full h-full">
        {previous && renderTextBlock(previous, 'previous')}
        {active && renderTextBlock(active, 'active')}
      </div>
    </div>
  );
}
