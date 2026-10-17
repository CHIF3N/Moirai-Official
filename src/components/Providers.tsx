'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'
import { type Currency, type Priced, formatAmount, hasFixedPrice, PRICE_ON_REQUEST } from '@/lib/price'
import type { SiteConfig } from '@/lib/site'

// Site Config Context — business contact details from Sanity Site Settings
const SiteConfigContext = createContext<SiteConfig | undefined>(undefined)

export function useSiteConfig() {
  const context = useContext(SiteConfigContext)
  if (!context) throw new Error('useSiteConfig must be used within Providers')
  return context
}

// Theme Context — light / dark. The first paint is handled by the inline script in
// app/layout.tsx (THEME_SCRIPT), so this provider only syncs state and saves choices.
type Theme = 'light' | 'dark'
interface ThemeContextProps { theme: Theme; setTheme: (theme: Theme) => void; resolvedTheme: Theme }

export const THEME_STORAGE_KEY = 'moirai-theme'

const ThemeContext = createContext<ThemeContextProps>({ theme: 'light', setTheme: () => {}, resolvedTheme: 'light' })

export const useTheme = () => useContext(ThemeContext)

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.setAttribute('data-theme', theme)
  root.classList.toggle('dark', theme === 'dark')
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    setThemeState(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light')
    try { localStorage.removeItem('theme') } catch { /* key from an older toggle */ }

    // Follow the operating system only until the visitor makes an explicit choice
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      let saved: string | null = null
      try { saved = localStorage.getItem(THEME_STORAGE_KEY) } catch { /* ignore */ }
      if (saved) return
      const next: Theme = e.matches ? 'dark' : 'light'
      applyTheme(next)
      setThemeState(next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const setTheme = (next: Theme) => {
    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce) root.classList.add('theme-switching')
    applyTheme(next)
    setThemeState(next)
    try { localStorage.setItem(THEME_STORAGE_KEY, next) } catch { /* storage unavailable: theme still applies for this visit */ }
    if (!reduce) window.setTimeout(() => root.classList.remove('theme-switching'), 400)
  }

  return <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme: theme }}>{children}</ThemeContext.Provider>
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
  // False until the owner confirms prices in Site Settings
  showPrices: boolean
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
  const usdAvailable = site.usdRate !== null && site.showPrices
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
  const displayPrice = (p: Priced) => site.showPrices && hasFixedPrice(p) ? formatPrice(p.price) : PRICE_ON_REQUEST

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
      {/* Honour the visitor's reduced-motion setting everywhere without changing the rendered markup */}
      <MotionConfig reducedMotion="user">
      <SiteConfigContext.Provider value={site}>
        <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, formatPrice, displayPrice, usdAvailable, usdRateUpdatedAt: site.usdRateUpdatedAt, showPrices: site.showPrices }}>
          <RecentlyViewedContext.Provider value={{ viewedItems, addViewedItem }}>
            {children}
          </RecentlyViewedContext.Provider>
        </CurrencyContext.Provider>
      </SiteConfigContext.Provider>
      </MotionConfig>
    </ThemeProvider>
  )
}
