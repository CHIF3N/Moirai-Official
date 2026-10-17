'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCurrency, useSiteConfig } from './Providers'
import { waLink, CONSULTATION_HREF } from '@/lib/site'
import Logo from './Logo'
import { SLOGANS } from '@/content/brand'
import styles from './footer.module.css'

interface FooterProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: any
}

const EXPLORE = [
  ['/collections', 'Collections'],
  ['/shop', 'Shop'],
  ['/bespoke', 'Bespoke atelier'],
  ['/fashion-school', 'Fashion School'],
  ['/mo', 'MO by Moirai'],
  ['/blog', 'Journal'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
]

export default function Footer({ settings }: FooterProps) {
  const site = useSiteConfig()
  const { currency, setCurrency, usdAvailable, usdRateUpdatedAt } = useCurrency()
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')

  const locationText = settings?.footerLocation || 'Buea, Cameroon'

  // No newsletter provider is connected yet, so nothing is stored — say so plainly
  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setNote(site.tiktokUrl
      ? `Sign-ups open soon. Until then, follow ${site.tiktokHandle} on TikTok for new pieces.`
      : 'Sign-ups open soon. Until then, message us on WhatsApp to hear about new pieces.')
  }

  return (
    <footer className={styles.footer}>
      {/* Statement band */}
      <div className={styles.statement}>
        <p className={styles.kicker}>The House of Moirai · Buea, Cameroon</p>
        <Logo className={styles.mark} title="Moirai" />
        <p className={styles.motto}>{SLOGANS.refined} <em>{SLOGANS.becoming}</em></p>
        <Link href={CONSULTATION_HREF} className="btn-primary">Book a consultation</Link>
      </div>

      <div className={styles.grid}>
        <section aria-labelledby="footer-newsletter" className={styles.newsletter}>
          <h2 id="footer-newsletter" className={styles.h}>The inner circle</h2>
          <p className={styles.text}>New collections, atelier stories and bespoke invitations — first.</p>
          <form onSubmit={onSubscribe} className={styles.form}>
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              required
              autoComplete="email"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={styles.input}
            />
            <button type="submit" className={styles.submit}>Join</button>
          </form>
          <p className={styles.formNote} role="status" aria-live="polite">{note}</p>
        </section>

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className={styles.h}>Explore</h2>
          <ul className={styles.links}>
            {EXPLORE.map(([href, label]) => (
              <li key={href}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby="footer-contact">
          <h2 id="footer-contact" className={styles.h}>Contact</h2>
          <ul className={styles.links}>
            <li><a href={waLink(site.whatsappNumber, site.defaultMessage)} target="_blank" rel="noopener noreferrer">WhatsApp {site.whatsappDisplay}</a></li>
            {site.email && <li><a href={`mailto:${site.email}`}>{site.email}</a></li>}
            {site.instagramUrl && <li><a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram {site.instagramHandle}</a></li>}
            {site.tiktokUrl && <li><a href={site.tiktokUrl} target="_blank" rel="noopener noreferrer">TikTok {site.tiktokHandle}</a></li>}
          </ul>
          <p className={styles.address}>{locationText}</p>
        </section>

        {usdAvailable && (
          <section aria-labelledby="footer-currency">
            <h2 id="footer-currency" className={styles.h}>Currency</h2>
            <div className={styles.currency} role="group" aria-label="Display prices in">
              {(['XAF', 'USD'] as const).map(c => (
                <button key={c} type="button" aria-pressed={currency === c} onClick={() => setCurrency(c)} className={styles.currencyBtn}>
                  {c === 'XAF' ? 'FCFA' : 'USD'}
                </button>
              ))}
            </div>
            {currency === 'USD' && (
              <p className={styles.text}>
                USD prices are approximate{usdRateUpdatedAt ? ` (rate updated ${usdRateUpdatedAt})` : ''}. Orders are confirmed in FCFA.
              </p>
            )}
          </section>
        )}
      </div>

      <div className={styles.base}>
        <p>© {new Date().getFullYear()} Moirai — The House of Moirai. All rights reserved.</p>
        <p className={styles.baseMotto}>{SLOGANS.identity}</p>
      </div>
    </footer>
  )
}
