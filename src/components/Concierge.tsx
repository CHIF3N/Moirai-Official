'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useSiteConfig } from './Providers'
import { useCart } from './CartDrawer'
import { waLink } from '@/lib/site'
import styles from './concierge.module.css'

// One floating button for help: WhatsApp quick messages plus honest, pre-written answers.
// (Replaces the separate WhatsApp button and the keyword "AI" chat.)

const QUICK_MESSAGES = [
  'I would like to order a piece',
  'I am interested in a bespoke commission',
  'Can you tell me about prices?',
  'I would like to join the Fashion School',
]

// Answers carried over from the previous chat widget — confirm with the atelier before launch
const ANSWERS = [
  { q: 'How does a bespoke commission work?', a: 'It is fully custom: we discuss your vision, take your measurements and craft a one-of-a-kind piece. Consultation → design → fitting → delivery, typically 2–4 weeks.' },
  { q: 'How much does a piece cost?', a: 'Pricing depends on the piece, fabric and complexity. Bridal, bespoke and corsetry are quoted individually — send us a WhatsApp message for a quote.' },
  { q: 'How do I place an order?', a: 'Add pieces to your bag and send the order on WhatsApp, or message us directly. We confirm every order personally.' },
  { q: 'How do I pay?', a: 'We accept Mobile Money (MoMo). Payment details are shared once your order is confirmed.' },
  { q: 'Do you deliver?', a: 'We deliver across Cameroon. International shipping is available on request — tell us your location on WhatsApp.' },
  { q: 'What sizes do you offer?', a: 'Bespoke pieces are made to your exact measurements. No standard sizing — you are the standard.' },
  { q: 'What does the Fashion School teach?', a: 'Sewing, pattern making, fabrics, styling and the business of fashion. Intake is limited so every student gets personal attention.' },
]

const ChatIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
  </svg>
)
const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35M12.05 21.79a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.88 9.88 0 0 1 9.88 9.89c0 5.45-4.44 9.88-9.89 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41z" />
  </svg>
)

export default function Concierge() {
  const site = useSiteConfig()
  const { isOpen: bagOpen } = useCart()
  const [open, setOpen] = useState(false)
  const [answer, setAnswer] = useState<number | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  // On the homepage, wait until the hero is scrolled past so the button never covers its calls to action
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    if (pathname !== '/') { setPastHero(true); return }
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])
  const launcherRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    panelRef.current?.querySelector<HTMLElement>('button, a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); launcherRef.current?.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (bagOpen || (!pastHero && !open)) return null

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="concierge-panel"
            role="dialog"
            aria-label="Moirai concierge"
            className={styles.panel}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.head}>
              <div>
                <p className={styles.kicker}>The Moirai concierge</p>
                <p className={styles.title}>How can we help?</p>
              </div>
              <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Close concierge">×</button>
            </div>

            <div className={styles.scroll}>
              <p className={styles.group}>Message the atelier</p>
              <p className={styles.note}>WhatsApp opens with your message ready — tap send to reach us.</p>
              <ul className={styles.list}>
                {QUICK_MESSAGES.map(m => (
                  <li key={m}>
                    <a href={waLink(site.whatsappNumber, `Hi Moirai! ${m}.`)} target="_blank" rel="noopener noreferrer" className={styles.wa}>
                      <WaIcon /><span>{m}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <p className={styles.group}>Quick answers</p>
              <ul className={styles.list}>
                {ANSWERS.map((item, i) => (
                  <li key={item.q} className={styles.faq}>
                    <button
                      type="button"
                      className={styles.faqQ}
                      aria-expanded={answer === i}
                      aria-controls={`concierge-a-${i}`}
                      onClick={() => setAnswer(answer === i ? null : i)}
                    >
                      {item.q}<span aria-hidden="true">{answer === i ? '−' : '+'}</span>
                    </button>
                    {answer === i && <p id={`concierge-a-${i}`} className={styles.faqA}>{item.a}</p>}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={launcherRef}
        type="button"
        className={styles.launcher}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls="concierge-panel"
        aria-label={open ? 'Close concierge' : 'Questions? Open the concierge'}
      >
        {open ? <span className={styles.x} aria-hidden="true">×</span> : <ChatIcon />}
        <span className={styles.launcherLabel}>{open ? 'Close' : 'Concierge'}</span>
      </button>
    </>
  )
}
