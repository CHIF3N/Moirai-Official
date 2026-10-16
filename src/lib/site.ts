// Business contact details, read once from Sanity Site Settings.
// The fallbacks are the details the site already used before they became editable.

export interface SiteConfig {
  whatsappNumber: string // digits only, international format
  whatsappDisplay: string
  defaultMessage: string
  email: string | null
  // Social links appear only when the URL is verified (set in Site Settings or confirmed by the owner)
  instagramUrl: string | null
  instagramHandle: string | null
  tiktokUrl: string | null
  tiktokHandle: string | null
  location: string | null
  usdRate: number | null
  usdRateUpdatedAt: string | null
  // Prices stay hidden ("Price on request") until the owner switches this on in Site Settings
  showPrices: boolean
}

const FALLBACK_WHATSAPP = '237682710405'
// Both confirmed by the owner on 16 Oct 2026 and checked: profiles are named "MOIRAI." / "MOIRAI".
// (The old handles @Moirai.th and @MOIRAI belonged to other or missing accounts.)
const FALLBACK_INSTAGRAM = 'https://www.instagram.com/moirai.th_/'
const FALLBACK_TIKTOK = 'https://www.tiktok.com/@threads_ofheritage'

function displayPhone(digits: string) {
  // Cameroon numbers: +237 6XX XXX XXX
  if (digits.startsWith('237') && digits.length === 12) {
    const n = digits.slice(3)
    return `+237 ${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6)}`
  }
  return `+${digits}`
}

function handleFromUrl(url: string) {
  const last = url.replace(/\/+$/, '').split('/').pop() || ''
  return last.startsWith('@') ? last : `@${last}`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSiteConfig(settings: any): SiteConfig {
  const digits = String(settings?.whatsappNumber || '').replace(/\D/g, '')
  const whatsappNumber = digits.length >= 8 ? digits : FALLBACK_WHATSAPP
  const instagramUrl: string | null = settings?.instagramUrl || FALLBACK_INSTAGRAM
  const tiktokUrl: string | null = settings?.tiktokUrl || FALLBACK_TIKTOK
  const rate = Number(settings?.usdRate)

  return {
    whatsappNumber,
    whatsappDisplay: displayPhone(whatsappNumber),
    defaultMessage: settings?.whatsappDefaultMessage || "Hi, I'd like to inquire about Moirai",
    email: settings?.email || null,
    instagramUrl,
    instagramHandle: instagramUrl ? handleFromUrl(instagramUrl) : null,
    tiktokUrl,
    tiktokHandle: tiktokUrl ? handleFromUrl(tiktokUrl) : null,
    location: settings?.footerLocation || null,
    usdRate: Number.isFinite(rate) && rate > 0 ? rate : null,
    usdRateUpdatedAt: settings?.usdRateUpdatedAt || null,
    showPrices: settings?.showPrices === true,
  }
}

export function waLink(number: string, text?: string) {
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}

// Where every "Book a consultation" button leads: the bespoke inquiry form
export const CONSULTATION_HREF = '/bespoke#contact-design'
