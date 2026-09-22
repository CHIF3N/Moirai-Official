'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './Providers'

// ── Icons ──
const Sun = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)
const Moon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)
const BagIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
)

// ── Nav Links ──
const LEFT_LINKS = [
  { href: '/collections', label: 'Collections' },
  { href: '/shop',        label: 'Shop' },
  { href: '/bespoke',     label: 'Bespoke' },
]
const RIGHT_LINKS = [
  { href: '/fashion-school', label: 'Fashion School' },
  { href: '/blog',           label: 'Journal' },
  { href: '/about',          label: 'About' },
]
const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS]

// ── Ticker content ──
const TICKER_ITEMS = [
  'THE HOUSE OF MOIRAI',
  '✦',
  'DESTINY, TAILORED',
  '✦',
  'BESPOKE COUTURE & ATELIER',
  '✦',
  'HANDCRAFTED IN CAMEROON',
  '✦',
  'AUTUMN / WINTER 2026',
  '✦',
  'THE HOUSE OF MOIRAI',
  '✦',
  'DESTINY, TAILORED',
  '✦',
  'BESPOKE COUTURE & ATELIER',
  '✦',
  'HANDCRAFTED IN CAMEROON',
  '✦',
  'AUTUMN / WINTER 2026',
  '✦',
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [open, setOpen]           = useState(false)
  const { theme, setTheme }       = useTheme()
  const [mounted, setMounted]     = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* ── Heritage Ticker Ribbon ── */}
      <div className="ticker-wrap" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1020 }}>
        <div className="ticker-track">
          {TICKER_ITEMS.map((item, i) => (
            <span
              key={i}
              className="ticker-item"
              style={{
                color: item === '✦' ? 'var(--obsidian)' : 'var(--umber)',
                opacity: item === '✦' ? 0.4 : 1,
                padding: item === '✦' ? '0 1.5rem' : '0 2.5rem',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Editorial Sticky Navbar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`editorial-nav${scrolled ? ' scrolled' : ''}`}
        style={{ top: '29px' }}  /* sits below ticker */
      >
        {/* Left Nav Links */}
        <div className="nav-left desk-nav">
          {LEFT_LINKS.map((l, i) => (
            <motion.div
              key={l.href}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.07, ease: 'easeOut' }}
            >
              <Link href={l.href} className="nav-link">{l.label}</Link>
            </motion.div>
          ))}
        </div>

        {/* Center Wordmark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}
        >
          <Link href="/" style={{ textDecoration: 'none', display: 'block' }}>
            <span className="wordmark">MOIRAI</span>
            <span className="wordmark-sub">THE HOUSE OF MOIRAI</span>
          </Link>
        </motion.div>

        {/* Right Utility */}
        <div className="nav-right desk-nav">
          {RIGHT_LINKS.map((l, i) => (
            <motion.div
              key={l.href}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.07, ease: 'easeOut' }}
            >
              <Link href={l.href} className="nav-link">{l.label}</Link>
            </motion.div>
          ))}

          {/* WhatsApp Enquire pill */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.4 }}
          >
            <a
              href="https://wa.me/237682710405"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-enquire"
            >
              ENQUIRE
            </a>
          </motion.div>

          {/* Bag counter */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.46 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--umber)', cursor: 'default' }}
          >
            <BagIcon />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '9.5px', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              BAG (0)
            </span>
          </motion.div>

          {/* Theme Toggle */}
          {mounted && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.5 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{ color: 'var(--umber)', transition: 'color 0.25s', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--obsidian)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--umber)')}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
            </motion.button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <motion.button
          onClick={() => setOpen(!open)}
          className="burger-btn"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'none', flexDirection: 'column', gap: '5px', zIndex: 1021, cursor: 'pointer', marginLeft: 'auto' }}
          aria-label="Menu"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              width: 22, height: 1,
              background: 'var(--obsidian)',
              display: 'block',
              transition: 'all 0.3s ease',
              transform: open && i === 0 ? 'rotate(45deg) translate(4px, 4px)' : open && i === 2 ? 'rotate(-45deg) translate(4px,-4px)' : 'none',
              opacity: open && i === 1 ? 0 : 1,
            }} />
          ))}
        </motion.button>
      </motion.nav>

      {/* ── Mobile Full-Screen Menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1015,
              background: 'var(--canvas)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.25rem',
              paddingTop: '5rem',
            }}
          >
            {/* Mobile wordmark */}
            <Link href="/" onClick={() => setOpen(false)} style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
              <span className="wordmark" style={{ fontSize: '2.25rem' }}>MOIRAI</span>
              <span className="wordmark-sub" style={{ marginTop: '5px' }}>THE HOUSE OF MOIRAI</span>
            </Link>

            <div style={{ width: '32px', height: '1px', background: 'var(--hairline)', margin: '0 auto' }} />

            {ALL_LINKS.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: i * 0.065, ease: 'easeOut' }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.65rem',
                    fontWeight: 300,
                    color: 'var(--obsidian)',
                    letterSpacing: '0.05em',
                    display: 'block',
                    textAlign: 'center',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--umber)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--obsidian)')}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}

            {/* Mobile WhatsApp */}
            <a
              href="https://wa.me/237682710405"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-enquire"
              style={{ marginTop: '1rem' }}
            >
              ENQUIRE VIA WHATSAPP
            </a>

            {/* Mobile theme toggle */}
            {mounted && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                style={{
                  color: 'var(--umber)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '9.5px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  padding: '0.5rem 1rem',
                  border: '1px solid var(--hairline)',
                  cursor: 'pointer',
                }}
              >
                {theme === 'dark' ? <><Sun /> Light Mode</> : <><Moon /> Dark Mode</>}
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1060px) {
          .desk-nav { display: none !important; }
          .burger-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
