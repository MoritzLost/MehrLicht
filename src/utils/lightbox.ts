import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export function getLightboxImage(src: ImageMetadata) {
    return getImage({ src, width: 1600, quality: 'high' });
}
