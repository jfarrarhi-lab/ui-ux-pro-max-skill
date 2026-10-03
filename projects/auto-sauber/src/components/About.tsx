import { Img } from "./Img";
import { GoldRule } from "./GoldRule";

/**
 * Über uns. Bewusst ohne erfundene Zahlen, Jahre oder Superlative.
 * TODO(verify): Öffentliche Register nennen auch eine "Auto Sauber Yalcin & Oehrlein OHG".
 * Rechtsform und Inhaberangaben vor dem Livegang klären (Impressum!).
 */
const facts = [
  { k: "Pflege", v: "Innen- und Außenaufbereitung, Politur, Versiegelung" },
  { k: "Reparatur", v: "Smart Repair, Autoglas, Reifen und Felgen" },
  { k: "Service", v: "Inspektion, Diagnose, TÜV-Service" },
  { k: "Verkauf", v: "Fotos und Inserat für Ihr aufbereitetes Fahrzeug" },
];

export function About() {
  return (
    <section id="ueber-uns" aria-labelledby="about-title" className="section-y relative bg-bg">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-6">
          <div className="reveal-img">
            <Img k="werkstatt" sizes="(min-width: 1024px) 46vw, 100vw" />
          </div>
          <div className="reveal-img absolute -bottom-8 -right-2 w-[38%] border-4 border-bg sm:-right-6 lg:-bottom-12" style={{ "--i": 2 } as React.CSSProperties}>
            <Img k="tropfen" sizes="(min-width: 1024px) 18vw, 38vw" />
          </div>
          <span aria-hidden="true" className="absolute -left-3 -top-3 hidden h-24 w-24 border-l border-t border-accent/60 sm:block" />
        </div>

        <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
          <p className="eyebrow reveal">Über Auto Sauber</p>
          <h2 id="about-title" className="h-section reveal mt-5" style={{ "--i": 1 } as React.CSSProperties}>
            Ein Ort für alles, was Ihr Auto braucht.
          </h2>
          <div className="reveal mt-6 space-y-4 text-lg leading-relaxed text-muted" style={{ "--i": 2 } as React.CSSProperties}>
            <p>
              Auto Sauber ist Ihr Ansprechpartner für Fahrzeugpflege in der Würzburger Sanderau. Wir verbinden
              Aufbereitung und Autopflege mit Smart Repair, Autoglas, Reifenservice und klassischem KFZ-Service.
            </p>
            <p>
              Für Sie heißt das: weniger Wege und ein Ansprechpartner, der Ihr Fahrzeug kennt. Und wenn Sie
              verkaufen möchten, bereiten wir es auf, fotografieren es und stellen es online.
            </p>
          </div>

          <GoldRule className="reveal mt-10" />

          <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {facts.map((f, i) => (
              <div key={f.k} className="reveal" style={{ "--i": i } as React.CSSProperties}>
                <dt className="font-display text-sm font-bold uppercase tracking-[0.18em] text-accent">{f.k}</dt>
                <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-text/85">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
