// =============================================================================
// ZMUX TAILWIND PRESET
// Drop-in Tailwind configuration for TLC products
// =============================================================================

import type { Config } from "tailwindcss";

export const zmuxPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        // Sanctuary Palette
        "sanctuary-gold": "hsl(var(--sanctuary-gold) / <alpha-value>)",
        "sanctuary-teal": "hsl(var(--sanctuary-teal) / <alpha-value>)",
        "sanctuary-terracotta": "hsl(var(--sanctuary-terracotta) / <alpha-value>)",
        
        // Semantic Colors
        "warm-cream": "hsl(var(--warm-cream) / <alpha-value>)",
        "sage": "hsl(var(--sage) / <alpha-value>)",
        "clay": "hsl(var(--clay) / <alpha-value>)",
        
        // Truth Tiers
        "truth-t1": "hsl(var(--truth-t1) / <alpha-value>)",
        "truth-t2": "hsl(var(--truth-t2) / <alpha-value>)",
        "truth-t3": "hsl(var(--truth-t3) / <alpha-value>)",
        
        // Mood Signals
        "mood-calm": "hsl(var(--mood-calm) / <alpha-value>)",
        "mood-neutral": "hsl(var(--mood-neutral) / <alpha-value>)",
        "mood-stressed": "hsl(var(--mood-stressed) / <alpha-value>)",
        "mood-crisis": "hsl(var(--mood-crisis) / <alpha-value>)",
        
        // Risk Levels
        "risk-low": "hsl(var(--risk-low) / <alpha-value>)",
        "risk-medium": "hsl(var(--risk-medium) / <alpha-value>)",
        "risk-high": "hsl(var(--risk-high) / <alpha-value>)",
        "risk-critical": "hsl(var(--risk-critical) / <alpha-value>)",
      },
      
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "Menlo", "monospace"],
      },
      
      fontSize: {
        // Neurodivergent-optimized scale
        "nd-xs": ["0.875rem", { lineHeight: "1.6" }],
        "nd-sm": ["1rem", { lineHeight: "1.6" }],
        "nd-base": ["1.125rem", { lineHeight: "1.7" }],
        "nd-lg": ["1.25rem", { lineHeight: "1.6" }],
        "nd-xl": ["1.5rem", { lineHeight: "1.5" }],
        "nd-2xl": ["2rem", { lineHeight: "1.4" }],
      },
      
      spacing: {
        // 4px base unit
        "zmux-1": "0.25rem",
        "zmux-2": "0.5rem",
        "zmux-3": "0.75rem",
        "zmux-4": "1rem",
        "zmux-6": "1.5rem",
        "zmux-8": "2rem",
        "zmux-12": "3rem",
        "zmux-16": "4rem",
      },
      
      borderRadius: {
        "zmux-sm": "0.375rem",
        "zmux-md": "0.5rem",
        "zmux-lg": "0.75rem",
        "zmux-xl": "1rem",
      },
      
      boxShadow: {
        "glass": "0 4px 30px rgba(0, 0, 0, 0.1)",
        "glass-lg": "0 8px 32px rgba(0, 0, 0, 0.15)",
        "sanctuary": "0 4px 20px rgba(201, 160, 90, 0.15)",
      },
      
      backdropBlur: {
        "glass": "16px",
        "glass-lg": "24px",
      },
      
      animation: {
        "pulse-gentle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
};

export default zmuxPreset;
