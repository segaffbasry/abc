import { logo } from "@/lib/logo";

/* The ABC London Property Group lock-up as vector outlines (lib/logo.ts, generated from Bitter 700 by scripts/logo.py):
   "ABC LONDON" over "PROPERTY GROUP", centred, in the live logo's orange. Every letter is its own path.
   With `build` (the preloader) the parts are tagged for the timeline and clipped so they can enter:
     data-part="letter"     A, B and C, each rising out of the first line's clip
     data-part="wipe-ldn"   the clip rect that wipes "LONDON" in from the left
     data-part="wipe-l1"    the clip rect that wipes "PROPERTY GROUP" in from the left */
export function Logo({ id, build, title = "ABC London Property Group" }: { id: string; build?: boolean; title?: string }) {
  const { width: W, height: H, capHeight: cap, pitch, parts } = logo;
  const abc = parts.filter((p) => p.word === "0-0");
  const london = parts.filter((p) => p.word === "0-1");
  const second = parts.filter((p) => p.line === 1);
  const split = Math.min(...london.map((p) => p.box[0])) - 6;
  const clip = (name: string) => (build ? `url(#${id}-${name})` : undefined);

  return (
    <svg className="logo" viewBox={`0 0 ${W} ${H}`} role={title ? "img" : undefined} aria-label={title || undefined} aria-hidden={title ? undefined : true} focusable="false">
      {build && (
        <defs>
          <clipPath id={`${id}-abc`}><rect x={-20} y={-30} width={split + 20} height={cap + 40} /></clipPath>
          <clipPath id={`${id}-ldn`}><rect data-part="wipe-ldn" x={split} y={-30} width={0} height={cap + 40} /></clipPath>
          <clipPath id={`${id}-l1`}><rect data-part="wipe-l1" x={-20} y={pitch - 30} width={0} height={cap + 50} /></clipPath>
        </defs>
      )}
      <g fill="currentColor">
        <g clipPath={clip("abc")}>{abc.map((p, i) => <path key={i} d={p.d} data-part={build ? "letter" : undefined} />)}</g>
        <g clipPath={clip("ldn")}>{london.map((p, i) => <path key={i} d={p.d} />)}</g>
        <g clipPath={clip("l1")}>{second.map((p, i) => <path key={i} d={p.d} />)}</g>
      </g>
    </svg>
  );
}

export const LOGO_FULL = { w: logo.width };
