// Atherbloom — cinematic landing page
const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headlineLine1": "Venture Past Our Sky",
  "headlineLine2": "Across the Universe",
  "subhead": "Discover the universe in ways once unimaginable. Our pioneering vessels and breakthrough engineering bring deep-space exploration within reach.",
  "primaryCta": "Start Your Voyage",
  "secondaryCta": "View Liftoff",
  "brand": "Atherbloom",
  "tint": "warm",
  "vignette": 55,
  "showPartners": true,
  "showScrollCue": true
}/*EDITMODE-END*/;

const TINT_OVERLAYS = {
  warm: "linear-gradient(160deg, rgba(255,200,170,0.08) 0%, rgba(255,170,210,0.05) 50%, rgba(180,200,255,0.04) 100%)",
  cool: "linear-gradient(160deg, rgba(150,180,255,0.10) 0%, rgba(180,210,255,0.05) 50%, rgba(220,230,255,0.04) 100%)",
  neutral: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
  twilight: "linear-gradient(160deg, rgba(60,40,90,0.18) 0%, rgba(40,60,120,0.10) 60%, rgba(20,30,80,0.08) 100%)"
};

// ---- Brand mark (simple minimal icon) ----
function BrandMark() {
  return (
    <a href="#" className="flex items-center gap-2.5 group select-none" aria-label="Atherbloom home">
      <span className="relative inline-block w-8 h-8">
        <svg viewBox="0 0 32 32" className="w-8 h-8 transition-transform duration-700 group-hover:rotate-45" fill="none">
          <circle cx="16" cy="16" r="14" stroke="white" strokeOpacity="0.85" strokeWidth="1.2"/>
          <path d="M16 4 C 19 11, 21 13, 28 16 C 21 19, 19 21, 16 28 C 13 21, 11 19, 4 16 C 11 13, 13 11, 16 4 Z"
                fill="white" fillOpacity="0.9"/>
        </svg>
      </span>
      <span className="font-serif text-[1.15rem] tracking-wide text-white/95" style={{letterSpacing: '0.04em'}}>
        Atherbloom
      </span>
    </a>
  );
}

