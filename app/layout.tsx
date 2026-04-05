import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

/**
 * ZMUX Design System - Root Layout
 * THE SANCTUARY - Vellum Clinical Aesthetic
 */

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'THE SANCTUARY | Vellum Clinical',
  description: 'A soft landing for the weary soul. Precision metabolic tracking meets the warmth of a Southern parlor.',
}

export const viewport: Viewport = {
  themeColor: '#e5e0d5',
  width: 'device-width',
  initialScale: 1,
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
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/* Vellum diffusion layer */}
        <div className="vellum-layer" />
        
        {children}
        
        <Analytics />
      </body>
    </html>
  )
}
