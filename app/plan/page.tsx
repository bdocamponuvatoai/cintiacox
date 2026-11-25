import type { Metadata } from 'next';
import { Planner } from '../../components/planner';

export const metadata: Metadata = { title: 'Your Florida move plan' };

export default function Plan() {
  return (
    <div className="section section--tight">
      <Planner />
    </div>
  );
}
