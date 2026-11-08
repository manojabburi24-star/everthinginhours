// Prepares web-ready copies of the supplied brand files.
// The logo artwork itself is never altered: we only trim empty space,
// resize, and (for the mark, which was supplied on solid black) make the black background transparent.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve("../Manoj --- SS EIH");
const OUT = path.resolve("public/brand");
await mkdir(OUT, { recursive: true });

// Wordmarks (already transparent): trim padding, cap width.
await sharp(path.join(SRC, "Everything In Hours – Digital Marketing Logo.png"))
  .trim()
  .resize({ width: 900, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(path.join(OUT, "logo-light-bg.png"));

await sharp(path.join(SRC, "Everything In Hours Logo.png"))
  .trim()
  .resize({ width: 900, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(path.join(OUT, "logo-dark-bg.png"));

// Mark: key out the black background (luminance ramp keeps anti-aliased edges soft).
const { data, info } = await sharp(path.join(SRC, "Overlapping Colourful Play Triangles.png"))
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  const m = Math.max(data[i], data[i + 1], data[i + 2]);
  const a = m <= 30 ? 0 : m >= 90 ? 255 : Math.round(((m - 30) / 60) * 255);
  data[i + 3] = a;
}
const markBuf = await sharp(data, { raw: info }).trim().png().toBuffer();
await sharp(markBuf).resize({ width: 512 }).png({ compressionLevel: 9 }).toFile(path.join(OUT, "mark.png"));

// Favicons: mark centered on white rounded tile, like the brand board's app icon.
for (const size of [32, 180, 512]) {
  const pad = Math.round(size * 0.16);
  const inner = await sharp(markBuf).resize({ width: size - pad * 2, height: size - pad * 2, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  const r = Math.round(size * 0.22);
  const tile = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="#FFFFFF"/></svg>`);
  await sharp(tile).composite([{ input: inner, gravity: "center" }]).png().toFile(path.join(OUT, `icon-${size}.png`));
}

// Open Graph image: hero strip of the official brand identity board.
await sharp(path.join(SRC, "Everything In Hours Brand Identity Board.png"))
  .extract({ left: 0, top: 0, width: 1020, height: 336 })
  .resize({ width: 1200, height: 630, fit: "contain", background: "#FFE7A3" })
  .jpeg({ quality: 85 })
  .toFile(path.join(OUT, "og-image.jpg"));

console.log("Brand assets written to", OUT);
