import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLink, ContactCTA, PageIntro } from '../../components/ui';

export const metadata: Metadata = { title: 'Sell with Cintia' };

const steps: [string, string][] = [
  [
    'Understand the starting point.',
    'Discuss your property, your priorities, and the local market context. Ask about relevant comparable properties and a considered pricing approach.',
  ],
  [
    'Consider the presentation.',
    'Talk through photography, preparation, and the details that help prospective buyers understand your home.',
  ],
  [
    'Agree on the way forward.',
    'Review the proposed marketing, communication, and representation arrangements before deciding on the next step.',
  ],
];

export default function Sell() {
  return (
    <>
      <PageIntro title="Selling your home" meta="Selling">
        <p className="lede">Your home and your goals deserve a conversation before a strategy.</p>
        <p>Share what you want to achieve, your preferred timing, and what makes your property distinctive.</p>
        <Link className="btn" href="/contact/?intent=Sell">
          Discuss your property
        </Link>
      </PageIntro>

      <section className="shell section section--flush-top" aria-labelledby="steps-title">
        <header className="section-head">
          <h2 id="steps-title">How it starts</h2>
          <p>Three conversations to have before a home goes to market.</p>
        </header>
        <ol className="steps">
          {steps.map(([title, text], i) => (
            <li key={title}>
              <span className="steps__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell section section--flush-top">
        <div className="panel panel--wide">
          <div>
            <h2>Thinking about a sale?</h2>
            <p>
              No automated estimate can replace a conversation about your specific property. Tell Cintia a little about
              your home and request a personal discussion.
            </p>
          </div>
          <div className="actions">
            <Link className="btn" href="/contact/?intent=Sell">
              Request a seller conversation
            </Link>
            <ArrowLink href="/journal/selling-with-intention/">Read: a clear plan for selling</ArrowLink>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
