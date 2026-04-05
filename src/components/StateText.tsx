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

const TYPING_SPEED_MS = 12; // Faster typing
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
  const [instances, setInstances] = useState<TextInstance[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stateRef = useRef(state);
  const typingStateRef = useRef<AppState | null>(null);

  // Track current state
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Handle state changes - add new instance and transition old ones
  useEffect(() => {
    const currentState = state;
    
    setInstances((prev) => {
      // Check if we already have this state
      if (prev.some((inst) => inst.state === currentState)) {
        return prev;
      }

      // Create new instance for current state
      const newInstance: TextInstance = {
        state: currentState,
        headerCount: 0,
        subtextCount: 0,
        isTyping: true,
        opacity: 1,
        translateY: 20, // Start slightly below
      };

      // Transition existing instances (shift up and fade)
      const transitioned = prev.map((inst) => ({
        ...inst,
        isTyping: false,
        opacity: 0,
        translateY: -30, // Shift up
      }));

      return [...transitioned, newInstance];
    });

    // Clean up old instances after transition
    timerRef.current = setTimeout(() => {
      setInstances((prev) => prev.filter((inst) => inst.state === currentState || inst.opacity > 0));
    }, TRANSITION_DURATION_MS + 100);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [state]);

  // Typing animation for current instance
  useEffect(() => {
    const currentInstance = instances.find((inst) => inst.state === state && inst.isTyping);
    if (!currentInstance) return;

    const content = STATE_CONTENT[state];
    const headerSegments = parseSegments(content.header);
    const subtextSegments = parseSegments(content.subtext);
    const headerTotal = countChars(headerSegments);
    const subtextTotal = countChars(subtextSegments);

    typingStateRef.current = state;

    const typeNext = () => {
      if (typingStateRef.current !== state) return;

      setInstances((prev) => {
        const idx = prev.findIndex((inst) => inst.state === state);
        if (idx === -1) return prev;

        const inst = prev[idx];
        let newHeaderCount = inst.headerCount;
        let newSubtextCount = inst.subtextCount;
        let newIsTyping = inst.isTyping;

        if (newHeaderCount < headerTotal) {
          newHeaderCount += 1;
        } else if (newSubtextCount < subtextTotal) {
          newSubtextCount += 1;
        } else {
          newIsTyping = false;
        }

        const updated = [...prev];
        updated[idx] = {
          ...inst,
          headerCount: newHeaderCount,
          subtextCount: newSubtextCount,
          isTyping: newIsTyping,
        };
        return updated;
      });

      const current = instances.find((inst) => inst.state === state);
      const headerDone = current ? current.headerCount >= headerTotal : false;
      const subtextDone = current ? current.subtextCount >= subtextTotal : false;

      if (!headerDone || !subtextDone) {
        timerRef.current = setTimeout(() => {
          requestAnimationFrame(typeNext);
        }, TYPING_SPEED_MS);
      }
    };

    timerRef.current = setTimeout(() => {
      requestAnimationFrame(typeNext);
    }, TYPING_SPEED_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [instances, state]);

  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      <div className="absolute left-[50px] top-1/2 -translate-y-1/2 w-[50vw]">
        {instances.map((inst) => {
          const content = STATE_CONTENT[inst.state];
          const headerSegments = parseSegments(content.header);
          const subtextSegments = parseSegments(content.subtext);
          const headerTotal = countChars(headerSegments);
          const subtextTotal = countChars(subtextSegments);

          const showHeaderCursor = inst.isTyping && inst.headerCount < headerTotal;
          const showSubtextCursor =
            inst.isTyping && inst.headerCount >= headerTotal && inst.subtextCount < subtextTotal;

          return (
            <div
              key={inst.state}
              className="absolute left-0 top-0 transition-all duration-500 ease-out"
              style={{
                opacity: inst.opacity,
                transform: `translateY(${inst.translateY}px)`,
              }}
            >
              <h1
                className="text-[14px] font-bold tracking-wide gradient-text text-left leading-relaxed"
                style={{
                  textShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
                }}
              >
                {buildHtml(headerSegments, inst.headerCount)}
                {showHeaderCursor && (
                  <span className="inline-block w-0.5 h-[1em] bg-purple-400/80 ml-0.5 align-middle animate-pulse" />
                )}
              </h1>

              <p
                className="mt-2 text-[14px] font-medium tracking-wide text-white/90 text-left leading-relaxed"
                style={{
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
                }}
              >
                {buildHtml(subtextSegments, inst.subtextCount)}
                {showSubtextCursor && (
                  <span className="inline-block w-0.5 h-[1em] bg-white/80 ml-0.5 align-middle animate-pulse" />
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
