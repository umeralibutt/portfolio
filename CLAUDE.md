# Umar Ali Butt — Portfolio site

Personal portfolio for Umar Ali Butt, product designer (dashboards, fintech, Web3, SaaS) in Islamabad. Goal: win freelance clients **and** full-time roles. The design is final in Figma — build it faithfully, page by page, and let Umar review each page before moving on.

## Working style
- Umar wants **usage-efficient** collaboration: short updates, no long recaps, batch related edits, don't re-read files unnecessarily.
- Build **one page at a time** (Home first), run `npm run dev`, then stop for review.
- Commit with clear messages after each page.

## Stack (already in package.json)
- Next.js 15 (App Router) + React 19 + TypeScript. Plain CSS in `app/globals.css` (no Tailwind) using CSS variables.
- Fonts are **local npm packages** (no Google Fonts network calls):
  - `geist` → Geist Sans (body + headlines) — `import { GeistSans } from 'geist/font/sans'`
  - `@fontsource/silkscreen` (700) → pixel display titles
  - `@fontsource/caveat` (400) → handwritten notes
  - `@fontsource/jetbrains-mono` (500, 700) → mono labels, tabs, tags
  - `@fontsource/unbounded` (700) → the "Umar Ali Butt" wordmark in the nav only
- Deploy: Vercel (free `*.vercel.app` first). Contact form: Formspree via `NEXT_PUBLIC_FORMSPREE_ID` (fall back to a `mailto:` link if unset).

