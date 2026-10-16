'use client'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { motion } from 'framer-motion'
import { staggerContainer, staggerFadeUp } from '@/lib/animations'

const SLOGANS = [
  'Refined. Intentional. Eternal.',
  'Made for who you are Becoming.',
  'Destiny, Tailored.',
  'Bold, Empowered, and an endless moment.',
]

const VALUES = [
  { icon: '◆', title: 'Customer Experience', desc: 'Every interaction is personal. You are not a transaction — you are someone we are creating a piece of destiny for.' },
  { icon: '◇', title: 'Craftsmanship Excellence', desc: 'We obsess over details that others overlook. A seam, a hem, a finish — it all matters.' },
  { icon: '✦', title: 'Empowerment Through Style', desc: 'Fashion is the language of confidence. When you wear Moirai, you wear intention.' },
  { icon: '✧', title: 'Sustainability', desc: 'We create intentionally. Pieces designed to outlast trends and be worn for years.' },
]

export default function AboutClient({ aboutImage, partners, ceo, team }: { aboutImage?: string, partners?: any[], ceo?: any, team?: any[] }) {
  return (
    <div style={{ paddingTop: '5rem' }}>
      {/* Hero */}
      <section style={{ minHeight: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '6rem 2rem', background: 'linear-gradient(170deg, var(--bg), var(--bg))', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        {!aboutImage && <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgb(var(--brand-rgb) / 0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />}
        <motion.div
          style={{ maxWidth: 720, position: 'relative', zIndex: 1 }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="section-label" variants={staggerFadeUp}>Our Heritage</motion.p>
          <motion.h1
            variants={staggerFadeUp}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,8vw,6rem)', fontWeight: 600, letterSpacing: '0.02em', marginTop: '0.5rem', marginBottom: '1.25rem', color: 'var(--obsidian)' }}
          >
            The House of Moirai
          </motion.h1>
          <motion.div variants={staggerFadeUp} className="greek-divider" />
        </motion.div>
      </section>

      {/* The name */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container" style={{ maxWidth: 1040, margin: '0 auto' }}>
          <div className="about-grid">
            <motion.div
              initial={{ opacity: 0, x: -48 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <p className="section-label">Mythic Origin</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.25rem)', marginTop: '0.5rem', marginBottom: '1.5rem', lineHeight: 1.15 }}>
                Woven by the Fates.<br />Worn by You.
              </h2>
              <div className="greek-divider" style={{ margin: '1.5rem 0' }} />
              <p style={{ color: 'var(--fg-2)', fontSize: '14px', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                Moirai takes its name from the ancient Greek Fates — Clotho who spun the thread of life, Lachesis who measured destiny, and Atropos who cut the ultimate silhouette.
              </p>
              <p style={{ color: 'var(--fg-2)', fontSize: '14px', lineHeight: 1.75, marginBottom: '2rem' }}>
                We believe couture is never accidental. Every garment chosen is a conscious revelation of self-sovereignty — an intentional proclamation of who you are and the legacy you are weaving.
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontStyle: 'italic', color: 'var(--obsidian)', lineHeight: 1.6, borderLeft: '3px solid var(--accent)', paddingLeft: '1.25rem', background: 'rgb(var(--accent-rgb) / 0.08)', padding: '1rem 1.25rem' }}>
                &ldquo;Made for who you are becoming.&rdquo;
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 1.05, x: 40 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              viewport={{ once: true, margin: '-60px' }}
              className="gold-frame"
              style={{ aspectRatio: '3/4', overflow: 'hidden' }}
            >
              {(() => {
                const imgRaw = aboutImage
                const imageSrc = imgRaw ? (typeof imgRaw === 'string' ? imgRaw : urlFor(imgRaw).width(1200).quality(95).url()) : null
                return imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt="Moirai Brand"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={95}
                    priority
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--surface)' }} />
                )
              })()}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CEO Feature */}
      {ceo && ceo.name && (
        <section className="section" style={{ background: 'var(--canvas)', borderTop: '1px solid var(--hairline)' }}>
          <div className="container" style={{ maxWidth: 1040, margin: '0 auto' }}>
            <div className="ceo-grid">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                className="gold-frame"
                style={{ aspectRatio: '3/4', overflow: 'hidden' }}
              >
                {(() => {
                  const imgRaw = ceo?.image
                  const imageSrc = imgRaw ? (typeof imgRaw === 'string' ? imgRaw : urlFor(imgRaw).width(800).quality(95).url()) : null
                  return imageSrc ? (
                    <Image src={imageSrc} alt={ceo.name || "CEO"} fill sizes="(max-width: 768px) 100vw, 50vw" quality={95} priority style={{ objectFit: 'cover', objectPosition: 'top' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.05)' }} />
                  )
                })()}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                style={{ padding: '1rem 0' }}
              >
                <p className="section-label">A Word From The Founder</p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,2.75rem)', marginTop: '0.5rem', marginBottom: '1.25rem', fontStyle: 'italic', color: 'var(--obsidian)' }}>
                  {ceo.name}
                </h2>
                <div className="greek-divider" style={{ margin: '1rem 0 1.5rem', marginLeft: 0 }} />
                <div style={{ color: 'var(--fg-2)', fontSize: '14px', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                  {ceo.bio}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Meet The Team */}
      {team && team.length > 0 && (
        <section className="section" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
          <div className="container">
            <motion.div
              style={{ textAlign: 'center', marginBottom: '4rem' }}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.p className="section-label" variants={staggerFadeUp}>The Artisans</motion.p>
              <motion.h2 variants={staggerFadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)' }}>Meet the Team</motion.h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
              {team.map((member, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '1rem', background: 'var(--bg)' }}>
                    {(() => {
                      const imgRaw = member?.image
                      const imageSrc = imgRaw ? (typeof imgRaw === 'string' ? imgRaw : urlFor(imgRaw).width(600).quality(80).url()) : null
                      return imageSrc ? (
                        <Image src={imageSrc} alt={member?.name || 'Team member'} fill style={{ objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✦</div>
                      )
                    })()}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>{member.name}</h3>
                  <p style={{ color: 'var(--accent)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trusted By / Partners */}
      {partners && partners.length > 0 && (
        <section style={{ borderTop: '1px solid var(--border)', padding: '4rem 0', background: 'var(--bg)', overflow: 'hidden' }}>
          <div className="container" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p className="section-label" style={{ color: 'var(--muted)' }}>Trusted By</p>
          </div>
          <div style={{ display: 'flex', gap: '4rem', padding: '0 2rem', overflowX: 'auto', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
             {partners.map((partner, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: 140, height: 64, position: 'relative', cursor: 'pointer' }}
                >
                   {(() => {
                     const imgRaw = partner?.logo
                     const imageSrc = imgRaw ? (typeof imgRaw === 'string' ? imgRaw : urlFor(imgRaw).width(400).quality(80).url()) : null
                     return imageSrc ? (
                       <Image src={imageSrc} alt={partner?.name || "Partner"} fill style={{ objectFit: 'contain' }} />
                     ) : (
                       <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: 'var(--muted)' }}>{partner?.name}</div>
                     )
                   })()}
                </motion.div>
             ))}
          </div>
        </section>
      )}

      {/* Values */}
      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
        <div className="container">
          <motion.div
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p className="section-label" variants={staggerFadeUp}>What Drives Us</motion.p>
            <motion.h2 variants={staggerFadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.25rem)', marginTop: '0.5rem' }}>Core Tenets</motion.h2>
            <motion.div variants={staggerFadeUp} className="greek-divider" />
          </motion.div>
          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {VALUES.map(v => (
              <motion.div
                key={v.title}
                variants={staggerFadeUp}
                whileHover={{ borderColor: 'var(--accent)', y: -6, boxShadow: '0 8px 30px rgb(var(--accent-rgb) / 0.16)' }}
                transition={{ duration: 0.35 }}
                style={{ padding: '2.5rem 2rem', background: 'var(--card-bg)', border: '1px solid var(--card-border)', position: 'relative' }}
              >
                <p style={{ fontSize: '1.6rem', color: 'var(--accent)', marginBottom: '1rem' }}>{v.icon}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--card-title)', marginBottom: '0.75rem' }}>{v.title}</p>
                <p style={{ color: 'var(--fg-2)', fontSize: '13px', lineHeight: 1.65 }}>{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Slogans */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', background: 'var(--canvas)', borderBottom: '1px solid var(--hairline)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <motion.p
            className="section-label"
            style={{ marginBottom: '1.5rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >The Moirai Creed</motion.p>
          <div className="greek-divider" style={{ marginBottom: '2.5rem' }} />
          {SLOGANS.map((s, i) => (
            <motion.p
              key={s}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.15rem,2.5vw,1.6rem)', fontStyle: 'italic', color: 'var(--obsidian)', marginBottom: '2rem', lineHeight: 1.4, letterSpacing: '0.02em' }}
            >{s}</motion.p>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', background: 'var(--surface)' }}>
        <motion.div
          style={{ maxWidth: 540, margin: '0 auto' }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.h2
            variants={staggerFadeUp}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem,4vw,3.25rem)', fontStyle: 'italic', marginBottom: '1rem', lineHeight: 1.15, color: 'var(--obsidian)' }}
          >
            Ready to wear your destiny?
          </motion.h2>
          <motion.div variants={staggerFadeUp} className="greek-divider" />
          <motion.div variants={staggerFadeUp} style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/collections" className="btn-primary">View Collections</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/bespoke" className="btn-ghost">Start Bespoke</Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <style>{`
        .about-grid, .ceo-grid { display: grid; gap: 5rem; align-items: center; }
        .about-grid { grid-template-columns: 1fr 1fr; }
        .ceo-grid { grid-template-columns: 1fr 1fr; }
        @media(max-width:768px) {
          .about-grid { display: flex; flex-direction: column-reverse; gap: 3rem; }
          .ceo-grid { display: flex; flex-direction: column; gap: 3rem; }
        }
      `}</style>
    </div>
  )
}