// ---- Navbar ----
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = ["Home", "Voyages", "Worlds", "Innovation", "Plan Launch"];

  return (
    <nav className="fixed top-4 md:top-6 left-0 right-0 z-40 px-4 reveal delay-1">
      <div className={`mx-auto max-w-6xl glass rounded-full pl-3 pr-3 md:pl-5 md:pr-2 py-2 flex items-center justify-between gap-3 transition-all duration-500 ${scrolled ? 'shadow-2xl' : ''}`}>
        <BrandMark />

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1 text-[0.92rem] text-white/85 font-light">
          {items.map((it, i) => (
            <li key={it}>
              <a href={`#${it.toLowerCase().replace(/\s+/g,'-')}`}
                 className="nav-link inline-block px-3 py-2 rounded-full hover:text-white">
                {it}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#claim"
             className="btn btn-glass hidden sm:inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-sm font-medium">
            Claim a Spot
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="-mr-0.5">
              <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(o => !o)}
            className="lg:hidden w-10 h-10 rounded-full glass-soft flex items-center justify-center">
            <span className="block w-4 h-[1.5px] bg-white relative">
              <span className={`absolute left-0 w-4 h-[1.5px] bg-white transition-all ${open ? 'top-0 rotate-45' : '-top-1.5'}`}></span>
              <span className={`absolute left-0 w-4 h-[1.5px] bg-white transition-all ${open ? 'top-0 -rotate-45' : 'top-1.5'}`}></span>
              <span className={`block w-4 h-[1.5px] bg-white transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`}></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden mx-auto max-w-6xl mt-3 glass rounded-3xl p-4 mobile-menu-enter">
          <ul className="flex flex-col">
            {items.map(it => (
              <li key={it}>
                <a href={`#${it.toLowerCase().replace(/\s+/g,'-')}`}
                   onClick={() => setOpen(false)}
                   className="block px-3 py-3 text-white/90 text-base font-light border-b border-white/10 last:border-0">
                  {it}
                </a>
              </li>
            ))}
            <li className="pt-3 sm:hidden">
              <a href="#claim" className="btn btn-primary inline-flex w-full justify-center items-center gap-2 px-5 py-3 rounded-full text-sm font-medium">
                Claim a Spot
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

// ---- Petal ----
function Petal({ kind, y, size, dur, delay, blur, opacity, dy, flutter, hue }) {
  // Two petal silhouettes, alternated for variety
  const path = kind % 2 === 0
    ? "M2 10 C 2 4, 10 0, 18 2 C 22 5, 22 10, 18 13 C 12 17, 4 16, 2 10 Z"
    : "M1 9 C 4 2, 14 0, 19 4 C 22 8, 19 13, 13 14 C 7 15, 2 13, 1 9 Z";
  return (
    <span className="petal" style={{
      '--y': `${y}%`,
      '--s': `${size}px`,
      '--dur': `${dur}s`,
      '--delay': `${delay}s`,
      '--b': `${blur}px`,
      '--o': opacity,
      '--dy': `${dy}px`,
      '--fdur': `${flutter}s`,
      '--flutter': `${(dy > 0 ? 1 : -1) * (8 + Math.abs(dy) * 0.2)}px`
    }}>
      <svg viewBox="0 0 24 18" fill="none">
        <defs>
          <radialGradient id={`pg${kind}-${y}-${size}`} cx="35%" cy="40%" r="75%">
            <stop offset="0%"  stopColor={hue === 'white' ? "#ffffff" : "#ffd1de"} stopOpacity="1"/>
            <stop offset="60%" stopColor={hue === 'white' ? "#fff5f7" : "#ffa9c2"} stopOpacity="0.95"/>
            <stop offset="100%" stopColor={hue === 'white' ? "#f7e6ec" : "#e88aa8"} stopOpacity="0.7"/>
          </radialGradient>
        </defs>
        <path d={path} fill={`url(#pg${kind}-${y}-${size})`} />
      </svg>
    </span>
  );
}

// Pre-seeded petal set — varied size, blur, speed, lane, hue.
// Some are large + heavily blurred (close to the camera, out of focus).
const PETAL_SEEDS = [
  // y%, size, dur, delay, blur, opacity, dy, flutter, hue, kind
  [12,  10, 28,  0.0, 0,  0.85,  18, 5.5, 'pink',  0],
  [22,  14, 24,  3.5, 0,  0.85, -22, 6.0, 'white', 1],
  [34,  12, 30,  1.2, 0,  0.80,  24, 5.0, 'pink',  0],
  [46,  16, 26,  7.0, 0.5,0.85, -18, 6.5, 'pink',  1],
  [58,  11, 32,  4.0, 0,  0.75,  30, 4.8, 'white', 0],
  [70,  18, 22,  9.0, 1,  0.75, -28, 5.2, 'pink',  1],
  [82,  14, 28,  2.0, 0,  0.80,  26, 5.8, 'pink',  0],
  [18,  22, 20, 11.0, 3,  0.55,  35, 4.5, 'pink',  1],   // close, blurred
  [40,  28, 18,  6.5, 5,  0.45, -32, 4.2, 'white', 0],   // very close, very blurred
  [64,  26, 19, 13.5, 4,  0.50,  30, 4.6, 'pink',  1],   // close, blurred
  [88,  32, 17,  0.8, 6,  0.40, -25, 4.0, 'pink',  0],   // foreground bokeh
  [8,   20, 21, 16.0, 3,  0.55,  20, 4.8, 'white', 1],
  [54,  13, 34, 14.5, 0,  0.80, -22, 6.2, 'pink',  0],
  [28,   9, 36, 19.0, 0,  0.70,  18, 6.8, 'white', 1],
  [76,  12, 30, 22.0, 0,  0.80, -20, 5.5, 'pink',  0],
  [38,  15, 27,  8.5, 0,  0.85,  22, 5.6, 'pink',  1],
  [62,  10, 33, 17.0, 0,  0.75, -26, 5.0, 'white', 0],
  [50,  24, 23, 25.0, 4,  0.45,  28, 4.4, 'pink',  1],   // close
  [16,  17, 25, 12.0, 1,  0.70,  16, 5.4, 'pink',  0],
  [86,  20, 22, 20.0, 2,  0.60, -18, 4.9, 'white', 1],
];

function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {PETAL_SEEDS.map(([y, size, dur, delay, blur, opacity, dy, flutter, hue, kind], i) => (
        <Petal key={i} y={y} size={size} dur={dur} delay={delay} blur={blur}
               opacity={opacity} dy={dy} flutter={flutter} hue={hue} kind={kind} />
      ))}
    </div>
  );
}

// ---- Hero ----
function Hero({ t }) {
  return (
    <section className="relative w-full" style={{ minHeight: '100vh' }} data-screen-label="01 Hero">
      {/* Background image — held perfectly still */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-bg" />

        {/* Living-scene wind layers */}
        <div className="sun-shimmer" />
        <div className="mist" />
        <div className="blossom-sway tl" />
        <div className="blossom-sway tr" />
        <div className="field-sway" />
        <div className="field-sway layer-2" />
        <Petals />

        {/* Tint wash */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: TINT_OVERLAYS[t.tint] || TINT_OVERLAYS.warm }} />
        {/* Vignettes */}
        <div className="absolute inset-x-0 top-0 h-[42vh] hero-vignette-top pointer-events-none"
             style={{ opacity: t.vignette / 100 }}/>
        <div className="absolute inset-x-0 bottom-0 h-[40vh] hero-vignette-bottom pointer-events-none"
             style={{ opacity: t.vignette / 100 }}/>
        {/* Soft dust */}
        <div className="dust" />
      </div>

      {/* Floating decorative chip */}
      <div className="absolute top-[14vh] left-1/2 -translate-x-1/2 z-10 reveal delay-2">
        <div className="glass-soft rounded-full px-4 py-1.5 flex items-center gap-2 text-[0.72rem] tracking-[0.22em] uppercase text-white/85">
          <span className="w-1.5 h-1.5 rounded-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
          Manifest VII · Spring Voyage Open
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6"
           style={{ minHeight: '100vh', paddingTop: '22vh', paddingBottom: '14vh' }}>

        <h1 className="reveal delay-3 font-serif headline-text leading-[0.98] tracking-tight"
            style={{
              fontSize: 'clamp(2.6rem, 7.2vw, 6.4rem)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              textWrap: 'balance'
            }}>
          <span className="block">{t.headlineLine1}</span>
          <span className="block italic font-light" style={{ marginTop: '0.1em' }}>{t.headlineLine2}</span>
        </h1>

        <p className="reveal delay-4 mt-8 max-w-2xl text-white/85 font-light"
           style={{ fontSize: 'clamp(0.98rem, 1.25vw, 1.18rem)', lineHeight: 1.65, textWrap: 'pretty' }}>
          {t.subhead}
        </p>

        <div className="reveal delay-5 mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <a href="#voyage"
             className="btn btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[0.95rem] font-medium tracking-wide">
            {t.primaryCta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#liftoff"
             className="btn btn-glass inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-[0.95rem] font-medium tracking-wide">
            <span className="w-7 h-7 rounded-full border border-white/60 inline-flex items-center justify-center">
              <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
                <path d="M1 1l7 4.5L1 10V1z" fill="currentColor"/>
              </svg>
            </span>
            {t.secondaryCta}
          </a>
        </div>

        {/* Scroll cue */}
        {t.showScrollCue && (
          <div className="reveal delay-6 absolute bottom-[8vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <div className="scroll-cue"></div>
            <span className="text-[0.65rem] tracking-[0.3em] uppercase text-white/70">Scroll</span>
          </div>
        )}
      </div>

      {/* Partner row — floating bottom */}
      {t.showPartners && <PartnerRow />}
    </section>
  );
}

// ---- Partner row ----
function PartnerRow() {
  const partners = ["Aeon", "Vela", "Apex", "Orbit", "Zeno"];
  return (
    <div className="absolute left-0 right-0 bottom-0 z-10 pb-8 md:pb-10 reveal delay-6">
      <div className="mx-auto max-w-5xl px-6">
        <div className="hairline mb-5 md:mb-6 opacity-60"></div>
        <div className="flex items-center justify-between gap-3 md:gap-8 flex-wrap">
          <span className="text-[0.62rem] md:text-[0.68rem] tracking-[0.32em] uppercase text-white/65 font-light">
            In Orbit With
          </span>
          <div className="flex items-center justify-center gap-5 md:gap-10 lg:gap-14 flex-wrap flex-1">
            {partners.map((p, i) => (
              <span key={p}
                    className="font-serif italic text-white/55 hover:text-white/85 transition-colors duration-500 float-slow"
                    style={{
                      fontSize: 'clamp(1.15rem, 1.6vw, 1.55rem)',
                      letterSpacing: '0.04em',
                      fontWeight: 400,
                      animationDelay: `${i * 0.6}s`
                    }}>
                {p}
              </span>
            ))}
          </div>
          <span className="hidden md:inline text-[0.62rem] md:text-[0.68rem] tracking-[0.32em] uppercase text-white/65 font-light">
            Est. MMXXVI
          </span>
        </div>
      </div>
    </div>
  );
}

// ---- Tweaks ----
function TweaksUI({ t, setTweak }) {
  if (!window.TweaksPanel) return null;
  const { TweaksPanel, TweakSection, TweakText, TweakSelect, TweakSlider, TweakToggle } = window;
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Copy">
        <TweakText label="Line 1" value={t.headlineLine1} onChange={v => setTweak('headlineLine1', v)} />
        <TweakText label="Line 2" value={t.headlineLine2} onChange={v => setTweak('headlineLine2', v)} />
        <TweakText label="Subhead" value={t.subhead} onChange={v => setTweak('subhead', v)} />
        <TweakText label="Primary CTA" value={t.primaryCta} onChange={v => setTweak('primaryCta', v)} />
        <TweakText label="Secondary CTA" value={t.secondaryCta} onChange={v => setTweak('secondaryCta', v)} />
      </TweakSection>
      <TweakSection label="Atmosphere">
        <TweakSelect label="Tint"
                    value={t.tint}
                    options={[{value:'warm',label:'Warm'},{value:'cool',label:'Cool'},{value:'neutral',label:'Neutral'},{value:'twilight',label:'Twilight'}]}
                    onChange={v => setTweak('tint', v)} />
        <TweakSlider label="Vignette" min={0} max={100} step={5} value={t.vignette} onChange={v => setTweak('vignette', v)} />
      </TweakSection>
      <TweakSection label="Sections">
        <TweakToggle label="Partner row" value={t.showPartners} onChange={v => setTweak('showPartners', v)} />
        <TweakToggle label="Scroll cue" value={t.showScrollCue} onChange={v => setTweak('showScrollCue', v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

// ---- App ----
function App() {
  const useTweaks = window.useTweaks || (d => [d, () => {}]);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  return (
    <div className="relative">
      <Navbar />
      <Hero t={t} />
      <TweaksUI t={t} setTweak={setTweak} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
