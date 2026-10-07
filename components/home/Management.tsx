import { management } from "@/lib/content";

/* "Expert Construction Management Services": six services with their full live copy, set as Rio's "laws" grid:
   the heading holds the left column, the six sit two across beside it. Text only, between two photograph-led sections. */
export function Management() {
  return (
    <section className="management section" id="management" data-tone="light" tabIndex={-1} aria-labelledby="mgmt-title" data-late>
      <div className="wrap management-wrap">
        <h2 className="h2 management-title" id="mgmt-title" data-reveal="head">{management.heading}</h2>
        <ul className="management-grid" data-reveal="cards">
          {management.items.map((m) => (
            <li key={m.title} className="mgmt">
              <h3 className="h3">{m.title}</h3>
              <p className="body">{m.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
