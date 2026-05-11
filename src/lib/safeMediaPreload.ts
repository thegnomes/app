export interface PreloadResult {
  src: string;
  success: boolean;
  readyState: number;
}

/**
 * Preload a video with a timeout fallback.
 * On iPhone Safari, `canplaythrough` may never fire for WebM files.
 * We accept `loadedmetadata` (readyState >= 1) as success and always
 * resolve within `timeoutMs` so the caller is never trapped.
 */
export function preloadVideo(
  src: string,
  opts?: { timeoutMs?: number; preload?: 'none' | 'metadata' | 'auto' }
): Promise<PreloadResult> {
  const timeoutMs = opts?.timeoutMs ?? 4000;
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
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('canplaythrough', onCanPlayThrough);
      video.removeEventListener('error', onError);
      video.pause();
      video.src = '';
      video.load();
      resolve({ src, success, readyState });
    };

    const onLoadedMetadata = () => {
      if (video.readyState >= 1) {
        finish(true);
      }
    };

    const onCanPlayThrough = () => {
      finish(true);
    };

    const onError = () => {
      finish(false);
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('canplaythrough', onCanPlayThrough);
    video.addEventListener('error', onError);

    video.src = src;
    video.load();

    // Safety timeout: always resolve so the app never hangs
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

    document.fonts.ready
      .then(() => finish(true))
      .catch(() => finish(false));

    window.setTimeout(() => finish(false), timeoutMs);
  });
}
