"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Logo, LOGO_FULL } from "@/components/Logo";
import { EASE, EASE_IO, INTRO_DONE, reducedMotion } from "@/components/Motion";
import { getLenis } from "@/lib/scroll";

/* The company signing its name, built from the real lock-up (components/Logo.tsx). ABC's logo is pure lettering, so
   the build is letters: the three initials A, B, C rise one after another as the mark, then "LONDON" wipes in beside
   them and "PROPERTY GROUP" wipes in beneath. A counter and an orange hairline show progress (clients asked for a
   loader they notice). The ground is Ink, the colour the hero opens on, so there is no jump. One timeline, ~2.5s:
     0.10 to 0.86  A, B, C rise, 0.13s apart (expo.out)
     0.70 to 1.25  "LONDON" wipes in (Lagom's in-out curve)
     0.95 to 1.55  "PROPERTY GROUP" wipes in
     0.00 to 1.85  counter 00 to 100 and the progress hairline
     1.90 to 2.55  exit: the curtain lifts off the hero (Rio's mask wipe, bottom edge up) while the lock-up flies into
                   the header logo; the handover fires at 1.90 so the hero entrance overlaps it
   Plays on every load; skipped with reduced motion; hidden without JavaScript. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    let handed = false;
    const handover = () => {
      if (handed) return; handed = true;
      html.classList.remove("is-loading");
      html.dataset.intro = "done";
      getLenis()?.start();
      window.dispatchEvent(new Event(INTRO_DONE));
    };
    if (!el || !html.classList.contains("is-loading") || reducedMotion()) {
      if (el) el.style.display = "none";
      html.classList.add("logo-landed");
      handover();
      return;
    }
    window.scrollTo(0, 0);
    const q = (s: string) => el.querySelectorAll(s);
    const lockup = el.querySelector<HTMLElement>(".preloader-logo")!;
    const target = document.querySelector<HTMLElement>(".header-logo .logo");
    const counter = el.querySelector<HTMLElement>(".preloader-count")!;
    const flight = () => {
      if (!target) return { x: 0, y: -80, scale: 0.3 };
      const a = lockup.getBoundingClientRect(), b = target.getBoundingClientRect();
      return { x: b.left + b.width / 2 - (a.left + a.width / 2), y: b.top + b.height / 2 - (a.top + a.height / 2), scale: b.width / a.width };
    };
    const progress = { v: 0 };

    gsap.set(q('[data-part="letter"]'), { yPercent: 115 });

    const tl = gsap.timeline({ onComplete: () => { el.style.display = "none"; html.classList.add("logo-landed"); } });
    tl.add(() => el.classList.add("is-active"), 0)
      .to(progress, { v: 100, duration: 1.85, ease: "power1.inOut", onUpdate: () => { counter.textContent = String(Math.round(progress.v)).padStart(2, "0"); } }, 0)
      .fromTo(q(".preloader-fill"), { scaleX: 0 }, { scaleX: 1, duration: 1.85, ease: "power1.inOut" }, 0)
      .to(q('[data-part="letter"]'), { yPercent: 0, duration: 0.5, ease: EASE, stagger: 0.13 }, 0.1)
      .to(q('[data-part="wipe-ldn"]'), { attr: { width: LOGO_FULL.w }, duration: 0.55, ease: EASE_IO }, 0.7)
      .to(q('[data-part="wipe-l1"]'), { attr: { width: LOGO_FULL.w + 40 }, duration: 0.6, ease: EASE_IO }, 0.95)
      .to(q(".preloader-meter"), { autoAlpha: 0, duration: 0.3, ease: "none" }, 1.85)
      .add(handover, 1.9)
      // Measured when the exit starts (tweens initialise lazily), so late layout shifts are accounted for.
      .to(lockup, { x: () => flight().x, y: () => flight().y, scale: () => flight().scale, duration: 0.65, ease: EASE_IO }, 1.9)
      .fromTo(q(".preloader-curtain"), { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.65, ease: EASE_IO }, 1.9);

    // Never hold the page for long: if the tab was hidden or throttled, finish anyway.
    const failsafe = window.setTimeout(() => { tl.progress(1); }, 3400);
    return () => { window.clearTimeout(failsafe); tl.kill(); };
  }, []);

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader-curtain" />
      <div className="preloader-logo"><Logo id="pl" build title="" /></div>
      <div className="preloader-meter">
        <span className="preloader-count">00</span>
        <span className="preloader-track"><span className="preloader-fill" /></span>
      </div>
    </div>
  );
}
