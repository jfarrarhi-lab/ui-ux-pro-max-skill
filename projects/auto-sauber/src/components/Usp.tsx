import { MapPin, Receipt, ShieldCheck, Stack } from "@phosphor-icons/react";

/** Nur belegbare Aussagen (siehe content/site.ts und content/services.ts). */
const items = [
  { Icon: Stack, title: "Alles unter einem Dach", text: "Aufbereitung, Smart Repair, Autoglas, Reifen und Werkstatt-Service an einem Standort." },
  { Icon: Receipt, title: "Feste Programmpreise", text: "Sieben Aufbereitungsprogramme von 36 € bis 699 €. Sie wissen vorher, was es kostet." },
  { Icon: ShieldCheck, title: "Selbstbeteiligung übernommen", text: "Beim Autoglas-Service übernehmen wir Ihre Selbstbeteiligung bis 150 €." },
  { Icon: MapPin, title: "Mitten in Würzburg", text: "In der Conradistraße 6 in der Sanderau. Gut erreichbar, persönlich vor Ort." },
];

export function Usp() {
  return (
    <section aria-label="Warum Auto Sauber" className="relative border-b border-border bg-bg">
      <div className="container-x grid grid-cols-1 gap-x-10 gap-y-10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        {items.map(({ Icon, title, text }, i) => (
          <div key={title} className="reveal group" style={{ "--i": i } as React.CSSProperties}>
            <div className="flex items-center gap-4">
              <Icon size={30} weight="light" className="text-accent transition-transform duration-500 group-hover:-translate-y-0.5" />
              <span className="h-px flex-1 bg-gradient-to-r from-border-strong to-transparent" aria-hidden="true" />
            </div>
            <h2 className="mt-5 font-display text-lg font-bold tracking-tight">{title}</h2>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
