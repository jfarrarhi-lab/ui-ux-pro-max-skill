import { useEffect, useState } from "react";
import { CalendarCheck, Phone } from "@phosphor-icons/react";
import { mailtoAppointment, site } from "../content/site";

/** Mobile Schnellaktionen, erscheinen nach dem Hero. */
export function MobileBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-transform duration-500 ease-[var(--ease-out)] lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a href={site.phone.href} tabIndex={show ? 0 : -1} className="btn btn-secondary !min-h-12">
          <Phone size={18} weight="bold" /> Anrufen
        </a>
        <a href={mailtoAppointment} tabIndex={show ? 0 : -1} className="btn btn-primary !min-h-12">
          <CalendarCheck size={18} weight="bold" /> Termin
        </a>
      </div>
    </div>
  );
}
