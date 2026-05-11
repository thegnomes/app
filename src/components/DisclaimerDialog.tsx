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
  return (
    <DialogContent
      showCloseButton={false}
      data-testid="disclaimer-terminal"
      className="max-w-none border-0 bg-transparent p-0 shadow-none flex items-center justify-center"
    >
      {/* Monitor frame */}
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

            {/* Main text area */}
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
              <span className="whitespace-pre-line">{DISCLAIMER_COPY}</span>
            </div>

            {/* Bottom row: loading bar + CTAs */}
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

              {/* CTA Buttons — Skip is always enabled; Full Experience waits for assets */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={!assetsLoaded}
                  className="min-h-[48px] border-2 px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors disabled:opacity-40 disabled:cursor-not-allowed sm:text-[13px]"
                  style={{
                    borderColor: NEON.primary,
                    background: 'rgba(0, 240, 255, 0.08)',
                    color: NEON.textBright,
                    boxShadow: `0 0 14px ${NEON.faint}`,
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                >
                  Full Experience
                </button>
                <button
                  type="button"
                  onClick={onSkip}
                  className="min-h-[48px] border-2 px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors sm:text-[13px]"
                  style={{
                    borderColor: NEON.faint,
                    background: 'rgba(0, 0, 0, 0.45)',
                    color: NEON.text,
                    boxShadow: `0 0 10px rgba(0, 240, 255, 0.12)`,
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                >
                  Skip to Work
                </button>
              </div>

              {!assetsLoaded && (
                <div
                  className="text-center text-[11px] uppercase tracking-[0.14em]"
                  style={{ color: NEON.dim, fontFamily: "'Orbitron', sans-serif" }}
                >
                  Please wait while assets load…
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
          LEAVEEVERYTHINGTOCHANCE
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
