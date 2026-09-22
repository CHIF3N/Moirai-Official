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

  return (
    <footer style={{ position: 'relative' }}>

      {/* ── Monumental Obsidian Branding Bar ── */}
      <div
        style={{
          background: '#0E0D0B',
          padding: '7rem 3.5rem 5rem',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        {/* Radial gold glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(194,162,111,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

        {/* Greek key SVG top border */}
        <svg
          width="100%" height="12"
          viewBox="0 0 480 12"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, opacity: 0.35 }}
        >
          <path
            d="M0 1h48v10H32V7h8v2h4V3H4v6h12v2H0V1zm56 0h16v10H60V7h8V3h4v6h-4v2H56V1zm24 0h48v10H112V7h8v2h4V3H84v6h12v2H80V1zm56 0h16v10h-12V7h8V3h4v6h-4v2h-12V1zm24 0h48v10H192V7h8v2h4V3H164v6h12v2H160V1zm56 0h16v10h-12V7h8V3h4v6h-4v2h-12V1zm24 0h48v10H272V7h8v2h4V3H244v6h12v2H240V1zm56 0h16v10h-12V7h8V3h4v6h-4v2h-12V1zm24 0h48v10H352V7h8v2h4V3H324v6h12v2H320V1zm56 0h16v10h-12V7h8V3h4v6h-4v2h-12V1zm24 0h48v10H432V7h8v2h4V3H404v6h12v2H400V1z"
            fill="#C2A26F"
            fillRule="evenodd"
          />
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '9px',
            letterSpacing: '0.55em',
            textTransform: 'uppercase',
            color: '#C2A26F',
            marginBottom: '1.5rem',
          }}>
            The House of Moirai · Buea, Cameroon · Est. 2023
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 14vw, 11rem)',
              fontWeight: 300,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#F5F0E8',
              lineHeight: 0.9,
              margin: '0 0 0.5rem',
            }}
          >
            MOIRAI
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.85rem, 2vw, 1.15rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#A3998F',
              letterSpacing: '0.12em',
              marginBottom: '2.5rem',
            }}
          >
            Clotho spins. Lachesis measures. Atropos cuts.{' '}
            <em style={{ color: '#C2A26F' }}>Destiny, Tailored.</em>
          </p>

          {/* Gold meander divider */}
          <div style={{
            height: '12px',
            width: '240px',
            margin: '0 auto 2.5rem',
            opacity: 0.5,
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'center',
            backgroundSize: '24px 12px',
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12'%3E%3Cpath d='M0 1h16v8h-6V5h2v2h2V3H2v6h4v2H0V1zm18 0h6v10H14v-2h8V3h-4v2h2v2h-4V1h2z' fill='%23C2A26F' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          }} />

          {/* Social row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { href: waUrl, label: 'WhatsApp' },
              { href: 'https://instagram.com/Moirai.th', label: 'Instagram' },
              { href: 'https://tiktok.com/@MOIRAI', label: 'TikTok' },
              { href: `mailto:${settings?.email || 'hello@moiraihouse.com'}`, label: 'Email' },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '9px',
                  letterSpacing: '0.38em',
                  textTransform: 'uppercase',
                  color: '#A3998F',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C2A26F')}
                onMouseLeave={e => (e.currentTarget.style.color = '#A3998F')}
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Newsletter Strip ── */}
      <div
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--hairline)',
          borderBottom: '1px solid var(--hairline)',
          padding: '3.5rem',
        }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '9.5px', letterSpacing: '0.45em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
            Inner Circle
          </p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, color: 'var(--obsidian)', marginBottom: '0.75rem', letterSpacing: '0.03em' }}>
            Access the Unseen
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', color: 'var(--umber)', marginBottom: '2rem', lineHeight: 1.8 }}>
            Private collections, atelier dispatches, and bespoke invitations — before the world sees them.
          </p>
          {subscribed ? (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '9.5px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              ✦ &nbsp;Welcome to the Inner Circle
            </p>
          ) : (
            <form
              onSubmit={e => { e.preventDefault(); setSubscribed(true) }}
              style={{ display: 'flex', gap: 0, maxWidth: '460px', margin: '0 auto' }}
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  padding: '0.85rem 1.25rem',
                  background: 'var(--canvas)',
                  border: '1px solid var(--hairline)',
                  borderRight: 'none',
                  color: 'var(--obsidian)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  outline: 'none',
                  minWidth: 0,
                }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.85rem 1.75rem', minHeight: 'auto', flexShrink: 0, fontSize: '9.5px', letterSpacing: '0.2em' }}>
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div style={{ background: 'var(--canvas)', padding: '5rem 3.5rem 3rem' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '3.5rem',
              marginBottom: '4rem',
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {/* Brand Column */}
            <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--obsidian)', lineHeight: 1, marginBottom: '0.4rem' }}>
                MOIRAI
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '7px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'var(--umber)', marginBottom: '1.25rem' }}>
                THE HOUSE OF MOIRAI
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontStyle: 'italic', color: 'var(--umber)', lineHeight: 1.85, marginBottom: '1rem' }}>
                Not a Trend. IDENTITY.<br />Made for who you are Becoming.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.12em', color: 'var(--umber)', opacity: 0.7 }}>
                {locationText}
              </p>
            </motion.div>

            {/* Navigate */}
            <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
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
                    style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--umber)', transition: 'color 0.2s', display: 'inline-block' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--obsidian)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--umber)')}
                  >
                    {label}
                  </Link>
                </div>
              ))}
            </motion.div>

            {/* Preferences */}
            <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <p className="section-label" style={{ marginBottom: '1.5rem' }}>PREFERENCES</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--umber)', marginBottom: '0.6rem', letterSpacing: '0.05em' }}>Currency Display</p>
              <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2rem' }}>
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
              <p className="section-label" style={{ marginBottom: '0.75rem' }}>POLICY</p>
              {[
                ['/privacy-policy', 'Privacy Policy'],
                ['/terms-of-service', 'Terms of Service'],
              ].map(([href, label]) => (
                <div key={href} style={{ marginBottom: '0.5rem' }}>
                  <Link
                    href={href}
                    style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--umber)', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--obsidian)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--umber)')}
                  >
                    {label}
                  </Link>
                </div>
              ))}
            </motion.div>

            {/* Connect */}
            <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <p className="section-label" style={{ marginBottom: '1.5rem' }}>CONNECT</p>
              {[
                { href: waUrl, label: 'WhatsApp: +237 682 710 405' },
                ...(settings?.email
                  ? [{ href: `mailto:${settings.email}`, label: settings.email }]
                  : [{ href: 'mailto:hello@moiraihouse.com', label: 'hello@moiraihouse.com' }]
                ),
                { href: 'https://instagram.com/Moirai.th', label: 'Instagram: @Moirai.th' },
                { href: 'https://tiktok.com/@MOIRAI', label: 'TikTok: @MOIRAI' },
              ].map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--umber)', marginBottom: '0.7rem', transition: 'color 0.2s' }}
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
              Clotho · Lachesis · Atropos — Destiny, Tailored.
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
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          footer > div:first-child { padding: 5rem 1.5rem 4rem !important; }
          footer > div:nth-child(2) { padding: 3rem 1.5rem !important; }
          footer > div:last-child { padding: 4rem 1.5rem 2.5rem !important; }
        }
      `}</style>
    </footer>
  )
}
