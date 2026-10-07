"use client";

import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/components/Motion";
import { Icon } from "@/components/ui";
import { vision } from "@/lib/content";

const STEP = 7000; // ms each service stays open before the next one, while the section is on screen

/* "Building Your Vision", after lagom-development.com's management-company accordion: a list of the four services
   beside one large photograph. Opening a service swaps the photograph (the new one opens from its centre line);
   while the section is in view the list advances on its own, with a hairline under the open item showing the time
   left, and stops for good once someone picks an item, hovers or focuses inside. No auto-advance with reduced
   motion. Every service's full live copy is in the panel. */
export function Vision() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current; if (!el) return;
    if (reducedMotion()) { setAuto(false); return; }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !inView) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % vision.items.length), STEP);
    return () => window.clearTimeout(t);
  }, [auto, inView, active]);

  const stop = () => setAuto(false);
  const running = auto && inView;

  return (
    <section className="vision section" id="services" data-tone="light" tabIndex={-1} aria-labelledby="vision-title" ref={root}
      onPointerEnter={stop} onFocusCapture={stop}>
      <div className="wrap vision-grid">
        <div className="vision-media" data-reveal="image">
          {vision.items.map((it, i) => (
            <img key={it.title} src={it.image.src} alt={i === active ? it.image.alt : ""} aria-hidden={i !== active} loading="lazy"
              className={i === active ? "is-active" : undefined} />
          ))}
        </div>
        <div className="vision-list">
          <h2 className="h2" id="vision-title" data-reveal="head">{vision.heading}</h2>
          <ul data-reveal="cards">
            {vision.items.map((it, i) => {
              const open = i === active;
              return (
                <li key={it.title} className={`acc${open ? " is-open" : ""}`}>
                  <h3>
                    <button type="button" className="acc-head" aria-expanded={open} aria-controls={`svc-${i}`} id={`svc-h-${i}`}
                      onClick={() => { setAuto(false); setActive(i); }}>
                      <span>{it.title}</span><Icon name="plus" />
                    </button>
                  </h3>
                  <div className="acc-panel" id={`svc-${i}`} role="region" aria-labelledby={`svc-h-${i}`} hidden={!open}>
                    <p className="body">{it.body}</p>
                  </div>
                  <span className="acc-line" aria-hidden="true">
                    {open && <span key={`${active}-${running}`} className={running ? "is-running" : undefined} style={{ animationDuration: `${STEP}ms` }} />}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
