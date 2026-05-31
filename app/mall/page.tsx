import type { Metadata } from 'next'
import type { CSSProperties, ReactNode } from 'react'
import { SafetyLayer } from './SafetyLayer'

/**
 * MADMall — Phase 2 (refined). Built on the real ZMUX "Sanctuary" system.
 * Editorial, image-led, reverent. Every room centers Black women of all
 * sizes, shapes, and hues, so the women MADMall serves see themselves.
 * Pure server component → prerenders to static HTML.
 */

export const metadata: Metadata = {
  title: 'MADMall | A Home Away From Home',
  description:
    'A governed cultural sanctuary for Black women navigating Graves’ disease — retail, jazz, comedy, wellness, learning, community, and care.',
}

// Durable local assets, served by Next from public/madmall/.
// Replace these files (or the paths) when the proprietary imagery engine ships.
const IMG = {
  hero: '/madmall/sanctuary.jpeg',
  retail: '/madmall/apparell.jpeg',
  jazz: '/madmall/jazz.jpeg',
  comedy: '/madmall/comedy.jpeg',
  wellness: '/madmall/wellness.jpeg',
  learning: '/madmall/learning.jpeg',
  commons: '/madmall/commons.jpeg',
  care: '/madmall/care.jpeg',
}

const frame: CSSProperties = {
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--monolithic-shadow)',
  overflow: 'hidden',
}

const rooms = [
  { id: 'retail', name: 'The Retail Floor', tag: 'SHOP', accent: 'var(--soul-gold)' },
  { id: 'jazz', name: 'Sanctuary Jazz', tag: 'LISTEN', accent: 'var(--clinical-teal)' },
  { id: 'comedy', name: 'Collective Wit', tag: 'LAUGH', accent: 'var(--terracotta)' },
  { id: 'wellness', name: 'The Wellness Rooms', tag: 'REST', accent: 'var(--clinical-teal)' },
  { id: 'learning', name: 'The Learning Hall', tag: 'LEARN', accent: 'var(--soul-gold)' },
  { id: 'commons', name: 'The Commons', tag: 'GATHER', accent: 'var(--terracotta)' },
  { id: 'care', name: 'The Care Desk', tag: 'CARE', accent: 'var(--clinical-teal)' },
]

function Kicker({ tag, accent, label, light = false }: { tag: string; accent: string; label: string; light?: boolean }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="soul-tag" style={{ background: accent }}>{tag}</span>
      <span className="viz-label" style={{ color: light ? 'rgba(252,250,242,0.65)' : 'var(--muted-foreground)', letterSpacing: '0.18em' }}>{label}</span>
    </div>
  )
}

function RoomBand({
  id, tag, accent, label, title, imgSrc, imgAlt, side, children,
}: {
  id: string; tag: string; accent: string; label: string; title: string
  imgSrc: string; imgAlt: string; side: 'left' | 'right'; children: ReactNode
}) {
  const image = (
    <div style={frame} className="h-full w-full">
      <img src={imgSrc} alt={imgAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '4 / 5', display: 'block' }} />
    </div>
  )
  const text = (
    <div className="flex flex-col justify-center py-2">
      <Kicker tag={tag} accent={accent} label={label} />
      <h2 className="mb-5 text-4xl leading-[1.02] md:text-5xl" style={{ color: 'var(--ink)' }}>{title}</h2>
      {children}
    </div>
  )
  return (
    <section id={id} className="mb-28 grid grid-cols-1 items-stretch gap-10 md:grid-cols-2 md:gap-16">
      {side === 'left' ? (<>{image}{text}</>) : (<>{text}<div className="order-first md:order-last">{image}</div></>)}
    </section>
  )
}

