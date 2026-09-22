'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { staggerContainer, staggerFadeUp } from '@/lib/animations'
import { urlFor } from '@/sanity/lib/image'

const PROCESS = [
  { num: '01', title: 'Consultation', desc: 'We start with a conversation. Your vision, your measurements, your story. Every detail matters. Done via WhatsApp or in person.' },
  { num: '02', title: 'Design', desc: "Our team sketches your piece and selects fabrics aligned with your identity and the occasion you're dressing for." },
  { num: '03', title: 'Fitting', desc: 'A fitting session ensures the piece sits perfectly on your body — because you are the standard, not a mannequin.' },
  { num: '04', title: 'Delivery', desc: 'Your finished piece arrives ready for the moment it was made for. Ready to be worn, photographed, and remembered.' },
]

const FAQS = [
  { q: 'How long does a bespoke piece take?', a: 'Typically 2–4 weeks depending on complexity. Rush orders can be discussed and accommodated where possible.' },
  { q: 'How do I start a bespoke order?', a: "Simply reach out via WhatsApp at +237 682 710 405 or use the form below. We'll schedule a consultation immediately." },
  { q: 'Do you offer custom sizing?', a: 'Every bespoke piece is made to your exact measurements. No standard sizing. You are the standard.' },
  { q: 'What is the price range?', a: "Prices vary by design complexity and fabric selected. Contact us and we'll discuss what works within your budget." },
  { q: 'Can I see examples of previous bespoke work?', a: 'Yes! Follow @Moirai.th on Instagram to see previous pieces, or ask our team to share a portfolio when you reach out.' },
  { q: "What if I don't know exactly what I want?", a: "That's completely fine. The consultation is exactly where we work that out together. Bring any inspiration or just a feeling." },
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

  return (
    <div style={{ paddingTop: '5rem' }}>
      {/* Hero */}
      <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '9rem 2rem', background: 'linear-gradient(170deg, var(--bg), var(--bg))', position: 'relative', overflow: 'hidden' }}>
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
              style={{ objectFit: 'cover', opacity: 0.3, mixBlendMode: 'overlay' }} 
            />
          ) : null
        })()}
        {!heroImage && <div className="luxury-glow" />}
        <motion.div
          style={{ maxWidth: 700, position: 'relative', zIndex: 1 }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="section-label" variants={staggerFadeUp}>Couture &amp; Custom</motion.p>
          <motion.h1
            variants={staggerFadeUp}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,9vw,7rem)', fontWeight: 700, marginBottom: '1.5rem', background: 'linear-gradient(135deg, var(--text) 0%, var(--accent-soft) 50%, var(--accent) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >Bespoke.</motion.h1>
          <motion.div className="divider" style={{ marginBottom: '2rem' }} variants={staggerFadeUp} />
          <motion.p
            variants={staggerFadeUp}
            style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 2, marginBottom: '3rem', maxWidth: 520, margin: '0 auto 3rem' }}
          >
            Your identity, tailored to perfection. A bespoke piece from Moirai is not just clothing — it is a statement of who you are becoming.
          </motion.p>
          <motion.div variants={staggerFadeUp} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
            <Link href="#contact-design" className="btn-primary">Start Your Bespoke Order</Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container">
          <motion.div
            style={{ textAlign: 'center', marginBottom: '5rem' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p className="section-label" variants={staggerFadeUp}>How It Works</motion.p>
            <motion.h2 variants={staggerFadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)' }}>The Process</motion.h2>
          </motion.div>
          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '0' }}
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
                  padding: '3rem 2.5rem',
                  border: '1px solid var(--card-border)',
                  marginLeft: i === 0 ? 0 : '-1px',
                  position: 'relative',
                  background: 'var(--card-bg)',
                  transition: 'background 0.3s, box-shadow 0.3s, transform 0.3s',
                }}
                whileHover={{ y: -4, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
              >
                <motion.div
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--accent-warm), var(--accent))', originX: 0 }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                />
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 500, color: 'var(--card-index)', lineHeight: 1, marginBottom: '1.5rem' }}>{step.num}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--card-title)', marginBottom: '0.75rem' }}>{step.title}</p>
                <p style={{ color: 'var(--card-body)', fontSize: '12px', lineHeight: 1.9 }}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section" style={{ background: 'var(--bg)', position: 'relative' }}>
         <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '100%', height: '80%', background: 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            style={{ textAlign: 'center', marginBottom: '3rem' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p className="section-label" variants={staggerFadeUp}>Our Work</motion.p>
            <motion.h2 variants={staggerFadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)' }}>Bespoke Gallery</motion.h2>
          </motion.div>
          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {gallery && gallery.length > 0 ? gallery.map((item, i) => (
              <motion.div
                key={i}
                variants={staggerFadeUp}
                style={{ aspectRatio: i % 3 === 0 ? '2/3' : '3/4', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}
              >
                <motion.div
                  style={{ width: '100%', height: '100%', position: 'relative' }}
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {(() => {
                    const imgRaw = item?.url
                    const imageSrc = imgRaw ? (typeof imgRaw === 'string' ? imgRaw : urlFor(imgRaw).width(800).quality(80).url()) : null
                    return imageSrc ? (
                      <Image src={imageSrc} alt={item?.alt || "Bespoke piece"} fill sizes="(max-width: 768px) 50vw, 300px" style={{ objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.2)' }} />
                    )
                  })()}
                </motion.div>
              </motion.div>
            )) : (
              <div style={{ padding: '4rem', gridColumn: '1 / -1', textAlign: 'center', color: 'var(--muted)', border: '1px dashed rgba(255,255,255,0.05)', background: 'var(--bg)' }}>
                 <p style={{ fontSize: '1.5rem', opacity: 0.3, marginBottom: '0.5rem' }}>✧</p>
                 <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Curating the Lookbook</p>
              </div>
            )}
          </motion.div>
          <p style={{ textAlign: 'center', marginTop: '3rem', fontSize: '12px', color: 'var(--muted)' }}>
            Follow <a href="https://instagram.com/Moirai.th" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>@Moirai.th</a> on Instagram to see real pieces in the meantime.
          </p>
        </div>
      </section>

      {/* Request Custom Design Form */}
      <section className="section" id="contact-design" style={{ background: 'var(--bg)', position: 'relative' }}>
        <div className="container" style={{ maxWidth: 700, margin: '0 auto' }}>
          <motion.div
            style={{ textAlign: 'center', marginBottom: '3rem' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p className="section-label" variants={staggerFadeUp}>Start Designing</motion.p>
            <motion.h2 variants={staggerFadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', marginBottom: '1rem' }}>Request Custom Design</motion.h2>
            <motion.p variants={staggerFadeUp} style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.8 }}>Describe your vision, and our artisans will bring it to life. Submit the form to coordinate directly with our atelier.</motion.p>
          </motion.div>

          <motion.form 
            onSubmit={handleFormSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ background: 'var(--bg)', padding: '3rem', border: '1px solid rgba(168, 85, 247, 0.15)', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.75rem' }}>Full Name</label>
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', padding: '1rem', background: 'var(--bg)', border: '1px solid rgba(255,255,255,0.05)', color: 'var(--text)', outline: 'none', fontFamily: 'inherit' }}
                placeholder="Your Name"
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.75rem' }}>WhatsApp Number</label>
              <input 
                type="tel" 
                required 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                style={{ width: '100%', padding: '1rem', background: 'var(--bg)', border: '1px solid rgba(255,255,255,0.05)', color: 'var(--text)', outline: 'none', fontFamily: 'inherit' }}
                placeholder="+1 234 567 890"
              />
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ display: 'block', fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.75rem' }}>Your Vision</label>
              <textarea 
                required 
                value={formData.desc}
                onChange={e => setFormData({...formData, desc: e.target.value})}
                style={{ width: '100%', padding: '1rem', minHeight: '120px', background: 'var(--bg)', border: '1px solid rgba(255,255,255,0.05)', color: 'var(--text)', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                placeholder="Describe the occasion, preferred fabrics, or any inspiration you have."
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>Send Inquiry via WhatsApp</button>
          </motion.form>
        </div>
      </section>

      {/* FAQs */}
      <section className="section">
        <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.div
            style={{ textAlign: 'center', marginBottom: '4rem' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
             <motion.div className="divider" style={{ marginBottom: '2rem' }} variants={staggerFadeUp} />
            <motion.p className="section-label" variants={staggerFadeUp}>Questions</motion.p>
            <motion.h2 variants={staggerFadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)' }}>Frequently Asked</motion.h2>
          </motion.div>
          {FAQS.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '2rem 0' }}
            >
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--accent-soft)', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>{faq.q}</p>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.85 }}>{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '9rem 2rem', textAlign: 'center', background: 'linear-gradient(170deg, var(--bg), var(--bg))', position: 'relative', overflow: 'hidden' }}>
        <div className="luxury-glow" style={{ opacity: 0.5 }} />
        <motion.div
          style={{ maxWidth: 500, margin: '0 auto', position: 'relative', zIndex: 1 }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.h2
            variants={staggerFadeUp}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,3.5rem)', fontStyle: 'italic', marginBottom: '2.5rem', lineHeight: 1.2 }}
          >
            Ready to begin your<br />bespoke journey?
          </motion.h2>
          <motion.div variants={staggerFadeUp} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
            <a href={baseWaUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Chat directly on WhatsApp</a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
