import type { CSSProperties, ReactNode } from "react";
import { brandIcons } from "@/lib/brand-icons";

const glyphs = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  out: <path d="M8 16 16 8M9 8h7v7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  left: <path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  plus: <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
};

export type IconName = keyof typeof glyphs | keyof typeof brandIcons;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const brand = (brandIcons as Record<string, string>)[name];
  return (
    <svg className={`icon ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {brand ? <path d={brand} fill="currentColor" /> : glyphs[name as keyof typeof glyphs]}
    </svg>
  );
}

// Outbound links open in a new tab (the link guard in components/Motion.tsx stops them navigating in this demo).
const outside = (href: string) => !href.startsWith("#") && !href.startsWith("tel:") && !href.startsWith("mailto:");
export const external = (href: string) => (outside(href) ? { target: "_blank", rel: "noopener" } : {});

/* The copied interaction: lagom-development.com's ".btn" hover (theme "bamboo", assets/css/index.css), rebuilt as is.
   Each letter is its own inline-block span; the label casts a copy of itself 1.5em below (text-shadow 0 1.5em) and
   overflow hides it. On hover every letter moves up by its own height, 6.6ms after the one before
   (transition-delay: calc(var(--i) * 6.6ms)), so the copy rolls up into place left to right.
     transition   transform .8s cubic-bezier(.625,.05,0,1)    (--roll-dur, --ease-io)
     padding      clamp(9px,1.042vw,20px) clamp(12px,1.667vw,32px)
     type         600, clamp(14px,.833vw,16px), line-height 150%, letter-spacing .02em
     corner       Lagom's icon-line.svg, a 24px diagonal sliver in the top-right corner
   One change: the label is Ink, not white, on the orange (white on #FF6900 is 2.9:1; the live ABC buttons are dark
   on orange too). The full label stays readable to assistive tech through aria-label; the letters are aria-hidden. */
function Roll({ label }: { label: string }) {
  return (
    <span className="rbtn-text" aria-hidden="true">
      {Array.from(label).map((c, i) => (c === " " ? <span key={i}>&nbsp;</span> : <span key={i} style={{ "--i": i } as CSSProperties}>{c}</span>))}
    </span>
  );
}
const Corner = () => (
  <svg className="rbtn-corner" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 0H2L24 22V16L8 0Z" /></svg>
);

type Variant = "orange" | "ink" | "light";

export function RollButton({ href, label, variant = "orange", className }: { href: string; label: string; variant?: Variant; className?: string }) {
  return (
    <a href={href} className={`rbtn rbtn-${variant} ${className ?? ""}`} aria-label={label} {...external(href)}>
      <Roll label={label} /><Corner />
    </a>
  );
}

export function RollAction({ onClick, label, variant = "orange", controls }: { onClick: () => void; label: string; variant?: Variant; controls?: string }) {
  return (
    <button type="button" className={`rbtn rbtn-${variant}`} aria-label={label} aria-controls={controls} onClick={onClick}>
      <Roll label={label} /><Corner />
    </button>
  );
}

/* A text link with an arrow that slides on hover. */
export function MoreLink({ href, children, icon = "arrow" }: { href: string; children: ReactNode; icon?: IconName }) {
  return (
    <a className="more" href={href} {...external(href)}>
      <span>{children}</span><Icon name={icon} />
    </a>
  );
}
