import { ArrowUp } from "@phosphor-icons/react";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { GoldRule } from "./GoldRule";
import { services } from "../content/services";
import { hoursShort, nav, site } from "../content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface pb-24 lg:pb-0">
      <div className="container-x pt-16 lg:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <a href="#top" aria-label="Auto Sauber – nach oben" className="inline-block text-[1.6rem]">
              <Logo withTagline />
            </a>
            <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-muted">
              Fahrzeugaufbereitung, Smart Repair und Autopflege in Würzburg. Dazu Autoglas, Reifen und KFZ-Service.
            </p>
            <SocialLinks className="mt-7" />
          </div>

          <nav aria-label="Footer: Seite" className="lg:col-span-2 lg:col-start-5">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-accent">Seite</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {nav.map((n) => (
                <li key={n.href}><a href={n.href} className="link-u text-muted hover:text-text">{n.label}</a></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer: Leistungen" className="lg:col-span-3">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-accent">Leistungen</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {services.map((s) => (
                <li key={s.id}><a href={s.id === "aufbereitung" ? "#leistungen" : `#${s.id}`} className="link-u text-muted hover:text-text">{s.title}</a></li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-accent">Kontakt</h2>
            <address className="mt-5 space-y-3 text-[0.95rem] not-italic text-muted">
              <p>{site.address.street}<br />{site.address.zip} {site.address.city}</p>
              <p><a href={site.phone.href} className="link-u hover:text-text">{site.phone.display}</a></p>
              <p><a href={`mailto:${site.email}`} className="link-u break-all hover:text-text">{site.email}</a></p>
              <p>{hoursShort}</p>
            </address>
          </div>
        </div>

        <GoldRule className="mt-16" />

        <div className="flex flex-col-reverse gap-5 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-6">
            <a href={site.legal.impressum} className="link-u hover:text-text">Impressum</a>
            <a href={site.legal.datenschutz} className="link-u hover:text-text">Datenschutz</a>
            <a href="#top" className="grid size-11 place-items-center rounded-full border border-border-strong text-text transition-colors hover:border-accent hover:text-accent" aria-label="Nach oben">
              <ArrowUp size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
