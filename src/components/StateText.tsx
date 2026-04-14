import { useEffect, useRef, useState, type ReactNode } from 'react';

export type TextSceneState = 0 | 1 | '2.1' | '2.2' | '2.3' | 3 | 4 | 5 | 6;

type RevealMode = 'soft' | 'airy' | 'firm' | 'bridge' | 'payoff' | 'reflection' | 'collapse' | 'silence';

interface StateTextConfig {
  header: string;
  subtext: string;
  revealMode: RevealMode;
  headerDelay: number;
  subtextDelay: number;
  subtextTypeDuration: number;
  transitionDuration: number;
  lingerPrevious: number;
  autoExitDelay?: number;
  visibleHeaderWords?: number;
}

const STATE_TEXT_CONFIG: Record<TextSceneState, StateTextConfig> = {
  0: {
    header: 'I have a theory',
    subtext: 'That what we call the universe is a collective mind made visible.',
    revealMode: 'soft',
    headerDelay: 180,
    subtextDelay: 720,
    subtextTypeDuration: 2100,
    transitionDuration: 900,
    lingerPrevious: 0,
  },
  1: {
    header: 'Every idea begins as drift',
    subtext: 'Waiting for the click of inspiration.',
    revealMode: 'airy',
    headerDelay: 180,
    subtextDelay: 900,
    subtextTypeDuration: 1400,
    transitionDuration: 1100,
    lingerPrevious: 420,
  },
  '2.1': {
    header: 'Time Pressure Intent',
    subtext: 'Something begins to gather.',
    revealMode: 'firm',
    headerDelay: 80,
    subtextDelay: 360,
    subtextTypeDuration: 1200,
    transitionDuration: 520,
    lingerPrevious: 0,
    visibleHeaderWords: 1,
  },
  '2.2': {
    header: 'Time Pressure Intent',
    subtext: 'The centre learns to hold.',
    revealMode: 'firm',
    headerDelay: 0,
    subtextDelay: 320,
    subtextTypeDuration: 1100,
    transitionDuration: 520,
    lingerPrevious: 0,
    visibleHeaderWords: 2,
  },
  '2.3': {
    header: 'Time Pressure Intent',
    subtext: 'And then, the choice to let go.',
    revealMode: 'firm',
    headerDelay: 0,
    subtextDelay: 320,
    subtextTypeDuration: 1200,
    transitionDuration: 620,
    lingerPrevious: 0,
    visibleHeaderWords: 3,
  },
  3: {
    header: 'What gathers, begins to last.',
    subtext: '',
    revealMode: 'bridge',
    headerDelay: 40,
    subtextDelay: 0,
    subtextTypeDuration: 0,
    transitionDuration: 320,
    lingerPrevious: 180,
  },
  4: {
    header: 'Then, light.',
    subtext: 'What time gathered, pressure held, intent sets alight.',
    revealMode: 'payoff',
    headerDelay: 90,
    subtextDelay: 560,
    subtextTypeDuration: 1700,
    transitionDuration: 1050,
    lingerPrevious: 260,
  },
  5: {
    header: 'Some ideas burn brightly at first,',
    subtext: 'but fade back into the dark.',
    revealMode: 'collapse',
    headerDelay: 80,
    subtextDelay: 360,
    subtextTypeDuration: 900,
    transitionDuration: 780,
    lingerPrevious: 320,
    autoExitDelay: 1650,
  },
  6: {
    header: 'But not every star endures.',
    subtext: '',
    revealMode: 'reflection',
    headerDelay: 420,
    subtextDelay: 0,
    subtextTypeDuration: 0,
    transitionDuration: 900,
    lingerPrevious: 420,
  },
};

interface TextBlockInstance {
  id: number;
  state: TextSceneState;
  config: StateTextConfig;
  phase: 'enter' | 'visible' | 'exit';
  headerVisible: boolean;
  subtextVisible: boolean;
  subtextCount: number;
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

function renderMultiline(text: string): ReactNode {
  return text.split('\n').map((line, index, lines) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ));
}

function renderPartialMultiline(text: string, count: number): ReactNode {
  return renderMultiline(text.slice(0, Math.max(0, Math.min(text.length, count))));
}

function renderHeaderText(config: StateTextConfig): ReactNode {
  if (!config.visibleHeaderWords) return renderMultiline(config.header);

  const words = config.header.split(' ');
  return words.map((word, index) => (
    <span
      key={`${word}-${index}`}
      className="inline-block transition-opacity ease-out"
      style={{
        opacity: index < config.visibleHeaderWords! ? 1 : 0,
        transitionDuration: `${config.transitionDuration}ms`,
      }}
    >
      {index > 0 && ' '}
      {word}
    </span>
  ));
}

