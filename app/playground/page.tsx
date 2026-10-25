import type { Metadata } from 'next';
import PlaygroundCanvas from '@/components/playground/PlaygroundCanvas';

export const metadata: Metadata = {
  title: 'Playground — Umar Ali Butt',
  description: 'Concepts & side quests — crypto wallets, trading dashboards, AI landing pages and more, designed for fun.',
};

export default function PlaygroundPage() {
  return (
    <div className="bg-bone">
      <PlaygroundCanvas />
    </div>
  );
}
