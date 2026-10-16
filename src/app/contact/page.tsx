'use client'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useSiteConfig } from '@/components/Providers'
import { waLink } from '@/lib/site'
import styles from './contact.module.css'

const SUBJECTS = ['General enquiry', 'Bespoke order', 'Fashion School', 'Collaboration', 'Press', 'Other']

export default function ContactPage() {
  const site = useSiteConfig()
  const reduce = useReducedMotion()
  const [name, setName] = useState('')
  const [subject, setSubject] = useState(SUBJECTS[0])
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({})
  const [opened, setOpened] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const next: typeof errors = {}
    if (!name.trim()) next.name = 'Please tell us your name.'
    if (message.trim().length < 5) next.message = 'Please write a short message so we know how to help.'
    setErrors(next)
    if (Object.keys(next).length > 0) {
      document.getElementById(next.name ? 'contact-name' : 'contact-message')?.focus()
      return
    }
    const text = `Hi Moirai! I'm ${name.trim()}.\n\nSubject: ${subject}\n\n${message.trim()}`
    window.open(waLink(site.whatsappNumber, text), '_blank', 'noopener,noreferrer')
    setOpened(true)
  }

  const fade = (delay: number) => reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <motion.p className="section-label" {...fade(0)}>Get in touch</motion.p>
        <motion.h1 className={styles.title} {...fade(0.1)}>Let&apos;s create <em>something together.</em></motion.h1>
      </header>

      <div className={styles.grid}>
        <motion.aside className={styles.info} {...fade(0.2)} aria-label="Contact details">
          <div className={styles.block}>
            <h2 className={styles.label}>WhatsApp — fastest</h2>
            <a href={waLink(site.whatsappNumber, site.defaultMessage)} target="_blank" rel="noopener noreferrer" className={styles.big}>{site.whatsappDisplay}</a>
          </div>
          {site.email && (
            <div className={styles.block}>
              <h2 className={styles.label}>Email</h2>
              <a href={`mailto:${site.email}`} className={styles.big}>{site.email}</a>
            </div>
          )}
          {(site.instagramUrl || site.tiktokUrl) && (
            <div className={styles.block}>
              <h2 className={styles.label}>Social</h2>
              {site.instagramUrl && <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>Instagram {site.instagramHandle}</a>}
              {site.tiktokUrl && <a href={site.tiktokUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>TikTok {site.tiktokHandle}</a>}
            </div>
          )}
          {site.location && (
            <div className={styles.block}>
              <h2 className={styles.label}>Atelier</h2>
              <p className={styles.text}>{site.location}</p>
            </div>
          )}
          <div className={styles.block}>
            <h2 className={styles.label}>Payment</h2>
            <p className={styles.text}>Mobile Money (MoMo) is our payment method. Details are shared once your order is confirmed. Delivery arrangements are agreed when you order.</p>
          </div>
        </motion.aside>

        <motion.form className={styles.form} onSubmit={handleSubmit} noValidate {...fade(0.3)} aria-labelledby="contact-form-title">
          <h2 id="contact-form-title" className={styles.formTitle}>Send a message</h2>
          <p className={styles.text}>Fill this in and WhatsApp will open with your message ready — tap send to reach the atelier.</p>

          <div className={styles.field}>
            <label htmlFor="contact-name" className={styles.fieldLabel}>Your name</label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={e => setName(e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              className={styles.input}
            />
            {errors.name && <p id="contact-name-error" className={styles.error}>{errors.name}</p>}
          </div>

          <fieldset className={styles.field}>
            <legend className={styles.fieldLabel}>Subject</legend>
            <div className={styles.chips}>
              {SUBJECTS.map(s => (
                <label key={s} className={styles.chip}>
                  <input type="radio" name="subject" value={s} checked={subject === s} onChange={() => setSubject(s)} />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className={styles.field}>
            <label htmlFor="contact-message" className={styles.fieldLabel}>Message</label>
            <textarea
              id="contact-message"
              rows={5}
              value={message}
              onChange={e => setMessage(e.target.value)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              className={styles.input}
              placeholder="Tell us what you're looking for…"
            />
            {errors.message && <p id="contact-message-error" className={styles.error}>{errors.message}</p>}
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Continue on WhatsApp</button>
          <p className={styles.status} role="status" aria-live="polite">
            {opened && <>WhatsApp should have opened in a new tab. If it didn&apos;t, message us at <a href={waLink(site.whatsappNumber)} target="_blank" rel="noopener noreferrer">{site.whatsappDisplay}</a>.</>}
          </p>
        </motion.form>
      </div>
    </div>
  )
}
