'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { staggerContainer, staggerFadeUp } from '@/lib/animations'
import { urlFor } from '@/sanity/lib/image'

const PROCESS = [
  { num: 'I', title: 'Consultation & Discourse', desc: 'We start with a conversation. Your vision, your measurements, your heritage. Every seam matters. Conducted via private WhatsApp salon or in-person.' },
  { num: 'II', title: 'Silhouette & Drafting', desc: 'Our master artisans sketch your piece, sourcing rare fabrics aligned with your posture, skin tone, and the majestic occasion you grace.' },
  { num: 'III', title: 'Fitting & Sculpting', desc: 'A dedicated atelier fitting ensures the drape cascades flawlessly over your natural lines — because you are the standard, not an off-the-rack mannequin.' },
  { num: 'IV', title: 'Delivery & Revelation', desc: 'Your finished garment arrives sealed in archival preservation, ready for the defining moment it was born for. Worn, captured, immortalized.' },
]

const BESPOKE_FALLBACK_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80', alt: 'Haute Couture Tailoring' },
  { url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80', alt: 'Atelier Fabric & Drape' },
  { url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', alt: 'Couture Silhouette' },
  { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', alt: 'Runway Elegance' },
  { url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80', alt: 'Editorial Fashion Design' },
  { url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', alt: 'Luxury Bespoke Gown' },
]

const FAQS = [
  { q: 'How long does a bespoke piece take to craft?', a: 'Typically 2–4 weeks depending on silhouette complexity and hand-embroidery. Expedited couture timelines can be accommodated upon request.' },
  { q: 'How do I initiate a bespoke order?', a: "Simply reach out via WhatsApp at +237 682 710 405 or submit the atelier form below. Our creative director will initiate your consultation." },
  { q: 'Do you offer entirely custom sizing?', a: 'Every bespoke creation is drafted from your exact anatomical measurements. Zero standard sizing. Your body is the sole blueprint.' },
  { q: 'What is the investment range?', a: 'Commissions vary based on structural complexity, textile rarity, and hand-embellishment hours. We tailor proposals respectfully to your vision.' },
  { q: 'Can I view previous bespoke archival creations?', a: 'Explore our editorial lookbook below or follow @Moirai.th on Instagram to review private client commissions and couture reveals.' },
  { q: "What if I don't have a fully realized concept?", a: 'That is the beauty of haute couture. Our consultation is an exploratory dialogue — bring a feeling, a sketch, or let us originate the silhouette together.' },
]

const WA = '237682710405'

interface BespokeClientProps {
  heroImage?: string
  gallery?: { url: string; alt: string }[]
}

export default function BespokeClient({ heroImage, gallery }: BespokeClientProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', desc: '' })
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = `Hi, I am ${formData.name}.\n\nI want a custom design: ${formData.desc}\n\nMy number is: ${formData.phone}`
    const finalUrl = `https://wa.me/${WA}?text=${encodeURIComponent(text)}`
    window.open(finalUrl, '_blank')
  }

  const baseWaUrl = `https://wa.me/${WA}?text=${encodeURIComponent('Hi! I am interested in a bespoke piece from Moirai.')}`
  const activeGallery = gallery && gallery.length > 0 ? gallery : BESPOKE_FALLBACK_IMAGES

  return (
    <div style={{ paddingTop: '5rem' }}>
      {/* Hero */}
      <section style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '9rem 2rem', background: 'var(--canvas)', position: 'relative', overflow: 'hidden' }}>
        {(() => {
          const imgRaw = heroImage
          const imageSrc = imgRaw ? (typeof imgRaw === 'string' ? imgRaw : urlFor(imgRaw).width(1200).quality(80).url()) : null
          return imageSrc ? (
            <Image 
              src={imageSrc} 
              alt="Bespoke Hero"
              fill
              sizes="100vw"
              priority 
              style={{ objectFit: 'cover', opacity: 0.18 }} 
            />
          ) : null
        })()}
        <motion.div
          style={{ maxWidth: 740, position: 'relative', zIndex: 1 }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="section-label" variants={staggerFadeUp}>Couture &amp; Tailoring</motion.p>
          <motion.h1
            variants={staggerFadeUp}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,9vw,6.5rem)', fontWeight: 600, letterSpacing: '0.03em', marginTop: '0.5rem', marginBottom: '1.25rem', color: 'var(--obsidian)' }}
          >Bespoke Atelier</motion.h1>
          <motion.div variants={staggerFadeUp} className="greek-divider" />
          <motion.p
            variants={staggerFadeUp}
            style={{ color: '#1E1C1A', fontSize: '15px', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: 560, margin: '0 auto 2.5rem' }}
          >
            Your identity, sculpted to perfection. A bespoke silhouette from Moirai is not merely cloth — it is an armor of poise, cut by the Fates of modern Cameroonian couture.
          </motion.p>
          <motion.div variants={staggerFadeUp} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
            <Link href="#contact-design" className="btn-primary">Commission a Piece</Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Process */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <motion.div
            style={{ textAlign: 'center', marginBottom: '4rem' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p className="section-label" variants={staggerFadeUp}>How It Works</motion.p>
            <motion.h2 variants={staggerFadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.25rem)', marginTop: '0.5rem' }}>The Four Fold Process</motion.h2>
            <motion.div variants={staggerFadeUp} className="greek-divider" />
          </motion.div>
          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {PROCESS.map((step, i) => (
              <motion.div
                key={step.num}
                variants={staggerFadeUp}
                style={{
                  padding: '3rem 2.25rem',
                  border: '1px solid var(--card-border)',
                  position: 'relative',
                  background: 'var(--card-bg)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
                }}
                whileHover={{ y: -4, borderColor: 'var(--gold)', boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
                transition={{ duration: 0.35 }}
              >
                <motion.div
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--gold), var(--bronze))', originX: 0 }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                />
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: '1.25rem' }}>{step.num}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{step.title}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.75 }}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section" style={{ background: 'var(--canvas)', position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p className="section-label" variants={staggerFadeUp}>Archival Creations</motion.p>
            <motion.h2 variants={staggerFadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.25rem)', marginTop: '0.5rem' }}>Bespoke Lookbook</motion.h2>
            <motion.div variants={staggerFadeUp} className="greek-divider" />
          </motion.div>
          <motion.div
            className="carousel-scroll"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {activeGallery.map((item, i) => (
              <motion.div
                key={i}
                variants={staggerFadeUp}
                className="carousel-card card-hover"
                style={{ aspectRatio: i % 2 === 0 ? '3/4' : '4/5', border: '1px solid var(--card-border)', position: 'relative', overflow: 'hidden', background: 'var(--surface)' }}
              >
                <motion.div
                  style={{ width: '100%', height: '100%', position: 'relative' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                >
                  {(() => {
                    const imgRaw = item?.url
                    const imageSrc = imgRaw ? (typeof imgRaw === 'string' ? imgRaw : urlFor(imgRaw).width(800).quality(85).url()) : null
                    return imageSrc ? (
                      <Image src={imageSrc} alt={item?.alt || "Bespoke piece"} fill sizes="(max-width: 768px) 80vw, 400px" style={{ objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--surface)' }} />
                    )
                  })()}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          <p style={{ textAlign: 'center', marginTop: '3rem', fontSize: '13px', color: '#1E1C1A' }}>
            Follow <a href="https://instagram.com/Moirai.th" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', fontWeight: 600, textDecoration: 'underline' }}>@Moirai.th</a> on Instagram to view recent private client commissions.
          </p>
        </div>
      </section>

      {/* Request Custom Design Form */}
      <section className="section" id="contact-design" style={{ background: 'var(--surface)', position: 'relative' }}>
        <div className="container" style={{ maxWidth: 720, margin: '0 auto' }}>
          <motion.div
            style={{ textAlign: 'center', marginBottom: '3rem' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p className="section-label" variants={staggerFadeUp}>Start Designing</motion.p>
            <motion.h2 variants={staggerFadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.25rem)', marginTop: '0.5rem', marginBottom: '0.75rem' }}>Request Custom Design</motion.h2>
            <motion.div variants={staggerFadeUp} className="greek-divider" />
            <motion.p variants={staggerFadeUp} style={{ color: '#1E1C1A', fontSize: '14px', lineHeight: 1.7, maxWidth: 540, margin: '0 auto' }}>Describe your vision, and our master couturiers will originate it. Submit to coordinate directly with our atelier.</motion.p>
          </motion.div>

          <motion.form 
            onSubmit={handleFormSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="gold-frame"
            style={{ padding: '3.5rem 2.5rem' }}
          >
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.75rem' }}>Full Name</label>
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', padding: '1rem', background: 'var(--canvas)', border: '1px solid var(--hairline)', color: '#1E1C1A', outline: 'none', fontFamily: 'inherit', fontSize: '14px' }}
                placeholder="Madame / Monsieur"
              />
            </div>
            
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.75rem' }}>WhatsApp Number</label>
              <input 
                type="tel" 
                required 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                style={{ width: '100%', padding: '1rem', background: 'var(--canvas)', border: '1px solid var(--hairline)', color: '#1E1C1A', outline: 'none', fontFamily: 'inherit', fontSize: '14px' }}
                placeholder="+237 600 000 000"
              />
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.75rem' }}>Your Vision &amp; Occasion</label>
              <textarea 
                required 
                value={formData.desc}
                onChange={e => setFormData({...formData, desc: e.target.value})}
                style={{ width: '100%', padding: '1rem', minHeight: '130px', background: 'var(--canvas)', border: '1px solid var(--hairline)', color: '#1E1C1A', outline: 'none', resize: 'vertical', fontFamily: 'inherit', fontSize: '14px' }}
                placeholder="Describe your event, aesthetic references, preferred textiles, or requested silhouette."
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>Send Inquiry via WhatsApp</button>
          </motion.form>
        </div>
      </section>

      {/* FAQs */}
      <section className="section" style={{ background: 'var(--canvas)' }}>
        <div className="container" style={{ maxWidth: 840, margin: '0 auto' }}>
          <motion.div
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p className="section-label" variants={staggerFadeUp}>Inquiries</motion.p>
            <motion.h2 variants={staggerFadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.25rem)', marginTop: '0.5rem' }}>Frequently Asked</motion.h2>
            <motion.div variants={staggerFadeUp} className="greek-divider" />
          </motion.div>
          {FAQS.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{ borderBottom: '1px solid var(--hairline)', padding: '2rem 0' }}
            >
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--obsidian)', marginBottom: '0.65rem', letterSpacing: '0.01em' }}>{faq.q}</p>
              <p style={{ color: '#1E1C1A', fontSize: '14px', lineHeight: 1.65 }}>{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA — Obsidian Luxury Mode */}
      <section className="obsidian-section" style={{ padding: '8rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(194, 162, 111, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <motion.div
          style={{ maxWidth: 560, margin: '0 auto', position: 'relative', zIndex: 1 }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.p className="section-label" variants={staggerFadeUp} style={{ color: 'var(--gold)' }}>The Atelier Awaits</motion.p>
          <motion.h2
            variants={staggerFadeUp}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,3.75rem)', fontStyle: 'italic', marginTop: '0.5rem', marginBottom: '1.5rem', lineHeight: 1.15, color: '#F5F0E8' }}
          >
            Ready to weave your<br />bespoke legacy?
          </motion.h2>
          <motion.div variants={staggerFadeUp} className="greek-divider" style={{ opacity: 0.8 }} />
          <motion.div variants={staggerFadeUp} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block', marginTop: '1rem' }}>
            <a href={baseWaUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: 'var(--gold)', color: '#161412', borderColor: 'var(--gold)' }}>Discourse on WhatsApp</a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
