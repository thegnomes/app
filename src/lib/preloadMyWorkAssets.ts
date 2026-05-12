import { resolveAssetUrl } from './assets';

/**
 * Critical above-the-fold media assets for /mywork.html (Scene02).
 *
 * Posters are preloaded as images so the transition has no missing-asset gap
 * while WEBM/MP4 media loads progressively. Videos are warmed with metadata-only
 * preload so iOS Safari does not attempt full download of hidden videos.
 */

const MYWORK_DOCUMENT_PATH = '/mywork.html';

/** Poster images that must be visible immediately on mywork load. */
const CRITICAL_POSTER_SOURCES: string[] = [
  // Nebula background (already an image, preload to guarantee presence)
  '/scene02/nebula_space_only2x.png',
  // Astronaut video poster
  // TODO: poster is in /webm/ while video is in /scene02/; ideally move to /scene02/looking-astro-loop2.png
  '/webm/looking-astro-loop2.png',
  // Portfolio galaxy posters
  '/webm/toto-ga2.png',
  '/webm/nft11-ga2.png',
  '/webm/oxytap-ga2.png',
  // Target-lock overlay poster
  '/webm/target-lock.png',
];

/** Video metadata to warm before redirect (metadata only, not full preload). */
const CRITICAL_VIDEO_SOURCES: string[] = [
  '/scene02/looking-astro-loop2.webm',
  '/scene02/looking-astro-loop2.mov',
  '/webm/toto-ga2.webm',
  '/webm/toto-ga2.mov',
  '/webm/nft11-ga2.webm',
  '/webm/nft11-ga2.mov',
  '/webm/oxytap-ga2.webm',
  '/webm/oxytap-ga2.mov',
  '/webm/target-lock.webm',
  '/webm/target-lock.mov',
];

let warmPromise: Promise<void> | null = null;

/**
 * Preload a single image via `Image()`. Resolves whether successful or not.
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      img.onload = null;
      img.onerror = null;
      resolve();
    };

    img.onload = finish;
    img.onerror = finish;
    img.src = resolveAssetUrl(src);

    // Safety timeout so a stalled image never blocks navigation
    window.setTimeout(finish, 5000);
  });
}

/**
 * Warm video metadata only using a detached `<video>` element.
 * On iOS Safari this avoids full-buffering hidden videos.
 * Resolves on loadedmetadata, canplay, canplaythrough, error, or timeout.
 */
export function warmVideoMetadata(src: string): Promise<void> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.style.display = 'none';

    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      video.removeEventListener('loadedmetadata', onResolve);
      video.removeEventListener('canplay', onResolve);
      video.removeEventListener('canplaythrough', onResolve);
      video.removeEventListener('error', onResolve);
      video.pause();
      video.src = '';
      video.load();
      resolve();
    };

    const onResolve = () => finish();

    video.addEventListener('loadedmetadata', onResolve);
    video.addEventListener('canplay', onResolve);
    video.addEventListener('canplaythrough', onResolve);
    video.addEventListener('error', onResolve);

    video.src = resolveAssetUrl(src);
    video.load();

    // Safety timeout: never block indefinitely
    window.setTimeout(finish, 5000);
  });
}

/**
 * Prefetch the mywork.html document so the browser can begin parsing
 * before the redirect happens.
 */
function prefetchMyWorkDocument(): void {
  const existing = document.head.querySelector('link[data-mywork-prefetch="true"]');
  if (existing) return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.as = 'document';
  link.href = MYWORK_DOCUMENT_PATH;
  link.dataset.myworkPrefetch = 'true';
  document.head.appendChild(link);
}

/**
 * Warm all critical mywork assets: prefetch the document, preload poster images,
 * and warm video metadata. The returned Promise is cached and reused so duplicate
 * calls do not create extra network requests.
 *
 * Safe for iOS Safari: never relies on full video preload and always resolves
 * within a bounded time.
 */
export function warmMyWorkCriticalAssets(): Promise<void> {
  if (warmPromise) return warmPromise;

  warmPromise = (async (): Promise<void> => {
    prefetchMyWorkDocument();

    const imagePromises = CRITICAL_POSTER_SOURCES.map((src) =>
      preloadImage(src).catch(() => undefined)
    );
    const videoPromises = CRITICAL_VIDEO_SOURCES.map((src) =>
      warmVideoMetadata(src).catch(() => undefined)
    );

    // Wait for all, but cap total wait so navigation is never blocked forever
    await Promise.race([
      Promise.all([...imagePromises, ...videoPromises]),
      new Promise<void>((resolve) => window.setTimeout(resolve, 4000)),
    ]);
  })();

  return warmPromise;
}
