'use client'
import { useState } from 'react'
import { useSiteConfig } from './Providers'
import { waLink } from '@/lib/site'
import { CATEGORIES } from '@/content/brand'
import styles from './form.module.css'

const GARMENTS = [...CATEGORIES.map(c => c.title), 'Something else']

type Errors = Partial<Record<'name' | 'phone' | 'desc', string>>

// International numbers: 8–15 digits, optional leading +, spaces/dashes/brackets allowed
function validPhone(v: string) {
  const digits = v.replace(/\D/g, '')
  return /^\+?[\d\s\-()]+$/.test(v.trim()) && digits.length >= 8 && digits.length <= 15
}

export default function BespokeForm() {
  const site = useSiteConfig()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [garment, setGarment] = useState(GARMENTS[0])
  const [date, setDate] = useState('')
  const [desc, setDesc] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [opened, setOpened] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Errors = {}
    if (!name.trim()) next.name = 'Please tell us your name.'
    if (!validPhone(phone)) next.phone = 'Enter your WhatsApp number with country code, e.g. +237 6XX XXX XXX.'
    if (desc.trim().length < 10) next.desc = 'Tell us a little about what you have in mind (at least a sentence).'
    setErrors(next)
    const first = (['name', 'phone', 'desc'] as const).find(k => next[k])
    if (first) { document.getElementById(`bespoke-${first}`)?.focus(); return }

    const lines = [
      `Hi Moirai! I'm ${name.trim()} and I'd like to start a bespoke commission.`,
      '',
      `Type of piece: ${garment}`,
      date ? `Date needed: ${new Date(date + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}` : null,
      '',
      desc.trim(),
      '',
      `My WhatsApp number: ${phone.trim()}`,
    ].filter(l => l !== null)
    window.open(waLink(site.whatsappNumber, lines.join('\n')), '_blank', 'noopener,noreferrer')
    setOpened(true)
  }

  const err = (k: keyof Errors) => errors[k] ? { 'aria-invalid': true as const, 'aria-describedby': `bespoke-${k}-error` } : {}

  return (
    <form className={styles.form} onSubmit={submit} noValidate aria-labelledby="bespoke-form-title">
      <h3 id="bespoke-form-title" className={styles.title}>Start your commission</h3>
      <p className={styles.text}>Fill this in and WhatsApp will open with your request ready — tap send to reach the atelier. Nothing is sent until you do.</p>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="bespoke-name" className={styles.label}>Full name</label>
          <input id="bespoke-name" className={styles.input} autoComplete="name" value={name} onChange={e => setName(e.target.value)} {...err('name')} />
          {errors.name && <p id="bespoke-name-error" className={styles.error}>{errors.name}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor="bespoke-phone" className={styles.label}>WhatsApp number</label>
          <input id="bespoke-phone" className={styles.input} type="tel" inputMode="tel" autoComplete="tel" placeholder="+237 6XX XXX XXX" value={phone} onChange={e => setPhone(e.target.value)} {...err('phone')} />
          {errors.phone && <p id="bespoke-phone-error" className={styles.error}>{errors.phone}</p>}
        </div>
      </div>

      <fieldset className={styles.field}>
        <legend className={styles.label}>Type of piece</legend>
        <div className={styles.chips}>
          {GARMENTS.map(g => (
            <label key={g} className={styles.chip}>
              <input type="radio" name="garment" value={g} checked={garment === g} onChange={() => setGarment(g)} />
              <span>{g}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.field}>
        <label htmlFor="bespoke-date" className={styles.label}>When do you need it? <span className={styles.optional}>(optional)</span></label>
        <input id="bespoke-date" className={styles.input} type="date" value={date} onChange={e => setDate(e.target.value)} style={{ maxWidth: 260 }} />
      </div>

      <div className={styles.field}>
        <label htmlFor="bespoke-desc" className={styles.label}>Your vision and occasion</label>
        <textarea id="bespoke-desc" className={styles.input} rows={5} placeholder="The occasion, the feeling you want, references, colours or fabrics you love…" value={desc} onChange={e => setDesc(e.target.value)} {...err('desc')} />
        {errors.desc && <p id="bespoke-desc-error" className={styles.error}>{errors.desc}</p>}
      </div>

      <button type="submit" className="btn-primary" style={{ width: '100%' }}>Continue on WhatsApp</button>
      <p className={styles.status} role="status" aria-live="polite">
        {opened && <>WhatsApp should have opened in a new tab with your request. If it didn&apos;t, message us at <a href={waLink(site.whatsappNumber)} target="_blank" rel="noopener noreferrer">{site.whatsappDisplay}</a>.</>}
      </p>
    </form>
  )
}
