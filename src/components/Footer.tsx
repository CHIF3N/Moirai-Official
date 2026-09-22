'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCurrency } from './Providers'

interface FooterProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: any
}

export default function Footer({ settings }: FooterProps) {
  const waNumber = (settings?.whatsappNumber || '237682710405').replace(/\D/g, '')
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent("Hi, I'd like to inquire about Moirai")}`
  const { currency, setCurrency } = useCurrency()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const locationText = settings?.footerLocation || 'Made in Cameroon 🇨🇲  ·  Buea, Cameroon'

  const staggerChild = {
    hidden:  { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  }

  return (
    <footer
      style={{
        borderTop: '1px solid var(--hairline)',
        background: 'var(--canvas)',
        padding: '5.5rem 3.5rem 2.5rem',
      }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>

        {/* ── Newsletter ── */}
        {settings?.newsletterEmail && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{
              marginBottom: '5rem',
              padding: '3rem',
              background: 'var(--surface)',
              border: '1px solid var(--hairline)',
              textAlign: 'center',
            }}
          >
            <p className="section-label" style={{ marginBottom: '0.75rem' }}>INNER CIRCLE</p>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 300,
                color: 'var(--obsidian)',
                marginBottom: '0.75rem',
              }}
            >
              Join the Inner Circle
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--umber)',
                marginBottom: '2rem',
                maxWidth: '480px',
                margin: '0 auto 2rem',
              }}
            >
              Receive exclusive access to bespoke creations, private collections, and fashion school updates.
            </p>
            {subscribed ? (
              <p className="section-label" style={{ color: 'var(--obsidian)' }}>✦ THANK YOU — WELCOME TO THE CIRCLE</p>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); setSubscribed(true) }}
                style={{ display: 'flex', gap: '0', maxWidth: '420px', margin: '0 auto' }}
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    padding: '0.8rem 1rem',
                    background: 'var(--canvas)',
                    border: '1px solid var(--hairline)',
                    borderRight: 'none',
                    color: 'var(--obsidian)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    outline: 'none',
                    minWidth: 0,
                  }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '0.8rem 1.5rem', minHeight: 'auto', flexShrink: 0, fontSize: '9.5px', letterSpacing: '0.2em' }}>
                  SUBSCRIBE
                </button>
              </form>
            )}
          </motion.div>
        )}

        {/* ── Main Footer Grid ── */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3.5rem',
            marginBottom: '4rem',
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Brand Column */}
          <motion.div variants={staggerChild}>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 300,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--obsidian)',
                lineHeight: 1,
                marginBottom: '0.4rem',
              }}
            >
              MOIRAI
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '7px',
                letterSpacing: '0.42em',
                textTransform: 'uppercase',
                color: 'var(--umber)',
                marginBottom: '1.5rem',
              }}
            >
              THE HOUSE OF MOIRAI
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontStyle: 'italic',
                color: 'var(--umber)',
                lineHeight: 1.85,
                marginBottom: '1rem',
              }}
            >
              Not a Trend. IDENTITY.<br />Made for who you are Becoming.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: 'var(--umber)',
                opacity: 0.7,
              }}
            >
              {locationText}
            </p>
          </motion.div>

          {/* Navigate */}
          <motion.div variants={staggerChild}>
            <p className="section-label" style={{ marginBottom: '1.5rem' }}>NAVIGATE</p>
            {[
              ['/', 'Home'],
              ['/collections', 'Collections'],
              ['/shop', 'Shop'],
              ['/bespoke', 'Bespoke'],
              ['/fashion-school', 'Fashion School'],
              ['/about', 'About'],
              ['/blog', 'Journal'],
              ['/contact', 'Contact'],
            ].map(([href, label]) => (
              <div key={href} style={{ marginBottom: '0.65rem' }}>
                <Link
                  href={href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: 'var(--umber)',
                    transition: 'color 0.2s',
                    display: 'inline-block',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--obsidian)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--umber)')}
                >
                  {label}
                </Link>
              </div>
            ))}
          </motion.div>

          {/* Preferences */}
          <motion.div variants={staggerChild}>
            <p className="section-label" style={{ marginBottom: '1.5rem' }}>PREFERENCES</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--umber)', marginBottom: '0.6rem', letterSpacing: '0.05em' }}>Currency Display</p>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {(['XAF', 'USD'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '9.5px',
                    fontWeight: 500,
                    letterSpacing: '0.18em',
                    padding: '0.35rem 0.85rem',
                    border: `1px solid ${currency === c ? 'var(--obsidian)' : 'var(--hairline)'}`,
                    background: currency === c ? 'var(--obsidian)' : 'transparent',
                    color: currency === c ? 'var(--canvas)' : 'var(--umber)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div variants={staggerChild}>
            <p className="section-label" style={{ marginBottom: '1.5rem' }}>CONNECT</p>
            {[
              { href: waUrl, label: 'WhatsApp: +237 682 710 405' },
              ...(settings?.email ? [{ href: `mailto:${settings.email}`, label: settings.email }] : []),
              { href: 'https://instagram.com/Moirai.th', label: 'Instagram: @Moirai.th' },
              { href: 'https://tiktok.com/@MOIRAI', label: 'TikTok: @MOIRAI' },
            ].map(item => (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'var(--umber)',
                  marginBottom: '0.7rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--obsidian)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--umber)')}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Footer Bottom Bar ── */}
        <div
          style={{
            borderTop: '1px solid var(--hairline)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', color: 'var(--umber)' }}>
            © {new Date().getFullYear()} Moirai. All rights reserved.
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '11px', fontStyle: 'italic', color: 'var(--umber)', opacity: 0.6 }}>
            Destiny, Tailored.
          </p>
          <Link
            href="/studio"
            style={{ fontFamily: 'var(--font-body)', fontSize: '9.5px', letterSpacing: '0.15em', color: 'var(--hairline)', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--umber)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--hairline)')}
          >
            ADMIN ↗
          </Link>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          footer { padding: 4rem 1.5rem 2rem !important; }
        }
      `}</style>
    </footer>
  )
}
