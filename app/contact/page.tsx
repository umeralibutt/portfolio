import type { Metadata } from 'next';
import ContactPage from '@/components/contact/ContactPage';

export const metadata: Metadata = {
  title: 'Contact | Umar Ali Butt',
  description: 'Got a product that needs fixing? Tell Umar what you’re making and he’ll reply fast. Like, suspiciously fast.',
};

export default function Page() {
  return <ContactPage />;
}
