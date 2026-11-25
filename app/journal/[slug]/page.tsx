import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContactCTA, Photo } from '../../../components/ui';
import { guides } from '../../../lib/content';
import { articles } from '../../../lib/journal';

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: guides.find((g) => g.slug === slug)?.title || 'Journal' };
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (!g) notFound();
  const selling = slug === 'selling-with-intention';

  return (
    <>
      <article className="article">
        <nav className="shell breadcrumbs" aria-label="Breadcrumb">
          <Link href="/journal/">Journal</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{g.category}</span>
        </nav>

        <header className="shell article__head">
          <p className="meta">
            {g.category} · {g.read}
          </p>
          <h1>{g.title}</h1>
          <p className="lede">{g.description}</p>
        </header>

        {g.image && (
          <figure className="shell plate plate--area article__image">
            <div className="plate__frame" style={{ maxWidth: g.image.width }}>
              <Photo name={g.image.src} eager sizes="(min-width: 1360px) 1360px, 100vw" alt={g.image.alt} />
            </div>
            <figcaption className="plate__caption">
              <span>{g.image.credit}</span>
            </figcaption>
          </figure>
        )}

        <div className="shell article__body prose">
          {articles[slug].map((s, i) => (
            <section key={s.title}>
              <span className="article__num">{String(i + 1).padStart(2, '0')}</span>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </section>
          ))}
          <p className="fine-print">General conversation prompts, not legal, tax, financing, or property-specific advice.</p>
          <Link className="btn" href={selling ? '/contact/?intent=Sell' : '/plan/'}>
            {selling ? 'Discuss your home' : 'Create your move plan'}
          </Link>
        </div>
      </article>

      <ContactCTA />
    </>
  );
}
