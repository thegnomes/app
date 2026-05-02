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
  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent className="w-[33vw] min-w-[280px]">
        <DialogHeader>
          <DialogTitle className="font-orbitron">Welcome to NebulaHero</DialogTitle>
          <DialogDescription className="pt-2">
            This is an interactive experience where ideas form in the mind.
            Hold to charge, release to ignite, and explore the particle universe.
          </DialogDescription>
        </DialogHeader>
        <div className="text-sm text-muted-foreground">
          If you would rather skip the journey and jump straight to the portfolio,
          use the button below.
        </div>
        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Enter Experience
          </Button>
          <Button variant="secondary" onClick={onSkip}>
            Skip to Scene 02
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
