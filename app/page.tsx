"use client";

import * as React from "react";

/**
 * ZMUX Design System Showcase
 * THE SANCTUARY - Vellum Clinical Aesthetic
 * 
 * A soft landing for the weary soul. 
 * Precision metabolic tracking meets the warmth of a Southern parlor.
 */

type Section = "sanctuary" | "tokens" | "components" | "safety";

export default function ZMUXShowcase() {
  const [activeSection, setActiveSection] = React.useState<Section>("sanctuary");
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-4">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="20" fill="#141414"/>
              <circle cx="20" cy="20" r="8" stroke="#b38b4d" strokeWidth="2"/>
            </svg>
          </div>
          <div className="font-mono text-xs text-ink/50">Loading Sanctuary...</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative z-[1] grid grid-cols-[120px_1fr_380px] gap-8 p-8 min-h-screen max-w-[1800px] mx-auto">
      {/* Vertical Monolithic Nav */}
      <nav className="vertical-nav flex flex-col justify-between py-8 items-center animate-slide-left">
        {/* Logo */}
        <div className="w-10 h-10">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="#141414"/>
            <circle cx="20" cy="20" r="8" stroke="#b38b4d" strokeWidth="2"/>
          </svg>
        </div>
        
        {/* Nav Items */}
        <div className="flex flex-col gap-4">
          <button 
            type="button"
            onClick={() => setActiveSection("sanctuary")}
            className={`nav-item-vertical cursor-pointer ${activeSection === "sanctuary" ? "!opacity-100 !text-terracotta" : ""}`}
          >
            Sanctuary
          </button>
          <button 
            type="button"
            onClick={() => setActiveSection("tokens")}
            className={`nav-item-vertical cursor-pointer ${activeSection === "tokens" ? "!opacity-100 !text-terracotta" : ""}`}
          >
            Tokens
          </button>
          <button 
            type="button"
            onClick={() => setActiveSection("components")}
            className={`nav-item-vertical cursor-pointer ${activeSection === "components" ? "!opacity-100 !text-terracotta" : ""}`}
          >
            Components
          </button>
          <button 
            type="button"
            onClick={() => setActiveSection("safety")}
            className={`nav-item-vertical cursor-pointer ${activeSection === "safety" ? "!opacity-100 !text-terracotta" : ""}`}
          >
            Safety
          </button>
        </div>
        
        {/* Footer dot */}
        <div className="text-soul-gold">●</div>
      </nav>
      
      {/* Main Content */}
      <main className="flex flex-col gap-8">
        {activeSection === "sanctuary" && <SanctuarySection onNavigate={setActiveSection} />}
        {activeSection === "tokens" && <TokensSection />}
        {activeSection === "components" && <ComponentsSection />}
        {activeSection === "safety" && <SafetySection />}
      </main>
      
      {/* Right Sidebar - Concierge */}
      <aside className="concierge flex flex-col gap-10 animate-slide-right">
        <div>
          <span className="status-pill mb-4 block w-fit">● DESIGN SYSTEM</span>
          <h2 className="text-3xl font-light mb-4">ZMUX Components</h2>
          <p className="text-sm opacity-60 leading-relaxed">
            The Living Constitution design system. Accessibility-first, safety-first components.
          </p>
        </div>
        
        <ul className="menu-list list-none">
          <li>
            <button 
              type="button" 
              onClick={() => setActiveSection("tokens")}
              className={`flex w-full justify-between items-center cursor-pointer hover:text-soul-gold transition-colors ${activeSection === "tokens" ? "text-soul-gold" : ""}`}
            >
              <span>Core Tokens</span>
              <span className="font-mono text-xs opacity-50">5</span>
            </button>
          </li>
          <li>
            <button 
              type="button" 
              onClick={() => setActiveSection("components")}
              className={`flex w-full justify-between items-center cursor-pointer hover:text-soul-gold transition-colors ${activeSection === "components" ? "text-soul-gold" : ""}`}
            >
              <span>Glass Components</span>
              <span className="font-mono text-xs opacity-50">4</span>
            </button>
          </li>
          <li>
            <button 
              type="button" 
              onClick={() => setActiveSection("safety")}
              className={`flex w-full justify-between items-center cursor-pointer hover:text-soul-gold transition-colors ${activeSection === "safety" ? "text-soul-gold" : ""}`}
            >
              <span>UICare Safety</span>
              <span className="font-mono text-xs opacity-50">12</span>
            </button>
          </li>
          <li>
            <button 
              type="button" 
              onClick={() => setActiveSection("safety")}
              className={`flex w-full justify-between items-center cursor-pointer hover:text-soul-gold transition-colors ${activeSection === "safety" ? "text-soul-gold" : ""}`}
            >
              <span>HumanGuard</span>
              <span className="font-mono text-xs opacity-50">8</span>
            </button>
          </li>
          <li>
            <button 
              type="button" 
              onClick={() => setActiveSection("sanctuary")}
              className={`flex w-full justify-between items-center cursor-pointer hover:text-soul-gold transition-colors ${activeSection === "sanctuary" ? "text-soul-gold" : ""}`}
            >
              <span>Control Plane <span className="soul-tag">NEW</span></span>
              <span className="font-mono text-xs opacity-50">4</span>
            </button>
          </li>
        </ul>
        
        <div className="mt-auto border-t border-vellum/10 pt-8">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-2xl bg-soul-gold/20 flex items-center justify-center">
              <span className="text-soul-gold font-bold">TLC</span>
            </div>
            <div>
              <div className="font-bold text-sm">The Living Constitution</div>
              <div className="font-mono text-xs opacity-50">v1.0.0 • ACTIVE</div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function SanctuarySection({ onNavigate }: { onNavigate: (section: Section) => void }) {
  return (
    <>
      {/* Hero */}
      <section className="vellum-hero p-16 animate-fade-in">
        <div className="relative z-10">
          <div className="viz-label text-terracotta tracking-[0.3em] mb-4">
            Home Away From Home / Design System 02:44 AM
          </div>
          <h1 className="text-[clamp(3rem,8vw,6rem)] leading-[0.9] mix-blend-multiply">
            The<br/>Sanctuary
          </h1>
          <p className="mt-8 max-w-[500px] leading-relaxed opacity-70 text-lg">
            A soft landing for the weary soul. Precision metabolic tracking 
            meets the warmth of a Southern parlor. Rest, sister. You&apos;re home.
          </p>
        </div>
      </section>
      
      {/* Data Grid */}
      <div className="grid grid-cols-2 gap-8">
        <div className="viz-card">
          <span className="viz-label block mb-8">Component Health (TLC Invariants)</span>
          <div className="flex items-end h-[150px] gap-2">
            <div className="data-bar teal" style={{ height: '40%' }} />
            <div className="data-bar" style={{ height: '65%' }} />
            <div className="data-bar gold" style={{ height: '85%' }} />
            <div className="data-bar" style={{ height: '50%' }} />
            <div className="data-bar teal" style={{ height: '75%' }} />
            <div className="data-bar" style={{ height: '90%' }} />
          </div>
          <div className="mt-6 font-mono text-sm">
            STATUS: <span className="text-clinical-teal">ALL INVARIANTS PASSING</span>
          </div>
        </div>
        
        <div className="viz-card !bg-soul-gold text-white relative overflow-hidden">
          <span className="viz-label block mb-4 !text-white !opacity-90">
            Design System Status
          </span>
          <div className="text-2xl font-light mb-4">
            &ldquo;Safety-First, Accessibility-First&rdquo;
          </div>
          <div className="inline-block px-3 py-1 border border-white/40 rounded-full font-mono text-xs">
            WCAG 2.2 AAA • TLC COMPLIANT
          </div>
          <div className="absolute bottom-8 right-8 text-6xl opacity-20">✦</div>
        </div>
      </div>
      
      {/* CTA Card */}
      <div className="viz-card flex items-center justify-between">
        <div>
          <span className="viz-label block mb-2">The Component Library</span>
          <h3 className="text-2xl uppercase">68+ Safety-First Components</h3>
        </div>
        <button 
          type="button" 
          className="btn-monolithic"
          onClick={() => onNavigate("components")}
        >
          Explore Components
        </button>
      </div>
    </>
  );
}

function TokensSection() {
  const palette = [
    { name: "Vellum", hex: "#fcfaf2", desc: "Primary background, frosted glass" },
    { name: "Ink", hex: "#141414", desc: "Text, dark surfaces" },
    { name: "Soul Gold", hex: "#b38b4d", desc: "Primary accent, warmth" },
    { name: "Terracotta", hex: "#a65d45", desc: "Secondary accent, labels" },
    { name: "Clinical Teal", hex: "#4b6a6d", desc: "Data, clinical trust" },
  ];
  
  return (
    <>
      <section className="vellum-hero p-16 animate-fade-in">
        <div className="relative z-10">
          <div className="viz-label text-terracotta tracking-[0.3em] mb-4">
            Design Tokens
          </div>
          <h1 className="text-5xl leading-[0.9]">
            The Sanctuary<br/>Palette
          </h1>
          <p className="mt-8 max-w-[500px] leading-relaxed opacity-70">
            Warm, clinical, welcoming. The ZMUX color system balances 
            Southern hospitality with medical precision.
          </p>
        </div>
      </section>
      
      {/* Color Palette */}
      <div className="grid grid-cols-5 gap-4">
        {palette.map((color) => (
          <div key={color.name} className="viz-card text-center">
            <div 
              className="w-full h-24 rounded-2xl mb-4 border border-white/20"
              style={{ backgroundColor: color.hex }}
            />
            <div className="font-bold text-sm">{color.name}</div>
            <div className="font-mono text-xs opacity-60 mt-1">{color.hex}</div>
            <div className="text-xs opacity-50 mt-2">{color.desc}</div>
          </div>
        ))}
      </div>
      
      {/* Typography */}
      <div className="viz-card">
        <span className="viz-label block mb-6">Typography Scale</span>
        <div className="space-y-6">
          <div className="flex items-baseline gap-8">
            <span className="viz-label w-16">Hero</span>
            <span className="text-5xl font-bold uppercase">The Sanctuary</span>
          </div>
          <div className="flex items-baseline gap-8">
            <span className="viz-label w-16">H1</span>
            <span className="text-3xl font-bold uppercase">Heading One</span>
          </div>
          <div className="flex items-baseline gap-8">
            <span className="viz-label w-16">Body</span>
            <span className="text-lg">Body text optimized for readability and warmth.</span>
          </div>
          <div className="flex items-baseline gap-8">
            <span className="viz-label w-16">Mono</span>
            <span className="font-mono text-sm opacity-60">STATUS: CLINICAL_TEAL • 04:20 AM</span>
          </div>
        </div>
      </div>
      
      {/* Spacing */}
      <div className="viz-card">
        <span className="viz-label block mb-6">Border Radius Scale</span>
        <div className="flex gap-4 items-end">
          {[15, 30, 40, 60].map((r) => (
            <div key={r} className="text-center">
              <div 
                className="w-20 h-20 bg-soul-gold/20 border border-soul-gold/40"
                style={{ borderRadius: `${r}px` }}
              />
              <div className="font-mono text-xs mt-2">{r}px</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ComponentsSection() {
  return (
    <>
      <section className="vellum-hero p-16 animate-fade-in">
        <div className="relative z-10">
          <div className="viz-label text-terracotta tracking-[0.3em] mb-4">
            Component Library
          </div>
          <h1 className="text-5xl leading-[0.9]">
            Vellum<br/>Components
          </h1>
        </div>
      </section>
      
      {/* Cards Demo */}
      <div className="grid grid-cols-2 gap-8">
        <div className="viz-card">
          <span className="viz-label block mb-4">Vellum Card</span>
          <p className="opacity-70">
            Frosted glass cards with 18px blur, monolithic shadows, 
            and warm vellum backgrounds.
          </p>
        </div>
        
        <div className="vellum-card p-8">
          <span className="viz-label block mb-4">Glass Morphism</span>
          <p className="opacity-70">
            Backdrop blur with translucent overlays for depth and warmth.
          </p>
        </div>
      </div>
      
      {/* Buttons */}
      <div className="viz-card">
        <span className="viz-label block mb-6">Buttons</span>
        <div className="flex gap-4 flex-wrap">
          <button type="button" className="btn-monolithic">Monolithic</button>
          <button type="button" className="btn-gold">Soul Gold</button>
          <button 
            type="button" 
            className="px-8 py-4 rounded-full border border-ink/20 font-bold text-xs uppercase tracking-wider hover:bg-ink hover:text-vellum transition-colors"
          >
            Outline
          </button>
          <span className="status-pill bg-ink text-vellum">● Status Pill</span>
        </div>
      </div>
      
      {/* Data Visualization */}
      <div className="viz-card">
        <span className="viz-label block mb-6">Data Bars</span>
        <div className="flex items-end h-[120px] gap-3">
          <div className="data-bar gold" style={{ height: '80%' }} />
          <div className="data-bar teal" style={{ height: '60%' }} />
          <div className="data-bar terracotta" style={{ height: '90%' }} />
          <div className="data-bar" style={{ height: '45%' }} />
          <div className="data-bar gold" style={{ height: '70%' }} />
          <div className="data-bar teal" style={{ height: '85%' }} />
          <div className="data-bar" style={{ height: '55%' }} />
          <div className="data-bar terracotta" style={{ height: '75%' }} />
        </div>
      </div>
      
      {/* Tags */}
      <div className="viz-card">
        <span className="viz-label block mb-6">Tags & Labels</span>
        <div className="flex gap-3 flex-wrap">
          <span className="soul-tag">HOT</span>
          <span className="px-2 py-1 bg-clinical-teal text-white text-xs rounded">LIVE</span>
          <span className="px-2 py-1 bg-ink text-vellum text-xs rounded font-mono">10:00 AM</span>
          <span className="px-2 py-1 border border-soul-gold text-soul-gold text-xs rounded">PREMIUM</span>
        </div>
      </div>
    </>
  );
}

function SafetySection() {
  return (
    <>
      <section className="vellum-hero p-16 animate-fade-in">
        <div className="relative z-10">
          <div className="viz-label text-terracotta tracking-[0.3em] mb-4">
            TLC Safety Components
          </div>
          <h1 className="text-5xl leading-[0.9]">
            Safety<br/>First
          </h1>
          <p className="mt-8 max-w-[500px] leading-relaxed opacity-70">
            UICare, HumanGuard, and SentinelOS components for crisis support, 
            consent management, and cognitive load reduction.
          </p>
        </div>
      </section>
      
      {/* Safety Colors */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { name: "Verified", color: "#4a9b6d", desc: "Safe, approved" },
          { name: "Caution", color: "#c4954d", desc: "Warning state" },
          { name: "Danger", color: "#c44b4b", desc: "Crisis, critical" },
          { name: "Grounding", color: "#8b7355", desc: "Calm, reset" },
        ].map((c) => (
          <div key={c.name} className="viz-card text-center">
            <div 
              className="w-full h-16 rounded-xl mb-3"
              style={{ backgroundColor: c.color }}
            />
            <div className="font-bold text-sm">{c.name}</div>
            <div className="text-xs opacity-50">{c.desc}</div>
          </div>
        ))}
      </div>
      
      {/* Crisis Resources */}
      <div className="viz-card border-l-4 border-l-[#c44b4b]">
        <span className="viz-label block mb-4">Crisis Gate Component</span>
        <p className="mb-6 opacity-70">
          Always-visible crisis resources. Never hidden, always accessible.
        </p>
        <div className="flex gap-4">
          <a 
            href="tel:988" 
            className="px-6 py-3 rounded-full font-bold text-sm text-white bg-[#c44b4b] hover:bg-[#a33d3d] transition-colors"
          >
            Call 988
          </a>
          <a 
            href="sms:741741?body=HOME" 
            className="px-6 py-3 rounded-full border-2 border-[#c44b4b] text-[#c44b4b] font-bold text-sm hover:bg-[#c44b4b] hover:text-white transition-colors"
          >
            Text HOME to 741741
          </a>
        </div>
      </div>
      
      {/* Consent Flow */}
      <div className="viz-card">
        <span className="viz-label block mb-4">Consent Flow Component</span>
        <p className="mb-6 opacity-70">
          Granular consent management with clear explanations and easy withdrawal.
        </p>
        <div className="space-y-3">
          {["Data Collection", "Analytics", "Personalization"].map((item) => (
            <div key={item} className="flex items-center justify-between p-4 bg-vellum/50 rounded-2xl">
              <span className="font-medium">{item}</span>
              <div className="w-12 h-6 bg-soul-gold rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Grounding Exercise */}
      <div className="viz-card !bg-[#8b7355] text-white relative overflow-hidden">
        <span className="viz-label block mb-4 !text-white/80">
          Grounding Reset Component
        </span>
        <div className="text-2xl font-light mb-4">
          5-4-3-2-1 Sensory Exercise
        </div>
        <p className="opacity-80 mb-6">
          Ground yourself in the present moment using your five senses.
        </p>
        <button type="button" className="btn-gold">
          Begin Grounding
        </button>
      </div>
    </>
  );
}
