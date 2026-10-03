import { useEffect, useState } from "react";
import { site } from "../content/site";

const DAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

function berlinNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { day: DAY_INDEX[get("weekday")] ?? 0, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));

export type OpenStatus = { open: boolean; label: string; today: number };

/** Öffnungsstatus nach Würzburger Zeit, minütlich aktualisiert. */
export function getOpenStatus(): OpenStatus {
  const { day, minutes } = berlinNow();
  const today = site.hours.find((h) => h.days.includes(day));
  if (today?.open && today.close && minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    return { open: true, label: `Jetzt geöffnet · bis ${today.close} Uhr`, today: day };
  }
  for (let i = 0; i < 7; i++) {
    const d = (day + i) % 7;
    const h = site.hours.find((x) => x.days.includes(d));
    if (!h?.open) continue;
    if (i === 0 && minutes >= toMin(h.open)) continue;
    const when = i === 0 ? "heute" : i === 1 ? "morgen" : new Intl.DateTimeFormat("de-DE", { weekday: "long" }).format(new Date(2024, 0, 7 + d));
    return { open: false, label: `Geschlossen · öffnet ${when} ${h.open} Uhr`, today: day };
  }
  return { open: false, label: "Geschlossen", today: day };
}

export function useOpenStatus() {
  const [status, setStatus] = useState<OpenStatus>(() => getOpenStatus());
  useEffect(() => {
    const id = window.setInterval(() => setStatus(getOpenStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  return status;
}
