interface AlphaVideoSource {
  src: string;
  type: string;
}

function canPlayHevcAlpha(): boolean {
  if (typeof document === 'undefined') return false;
  const video = document.createElement('video');
  // HEVC with alpha in MP4 container (Safari-compatible)
  return video.canPlayType('video/mp4; codecs="hvc1.1.6.L93.B0"') === 'probably';
}

export function getAlphaVideoSources(webmSrc: string, movSrc?: string): AlphaVideoSource[] {
  const webmSource = { src: webmSrc, type: 'video/webm' };
  if (!movSrc) return [webmSource];

  const movSource = { src: movSrc, type: 'video/quicktime' };

  // Use canPlayType to detect HEVC alpha support instead of UA sniffing.
  // Safari on macOS/iOS supports HEVC with alpha; prefer it there.
  return canPlayHevcAlpha() ? [movSource, webmSource] : [webmSource, movSource];
}
