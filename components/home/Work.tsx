import { work } from "@/lib/content";

/* Where the work has been done: the paragraph's own lines about it, then the other four photographs of the live
   gallery in a stepped row (Rio's "done deals" row, without invented captions: the live gallery has none).
   Each frame opens from its centre line and drifts, at a different rate per column. */
export function Work() {
  return (
    <section className="work section" id="projects" data-tone="light" tabIndex={-1} aria-labelledby="work-title">
      <div className="wrap">
        <div className="work-head">
          <h2 className="h2 work-title" id="work-title" data-reveal="head">{work.heading}</h2>
          <p className="body" data-reveal="text">{work.body}</p>
        </div>
        <ul className="work-row">
          {work.images.map((im, i) => (
            <li key={im.src} className={`work-item work-item-${i}`}>
              <figure className="frame" data-reveal="image">
                <img src={im.src} alt={im.alt} width={im.w} height={im.h} loading="lazy" data-parallax={String(4 + (i % 2) * 4)} />
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
