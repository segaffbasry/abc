import { about } from "@/lib/content";

/* "About ABC London Property / Why Choose Us?" The live paragraph in full: the lead fills in word by word as it
   crosses the screen (Lagom's faint-to-dark statement), the passages sit beside two of ABC's own photographs that
   drift at different speeds (Lagom's floating pictures), and the paragraph's own facts close the section. */
export function About() {
  return (
    <section className="about section" id="about" data-tone="light" tabIndex={-1} aria-label={about.label}>
      <div className="wrap">
        <div className="about-head">
          <h2 className="h2" id="about-title" data-reveal="head">{about.heading}</h2>
        </div>
        <p className="about-lead lead" data-reveal="fill">{about.lead}</p>

        <div className="about-grid">
          <div className="about-photos">
            <figure className="frame about-photo about-photo-a" data-reveal="image">
              <img src={about.images[0].src} alt={about.images[0].alt} width={about.images[0].w} height={about.images[0].h} loading="lazy" data-parallax="6" />
            </figure>
            <figure className="frame about-photo about-photo-b" data-reveal="image">
              <img src={about.images[1].src} alt={about.images[1].alt} width={about.images[1].w} height={about.images[1].h} loading="lazy" data-parallax="9" />
            </figure>
          </div>
          <div className="about-copy">
            {about.passages.map((p, i) => <p key={i} className="body" data-reveal="text">{p}</p>)}
            <p className="about-close" data-reveal="label">{about.close}</p>
            <dl className="facts" data-reveal="cards">
              {about.facts.map((f) => (
                <div key={f.label} className="fact">
                  <dt className="fact-label">{f.label}</dt>
                  <dd className="fact-value"><span data-count={f.value} data-from={f.value === "1951" ? 1900 : 0}>{f.value}</span>{f.suffix}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
