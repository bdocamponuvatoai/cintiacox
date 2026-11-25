'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { advisor } from '../lib/content';
import { HeartIcon, PhoneIcon } from './icons';
import { CompassLogo, Wordmark } from './ui';
import { useExperience } from './experience';

const nav: [string, string][] = [
  ['Portfolio', '/homes/'],
  ['Areas', '/areas/'],
  ['Relocating', '/relocate/'],
  ['Selling', '/sell/'],
  ['About', '/about/'],
];

const more: [string, string][] = [
  ['Move plan', '/plan/'],
  ['Journal', '/journal/'],
  ['Saved homes', '/saved/'],
  ['Contact', '/contact/'],
];

const DESKTOP = '(min-width: 1080px)';

export function Header() {
  const path = usePathname();
  const { saved } = useExperience();
  // The menu is open only on the path where it was opened, so navigating closes it.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === path;
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenOnPath(null);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia(DESKTOP);
    const onResize = () => desktop.matches && setOpenOnPath(null);
    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    document.documentElement.classList.add('menu-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
      document.documentElement.classList.remove('menu-open');
    };
  }, [open]);

  const current = (url: string) => (path === url || (url !== '/' && path.startsWith(url)) ? 'page' : undefined);

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link className="site-header__brand" href="/" aria-label="Cintia Cox, home">
          <Wordmark />
        </Link>
        <span className="site-header__rule" aria-hidden="true" />
        <CompassLogo className="site-header__compass" />

        <nav className="site-nav" aria-label="Main">
          {nav.map(([label, url]) => (
            <Link key={url} href={url} aria-current={current(url)}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link href="/saved/" className="icon-link" aria-label={`Saved homes, ${saved.length}`}>
            <HeartIcon size={21} filled={saved.length > 0} />
            {saved.length > 0 && <span className="icon-link__count">{saved.length}</span>}
          </Link>
          <a href={`tel:${advisor.tel}`} className="icon-link site-header__call" aria-label={`Call Cintia, ${advisor.phone}`}>
            <PhoneIcon size={21} />
          </a>
          <Link href="/contact/" className="btn btn--small site-header__contact">
            Contact
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpenOnPath(open ? null : path)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open && (
        <div id="site-menu" className="site-menu">
          <nav className="shell site-menu__inner" aria-label="Menu">
            <ul className="site-menu__primary">
              {nav.map(([label, url]) => (
                <li key={url}>
                  <Link href={url} aria-current={current(url)}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="site-menu__secondary">
              {more.map(([label, url]) => (
                <li key={url}>
                  <Link href={url} aria-current={current(url)}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="site-menu__contact">
              <a href={`tel:${advisor.tel}`}>{advisor.phone}</a>
              <a href={`mailto:${advisor.email}`}>{advisor.email}</a>
              <CompassLogo />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
