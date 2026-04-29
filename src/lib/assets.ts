/**
 * Resolve an asset path to a full URL.
 *
 * - Paths starting with `http` are returned as-is (already a full URL).
 * - Relative paths are prefixed with `VITE_ASSET_BASE_URL` if set.
 * - Otherwise returns the path unchanged (works with local `public/` files).
 *
 * Set `VITE_ASSET_BASE_URL` in your `.env` file or Vercel dashboard
 * when hosting assets on Vercel Blob / external CDN.
 *
 * Example:
 *   VITE_ASSET_BASE_URL=https://xxx.public.blob.vercel-storage.com
 *   resolveAssetUrl('/portfolio/hero.jpg')
 *   // => https://xxx.public.blob.vercel-storage.com/portfolio/hero.jpg
 */
export function resolveAssetUrl(src: string): string {
  if (src.startsWith('http')) return src;
  const base = import.meta.env.VITE_ASSET_BASE_URL || '';
  if (!base) return src;
  // Ensure base has no trailing slash and src starts with /
  const cleanBase = base.replace(/\/$/, '');
  const cleanSrc = src.startsWith('/') ? src : `/${src}`;
  return `${cleanBase}${cleanSrc}`;
}
