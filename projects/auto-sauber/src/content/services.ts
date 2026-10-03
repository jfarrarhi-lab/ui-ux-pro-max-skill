import type { ImageKey } from "./images";

/**
 * Leistungen. Ausschließlich Leistungen, die auf der alten Website genannt werden.
 * Formulierungen wurden modernisiert, aber inhaltlich nicht erweitert.
 */
export type Service = {
  id: string;
  title: string;
  kicker: string;
  text: string;
  points: string[];
  image: ImageKey;
  note?: string;
};

export const services: Service[] = [
  {
    id: "aufbereitung",
    title: "KFZ-Aufbereitung",
    kicker: "Innen & außen",
    text: "Von der schnellen Standard-Reinigung bis zur Komplettaufbereitung mit Politur und Keramikversiegelung. Sieben feste Programme zu klaren Preisen.",
    points: ["Innenreinigung", "Ozon-Geruchsbeseitigung", "Lackreinigung & Lackpolitur", "Keramikversiegelung", "Motorwäsche"],
    image: "aufbereitung",
  },
  {
    id: "smart-repair",
    title: "Smart Repair",
    kicker: "Schnellreparatur",
    text: "Kleine Schäden gezielt beheben statt ganze Teile tauschen. Für Lack, Blech und Innenraum.",
    points: ["Lackschäden", "Dellen", "Schäden an Polstern & Innenraum"],
    image: "smartRepair",
  },
  {
    id: "autoglas",
    title: "Autoglas-Service",
    kicker: "Scheibe & Steinschlag",
    text: "Steinschlag reparieren oder die Frontscheibe erneuern. Wir übernehmen Ihre Selbstbeteiligung bis 150 €.",
    // TODO(verify): Bedingungen der Selbstbeteiligungs-Übernahme mit dem Inhaber klären.
    points: ["Scheibenerneuerung", "Steinschlagreparatur", "Selbstbeteiligung bis 150 € übernommen"],
    image: "autoglas",
  },
  {
    id: "reifenservice",
    title: "Reifenservice",
    kicker: "Räder & Felgen",
    text: "Reifenwechsel, Auswuchten und Felgenreparatur. Als Montagepartner von CHECK24 montieren wir auch online gekaufte Reifen.",
    points: ["Reifenservice", "Auswuchten", "Felgenreparatur", "Montagepartner CHECK24"],
    image: "reifen",
  },
  {
    id: "kfz-service",
    title: "KFZ-Service",
    kicker: "Werkstatt",
    text: "Reparatur, Inspektion und Diagnose. Und wir kümmern uns um den TÜV-Termin.",
    points: ["Reparaturservice", "TÜV-Service", "Inspektion", "Diagnose"],
    image: "service",
  },
  {
    id: "verkaufshilfe",
    title: "Verkaufshilfe",
    kicker: "Fahrzeug verkaufen",
    text: "Ihr frisch aufbereitetes Fahrzeug, professionell fotografiert und inseriert. Inklusive Inseratstext und Einschätzung des Marktpreises.",
    points: ["Professionelle Fotos", "Inserat auf mobile.de & AutoScout24", "Inseratstext", "Marktpreis-Einschätzung"],
    image: "verkauf",
    note: "99 €",
  },
];

/**
 * Aufbereitungsprogramme mit Preisen laut alter Website (/kfz-aufbereitung).
 * TODO(verify): Preise vor dem Livegang bestätigen.
 */
export type Program = {
  no: number;
  title: string;
  detail?: string;
  price: string;
  alt?: { label: string; price: string };
  featured?: boolean;
};

export const programs: Program[] = [
  { no: 1, title: "Standard-Reinigung", detail: "Innenraum saugen, Scheiben innen und außen reinigen. Ca. 25 Minuten", price: "36 €" },
  { no: 2, title: "Standard-Reinigung + Schaumpolitur", price: "94 €" },
  { no: 3, title: "Komplett-Reinigung", price: "189 €", featured: true },
  { no: 4, title: "Lackglanz", price: "160 €", alt: { label: "mit Lackreinigung & Lackglanz", price: "210 €" } },
  { no: 5, title: "Motorwäsche + Versiegelung", price: "60 €" },
  { no: 6, title: "Komplett-Reinigung + Politur", price: "349 €" },
  { no: 7, title: "Lackglanz + Keramikversiegelung", price: "699 €" },
];
