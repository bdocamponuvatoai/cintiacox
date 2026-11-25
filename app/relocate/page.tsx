import type { Metadata } from 'next';
import Link from 'next/link';
import { LanguageNote } from '../../components/language-note';
import { ContactCTA, FAQ, PageIntro } from '../../components/ui';
import { faqs } from '../../lib/content';

export const metadata: Metadata = { title: 'Relocate to Florida' };

const steps: [string, string][] = [
  [
    'Begin with your everyday.',
    'Tell Cintia about the kind of home, setting, and daily routine you’re looking for. Your priorities give the search its direction.',
  ],
  [
    'Explore with local context.',
    'Compare areas and individual properties. Ask about viewing options and communication that work across time zones.',
  ],
  [
    'Bring the right people into the conversation.',
    'For questions about financing, tax, residency, or legal requirements, consult the relevant qualified professionals alongside your real estate search.',
  ],
  [
    'Move at a pace that makes sense.',
    'Whether you’re visiting soon or looking further ahead, agree on next steps and keep the conversation connected to your timeline.',
  ],
];

export default function Relocate() {
  return (
    <>
      <PageIntro title="Moving to Florida" meta="Relocating">
        <p className="lede">
          A move across the country, or across the world, starts with understanding what matters to you.
        </p>
        <Link className="btn" href="/plan/?intent=Relocate">
          Build your move plan
        </Link>
        <p className="fine-print">A simple planning tool. No account or commitment needed.</p>
      </PageIntro>

      <section className="shell section section--flush-top" aria-labelledby="steps-title">
        <header className="section-head">
          <h2 id="steps-title">Planning a move from afar</h2>
          <p>From the first question to the next step.</p>
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

      <LanguageNote />

      <section className="shell section faq-section" aria-labelledby="faq-title">
        <div className="faq-section__head">
          <h2 id="faq-title">Before the move</h2>
          <p>A few things worth settling early.</p>
        </div>
        <FAQ items={faqs} />
      </section>

      <ContactCTA />
    </>
  );
}
