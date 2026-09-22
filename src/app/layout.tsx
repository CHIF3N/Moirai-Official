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
import { client, siteSettingsQuery } from '@/lib/sanity'

export const metadata: Metadata = {
  metadataBase: new URL("https://moirai-official-xi.vercel.app"),
  title: 'Moirai. — Destiny, Tailored',
  description: 'Not a Trend. IDENTITY. Luxury bespoke fashion, corsets, cocktail dresses and Cameroonian traditional wear. The House of Moirai.',
  keywords: 'bespoke fashion, Cameroon, couture, corsets, cocktail dresses, fashion school, Moirai, luxury wear, custom dresses',
  openGraph: {
    title: 'Moirai. — Destiny, Tailored',
    description: 'Not a Trend. IDENTITY. Luxury bespoke fashion crafted for who you are becoming.',
    url: 'https://moirai.com',
    siteName: 'Moirai.th',
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
  let settings: any = null
  try {
    settings = await client.fetch(siteSettingsQuery)
  } catch {
    // Sanity not yet configured — use defaults
  }

  const waNumber = settings?.whatsappNumber || '237682710405'
  const waMessage = settings?.whatsappDefaultMessage || "Hi, I'd like to inquire about Moirai"

  return (
    <html lang="en">
      {/* paddingTop accounts for fixed ticker (29px) + editorial navbar (~80px) */}
      <body style={{ paddingTop: '109px' }}>
        <Providers>
          <CartProvider>
            <SilkLoader />
            <Navbar />
            <main style={{ position: 'relative', zIndex: 1 }}>
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer settings={settings} />
            <WhatsAppButton number={waNumber} message={waMessage} />
            <AIChatWidget />
          </CartProvider>
        </Providers>
      </body>
    </html>
  )
}
