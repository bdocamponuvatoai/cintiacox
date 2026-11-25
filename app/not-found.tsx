import Link from 'next/link';
import { ArrowLink } from '../components/ui';

export default function NotFound() {
  return (
    <section className="shell not-found">
      <p className="meta">Page not found</p>
      <h1>This page isn’t part of the site.</h1>
      <p className="lede">The address may have changed. The portfolio and area guides are a good place to continue.</p>
      <div className="actions">
        <Link className="btn" href="/">
          Return home
        </Link>
        <ArrowLink href="/homes/">View the portfolio</ArrowLink>
        <ArrowLink href="/areas/">Area guides</ArrowLink>
      </div>
    </section>
  );
}
