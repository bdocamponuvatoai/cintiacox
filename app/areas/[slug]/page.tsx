import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { areas, photos } from '../../../lib/content';
import { AreaCard, ArrowLink, ContactCTA, ExternalLink, Photo } from '../../../components/ui';

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: areas.find((a) => a.slug === slug)?.name || 'Area guide' };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = areas.find((x) => x.slug === slug);
  if (!a) notFound();
  const others = areas.filter((x) => x.slug !== slug);

  return (
    <>
      <nav className="shell breadcrumbs" aria-label="Breadcrumb">
        <Link href="/areas/">Areas</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{a.name}</span>
      </nav>

      <header className="shell area-head">
        <p className="meta">Area guide</p>
        <h1>{a.name}</h1>
        <p className="lede">{a.intro}</p>
      </header>

      <figure className="shell plate plate--area">
        <div className="plate__frame" style={{ maxWidth: photos[a.image].width }}>
          <Photo
            name={a.image}
            eager
            sizes="(min-width: 1360px) 1360px, 100vw"
            alt={a.slug === 'highland-beach' ? `View from a past property transaction in ${a.name}` : a.name}
          />
        </div>
        <figcaption className="plate__caption">
          <span>{a.credit}</span>
          <span>{a.tag}</span>
        </figcaption>
      </figure>

      <section className="shell section area-body">
        <div className="area-body__main">
          <p>{a.details}</p>
          <ul className="ruled-list ruled-list--large">
            {a.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <div className="actions">
            <Link href={`/contact/?intent=Buy&area=${encodeURIComponent(a.name)}`} className="btn">
              Explore {a.name} with Cintia
            </Link>
            <ExternalLink href={a.source}>Visit the official local guide</ExternalLink>
          </div>
        </div>
        <aside className="panel area-body__aside" aria-labelledby="own-title">
          <h2 id="own-title">Make the area your own</h2>
          <p>
            Ask about the specific properties, buildings, amenities, and everyday routes that matter to you. A local
            introduction is a starting point; your priorities shape the search.
          </p>
        </aside>
      </section>

      <section className="shell section section--flush-top" aria-labelledby="others-title">
        <header className="section-head">
          <h2 id="others-title">Other areas</h2>
          <ArrowLink href="/areas/">All area guides</ArrowLink>
        </header>
        <div className="card-grid">
          {others.map((x) => (
            <AreaCard key={x.slug} area={x} sizes="(min-width: 900px) 30vw, (min-width: 600px) 50vw, 100vw" />
          ))}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
