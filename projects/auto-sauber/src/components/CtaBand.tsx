import { ArrowRight, Phone } from "@phosphor-icons/react";
import { Img } from "./Img";
import { mailtoAppointment, site } from "../content/site";

export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden border-y border-border bg-bg">
      <div className="absolute inset-y-0 left-0 -z-10 w-full md:w-[58%]">
        <Img k="verkauf" ratio="auto" sizes="60vw" className="h-full !rounded-none" imgClassName="object-[30%_50%]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(10_10_10/0.35),rgb(10_10_10/0.85)_70%,#0a0a0a)] max-md:bg-bg/80" />
      </div>
      <div aria-hidden="true" className="hex-texture absolute inset-y-0 right-0 -z-10 w-1/2 opacity-[0.045]" />

      <div className="container-x grid py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-6 md:col-start-7">
          <p className="eyebrow reveal">Termin vereinbaren</p>
          <h2 id="cta-title" className="h-section reveal mt-5" style={{ "--i": 1 } as React.CSSProperties}>
            Professionell. Zuverlässig. <span className="text-accent">Lokal.</span>
          </h2>
          <p className="reveal mt-5 max-w-md text-lg leading-relaxed text-muted" style={{ "--i": 2 } as React.CSSProperties}>
            Sagen Sie uns kurz, worum es geht. Wir melden uns mit einem Terminvorschlag.
          </p>
          <div className="reveal mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--i": 3 } as React.CSSProperties}>
            <a href={mailtoAppointment} className="btn btn-primary">
              Termin anfragen <ArrowRight size={18} weight="bold" className="arrow" />
            </a>
            <a href={site.phone.href} className="btn btn-secondary">
              <Phone size={18} /> Jetzt anrufen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
