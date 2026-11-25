import Link from 'next/link';
import { advisor } from '../lib/content';
import { CompassLogo } from './ui';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__top">
          <div className="site-footer__identity">
            <Link href="/" className="site-footer__name" aria-label="Cintia Cox, home">
              Cintia Cox
            </Link>
            <p>
              {advisor.role}
              <br />
              Boca Raton and the Palm Beaches
            </p>
            <CompassLogo />
          </div>

          <nav className="site-footer__col" aria-label="Explore">
            <h2>Explore</h2>
            <Link href="/homes/">Portfolio</Link>
            <Link href="/areas/">Areas</Link>
            <Link href="/relocate/">Relocating</Link>
            <Link href="/sell/">Selling</Link>
            <Link href="/plan/">Move plan</Link>
          </nav>

          <nav className="site-footer__col" aria-label="More">
            <h2>More</h2>
            <Link href="/about/">About Cintia</Link>
            <Link href="/journal/">Journal</Link>
            <Link href="/saved/">Saved homes</Link>
            <Link href="/contact/">Contact</Link>
          </nav>

          <div className="site-footer__col">
            <h2>Contact</h2>
            <a href={`tel:${advisor.tel}`}>{advisor.phone}</a>
            <a href={`mailto:${advisor.email}`}>{advisor.email}</a>
            <p>{advisor.languages.join(' · ')}</p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Cintia Cox</span>
          <Link href="/privacy/">Privacy</Link>
          <Link href="/accessibility/">Accessibility</Link>
          <a href={advisor.profile} target="_blank" rel="noreferrer">
            Compass profile
          </a>
          <span>Equal Housing Opportunity</span>
          <span>Design concept by Nuvato</span>
        </div>

        <p className="site-footer__disclosure">
          Private design concept for Cintia Cox at Compass. Property examples are past transactions from her Compass
          profile, not current listings. Information is provided for reference and should be independently verified.
          Cintia’s portrait and the property photographs are original source images; area photographs are credited where
          they appear. This preview prepares inquiries without sending them automatically. No MLS/IDX feed is connected.
        </p>
      </div>
    </footer>
  );
}
