import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DisclaimerDialogProps {
  open: boolean;
  onClose: () => void;
  onSkip: () => void;
  loadProgress: number;
  assetsLoaded: boolean;
}

const NEON = {
  primary: '#00f0ff',
  dim: 'rgba(0, 240, 255, 0.6)',
  faint: 'rgba(0, 240, 255, 0.25)',
  glow: 'rgba(0, 240, 255, 0.35)',
  glowStrong: 'rgba(0, 240, 255, 0.55)',
  title: '#a5f8ff',
  text: '#00f0ff',
  textBright: '#b0fcff',
  textDim: 'rgba(0, 240, 255, 0.7)',
  bg: '#020b12',
  bezel: '#0a0f14',
  border: '#001820',
};

const DISCLAIMER_COPY = `This portfolio is interactive by design.

It begins with a short opening sequence that frames how I think, build, and navigate creative work.

Follow the experience if you have a moment.
Or skip straight to the projects if you are here to review the work.`;

function DisclaimerTerminal({
  onClose,
  onSkip,
  loadProgress,
  assetsLoaded,
}: Omit<DisclaimerDialogProps, 'open'>) {
  const [typedLength, setTypedLength] = useState(0);
  const [inputChar, setInputChar] = useState('');
  const [inputConfirmed, setInputConfirmed] = useState(false);
  const typingDoneRef = useRef(false);
  const typedLengthRef = useRef(0);
  const inputCharRef = useRef('');
  const inputConfirmedRef = useRef(false);
  const assetsLoadedRef = useRef(assetsLoaded);

  useEffect(() => {
    assetsLoadedRef.current = assetsLoaded;
  }, [assetsLoaded]);

  useEffect(() => {
    typedLengthRef.current = typedLength;
  }, [typedLength]);

  useEffect(() => {
    inputCharRef.current = inputChar;
  }, [inputChar]);

  useEffect(() => {
    inputConfirmedRef.current = inputConfirmed;
  }, [inputConfirmed]);

  // Typing effect
  useEffect(() => {
    const typingTimer = setInterval(() => {
      setTypedLength((prev) => {
        if (prev >= DISCLAIMER_COPY.length) {
          clearInterval(typingTimer);
          typingDoneRef.current = true;
          return prev;
        }
        return prev + 1;
      });
    }, 14);
    return () => clearInterval(typingTimer);
  }, []);

  const handleConfirm = useCallback((char: string) => {
    if (char === 'Y' || char === 'y') {
      onClose();
    } else if (char === 'N' || char === 'n') {
      onSkip();
    }
  }, [onClose, onSkip]);

  // Keyboard listener for Y/N + Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (inputConfirmedRef.current) return;
      if (!assetsLoadedRef.current) return;
      if (!typingDoneRef.current && typedLengthRef.current < DISCLAIMER_COPY.length) return;

      const key = e.key;

      if (key === 'Enter') {
        const char = inputCharRef.current;
        if (char) {
          setInputConfirmed(true);
          handleConfirm(char);
        }
        return;
      }

      if (key === 'Backspace') {
        setInputChar('');
        return;
      }

      if (key.length === 1 && /[yYnN]/.test(key)) {
        setInputChar(key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleConfirm]);

  const typingComplete = typedLength >= DISCLAIMER_COPY.length;
  const showPrompt = typingComplete;
  const promptText = !assetsLoaded
    ? `> Loading assets... ${loadProgress}%`
    : `> Proceed? [Y/N]: ${inputChar}`;

  return (
    <DialogContent
      showCloseButton={false}
      data-testid="disclaimer-terminal"
      className="max-w-none border-0 bg-transparent p-0 shadow-none flex items-center justify-center"
    >
      {/* Monitor frame — auto height so all text is visible */}
      <div
        className="relative mx-auto flex items-center justify-center"
        style={{
          width: 'min(92vw, 840px)',
          maxWidth: '92vw',
        }}
      >
        {/* Outer neon glow */}
        <div
          className="absolute -inset-4 rounded-[32px]"
          style={{
            background: `radial-gradient(ellipse at center, ${NEON.glow} 0%, transparent 70%)`,
            opacity: 0.25,
          }}
        />

        {/* Neon border glow ring */}
        <div
          className="absolute -inset-3 rounded-[28px]"
          style={{
            boxShadow: `0 0 20px ${NEON.glow}, 0 0 60px ${NEON.faint}, inset 0 0 30px ${NEON.faint}`,
            border: `1px solid ${NEON.faint}`,
          }}
        />

        {/* Monitor bezel */}
        <div
          className="absolute -inset-1.5 rounded-[22px]"
          style={{
            background: NEON.bezel,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.6)',
          }}
        />

        {/* Screen */}
        <div
          className="relative flex w-full flex-col overflow-hidden rounded-[14px] p-5 sm:p-7"
          style={{
            background: NEON.bg,
            border: `3px solid ${NEON.primary}`,
            boxShadow: `0 0 16px ${NEON.glow}, inset 0 0 40px ${NEON.faint}`,
            color: NEON.text,
          }}
        >
          {/* Scanlines */}
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(${NEON.faint} 50%, transparent 50%)`,
              backgroundSize: '100% 3px',
            }}
          />

          {/* CRT vignette */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[8px]"
            style={{
              boxShadow: `inset 0 0 80px rgba(0,0,0,0.8), inset 0 0 20px ${NEON.faint}`,
            }}
          />

          {/* Screen flicker */}
          <div
            className="pointer-events-none absolute inset-0 animate-[crt-flicker_0.15s_infinite] opacity-[0.02]"
            style={{ background: NEON.primary }}
          />

          <div className="relative z-10 flex flex-col">
            {/* Title bar */}
            <div
              className="mb-3 flex items-center justify-between border-b-2 pb-2 text-[11px] uppercase tracking-[0.2em] sm:text-[13px]"
              style={{ borderColor: NEON.faint, color: NEON.textBright, fontFamily: "'Orbitron', sans-serif" }}
            >
              <span>System Notice</span>
              <span style={{ color: NEON.dim }}>ENTRY.EXE</span>
            </div>

            <DialogHeader className="gap-2 text-left">
              <DialogTitle
                className="text-[20px] font-semibold uppercase leading-none sm:text-[26px]"
                style={{ color: NEON.title, fontFamily: "'Russo One', sans-serif" }}
              >
                Before you enter
              </DialogTitle>
              <DialogDescription className="sr-only">
                {DISCLAIMER_COPY}
              </DialogDescription>
            </DialogHeader>

            {/* Main text area — no overflow hidden, auto height */}
            <div
              className="mt-3 rounded p-4 text-[13px] font-medium leading-[1.5] sm:mt-4 sm:p-5 sm:text-[15px]"
              style={{
                background: 'rgba(0, 0, 0, 0.45)',
                border: `2px solid ${NEON.faint}`,
                color: NEON.text,
                textShadow: `0 0 6px ${NEON.glow}`,
                fontFamily: "'Orbitron', sans-serif",
              }}
            >
              <span className="whitespace-pre-line">{DISCLAIMER_COPY.slice(0, typedLength)}</span>
              {!typingComplete && (
                <span
                  className="disclaimer-caret ml-1 inline-block h-[1em] w-[0.12em] translate-y-[0.15em]"
                  style={{ background: NEON.primary }}
                />
              )}
            </div>

            {/* Bottom row: loading bar + prompt */}
            <div className="mt-4 space-y-3 sm:mt-5">
              {/* Loading bar */}
              <div className="space-y-1.5">
                <div
                  className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] sm:text-[13px]"
                  style={{ color: NEON.textBright, fontFamily: "'Orbitron', sans-serif" }}
                >
                  <span>Loading assets</span>
                  <span>{loadProgress}%</span>
                </div>
                <div
                  className="h-2.5 w-full overflow-hidden rounded-none bg-black"
                  style={{ border: `2px solid ${NEON.faint}` }}
                >
                  <div
                    className="h-full transition-all duration-300 ease-out"
                    style={{
                      width: `${loadProgress}%`,
                      background: NEON.primary,
                      boxShadow: `0 0 10px ${NEON.glowStrong}`,
                    }}
                  />
                </div>
              </div>

              {/* Prompt line */}
              {showPrompt && (
                <div
                  className="flex items-center text-[13px] font-semibold uppercase tracking-[0.1em] sm:text-[15px]"
                  style={{ color: NEON.textBright, textShadow: `0 0 8px ${NEON.glow}`, fontFamily: "'Orbitron', sans-serif" }}
                >
                  <span>{promptText}</span>
                  <span
                    className="disclaimer-caret ml-1 inline-block h-[1em] w-[0.14em] translate-y-[0.15em]"
                    style={{ background: NEON.primary }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Monitor brand */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.3em]"
          style={{ color: '#1a2a32', fontFamily: "'Orbitron', sans-serif" }}
        >
          nebula-hero v1.0
        </div>
      </div>
    </DialogContent>
  );
}

export function DisclaimerDialog({ open, onClose, onSkip, loadProgress, assetsLoaded }: DisclaimerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      {open && (
        <DisclaimerTerminal
          onClose={onClose}
          onSkip={onSkip}
          loadProgress={loadProgress}
          assetsLoaded={assetsLoaded}
        />
      )}
    </Dialog>
  );
}
