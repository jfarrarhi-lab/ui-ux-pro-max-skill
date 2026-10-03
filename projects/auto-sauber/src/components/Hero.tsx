import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight, Clock, MapPin, Phone } from "@phosphor-icons/react";
import { Img } from "./Img";
import { SocialLinks } from "./SocialLinks";
import { hoursShort, mailtoAppointment, mapsRoute, site } from "../content/site";
import { useOpenStatus } from "../hooks/useOpenStatus";

export function Hero() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const status = useOpenStatus();

  // Dezente Parallaxe: Bild bewegt sich langsamer als der Inhalt
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight);
        if (mediaRef.current) mediaRef.current.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* Bild + Overlays */}
      <div ref={mediaRef} className="absolute inset-0 -z-10 will-change-transform">
        <Img
          k="hero"
          priority
          ratio="auto"
          sizes="100vw"
          className="!absolute inset-0 !rounded-none"
          imgClassName="ken-burns object-[72%_50%] md:object-[62%_50%]"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(10_10_10/0.92)_0%,rgb(10_10_10/0.7)_38%,rgb(10_10_10/0.1)_70%,rgb(10_10_10/0.25)_100%)] max-md:bg-[linear-gradient(180deg,rgb(10_10_10/0.55)_0%,rgb(10_10_10/0.35)_35%,rgb(10_10_10/0.92)_78%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_60%_40%,transparent_55%,rgb(0_0_0/0.65)_100%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-bg" />

      <div className="container-x flex flex-1 flex-col justify-end pb-10 pt-[calc(var(--nav-h)+3rem)] md:justify-center md:pb-24">
        <div className="max-w-[44rem]">
          <p className="eyebrow hero-in flex items-center gap-3" style={{ "--i": 0 } as React.CSSProperties}>
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Fahrzeugpflege in Würzburg
          </p>
          <h1 id="hero-title" className="h-display hero-in mt-6" style={{ "--i": 1 } as React.CSSProperties}>
            Ihr Auto.
            <br />
            <span className="text-accent">Wieder wie neu.</span>
          </h1>
          <p className="hero-in mt-6 max-w-[34rem] text-lg leading-relaxed text-text/80 md:text-xl" style={{ "--i": 2 } as React.CSSProperties}>
            KFZ-Aufbereitung, Smart Repair und Autopflege in der Sanderau. Dazu Autoglas, Reifen und
            Werkstatt-Service an einem Ort.
          </p>
          <div className="hero-in mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--i": 3 } as React.CSSProperties}>
            <a href={mailtoAppointment} className="btn btn-primary">
              Termin vereinbaren <ArrowRight size={18} weight="bold" className="arrow" />
            </a>
            <a href="#leistungen" className="btn btn-secondary">
              Leistungen entdecken <ArrowDown size={18} className="arrow" />
            </a>
          </div>
        </div>
      </div>

      {/* Info-Leiste */}
      <div className="hero-in relative border-t border-white/10 bg-bg/55 backdrop-blur-md" style={{ "--i": 5 } as React.CSSProperties}>
        <div className="container-x grid grid-cols-[auto_1fr] divide-x divide-white/10 sm:grid-cols-3">
          <a href={mapsRoute} target="_blank" rel="noopener noreferrer" className="group hidden items-center gap-4 py-4 sm:flex sm:py-5 sm:pr-6">
            <MapPin size={22} className="shrink-0 text-accent" />
            <span className="text-sm leading-snug">
              <span className="block font-semibold text-text group-hover:text-accent-light">{site.address.street}</span>
              <span className="text-muted">{site.address.zip} {site.address.city}</span>
            </span>
          </a>
          <a href={site.phone.href} className="group flex items-center gap-3 py-4 pr-4 sm:gap-4 sm:px-6 sm:py-5">
            <Phone size={22} className="shrink-0 text-accent" />
            <span className="text-sm leading-snug">
              <span className="block font-semibold text-text group-hover:text-accent-light">{site.phone.display}</span>
              <span className="text-muted">Direkt anrufen</span>
            </span>
          </a>
          <div className="flex min-w-0 items-center gap-3 py-4 pl-4 sm:gap-4 sm:px-6 sm:py-5">
            <Clock size={22} className="shrink-0 text-accent" />
            <span className="text-sm leading-snug">
              <span className="flex items-center gap-2 font-semibold text-text">
                <span className={`size-2 shrink-0 rounded-full ${status.open ? "bg-accent shadow-[0_0_0_4px_rgb(200_164_93/0.2)]" : "bg-subtle"}`} aria-hidden="true" />
                {status.label}
              </span>
              <span className="text-muted max-sm:hidden">{hoursShort}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Social-Leiste (Desktop) */}
      <div className="hero-in absolute bottom-32 right-[var(--gutter)] hidden flex-col items-center gap-4 xl:flex" style={{ "--i": 6 } as React.CSSProperties}>
        <SocialLinks vertical />
        <span className="h-16 w-px bg-gradient-to-b from-accent to-transparent" aria-hidden="true" />
      </div>
    </section>
  );
}
