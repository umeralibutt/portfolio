import Hero from '@/components/home/Hero';
import Marquee from '@/components/home/Marquee';
import SelectedWork from '@/components/home/SelectedWork';
import AboutTeaser from '@/components/home/AboutTeaser';
import MoreBangers from '@/components/home/MoreBangers';
import HowIWork from '@/components/home/HowIWork';
import Receipt from '@/components/home/Receipt';
import DesignCrimes from '@/components/home/DesignCrimes';
import PlaygroundStrip from '@/components/home/PlaygroundStrip';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <SelectedWork />
      <AboutTeaser />
      <MoreBangers />
      <HowIWork />
      <Receipt />
      <DesignCrimes />
      <PlaygroundStrip />
    </>
  );
}
