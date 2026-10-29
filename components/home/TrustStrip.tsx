import { Fragment } from 'react';
import Container from '../site/Container';

const cities = ['DUBAI', 'CANADA', 'USA', 'GERMANY', 'AMSTERDAM'];

/** Figma "Trust strip" 276:24: sits under the hero between hairlines; the cities fade in 80ms apart. */
export default function TrustStrip() {
  return (
    <section aria-label="Worked with teams in" className="border-y border-ink/12 bg-bone py-7">
      <Container className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="font-serif text-[24px] italic leading-[1.375] text-mute">worked with teams in</p>
        <ul data-rows="0.08" className="flex flex-wrap items-center gap-x-[22px] gap-y-2">
          {cities.map((c, i) => (
            <Fragment key={c}>
              {i > 0 && <li aria-hidden="true" className="size-2 rounded-full bg-orange" />}
              <li className="font-display text-[clamp(22px,2.08vw,30px)] leading-none tracking-[0.02em]">{c}</li>
            </Fragment>
          ))}
        </ul>
      </Container>
    </section>
  );
}
