import { cp, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';

const source = 'node_modules';
const destination = 'vendor';
await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });

for (const packageName of ['@ffmpeg/core', '@ffmpeg/ffmpeg', '@ffmpeg/util']) {
  const target = join(destination, packageName.replace('@ffmpeg/', 'ffmpeg-'));
  await cp(join(source, packageName, 'dist', 'esm'), target, { recursive: true });
}
