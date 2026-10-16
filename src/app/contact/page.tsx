'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerFadeUp } from '@/lib/animations'
import { useSiteConfig } from '@/components/Providers'
import { waLink } from '@/lib/site'

const SUBJECTS = ['General Enquiry', 'Bespoke Order', 'Fashion School', 'Collaboration', 'Press', 'Other']

export default function ContactPage() {
  const [subject, setSubject] = useState('General Enquiry')
  const site = useSiteConfig()

  const waDefault = waLink(site.whatsappNumber, site.defaultMessage)

  const handleSubmit = () => {
    const name = (document.getElementById('cname') as HTMLInputElement)?.value || ''
    const msg = (document.getElementById('cmsg') as HTMLTextAreaElement)?.value || ''
    const text = `Hi Moirai! I'm ${name}.\n\nSubject: ${subject}\n\n${msg}`
    window.open(waLink(site.whatsappNumber, text), '_blank')
  }

  return (
    <div style={{ paddingTop: '5rem' }}>
      {/* Header */}
      <section style={{ padding: '5rem 2rem 4rem', textAlign: 'center', background: 'linear-gradient(170deg, #0d0b10, #1e1826)', borderBottom: '1px solid #2a2133', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center top, rgba(107,63,160,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <motion.div
          style={{ position: 'relative', zIndex: 1 }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="section-label" variants={staggerFadeUp}>Get In Touch</motion.p>
          <motion.h1
            variants={staggerFadeUp}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,7vw,5rem)', fontWeight: 700, marginBottom: '1rem', background: 'linear-gradient(135deg, #FAFAFA 0%, #E0AAFF 50%, #9B5DE5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >Contact</motion.h1>
          <motion.div className="divider" variants={staggerFadeUp} />
        </motion.div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem' }}>

            {/* Info side */}
            <motion.div
              initial={{ opacity: 0, x: -48 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '-60px' }}
            >
              <p className="section-label">Reach Out</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3vw,2.5rem)', marginBottom: '3rem', lineHeight: 1.2 }}>
                Let&apos;s create<br />something together.
              </h2>

              <motion.div
                style={{ marginBottom: '2rem' }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <p style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9B5DE5', marginBottom: '0.6rem' }}>WhatsApp (Fastest)</p>
                <motion.a
                  href={waDefault}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '14px', color: '#F0EBF8' }}
                  whileHover={{ color: '#C77DFF' }}
                  transition={{ duration: 0.2 }}
                >{site.whatsappDisplay}</motion.a>
              </motion.div>

              <motion.div
                style={{ marginBottom: '2rem' }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                viewport={{ once: true }}
              >
                <p style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9B5DE5', marginBottom: '0.6rem' }}>Social Media</p>
                <motion.a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '13px', color: '#B8A9C9', marginBottom: '0.5rem' }} whileHover={{ color: '#C77DFF', x: 4 }} transition={{ duration: 0.2 }}>Instagram: {site.instagramHandle}</motion.a>
                <motion.a href={site.tiktokUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '13px', color: '#B8A9C9' }} whileHover={{ color: '#C77DFF', x: 4 }} transition={{ duration: 0.2 }}>TikTok: {site.tiktokHandle}</motion.a>
              </motion.div>

              <motion.div
                style={{ marginBottom: '3rem' }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.26 }}
                viewport={{ once: true }}
              >
                <p style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9B5DE5', marginBottom: '0.6rem' }}>Payment</p>
                <p style={{ fontSize: '13px', color: '#B8A9C9', lineHeight: 1.8 }}>
                  We accept Mobile Money (MoMo).<br />
                  Payment details provided upon order confirmation.
                </p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                <a href={waDefault} target="_blank" rel="noopener noreferrer" className="btn-primary">Chat on WhatsApp Now</a>
              </motion.div>
            </motion.div>

            {/* Form side */}
            <motion.div
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              viewport={{ once: true, margin: '-60px' }}
            >
              <p className="section-label">Send a Message</p>
              <p style={{ color: '#7A6B8A', fontSize: '12px', marginBottom: '2rem', lineHeight: 1.8 }}>
                Fill in the form and we&apos;ll open a WhatsApp conversation with your message pre-filled — so our team can respond immediately.
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9B5DE5', marginBottom: '0.5rem' }}>Your Name</label>
                <motion.input
                  id="cname"
                  type="text"
                  placeholder="e.g. Amara"
                  style={{ width: '100%', padding: '0.9rem 1rem', background: '#130f18', border: '1px solid #2a2133', color: '#F0EBF8', fontSize: '13px', outline: 'none', fontFamily: 'inherit' }}
                  whileFocus={{ borderColor: '#6B3FA0' }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#6B3FA0')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#2a2133')}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9B5DE5', marginBottom: '0.75rem' }}>Subject</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {SUBJECTS.map(s => (
                    <motion.button
                      key={s}
                      onClick={() => setSubject(s)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        padding: '0.4rem 0.9rem',
                        fontSize: '10px',
                        letterSpacing: '0.1em',
                        border: '1px solid',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        transition: 'all 0.2s',
                        borderColor: subject === s ? '#9B5DE5' : '#2a2133',
                        color: subject === s ? '#C77DFF' : '#7A6B8A',
                        background: subject === s ? 'rgba(155,93,229,0.1)' : 'transparent',
                      }}
                    >{s}</motion.button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9B5DE5', marginBottom: '0.5rem' }}>Message</label>
                <motion.textarea
                  id="cmsg"
                  rows={5}
                  placeholder="Tell us what you're looking for..."
                  style={{ width: '100%', padding: '0.9rem 1rem', background: '#130f18', border: '1px solid #2a2133', color: '#F0EBF8', fontSize: '13px', outline: 'none', fontFamily: 'inherit', resize: 'vertical', lineHeight: 1.8 }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#6B3FA0')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#2a2133')}
                />
              </div>

              <motion.button
                onClick={handleSubmit}
                className="btn-primary"
                style={{ width: '100%', cursor: 'pointer' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send via WhatsApp
              </motion.button>
            </motion.div>
          </div>
        </div>
        <style>{`@media(max-width:768px){section>div>div[style*="grid-template-columns:1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
      </section>
    </div>
  )
}
