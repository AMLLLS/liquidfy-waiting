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
  openGraph: {
    title: 'Liquidfy - Coming Soon',
    description: 'The #1 Ecom Library with 150+ Add-Ons to boost your CVR',
    type: 'website',
    url: 'https://liquidfy.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liquidfy - Coming Soon',
    description: 'The #1 Ecom Library with 150+ Add-Ons to boost your CVR',
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
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
} 