import React, { useState, useEffect, useRef } from 'react';
import type { AppState } from '../App';

interface StateTextContent {
  header: string;
  subtext: string;
}

const STATE_CONTENT: Record<AppState, StateTextContent> = {
  0: {
    header: 'I have a Theory',
    subtext: 'A universe exists in each of our minds.Thoughts drift like stardust,until a click of inspiration strikes a spark.',
  },
  1: {
    header: 'Ideas begin with thoughts that matter.<br>But a spark alone does not become a star.',
    subtext: 'It needs a centre — something solid enough to gather around.<br>A light tap, and the pull begins.',
  },
  2: {
    header: 'Time. Pressure. Intent',
    subtext: 'An idea starts to hold<br>when its core takes shape.',
  },
  3: {
    header: 'Then comes the moment <br>when potential is released into light.',
    subtext: 'A kind of star that draws worlds into orbit,<br> finding its place in the universe.',
  },
  4: {
    header: 'Most ideas burn bright at first,',
    subtext: 'then fade back into the void.',
  },
};

const TYPING_SPEED_MS = 12;
const TRANSITION_DURATION_MS = 600;

type Segment = { type: 'text' | 'br'; value: string };

function parseSegments(text: string): Segment[] {
  const result: Segment[] = [];
  const parts = text.split('<br>');
  parts.forEach((part, i) => {
    if (part) result.push({ type: 'text', value: part });
    if (i < parts.length - 1) result.push({ type: 'br', value: '<br>' });
  });
  return result;
}

function countChars(segments: Segment[]): number {
  return segments.reduce((sum, seg) => sum + (seg.type === 'text' ? seg.value.length : 0), 0);
}

function buildHtml(segments: Segment[], count: number): React.ReactNode {
  let remaining = Math.max(0, count);
  const nodes: React.ReactNode[] = [];
  segments.forEach((seg, i) => {
    if (seg.type === 'text') {
      const take = Math.min(remaining, seg.value.length);
      if (take > 0) {
        nodes.push(<span key={`t-${i}`}>{seg.value.slice(0, take)}</span>);
        remaining -= take;
      }
    } else if (seg.type === 'br') {
      nodes.push(<br key={`b-${i}`} />);
    }
  });
  return <>{nodes}</>;
}

interface TextInstance {
  state: AppState;
  headerCount: number;
  subtextCount: number;
  isTyping: boolean;
  opacity: number;
  translateY: number;
}

