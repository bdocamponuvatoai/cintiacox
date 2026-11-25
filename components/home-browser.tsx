'use client';
import Link from 'next/link';
import { useState } from 'react';
import { residences } from '../lib/content';
import { useExperience } from './experience';
import { SearchIcon } from './icons';
import { PropertyCard } from './property-card';

export function HomeBrowser({ savedOnly = false }: { savedOnly?: boolean }) {
  const { saved, ready } = useExperience();
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All homes');
  const [sort, setSort] = useState('featured');

  const list = residences
    .filter(
      (h) =>
        (!savedOnly || saved.includes(h.slug)) &&
        (type === 'All homes' || type === h.type) &&
        `${h.address} ${h.city}`.toLowerCase().includes(query.toLowerCase().trim()),
    )
    .sort((a, b) => (sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : 0));

  const count =
    !savedOnly || ready
      ? `${list.length} ${savedOnly ? 'saved ' : ''}property ${list.length === 1 ? 'reference' : 'references'}`
      : 'Loading your saved homes…';

  return (
    <div className="browser">
      {!savedOnly && (
        <div className="toolbar">
          <label className="toolbar__search">
            <SearchIcon size={20} />
            <input
              aria-label="Search past properties"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a place or address"
            />
          </label>
          <label className="toolbar__field">
            <span>Property type</span>
            <select aria-label="Property type" value={type} onChange={(e) => setType(e.target.value)}>
              <option>All homes</option>
              <option>House</option>
              <option>Condominium</option>
            </select>
          </label>
          <label className="toolbar__field">
            <span>Sort by</span>
            <select aria-label="Sort properties" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Selected properties</option>
              <option value="high">Recorded price: high to low</option>
              <option value="low">Recorded price: low to high</option>
            </select>
          </label>
        </div>
      )}

      <div className="results-bar">
        <p aria-live="polite">{count}</p>
        <span>Past transactions · Not currently offered</span>
      </div>

      {list.length ? (
        <div className="card-grid">
          {list.map((h) => (
            <PropertyCard key={h.slug} home={h} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>{savedOnly ? 'No saved homes yet.' : 'No matching property references.'}</h2>
          <p>
            {savedOnly
              ? 'Save the past properties that catch your eye. Share what you like with Cintia to shape a current search.'
              : 'Try another place or property type, or ask Cintia about your current search.'}
          </p>
          {savedOnly ? (
            <Link className="btn" href="/homes/">
              Explore the portfolio
            </Link>
          ) : (
            <button
              type="button"
              className="btn"
              onClick={() => {
                setQuery('');
                setType('All homes');
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {savedOnly && list.length > 0 && (
        <div className="panel saved-next">
          <div>
            <h2>Share your saved homes with Cintia</h2>
            <p>Share these references with Cintia to discuss similar possibilities.</p>
          </div>
          <Link className="btn" href="/contact/?intent=Buy&include=saved">
            Discuss my saved homes
          </Link>
        </div>
      )}
    </div>
  );
}
