import localManifest from "../content/images.local.json";
import { images, type ImageKey } from "../content/images";

type Local = Record<string, { widths: number[] }>;
const local = localManifest as Local;

type Props = {
  k: ImageKey;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Seitenverhältnis des Rahmens erzwingen (verhindert Layout Shift). */
  ratio?: number | "auto";
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
};

/**
 * Responsives Bild. Nutzt lokal optimierte AVIF/WebP-Varianten, sobald
 * `npm run images` gelaufen ist, sonst das Original aus dem Manifest.
 */
export function Img({ k, sizes = "100vw", className = "", imgClassName = "", priority, ratio, style, imgStyle }: Props) {
  const img = images[k];
  const variants = local[k]?.widths;
  const r = ratio === undefined ? img.ratio : ratio;
  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : "auto";

  const frameStyle: React.CSSProperties = { ...(r !== "auto" ? { aspectRatio: String(r) } : {}), ...style };

  if (variants?.length) {
    const set = (ext: string) => variants.map((w) => `/images/${k}-${w}.${ext} ${w}w`).join(", ");
    const fallback = `/images/${k}-${variants[Math.min(1, variants.length - 1)]}.webp`;
    return (
      <div className={`img-frame ${className}`} style={frameStyle}>
        <picture>
          <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
          <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
          <img src={fallback} alt={img.alt} loading={loading} decoding="async" fetchPriority={fetchPriority} className={imgClassName} style={imgStyle} />
        </picture>
      </div>
    );
  }

  return (
    <div className={`img-frame ${className}`} style={frameStyle}>
      <img src={img.remote} alt={img.alt} loading={loading} decoding="async" fetchPriority={fetchPriority} className={imgClassName} style={imgStyle} />
    </div>
  );
}

/** Kleinste sinnvolle URL eines Bildes, z. B. für die Lightbox oder OG. */
export function imageUrl(k: ImageKey, prefer = 1920) {
  const variants = local[k]?.widths;
  if (variants?.length) {
    const w = variants.reduce((a, b) => (Math.abs(b - prefer) < Math.abs(a - prefer) ? b : a));
    return `/images/${k}-${w}.webp`;
  }
  return images[k].remote;
}
