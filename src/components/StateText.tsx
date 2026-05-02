import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

export type TextSceneState = 0 | 1 | '2' | 3 | 4 | 5 | 6 | 7;

type RevealMode = 'soft' | 'airy' | 'firm' | 'bridge' | 'payoff' | 'reflection' | 'collapse' | 'silence';

interface StateTextConfig {
  header: string;
  subtext: string;
  revealMode: RevealMode;
  accentColor?: string;
  headerDelay: number;
  subtextDelay: number;
  subtextTypeDuration: number;
  transitionDuration: number;
  lingerPrevious: number;
  autoExitDelay?: number;
  visibleHeaderWords?: number;
  subtextAsHeader?: boolean;
  wordStagger: number;
}

const STATE_TEXT_CONFIG: Record<TextSceneState, StateTextConfig> = {
  0: {
    header: 'I have a theory.',
    subtext: 'That what we call the universe is our collective mind made visible.',
    revealMode: 'soft',
    headerDelay: 180,
    subtextDelay: 900,
    subtextTypeDuration: 2100,
    transitionDuration: 800,
    lingerPrevious: 0,
    wordStagger: 70,
  },
  1: {
    header: 'Dust lies dormant in darkness.',
    subtext: 'Waiting to matter with the first click.',
    revealMode: 'airy',
    headerDelay: 180,
    subtextDelay: 720,
    subtextTypeDuration: 1400,
    transitionDuration: 800,
    lingerPrevious: 420,
    wordStagger: 70,
  },
  '2': {
    header: 'Time. Pressure. Intent.',
    subtext: '',
    revealMode: 'firm',
    accentColor: '#22d3ee',
    headerDelay: 0,
    subtextDelay: 0,
    subtextTypeDuration: 0,
    transitionDuration: 1000,
    lingerPrevious: 0,
    wordStagger: 0,
  },
  3: {
    header: 'The orbit forms naturally.',
    subtext: 'What carries enough gravity begins to influence everything around it.',
    revealMode: 'bridge',
    headerDelay: 180,
    subtextDelay: 600,
    subtextTypeDuration: 0,
    transitionDuration: 700,
    lingerPrevious: 260,
    wordStagger: 55,
  },
  4: {
    header: '',
    subtext: '',
    revealMode: 'payoff',
    headerDelay: 0,
    subtextDelay: 0,
    subtextTypeDuration: 0,
    transitionDuration: 800,
    lingerPrevious: 260,
    wordStagger: 0,
  },
  5: {
    header: 'Formation collapses.',
    subtext: 'Some things burn brightly, then fade back into the dark.',
    revealMode: 'collapse',
    headerDelay: 80,
    subtextDelay: 400,
    subtextTypeDuration: 900,
    transitionDuration: 700,
    lingerPrevious: 320,
    autoExitDelay: 1650,
    wordStagger: 55,
  },
  6: {
    header: 'But not every star endures.',
    subtext: '',
    revealMode: 'reflection',
    headerDelay: 180,
    subtextDelay: 0,
    subtextTypeDuration: 0,
    transitionDuration: 800,
    lingerPrevious: 420,
    wordStagger: 60,
  },
  7: {
    header: 'Its influence becomes order.',
    subtext: 'Setting its universe in motion.',
    revealMode: 'soft',
    headerDelay: 180,
    subtextDelay: 600,
    subtextTypeDuration: 0,
    transitionDuration: 700,
    lingerPrevious: 260,
    wordStagger: 55,
  },
};

interface TextBlockInstance {
  id: number;
  state: TextSceneState;
  config: StateTextConfig;
  phase: 'enter' | 'visible' | 'exit';
  headerVisible: boolean;
  subtextVisible: boolean;
  exitDuration?: number;
}

const ENTER_Y_BY_MODE: Record<RevealMode, number> = {
  soft: 8,
  airy: 18,
  firm: 10,
  bridge: 4,
  payoff: 10,
  reflection: 8,
  collapse: 8,
  silence: 0,
};

const EXIT_Y_BY_MODE: Record<RevealMode, number> = {
  soft: -8,
  airy: -24,
  firm: -16,
  bridge: -10,
  payoff: -18,
  reflection: -10,
  collapse: -18,
  silence: -14,
};

