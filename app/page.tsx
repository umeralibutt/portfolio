import Hero from '@/components/home/Hero';
import TrustStrip from '@/components/home/TrustStrip';
import SelectedWork from '@/components/home/SelectedWork';
import TwoWaysIn from '@/components/home/TwoWaysIn';
import Marquee from '@/components/home/Marquee';
import AboutTeaser from '@/components/home/AboutTeaser';
import Wrapped from '@/components/home/Wrapped';
import HowIWork from '@/components/home/HowIWork';
import MoreBangers from '@/components/home/MoreBangers';
import DesignCrimes from '@/components/home/DesignCrimes';
import PlaygroundStrip from '@/components/home/PlaygroundStrip';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <SelectedWork />
      <TwoWaysIn />
      <Marquee />
      <AboutTeaser />
      <Wrapped />
      <HowIWork />
      <MoreBangers />
      <DesignCrimes />
      <PlaygroundStrip />
    </>
  );
}
