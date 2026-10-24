import { GeistSans } from 'geist/font/sans';
import '@fontsource/silkscreen/700.css';
import '@fontsource/caveat/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';
import '@fontsource/unbounded/700.css';
import './legacy.css';

// Old "notebook" pages, kept working until each is rebuilt in the new direction.
export default function LegacyLayout({ children }: { children: React.ReactNode }) {
  return <div className={`legacy-root ${GeistSans.variable}`}>{children}</div>;
}
