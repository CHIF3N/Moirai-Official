// Business contact details, read once from Sanity Site Settings.
// The fallbacks are the details the site already used before they became editable.

export interface SiteConfig {
  whatsappNumber: string // digits only, international format
  whatsappDisplay: string
  defaultMessage: string
  email: string | null
  instagramUrl: string
  instagramHandle: string
  tiktokUrl: string
  tiktokHandle: string
  location: string | null
  usdRate: number | null
  usdRateUpdatedAt: string | null
}

const FALLBACK_WHATSAPP = '237682710405'
const FALLBACK_INSTAGRAM = 'https://instagram.com/Moirai.th'
const FALLBACK_TIKTOK = 'https://tiktok.com/@MOIRAI'

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
  const instagramUrl = settings?.instagramUrl || FALLBACK_INSTAGRAM
  const tiktokUrl = settings?.tiktokUrl || FALLBACK_TIKTOK
  const rate = Number(settings?.usdRate)

  return {
    whatsappNumber,
    whatsappDisplay: displayPhone(whatsappNumber),
    defaultMessage: settings?.whatsappDefaultMessage || "Hi, I'd like to inquire about Moirai",
    email: settings?.email || null,
    instagramUrl,
    instagramHandle: handleFromUrl(instagramUrl),
    tiktokUrl,
    tiktokHandle: handleFromUrl(tiktokUrl),
    location: settings?.footerLocation || null,
    usdRate: Number.isFinite(rate) && rate > 0 ? rate : null,
    usdRateUpdatedAt: settings?.usdRateUpdatedAt || null,
  }
}

export function waLink(number: string, text?: string) {
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}
