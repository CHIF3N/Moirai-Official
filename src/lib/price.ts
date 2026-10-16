// XAF is the authoritative price stored in Sanity. USD is only an indicative
// conversion using the rate the owner maintains in Site Settings.

export type Currency = 'XAF' | 'USD'
export type PriceType = 'fixed' | 'on_request'

export interface Priced {
  price?: number | null
  priceType?: PriceType | null
}

export const PRICE_ON_REQUEST = 'Price on request'

export function hasFixedPrice<T extends Priced>(p: T): p is T & { price: number } {
  return p.priceType !== 'on_request' && typeof p.price === 'number' && p.price > 0
}

// Grouped by hand (not toLocaleString) so server and client render identical text.
function group(n: number, sep: string) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep)
}

export function formatXAF(amount: number) {
  return `${group(amount, ' ')} FCFA`
}

export function formatAmount(xaf: number, currency: Currency, xafPerUsd?: number | null) {
  if (currency === 'USD' && xafPerUsd && xafPerUsd > 0) {
    return `≈ $${group(xaf / xafPerUsd, ',')}`
  }
  return formatXAF(xaf)
}
