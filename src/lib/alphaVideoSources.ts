import { isSafari } from '@/lib/isSafari';

interface AlphaVideoSource {
  src: string;
  type: string;
}

export function getAlphaVideoSources(webmSrc: string, movSrc?: string): AlphaVideoSource[] {
  const webmSource = { src: webmSrc, type: 'video/webm' };
  if (!movSrc) return [webmSource];

  const movSource = { src: movSrc, type: 'video/quicktime' };

  // Safari/WebKit can select WebM but drop VP9 alpha, so prefer HEVC alpha there.
  return isSafari ? [movSource, webmSource] : [webmSource, movSource];
}
