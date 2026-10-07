"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { EASE, reducedMotion } from "@/components/Motion";
import { reviews } from "@/lib/content";

/* "What Customers Say": all five reviews from the live widget. The reviewers are tabs (who they are and what they
   built with ABC); the open review is set large beside them. Arrow keys move between tabs (WAI-ARIA tabs pattern).
   A change of review fades and lifts the quote in (expo.out, the page's settle curve). */
export function Reviews() {
  const [active, setActive] = useState(0);
  const quote = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (!quote.current || reducedMotion()) return;
    const t = gsap.fromTo(quote.current, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: EASE });
    return () => { t.kill(); };
  }, [active]);

  const onKey = (e: React.KeyboardEvent) => {
    const n = reviews.items.length;
    const to = e.key === "ArrowDown" || e.key === "ArrowRight" ? (active + 1) % n
      : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (active - 1 + n) % n
      : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (to < 0) return;
    e.preventDefault();
    setActive(to);
    tabs.current[to]?.focus();
  };

  const r = reviews.items[active];
  return (
    <section className="reviews section" id="reviews" data-tone="light" tabIndex={-1} aria-labelledby="reviews-title" data-late>
      <div className="wrap reviews-grid">
        <div className="reviews-side">
          <h2 className="h2" id="reviews-title" data-reveal="head">{reviews.heading}</h2>
          <div className="reviews-tabs" role="tablist" aria-label="Reviewers" aria-orientation="vertical" onKeyDown={onKey} data-reveal="cards">
            {reviews.items.map((it, i) => (
              <button key={it.name} ref={(b) => { tabs.current[i] = b; }} type="button" role="tab" id={`rv-tab-${i}`} aria-controls="rv-panel"
                aria-selected={i === active} tabIndex={i === active ? 0 : -1} className="reviews-tab" onClick={() => setActive(i)}>
                <span className="reviews-tab-name">{it.name}</span>
                <span className="reviews-tab-title">{it.title}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="reviews-panel" id="rv-panel" role="tabpanel" aria-labelledby={`rv-tab-${active}`} data-reveal="label">
          <div ref={quote}>
            <span className="reviews-mark" aria-hidden="true">“</span>
            <blockquote className="reviews-quote">
              <p>{r.quote}</p>
              {r.after && <p className="reviews-after">{r.after}</p>}
            </blockquote>
            <p className="reviews-by">
              <span className="reviews-name">{r.name}</span>
              {r.role && <span>{r.role}</span>}
              <span className="reviews-date">{r.title}, {r.date}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
