// Wandelt die KI-generierten PNGs in webp um (kleiner, gleiche Optik).
// Nutzung: node scripts/convert-images.mjs <quell-ordner>
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const src = process.argv[2];
const out = path.join(process.cwd(), "public", "images");
await mkdir(out, { recursive: true });

const files = (await readdir(src)).filter((f) => f.endsWith(".png"));
for (const f of files) {
  const target = path.join(out, f.replace(/\.png$/, ".webp"));
  const info = await sharp(path.join(src, f))
    .resize({ width: 1800, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(target);
  console.log(`${f} -> ${path.basename(target)}  ${(info.size / 1024).toFixed(0)} KB`);
}
