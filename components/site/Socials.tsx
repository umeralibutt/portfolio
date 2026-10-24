import { site } from '@/lib/data';

// Official marks (Simple Icons, CC0), drawn white on brand-coloured circles.
const marks = {
  dribbble: {
    label: 'Dribbble', bg: '#EA4C89',
    d: 'M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z',
    scale: 1,
  },
  behance: {
    label: 'Behance', bg: '#0E0D0C',
    d: 'M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM6.545 10.16c.6 0 1.08-.14 1.45-.42.37-.28.55-.735.55-1.36 0-.35-.06-.63-.18-.86-.12-.23-.29-.41-.5-.54-.21-.13-.45-.22-.72-.27-.27-.05-.56-.07-.85-.07H3.35v3.52h3.195zm.18 5.97c.32 0 .63-.03.92-.09.29-.06.55-.16.77-.31.22-.14.39-.34.52-.59.13-.25.19-.57.19-.96 0-.77-.22-1.32-.65-1.65-.43-.33-1-.49-1.71-.49H3.35v4.09h3.375zM16.5 15.29c.43.42 1.05.63 1.86.63.58 0 1.08-.15 1.5-.44.42-.29.67-.6.77-.93h2.53c-.41 1.26-1.03 2.16-1.87 2.7-.84.54-1.85.81-3.04.81-.82 0-1.56-.13-2.22-.39-.66-.26-1.22-.63-1.68-1.11-.46-.48-.81-1.05-1.06-1.72-.25-.67-.37-1.4-.37-2.2 0-.77.13-1.49.38-2.15.25-.67.61-1.24 1.07-1.73.46-.49 1.02-.87 1.67-1.15.65-.28 1.36-.42 2.15-.42.88 0 1.65.17 2.3.51.65.34 1.19.8 1.61 1.38.42.58.72 1.24.91 1.98.19.74.25 1.51.2 2.32h-7.55c0 .82.28 1.59.71 2.01zm3.3-5.49c-.34-.37-.92-.57-1.6-.57-.45 0-.82.08-1.11.23-.29.15-.53.34-.71.56-.18.22-.3.46-.37.71-.07.25-.11.47-.12.67h4.68c-.07-.73-.31-1.24-.65-1.61zM15.12 5.33h5.83v1.42h-5.83z',
    scale: 0.62,
  },
  linkedin: {
    label: 'LinkedIn', bg: '#0A66C2',
    d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z',
    scale: 0.56,
  },
  upwork: {
    label: 'Upwork', bg: '#0E0D0C',
    d: 'M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z',
    scale: 0.66,
  },
} as const;

type Network = keyof typeof marks;

export const socialLinks: { key: Network; href: string; label: string }[] = (
  [['dribbble', site.links.dribbble], ['behance', site.links.behance], ['linkedin', site.links.linkedin], ['upwork', site.links.upwork]] as [Network, string][]
)
  .filter(([, href]) => href)
  .map(([key, href]) => ({ key, href, label: marks[key].label }));

/**
 * Brand circles. Dribbble's mark is itself the ball (its seams are gaps in the path), so it fills
 * the circle edge to edge and a darker pink behind it shows through as the seams.
 */
export function SocialCircle({ network, size = 28, className = '' }: { network: Network; size?: number; className?: string }) {
  const m = marks[network];
  const ball = network === 'dribbble';
  const inner = ball ? size : size * m.scale;
  return (
    <span
      className={`grid place-items-center rounded-full transition-[background-color,translate,color] duration-300 ease-brand ${ball ? 'text-[#EA4C89] group-hover:text-orange' : 'text-white'} ${className}`}
      style={{ width: size, height: size, background: ball ? '#B8255F' : m.bg }}
    >
      <svg width={inner} height={inner} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={m.d} /></svg>
    </span>
  );
}

export default function Socials({ size = 28 }: { size?: number }) {
  return (
    <ul className="flex items-center gap-2.5">
      {socialLinks.map((s) => (
        <li key={s.key}>
          <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="group block rounded-full">
            {/* Inline brand colour needs !important to give way to the orange hover. */}
            <SocialCircle network={s.key} size={size} className="group-hover:-translate-y-0.5 group-hover:bg-orange! group-focus-visible:bg-orange!" />
          </a>
        </li>
      ))}
    </ul>
  );
}
