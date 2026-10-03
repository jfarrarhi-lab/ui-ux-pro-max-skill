type Props = { className?: string; withTagline?: boolean };

/**
 * Wortmarke nach dem Brand-Board: goldene Fahrzeug-Silhouette über
 * "AUTO" (weiß) und "SAUBER" (gold).
 * TODO(placeholder): durch die finale Logo-Datei (SVG) ersetzen, sobald vorhanden.
 */
export function Logo({ className = "", withTagline = false }: Props) {
  return (
    <span className={`inline-flex flex-col items-start leading-none ${className}`}>
      <svg viewBox="0 0 200 26" className="-mb-0.5 h-[0.62em] w-auto overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="logo-gold" x1="0" x2="1">
            <stop offset="0" stopColor="#8A7140" />
            <stop offset="0.55" stopColor="#C8A45D" />
            <stop offset="1" stopColor="#E0C078" />
          </linearGradient>
        </defs>
        <path d="M2 24 C 30 22, 46 6, 84 4 C 112 2.5, 128 9, 148 15 C 162 19, 180 20, 198 21" fill="none" stroke="url(#logo-gold)" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M58 13 C 80 7.5, 108 7, 132 13" fill="none" stroke="url(#logo-gold)" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
      </svg>
      <span className="font-display font-extrabold tracking-[0.02em] whitespace-nowrap">
        <span className="text-text">AUTO</span> <span className="text-accent">SAUBER</span>
      </span>
      {withTagline && (
        <span className="mt-2 max-w-[22em] text-[0.46em] leading-relaxed font-semibold tracking-[0.24em] text-muted uppercase sm:max-w-none sm:whitespace-nowrap">
          KFZ-Aufbereitung · Smart Repair · Autopflege
        </span>
      )}
    </span>
  );
}
