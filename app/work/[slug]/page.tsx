import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudy from '@/components/case/CaseStudy';
import { getProject, projects } from '@/content/projects';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const title = (name: string) => name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\b(Ai|Nft|Zkop|Vion|Veyro)\b/g, (w) => w.toUpperCase());

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: `${title(p.name)} ${p.kind === 'concept' ? 'concept' : 'case study'} | Umar Ali Butt`,
    description: p.tagline,
    openGraph: { images: [p.cover] },
  };
}

export default async function Page({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  return <CaseStudy project={p} />;
}
