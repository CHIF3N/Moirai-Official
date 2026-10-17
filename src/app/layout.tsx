import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Plus_Jakarta_Sans, Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Concierge from '@/components/Concierge'
import PageTransition from '@/components/PageTransition'
import { Providers } from '@/components/Providers'
import { CartProvider } from '@/components/CartDrawer'
import SilkLoader from '@/components/SilkLoader'
import { fetchOr, siteSettingsQuery } from '@/lib/sanity'
import { getSiteConfig } from '@/lib/site'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jakarta',
  display: 'swap',
})

// The "BY MOIRAI" line of the MO by Moirai logo
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBFAF8' },
    { media: '(prefers-color-scheme: dark)', color: '#0D0B10' },
  ],
}

// Runs before first paint: saved choice, else the operating-system preference.
// Keeps the wrong theme from flashing. Storage key matches THEME_STORAGE_KEY in Providers.
const THEME_SCRIPT = `(function(){try{var t=null;try{t=localStorage.getItem('moirai-theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var d=document.documentElement;d.setAttribute('data-theme',t);if(t==='dark'){d.classList.add('dark')}else{d.classList.remove('dark')}}catch(e){}})();`

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
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <Providers site={site}>
          <CartProvider>
            <SilkLoader />
            <Navbar />
            <main id="main" style={{ position: 'relative', zIndex: 1 }}>
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer settings={settings} />
            <Concierge />
          </CartProvider>
        </Providers>
      </body>
    </html>
  )
}
