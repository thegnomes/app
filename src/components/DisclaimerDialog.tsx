import { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DisclaimerDialogProps {
  open: boolean;
  onClose: () => void;
  onSkip: () => void;
  loadProgress: number;
  assetsLoaded: boolean;
}

export function DisclaimerDialog({ open, onClose, onSkip, loadProgress, assetsLoaded }: DisclaimerDialogProps) {
  const [countdown, setCountdown] = useState(10);
  const waitingRef = useRef(false);

  useEffect(() => {
    if (!open) {
      setCountdown(10);
      waitingRef.current = false;
      return;
    }
    setCountdown(10);
    waitingRef.current = false;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (assetsLoaded) {
            onClose();
          } else {
            waitingRef.current = true;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [open, onClose, assetsLoaded]);

  // Auto-close when assets finish loading if countdown already reached 0
  useEffect(() => {
    if (assetsLoaded && waitingRef.current && open) {
      waitingRef.current = false;
      onClose();
    }
  }, [assetsLoaded, open, onClose]);

  const canAct = assetsLoaded;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen && canAct) onClose(); }}>
      <DialogContent className="w-[33vw] min-w-[280px]">
        <DialogHeader>
          <DialogTitle className="font-orbitron">Before you enter</DialogTitle>
          <DialogDescription className="pt-2 text-sm leading-relaxed">
            This portfolio is interactive by design.
            <br /><br />
            It begins with a short opening sequence that frames how I think, build, and navigate creative work.
            <br /><br />
            Follow the experience if you have a moment.
            <br />
            Or skip straight to the projects if you are here to review the work.
          </DialogDescription>
        </DialogHeader>

        {/* Preloader */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Loading assets</span>
            <span>{loadProgress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-neutral-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>

        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={!canAct}>
            Enter {countdown > 0 && `(${countdown})`}
          </Button>
          <Button variant="secondary" onClick={onSkip} disabled={!canAct}>
            Skip to work
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
