import type { Metadata } from 'next';
import { HomeBrowser } from '../../components/home-browser';
import { PageIntro } from '../../components/ui';

export const metadata: Metadata = { title: 'Your saved homes' };

export default function Saved() {
  return (
    <>
      <PageIntro title="Saved homes" meta="Saved in this browser">
        <p className="lede">Past-property references you’ve saved. Use them to help Cintia understand what you love.</p>
      </PageIntro>
      <section className="shell section section--flush-top">
        <HomeBrowser savedOnly />
        <p className="fine-print section-note">
          Saved in this browser only. These properties are past transactions, not current listings or reserved homes.
        </p>
      </section>
    </>
  );
}
