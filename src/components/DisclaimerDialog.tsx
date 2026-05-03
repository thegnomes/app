import { useEffect, useState } from 'react';
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
}

export function DisclaimerDialog({ open, onClose, onSkip }: DisclaimerDialogProps) {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (!open) {
      setCountdown(10);
      return;
    }
    setCountdown(10);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [open, onClose]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
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
        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Enter {countdown > 0 && `(${countdown})`}
          </Button>
          <Button variant="secondary" onClick={onSkip}>
            Skip to work
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
