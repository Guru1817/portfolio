import sharp from 'sharp';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const root = resolve(process.cwd());
const svg = readFileSync(resolve(root, 'public/linkedin-banner.svg'));

await sharp(svg, { density: 300 })
  .resize(1584, 396, { fit: 'cover' })
  .png({ quality: 95 })
  .toFile(resolve(root, 'public/linkedin-banner.png'));

await sharp(svg, { density: 300 })
  .resize(1584, 396, { fit: 'cover' })
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(resolve(root, 'public/linkedin-banner.jpg'));

console.log('Generated public/linkedin-banner.png and public/linkedin-banner.jpg');
