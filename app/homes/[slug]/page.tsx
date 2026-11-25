import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { area, money, photos, residences } from '../../../lib/content';
import { PropertyCard, SaveButton } from '../../../components/property-card';
import { ArrowLink, ExternalLink, Photo } from '../../../components/ui';

export const dynamicParams = false;

export function generateStaticParams() {
  return residences.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: residences.find((h) => h.slug === slug)?.address || 'Property reference' };
}

export default async function ResidencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const h = residences.find((x) => x.slug === slug);
  if (!h) notFound();
  const others = residences.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      <nav className="shell breadcrumbs" aria-label="Breadcrumb">
        <Link href="/homes/">Portfolio</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{h.city}</span>
      </nav>

      <header className="shell residence-head">
        <div>
          <p className="meta">
            {h.city}, Florida · {h.type}
          </p>
          <h1>{h.address}</h1>
        </div>
        <div className="residence-head__price">
          <p className="price price--large">{money(h.price)}</p>
          <p className="meta">Recorded sale price</p>
        </div>
      </header>

      <figure className="shell plate plate--residence">
        <div className="plate__frame" style={{ maxWidth: photos[h.image].width }}>
          <Photo name={h.image} eager sizes="(min-width: 1360px) 1360px, 100vw" alt={`${h.address}, ${h.city}`} />
          <SaveButton slug={h.slug} className="save-button--overlay" />
        </div>
        <figcaption className="plate__caption">
          <span>Photo: Compass</span>
          <span>Past transaction · Not a current listing</span>
        </figcaption>
      </figure>

      <section className="shell section residence-body">
        <div className="residence-body__main">
          <p className="lede">{h.description}</p>
          <dl className="facts">
            <div>
              <dt>Bedrooms</dt>
              <dd>{h.beds}</dd>
            </div>
            <div>
              <dt>Bathrooms</dt>
              <dd>{h.baths}</dd>
            </div>
            <div>
              <dt>Interior</dt>
              <dd>{area(h.sqft)}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{h.type}</dd>
            </div>
            <div>
              <dt>City</dt>
              <dd>{h.city}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Past transaction</dd>
            </div>
          </dl>
          <ExternalLink href={h.source}>View the original Compass record</ExternalLink>
        </div>

        <aside className="panel residence-body__aside" aria-labelledby="similar-title">
          <h2 id="similar-title">Looking for something similar?</h2>
          <p>This home is shown as a past transaction. Tell Cintia what you liked about it and ask about current possibilities.</p>
          <Link className="btn" href={`/contact/?intent=Buy&property=${h.slug}`}>
            Ask about similar homes
          </Link>
          <p className="fine-print">Property details are historical, sourced from Compass, and subject to independent verification.</p>
        </aside>
      </section>

      <section className="shell section" aria-labelledby="more-title">
        <header className="section-head">
          <h2 id="more-title">More from the portfolio</h2>
          <ArrowLink href="/homes/">Full portfolio</ArrowLink>
        </header>
        <div className="card-grid">
          {others.map((x) => (
            <PropertyCard home={x} key={x.slug} />
          ))}
        </div>
      </section>
    </>
  );
}
