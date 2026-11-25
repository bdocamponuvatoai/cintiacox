'use client';
import Link from 'next/link';
import { area, money, type Residence } from '../lib/content';
import { useExperience } from './experience';
import { HeartIcon } from './icons';
import { Photo } from './ui';

export function SaveButton({ slug, className = '' }: { slug: string; className?: string }) {
  const { saved, toggle, ready } = useExperience();
  const active = saved.includes(slug);
  return (
    <button
      type="button"
      disabled={!ready}
      className={`save-button ${className}`}
      aria-label={active ? 'Remove from saved homes' : 'Save property reference'}
      aria-pressed={active}
      onClick={() => toggle(slug)}
    >
      <HeartIcon size={20} filled={active} />
    </button>
  );
}

export function Specs({ home: h }: { home: Residence }) {
  return (
    <p className="specs">
      {h.beds}&nbsp;beds<span aria-hidden="true"> · </span>
      {h.baths}&nbsp;baths<span aria-hidden="true"> · </span>
      {area(h.sqft)}
    </p>
  );
}

export function PropertyCard({ home: h }: { home: Residence }) {
  return (
    <article className="property-card">
      <div className="property-card__frame">
        <Link href={`/homes/${h.slug}/`} tabIndex={-1} aria-hidden="true">
          <Photo name={h.image} alt="" sizes="(min-width: 900px) 30vw, (min-width: 600px) 50vw, 100vw" />
        </Link>
        <SaveButton slug={h.slug} className="save-button--overlay" />
      </div>
      <p className="meta">
        {h.city} · {h.type}
      </p>
      <h3 className="property-card__title">
        <Link href={`/homes/${h.slug}/`}>{h.address}</Link>
      </h3>
      <Specs home={h} />
      <p className="property-card__price">
        <span className="price">{money(h.price)}</span>
        <span className="meta">Recorded sale price · Past transaction</span>
      </p>
    </article>
  );
}
