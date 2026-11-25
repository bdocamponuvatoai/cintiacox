import type { Metadata } from 'next';
import { PageIntro } from '../../components/ui';
import { advisor } from '../../lib/content';

export const metadata: Metadata = { title: 'Accessibility' };

export default function Accessibility() {
  return (
    <>
      <PageIntro title="Accessibility" meta="A site for everyone">
        <p className="lede">
          This website concept uses keyboard-accessible controls, visible focus indicators, labeled form fields,
          responsive layouts, descriptive image text, and reduced-motion support.
        </p>
      </PageIntro>
      <div className="shell section section--flush-top">
        <div className="prose legal">
          <h2>Need help with something?</h2>
          <p>
            If you have difficulty using a page or control, contact Cintia at{' '}
            <a href={`tel:${advisor.tel}`}>{advisor.phone}</a> or <a href={`mailto:${advisor.email}`}>{advisor.email}</a>
            . Include the page and the assistance you need.
          </p>
          <h2>Ongoing review</h2>
          <p>
            Accessibility is an ongoing process. This concept has been checked for common interface and navigation
            issues, but no formal accessibility certification is claimed.
          </p>
        </div>
      </div>
    </>
  );
}
