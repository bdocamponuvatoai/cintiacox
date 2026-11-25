import type { Metadata } from 'next';
import { ContactForm } from '../../components/contact-form';
import { CompassLogo, Photo } from '../../components/ui';
import { advisor } from '../../lib/content';

export const metadata: Metadata = { title: 'Connect with Cintia' };

export default function Contact() {
  return (
    <section className="shell contact">
      <div className="contact__intro">
        <p className="meta">Contact</p>
        <h1>Talk to Cintia</h1>
        <p className="lede">A question, a plan, or a place you have in mind. Tell her a little about it.</p>

        <div className="contact__person">
          <span className="contact__avatar">
            <Photo name="cintia-cox" alt="Cintia Cox" />
          </span>
          <div>
            <strong>{advisor.name}</strong>
            <span>{advisor.role}</span>
            <CompassLogo />
          </div>
        </div>

        <div className="contact__direct">
          <a className="contact__phone" href={`tel:${advisor.tel}`}>
            {advisor.phone}
          </a>
          <a className="contact__email" href={`mailto:${advisor.email}`}>
            {advisor.email}
          </a>
          <p className="meta">{advisor.languages.join(' · ')}</p>
        </div>

        <div className="contact__note">
          <h2>Connecting across time zones?</h2>
          <p>Include your location or time zone and preferred timing. Consultation times are confirmed personally.</p>
        </div>
      </div>

      <ContactForm />
    </section>
  );
}
