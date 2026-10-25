import type { Metadata } from 'next';
import WorkIndex from '@/components/work/WorkIndex';

export const metadata: Metadata = {
  title: 'All work — Umar Ali Butt',
  description: '10 shipped products and 7 concepts — fintech, crypto & Web3 and AI products designed by Umar Ali Butt.',
};

export default function WorkPage() {
  return <WorkIndex />;
}
