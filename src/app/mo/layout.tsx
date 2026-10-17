import type { Metadata } from 'next'
import { Anton } from 'next/font/google'

// MO's display face — loaded only on MO pages
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-mo', display: 'swap' })

export const metadata: Metadata = {
  title: 'MO by Moirai — Streetwear',
  description: 'MO by Moirai: streetwear from the House of Moirai. The STASIS jackets, the Velvet Puff STÁSIS and early access to the second drop.',
  alternates: { canonical: '/mo' },
  openGraph: { title: 'MO by Moirai — Streetwear', description: 'Streetwear from the House of Moirai.', url: '/mo', images: [{ url: '/social/jacket-collection-green.jpg', width: 1200, height: 1200 }] },
}

export default function MoLayout({ children }: { children: React.ReactNode }) {
  return <div className={anton.variable}>{children}</div>
}