function hasText(config: StateTextConfig): boolean {
  return Boolean(config.header || config.subtext);
}

function getHeaderTone(revealMode: RevealMode): string {
  if (revealMode === 'payoff') return 'text-[#ffd4a3]';
  if (revealMode === 'reflection') return 'text-white/90';
  if (revealMode === 'collapse') return 'text-white/85';
  if (revealMode === 'silence') return 'text-transparent';
  return 'gradient-text';
}

function getHeaderShadow(revealMode: RevealMode): string {
  if (revealMode === 'payoff') return '0 0 34px rgba(249, 115, 22, 0.52)';
  if (revealMode === 'reflection') return '0 0 24px rgba(255, 255, 255, 0.18)';
  if (revealMode === 'collapse') return '0 0 24px rgba(255, 255, 255, 0.14)';
  return '0 0 30px rgba(168, 85, 247, 0.5)';
}

function getSubtextShadow(revealMode: RevealMode): string {
  if (revealMode === 'payoff') return '0 0 24px rgba(251, 146, 60, 0.32)';
  if (revealMode === 'collapse') return '0 0 18px rgba(255, 255, 255, 0.1)';
  return '0 0 20px rgba(255, 255, 255, 0.18)';
}

function getAccentStyle(config: StateTextConfig): CSSProperties {
  if (!config.accentColor) return {};

  return {
    color: config.accentColor,
    textShadow: `0 0 28px ${config.accentColor}66`,
    animation: `text-color-morph ${config.transitionDuration}ms ease-out both`,
    '--text-color-from': '#a855f7',
    '--text-color-to': config.accentColor,
  } as CSSProperties;
}

function renderWordReveal(
  text: string,
  isVisible: boolean,
  isExiting: boolean,
  transitionDuration: number,
  staggerMs: number,
  enterY: number,
  exitY: number,
  className?: string,
  inlineStyle?: CSSProperties
): ReactNode {
  if (!text) return null;
  const words = text.trim().split(/\s+/);
  return words.map((word, i) => {
    const delay = isExiting ? 0 : i * staggerMs;
    return (
      <span
        key={`${word}-${i}`}
        className={`inline-block ${className || ''}`}
        style={{
          opacity: isExiting ? 0 : isVisible ? 1 : 0,
          transform: `translate3d(0, ${isExiting ? exitY : isVisible ? 0 : enterY}px, 0)`,
          filter: `blur(${isExiting ? '6px' : isVisible ? '0px' : '8px'})`,
          transitionDuration: `${transitionDuration}ms`,
          transitionDelay: `${delay}ms`,
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          transitionProperty: 'opacity, transform, filter',
          marginRight: '0.28em',
          ...inlineStyle,
        }}
      >
        {word}
      </span>
    );
  });
}

