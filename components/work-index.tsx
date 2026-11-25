'use client';
import Link from 'next/link';
import { useState } from 'react';
import { money, type Residence } from '../lib/content';
import { Specs } from './property-card';
import { Photo } from './ui';

/**
 * The portfolio as a typographic index. On wide screens, hovering or focusing an
 * address shows its photo in the plate beside the list. On narrow screens each
 * row carries its own thumbnail. Photos load only once a row has been shown.
 */
export function WorkIndex({ homes }: { homes: Residence[] }) {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState<Set<number>>(() => new Set([0]));
  const current = homes[active];

  function show(i: number) {
    setActive(i);
    setShown((s) => (s.has(i) ? s : new Set(s).add(i)));
  }

  return (
    <div className="work-index">
      <figure className="work-index__stage" aria-hidden="true">
        <div className="work-index__frame">
          {homes.map((h, i) =>
            shown.has(i) ? (
              <Photo
                key={h.slug}
                name={h.image}
                alt=""
                sizes="(min-width: 1080px) 40vw, 1px"
                className={i === active ? 'is-active' : undefined}
              />
            ) : null,
          )}
        </div>
        <figcaption className="work-index__caption">
          <span>{current.city}</span>
          <Specs home={current} />
        </figcaption>
      </figure>

      <ol className="work-index__list">
        {homes.map((h, i) => (
          <li key={h.slug}>
            <Link
              href={`/homes/${h.slug}/`}
              className="work-row"
              data-active={i === active || undefined}
              onMouseEnter={() => show(i)}
              onFocus={() => show(i)}
            >
              <span className="work-row__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="work-row__thumb">
                <Photo name={h.image} alt="" sizes="(min-width: 1080px) 1px, 112px" />
              </span>
              <span className="work-row__address">{h.address}</span>
              <span className="work-row__city">
                {h.city} · {h.type}
              </span>
              <span className="work-row__price">{money(h.price)}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