function createTextInstance(state: TextSceneState, id: number): TextBlockInstance {
  return {
    id,
    state,
    config: STATE_TEXT_CONFIG[state],
    phase: 'enter',
    headerVisible: false,
    subtextVisible: false,
    subtextCount: 0,
  };
}

function getHeaderTone(revealMode: RevealMode): string {
  if (revealMode === 'payoff') return 'text-[#ffd4a3]';
  if (revealMode === 'reflection') return 'text-white/90';
  if (revealMode === 'collapse') return 'text-white/85';
  if (revealMode === 'silence') return 'text-transparent';
  return 'gradient-text';
}

function getSubtextTone(revealMode: RevealMode): string {
  if (revealMode === 'payoff') return 'text-orange-50/90';
  if (revealMode === 'reflection') return 'text-white/65';
  if (revealMode === 'collapse') return 'text-white/62';
  return 'text-white/85';
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
        subtextCount: outgoing.config.subtext.length,
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

    const typeSubtext = () => {
      const totalChars = nextConfig.subtext.length;
      if (totalChars === 0) return;

      if (nextConfig.subtextTypeDuration <= 0) {
        setActive((current) =>
          current?.id === nextInstance.id
            ? { ...current, subtextVisible: true, subtextCount: totalChars }
            : current
        );
        return;
      }

      const startedAt = performance.now();
      const tickMs = Math.max(28, Math.min(70, nextConfig.subtextTypeDuration / totalChars));

      const tick = () => {
        const progress = Math.min(1, (performance.now() - startedAt) / nextConfig.subtextTypeDuration);
        const nextCount = Math.min(totalChars, Math.ceil(totalChars * progress));

        setActive((current) =>
          current?.id === nextInstance.id
            ? { ...current, subtextVisible: true, subtextCount: nextCount }
            : current
        );

        if (progress < 1) {
          queueTimer(tick, tickMs);
        }
      };

      tick();
    };

    if (nextConfig.subtext) {
      queueTimer(() => {
        setActive((current) =>
          current?.id === nextInstance.id
            ? { ...current, phase: 'visible', subtextVisible: true, subtextCount: 0 }
            : current
        );
        typeSubtext();
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
                subtextCount: nextConfig.subtext.length,
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
    const headerOpacity = instance.headerVisible && !isExiting ? 1 : 0;
    const subtextOpacity = instance.subtextVisible && !isExiting ? 1 : 0;
    const headerY = instance.headerVisible ? 0 : enterY;
    const subtextY = instance.subtextVisible ? 0 : enterY + 4;
    const subtextCount = mode === 'active' && !isExiting ? instance.subtextCount : config.subtext.length;

    return (
      <div
        key={`${mode}-${instance.id}-${instance.state}`}
        className="absolute left-0 top-0 grid w-full grid-cols-[minmax(0,1fr)_clamp(72px,16vw,220px)_minmax(0,1fr)] items-center transition-all ease-out"
        style={{
          opacity: blockOpacity,
          transform: `translate3d(0, ${blockY}px, 0)`,
          transitionDuration: `${duration}ms`,
        }}
      >
        {config.header && (
          <h1
            className={`font-unica col-start-1 text-right text-[30px] sm:text-[39px] font-normal leading-relaxed ${getHeaderTone(config.revealMode)} transition-all ease-out`}
            style={{
              opacity: headerOpacity,
              transform: `translate3d(0, ${headerY}px, 0)`,
              transitionDuration: `${config.transitionDuration}ms`,
              textShadow: getHeaderShadow(config.revealMode),
            }}
          >
            {renderHeaderText(config)}
          </h1>
        )}

        {config.subtext && (
          <p
            className={`font-unica col-start-3 text-left text-[24px] sm:text-[27px] font-normal leading-relaxed ${getSubtextTone(config.revealMode)} transition-all ease-out`}
            style={{
              opacity: subtextOpacity,
              transform: `translate3d(0, ${subtextY}px, 0)`,
              transitionDuration: `${config.transitionDuration}ms`,
              textShadow: getSubtextShadow(config.revealMode),
            }}
          >
            {renderPartialMultiline(config.subtext, subtextCount)}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      <div className="absolute left-1/2 top-1/2 w-[min(92vw,1120px)] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2">
        <div className="relative min-h-[180px]">
          {previous && renderTextBlock(previous, 'previous')}
          {active && renderTextBlock(active, 'active')}
        </div>
      </div>
    </div>
  );
}
