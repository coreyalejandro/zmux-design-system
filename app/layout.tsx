import type { Metadata, Viewport } from 'next'
import { Inter, Crimson_Pro, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

/**
 * ZMUX Design System - Root Layout
 * 
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_A11Y - Semantic HTML and accessibility features
 * @invariant INVARIANT_I2 - Skip link for keyboard navigation
 */

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'ZMUX Design System | The Living Constitution',
    template: '%s | ZMUX Design System',
  },
  description: 'Accessibility-first, safety-first design system implementing The Living Constitution (TLC) governance principles. WCAG 2.2 AAA compliant.',
  keywords: [
    'design system',
    'accessibility',
    'WCAG AAA',
    'safety',
    'neurodivergent',
    'The Living Constitution',
    'TLC',
    'ZMUX',
  ],
  authors: [{ name: 'The Living Constitution' }],
  creator: 'The Living Constitution',
  publisher: 'The Living Constitution',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FEFDFB' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1917' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={`${inter.variable} ${crimsonPro.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">
        {/* Skip link for keyboard navigation - INVARIANT_I2 */}
        <a 
          href="#main-content" 
          className="skip-link"
        >
          Skip to main content
        </a>
        
        <main id="main-content">
          {children}
        </main>
        
        <Analytics />
      </body>
    </html>
  )
}
