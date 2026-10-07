import { Icon, MoreLink, RollButton, external } from "@/components/ui";
import { contact, linkedin } from "@/lib/content";

/* "Contact Us", after rioproperty.co.za's "Let's talk" panel: a block of brand colour holding the heading on the
   left and the details on the right. Orange ground, Ink text (6.6:1). The live enquiry form is not rebuilt: in a
   demo it could not send, so "Drop us a line!" opens an email to Patrick instead (see README, gaps). */
export function Contact() {
  return (
    <section className="contact section" id="contact" data-tone="light" tabIndex={-1} aria-labelledby="contact-title" data-late>
      <div className="wrap">
        <div className="contact-panel">
          <div className="contact-intro">
            <h2 className="h2" id="contact-title" data-reveal="head">{contact.heading}</h2>
            <p className="contact-strap" data-reveal="label">{contact.strap}</p>
            <p className="body" data-reveal="text">{contact.body}</p>
            <div className="actions" data-reveal="label">
              <RollButton href={contact.phone.href} label={`Call ${contact.person}`} variant="ink" />
              <RollButton href={contact.emails[0].href} label={contact.form} variant="light" />
            </div>
          </div>
          <dl className="contact-details" data-reveal="cards">
            <div>
              <dt className="caps">Office</dt>
              <dd>
                <span className="contact-strong">ABC London Property Group</span>
                <span>{contact.address}</span>
                <MoreLink href={contact.directions} icon="out">Get directions</MoreLink>
              </dd>
            </div>
            <div>
              <dt className="caps">Phone</dt>
              <dd><a className="contact-strong" href={contact.phone.href}>{contact.phone.label}</a></dd>
            </div>
            <div>
              <dt className="caps">Email</dt>
              <dd>{contact.emails.map((e) => <a key={e.href} href={e.href}>{e.label}</a>)}</dd>
            </div>
            <div>
              <dt className="caps">{contact.hours.label}</dt>
              <dd><span className="contact-strong">{contact.hours.value}</span><span>{contact.hours.note}</span></dd>
            </div>
            <div className="contact-social">
              <dt className="sr-only">LinkedIn</dt>
              <dd>
                <a className="contact-linkedin" href={linkedin.href} {...external(linkedin.href)}>
                  <Icon name="linkedin" /><span>{linkedin.label}</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
