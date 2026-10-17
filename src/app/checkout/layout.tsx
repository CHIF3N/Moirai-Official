import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout — Moirai',
  description: 'Review your order and pay for MO pieces with Mobile Money on Fapshi.',
  robots: { index: false, follow: true },
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children
}
