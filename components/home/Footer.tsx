import { Logo } from "@/components/Logo";
import { Icon, external } from "@/components/ui";
import { contact, linkedin, sections, site } from "@/lib/content";

/* Rio's footer: the email set large, then the lock-up, the details and the links. Ink ground. No scroll reveals
   here (they fire in the last pixels of the page and read as a jump). */
export function Footer() {
  return (
    <footer className="footer" data-tone="dark">
      <div className="wrap">
        <a className="footer-email" href={contact.emails[0].href}>
          {/* Breaks after the "@" on narrow screens rather than inside the domain. */}
          <span>{contact.emails[0].label.split("@")[0]}@<wbr />{contact.emails[0].label.split("@")[1]}</span><Icon name="out" />
        </a>
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="footer-logo" aria-label="ABC London Property Group, back to the top"><Logo id="ft" title="" /></a>
          </div>
          <div className="footer-col">
            <p>{contact.address}</p>
            <a href={contact.phone.href}>{contact.phone.label}</a>
            <a href={contact.emails[1].href}>{contact.emails[1].label}</a>
          </div>
          <nav className="footer-col" aria-label="Footer">
            <ul>{sections.map((s) => <li key={s.href}><a href={s.href}>{s.label}</a></li>)}</ul>
          </nav>
          <div className="footer-col">
            <a className="footer-social" href={linkedin.href} {...external(linkedin.href)}><Icon name="linkedin" /><span>LinkedIn</span></a>
            <a href={site.privacy} {...external(site.privacy)}>Privacy Policy</a>
          </div>
        </div>
        <p className="footer-legal">{site.copyright}</p>
      </div>
    </footer>
  );
}