export function StateText({ state }: { state: AppState }) {
  const [current, setCurrent] = useState<TextInstance>({
    state,
    headerCount: 0,
    subtextCount: 0,
    isTyping: true,
    opacity: 1,
    translateY: 0,
  });
  const [previous, setPrevious] = useState<TextInstance | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingStateRef = useRef<AppState>(state);

  useEffect(() => {
    if (current.state === state) {
      return;
    }
    const previousInstance: TextInstance = {
      ...current,
      isTyping: false,
      opacity: 0.2,
      translateY: -30,
    };
    const nextCurrent: TextInstance = {
      state,
      headerCount: 0,
      subtextCount: 0,
      isTyping: true,
      opacity: 1,
      translateY: 30,
    };

    requestAnimationFrame(() => {
      setPrevious(previousInstance);
      setCurrent(nextCurrent);
      typingStateRef.current = state;
      requestAnimationFrame(() => {
        setCurrent((prev) => ({
          ...prev,
          translateY: 0,
        }));
      });
    });

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPrevious((prev) => {
        if (!prev || prev.state === state) {
          return null;
        }
        return {
          ...prev,
          opacity: 0,
          translateY: -40,
        };
      });
    }, TRANSITION_DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [state, current]);

  useEffect(() => {
    const content = STATE_CONTENT[current.state];
    const headerSegments = parseSegments(content.header);
    const subtextSegments = parseSegments(content.subtext);
    const headerTotal = countChars(headerSegments);
    const subtextTotal = countChars(subtextSegments);

    if (!current.isTyping) return;

    const typeNext = () => {
      if (typingStateRef.current !== current.state) return;

      setCurrent((prev) => {
        let newHeaderCount = prev.headerCount;
        let newSubtextCount = prev.subtextCount;
        let newIsTyping = prev.isTyping;

        if (newHeaderCount < headerTotal) {
          newHeaderCount += 1;
        } else if (newSubtextCount < subtextTotal) {
          newSubtextCount += 1;
        } else {
          newIsTyping = false;
        }

        return {
          ...prev,
          headerCount: newHeaderCount,
          subtextCount: newSubtextCount,
          isTyping: newIsTyping,
        };
      });

      timerRef.current = setTimeout(() => {
        requestAnimationFrame(typeNext);
      }, TYPING_SPEED_MS);
    };

    timerRef.current = setTimeout(() => {
      requestAnimationFrame(typeNext);
    }, TYPING_SPEED_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current]);

  const nextState = ((current.state + 1) % 5) as AppState;
  const queuedContent = STATE_CONTENT[nextState];

  const renderTextBlock = (instance: TextInstance, mode: 'previous' | 'current') => {
    const content = STATE_CONTENT[instance.state];
    const headerSegments = parseSegments(content.header);
    const subtextSegments = parseSegments(content.subtext);
    const headerTotal = countChars(headerSegments);
    const subtextTotal = countChars(subtextSegments);

    const showHeaderCursor = mode === 'current' && instance.isTyping && instance.headerCount < headerTotal;
    const showSubtextCursor =
      mode === 'current' &&
      instance.isTyping &&
      instance.headerCount >= headerTotal &&
      instance.subtextCount < subtextTotal;

    return (
      <div
        key={`${mode}-${instance.state}`}
        className="absolute left-0 top-0 w-full transition-all ease-out"
        style={{
          transitionDuration: `${TRANSITION_DURATION_MS}ms`,
          opacity: mode === 'current' ? 1 : instance.opacity,
          transform: `translateY(${instance.translateY}px)`,
        }}
      >
        <h1
          className="text-[14px] font-bold tracking-wide gradient-text text-center leading-relaxed"
          style={{
            textShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
          }}
        >
          {buildHtml(headerSegments, mode === 'current' ? instance.headerCount : headerTotal)}
          {showHeaderCursor && (
            <span className="inline-block w-0.5 h-[1em] bg-purple-400/80 ml-0.5 align-middle animate-pulse" />
          )}
        </h1>

        <p
          className="mt-2 text-[14px] font-medium tracking-wide text-white/90 text-center leading-relaxed"
          style={{
            textShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
          }}
        >
          {buildHtml(subtextSegments, mode === 'current' ? instance.subtextCount : subtextTotal)}
          {showSubtextCursor && (
            <span className="inline-block w-0.5 h-[1em] bg-white/80 ml-0.5 align-middle animate-pulse" />
          )}
        </p>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      <div className="absolute left-1/2 top-1/2 w-[56vw] -translate-x-1/2 -translate-y-1/2">
        <div className="relative min-h-[140px]">
          {previous && renderTextBlock(previous, 'previous')}
          {renderTextBlock(current, 'current')}
        </div>

        <div
          className="mt-6 text-center opacity-35 transition-all ease-out"
          style={{
            transitionDuration: `${TRANSITION_DURATION_MS}ms`,
            transform: 'translateY(24px)',
          }}
        >
          <h2 className="text-[12px] font-semibold tracking-wide text-white/70 leading-relaxed">
            {queuedContent.header.replaceAll('<br>', ' ')}
          </h2>
          <p className="mt-1 text-[12px] font-medium tracking-wide text-white/55 leading-relaxed">
            {queuedContent.subtext.replaceAll('<br>', ' ')}
          </p>
        </div>
      </div>
    </div>
  );
}
