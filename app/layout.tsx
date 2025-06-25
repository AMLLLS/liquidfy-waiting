import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://liquidfy.app'),
  title: 'Liquidfy - Coming Soon',
  description: 'The #1 Ecom Library with 150+ Add-Ons to boost your CVR. Coming Soon.',
  keywords: ['ecommerce', 'shopify', 'modules', 'conversion', 'liquify'],
  authors: [{ name: 'Liquidfy Team' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Liquidfy - Coming Soon',
    description: 'The #1 Ecom Library with 150+ Add-Ons to boost your CVR. Revolutionary e-commerce platform launching soon!',
    type: 'website',
    url: 'https://liquidfy.app',
    siteName: 'Liquidfy',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Liquidfy - 150+ custom secret high converting sections & modules for your ecom shop',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@liquidfy',
    creator: '@liquidfy',
    title: 'Liquidfy - Coming Soon',
    description: 'The #1 Ecom Library with 150+ Add-Ons to boost your CVR. Revolutionary e-commerce platform launching soon!',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#4f46e5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Additional Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#4f46e5" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
} 