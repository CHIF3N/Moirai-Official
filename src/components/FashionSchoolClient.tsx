'use client'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { motion } from 'framer-motion'
import { staggerContainer, staggerFadeUp } from '@/lib/animations'
import { useSiteConfig } from './Providers'
import { waLink } from '@/lib/site'

const MODULES = [
  { num: 'I', title: 'Foundation of Fashion Design', desc: 'History, theory, and the language of couture. Understanding what makes enduring, timeless design.' },
  { num: 'II', title: 'Pattern Making & Cutting', desc: 'Translate designs from sketch to silhouette with mathematical precision and tactile confidence.' },
  { num: 'III', title: 'Sewing Techniques & Craft', desc: 'From foundational hand stitches to advanced couture construction methods and tailoring.' },
  { num: 'IV', title: 'Fabric & Material Knowledge', desc: 'Understanding textures, weights, grain lines, and how rare fabrics behave across silhouettes.' },
  { num: 'V', title: 'Styling & Presentation', desc: 'How to dress the human form, direct editorial shoots, and present collections professionally.' },
  { num: 'VI', title: 'Business of Fashion', desc: 'Pricing, brand architecture, atelier client management, and scaling an independent luxury label.' },
]

const WHO = [
  'Beginners with an enduring passion for haute couture and no prior garment experience',
  'Aspiring designers seeking rigorous, master-apprentice structured studio training',
  'Entrepreneurs launching their own independent luxury or ready-to-wear label',
  'Creatives eager to master the art of bespoke construction for personal expression',
]


interface FashionSchoolClientProps {
  heroImage?: string
}

export default function FashionSchoolClient({ heroImage }: FashionSchoolClientProps) {
  const site = useSiteConfig()
  const waUrl = waLink(site.whatsappNumber, 'Hi! I am interested in joining the Moirai Fashion School program. Can you share more details?')

  return (
    <div style={{ paddingTop: '5rem' }}>
      {/* Hero */}
      <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '6rem 2rem', background: 'linear-gradient(170deg, var(--bg), var(--bg))', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(142, 31, 44, 0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <motion.div
          style={{ maxWidth: 720, position: 'relative', zIndex: 1 }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="section-label" variants={staggerFadeUp}>Education &amp; Craft</motion.p>
          <motion.h1
            variants={staggerFadeUp}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,7vw,5.5rem)', fontWeight: 700, letterSpacing: '0.04em', marginBottom: '1.5rem', lineHeight: 1.05, background: 'linear-gradient(135deg, var(--text) 0%, var(--accent-soft) 50%, var(--accent) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Moirai<br />Fashion School
          </motion.h1>
          <motion.div className="divider" style={{ marginBottom: '2rem' }} variants={staggerFadeUp} />
          <motion.p
            variants={staggerFadeUp}
            style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 2, marginBottom: '3rem', maxWidth: 520, margin: '0 auto 3rem' }}
          >
            Learn the art of craftsmanship. Become the creator behind the garment.
          </motion.p>
          <motion.div variants={staggerFadeUp} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Join the Program</a>
          </motion.div>
        </motion.div>
      </section>

      {/* Curriculum */}
      <section className="section">
        <div className="container">
          <motion.div
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p className="section-label" variants={staggerFadeUp}>Curriculum</motion.p>
            <motion.h2 variants={staggerFadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', marginTop: '0.5rem' }}>What You Will Learn</motion.h2>
            <motion.div variants={staggerFadeUp} className="greek-divider" />
          </motion.div>
          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.75rem' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {MODULES.map((m, i) => (
              <motion.div
                key={m.title}
                variants={staggerFadeUp}
                whileHover={{ borderColor: 'var(--gold)', y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
                transition={{ duration: 0.35 }}
                style={{
                  padding: '2.5rem',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  position: 'relative',
                  transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
                }}
              >
                <motion.p
                  className="greek-numeral"
                  style={{ fontSize: '2.5rem', lineHeight: 1, marginBottom: '1.25rem', color: 'var(--gold)', fontFamily: 'var(--font-display)', fontWeight: 300 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >{m.num}</motion.p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '0.02em' }}>{m.title}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.75 }}>{m.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -48 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <p className="section-label">Is This For You?</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.25rem)', marginTop: '0.5rem', marginBottom: '2.5rem', lineHeight: 1.15 }}>Who It&apos;s For</h2>
              {WHO.map((w, i) => (
                <motion.div
                  key={w}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                  style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}
                >
                  <span style={{ color: 'var(--gold)', marginTop: '0.1rem', flexShrink: 0, fontSize: '1.1rem' }}>✦</span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: 1.65, fontWeight: 450 }}>{w}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 1.05, x: 40 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              viewport={{ once: true, margin: '-60px' }}
              className="gold-frame"
              style={{ aspectRatio: '4/5', overflow: 'hidden' }}
            >
              {(() => {
                const imgRaw = heroImage
                const imageSrc = imgRaw ? (typeof imgRaw === 'string' ? imgRaw : urlFor(imgRaw).width(1200).quality(80).url()) : null
                return imageSrc ? (
                  <motion.div
                    style={{ width: '100%', height: '100%', position: 'relative' }}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image src={imageSrc} alt="Fashion School" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                  </motion.div>
                ) : (
                  <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.2)' }} />
                )
              })()}
            </motion.div>
          </div>
        </div>
        <style>{`@media(max-width:768px){section>div>div[style*="grid-template-columns:1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* Details + CTA */}
      <section style={{ padding: '7rem 2rem', textAlign: 'center' }}>
        <motion.div
          style={{ maxWidth: 640, margin: '0 auto' }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.p className="section-label" variants={staggerFadeUp}>Program Details</motion.p>
          <motion.h2 variants={staggerFadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', marginTop: '0.5rem', marginBottom: '1rem' }}>Duration &amp; Enrollment</motion.h2>
          <motion.div variants={staggerFadeUp} className="greek-divider" />
          <motion.p variants={staggerFadeUp} style={{ color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: 1.7, marginBottom: '3rem' }}>
            Duration and schedule details are available on request. Intake is intentionally limited each term to ensure every apprentice receives personal mentorship and uninterrupted studio time with the master couturiers of Moirai House.
          </motion.p>
          <motion.div variants={staggerFadeUp} style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Apply Now</a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" className="btn-ghost">Contact Us</Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
