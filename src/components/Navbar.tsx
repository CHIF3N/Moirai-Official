'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useSiteConfig } from './Providers'
import { useCart } from './CartDrawer'
import ThemeToggle from './ThemeToggle'
import Logo from './Logo'
import { waLink, CONSULTATION_HREF } from '@/lib/site'

const BagIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
)

const LEFT_LINKS = [
  { href: '/collections',    label: 'Collections' },
  { href: '/shop',           label: 'Shop' },
  { href: '/bespoke',        label: 'Bespoke' },
  { href: '/fashion-school', label: 'School' },
]
const RIGHT_LINKS = [
  { href: '/blog',  label: 'Journal' },
  { href: '/about', label: 'About' },
]
const ALL_LINKS = [
  ...LEFT_LINKS.map(l => l.href === '/fashion-school' ? { ...l, label: 'Fashion School' } : l),
  ...RIGHT_LINKS,
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { toggleCart, totalItems } = useCart()
  const site = useSiteConfig()
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu whenever the route changes
  useEffect(() => { setOpen(false) }, [pathname])

  // Menu open: lock scroll, focus the first link, close on Escape, keep Tab inside
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusables = () => Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a, button') ?? [])
    focusables()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); burgerRef.current?.focus(); return }
      if (e.key !== 'Tab') return
      const items = focusables()
      if (items.length === 0) return
      const first = items[0], last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prevOverflow; document.removeEventListener('keydown', onKey) }
  }, [open])

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>

      <header className={`site-nav glass${scrolled || open ? ' is-solid' : ''}`}>
        <nav className="site-nav-inner" aria-label="Main">
          <ul className="site-nav-links desk-only">
            {LEFT_LINKS.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="nav-link" aria-current={isActive(l.href) ? 'page' : undefined}>{l.label}</Link>
              </li>
            ))}
          </ul>

          <Link href="/" className="site-nav-brand" aria-label="Moirai — home">
            <Logo className="site-logo" title="Moirai" />
          </Link>

          <div className="site-nav-actions">
            <ul className="site-nav-links desk-only">
              {RIGHT_LINKS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="nav-link" aria-current={isActive(l.href) ? 'page' : undefined}>{l.label}</Link>
                </li>
              ))}
            </ul>

            <ThemeToggle />

            <button type="button" onClick={toggleCart} className="nav-icon-btn" aria-label={totalItems > 0 ? `Open bag, ${totalItems} item${totalItems === 1 ? '' : 's'}` : 'Open bag'}>
              <BagIcon />
              {totalItems > 0 && <span className="nav-bag-count" aria-hidden="true">{totalItems}</span>}
            </button>

            <Link href={CONSULTATION_HREF} className="btn-primary nav-cta desk-only">Book a consultation</Link>

            <button
              ref={burgerRef}
              type="button"
              className="nav-icon-btn mob-only"
              onClick={() => setOpen(o => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <span className={`burger${open ? ' is-open' : ''}`} aria-hidden="true"><span /><span /></span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="mobile-menu glass"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="mobile-menu-links">
              {ALL_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={l.href} onClick={() => setOpen(false)} aria-current={isActive(l.href) ? 'page' : undefined}>
                    <span className="mobile-menu-index">{String(i + 1).padStart(2, '0')}</span>{l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mobile-menu-foot">
              <Link href={CONSULTATION_HREF} onClick={() => setOpen(false)} className="btn-primary" style={{ width: '100%' }}>Book a consultation</Link>
              <a href={waLink(site.whatsappNumber, site.defaultMessage)} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ width: '100%' }}>
                WhatsApp {site.whatsappDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
