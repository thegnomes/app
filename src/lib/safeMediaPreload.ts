export interface PreloadResult {
  src: string;
  success: boolean;
  readyState: number;
}

/**
 * Preload a video with a timeout fallback.
 * On iPhone Safari, `canplaythrough` may never fire for WebM files.
 * Resolves on loadedmetadata, loadeddata, canplay, canplaythrough, error, or timeout.
 */
export function preloadVideo(
  src: string,
  opts?: { timeoutMs?: number; preload?: 'none' | 'metadata' | 'auto' }
): Promise<PreloadResult> {
  const timeoutMs = opts?.timeoutMs ?? 5000;
  const preload = opts?.preload ?? 'metadata';

  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = preload;
    video.muted = true;
    video.playsInline = true;
    video.style.display = 'none';

    let settled = false;

    const finish = (success: boolean) => {
      if (settled) return;
      settled = true;
      const readyState = video.readyState;
      video.removeEventListener('loadedmetadata', onResolve);
      video.removeEventListener('loadeddata', onResolve);
      video.removeEventListener('canplay', onResolve);
      video.removeEventListener('canplaythrough', onResolve);
      video.removeEventListener('error', onResolve);
      video.pause();
      video.src = '';
      video.load();
      resolve({ src, success, readyState });
    };

    const onResolve = () => {
      finish(true);
    };

    const onError = () => {
      finish(false);
    };

    video.addEventListener('loadedmetadata', onResolve);
    video.addEventListener('loadeddata', onResolve);
    video.addEventListener('canplay', onResolve);
    video.addEventListener('canplaythrough', onResolve);
    video.addEventListener('error', onError);

    video.src = src;
    video.load();

    // Safety timeout: always resolve so the app never hangs
    window.setTimeout(() => {
      if (!settled && import.meta.env.DEV) {
        console.warn(`[safeMediaPreload] Video preload timed out: ${src}`);
      }
      finish(false);
    }, timeoutMs);
  });
}

/**
 * Preload an image with a timeout fallback.
 */
export function preloadImage(src: string, timeoutMs = 5000): Promise<boolean> {
  return new Promise((resolve) => {
    let settled = false;

    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      if (!ok && import.meta.env.DEV) {
        console.warn(`[safeMediaPreload] Image preload failed/timed out: ${src}`);
      }
      resolve(ok);
    };

    const img = new Image();
    img.onload = () => finish(true);
    img.onerror = () => finish(false);
    img.src = src;

    window.setTimeout(() => finish(false), timeoutMs);
  });
}

/**
 * Wait for fonts to load with a timeout fallback.
 */
export function preloadFont(timeoutMs = 3000): Promise<boolean> {
  return new Promise((resolve) => {
    let settled = false;

    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      resolve(ok);
    };

    if (typeof document === 'undefined' || !('fonts' in document)) {
      finish(true);
      return;
    }

    document.fonts.ready
      .then(() => finish(true))
      .catch(() => finish(false));

    window.setTimeout(() => finish(false), timeoutMs);
  });
}
