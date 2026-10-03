import { useId, useState } from "react";
import { ArrowsLeftRight, Info } from "@phosphor-icons/react";
import { Img } from "./Img";

/**
 * Vorher/Nachher-Vergleich.
 *
 * TODO(placeholder): Es liegen noch keine echten Kundenfotos vor. Die
 * "Vorher"-Seite ist dasselbe Bild, digital abgestumpft. Sobald echte Paare
 * existieren, `before`/`after` auf zwei Bildschlüssel umstellen und den
 * Platzhalter-Hinweis entfernen.
 *
 * Bedienung: nativer <input type="range"> über der ganzen Fläche, dadurch
 * Maus, Touch, Tastatur (Pfeiltasten, Pos1/Ende) und Screenreader ohne Extra-Code.
 */
export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <section aria-labelledby="vn-title" className="section-y bg-bg">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="eyebrow reveal">Vorher / Nachher</p>
            <h2 id="vn-title" className="h-section reveal mt-5" style={{ "--i": 1 } as React.CSSProperties}>
              Der Unterschied liegt <span className="text-accent">im Glanz.</span>
            </h2>
          </div>
          <p className="reveal text-lg leading-relaxed text-muted lg:col-span-5 lg:col-start-8" style={{ "--i": 2 } as React.CSSProperties}>
            Ziehen Sie den Regler und vergleichen Sie stumpfen, verschmutzten Lack mit dem Ergebnis nach Reinigung und Politur.
          </p>
        </div>

        <div className="reveal-img relative mt-12 select-none overflow-hidden rounded-[var(--radius-img)] lg:mt-16">
          {/* Nachher (Basis) */}
          <Img k="lackflanke" ratio={16 / 9} sizes="(min-width: 1320px) 1240px, 100vw" className="max-sm:!aspect-[4/3]" />

          {/* Vorher (abgeschnitten) */}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} aria-hidden="true">
            <Img
              k="lackflanke"
              ratio="auto"
              sizes="(min-width: 1320px) 1240px, 100vw"
              className="h-full"
              imgStyle={{ filter: "saturate(0.35) brightness(0.62) contrast(0.78) blur(0.6px)" }}
            />
            {/* Staub-/Schleierschicht */}
            <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_40%_40%,rgb(160_150_130/0.28),rgb(90_85_75/0.35))] mix-blend-screen" />
            <svg className="absolute inset-0 h-full w-full opacity-40 mix-blend-overlay" aria-hidden="true">
              <filter id={`${id}-n`}>
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter={`url(#${id}-n)`} />
            </svg>
          </div>

          {/* Labels */}
          <span className="pointer-events-none absolute left-4 top-4 rounded-[2px] bg-bg/75 px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.2em] backdrop-blur sm:left-6 sm:top-6">
            Vorher
          </span>
          <span className="pointer-events-none absolute right-4 top-4 rounded-[2px] bg-accent px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-on-accent sm:right-6 sm:top-6">
            Nachher
          </span>

          {/* Griff */}
          <div className="pointer-events-none absolute inset-y-0 w-px bg-accent-light" style={{ left: `${pos}%` }} aria-hidden="true">
            <span className="ba-handle absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent-light bg-bg/80 text-accent-light shadow-[0_8px_30px_rgb(0_0_0/0.5)] backdrop-blur">
              <ArrowsLeftRight size={22} weight="bold" />
            </span>
          </div>

          <label htmlFor={`${id}-r`} className="sr-only">
            Vergleichsregler: links Vorher, rechts Nachher
          </label>
          <input
            id={`${id}-r`}
            type="range"
            min={0}
            max={100}
            step={1}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-valuetext={`${pos} Prozent Vorher sichtbar`}
            className="ba-range absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>

        <p className="mt-4 flex items-start gap-2 text-sm text-subtle">
          <Info size={18} className="mt-0.5 shrink-0" />
          Platzhalter-Darstellung: Beide Seiten zeigen dasselbe Symbolbild, die Vorher-Seite ist digital bearbeitet. Echte
          Ergebnisse aus unserer Werkstatt folgen.
        </p>
      </div>
    </section>
  );
}
