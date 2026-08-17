/**
 * prepare-avatar.mjs
 * -----------------------------------------------------------
 * Removes the white background from your character image and
 * embeds it as a base64 PNG into banner.svg, banner-light.svg
 * and lanyard.svg (no external image deps at render time).
 *
 * Strategy: border flood-fill. We only clear "near white" pixels
 * that are CONNECTED to the image border. That keeps the white
 * hoodie / shoes (interior regions bounded by the character's
 * dark outline) fully intact.
 *
 * Usage:
 *   1. Save your image as: github-profile/assets/character.png
 *      (PNG or JPG both fine; just name it character.png)
 *   2. From the github-profile folder run:
 *        node scripts/prepare-avatar.mjs
 *      Optional tolerance (higher = removes more off-white):
 *        node scripts/prepare-avatar.mjs --tol 22
 *
 * Requires: sharp  (npm i sharp   — already present in this repo)
 * -----------------------------------------------------------
 */
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ASSETS = join(ROOT, 'assets');

const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : def;
};
const TOL = Number(arg('tol', '18')); // how far from pure white still counts as background

function findInput() {
  for (const n of ['character.png', 'character.jpg', 'character.jpeg', 'character.webp']) {
    const p = join(ASSETS, n);
    if (existsSync(p)) return p;
  }
  return null;
}

async function cutout(inputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: W, height: H } = info;
  const idx = (x, y) => (y * W + x) * 4;
  const near = (i) => {
    // treat as background candidate if bright & low saturation
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    return min >= 255 - (TOL + 12) && (max - min) <= TOL + 8;
  };

  // Flood fill from every border pixel
  const visited = new Uint8Array(W * H);
  const stack = [];
  const pushIf = (x, y) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const p = y * W + x;
    if (visited[p]) return;
    visited[p] = 1;
    if (near(idx(x, y))) stack.push(p);
  };
  for (let x = 0; x < W; x++) { pushIf(x, 0); pushIf(x, H - 1); }
  for (let y = 0; y < H; y++) { pushIf(0, y); pushIf(W - 1, y); }

  const bg = new Uint8Array(W * H);
  while (stack.length) {
    const p = stack.pop();
    bg[p] = 1;
    const x = p % W, y = (p / W) | 0;
    // 4-neighbourhood
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const np = ny * W + nx;
      if (visited[np]) continue;
      visited[np] = 1;
      if (near(idx(nx, ny))) stack.push(np);
    }
  }

  // Apply transparency + 1px soft edge
  for (let p = 0; p < W * H; p++) {
    if (bg[p]) data[p * 4 + 3] = 0;
  }
  // feather: any opaque pixel touching a transparent one gets slight alpha drop
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const p = y * W + x;
      if (data[p * 4 + 3] === 0) continue;
      if (bg[p - 1] || bg[p + 1] || bg[p - W] || bg[p + W]) {
        data[p * 4 + 3] = 160;
      }
    }
  }

  // opaque bounding box (for face crop)
  let minX = W, minY = H, maxX = 0, maxY = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (data[idx(x, y) + 3] > 20) {
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
    }
  }

  const full = await sharp(data, { raw: { width: W, height: H, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toBuffer();

  // face crop: head + shoulders from top-centre of the character bbox
  const bw = Math.max(1, maxX - minX), bh = Math.max(1, maxY - minY);
  const side = Math.min(Math.round(bw * 0.6), Math.round(bh * 0.5));
  const cx = minX + Math.round(bw * 0.5);
  const fx = Math.max(0, cx - Math.round(side / 2));
  const fy = Math.max(0, minY + Math.round(bh * 0.02));
  const fSide = Math.min(side, W - fx, H - fy);

  const face = await sharp(data, { raw: { width: W, height: H, channels: 4 } })
    .extract({ left: fx, top: fy, width: fSide, height: fSide })
    .resize(300, 300, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toBuffer();

  return { full, face };
}

async function inject(file, token, dataUri) {
  const p = join(ROOT, file);
  if (!existsSync(p)) return false;
  let svg = await readFile(p, 'utf8');
  // idempotent: match the token OR a previously injected data URI on that href
  const re = new RegExp(`xlink:href="(?:${token}|data:image/png;base64,[^"]*)"`, 'g');
  const hits = svg.match(re);
  if (!hits) return false;
  svg = svg.replace(re, `xlink:href="${dataUri}"`);
  await writeFile(p, svg, 'utf8');
  return hits.length;
}

async function main() {
  const input = findInput();
  if (!input) {
    console.error('\n[prepare-avatar] No image found.');
    console.error('  Save your picture as: github-profile/assets/character.png');
    console.error('  Then run: node scripts/prepare-avatar.mjs\n');
    process.exit(1);
  }
  console.log(`[prepare-avatar] input: ${input}  (tolerance ${TOL})`);
  const { full, face } = await cutout(input);

  const fullUri = `data:image/png;base64,${full.toString('base64')}`;
  const faceUri = `data:image/png;base64,${face.toString('base64')}`;

  const a = await inject('banner.svg', 'AVATAR_DATA_URI', fullUri);
  const b = await inject('banner-light.svg', 'AVATAR_DATA_URI', fullUri);
  const c = await inject('lanyard.svg', 'AVATAR_FACE_URI', faceUri);

  // save the transparent cutout too, in case you want it elsewhere
  await writeFile(join(ASSETS, 'character-nobg.png'), full);

  console.log(`[prepare-avatar] embedded into: banner.svg(${a}) banner-light.svg(${b}) lanyard.svg(${c})`);
  console.log(`[prepare-avatar] wrote assets/character-nobg.png`);
  console.log('[prepare-avatar] done. Commit the updated SVGs.\n');
}

main().catch((e) => { console.error(e); process.exit(1); });
