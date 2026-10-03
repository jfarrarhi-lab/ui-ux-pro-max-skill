/**
 * Lädt alle Bilder aus src/content/images.ts, erzeugt AVIF + WebP in mehreren
 * Breiten unter public/images/ und schreibt src/content/images.local.json.
 *
 *   npm run images            # nur fehlende Bilder
 *   npm run images -- --force # alles neu erzeugen
 *
 * Eigene Fotos: Datei als .image-cache/<key>.(jpg|png|webp) ablegen. Sie hat
 * Vorrang vor der Remote-URL und wird genauso optimiert.
 */
import { mkdir, readFile, writeFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public/images");
const cacheDir = path.join(root, ".image-cache");
const manifestPath = path.join(root, "src/content/images.local.json");
const force = process.argv.includes("--force");
const WIDTHS = [640, 1280, 1920];

// images.ts ohne TS-Toolchain auslesen: Schlüssel + remote-URL
const src = await readFile(path.join(root, "src/content/images.ts"), "utf8");
const cdn = src.match(/const CDN = "([^"]+)"/)?.[1] ?? "";
const entries = [...src.matchAll(/^\s{2}(\w+): \{\s*\n\s*remote: `([^`]+)`/gm)].map(([, key, url]) => [key, url.replace("${CDN}", cdn)]);

await mkdir(outDir, { recursive: true });
await mkdir(cacheDir, { recursive: true });
const manifest = existsSync(manifestPath) ? JSON.parse(await readFile(manifestPath, "utf8")) : {};
const cached = await readdir(cacheDir);

for (const [key, url] of entries) {
  if (!force && manifest[key] && existsSync(path.join(outDir, `${key}-${WIDTHS[0]}.webp`))) {
    console.log(`= ${key}`);
    continue;
  }
  let input;
  const own = cached.find((f) => f.startsWith(`${key}.`));
  if (own) {
    input = await readFile(path.join(cacheDir, own));
  } else {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`! ${key}: HTTP ${res.status} – übersprungen`);
      continue;
    }
    input = Buffer.from(await res.arrayBuffer());
    await writeFile(path.join(cacheDir, `${key}.png`), input);
  }
  const meta = await sharp(input).metadata();
  const widths = WIDTHS.filter((w) => w <= (meta.width ?? 0));
  if (!widths.length) widths.push(meta.width);
  for (const w of widths) {
    const base = sharp(input).resize({ width: w, withoutEnlargement: true });
    await base.clone().avif({ quality: 50, effort: 4 }).toFile(path.join(outDir, `${key}-${w}.avif`));
    await base.clone().webp({ quality: 74 }).toFile(path.join(outDir, `${key}-${w}.webp`));
  }
  manifest[key] = { widths };
  console.log(`✓ ${key} (${meta.width}×${meta.height}) → ${widths.join(", ")}`);
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\nManifest geschrieben: ${path.relative(root, manifestPath)}`);
