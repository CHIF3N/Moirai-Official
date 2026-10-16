'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { type Currency, type Priced, formatAmount, hasFixedPrice, PRICE_ON_REQUEST } from '@/lib/price'
import type { SiteConfig } from '@/lib/site'

// Site Config Context — business contact details from Sanity Site Settings
const SiteConfigContext = createContext<SiteConfig | undefined>(undefined)

export function useSiteConfig() {
  const context = useContext(SiteConfigContext)
  if (!context) throw new Error('useSiteConfig must be used within Providers')
  return context
}

// Theme Context
type Theme = 'light' | 'dark' | 'system'
interface ThemeContextProps { theme: Theme; setTheme: (theme: Theme) => void; resolvedTheme: 'light' | 'dark' }

const ThemeContext = createContext<ThemeContextProps>({ theme: 'light', setTheme: () => {}, resolvedTheme: 'light' })

export const useTheme = () => useContext(ThemeContext)

// The site has one look (Noir Atelier), set on <html> in app/layout.tsx.
// The context stays so existing callers keep working.
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Clear a light-mode choice saved by the old theme toggle
    try { localStorage.removeItem('theme') } catch { /* storage unavailable */ }
  }, [])

  return <ThemeContext.Provider value={{ theme: 'dark', setTheme: () => {}, resolvedTheme: 'dark' }}>{children}</ThemeContext.Provider>
}

// Currency Context
interface CurrencyContextType {
  currency: Currency
  setCurrency: (c: Currency) => void
  formatPrice: (priceInXaf: number) => string
  // Product price for display, or "Price on request"
  displayPrice: (p: Priced) => string
  // USD is offered only when the owner has set a rate in Site Settings
  usdAvailable: boolean
  usdRateUpdatedAt: string | null
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider')
  return context
}

// Recently Viewed Context
interface RecentlyViewedContextType {
  viewedItems: any[]
  addViewedItem: (item: any) => void
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined)

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext)
  if (!context) throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider')
  return context
}

export function Providers({ children, site }: { children: React.ReactNode; site: SiteConfig }) {
  // Currency Logic
  const usdAvailable = site.usdRate !== null
  const [selectedCurrency, setCurrency] = useState<Currency>('XAF')
  const currency: Currency = usdAvailable ? selectedCurrency : 'XAF'
  
  useEffect(() => {
    const saved = localStorage.getItem('moirai_currency') as Currency
    if (saved === 'USD' || saved === 'XAF') {
      setCurrency(saved)
    }
  }, [])

  const handleSetCurrency = (c: Currency) => {
    setCurrency(c)
    localStorage.setItem('moirai_currency', c)
  }

  const formatPrice = (priceInXaf: number) => formatAmount(priceInXaf, currency, site.usdRate)
  const displayPrice = (p: Priced) => hasFixedPrice(p) ? formatPrice(p.price) : PRICE_ON_REQUEST

  // Recently Viewed Logic
  const [viewedItems, setViewedItems] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('moirai_recently_viewed')
    if (saved) {
      try {
        setViewedItems(JSON.parse(saved))
      } catch (e) {
        // ignore format errors
      }
    }
  }, [])

  const addViewedItem = (item: any) => {
    setViewedItems(prev => {
      const exists = prev.find(p => p._id === item._id)
      if (exists) return prev
      const newItems = [item, ...prev].slice(0, 4) // keep last 4
      localStorage.setItem('moirai_recently_viewed', JSON.stringify(newItems))
      return newItems
    })
  }

  return (
    <ThemeProvider>
      <SiteConfigContext.Provider value={site}>
        <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, formatPrice, displayPrice, usdAvailable, usdRateUpdatedAt: site.usdRateUpdatedAt }}>
          <RecentlyViewedContext.Provider value={{ viewedItems, addViewedItem }}>
            {children}
          </RecentlyViewedContext.Provider>
        </CurrencyContext.Provider>
      </SiteConfigContext.Provider>
    </ThemeProvider>
  )
}
