import { useEffect, useRef, useState } from "react";
import { ArrowRight, List, Phone, X } from "@phosphor-icons/react";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { mailtoAppointment, nav, site } from "../content/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Transparent über dem Hero, danach dunkel mit Blur + Linie
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Aktiven Abschnitt markieren
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Mobile-Menü: Scroll-Lock, ESC, Fokus ins Panel und zurück
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a, button");
        const a = f[0];
        const z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        solid ? "border-b border-border/80 bg-bg/80 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent">
        Zum Inhalt springen
      </a>
      <div className="container-x flex h-[var(--nav-h)] items-center justify-between gap-6">
        <a href="#top" className="text-[1.15rem] sm:text-[1.3rem]" aria-label="Auto Sauber – zur Startseite">
          <Logo />
        </a>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.href ? "true" : undefined}
                  className={`link-u text-[0.92rem] font-medium transition-colors ${active === item.href ? "text-accent-light" : "text-text/85 hover:text-text"}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={site.phone.href} className="hidden items-center gap-2 px-3 text-sm font-semibold text-text/85 transition-colors hover:text-accent-light xl:inline-flex">
            <Phone size={18} className="text-accent" /> {site.phone.display}
          </a>
          <a href={mailtoAppointment} className="btn btn-primary hidden !min-h-11 !py-2.5 sm:inline-flex">
            Termin anfragen <ArrowRight size={18} weight="bold" className="arrow" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            className="grid size-12 place-items-center rounded-[var(--radius-btn)] border border-border-strong text-text transition-colors hover:border-accent lg:hidden"
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </div>

    </header>

      {/* Mobile-Menü: außerhalb des Headers, weil dessen backdrop-filter sonst den fixed-Bezugsrahmen bildet */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[var(--nav-h)] z-40 overflow-y-auto bg-bg lg:hidden"
      >
        <nav aria-label="Mobile Navigation" className="container-x flex min-h-full flex-col pb-10 pt-6">
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li key={item.href} className="menu-item border-b border-border" style={{ "--i": i } as React.CSSProperties}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-5 font-display text-[1.75rem] font-bold tracking-tight text-text"
                >
                  {item.label}
                  <span className="font-display text-sm font-semibold text-accent">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="menu-item mt-8 grid gap-3" style={{ "--i": nav.length } as React.CSSProperties}>
            <a href={mailtoAppointment} className="btn btn-primary w-full" onClick={() => setOpen(false)}>
              Termin anfragen <ArrowRight size={18} weight="bold" className="arrow" />
            </a>
            <a href={site.phone.href} className="btn btn-secondary w-full">
              <Phone size={18} /> {site.phone.display}
            </a>
          </div>
          <div className="menu-item mt-auto pt-10" style={{ "--i": nav.length + 1 } as React.CSSProperties}>
            <p className="mb-3 text-sm text-muted">Folgen Sie uns</p>
            <SocialLinks />
          </div>
        </nav>
      </div>
    </>
  );
}
