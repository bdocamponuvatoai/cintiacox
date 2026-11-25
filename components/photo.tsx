'use client';
// A client component on purpose: images rendered by Server Components put preload
// hints into the route's prefetch payload, so every visible <Link> would download
// the next page's full-size hero photo. The page's own HTML still preloads its
// eager image, so first-load LCP is unaffected.
import { photos } from '../lib/content';

/**
 * A real photo from public/assets, sized from its native dimensions.
 * Photos larger than 960px also ship a 960px copy (scripts/make-variants.mjs);
 * `sizes` tells the browser how wide the photo renders so it can pick one.
 */
export function Photo({
  name,
  alt,
  sizes = '(min-width: 1080px) 50vw, 100vw',
  eager = false,
  className = '',
}: {
  name: string;
  alt: string;
  sizes?: string;
  eager?: boolean;
  className?: string;
}) {
  const size = photos[name];
  const hasVariant = size && size.width > 960;
  return (
    <img
      className={className || undefined}
      src={`/assets/${name}.webp`}
      srcSet={hasVariant ? `/assets/${name}-960.webp 960w, /assets/${name}.webp ${size.width}w` : undefined}
      sizes={hasVariant ? sizes : undefined}
      alt={alt}
      width={size?.width}
      height={size?.height}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
    />
  );
}
