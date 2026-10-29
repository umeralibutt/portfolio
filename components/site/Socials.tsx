import { site } from '@/lib/data';

// Brand marks exported from Figma (nav "Socials" 214:11311), all drawn on a 28px grid.
// "fill" marks are the circle itself (their colour is the mark); the rest sit on a coloured circle.
const marks = {
  dribbble: {
    label: 'Dribbble', fill: true, bg: 'transparent', color: 'text-[#E74D89]',
    paths: [{ d: 'M14 0.929688C21.2187 0.929688 27.0594 6.77031 27.0594 13.9781C27.0594 21.1859 21.2187 27.0375 14 27.0375C6.78125 27.0375 0.940622 21.1969 0.940622 13.9891C0.940622 6.78125 6.78125 0.929688 14 0.929688Z' }, { d: 'M14 27.9672C6.27813 27.9672 0 21.7 0 13.9891C0 6.26719 6.27813 0 14 0C21.7219 0 28 6.26719 28 13.9781C28 21.6891 21.7219 27.9672 14 27.9672ZM25.8016 15.8922C25.3969 15.7609 22.1047 14.7875 18.3531 15.3781C19.9172 19.6656 20.5516 23.1656 20.6719 23.8875C23.3625 22.0828 25.2766 19.2172 25.8016 15.8922ZM18.6703 24.9922C18.4953 23.9422 17.7953 20.2891 16.1219 15.9359C16.1 15.9469 16.0672 15.9578 16.0453 15.9578C9.29687 18.3094 6.87969 22.9797 6.66094 23.4172C8.68438 24.9922 11.2328 25.9328 14 25.9328C15.6516 25.9438 17.2375 25.6047 18.6703 24.9922ZM5.11875 21.9844C5.39219 21.525 8.67344 16.1 14.8422 14.0984C14.9953 14.0437 15.1594 14 15.3125 13.9562C15.0172 13.2781 14.6891 12.6 14.3391 11.9328C8.36719 13.7156 2.57031 13.6391 2.04531 13.6281C2.04531 13.7484 2.03438 13.8688 2.03438 13.9891C2.04531 17.0625 3.20469 19.8625 5.11875 21.9844ZM2.29688 11.55C2.83281 11.5609 7.75469 11.5828 13.3547 10.0953C11.375 6.57344 9.23125 3.62031 8.925 3.19375C5.56719 4.76875 3.07344 7.85312 2.29688 11.55ZM11.2 2.38437C11.5281 2.82187 13.7047 5.775 15.6625 9.37344C19.9172 7.77656 21.7109 5.37031 21.9297 5.06406C19.8188 3.19375 17.0406 2.05625 14 2.05625C13.0375 2.05625 12.0969 2.17656 11.2 2.38437ZM23.2531 6.44219C23.0016 6.78125 21 9.35156 16.5813 11.1562C16.8547 11.725 17.1281 12.3047 17.3797 12.8844C17.4672 13.0922 17.5547 13.3 17.6422 13.4969C21.6234 12.9938 25.5719 13.8031 25.9656 13.8797C25.9328 11.0688 24.9266 8.47656 23.2531 6.44219Z', fill: '#B2215A' }],
  },
  behance: {
    label: 'Behance', fill: false, bg: '#000', color: 'text-white',
    paths: [{ d: 'M14.6667 1.33333H10V0H14.6667V1.33333ZM15.8173 8C15.5227 8.86467 14.4647 10 12.4167 10C10.3673 10 8.70733 8.84733 8.70733 6.21667C8.70733 3.61 10.2573 2.27 12.3513 2.27C14.406 2.27 15.6607 3.458 15.9347 5.22067C15.9867 5.558 16.0073 6.01267 15.998 6.64733H10.6467C10.7333 8.788 12.9687 8.85533 13.7053 8H15.8173ZM10.6933 5.33333H14.0033C13.9333 4.302 13.246 3.854 12.352 3.854C11.3747 3.854 10.834 4.366 10.6933 5.33333ZM4.31067 9.992H0V0.0139999H4.63533C8.286 0.0679999 8.35533 3.64333 6.44867 4.618C8.756 5.458 8.83333 9.992 4.31067 9.992ZM2 4H4.38933C6.06133 4 6.32667 2 4.18133 2H2V4ZM4.26067 6H2V8.01067H4.22733C6.264 8.01067 6.13933 6 4.26067 6Z', transform: 'translate(6 9.83)' }],
  },
  linkedin: {
    label: 'LinkedIn', fill: false, bg: '#0076B2', color: 'text-white',
    paths: [{ d: 'M7.23072 11.6522H10.1323V21H7.23072V11.6522ZM8.68231 7C9.0151 7 9.34042 7.09883 9.61711 7.28399C9.8938 7.46915 10.1094 7.73231 10.2367 8.0402C10.364 8.34808 10.3972 8.68684 10.3322 9.01363C10.2671 9.34042 10.1067 9.64056 9.87131 9.87607C9.63588 10.1116 9.33597 10.2719 9.00953 10.3367C8.68309 10.4015 8.34478 10.3679 8.03741 10.2402C7.73003 10.1124 7.4674 9.89629 7.28274 9.61908C7.09808 9.34186 6.99968 9.01604 7 8.68282C7.00043 8.23636 7.17786 7.80833 7.4933 7.49279C7.80875 7.17725 8.23641 7 8.68231 7ZM11.9524 11.6522H14.7338V12.9356H14.7723C15.16 12.2009 16.1053 11.426 17.5168 11.426C20.4553 11.4196 21 13.3559 21 15.8665V21H18.0984V16.452C18.0984 15.3692 18.0792 13.9751 16.5908 13.9751C15.1023 13.9751 14.8492 15.1558 14.8492 16.3815V21H11.9524V11.6522Z' }],
  },
} as const satisfies Record<string, { label: string; fill: boolean; bg: string; color: string; paths: readonly { d: string; fill?: string; transform?: string }[] }>;

type Network = keyof typeof marks;

export const socialLinks: { key: Network; href: string; label: string }[] = (
  [['dribbble', site.links.dribbble], ['behance', site.links.behance], ['linkedin', site.links.linkedin]] as [Network, string][]
)
  .filter(([, href]) => href)
  .map(([key, href]) => ({ key, href, label: marks[key].label }));

/** Brand circles. Hovering the parent link turns the circle (or, for fill marks, the mark) orange. */
export function SocialCircle({ network, size = 28, className = '' }: { network: Network; size?: number; className?: string }) {
  const m = marks[network];
  const hover = m.fill ? 'group-hover:text-orange group-focus-visible:text-orange' : 'group-hover:bg-orange! group-focus-visible:bg-orange!';
  return (
    <span
      className={`block overflow-hidden rounded-full transition-[background-color,translate,color] duration-300 ease-brand ${m.color} ${hover} ${className}`}
      style={{ width: size, height: size, background: m.bg }}
    >
      <svg width={size} height={size} viewBox="0 0 28 28" overflow="visible" aria-hidden="true">
        {m.paths.map((p) => <path key={p.d.slice(0, 12)} d={p.d} fill={'fill' in p ? p.fill : 'currentColor'} transform={'transform' in p ? p.transform : undefined} />)}
      </svg>
    </span>
  );
}

export default function Socials({ size = 28 }: { size?: number }) {
  return (
    <ul className="flex items-center gap-2.5">
      {socialLinks.map((s) => (
        <li key={s.key}>
          <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="group block rounded-full">
            <SocialCircle network={s.key} size={size} className="group-hover:-translate-y-0.5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
