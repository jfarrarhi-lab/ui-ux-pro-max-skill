import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowsOut, CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { Img, imageUrl } from "./Img";
import { images, type ImageKey } from "../content/images";

/** TODO(placeholder): Symbolbilder durch echte Fotos aus der Werkstatt ersetzen. */
const items: ImageKey[] = ["scheinwerfer", "aufbereitung", "tropfen", "reifen", "verkauf", "innenraum", "politur", "smartRepair", "hero"];

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = useCallback(() => dialogRef.current?.close(), []);
  const go = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)), []);

  // Pfeiltasten; ESC schließt nativ über <dialog>
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onKey = (e: KeyboardEvent) => {
      if (!dlg.open) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const onClose = () => setIndex(null);
    document.addEventListener("keydown", onKey);
    dlg.addEventListener("close", onClose);
    return () => {
      document.removeEventListener("keydown", onKey);
      dlg.removeEventListener("close", onClose);
    };
  }, [go]);

  // Scroll-Lock während die Lightbox offen ist
  useEffect(() => {
    if (index === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [index]);

  const current = index === null ? null : items[index];

  return (
    <section id="galerie" aria-labelledby="galerie-title" className="section-y border-t border-border bg-surface">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow reveal">Galerie</p>
            <h2 id="galerie-title" className="h-section reveal mt-5" style={{ "--i": 1 } as React.CSSProperties}>
              Details, die man sieht.
            </h2>
          </div>
          <p className="reveal max-w-xs text-sm text-subtle" style={{ "--i": 2 } as React.CSSProperties}>
            Symbolbilder. Fotos aus unserer Werkstatt folgen in Kürze.
          </p>
        </div>

        <ul className="mt-12 columns-1 gap-4 sm:columns-2 lg:mt-16 lg:columns-3 lg:gap-5">
          {items.map((k, i) => (
            <li key={k} className="reveal mb-4 break-inside-avoid lg:mb-5" style={{ "--i": i % 3 } as React.CSSProperties}>
              <button
                type="button"
                onClick={() => open(i)}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-img)] text-left"
                aria-label={`Bild vergrößern: ${images[k].alt}`}
              >
                <Img k={k} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw" imgClassName="group-hover:scale-[1.05]" />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <span className="pointer-events-none absolute bottom-4 left-4 right-4 flex translate-y-2 items-end justify-between gap-3 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <span className="text-sm text-text/90">{images[k].alt}</span>
                  <ArrowsOut size={20} className="shrink-0 text-accent-light" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Bildergalerie"
        className="lightbox m-0 h-[100dvh] max-h-none w-screen max-w-none bg-transparent p-0 text-text backdrop:bg-black/90 backdrop:backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && close()}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {current && (
          <div className="pointer-events-none flex h-full flex-col">
            <div className="pointer-events-auto flex items-center justify-between px-4 py-4 sm:px-8">
              <p className="font-display text-sm font-bold tabular-nums tracking-[0.2em] text-accent">
                {String(index! + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
              <button type="button" onClick={close} aria-label="Galerie schließen" className="grid size-12 place-items-center rounded-full border border-border-strong bg-bg/60 transition-colors hover:border-accent">
                <X size={22} />
              </button>
            </div>
            <figure className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-6 sm:px-24">
              <img
                key={current}
                src={imageUrl(current)}
                alt={images[current].alt}
                className="lightbox-img pointer-events-auto max-h-full min-h-0 w-auto max-w-full rounded-[var(--radius-img)] object-contain"
              />
              <figcaption className="mt-4 text-center text-sm text-muted">{images[current].alt}</figcaption>
            </figure>
            <button type="button" onClick={() => go(-1)} aria-label="Vorheriges Bild" className="pointer-events-auto absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-border-strong bg-bg/60 transition-colors hover:border-accent sm:grid sm:left-6">
              <CaretLeft size={22} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Nächstes Bild" className="pointer-events-auto absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-border-strong bg-bg/60 transition-colors hover:border-accent sm:grid sm:right-6">
              <CaretRight size={22} />
            </button>
            <div className="pointer-events-auto flex justify-center gap-3 pb-6 sm:hidden">
              <button type="button" onClick={() => go(-1)} aria-label="Vorheriges Bild" className="grid size-12 place-items-center rounded-full border border-border-strong bg-bg/60">
                <CaretLeft size={22} />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Nächstes Bild" className="grid size-12 place-items-center rounded-full border border-border-strong bg-bg/60">
                <CaretRight size={22} />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
