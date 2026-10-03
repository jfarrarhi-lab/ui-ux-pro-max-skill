import { FacebookLogo, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react";
import { site } from "../content/site";

const items = [
  { href: site.social.instagram, label: "Instagram", Icon: InstagramLogo },
  { href: site.social.facebook, label: "Facebook", Icon: FacebookLogo },
  { href: site.social.whatsapp, label: "WhatsApp", Icon: WhatsappLogo },
];

type Props = { className?: string; vertical?: boolean; size?: "md" | "lg" };

/** Runde Social-Buttons (44px+ Touch-Ziel), Hover: Goldrahmen + Icon hebt sich. */
export function SocialLinks({ className = "", vertical = false, size = "md" }: Props) {
  const dim = size === "lg" ? "size-12" : "size-11";
  return (
    <ul className={`flex ${vertical ? "flex-col" : "flex-row"} gap-2.5 ${className}`}>
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Auto Sauber auf ${label} (öffnet in neuem Tab)`}
            className={`group grid ${dim} place-items-center rounded-full border border-border-strong bg-bg/40 text-text transition-[border-color,color,background-color] duration-200 hover:border-accent hover:bg-accent hover:text-on-accent`}
          >
            <Icon size={size === "lg" ? 22 : 20} weight="regular" className="transition-transform duration-300 group-hover:-translate-y-px" />
          </a>
        </li>
      ))}
    </ul>
  );
}
