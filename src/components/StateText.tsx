import { useEffect, useRef, useState, type ReactNode } from 'react';

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
  wordStagger: number;
}

const STATE_TEXT_CONFIG: Record<TextSceneState, StateTextConfig> = {
  0: {
    role: 'thesis',
    lines: [
      'I have a theory.',
      'Our shared universe is our collective mind made visible.',
    ],
    transitionDuration: 800,
    lingerPrevious: 0,
    lineDelay: 900,
    wordStagger: 70,
  },
  1: {
    role: 'atmosphere',
    lines: [
      'Drifting across endless darkness,',
      'every thought moves without direction.',
    ],
    transitionDuration: 800,
    lingerPrevious: 420,
    lineDelay: 720,
    wordStagger: 65,
  },
  8: {
    role: 'spark',
    lines: [
      'Inspiration clicks.',
      'Something begins to gather.',
    ],
    transitionDuration: 450,
    lingerPrevious: 0,
    lineDelay: 280,
    wordStagger: 40,
    autoExitDelay: 1800,
  },
  '2': {
    role: 'marker',
    lines: [],
    transitionDuration: 600,
    lingerPrevious: 0,
    lineDelay: 0,
    wordStagger: 0,
  },
  3: {
    role: 'payoff',
    lines: [
      'Orbit takes hold.',
      'What once drifted begins to gather around a centre.',
    ],
    transitionDuration: 650,
    lingerPrevious: 260,
    lineDelay: 600,
    wordStagger: 40,
  },
  4: {
    role: 'marker',
    lines: [],
    transitionDuration: 800,
    lingerPrevious: 260,
    lineDelay: 0,
    wordStagger: 0,
  },
  5: {
    role: 'collapse',
    lines: [
      'Formation collapses.',
      'Some things burn brightly,',
      'then fade back into the dark.',
    ],
    transitionDuration: 650,
    lingerPrevious: 320,
    lineDelay: 480,
    wordStagger: 25,
    autoExitDelay: 3400,
  },
  6: {
    role: 'marker',
    lines: [],
    transitionDuration: 800,
    lingerPrevious: 420,
    lineDelay: 0,
    wordStagger: 0,
  },
  7: {
    role: 'resolution',
    lines: [
      'Its influence becomes order,',
      'setting its universe in motion.',
    ],
    transitionDuration: 750,
    lingerPrevious: 260,
    lineDelay: 650,
    wordStagger: 55,
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
const STATE2_TEXT_STEP_MS = 3000;

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

function getRoleTypography(role: TextRole, lineIndex: number): TypographySpec {
  switch (role) {
    case 'thesis':
      return lineIndex === 0
        ? {
            fontClass: 'font-russo',
            sizeClass: 'text-[25.6px] sm:text-[33.6px] md:text-[41.6px]',
            trackingClass: 'tracking-[0.15em]',
            uppercase: true,
            toneClass: 'gradient-text',
            textShadow: '0 0 1px rgba(168, 85, 247, 0.35)',
          }
        : {
            fontClass: 'font-orbitron',
            sizeClass: 'text-[11.2px] sm:text-[12px]',
            trackingClass: 'tracking-[0.12em]',
            uppercase: false,
            toneClass: 'text-white/90',
            textShadow: '0 0 1px rgba(255, 255, 255, 0.12)',
          };
    case 'atmosphere':
      return {
        fontClass: 'font-russo',
        sizeClass: 'text-[19.2px] sm:text-[25.6px] md:text-[32px]',
        trackingClass: 'tracking-[0.1em]',
        uppercase: true,
        toneClass: 'gradient-text',
        textShadow: '0 0 1px rgba(168, 85, 247, 0.35)',
      };
    case 'spark':
      return lineIndex === 0
        ? {
            fontClass: 'font-russo',
            sizeClass: 'text-[22.4px] sm:text-[28.8px] md:text-[35.2px]',
            trackingClass: 'tracking-[0.12em]',
            uppercase: true,
            toneClass: 'gradient-text',
            textShadow: '0 0 1px rgba(168, 85, 247, 0.35)',
          }
        : {
            fontClass: 'font-orbitron',
            sizeClass: 'text-[10.4px] sm:text-[11.2px]',
            trackingClass: 'tracking-[0.12em]',
            uppercase: false,
            toneClass: 'text-white/85',
            textShadow: '0 0 1px rgba(255, 255, 255, 0.1)',
          };
    case 'payoff':
      return lineIndex === 0
        ? {
            fontClass: 'font-russo',
            sizeClass: 'text-[22.4px] sm:text-[28.8px] md:text-[35.2px]',
            trackingClass: 'tracking-[0.12em]',
            uppercase: true,
            toneClass: 'text-[#ffd4a3]',
            textShadow: '0 0 1px rgba(249, 115, 22, 0.35)',
          }
        : {
            fontClass: 'font-orbitron',
            sizeClass: 'text-[10.4px] sm:text-[11.2px]',
            trackingClass: 'tracking-[0.15em]',
            uppercase: false,
            toneClass: 'text-white/85',
            textShadow: '0 0 1px rgba(255, 255, 255, 0.1)',
          };
    case 'resolution':
      return {
        fontClass: 'font-russo',
        sizeClass: 'text-[19.2px] sm:text-[25.6px] md:text-[32px]',
        trackingClass: 'tracking-[0.1em]',
        uppercase: true,
        toneClass: 'gradient-text',
        textShadow: '0 0 1px rgba(168, 85, 247, 0.35)',
      };
    case 'collapse':
      return lineIndex === 0
        ? {
            fontClass: 'font-russo',
            sizeClass: 'text-[19.2px] sm:text-[24px] md:text-[28.8px]',
            trackingClass: 'tracking-[0.1em]',
            uppercase: true,
            toneClass: 'text-white/85',
            textShadow: '0 0 1px rgba(255, 255, 255, 0.1)',
          }
        : {
            fontClass: 'font-orbitron',
            sizeClass: 'text-[10.4px] sm:text-[11.2px]',
            trackingClass: 'tracking-[0.12em]',
            uppercase: false,
            toneClass: 'text-white/70',
            textShadow: '0 0 1px rgba(255, 255, 255, 0.06)',
          };
    default:
      return {
        fontClass: 'font-orbitron',
        sizeClass: 'text-[10.4px]',
        trackingClass: 'tracking-[0.15em]',
        uppercase: false,
        toneClass: 'text-white',
        textShadow: 'none',
      };
  }
}

interface MotionSpec {
  enterY: number;
  exitY: number;
  blurEnter: number;
  containerY: number;
}

function getRoleMotion(role: TextRole): MotionSpec {
  switch (role) {
    case 'thesis':
      return { enterY: 6, exitY: -4, blurEnter: 2, containerY: 0 };
    case 'atmosphere':
      return { enterY: 8, exitY: -8, blurEnter: 2, containerY: 0 };
    case 'spark':
      return { enterY: 4, exitY: -6, blurEnter: 1, containerY: 0 };
    case 'marker':
      return { enterY: 3, exitY: -6, blurEnter: 1, containerY: 60 };
    case 'payoff':
      return { enterY: 4, exitY: -6, blurEnter: 1, containerY: 0 };
    case 'resolution':
      return { enterY: 6, exitY: -8, blurEnter: 2, containerY: 0 };
    case 'collapse':
      return { enterY: 3, exitY: -4, blurEnter: 1, containerY: 0 };
    default:
      return { enterY: 6, exitY: -4, blurEnter: 2, containerY: 0 };
  }
}

function getLineGap(role: TextRole): string {
  switch (role) {
    case 'thesis':
      return '0.6em';
    case 'atmosphere':
      return '0.25em';
    case 'spark':
      return '0.5em';
    case 'payoff':
      return '0.6em';
    case 'resolution':
      return '0.25em';
    case 'collapse':
      return '0.5em';
    default:
      return '0.5em';
  }
}

type LinePhase = 'hidden' | 'active' | 'ghost' | 'leaving';

function renderWordReveal(
  text: string,
  linePhase: LinePhase,
  transitionDuration: number,
  staggerMs: number,
  enterY: number,
  className?: string
): ReactNode {
  if (!text) return null;
  const words = text.trim().split(/\s+/);
  return words.map((word, i) => {
    const isHidden = linePhase === 'hidden';
    const isGhost = linePhase === 'ghost';
    const isLeaving = linePhase === 'leaving';
    const delay = isHidden || isGhost || isLeaving ? 0 : i * staggerMs;

    return (
      <span
        key={`${word}-${i}`}
        className={`inline-block ${className || ''}`}
        style={{
          opacity: isLeaving ? 0 : isGhost ? 0.2 : isHidden ? 0 : 1,
          transform: `translate3d(0, ${isLeaving ? -6 : isGhost ? -3 : isHidden ? enterY : 0}px, 0)`,
          filter: `blur(${isLeaving ? 2 : isGhost ? 1 : 0}px)`,
          transitionDuration: `${transitionDuration}ms`,
          transitionDelay: `${delay}ms`,
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          transitionProperty: isGhost || isLeaving ? 'opacity, transform, filter' : 'transform',
          marginRight: '0.28em',
        }}
      >
        {word}
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
  const [wordState, setWordState] = useState({ current: -1, previous: -1 });
  const [lineState, setLineState] = useState({ current: -1, previous: -1 });

  useEffect(() => {
    if (!isVisible) {
      setWordState({ current: -1, previous: -1 });
      setLineState({ current: -1, previous: -1 });
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(
      setTimeout(() => {
        setWordState({ current: 0, previous: -1 });
        setLineState({ current: 0, previous: -1 });
      }, 0 * STATE2_TEXT_STEP_MS)
    );
    timers.push(
      setTimeout(() => {
        setWordState({ current: 1, previous: 0 });
        setLineState({ current: 1, previous: 0 });
      }, 1 * STATE2_TEXT_STEP_MS)
    );
    timers.push(
      setTimeout(() => {
        setWordState({ current: 2, previous: 1 });
        setLineState({ current: 2, previous: 1 });
      }, 2 * STATE2_TEXT_STEP_MS)
    );
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  const words = ['Time.', 'Pressure.', 'Intent.'];
  const lines = [
    'A spark disappears unless it is returned to.',
    'What survives the hold begins to take shape.',
    'To grow beyond its first form, it must be released.',
  ];

  const currentWord = wordState.current;
  const currentLine = lineState.current;

  return (
    <div className="box-border flex w-[33vw] max-w-[calc(100vw-2rem)] flex-col items-center justify-center px-5 py-2 text-center sm:w-[min(92vw,1120px)] sm:max-w-[calc(100vw-2rem)]">
      <h1
        className="font-russo flex w-full flex-col items-center justify-center gap-1 text-center text-[19.2px] sm:text-[25.6px] md:text-[32px] font-normal leading-none uppercase"
        style={{ zIndex: 10 }}
      >
        {words.map((word, i) => {
          const isCurrent = i === currentWord;
          const isGhost = !isExiting && i < currentWord && currentWord >= 0;
          const isFuture = i > currentWord || currentWord < 0;
          const transitionProps = isExiting || isGhost
            ? 'opacity, transform, filter'
            : 'transform';

          return (
            <span
              key={word}
              className="block transition-all ease-out"
              style={{
                color: '#22d3ee',
                opacity: isExiting ? 0 : isCurrent ? 1 : isGhost ? 0.2 : 0,
                transform: `translate3d(0, ${isExiting ? -6 : isFuture ? 4 : isGhost ? -2 : 0}px, 0)`,
                filter: `blur(${isExiting ? 2 : isGhost ? 1 : 0}px)`,
                textShadow: isGhost
                  ? '0 0 1px #22d3ee22'
                  : '0 0 1px #22d3ee55',
                transitionDuration: `${isExiting ? HEADER_FADE_DURATION_MS : 500}ms`,
                transitionProperty: transitionProps,
                pointerEvents: 'none',
              }}
            >
              {word}
            </span>
          );
        })}
      </h1>

      <div
        className="relative mt-3 min-h-[2em] w-full flex items-center justify-center"
        style={{ zIndex: 30 }}
      >
        {lines.map((line, i) => {
          const isCurrent = i === currentLine;
          const isGhost = !isExiting && i < currentLine && currentLine >= 0;
          const isFuture = i > currentLine || currentLine < 0;
          const transitionProps = isExiting || isGhost
            ? 'opacity, transform, filter'
            : 'transform';

          return (
            <p
              key={i}
              className="absolute font-orbitron flex w-full items-center justify-center text-center text-[9.6px] sm:text-[10.4px] font-normal leading-relaxed text-white tracking-[0.15em]"
              style={{
                opacity: isExiting ? 0 : isCurrent ? 1 : isGhost ? 0.2 : 0,
                transform: `translate3d(0, ${isExiting ? -6 : isFuture ? 4 : isGhost ? -2 : 0}px, 0)`,
                filter: `blur(${isExiting ? 2 : isGhost ? 1 : 0}px)`,
                transitionDuration: `${isExiting || isGhost ? HEADER_FADE_DURATION_MS : 600}ms`,
                transitionProperty: transitionProps,
                textShadow: isGhost
                  ? '0 0 1px rgba(255,255,255,0.04)'
                  : '0 0 1px rgba(255, 255, 255, 0.08)',
                pointerEvents: 'none',
              }}
            >
              {line}
            </p>
          );
        })}
      </div>
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
        const delay =
          i === 0 ? Math.min(nextConfig.lineDelay, 200) : nextConfig.lineDelay * i;
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
          className="absolute inset-0 flex flex-col items-center justify-center transition-all ease-out"
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
        className="absolute inset-0 flex flex-col items-center justify-center transition-all ease-out"
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
            const typography = getRoleTypography(config.role, i);
            const lineEnterY = motion.enterY + i * 2;
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
                style={{
                  textShadow,
                  marginTop: i > 0 ? getLineGap(config.role) : 0,
                }}
              >
                {renderWordReveal(
                  line,
                  linePhase,
                  config.transitionDuration,
                  config.wordStagger,
                  lineEnterY,
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