function State2CumulativeText({ isVisible, isExiting }: { isVisible: boolean; isExiting?: boolean }) {
  const [wordState, setWordState] = useState({ current: -1, previous: -1 });
  const [lineState, setLineState] = useState({ current: -1, previous: -1 });

  useEffect(() => {
    if (!isVisible) {
      setWordState({ current: -1, previous: -1 });
      setLineState({ current: -1, previous: -1 });
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    // Header words replace sequentially: Time. → Pressure. → Intent.
    timers.push(setTimeout(() => setWordState({ current: 0, previous: -1 }), 0));
    timers.push(setTimeout(() => setWordState({ current: 1, previous: 0 }), 3000));
    timers.push(setTimeout(() => setWordState({ current: 2, previous: 1 }), 6000));
    // Subtext lines replace sequentially
    timers.push(setTimeout(() => setLineState({ current: 0, previous: -1 }), 1000));
    timers.push(setTimeout(() => setLineState({ current: 1, previous: 0 }), 4000));
    timers.push(setTimeout(() => setLineState({ current: 2, previous: 1 }), 7000));
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  const words = ['Time.', 'Pressure.', 'Intent.'];
  const lines = [
    'What receives none remains only a thought.',
    'What is worth forming must first endure the hold.',
    'To hold is not to possess. Too much grip, and nothing becomes.',
  ];

  const exitY = -12;
  const enterY = 16;

  return (
    <div className="flex flex-col items-center justify-center text-center px-5 py-2">
      {/* Header word — single active word with replacement animation */}
      <h1
        className="relative font-russo flex min-h-[1.6em] w-full items-center justify-center text-center text-[32px] sm:text-[42px] md:text-[52px] font-normal leading-none uppercase"
        style={{
          color: '#22d3ee',
          textShadow: '0 0 28px #22d3ee66',
        }}
      >
        {words.map((word, i) => {
          const isActive = i === wordState.current;
          const wasActive = i === wordState.previous;
          return (
            <span
              key={word}
              className="absolute inset-0 flex items-center justify-center transition-all ease-out"
              style={{
                opacity: isExiting ? 0 : isActive ? 1 : wasActive ? 0 : 0,
                transform: `translate3d(0, ${isExiting ? exitY : isActive ? 0 : wasActive ? exitY : enterY}px, 0)`,
                filter: `blur(${isExiting ? '6px' : isActive ? '0px' : wasActive ? '6px' : '8px'})`,
                transitionDuration: '700ms',
                transitionProperty: 'opacity, transform, filter',
                pointerEvents: 'none',
              }}
            >
              {word}
            </span>
          );
        })}
      </h1>

      {/* Subtext line — single active line with replacement animation */}
      <div className="relative mt-3 min-h-[2em] w-full flex items-center justify-center">
        {lines.map((line, i) => {
          const isActive = i === lineState.current;
          const wasActive = i === lineState.previous;
          return (
            <p
              key={i}
              className="absolute font-russo flex items-center justify-center text-center text-[13.5px] font-normal leading-none text-white tracking-[0.15em]"
              style={{
                opacity: isExiting ? 0 : isActive ? 1 : wasActive ? 0 : 0,
                transform: `translate3d(0, ${isExiting ? exitY : isActive ? 0 : wasActive ? exitY : enterY}px, 0)`,
                filter: `blur(${isExiting ? '6px' : isActive ? '0px' : wasActive ? '6px' : '8px'})`,
                transitionDuration: '900ms',
                transitionProperty: 'opacity, transform, filter',
                textShadow: getSubtextShadow('firm'),
                pointerEvents: 'none',
                maxWidth: 'min(80vw, 600px)',
                padding: '0 1rem',
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
  return {
    id,
    state,
    config: STATE_TEXT_CONFIG[state],
    phase: 'enter',
    headerVisible: false,
    subtextVisible: false,
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
    if (outgoing && outgoing.phase !== 'exit' && hasText(outgoing.config) && nextConfig.lingerPrevious > 0) {
      const previousInstance: TextBlockInstance = {
        ...outgoing,
        phase: 'visible',
        headerVisible: true,
        subtextVisible: true,
        exitDuration: nextConfig.transitionDuration,
      };
      setPrevious(previousInstance);
      queueTimer(() => {
        setPrevious((prev) => (prev?.id === previousInstance.id ? { ...prev, phase: 'exit' } : prev));
      }, 20);
      queueTimer(() => {
        setPrevious((prev) => (prev?.id === previousInstance.id ? null : prev));
      }, nextConfig.transitionDuration + nextConfig.lingerPrevious);
    } else {
      setPrevious(null);
    }

    const nextInstance = createTextInstance(state, nextIdRef.current);
    nextIdRef.current += 1;
    setActive(nextInstance);

    if (nextConfig.header) {
      queueTimer(() => {
        setActive((current) =>
          current?.id === nextInstance.id
            ? { ...current, phase: 'visible', headerVisible: true }
            : current
        );
      }, nextConfig.headerDelay);
    }

    if (nextConfig.subtext) {
      queueTimer(() => {
        setActive((current) =>
          current?.id === nextInstance.id
            ? { ...current, phase: 'visible', subtextVisible: true }
            : current
        );
      }, nextConfig.subtextDelay);
    }

    if (nextConfig.autoExitDelay) {
      queueTimer(() => {
        setActive((current) =>
          current?.id === nextInstance.id
            ? {
                ...current,
                phase: 'exit',
                headerVisible: true,
                subtextVisible: true,
              }
            : current
        );
      }, nextConfig.autoExitDelay);
    }

    return clearTimers;
  }, [state]);

  const renderTextBlock = (instance: TextBlockInstance, mode: 'previous' | 'active') => {
    if (!hasText(instance.config)) return null;

    const { config, phase } = instance;
    const isExiting = phase === 'exit';
    const blockOpacity = isExiting ? 0 : 1;
    const blockY = isExiting ? EXIT_Y_BY_MODE[config.revealMode] : 0;
    const duration = instance.exitDuration ?? config.transitionDuration;
    const enterY = ENTER_Y_BY_MODE[config.revealMode];
    const headerVisible = instance.headerVisible && !isExiting;
    const subtextVisible = instance.subtextVisible && !isExiting;
    const accentStyle = getAccentStyle(config);
    const headerTone = config.accentColor ? '' : getHeaderTone(config.revealMode);
    const headerUsesGradient = headerTone === 'gradient-text';
    const headerContainerTone = headerUsesGradient ? '' : headerTone;
    const headerWordTone = headerUsesGradient ? headerTone : '';

    if (instance.state === '2') {
      return (
        <div
          key={`${mode}-${instance.id}-${instance.state}`}
          className="absolute inset-0 flex flex-col items-center justify-center transition-all ease-out"
          style={{
            opacity: blockOpacity,
            transform: `translate3d(0, ${blockY}px, 0)`,
            transitionDuration: `${duration}ms`,
          }}
        >
          <div style={{ transform: 'translateY(60px)' }}>
            <State2CumulativeText isVisible={headerVisible} isExiting={isExiting} />
          </div>
        </div>
      );
    }

    return (
      <div
        key={`${mode}-${instance.id}-${instance.state}`}
        className="absolute inset-0 flex flex-col items-center justify-center transition-all ease-out"
        style={{
          opacity: blockOpacity,
          transform: `translate3d(0, ${blockY}px, 0)`,
          transitionDuration: `${duration}ms`,
        }}
      >
        <div className="relative flex w-full max-w-[min(90vw,720px)] flex-col items-center px-5 text-center">
          {/* Subtext - above center, overlapping the subject */}
          {config.subtext && (
            config.subtextAsHeader ? (
              <h2
                className={`relative z-10 font-russo flex min-h-[1.6em] items-center justify-center text-center text-[32px] sm:text-[42px] md:text-[52px] font-normal leading-none uppercase ${headerContainerTone} tracking-[0.15em]`}
                style={{
                  textShadow: getHeaderShadow(config.revealMode),
                  ...accentStyle,
                }}
              >
                {renderWordReveal(
                  config.subtext,
                  subtextVisible,
                  isExiting,
                  config.transitionDuration,
                  config.wordStagger,
                  enterY + 4,
                  -8,
                  `transition-all ease-out ${headerWordTone}`
                )}
              </h2>
            ) : (
              <p
                className="relative z-10 font-russo flex min-h-[1.6em] items-center justify-center text-center text-[12px] sm:text-[13.5px] font-normal leading-none text-white tracking-[0.15em]"
                style={{
                  textShadow: getSubtextShadow(config.revealMode),
                }}
              >
                {renderWordReveal(
                  config.subtext,
                  subtextVisible,
                  isExiting,
                  config.transitionDuration,
                  config.wordStagger,
                  enterY + 4,
                  -6,
                  'transition-all ease-out'
                )}
              </p>
            )
          )}

          {/* Header - below the subject */}
          {config.header && (
            <h1
              className={`relative z-20 font-russo flex min-h-[1.6em] items-center justify-center text-center text-[32px] sm:text-[42px] md:text-[52px] font-normal leading-none uppercase ${headerContainerTone}`}
              style={{
                textShadow: getHeaderShadow(config.revealMode),
                ...accentStyle,
              }}
            >
              {renderWordReveal(
                config.header,
                headerVisible,
                isExiting,
                config.transitionDuration,
                config.wordStagger,
                enterY,
                -8,
                `transition-all ease-out ${headerWordTone}`
              )}
            </h1>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      <div className="relative w-full h-full">
        {previous && renderTextBlock(previous, 'previous')}
        {active && renderTextBlock(active, 'active')}
      </div>
    </div>
  );
}
