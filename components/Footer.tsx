import { Socials } from './Nav';
import { site } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-in">
        <span>© 2026 {site.name}</span>
        <span className="lime">Made with too much coffee in Islamabad</span>
        <Socials size={22} />
      </div>
    </footer>
  );
}