## Data & assets (already in repo)
- `lib/data.ts` — `site` (name, email, links), `projects` (10 main projects, first 4 have `folder` data for the Home stack), `concepts` (7 concept shots), `playShots`.
- `components/icons.tsx` — `<Icon name=…/>` line icons (Lucide-style, 2px rounded stroke) + brand circles `<Dribbble/> <LinkedIn/> <Upwork/>`.
- `public/me.jpg` (Umar's photo), `public/work/*.jpg` (all covers), `public/case/youngs-capital/{cover,ui,branding,flows}.jpg`, `public/play/*.jpg`.
- Figma source of truth: file `9kRAU79oPsK0lj8ZaJZFjY`, Page 7. Frames: Home `122:500`, Work `139:325`, Case Study (Youngs Capital) `148:363`, About `142:325`, Playground `142:541`, Contact `142:793`. Use the Figma MCP (`get_screenshot`) when unsure about a detail.

## Design system — "Notebook / scrapbook"
Warm notebook paper, pixel display type, handwriting, washi tape, polaroids, torn paper tags, sticky notes, stacked file folders. Playful but tidy.

**Colours**
| token | hex | use |
|---|---|---|
| --paper | #FAF8F3 | page background |
| --line | #E6E2D6 | notebook ruled lines |
| --ink | #151515 | text, dark buttons, dark folder |
| --yellow | #F4C542 | active tab, sticky notes, accents |
| --mint | #9BDDB9 | sticky / tags |
| --pink | #F48FB1 | sticky / tags |
| --blue | #2F5BEA | CTA square, blue folder, availability dot |
| --green | #22A861 | tags, candles up |
| --orange | #F06A3C | avatar ring, candles down |
| --lime | #C8F53B | ticker text |
| --tape1 | #A9C3F2 | washi tape (60% opacity) |
| --tape2 | #F3E2A0 | washi tape (60% opacity) |
| muted text | #555 / #666 / #888 |

**Paper**: page background = `--paper` with horizontal ruled lines every **34px** (`repeating-linear-gradient`), 1px `--line`. Sections are full-width paper; content max-width **1280px**, side padding 80px desktop / 20px mobile.

**Type**
- Pixel titles (Silkscreen 700): page titles 96–150px, section titles 72–96px, uppercase, letter-spacing 0.
- Headlines (Geist 600): hero 60px, -2px tracking; big copy 36–40px.
- Body (Geist 400/500): 17–21px, line-height 1.5.
- Handwriting (Caveat 400): notes 24–36px, colour #666, slightly rotated (-2° to -6°). Never use emoji arrows in Caveat (they render as emoji) — use ← → ↓ only, or an inline SVG hand-drawn arrow.
- Mono labels (JetBrains Mono 700): 10–13px, UPPERCASE, letter-spacing 0.8px.

**Components to build (components/)**
- `Nav` — white bar, bottom border `--line`. Left: wordmark "Umar Ali Butt" in Unbounded 700 19px. Tabs (mono 12px uppercase, each with a 15px line icon: home, user, grid, sparkles) — HOME, ABOUT, WORK, PLAYGROUND; active tab has full-height `--yellow` background. Right: Dribbble/LinkedIn/Upwork circles (28px) + outlined "CONTACT" button (1.5px ink border, mail icon). Mobile: wordmark + menu button opening a sheet.
- `Footer` — ink bar: "© 2026 Umar Ali Butt" (mono, white) · "Made with too much coffee in Islamabad" (mono, lime) · social circles 22px.
- `Torn` — paper tag with zig-zag top & bottom edges (CSS mask). Props: colour, text colour. Geist 600.
- `Sticky` — small sticky note, padding 8×14, slight rotation, soft shadow `0 8px 18px rgba(0,0,0,.16)`, text mono or Caveat.
- `Polaroid` — white frame, 10–12px padding, bottom caption in Caveat, two washi tapes at top corners rotated ±28°, rotation prop.
- `Tape` — 90×26 strip, tape colour at 60% opacity.
- `Btn` — ink button: 26px `--blue` square with white ↗ arrow icon + mono white label (e.g. "HIRE ME", "START A PROJECT", "SEND IT").
- `Folder` — file folder card: tab (rounded top 10px, mono "✦ PROJECT 0N", tab takes the folder's own colour) above a 470px body. Body: dot + mono label, title Geist 700 64px, tagline 19px, underlined "VIEW PROJECT ↗", two sticky stats, and a taped screenshot (white 10px border, 1.5° tilt) on the right. Colours: ink (white text), blue (white), mint (ink), yellow (ink).
- `ProjectCard` — white card 400px wide, 14px padding, cover 270px tall, mono "NN · META", Geist 700 30px title, 15px desc (#555, 3 lines max), platform/timeline mini stickies, ↗, washi tape at top, alternate tilt (-1.5°, 1°, -0.6°).
- `TickerCard` — the hero name card: white, 2.5px ink border, black strip on top with mono text "UMAR/DSGN ▲ +5.0Y VOL 08 STATUS: OPEN" (lime/white), "UMAR" in Silkscreen ~156px, six tiny candlesticks bottom-right (green/orange) **not overlapping the R**.

## Pages
**Home (`/`)**
1. Hero (≈920px): "hi, my name is" (Caveat 30) + squiggle underline → TickerCard centred (-1.5°). Around it: stickies "DASHBOARDS & DATA" (mint), "SHIPS, NOT JUST SHOTS" (tape2), "Product Designer" (yellow, Caveat) + hand arrow, "Islamabad, PK" (mint, Caveat) + hand arrow. Line: blue dot + mono "OPEN TO NEW WORK & MESSY DASHBOARDS". Two round avatar stickers of `me.jpg` (68px, 3px orange ring) left & right. Headline "I design dashboards [green circle trend icon] that don’t need a manual. [pink circle spark icon]" (Geist 600 60px, centred). Btn "HIRE ME" + Caveat "(or just say hi)". Curved hairline divider.
2. About strip: Caveat "about me!" top-left; "what’s up" label styled as a Figma selection box (2px ink border + 4 corner handles); cursor + black "YOU" pill top-right; big centred sentence (Geist 500 70px, -3.2px): "I’m Umar [me.jpg 64px square] a product designer in Islamabad who turns messy data [yellow dashboard glyph] into screens that feel obvious [pink spark glyph]"; polaroids left ("2026", me.jpg, 9°) and right ("my desk", 8°, placeholder ok); skill blocks: solid colour bars + illustrated square icons — Dashboard Design (yellow), Prototyping (green), UX Audits (pink, white text), Design Systems (cyan #3CC8F0); Caveat "← these are my love languages".
3. Selected work: Caveat "stuff i’m proud of ↓" + Silkscreen "SELECTED WORK". The 4 folders from `projects[0..3]` stacked; **on desktop folders are `position: sticky` and stack as you scroll** (top offsets 90px + i×28px). Then Caveat "+ 13 more in the archive →" + pink sticky "LEGION · PACE · PULSE · EMBER · VION · ZKOP + 7 CONCEPTS" linking to /work.
4. In numbers: Caveat "receipts, not vibes" + Silkscreen "IN NUMBERS". Four taped sticky stats (270×250, tilted): **12** products designed & shipped (coins icon, yellow) · **5+** years in fintech, web3 & AI (users, mint) · **4 mo** for Youngs Capital to hit Top-10 broker (trophy, pink) · **<24h** my reply time, every time (clock, tape1).
5. Let’s talk: pixel bar-chart icon (black squares, lime tops) + Caveat "psst — still here?"; Silkscreen "LET’S TALK" 150px; 20px sub "Got a messy dashboard, a half-baked idea, or just want to say hi? Send it over — I reply within 24 hours."; yellow sticky with mail icon "Drop a line" + `ub1894497@gmail.com`; Btn "START A PROJECT".
6. Footer.

**Work (`/work`)** — Caveat "everything i’ve shipped (and a few i dreamt up) ↓", Silkscreen "ALL WORK"; torn filter tags (All 17 yellow, Fintech mint, Web3 blue/white, Trading pink, AI tape1, Concepts tape2) — make them real client-side filters; yellow sticky "pick one, any one →". 3-column grid of `projects` (10). Then section Caveat "side quests, dribbble shots & concepts ↓" + Silkscreen "CONCEPTS & SHOTS" with the 7 `concepts`. CTA: Silkscreen "GOT A MESSY DASHBOARD?", Caveat "Send it over — I’ll tell you what I’d fix first.", Btn. Only Youngs Capital has a case study (link `/work/youngs-capital`); other cards aren’t links yet.

**Case study (`/work/youngs-capital`)** — template for future ones:
- Caveat "← back to all work"; mono "PROJECT 01 · LIVE"; Silkscreen "YOUNGS / CAPITAL" (2 lines, ~130px); Geist 600 36px tagline "Pakistan’s first profit-and-loss sharing brokerage — invest, trade and grow on the PSX, with a partner that stands beside you."; meta stickies (Industry FinTech yellow · Platform iOS & Android mint · Timeline 8 Weeks pink · My role Product Designer tape1); Caveat "↓ the receipts".
- Taped hero `cover.jpg` (full width, -0.6°).
- "so, what was broken?" → two big notes: THE PROBLEM (pink): "Pakistan’s financial market lacks transparency and trust — leaving everyday investors without a reliable brokerage that stands beside them through market highs and lows." / THE FIX (mint): "Youngs Capital introduces Pakistan’s first profit-and-loss sharing brokerage — a trusted partner that celebrates wins together and shoulders losses side by side."
- "the good stuff →" Silkscreen "SCREENS": `ui.jpg` full width, then `branding.jpg` + `flows.jpg` side by side, all taped polaroid-style.
- "about the product": stats Top-10 (CDC-ranked broker within 4 months) · 4.8★ (on the App Store) · P&L sharing (a first for Pakistan).
- "next up →" blue folder → Prime Traders (`/work/prime-traders.jpg`, not a link yet).

**About (`/about`)** — Caveat "the long version ↓", Silkscreen "ABOUT"; polaroid of me.jpg "that’s me, 2026" (5°); Caveat 38px intro "I’m a product designer who gets a little too excited about turning messy data into calm, clear screens. ✦"; two body paragraphs (5+ years designing web & mobile products for trading platforms, prediction markets, crypto wallets, brokerages and AI tools; favourite briefs start with “it works, but nobody gets it.” / work closely with founders, PMs and developers… based in Islamabad, working with teams everywhere); signature "— Umar". THE PROCESS: 4 tilted sticky steps — 01 Untangle it, 02 Sketch it ugly, 03 Make it obvious, 04 Ship it together. EXPERIENCE: two index-card rows — (1) "Freelance Product Designer" · "Youngs Capital · Prime Traders · Traqstock · VEYRO · Legion & more" · "20XX — NOW"; (2) "Senior Product Designer" · "Quecko Inc" · "SEP 2021 — NOW". Toolbox torn tags: Figma, FigJam, Framer, Protopie, Claude, Notion, Jitter. Fun-fact stickies: Based in Islamabad, PK (GMT+5) · 5+ years designing products · 12 products & counting · [placeholder].

**Playground (`/playground`)** — Silkscreen "JUST FOR FUN" centred, Caveat sub "concepts, experiments & dribbble shots — the stuff i make when nobody’s asking"; free-form collage of `playShots` as tilted polaroids with Caveat captions + small coloured label stickies ("first try!", "hello world", "practice", "what is this"); tiny +/– zoom control decoration bottom-right. On mobile, collapse to a 1–2 column masonry.

**Contact (`/contact`)** — Caveat "say hi"; "CONTACT" Silkscreen inside a blue Figma-style selection box (2px #2F5BEA border + corner handles); yellow (tape2) card form, 612px: intro "Got a project, a messy dashboard, or just want to say hi? I read every message and reply within 24 hours."; fields with icons (user / mail / message), 1.5px ink borders, white; "What’s it about?" with chips (Dashboard ●selected-ink, Web app, Mobile app, UX audit, Full-time role — each with an icon; they wrap); Btn "SEND IT". Polaroid me.jpg "hi, it’s me" left (-6°), polaroid pulse cover "recent work" right (5°); Caveat "(the form works, promise)" with an SVG hand-drawn arrow; availability line; email with mail icon; social circles.

## Motion (subtle & smooth)
- Respect `prefers-reduced-motion`.
- Folders stack via sticky positioning on scroll (Home).
- Polaroids/cards: on hover straighten to 0° and lift (translateY -4px, bigger shadow), 200ms ease.
- Stickers/stickies: tiny wobble on hover.
- Sections fade/slide up 16px on first view (IntersectionObserver, one small client component).
- No heavy animation libraries.

## Responsive
- ≥1200: as designed (1440 frames, 1280 content).
- 768–1199: 2-column grids, hero stickers repositioned closer.
- <768: single column, pixel titles scale with `clamp()`, hide decorative stickers that would overlap, folders not sticky (normal stack), nav collapses.

## SEO
- `<title>` "Umar Ali Butt — Product Designer for dashboards, fintech & Web3", description from the hero line, Open Graph image (use `/work/youngs-capital.jpg` until a custom one exists).