export default function MallPage() {
  return (
    <main className="relative z-10">
      {/* Real ZMUX safety components, mounted live */}
      <SafetyLayer />

      {/* Concierge bar */}
      <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-7 md:px-10">
        <div className="flex items-center gap-3">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: 'var(--soul-gold)' }} />
          <span className="text-lg font-bold tracking-[0.3em]" style={{ color: 'var(--ink)' }}>MADMALL</span>
        </div>
        <span className="status-pill" style={{ color: 'var(--ink)' }}>● ALL TLC INVARIANTS PASSING</span>
      </header>

      {/* HERO — full-bleed cinematic */}
      <section className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="animate-fade-in relative" style={frame}>
          <img src={IMG.hero} alt="Three Black women of different ages, sizes, and skin tones, standing together in a sunlit sanctuary atrium" style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '16 / 9', display: 'block' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(252,250,242,0.94) 0%, rgba(252,250,242,0.78) 34%, rgba(252,250,242,0.15) 62%, transparent 100%)' }} />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <p className="viz-label mb-4" style={{ color: 'var(--terracotta)', letterSpacing: '0.2em' }}>The Atrium · A Home Away From Home</p>
            <h1 className="mb-6 text-5xl leading-[0.92] md:text-7xl" style={{ color: 'var(--ink)', maxWidth: '14ch' }}>The mall,<br />made soft.</h1>
            <p className="mb-8 text-base leading-relaxed md:text-lg" style={{ color: 'var(--ink)', opacity: 0.78, maxWidth: '32ch' }}>
              A governed cultural sanctuary for Black women navigating Graves&rsquo; disease — and
              the people who hold them. Move at your pace. Leave whenever you want. Rest, sister.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#wellness" className="btn-gold">Enter the Wellness Rooms</a>
              <a href="#directory" className="btn-monolithic">See the directory</a>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION band */}
      <section className="mx-auto w-full max-w-4xl px-6 py-24 text-center md:px-10">
        <p className="viz-label mb-6" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.22em' }}>Why this place exists</p>
        <p className="text-2xl leading-[1.5] md:text-3xl" style={{ color: 'var(--ink)', textTransform: 'none', fontWeight: 500 }}>
          For Black women, Graves&rsquo; disease is too often caught late and treated as if it were
          someone else&rsquo;s body. The disparity can turn a manageable condition into a
          life-threatening one. <span style={{ color: 'var(--soul-gold)' }}>MADMall is built for your body — not adapted to it.</span>
        </p>
      </section>

      {/* DIRECTORY */}
      <section id="directory" className="mx-auto w-full max-w-6xl px-6 pb-24 md:px-10">
        <p className="viz-label mb-8" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.22em' }}>The Directory · Seven Rooms</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {rooms.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className="viz-card block no-underline">
              <span className="soul-tag" style={{ background: s.accent }}>{s.tag}</span>
              <h3 className="mt-4 text-lg leading-tight" style={{ color: 'var(--ink)' }}>{s.name}</h3>
              <span className="viz-label mt-3 block" style={{ color: 'var(--muted-foreground)' }}>0{i + 1}</span>
            </a>
          ))}
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        {/* RETAIL */}
        <RoomBand id="retail" tag="SHOP" accent="var(--soul-gold)" label="The Retail Floor" title="Apparel that thinks in degrees" imgSrc={IMG.retail} imgAlt="A plus-size Black woman in elegant layered cream and terracotta clothing" side="left">
          <p className="mb-6 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            A thyroid body negotiates with the weather differently — cool at dawn, flushed by
            midmorning, icy by afternoon. Every piece is graded against a thermal-shift rubric, so
            your clothes move with you instead of fighting you.
          </p>
          <ul className="flex flex-col gap-3">
            {[
              ['Wool-silk neck warmer', 'A removable dimmer switch for your most thermally sensitive place.'],
              ['Merino base layers', 'Carries moisture out; warm even when damp. Never scratchy.'],
              ['Linen day pieces', 'Open weave, fast drying — breathes when the flush arrives.'],
            ].map(([t, d]) => (
              <li key={t} className="border-l-2 pl-4" style={{ borderColor: 'var(--soul-gold)' }}>
                <span className="block font-bold" style={{ color: 'var(--ink)' }}>{t}</span>
                <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{d}</span>
              </li>
            ))}
          </ul>
        </RoomBand>

        {/* JAZZ */}
        <RoomBand id="jazz" tag="LISTEN" accent="var(--clinical-teal)" label="Sanctuary Jazz · Monthly" title="Music that settles the chest" imgSrc={IMG.jazz} imgAlt="A Black woman with locs, eyes closed, listening in warm lounge light" side="right">
          <p className="mb-6 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            A sit-and-listen evening drawn from the standards and the spirituals. Dim lights, seated
            rows, no required posture. Bring blankets, low conversation, and the body you have tonight.
          </p>
          <div className="flex flex-wrap gap-3">
            {['TWO-HOUR SET', 'BLANKETS WELCOME', 'RECORDED FOR THE ARCHIVE'].map((p) => (
              <span key={p} className="status-pill" style={{ color: 'var(--ink)', borderColor: 'rgba(20,20,20,0.18)' }}>{p}</span>
            ))}
          </div>
        </RoomBand>

        {/* COMEDY */}
        <RoomBand id="comedy" tag="LAUGH" accent="var(--terracotta)" label="Collective Wit · Biweekly" title="Laughter that doesn’t punch down" imgSrc={IMG.comedy} imgAlt="Two Black women laughing together in warm golden light" side="left">
          <p className="mb-6 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            A comedy showcase vetted on a single rule: earn the laugh from inside the community,
            never at its expense. Live captioning on every set, and content warnings posted in
            advance for anything that touches grief, illness, or the clinic.
          </p>
          <div className="flex flex-wrap gap-3">
            {['LIVE CAPTIONED', 'OPEN-MIC SLOT', 'SLIDING SCALE'].map((p) => (
              <span key={p} className="status-pill" style={{ color: 'var(--ink)', borderColor: 'rgba(20,20,20,0.18)' }}>{p}</span>
            ))}
          </div>
        </RoomBand>

        {/* WELLNESS */}
        <RoomBand id="wellness" tag="REST" accent="var(--clinical-teal)" label="The Wellness Rooms" title="Grounding rituals for thyroid storms" imgSrc={IMG.wellness} imgAlt="A Black woman with a short natural TWA, hand on her sternum, breathing" side="right">
          <p className="mb-6 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            When a storm raises the noise floor, these are companions for the time between noticing
            and being seen. Not a substitute for clinician care — they sit beside it.
          </p>
          <ul className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {['A cool hand on the sternum.', 'Two slow exhales, each longer than the last.', 'A walk to the room with the most windows.', 'A name said aloud — yours, or a beloved one’s.'].map((r) => (
              <li key={r} className="viz-card text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>{r}</li>
            ))}
          </ul>
          <div className="rounded-[15px] border-l-4 px-5 py-4" style={{ borderColor: 'var(--clinical-teal)', background: 'rgba(75,106,109,0.08)', color: 'var(--ink)' }}>
            <strong style={{ color: 'var(--clinical-teal)' }}>If symptoms escalate</strong> — clinician routing is one tap away, and you can leave any room, any time, with no guilt and no second prompt.
          </div>
        </RoomBand>

        {/* LEARNING */}
        <RoomBand id="learning" tag="LEARN" accent="var(--soul-gold)" label="The Learning Hall" title="Read your body without panic" imgSrc={IMG.learning} imgAlt="A Black woman with reading glasses studying her lab results with calm authority" side="left">
          <p className="mb-6 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            The page from the lab is a snapshot, not a verdict. Here the authority over your body
            stays with you — we hand you the language, you keep the pen.
          </p>
          <ul className="flex flex-col gap-3">
            {[
              ['Plain-language explainers', 'What TSH, Free T4, Free T3, and TPO antibodies actually mean.'],
              ['Peer-led discussion circles', 'Sisters who have read these numbers before, reading them with you.'],
              ['Clinician office hours', 'Bring your questions; leave with a plan and a name you can reach.'],
            ].map(([t, d]) => (
              <li key={t} className="border-l-2 pl-4" style={{ borderColor: 'var(--soul-gold)' }}>
                <span className="block font-bold" style={{ color: 'var(--ink)' }}>{t}</span>
                <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{d}</span>
              </li>
            ))}
          </ul>
        </RoomBand>
      </div>

      {/* COMMONS — full-bleed wide image band */}
      <section id="commons" className="mx-auto mb-28 w-full max-w-6xl px-6 md:px-10">
        <div className="relative" style={frame}>
          <img src={IMG.commons} alt="A circle of Black women of many ages, sizes, and skin tones, holding each other in warm light" style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '16 / 9', display: 'block' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(20,20,20,0.85) 0%, rgba(20,20,20,0.35) 45%, transparent 75%)' }} />
          <div className="absolute inset-x-0 bottom-0 px-8 pb-10 md:px-14 md:pb-14">
            <Kicker tag="GATHER" accent="var(--terracotta)" label="The Commons" light />
            <h2 className="mb-3 text-4xl md:text-5xl" style={{ color: 'var(--vellum)' }}>Where we hold each other</h2>
            <p className="max-w-2xl leading-relaxed" style={{ color: 'rgba(252,250,242,0.82)' }}>
              You are not &ldquo;just like every other patient.&rdquo; The Commons is built around your
              specific, lived experience — member-led, never extractive. Newly-diagnosed circles,
              caregiver gatherings, and rest-as-resistance evenings.
            </p>
          </div>
        </div>
      </section>

      {/* CARE */}
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <RoomBand id="care" tag="CARE" accent="var(--clinical-teal)" label="The Care Desk" title="The door opens both ways" imgSrc={IMG.care} imgAlt="An elder Black woman and a younger woman, a gentle hand on the shoulder" side="right">
          <p className="mb-6 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            The Care Desk is where the platform&rsquo;s promises live. We never pretend to be your
            doctor — we route you to real ones. We never trap you. We never track you in secret.
          </p>
          <ul className="flex flex-col gap-3">
            {[
              ['No medical authority', 'We surface information and route to clinicians — we do not diagnose or prescribe.'],
              ['Cultural fidelity', 'Every word here is reviewed for safety without exploitation.'],
              ['Exit sovereignty', 'Leave any room, end any session, delete any data — one tap, no guilt.'],
              ['No covert tracking', 'No telemetry without your consent. Ever.'],
            ].map(([t, d]) => (
              <li key={t} className="border-l-2 pl-4" style={{ borderColor: 'var(--clinical-teal)' }}>
                <span className="block font-bold" style={{ color: 'var(--ink)' }}>{t}</span>
                <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{d}</span>
              </li>
            ))}
          </ul>
        </RoomBand>
      </div>

      {/* Footer */}
      <footer className="mx-auto w-full max-w-6xl border-t px-6 py-12 text-center md:px-10" style={{ borderColor: 'var(--border)' }}>
        <p className="viz-label" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.2em' }}>
          MADMall · Built on the ZMUX Sanctuary Design System · The Living Constitution
        </p>
      </footer>
    </main>
  )
}
