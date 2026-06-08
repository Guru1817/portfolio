import sharp from 'sharp';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const root = resolve(process.cwd());
const svg = readFileSync(resolve(root, 'public/og-image.svg'));

await sharp(svg, { density: 300 })
  .resize(1200, 630, { fit: 'cover' })
  .png({ quality: 92 })
  .toFile(resolve(root, 'public/og-image.png'));

await sharp(svg, { density: 300 })
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(resolve(root, 'public/og-image.jpg'));

console.log('Generated public/og-image.png and public/og-image.jpg');
