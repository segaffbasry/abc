"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { EASE, onIntro, reducedMotion } from "@/components/Motion";
import { RollButton } from "@/components/ui";
import { contact, hero } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/* After rioproperty.co.za's hero: one full-bleed photograph (ABC's own, cranes at sunset), small caps notes along
   the top, and a stacked headline set low on the left with its second line stepped in. The entrance waits for
   intro:done and reuses Rio's load moves, measured from its main.js:
     photo     scale 1.25 to 1 over 3s, power3.out        ([data-anim-load] scale)
     headline  each line rises from yPercent 125, 1.5s expo.out, 0.05s apart, out of a line mask
     notes     children rise from yPercent 50 and fade, 2s expo.out, 0.125s apart
   On the way out (Lagom's frame move) the photograph is scrubbed down to a framed inset and drifts. This and the
   preloader are the only places with heavier motion. */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current; if (!el || reducedMotion()) return;
    const q = (s: string) => el.querySelectorAll(s);
    const ctx = gsap.context(() => {
      gsap.set(q(".hero-line > span"), { yPercent: 125 });
      gsap.set(q("[data-hero-in]"), { yPercent: 50, autoAlpha: 0 });
      gsap.set(q(".hero-photo img"), { scale: 1.25 });
    }, el);
    const off = onIntro(() => {
      ctx.add(() => {
        gsap.to(q(".hero-photo img"), { scale: 1, duration: 3, ease: "power3.out" });
        gsap.to(q(".hero-line > span"), { yPercent: 0, duration: 1.5, ease: EASE, stagger: 0.05, delay: 0.1 });
        gsap.to(q("[data-hero-in]"), { yPercent: 0, autoAlpha: 1, duration: 2, ease: EASE, stagger: 0.125, delay: 0.3 });
        gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } })
          .to(q(".hero-photo"), { clipPath: "inset(0% 2.5% 6% 2.5%)", ease: "none" }, 0)
          .to(q(".hero-photo-inner"), { yPercent: 14, ease: "none" }, 0)
          .to(q(".hero-content"), { yPercent: -18, autoAlpha: 0.15, ease: "none" }, 0);
      });
    });
    return () => { off(); ctx.revert(); };
  }, []);

  return (
    <section className="hero" ref={root} data-tone="dark" aria-labelledby="hero-title">
      <div className="hero-photo">
        <div className="hero-photo-inner">
          <picture>
            <source media="(max-width: 767px)" srcSet={hero.image.mobile} />
            <img src={hero.image.src} alt={hero.image.alt} fetchPriority="high" />
          </picture>
        </div>
        <div className="hero-shade" />
      </div>
      <div className="hero-content wrap">
        <div className="hero-top">
          <ul className="hero-places caps" data-hero-in aria-label="Where we work">
            {hero.places.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <p className="hero-note caps" data-hero-in>{hero.lines[0]}</p>
        </div>
        <div className="hero-bottom">
          <h1 className="hero-title" id="hero-title">
            <span className="sr-only">{hero.kicker}: </span>
            {hero.title.map((t, i) => (
              <span key={t} className={`hero-line hero-line-${i}`}><span>{t}</span></span>
            ))}
          </h1>
          <div className="hero-side">
            <p className="hero-lead" data-hero-in>{hero.lines[1]}</p>
            <p className="hero-cta-line" data-hero-in>{hero.cta}</p>
            <div data-hero-in><RollButton href={contact.phone.href} label={`Call ${contact.person}`} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
