/**
 * Zentrale Unternehmensdaten.
 *
 * QUELLEN: Die alte Website (yalcin-handel.de) war aus der Build-Umgebung nicht
 * direkt abrufbar. Alle Angaben stammen aus Suchmaschinen-Auszügen der alten
 * Website (Startseite, /kfz-aufbereitung, /kfz-service, /autoglas-service,
 * /reifenservice, /verkaufshilfestellung, /impressum) sowie aus öffentlichen
 * Branchenverzeichnissen (Das Örtliche, 11880, Cylex).
 *
 * Alles mit `TODO(verify)` vor dem Livegang mit dem Inhaber abgleichen.
 * Alles mit `TODO(placeholder)` ist ein bewusst markierter Platzhalter.
 */

export const site = {
  name: "Auto Sauber",
  tagline: "KFZ-Aufbereitung · Smart Repair · Autopflege",
  owner: "Ibrahim Yalcin", // Impressum der alten Website
  url: "https://yalcin-handel.de/", // TODO(verify): finale Domain der neuen Website

  address: {
    street: "Conradistraße 6",
    zip: "97072",
    city: "Würzburg",
    district: "Sanderau",
    country: "DE",
  },

  phone: { display: "0931 99 168 143", href: "tel:+4993199168143" },
  email: "auto-sauber@hotmail.com",
  // Mobilnummer laut Branchenverzeichnis: 0171 3632191. TODO(verify): soll sie öffentlich erscheinen?

  /**
   * Öffnungszeiten laut Branchenverzeichnissen (nicht von der alten Website selbst).
   * TODO(verify): aktuelle Zeiten bestätigen.
   * Wochentag-Index wie Date#getDay(): 0 = Sonntag.
   */
  hours: [
    { label: "Montag – Freitag", days: [1, 2, 3, 4, 5], open: "08:00", close: "18:00" },
    { label: "Samstag", days: [6], open: "08:00", close: "14:00" },
    { label: "Sonntag", days: [0], open: null, close: null },
  ] as { label: string; days: number[]; open: string | null; close: string | null }[],

  social: {
    // Öffentliche Facebook-Seite "Auto-Sauber" (über die Suche gefunden).
    facebook: "https://www.facebook.com/p/Auto-Sauber-100064327682292/",
    // TODO(placeholder): Instagram-Profil wurde nicht gefunden. Echten Handle eintragen.
    instagram: "https://www.instagram.com/",
    // TODO(verify): Läuft WhatsApp über die Mobilnummer 0171 3632191? Sonst anpassen oder entfernen.
    whatsapp: "https://wa.me/491713632191",
  },

  legal: {
    // TODO(placeholder): bis zur Übernahme der Rechtstexte auf die bestehenden Seiten verlinkt.
    impressum: "https://yalcin-handel.de/impressum/",
    datenschutz: "https://yalcin-handel.de/datenschutz/",
  },
} as const;

export const mapsRoute = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${site.name}, ${site.address.street}, ${site.address.zip} ${site.address.city}`,
)}`;

export const mapsPlace = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.name} ${site.address.street} ${site.address.zip} ${site.address.city}`,
)}`;

export const mailtoAppointment = `mailto:${site.email}?subject=${encodeURIComponent(
  "Terminanfrage über die Website",
)}&body=${encodeURIComponent(
  "Hallo Auto Sauber Team,\n\nich möchte gerne einen Termin anfragen.\n\nFahrzeug (Marke/Modell):\nGewünschte Leistung:\nWunschtermin:\nTelefon für Rückfragen:\n\nViele Grüße\n",
)}`;

export const nav = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#preise", label: "Preise" },
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#galerie", label: "Galerie" },
  { href: "#kontakt", label: "Kontakt" },
];

/** Kurzform der Öffnungszeiten, z. B. für die Hero-Leiste. */
export const hoursShort = "Mo–Fr 8–18 · Sa 8–14 Uhr";
