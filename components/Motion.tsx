"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { getLenis, setLenis } from "@/lib/scroll";
import { splitWords } from "@/lib/split";

gsap.registerPlugin(ScrollTrigger, CustomEase);

/* The curve family, two curves measured from the references (and repeated as CSS variables in globals.css):
     "abc-out"  expo.out, the curve rioproperty.co.za uses for every reveal (34 tweens in its main.js), for things that settle
     "abc-io"   cubic-bezier(.625,.05,0,1), lagom-development.com's --button-transition, for wipes and frames that open */
CustomEase.create("abc-out", "M0,0 C0.16,1 0.3,1 1,1");
CustomEase.create("abc-io", "M0,0 C0.625,0.05 0,1 1,1");
export const EASE = "abc-out";
export const EASE_IO = "abc-io";

export const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Handover from the preloader: the hero, header and scroll wait for this.
export const INTRO_DONE = "intro:done";
export const introDone = () => document.documentElement.dataset.intro === "done";
export function onIntro(fn: () => void) {
  if (introDone()) { fn(); return () => {}; }
  window.addEventListener(INTRO_DONE, fn, { once: true });
  return () => window.removeEventListener(INTRO_DONE, fn);
}

/* Page-wide behaviour:
   - the link guard: a private demo, so links keep their live hrefs but never leave the page; "#" links scroll
     through Lenis instead
   - Lenis on the GSAP ticker, synced with ScrollTrigger, stopped while the preloader or the menu is open
   - the reveal vocabulary, declared in markup with data-reveal (the table in README.md):
       head    a heading: the whole phrase fades and rises once
       text    a paragraph: its words rise out of a line mask
       fill    a lead statement: its words go from faint to full as it crosses the screen (scrubbed, Lagom's
               grey-to-dark headline treatment)
       label   labels, buttons and small lines: a short fade and rise
       cards   a list: its children rise in batches as they arrive
       image   a frame that opens from its centre line (Lagom's clip "inset(50% 0 50% 0)"); an <img data-parallax>
               inside drifts about 10%
     Anything inside [data-late] (the last sections) plays at 0.75 of the duration. */
export function Motion() {
  useEffect(() => {
    const guard = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      e.preventDefault();
      if (!href.startsWith("#")) return;
      const target = href === "#top" ? 0 : document.querySelector<HTMLElement>(href);
      if (target === null) return;
      const lenis = getLenis();
      // A link inside the menu fires while the menu still has Lenis stopped; start() first so this scroll survives.
      if (lenis) { lenis.start(); lenis.scrollTo(target as HTMLElement | number, { duration: 1.4 }); }
      else if (typeof target === "number") window.scrollTo({ top: 0 });
      else target.scrollIntoView();
      if (typeof target !== "number") target.focus?.({ preventScroll: true });
    };
    document.addEventListener("click", guard, true);
    document.addEventListener("auxclick", guard, true);
    const unguard = () => { document.removeEventListener("click", guard, true); document.removeEventListener("auxclick", guard, true); };

    if (reducedMotion()) return unguard;

    // lerp .12 rather than rioproperty.co.za's fixed duration 1.25: a fixed duration read as a "jump" at the bottom
    // of the page on an earlier demo. wheelMultiplier .9 keeps some of Rio's slower wheel (.75) without feeling heavy.
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 0.9 });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (document.documentElement.classList.contains("is-loading")) lenis.stop();

    const ctx = gsap.context(() => {
      const pace = (el: Element) => (el.closest("[data-late]") ? 0.75 : 1);
      const once = (el: Element, start = "top 88%") => ({ trigger: el, start, once: true });

      gsap.utils.toArray<HTMLElement>('[data-reveal="head"]').forEach((el) => {
        gsap.fromTo(el, { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2 * pace(el), ease: EASE, scrollTrigger: once(el) });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="text"]').forEach((el) => {
        const words = splitWords(el);
        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: 1.1 * pace(el), ease: EASE, stagger: 0.006, scrollTrigger: once(el) });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="fill"]').forEach((el) => {
        const words = splitWords(el);
        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(words, { opacity: 0.2 }, {
          opacity: 1, ease: "none", stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 52%", scrub: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="label"]').forEach((el) => {
        gsap.fromTo(el, { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 * pace(el), ease: EASE, scrollTrigger: once(el, "top 94%") });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="cards"]').forEach((list) => {
        const items = Array.from(list.children) as HTMLElement[];
        gsap.set(list, { autoAlpha: 1 });
        gsap.set(items, { y: 36, autoAlpha: 0 });
        ScrollTrigger.batch(items, {
          start: "top 92%", once: true,
          onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 1.1 * pace(list), ease: EASE, stagger: 0.08, clearProps: "transform" }),
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="image"]').forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(50% 0% 50% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4 * pace(el), ease: EASE_IO, scrollTrigger: once(el, "top 90%") });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((img) => {
        const amount = Number(img.dataset.parallax) || 5;
        gsap.fromTo(img, { yPercent: -amount, scale: 1.12 }, {
          yPercent: amount, scale: 1.12, ease: "none",
          scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const to = Number(el.dataset.count);
        const from = Number(el.dataset.from ?? 0);
        const box = { v: from };
        el.textContent = String(from);
        gsap.to(box, { v: to, duration: 1.8 * pace(el), ease: EASE, scrollTrigger: once(el), onUpdate: () => { el.textContent = String(Math.round(box.v)); } });
      });
    });
    document.documentElement.classList.add("motion-ready");

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      unguard();
      window.removeEventListener("load", refresh);
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
  return null;
}
