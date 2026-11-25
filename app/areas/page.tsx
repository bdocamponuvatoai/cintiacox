import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLink, ContactCTA, PageIntro, Photo } from '../../components/ui';
import { areas, photos } from '../../lib/content';

export const metadata: Metadata = { title: 'Boca Raton & the Palm Beaches' };

export default function Areas() {
  return (
    <>
      <PageIntro title="Boca Raton and the Palm Beaches" meta="Area guides">
        <p className="lede">
          Start with the feel of a place. Four coastal communities, each with a link to its official local guide.
        </p>
      </PageIntro>

      <section className="shell section section--flush-top">
        <ol className="features">
          {areas.map((a, i) => (
            <li key={a.slug} className="feature">
              <figure className="feature__media">
                <Link href={`/areas/${a.slug}/`} className="plate__frame" style={{ maxWidth: photos[a.image].width }} tabIndex={-1} aria-hidden="true">
                  <Photo name={a.image} alt="" eager={i === 0} sizes="(min-width: 900px) 55vw, 100vw" />
                </Link>
                <figcaption className="plate__caption">
                  <span>{a.credit}</span>
                </figcaption>
              </figure>
              <div className="feature__body">
                <span className="feature__num">{String(i + 1).padStart(2, '0')}</span>
                <h2>
                  <Link href={`/areas/${a.slug}/`}>{a.name}</Link>
                </h2>
                <p className="lede">{a.intro}</p>
                <ul className="ruled-list">
                  {a.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <ArrowLink href={`/areas/${a.slug}/`}>Explore {a.name}</ArrowLink>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <ContactCTA />
    </>
  );
}
