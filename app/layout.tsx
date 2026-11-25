import type { Metadata, Viewport } from 'next';
import { Hanken_Grotesk, Newsreader } from 'next/font/google';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { ExperienceProvider } from '../components/experience';
import './globals.css';

const serif = Newsreader({
  subsets: ['latin'],
  axes: ['opsz'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Cintia Cox · Real estate in Boca Raton and the Palm Beaches',
    template: '%s | Cintia Cox · Compass',
  },
  description:
    'A personal approach to real estate in Boca Raton and the Palm Beaches. Explore Florida living with Cintia Cox at Compass, in English, Spanish, and Portuguese.',
  robots: { index: false, follow: false },
  icons: { icon: '/brand/icon.svg' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#ffffff' };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <ExperienceProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </ExperienceProvider>
      </body>
    </html>
  );
}
