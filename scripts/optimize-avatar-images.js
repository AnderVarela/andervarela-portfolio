/*
 * Genera las versiones web de las poses del avatar a partir de los PNG originales:
 * un WebP por cada ancho de TARGET_WIDTHS y una miniatura que sirve de silueta mientras carga.
 * Se lanza con `npm run optimize:avatar` cada vez que se añade o cambia una pose.
 */
import { mkdir, readdir, rm } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const SOURCE_DIRECTORY = fileURLToPath(new URL('../src/assets/avatar', import.meta.url));
const OUTPUT_DIRECTORY = join(SOURCE_DIRECTORY, 'optimized');

const TARGET_WIDTHS = [512, 1024, 1536];
const IMAGE_QUALITY = 82;
/* Tan pequeña que Vite la incrusta en el JavaScript y está disponible sin ninguna petición. */
const PLACEHOLDER_WIDTH = 32;
const PLACEHOLDER_QUALITY = 40;

function resolveOutputWidths(sourceWidth) {
  return [...new Set(TARGET_WIDTHS.map((targetWidth) => Math.min(targetWidth, sourceWidth)))];
}

async function optimizePose(sourceFileName) {
  const poseName = basename(sourceFileName, extname(sourceFileName));
  const sourcePath = join(SOURCE_DIRECTORY, sourceFileName);
  const { width: sourceWidth } = await sharp(sourcePath).metadata();

  await Promise.all([
    ...resolveOutputWidths(sourceWidth).map((width) =>
      sharp(sourcePath)
        .resize({ width })
        .webp({ quality: IMAGE_QUALITY, alphaQuality: 100, effort: 6 })
        .toFile(join(OUTPUT_DIRECTORY, `${poseName}-${width}.webp`)),
    ),
    sharp(sourcePath)
      .resize({ width: PLACEHOLDER_WIDTH })
      .webp({ quality: PLACEHOLDER_QUALITY, effort: 6 })
      .toFile(join(OUTPUT_DIRECTORY, `${poseName}-placeholder.webp`)),
  ]);
}

const sourceFileNames = (await readdir(SOURCE_DIRECTORY)).filter(
  (fileName) => extname(fileName) === '.png',
);

await rm(OUTPUT_DIRECTORY, { recursive: true, force: true });
await mkdir(OUTPUT_DIRECTORY, { recursive: true });
await Promise.all(sourceFileNames.map(optimizePose));

console.log(`Optimizadas ${sourceFileNames.length} poses en ${OUTPUT_DIRECTORY}`);
