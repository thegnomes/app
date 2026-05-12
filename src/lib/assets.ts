/**
 * Resolve an asset path to a full URL.
 *
 * - Paths starting with `http` are returned as-is (already a full URL).
 * - When `VITE_ASSET_BASE_URL` is set, portfolio paths are remapped to match
 *   the Vercel Blob folder structure and prefixed with the base URL.
 * - Root experience and Scene02 assets stay local so Vite/Vercel can serve
 *   them from `public/`.
 * - Otherwise returns the path unchanged (works with local `public/` files).
 *
 * Set `VITE_ASSET_BASE_URL` in your `.env.local` file or Vercel dashboard
 * when hosting assets on Vercel Blob / external CDN.
 *
 * Example:
 *   VITE_ASSET_BASE_URL=https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com
 *   resolveAssetUrl('/portfolio/NFT11/final/nft11-community-first.mp4')
 *   // => https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/NFT11/nft11-community-first.mp4
 */
export function resolveAssetUrl(src: string): string {
  if (src.startsWith('http')) return src;

  const base = import.meta.env.VITE_ASSET_BASE_URL || '';
  if (!base) return src;
  if (!src.startsWith('/portfolio/')) return src;

  // Map local public/ paths to Vercel Blob paths.
  // Blob upload structure flattens the /portfolio/ prefix and
  // removes intermediate final/ or final_media/ subfolders.
  const blobPath = src
    .replace(/^\/portfolio\//, '') // strip /portfolio/ prefix
    .replace(/^([^/]+)\/final\//, '$1/') // flatten .../final/ → .../
    .replace(/^([^/]+)\/final_media\//, '$1/'); // flatten .../final_media/ → .../

  const cleanBase = base.replace(/\/$/, '');
  const cleanPath = blobPath.startsWith('/') ? blobPath : `/${blobPath}`;
  return `${cleanBase}${cleanPath}`;
}
