import Link from 'next/link';
import { advisor, type Area } from '../lib/content';
import { ArrowIcon, ExternalIcon } from './icons';
import { Photo } from './photo';

export function Meta({ children }: { children: React.ReactNode }) {
  return <p className="meta">{children}</p>;
}

export function Wordmark() {
  return <span className="wordmark">Cintia Cox</span>;
}

export function CompassLogo({ className = '' }: { className?: string }) {
  return (
    <img className={`compass-logo ${className}`} src="/brand/compass.svg" alt="Compass" width={112} height={16} />
  );
}

export { Photo } from './photo';

export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="arrow-link">
      <span>{children}</span>
      <ArrowIcon size={18} />
    </Link>
  );
}

export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="arrow-link" target="_blank" rel="noreferrer">
      <span>{children}</span>
      <ExternalIcon size={18} />
    </a>
  );
}

export function AreaCard({
  area: a,
  eager = false,
  sizes = '(min-width: 900px) 25vw, (min-width: 480px) 50vw, 100vw',
}: {
  area: Area;
  eager?: boolean;
  sizes?: string;
}) {
  return (
    <Link href={`/areas/${a.slug}/`} className="area-card">
      <span className="area-card__frame">
        <Photo
          name={a.image}
          eager={eager}
          sizes={sizes}
          alt={a.slug === 'highland-beach' ? `View from a past property transaction in ${a.name}` : a.name}
        />
      </span>
      <span className="area-card__name">{a.name}</span>
      <span className="area-card__tag">{a.tag}</span>
    </Link>
  );
}

export function FAQ({ items }: { items: [string, string][] }) {
  return (
    <div className="faq">
      {items.map(([q, a]) => (
        <details key={q}>
          <summary>
            <span>{q}</span>
            <span className="faq__mark" aria-hidden="true" />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}

export function ContactCTA() {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="shell closing__grid">
        <h2 id="closing-title" className="closing__title">
          Talk to Cintia
        </h2>
        <div className="closing__body">
          <p>Tell her what you are looking for, what you want to sell, or where you are moving from.</p>
          <a className="closing__phone" href={`tel:${advisor.tel}`}>
            {advisor.phone}
          </a>
          <a className="closing__email" href={`mailto:${advisor.email}`}>
            {advisor.email}
          </a>
          <Link href="/contact/" className="btn">
            Send a message
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PageIntro({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="shell page-intro">
      {meta && <p className="meta">{meta}</p>}
      <h1>{title}</h1>
      {children && <div className="page-intro__body">{children}</div>}
    </header>
  );
}
