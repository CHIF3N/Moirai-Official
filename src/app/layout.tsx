import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import AIChatWidget from '@/components/AIChatWidget'
import PageTransition from '@/components/PageTransition'
import { Providers } from '@/components/Providers'
import { CartProvider } from '@/components/CartDrawer'
import SilkLoader from '@/components/SilkLoader'
import { fetchOr, siteSettingsQuery } from '@/lib/sanity'
import { getSiteConfig } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL('https://moiraihouse.com'),
  title: 'Moirai. — Destiny, Tailored',
  description: 'Not a Trend. IDENTITY. Luxury bespoke fashion, corsets, cocktail dresses and Cameroonian traditional wear. The House of Moirai.',
  keywords: 'bespoke fashion, Cameroon, couture, corsets, cocktail dresses, fashion school, Moirai, luxury wear, custom dresses',
  openGraph: {
    title: 'Moirai. — Destiny, Tailored',
    description: 'Not a Trend. IDENTITY. Luxury bespoke fashion crafted for who you are becoming.',
    url: 'https://moiraihouse.com',
    siteName: 'Moirai — The House of Moirai',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Moirai Luxury Fashion Bespoke Couture',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moirai. — Destiny, Tailored',
    description: 'Luxury bespoke fashion crafted for who you are becoming.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settings = await fetchOr<any>('siteSettings', siteSettingsQuery, null)
  const site = getSiteConfig(settings)

  return (
    <html lang="en">
      {/* paddingTop accounts for fixed ticker (29px) + editorial navbar (~80px) */}
      <body style={{ paddingTop: '109px' }}>
        <Providers site={site}>
          <CartProvider>
            <SilkLoader />
            <Navbar />
            <main style={{ position: 'relative', zIndex: 1 }}>
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer settings={settings} />
            <WhatsAppButton number={site.whatsappNumber} message={site.defaultMessage} />
            <AIChatWidget />
          </CartProvider>
        </Providers>
      </body>
    </html>
  )
}
