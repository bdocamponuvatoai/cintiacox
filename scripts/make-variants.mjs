// Creates 960px-wide WebP copies of the real photos for cards, thumbnails and phones.
// Resize and re-encode only: no retouching. Run with `node scripts/make-variants.mjs`.
import sharp from 'sharp';
import path from 'node:path';

const DIR = path.resolve('public/assets');
const WIDTH = 960;
const photos = [
  'fort-lauderdale-home',
  'marbella',
  'carlton',
  'watermark',
  'highland-beach',
  'delray-home',
  'boca-raton',
  'delray-beach',
  'palm-beach',
];

for (const name of photos) {
  const input = path.join(DIR, `${name}.webp`);
  const output = path.join(DIR, `${name}-${WIDTH}.webp`);
  const info = await sharp(input).resize({ width: WIDTH, withoutEnlargement: true }).webp({ quality: 78 }).toFile(output);
  console.log(`${name}-${WIDTH}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
}
