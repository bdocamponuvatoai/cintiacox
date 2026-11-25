import Link from 'next/link';
import { advisor, areas, residences, testimonial } from '../lib/content';
import { AreaCard, ArrowLink, ContactCTA, ExternalLink, Photo } from '../components/ui';
import { WorkIndex } from '../components/work-index';

const plate = residences.find((h) => h.slug === 'carlton-penthouse')!;

const services: [string, string, string, string][] = [
  ['Buying', 'Tell Cintia what you are looking for and ask about the properties available today.', 'Start a search', '/contact/?intent=Buy'],
  ['Selling', 'Talk through your property, your goals and your timing before deciding on a plan.', 'Selling with Cintia', '/sell/'],
  ['Relocating', 'Plan a move from another state or another country, in English, Spanish or Portuguese.', 'Moving to Florida', '/relocate/'],
];

export default function Home() {
  return (
    <>
      <section className="shell masthead">
        <h1 className="masthead__name">Cintia Cox</h1>
        <div className="masthead__body">
          <p className="lede">Real estate advisor with Compass in Boca Raton and the Palm Beaches.</p>
          <p className="meta">Buying, selling and relocation{' · '}{advisor.languages.join(' · ')}</p>
          <div className="actions">
            <Link className="btn" href="/homes/">
              View the portfolio
            </Link>
            <a className="actions__phone" href={`tel:${advisor.tel}`}>
              {advisor.phone}
            </a>
          </div>
        </div>
      </section>

      <figure className="shell plate plate--hero">
        <Link href={`/homes/${plate.slug}/`} className="plate__frame">
          <Photo
            name={plate.image}
            eager
            sizes="(min-width: 1080px) 80vw, 100vw"
            alt="Ocean and waterway view from a penthouse balcony at The Carlton, Boca Raton"
          />
        </Link>
        <figcaption className="plate__caption">
          <span>
            {plate.address}, {plate.city}
          </span>
          <span>Past transaction</span>
        </figcaption>
      </figure>

      <section className="shell section work" aria-labelledby="work-title">
        <header className="section-head">
          <h2 id="work-title">Selected work</h2>
          <p>Past transactions published on Cintia’s Compass profile. They are not current listings.</p>
          <ArrowLink href="/homes/">Full portfolio</ArrowLink>
        </header>
        <WorkIndex homes={residences} />
      </section>

      <section className="section places" aria-labelledby="places-title">
        <div className="shell">
          <header className="section-head">
            <h2 id="places-title">Boca Raton and the Palm Beaches</h2>
            <p>Four coastal places to start a search, each with its own setting.</p>
            <ArrowLink href="/areas/">All areas</ArrowLink>
          </header>
          <div className="places__grid">
            {areas.map((a) => (
              <AreaCard key={a.slug} area={a} />
            ))}
          </div>
        </div>
      </section>

      <section className="shell section intro" aria-labelledby="intro-title">
        <div className="intro__portrait">
          <Photo name="cintia-cox" alt="Cintia Cox, Real Estate Advisor at Compass" />
        </div>
        <div className="intro__body">
          <h2 id="intro-title">About Cintia</h2>
          <p className="lede">
            Cintia brings a background in corporate sales leadership to her real estate practice in Boca Raton and the
            surrounding area.
          </p>
          <p>
            Her Compass profile lists buyer and seller representation, relocation and property management. She works
            with clients in English, Spanish and Portuguese.
          </p>
          <ArrowLink href="/about/">More about Cintia</ArrowLink>
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

      <section className="shell section services" aria-labelledby="services-title">
        <h2 id="services-title" className="visually-hidden">
          How Cintia can help
        </h2>
        <ol className="services__list">
          {services.map(([title, text, cta, href], i) => (
            <li key={title}>
              <span className="services__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <ArrowLink href={href}>{cta}</ArrowLink>
            </li>
          ))}
        </ol>
      </section>

      <ContactCTA />
    </>
  );
}
