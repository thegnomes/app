import { useEffect, useRef, type RefObject } from 'react';

interface UseScrollLockOptions {
  cooldownMs?: number;
  deltaThreshold?: number;
  touchThreshold?: number;
}

export function useScrollLock(
  ref: RefObject<HTMLElement | null>,
  onNavigate: (direction: 'up' | 'down') => boolean,
  options: UseScrollLockOptions = {}
) {
  const {
    cooldownMs = 500,
    deltaThreshold = 4,
    touchThreshold = 40,
  } = options;

  const isEnabledRef = useRef(false);
  const cooldownRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const onNavigateRef = useRef(onNavigate);

  useEffect(() => {
    onNavigateRef.current = onNavigate;
  }, [onNavigate]);

  useEffect(() => {
    const checkPosition = () => {
      const el = ref.current;
      if (!el) {
        isEnabledRef.current = false;
        return;
      }
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const tolerance = Math.min(96, vh * 0.12);
      isEnabledRef.current = rect.top <= tolerance && rect.bottom >= vh - tolerance;
    };

    const onScroll = () => checkPosition();

    const onWheel = (e: WheelEvent) => {
      checkPosition();
      if (!isEnabledRef.current) return;

      // Ignore tiny jitter deltas from trackpads
      if (Math.abs(e.deltaY) < deltaThreshold) return;

      const dir = e.deltaY > 0 ? 'down' : 'up';

      if (cooldownRef.current) {
        e.preventDefault();
        return;
      }

      const consumed = onNavigateRef.current(dir);
      if (consumed) {
        e.preventDefault();
        cooldownRef.current = true;
        setTimeout(() => {
          cooldownRef.current = false;
        }, cooldownMs);
      }
      // If not consumed, allow normal scroll to pass through
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      checkPosition();
      if (!isEnabledRef.current) return;
      if (touchStartYRef.current == null) return;

      const deltaY = touchStartYRef.current - e.touches[0].clientY;
      if (Math.abs(deltaY) < touchThreshold) return;

      const dir = deltaY > 0 ? 'down' : 'up';

      if (cooldownRef.current) {
        e.preventDefault();
        return;
      }

      const consumed = onNavigateRef.current(dir);
      if (consumed) {
        e.preventDefault();
        touchStartYRef.current = e.touches[0].clientY;
        cooldownRef.current = true;
        setTimeout(() => {
          cooldownRef.current = false;
        }, cooldownMs);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      checkPosition();
      if (!isEnabledRef.current) return;

      const dir =
        e.key === 'ArrowDown' || e.key === 'ArrowRight'
          ? 'down'
          : e.key === 'ArrowUp' || e.key === 'ArrowLeft'
          ? 'up'
          : null;

      if (!dir) return;

      if (cooldownRef.current) {
        e.preventDefault();
        return;
      }

      const consumed = onNavigateRef.current(dir);
      if (consumed) {
        e.preventDefault();
        cooldownRef.current = true;
        setTimeout(() => {
          cooldownRef.current = false;
        }, cooldownMs);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    checkPosition();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [ref, cooldownMs, deltaThreshold, touchThreshold]);
}
