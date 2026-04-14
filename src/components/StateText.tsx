import { useEffect, useRef, useState, type ReactNode } from 'react';

export type TextSceneState = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type RevealMode = 'soft' | 'airy' | 'firm' | 'bridge' | 'payoff' | 'reflection' | 'silence';

interface StateTextConfig {
  header: string;
  subtext: string;
  revealMode: RevealMode;
  headerDelay: number;
  subtextDelay: number;
  transitionDuration: number;
  lingerPrevious: number;
}

const STATE_TEXT_CONFIG: Record<TextSceneState, StateTextConfig> = {
  0: {
    header: 'I have a theory.',
    subtext: '',
    revealMode: 'soft',
    headerDelay: 180,
    subtextDelay: 0,
    transitionDuration: 900,
    lingerPrevious: 0,
  },
  1: {
    header: 'Ideas begin as drift.',
    subtext: 'Something scattered. Not yet formed.',
    revealMode: 'airy',
    headerDelay: 180,
    subtextDelay: 900,
    transitionDuration: 1100,
    lingerPrevious: 420,
  },
  2: {
    header: 'Time. Pressure. Intent.',
    subtext: 'A centre begins to hold.',
    revealMode: 'firm',
    headerDelay: 80,
    subtextDelay: 360,
    transitionDuration: 520,
    lingerPrevious: 240,
  },
  3: {
    header: 'What gathers, begins to last.',
    subtext: '',
    revealMode: 'bridge',
    headerDelay: 40,
    subtextDelay: 0,
    transitionDuration: 320,
    lingerPrevious: 180,
  },
  4: {
    header: 'Then comes the moment\nwhen potential turns to light.',
    subtext: 'Not just bright enough to burn —\nsteady enough to draw worlds into orbit.',
    revealMode: 'payoff',
    headerDelay: 90,
    subtextDelay: 560,
    transitionDuration: 1050,
    lingerPrevious: 260,
  },
  5: {
    header: '',
    subtext: '',
    revealMode: 'silence',
    headerDelay: 0,
    subtextDelay: 0,
    transitionDuration: 820,
    lingerPrevious: 820,
  },
  6: {
    header: 'But not every star endures.',
    subtext: '',
    revealMode: 'reflection',
    headerDelay: 420,
    subtextDelay: 0,
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
  exitDuration?: number;
}

const ENTER_Y_BY_MODE: Record<RevealMode, number> = {
  soft: 8,
  airy: 18,
  firm: 10,
  bridge: 4,
  payoff: 10,
  reflection: 8,
  silence: 0,
};

const EXIT_Y_BY_MODE: Record<RevealMode, number> = {
  soft: -8,
  airy: -24,
  firm: -16,
  bridge: -10,
  payoff: -18,
  reflection: -10,
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

function getHeaderTone(revealMode: RevealMode): string {
  if (revealMode === 'payoff') return 'text-[#ffd4a3]';
  if (revealMode === 'reflection') return 'text-white/90';
  if (revealMode === 'silence') return 'text-transparent';
  return 'gradient-text';
}

function getSubtextTone(revealMode: RevealMode): string {
  if (revealMode === 'payoff') return 'text-orange-50/90';
  if (revealMode === 'reflection') return 'text-white/65';
  return 'text-white/85';
}

function getHeaderShadow(revealMode: RevealMode): string {
  if (revealMode === 'payoff') return '0 0 34px rgba(249, 115, 22, 0.52)';
  if (revealMode === 'reflection') return '0 0 24px rgba(255, 255, 255, 0.18)';
  return '0 0 30px rgba(168, 85, 247, 0.5)';
}

function getSubtextShadow(revealMode: RevealMode): string {
  if (revealMode === 'payoff') return '0 0 24px rgba(251, 146, 60, 0.32)';
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
    if (outgoing && hasText(outgoing.config) && nextConfig.lingerPrevious > 0) {
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

    return (
      <div
        key={`${mode}-${instance.id}-${instance.state}`}
        className="absolute left-0 top-0 w-full transition-all ease-out"
        style={{
          opacity: blockOpacity,
          transform: `translate3d(0, ${blockY}px, 0)`,
          transitionDuration: `${duration}ms`,
        }}
      >
        {config.header && (
          <h1
            className={`text-center text-[18px] sm:text-[22px] font-bold leading-relaxed ${getHeaderTone(config.revealMode)} transition-all ease-out`}
            style={{
              opacity: headerOpacity,
              transform: `translate3d(0, ${headerY}px, 0)`,
              transitionDuration: `${config.transitionDuration}ms`,
              textShadow: getHeaderShadow(config.revealMode),
            }}
          >
            {renderMultiline(config.header)}
          </h1>
        )}

        {config.subtext && (
          <p
            className={`mt-4 text-center text-[14px] sm:text-[15px] font-medium leading-relaxed ${getSubtextTone(config.revealMode)} transition-all ease-out`}
            style={{
              opacity: subtextOpacity,
              transform: `translate3d(0, ${subtextY}px, 0)`,
              transitionDuration: `${config.transitionDuration}ms`,
              textShadow: getSubtextShadow(config.revealMode),
            }}
          >
            {renderMultiline(config.subtext)}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      <div className="absolute left-1/2 top-1/2 w-[min(78vw,820px)] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2">
        <div className="relative min-h-[180px]">
          {previous && renderTextBlock(previous, 'previous')}
          {active && renderTextBlock(active, 'active')}
        </div>
      </div>
    </div>
  );
}
