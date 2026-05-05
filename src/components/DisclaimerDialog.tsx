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
    }, 16);
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
      className="disclaimer-terminal border-0 bg-transparent p-0 shadow-none"
    >
      {/* Monitor frame */}
      <div className="relative mx-auto w-[min(92vw,960px)] max-w-[92vw]" style={{ aspectRatio: '16/9' }}>
        {/* Outer bezel glow */}
        <div className="absolute -inset-3 rounded-[28px] bg-[#1a1a1a] shadow-[0_0_60px_rgba(255,176,0,0.15),inset_0_0_20px_rgba(0,0,0,0.8)]" />
        
        {/* Monitor bezel */}
        <div className="absolute -inset-1.5 rounded-[22px] bg-[#0d0d0d] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.6)]" />

        {/* Screen */}
        <div className="relative flex h-full flex-col overflow-hidden rounded-[14px] border-[6px] border-[#111] bg-[#050704] p-5 text-[#ffb000] shadow-[inset_0_0_40px_rgba(255,176,0,0.08)] sm:p-7">
          
          {/* Scanlines */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,176,0,0.07)_50%,transparent_50%)] bg-[length:100%_3px] opacity-40" />
          
          {/* CRT vignette / curvature simulation */}
          <div 
            className="pointer-events-none absolute inset-0 rounded-[8px]"
            style={{
              boxShadow: 'inset 0 0 80px rgba(0,0,0,0.7), inset 0 0 20px rgba(255,176,0,0.03)',
            }}
          />

          {/* Subtle screen flicker */}
          <div className="pointer-events-none absolute inset-0 animate-[crt-flicker_0.15s_infinite] opacity-[0.02] bg-[#ffb000]" />

          <div className="relative z-10 flex h-full flex-col">
            {/* Title bar */}
            <div className="mb-4 flex items-center justify-between border-b-2 border-[#ffb000]/40 pb-2 text-[13px] uppercase tracking-[0.2em] text-[#ffcf66] sm:text-[15px]">
              <span>System Notice</span>
              <span className="text-[#ffb000]/60">ENTRY.EXE</span>
            </div>

            <DialogHeader className="gap-2 text-left">
              <DialogTitle className="text-[24px] font-semibold uppercase leading-none text-[#ffd36a] sm:text-[32px]">
                Before you enter
              </DialogTitle>
              <DialogDescription className="sr-only">
                {DISCLAIMER_COPY}
              </DialogDescription>
            </DialogHeader>

            {/* Main text area */}
            <div className="mt-4 min-h-0 flex-1 overflow-hidden rounded border-2 border-[#ffb000]/30 bg-black/50 p-4 text-[16px] font-medium leading-[1.35] text-[#ffb000] sm:mt-5 sm:p-5 sm:text-[22px]">
              <span className="whitespace-pre-line">{DISCLAIMER_COPY.slice(0, typedLength)}</span>
              {!typingComplete && (
                <span className="disclaimer-caret ml-1 inline-block h-[1em] w-[0.12em] translate-y-[0.15em] bg-[#ffb000]" />
              )}
            </div>

            {/* Bottom row: loading bar + prompt */}
            <div className="mt-4 space-y-3 sm:mt-5">
              {/* Loading bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[12px] uppercase tracking-[0.14em] text-[#ffcf66] sm:text-[14px]">
                  <span>Loading assets</span>
                  <span>{loadProgress}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-none border-2 border-[#ffb000]/50 bg-black">
                  <div
                    className="h-full bg-[#ffb000] transition-all duration-300 ease-out shadow-[0_0_8px_rgba(255,176,0,0.4)]"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
              </div>

              {/* Prompt line */}
              {showPrompt && (
                <div className="flex items-center text-[15px] font-semibold uppercase tracking-[0.1em] text-[#ffe0a3] sm:text-[18px]">
                  <span>{promptText}</span>
                  <span className="disclaimer-caret ml-1 inline-block h-[1em] w-[0.14em] translate-y-[0.15em] bg-[#ffb000]" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Monitor brand / bottom bezel detail */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.3em] text-[#333]">
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
