import type { Metadata } from 'next';
import Link from 'next/link';
import { HomeBrowser } from '../../components/home-browser';
import { ContactCTA, ExternalLink, PageIntro } from '../../components/ui';
import { advisor } from '../../lib/content';

export const metadata: Metadata = { title: 'Property portfolio' };

export default function Homes() {
  return (
    <>
      <PageIntro title="Portfolio" meta="Past transactions">
        <p className="lede">
          Selected properties from Cintia’s Compass transaction history. Save the ones you like, then ask about what is
          available today.
        </p>
        <ExternalLink href={advisor.profile}>View Cintia’s current Compass profile</ExternalLink>
      </PageIntro>

      <section className="shell section section--flush-top">
        <HomeBrowser />
        <p className="fine-print section-note">
          Historical sale figures and property details are sourced from Compass and are not current asking prices. This
          preview does not contain a live MLS or IDX feed.{' '}
          <Link href="/contact/?intent=Buy">Request a current property search.</Link>
        </p>
      </section>

      <ContactCTA />
    </>
  );
}
