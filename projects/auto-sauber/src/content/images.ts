/**
 * Bild-Manifest. Jedes Bild hat einen stabilen Schlüssel, aus dem die lokalen
 * Dateinamen entstehen (/images/<key>-<breite>.avif|webp).
 *
 * `remote` = Originalgenerierung (Higgsfield, Modell z_image). Diese Bilder
 * sind KI-generierte Stimmungsbilder, KEINE Fotos echter Kundenfahrzeuge.
 * TODO(placeholder): nach und nach durch eigene Fotos ersetzen.
 *
 * `npm run images` lädt alle Remote-Bilder, erzeugt AVIF/WebP in mehreren
 * Breiten unter public/images/ und trägt sie in images.local.json ein. Danach
 * liefert <Img> automatisch die optimierten lokalen Varianten aus.
 */

const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3KBLnklDRf2Svwgcz2l1AFD8EyV/";

export const images = {
  hero: {
    remote: `${CDN}hf_20261003_113259_5cd6345e-1d40-4f16-b40a-973723c59244.png`,
    alt: "Schwarze Limousine im abgedunkelten Studio, goldenes Streiflicht auf der Karosserie",
    ratio: 16 / 9,
  },
  aufbereitung: {
    remote: `${CDN}hf_20261003_113601_cdecdfac-3679-4244-a6d0-8f386e87f200.png`,
    alt: "Schaum läuft bei der Handwäsche über schwarzen Lack",
    ratio: 4 / 3,
  },
  innenraum: {
    remote: `${CDN}hf_20261003_113636_f1620ce3-3680-4ed1-b297-77e95e69608f.png`,
    alt: "Lederpolster werden mit einem Mikrofasertuch gereinigt",
    ratio: 3 / 4,
  },
  politur: {
    remote: `${CDN}hf_20261003_113636_c8b0e184-1384-4bb5-bf9a-cee3bbb40799.png`,
    alt: "Poliermaschine auf schwarzer Motorhaube, Lichtleiste spiegelt sich im Lack",
    ratio: 4 / 3,
  },
  smartRepair: {
    remote: `${CDN}hf_20261003_113601_825b4576-10f1-4cd2-b51c-9388cc54f9e1.png`,
    alt: "Ausbeulen einer Delle mit Werkzeug und Reflexionsleiste",
    ratio: 3 / 4,
  },
  autoglas: {
    remote: `${CDN}hf_20261003_113601_f5121e0a-649e-49b5-809a-a4291a815eac.png`,
    alt: "Steinschlagreparatur an einer Frontscheibe",
    ratio: 4 / 3,
  },
  reifen: {
    remote: `${CDN}hf_20261003_113601_b4d936cb-c56c-44d0-8860-3cc1c8522c73.png`,
    alt: "Alufelge mit neuem Reifen auf der Auswuchtmaschine",
    ratio: 3 / 4,
  },
  service: {
    remote: `${CDN}hf_20261003_113834_230c0cc9-6c6e-48a0-bedc-dc2a44504ef7.png`,
    alt: "Motorraum mit Diagnosegerät in der Werkstatt",
    ratio: 4 / 3,
  },
  verkauf: {
    remote: `${CDN}hf_20261003_113908_0b600aba-01bd-4cdc-8ee7-f8da44cb3751.png`,
    alt: "Fotoshooting eines aufbereiteten Fahrzeugs im Studio",
    ratio: 16 / 9,
  },
  tropfen: {
    remote: `${CDN}hf_20261003_113743_2b54a6e5-e6fc-4322-a5b1-45de6d5b7eb3.png`,
    alt: "Abperlende Wassertropfen auf keramikversiegeltem Lack",
    ratio: 1,
  },
  scheinwerfer: {
    remote: `${CDN}hf_20261003_113743_e01430bf-ee3c-450d-a06f-b81a21242fea.png`,
    alt: "LED-Scheinwerfer eines schwarzen Fahrzeugs",
    ratio: 3 / 4,
  },
  lackflanke: {
    remote: `${CDN}hf_20261003_114022_9af8086b-0d68-4a79-9c0c-fffb4906eff5.png`,
    alt: "Seitenansicht mit spiegelnden Lichtlinien im polierten Lack",
    ratio: 16 / 9,
  },
  werkstatt: {
    remote: `${CDN}hf_20261003_114021_3610c72b-d125-4178-8223-c6ace6ba1680.png`,
    alt: "Aufbereitungshalle mit Fahrzeug unter Lichtleisten",
    ratio: 4 / 3,
  },
} as const;

export type ImageKey = keyof typeof images;
