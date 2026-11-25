import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowIcon } from '../../components/icons';
import { ContactCTA, PageIntro } from '../../components/ui';
import { guides } from '../../lib/content';

export const metadata: Metadata = { title: 'The Florida journal' };

export default function Journal() {
  return (
    <>
      <PageIntro title="Journal" meta="Notes for buyers, sellers and new arrivals">
        <p className="lede">Starting points for buying, selling, and making Florida feel like home.</p>
      </PageIntro>

      <section className="shell section section--flush-top">
        <ol className="entries">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link href={`/journal/${g.slug}/`} className="entry">
                <span className="entry__category">{g.category}</span>
                <span className="entry__title">{g.title}</span>
                <span className="entry__description">{g.description}</span>
                <span className="entry__read">
                  {g.read}
                  <ArrowIcon size={18} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <ContactCTA />
    </>
  );
}
