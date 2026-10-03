import { ArrowRight, Phone } from "@phosphor-icons/react";
import { Img } from "./Img";
import { programs } from "../content/services";
import { mailtoAppointment, site } from "../content/site";

export function Programs() {
  return (
    <section id="preise" aria-labelledby="preise-title" className="section-y relative overflow-hidden border-y border-border bg-surface">
      <div aria-hidden="true" className="hex-texture pointer-events-none absolute -right-20 top-0 h-[60%] w-[45%] opacity-[0.05] [mask-image:radial-gradient(closest-side,black,transparent)]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Linke Spalte: Intro + Bilder, sticky */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2.5rem)]">
            <p className="eyebrow reveal">KFZ-Aufbereitung</p>
            <h2 id="preise-title" className="h-section reveal mt-5" style={{ "--i": 1 } as React.CSSProperties}>
              Sieben Programme.
              <br />
              <span className="text-muted">Feste Preise.</span>
            </h2>
            <p className="reveal mt-6 max-w-md text-lg leading-relaxed text-muted" style={{ "--i": 2 } as React.CSSProperties}>
              Von der schnellen Innen- und Scheibenreinigung bis zum Lackglanz mit Keramikversiegelung.
              Wählen Sie das Programm, das zu Ihrem Fahrzeug passt.
            </p>
            <div className="relative mt-10 hidden sm:block">
              <div className="reveal-img w-[78%]">
                <Img k="politur" sizes="(min-width: 1024px) 32vw, 70vw" />
              </div>
              <div className="reveal-img absolute -bottom-10 right-0 w-[40%] border-4 border-surface" style={{ "--i": 2 } as React.CSSProperties}>
                <Img k="innenraum" sizes="(min-width: 1024px) 16vw, 35vw" />
              </div>
            </div>
          </div>
        </div>

        {/* Rechte Spalte: Preisliste */}
        <div className="lg:col-span-7">
          <ol className="divide-y divide-border border-y border-border">
            {programs.map((p, i) => (
              <li
                key={p.no}
                className="reveal group relative grid grid-cols-[3.25rem_1fr_auto] items-baseline gap-x-4 py-6 transition-colors duration-300 hover:bg-card/60 sm:grid-cols-[4.5rem_1fr_auto] sm:px-4 sm:py-7"
                style={{ "--i": i % 4 } as React.CSSProperties}
              >
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-accent transition-transform duration-500 group-hover:scale-y-100" />
                <span className="font-display text-sm font-bold tabular-nums text-subtle transition-colors group-hover:text-accent">
                  P{String(p.no).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight sm:text-xl">
                    <span className="sr-only">Programm {p.no}: </span>
                    {p.title}
                  </h3>
                  {p.detail && <p className="mt-1.5 text-[0.92rem] leading-relaxed text-muted">{p.detail}</p>}
                  {p.alt && (
                    <p className="mt-1.5 text-[0.92rem] text-muted">
                      oder {p.alt.label}: <span className="font-semibold text-text">{p.alt.price}</span>
                    </p>
                  )}
                </div>
                <p className="font-display text-xl font-extrabold tabular-nums text-accent-light sm:text-2xl">
                  {p.alt && <span className="mr-1 text-sm font-semibold text-muted">ab</span>}
                  {p.price}
                </p>
              </li>
            ))}
          </ol>
          <p className="reveal mt-5 text-sm text-subtle">
            Preise für PKW. Zum genauen Umfang beraten wir Sie gern persönlich.
          </p>
          <div className="reveal mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={mailtoAppointment} className="btn btn-primary">
              Programm anfragen <ArrowRight size={18} weight="bold" className="arrow" />
            </a>
            <a href={site.phone.href} className="btn btn-secondary">
              <Phone size={18} /> {site.phone.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
