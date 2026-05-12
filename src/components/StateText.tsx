import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  STATE2_ABSORPTION_DURATION,
  STATE2_STABILIZE_DURATION,
} from '@/lib/particles/constants';

export type TextSceneState = 0 | 1 | '2' | 3 | 4 | 5 | 6 | 7 | 8 | 9;

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
  lines?: string[];
  copy?: StateTextCopy;
  transitionDuration: number;
  lingerPrevious: number;
  autoExitDelay?: number;
  lineDelay: number;
  lineDelays?: number[];
  charStagger: number;
  emphasisLines?: number[];
}

interface StateTextCopy {
  header: string;
  subtext: string;
  instruction: string;
}

const STATE_TEXT_CONFIG: Record<TextSceneState, StateTextConfig> = {
  0: {
    role: 'thesis',
    copy: {
      header: 'Stars and ideas form alike.',
      subtext: 'Both begin as potential, waiting for the right conditions.',
      instruction: 'Watch closely.',
    },
    transitionDuration: 1400,
    lingerPrevious: 0,
    lineDelay: 200,
    charStagger: 18,
  },
  1: {
    role: 'atmosphere',
    copy: {
      header: 'A spark begins it.',
      subtext: 'Energy for a star. Inspiration for an idea.',
      instruction: 'Click to spark an idea.',
    },
    transitionDuration: 1400,
    lingerPrevious: 420,
    lineDelay: 360,
    lineDelays: [1500, 1900, 2400],
    charStagger: 16,
  },
  8: {
    role: 'spark',
    copy: {
      header: 'A spark appears.',
      subtext: 'The formation begins.',
      instruction: 'Hold to keep it forming.',
    },
    transitionDuration: 900,
    lingerPrevious: 0,
    lineDelay: 180,
    lineDelays: [0, 180, 420],
    charStagger: 14,
  },
  9: {
    role: 'spark',
    lines: ['Left alone, it fades back into the dark.'],
    transitionDuration: 900,
    lingerPrevious: 320,
    lineDelay: 0,
    charStagger: 12,
    autoExitDelay: 2200,
  },
  '2': {
    role: 'marker',
    lines: [],
    transitionDuration: 1000,
    lingerPrevious: 0,
    lineDelay: 0,
    charStagger: 0,
  },
  3: {
    role: 'payoff',
    copy: {
      header: 'Execution ignites the core.',
      subtext: 'The idea crosses from thought into form.',
      instruction: 'Let it unfold.',
    },
    transitionDuration: 1100,
    lingerPrevious: 260,
    lineDelay: 260,
    charStagger: 12,
  },
  4: {
    role: 'marker',
    lines: [],
    transitionDuration: 1400,
    lingerPrevious: 260,
    lineDelay: 0,
    charStagger: 0,
  },
  5: {
    role: 'collapse',
    copy: {
      header: 'Uncertainty breaks formation.',
      subtext: 'The idea fades before it can hold.',
      instruction: 'Try again with steadier intent.',
    },
    transitionDuration: 1100,
    lingerPrevious: 320,
    lineDelay: 260,
    charStagger: 10,
    autoExitDelay: 3400,
  },
  6: {
    role: 'reveal',
    copy: {
      header: 'At the edge of fantasy and reality,',
      subtext: 'a traveller appears—charting a course through uncertainty.',
      instruction: 'Enter the portfolio.',
    },
    transitionDuration: 1400,
    lingerPrevious: 420,
    lineDelay: 320,
    charStagger: 14,
  },
  7: {
    role: 'resolution',
    copy: {
      header: 'Vision creates gravity.',
      subtext: 'Other ideas gather around it, forming something larger.',
      instruction: 'Follow the universe outward.',
    },
    transitionDuration: 1300,
    lingerPrevious: 260,
    lineDelay: 300,
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

type TextPartKind = 'header' | 'subtext' | 'instruction' | 'line';

interface TextPart {
  kind: TextPartKind;
  text: string;
  sourceIndex: number;
}

function getTextParts(config: StateTextConfig): TextPart[] {
  if (config.copy) {
    return getCopyParts(config.copy);
  }

  return (config.lines ?? []).map((text, sourceIndex) => ({
    kind: 'line',
    text,
    sourceIndex,
  }));
}

function getCopyParts(copy: StateTextCopy): TextPart[] {
  return [
    { kind: 'header', text: copy.header, sourceIndex: 0 },
    { kind: 'subtext', text: copy.subtext, sourceIndex: 1 },
    { kind: 'instruction', text: copy.instruction, sourceIndex: 2 },
  ];
}

function hasText(config: StateTextConfig, state: TextSceneState): boolean {
  return getTextParts(config).length > 0 || state === '2';
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
      return { enterY: 3, exitY: -6, containerY: 0 };
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

  const segments: { text: string; emphasized: boolean }[] = [];
  const pattern = /\*([^*]+)\*/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), emphasized: false });
    }
    segments.push({ text: match[1], emphasized: true });
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), emphasized: false });
  }

  const elements: ReactNode[] = [];
  let charIndex = 0;

  for (const segment of segments) {
    const chars = segment.text.split('');
    for (const char of chars) {
      const isHidden = linePhase === 'hidden';
      const isGhost = linePhase === 'ghost';
      const isLeaving = linePhase === 'leaving';
      const delay = isHidden || isGhost || isLeaving ? 0 : charIndex * charStaggerMs;

      const tx = isHidden ? enterOffset.x : isGhost ? 0 : isLeaving ? 0 : 0;
      const ty = isHidden ? enterOffset.y : isGhost ? -3 : isLeaving ? -6 : 0;

      elements.push(
        <span
          key={`${char}-${charIndex}`}
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
            ...(segment.emphasized && {
              color: '#e8ffff',
              textShadow: '0 0 6px rgba(180, 240, 255, 0.5), 0 0 14px rgba(160, 230, 255, 0.25)',
              letterSpacing: '0.03em',
            }),
          }}
        >
          {char}
        </span>
      );
      charIndex++;
    }
  }

  return elements;
}

