import type { Metadata } from 'next';
import Link from 'next/link';
import { CompassLogo, ContactCTA, ExternalLink, Photo } from '../../components/ui';
import { advisor, testimonial } from '../../lib/content';

export const metadata: Metadata = { title: 'Meet Cintia Cox' };

export default function About() {
  return (
    <>
      <section className="shell about">
        <div className="about__portrait">
          <Photo name="cintia-cox" eager alt="Cintia Cox, Real Estate Advisor at Compass" />
        </div>
        <div className="about__body">
          <p className="meta">
            {advisor.role} · {advisor.brokerage}
          </p>
          <h1>About Cintia</h1>
          <p className="lede">
            Cintia Cox brings a background in corporate sales leadership to her real estate practice in Boca Raton and
            the surrounding area.
          </p>
          <p>
            Her approach begins with listening: understanding your plans, discussing the details, and helping you make
            sense of the next steps. Her Compass profile highlights buyer and seller representation, relocation, and
            property management.
          </p>
          <p>
            With experience along the Boca Raton waterfront and a personal connection to downtown Boca, Cintia offers a
            local perspective to clients beginning their Florida story.
          </p>
          <dl className="facts facts--single">
            <div>
              <dt>Languages</dt>
              <dd>{advisor.languages.join(', ')}</dd>
            </div>
            <div>
              <dt>Brokerage</dt>
              <dd>{advisor.brokerage}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${advisor.tel}`}>{advisor.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${advisor.email}`}>{advisor.email}</a>
              </dd>
            </div>
          </dl>
          <div className="actions">
            <Link href="/contact/" className="btn">
              Start a conversation
            </Link>
            <ExternalLink href={advisor.profile}>Read Cintia’s Compass profile</ExternalLink>
          </div>
        </div>
      </section>

      <section className="section quote" aria-label="Client testimonial">
        <figure className="shell quote__inner">
          <blockquote>
            <p>“{testimonial.quote}”</p>
          </blockquote>
          <figcaption>
            <span>{testimonial.attribution}</span>
            <ExternalLink href={testimonial.source}>Read it on Compass</ExternalLink>
          </figcaption>
        </figure>
      </section>

      <section className="section compass-band" aria-labelledby="compass-title">
        <div className="shell compass-band__grid">
          <CompassLogo className="compass-band__logo" />
          <div>
            <h2 id="compass-title">Cintia at Compass</h2>
            <p>
              Connect with Cintia through Compass for current property information and her published transaction
              history. This personal website concept makes it easier to explore your priorities and begin that
              conversation.
            </p>
            <ExternalLink href={advisor.profile}>Cintia at Compass</ExternalLink>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
