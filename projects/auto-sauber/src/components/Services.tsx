import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check } from "@phosphor-icons/react";
import { Img } from "./Img";
import { GoldRule } from "./GoldRule";
import { services } from "../content/services";
import { mailtoAppointment } from "../content/site";

const pad = (n: number) => String(n).padStart(2, "0");

export function Services() {
  const [lead, ...rest] = services;
  const [current, setCurrent] = useState(0);

  return (
    <section id="leistungen" aria-labelledby="leistungen-title" className="section-y relative bg-bg">
      <div className="container-x">
        {/* Kopf */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow reveal">Unsere Leistungen</p>
            <h2 id="leistungen-title" className="h-section reveal mt-5" style={{ "--i": 1 } as React.CSSProperties}>
              Alles für ein rundum <span className="text-accent">sauberes Fahrzeug.</span>
            </h2>
          </div>
          <p className="reveal max-w-md text-lg leading-relaxed text-muted lg:col-span-5 lg:justify-self-end" style={{ "--i": 2 } as React.CSSProperties}>
            Pflege, kleine Reparaturen und Service aus einer Hand. Ein Termin, ein Ansprechpartner.
          </p>
        </div>

        <GoldRule className="reveal mt-14" />

        {/* 01: Hauptleistung als große Editorial-Fläche */}
        <article className="group mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <div className="reveal-img lg:col-span-7">
            <Img k={lead.image} sizes="(min-width: 1024px) 58vw, 100vw" imgClassName="group-hover:scale-[1.04]" />
          </div>
          <div className="flex flex-col justify-center lg:col-span-5">
            <div className="reveal flex items-baseline gap-4">
              <span className="font-display text-5xl font-extrabold text-accent tabular-nums lg:text-6xl">01</span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{lead.kicker}</span>
            </div>
            <h3 className="reveal mt-4 font-display text-3xl font-bold tracking-tight lg:text-4xl" style={{ "--i": 1 } as React.CSSProperties}>
              {lead.title}
            </h3>
            <p className="reveal mt-4 text-lg leading-relaxed text-muted" style={{ "--i": 2 } as React.CSSProperties}>{lead.text}</p>
            <ul className="reveal mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2" style={{ "--i": 3 } as React.CSSProperties}>
              {lead.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[0.95rem]">
                  <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-accent" /> {p}
                </li>
              ))}
            </ul>
            <div className="reveal mt-8 flex flex-wrap gap-3" style={{ "--i": 4 } as React.CSSProperties}>
              <a href="#preise" className="btn btn-outline-gold">
                Programme & Preise <ArrowRight size={18} weight="bold" className="arrow" />
              </a>
            </div>
          </div>
        </article>

        {/* 02–06: Index-Liste mit wechselndem Vorschaubild (Desktop) */}
        <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ol className="border-t border-border">
              {rest.map((s, i) => {
                const isCurrent = current === i;
                return (
                  <li key={s.id} className="reveal border-b border-border" style={{ "--i": i } as React.CSSProperties}>
                    <article
                      id={s.id}
                      onMouseEnter={() => setCurrent(i)}
                      onFocus={() => setCurrent(i)}
                      className="group relative grid grid-cols-[auto_1fr] gap-x-5 py-8 sm:gap-x-8 lg:py-9"
                    >
                      <span
                        className={`font-display text-sm font-bold tabular-nums transition-colors duration-300 sm:text-base ${
                          isCurrent ? "text-accent" : "text-subtle"
                        }`}
                      >
                        {pad(i + 2)}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <h3
                            className={`h-card transition-[color,transform] duration-500 ease-[var(--ease-out)] ${
                              isCurrent ? "text-text lg:translate-x-1.5" : "text-text/80"
                            }`}
                          >
                            {s.title}
                          </h3>
                          <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                            {s.kicker}
                            {s.note && (
                              <span className="rounded-[2px] border border-accent/60 px-2 py-0.5 font-display text-[0.8rem] tracking-normal text-accent-light">
                                {s.note}
                              </span>
                            )}
                          </span>
                        </div>

                        {/* Mobile/Tablet: Bild direkt in der Zeile */}
                        <Img k={s.image} ratio={16 / 9} sizes="100vw" className="mt-5 lg:hidden" />

                        <p className="mt-3 max-w-xl leading-relaxed text-muted">{s.text}</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {s.points.map((p) => (
                            <li key={p} className="rounded-[2px] border border-border bg-card px-2.5 py-1 text-[0.82rem] text-text/85">
                              {p}
                            </li>
                          ))}
                        </ul>
                        <a
                          href={mailtoAppointment}
                          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-light"
                        >
                          <span className="link-u">Anfragen</span>
                          <ArrowUpRight size={16} weight="bold" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          <span className="sr-only">: {s.title}</span>
                        </a>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Sticky-Vorschau (nur Desktop) */}
          <div className="hidden lg:col-span-5 lg:block" aria-hidden="true">
            <div className="sticky top-[calc(var(--nav-h)+2rem)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-img)] bg-card">
                {rest.map((s, i) => (
                  <div
                    key={s.id}
                    className="absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-out)]"
                    style={{ opacity: current === i ? 1 : 0, transform: current === i ? "scale(1)" : "scale(1.04)" }}
                  >
                    <Img k={s.image} ratio="auto" sizes="40vw" className="h-full" />
                  </div>
                ))}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 to-transparent p-6 pt-24">
                  <p className="font-display text-sm font-bold tracking-[0.2em] text-accent uppercase">{pad(current + 2)} / {pad(services.length)}</p>
                  <p className="mt-1 font-display text-2xl font-bold">{rest[current].title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