function State2CumulativeText({
  isVisible,
  isExiting,
  transitionDuration = 600,
}: {
  isVisible: boolean;
  isExiting?: boolean;
  transitionDuration?: number;
}) {
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [beatPhase, setBeatPhase] = useState<LinePhase>('hidden');
  const [partVisibilities, setPartVisibilities] = useState([false, false, false]);

  useEffect(() => {
    if (!isVisible) {
      const frameId = requestAnimationFrame(() => {
        setCurrentBeat(-1);
        setBeatPhase('hidden');
        setPartVisibilities([false, false, false]);
      });
      return () => cancelAnimationFrame(frameId);
    }
    const timers: ReturnType<typeof setTimeout>[] = [];

    const showBeat = (index: number) => {
      setCurrentBeat(index);
      setBeatPhase('hidden');
      setPartVisibilities([false, false, false]);
      timers.push(setTimeout(() => setBeatPhase('active'), 60));
      [0, 220, 520].forEach((delay, partIndex) => {
        timers.push(
          setTimeout(() => {
            setPartVisibilities((current) =>
              current.map((visible, index) => visible || index === partIndex)
            );
          }, 60 + delay)
        );
      });
    };

    const hideBeat = () => {
      setBeatPhase('leaving');
      setPartVisibilities([true, true, true]);
    };

    timers.push(setTimeout(() => showBeat(0), 0));

    timers.push(setTimeout(() => hideBeat(), STATE2_ABSORPTION_DURATION - 500));
    timers.push(setTimeout(() => showBeat(1), STATE2_ABSORPTION_DURATION));

    timers.push(
      setTimeout(() => hideBeat(), STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION - 500)
    );
    timers.push(
      setTimeout(() => showBeat(2), STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION)
    );

    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  const beats: StateTextCopy[] = [
    {
      header: 'Time shapes it.',
      subtext: 'The spark begins to gather form.',
      instruction: 'Hold to keep it forming.',
    },
    {
      header: 'Pressure gives it mass.',
      subtext: 'Held long enough, it starts pulling more into itself.',
      instruction: 'Keep holding.',
    },
    {
      header: 'Commitment gives it direction.',
      subtext: 'It stops drifting and starts becoming real.',
      instruction: 'Release when it stabilises.',
    },
  ];

  if (currentBeat < 0 || currentBeat >= beats.length) return null;
  const beat = beats[currentBeat];
  const beatParts = getCopyParts(beat);

  const linePhase: LinePhase = isExiting ? 'leaving' : beatPhase;

  return (
    <div className="box-border flex w-full flex-col items-center justify-center px-5 py-2 text-center break-keep sm:w-[min(92vw,1120px)] sm:max-w-[calc(100vw-2rem)] sm:items-center sm:justify-center">
      <div
        className="font-orbitron font-normal leading-snug sm:leading-relaxed transition-all ease-out"
        style={{
          opacity: isExiting ? 0 : 1,
          transform: `translate3d(0, ${isExiting ? -6 : 0}px, 0)`,
          filter: `blur(${isExiting ? 2 : 0}px)`,
          transitionDuration: `${isExiting ? transitionDuration : 500}ms`,
          transitionProperty: isExiting ? 'opacity, transform, filter' : 'transform',
          pointerEvents: 'none',
          textShadow: '0 0 1px rgba(255,255,255,0.08)',
        }}
      >
        {beatParts.map((part, li) => {
          const partPhase: LinePhase = partVisibilities[li] ? linePhase : 'hidden';
          const isInstruction = part.kind === 'instruction';
          const className = isInstruction
            ? 'mt-[0.75em] text-[11px] font-medium uppercase tracking-[0.22em] text-white/45 sm:text-[12px] md:text-[13px]'
            : part.kind === 'subtext'
              ? 'text-[15px] tracking-[0.08em] text-white/80 sm:text-[18px] md:text-[20px]'
              : 'text-[17px] tracking-[0.1em] text-white sm:text-[20px] md:text-[23px]';
          const charStagger = isInstruction ? 8 : part.kind === 'subtext' ? 10 : 12;

          return (
          <div
            key={part.kind}
            className={className}
            style={{
              marginTop: li > 0 && !isInstruction ? '0.28em' : undefined,
            }}
          >
            {renderCharReveal(part.text, partPhase, transitionDuration, charStagger, { x: 8, y: 0 }, 'transition-all ease-out')}
          </div>
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
    lineVisibilities: state === '2' ? [false] : getTextParts(config).map(() => false),
  };
}

export function StateText({ state }: { state: TextSceneState }) {
  const [active, setActive] = useState<TextBlockInstance | null>(null);
  const [previous, setPrevious] = useState<TextBlockInstance | null>(null);
  const activeRef = useRef<TextBlockInstance | null>(null);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const nextIdRef = useRef(0);
  const shouldRenderAboveVideo = state === 6 || state === 7;

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
      hasText(outgoing.config, outgoing.state)
    ) {
      const exitDelay = Math.max(20, nextConfig.lingerPrevious);
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
      }, exitDelay);
      queueTimer(() => {
        setPrevious((prev) =>
          prev?.id === previousInstance.id ? null : prev
        );
      }, exitDelay + nextConfig.transitionDuration);
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
      getTextParts(nextConfig).forEach((_, i) => {
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
          className="absolute top-0 left-[10vw] h-[50dvh] w-[80vw] flex items-center justify-center transition-all ease-out sm:inset-0 sm:h-auto sm:w-auto sm:items-center"
          style={{
            opacity: isLeaving ? 0 : 1,
            transform: `translate3d(0, ${blockY}px, 0)`,
            filter: `blur(${isLeaving ? 4 : isGhost ? 2 : 0}px)`,
            transitionDuration: `${duration}ms`,
            transitionProperty: 'opacity, transform, filter',
          }}
        >
          <State2CumulativeText
            isVisible={instance.lineVisibilities[0] ?? false}
            isExiting={isGhost || isLeaving}
            transitionDuration={duration}
          />
        </div>
      );
    }

    return (
      <div
        key={`${mode}-${instance.id}-${instance.state}`}
        className="absolute top-0 left-[10vw] h-[50dvh] w-[80vw] flex items-center justify-center transition-all ease-out sm:inset-0 sm:h-auto sm:w-auto sm:items-center"
        style={{
          opacity: isLeaving ? 0 : 1,
          transform: `translate3d(0, ${blockY}px, 0)`,
          filter: `blur(${isLeaving ? 4 : isGhost ? 2 : 0}px)`,
          transitionDuration: `${duration}ms`,
          transitionProperty: 'opacity, transform, filter',
        }}
      >
        <div className="flex flex-col items-center justify-center text-center px-5">
          {getTextParts(config).map((part, i) => {
            const lineWasVisible = instance.lineVisibilities[i];
            const linePhase: LinePhase = !lineWasVisible
              ? 'hidden'
              : isLeaving
                ? 'leaving'
                : isGhost
                  ? 'ghost'
                  : 'active';
            const typography = getRoleTypography(config.role);
            const isInstruction = part.kind === 'instruction';
            const isSubtext = part.kind === 'subtext';
            const isEmphasis = part.kind === 'line' && config.emphasisLines?.includes(part.sourceIndex);
            const textShadow = isInstruction
              ? '0 0 1px rgba(255,255,255,0.05)'
              : linePhase === 'ghost'
                ? '0 0 1px rgba(255,255,255,0.04)'
                : linePhase === 'leaving'
                  ? '0 0 1px rgba(255,255,255,0.02)'
                  : typography.textShadow;
            const textClasses = isInstruction
              ? `${typography.fontClass} text-[11px] font-medium uppercase tracking-[0.22em] text-white/45 sm:text-[12px] md:text-[13px]`
              : isSubtext
                ? `${typography.fontClass} text-[15px] font-normal tracking-[0.08em] text-white/80 sm:text-[18px] md:text-[20px]`
                : `${typography.fontClass} ${typography.sizeClass} ${typography.trackingClass} ${typography.toneClass} ${typography.uppercase ? 'uppercase' : ''}`;
            const charStagger = isInstruction ? 8 : isSubtext ? 10 : config.charStagger;
            return (
              <div
                key={i}
                className={`${textClasses} leading-snug sm:leading-relaxed break-keep`}
                style={{
                  textShadow,
                  marginTop: isInstruction ? '0.75em' : i > 0 ? '0.3em' : 0,
                  fontSize: isEmphasis ? 'clamp(20px, 1.3em, 30px)' : undefined,
                }}
              >
                {renderCharReveal(
                  part.text,
                  linePhase,
                  config.transitionDuration,
                  charStagger,
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
    <div className={`fixed inset-0 pointer-events-none ${shouldRenderAboveVideo ? 'z-50' : 'z-20'}`}>
      <div className="relative w-full h-full">
        {previous && renderTextBlock(previous, 'previous')}
        {active && renderTextBlock(active, 'active')}
      </div>
    </div>
  );
}
