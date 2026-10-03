import { ArrowRight, ArrowUpRight, Clock, EnvelopeSimple, MapPin, NavigationArrow, Phone, Star, WhatsappLogo } from "@phosphor-icons/react";
import { SocialLinks } from "./SocialLinks";
import { mailtoAppointment, mapsPlace, mapsRoute, site } from "../content/site";
import { useOpenStatus } from "../hooks/useOpenStatus";

export function Contact() {
  const status = useOpenStatus();

  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="section-y bg-bg">
      <div className="container-x">
        <p className="eyebrow reveal">Kontakt</p>
        <h2 id="kontakt-title" className="h-section reveal mt-5 max-w-3xl" style={{ "--i": 1 } as React.CSSProperties}>
          Kommen Sie vorbei. <span className="text-muted">Oder rufen Sie an.</span>
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Kontaktdaten */}
          <div className="reveal rounded-[var(--radius-card)] border border-border bg-surface p-6 sm:p-10 lg:col-span-7">
            <dl className="grid gap-8 sm:grid-cols-2">
              <div>
                <dt className="flex items-center gap-2.5 text-sm font-semibold text-muted">
                  <MapPin size={20} className="text-accent" /> Adresse
                </dt>
                <dd className="mt-2.5 font-display text-xl font-bold leading-snug">
                  <address className="not-italic">
                    {site.name}
                    <br />
                    {site.address.street}
                    <br />
                    {site.address.zip} {site.address.city}
                  </address>
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2.5 text-sm font-semibold text-muted">
                  <Phone size={20} className="text-accent" /> Telefon
                </dt>
                <dd className="mt-2.5">
                  <a href={site.phone.href} className="link-u font-display text-xl font-bold hover:text-accent-light">
                    {site.phone.display}
                  </a>
                </dd>
                <dt className="mt-6 flex items-center gap-2.5 text-sm font-semibold text-muted">
                  <EnvelopeSimple size={20} className="text-accent" /> E-Mail
                </dt>
                <dd className="mt-2.5">
                  <a href={`mailto:${site.email}`} className="link-u break-all font-display text-lg font-bold hover:text-accent-light">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-10 border-t border-border pt-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="flex items-center gap-2.5 text-sm font-semibold text-muted">
                  <Clock size={20} className="text-accent" /> Öffnungszeiten
                </h3>
                <p className="flex items-center gap-2 text-sm font-semibold" aria-live="polite">
                  <span className={`size-2 shrink-0 rounded-full ${status.open ? "bg-accent shadow-[0_0_0_4px_rgb(200_164_93/0.2)]" : "bg-subtle"}`} aria-hidden="true" />
                  {status.label}
                </p>
              </div>
              <table className="mt-4 w-full text-[0.95rem]">
                <caption className="sr-only">Öffnungszeiten</caption>
                <tbody>
                  {site.hours.map((h) => {
                    const isToday = h.days.includes(status.today);
                    return (
                      <tr key={h.label} className={`border-b border-border/70 last:border-0 ${isToday ? "text-text" : "text-muted"}`}>
                        <th scope="row" className="py-3 text-left font-medium">
                          {h.label}
                          {isToday && <span className="ml-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent">Heute</span>}
                        </th>
                        <td className="py-3 text-right tabular-nums">{h.open ? `${h.open} – ${h.close} Uhr` : "Geschlossen"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <a href={site.phone.href} className="btn btn-primary">
                <Phone size={18} weight="bold" /> Jetzt anrufen
              </a>
              <a href={mapsRoute} target="_blank" rel="noopener noreferrer" className="btn btn-outline-gold">
                <NavigationArrow size={18} weight="bold" /> Route planen
              </a>
              <a href={mailtoAppointment} className="btn btn-secondary">
                Termin anfragen <ArrowRight size={18} weight="bold" className="arrow" />
              </a>
              <a href={site.social.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <WhatsappLogo size={18} /> WhatsApp
              </a>
            </div>
          </div>

          {/* Karte (DSGVO-freundlich: keine eingebettete Google-Karte, Link öffnet Maps) */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <a
              href={mapsPlace}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal group relative block min-h-[300px] flex-1 overflow-hidden rounded-[var(--radius-card)] border border-border bg-[#0e0e0e]"
              style={{ "--i": 1 } as React.CSSProperties}
              aria-label="Standort in Google Maps öffnen"
            >
              <MapArt />
              <span className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 border-t border-border bg-bg/80 px-5 py-4 backdrop-blur">
                <span>
                  <span className="block font-display font-bold">{site.address.district}, {site.address.city}</span>
                  <span className="text-sm text-muted">In Google Maps öffnen</span>
                </span>
                <ArrowUpRight size={22} className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>

            <div className="reveal grid gap-6 sm:grid-cols-2" style={{ "--i": 2 } as React.CSSProperties}>
              <a
                href={mapsPlace}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-start justify-between gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-5 transition-colors hover:border-accent/60"
              >
                <span className="flex text-accent" aria-hidden="true">
                  <Star size={18} weight="fill" />
                  <Star size={18} weight="fill" />
                  <Star size={18} weight="fill" />
                </span>
                <span className="text-sm leading-snug">
                  <span className="block font-semibold">Google-Bewertungen</span>
                  <span className="text-muted group-hover:text-accent-light">Ansehen & bewerten</span>
                </span>
              </a>
              <div className="rounded-[var(--radius-card)] border border-border bg-surface p-5">
                <p className="mb-3 text-sm font-semibold">Folgen Sie uns</p>
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Stilisierte, nicht maßstabsgetreue Kartengrafik mit Standort-Pin. */
function MapArt() {
  return (
    <svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.04]" aria-hidden="true">
      <rect width="400" height="320" fill="#0e0e0e" />
      <path d="M-10 40 C 60 70, 70 160, 40 220 S 30 330, 60 360" fill="none" stroke="#1d2226" strokeWidth="26" />
      <g stroke="#232323" strokeWidth="2" fill="none">
        <path d="M80 -10 L 120 340" /><path d="M150 -10 L 175 340" /><path d="M230 -10 L 220 340" />
        <path d="M300 -10 L 330 340" /><path d="M60 60 L 420 40" /><path d="M70 130 L 420 120" />
        <path d="M60 200 L 420 205" /><path d="M80 270 L 420 285" />
      </g>
      <g stroke="#2e2e2e" strokeWidth="5" fill="none">
        <path d="M100 100 C 180 120, 260 110, 420 150" /><path d="M190 -10 C 200 100, 210 200, 260 340" />
      </g>
      <circle cx="212" cy="140" r="46" fill="#C8A45D" opacity="0.08" />
      <circle cx="212" cy="140" r="22" fill="#C8A45D" opacity="0.12" />
      <path d="M212 112 c -11 0 -19 8.5 -19 19 c 0 14 19 31 19 31 s 19 -17 19 -31 c 0 -10.5 -8 -19 -19 -19 z" fill="#C8A45D" />
      <circle cx="212" cy="131" r="6.5" fill="#0a0a0a" />
    </svg>
  );
}
