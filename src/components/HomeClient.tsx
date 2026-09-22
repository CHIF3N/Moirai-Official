'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

// ── Framer Motion Variants ──────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: EASE } }),
}
const fadeIn = {
  hidden:  { opacity: 0 },
  visible: (delay = 0) => ({ opacity: 1, transition: { duration: 0.55, delay, ease: 'easeOut' as const } }),
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const staggerChild = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

// ── Types ───────────────────────────────────────────────────────────────────
interface HomeClientProps {
  products: any[]
  posts: any[]
  waNumber: string
  waMsg: string
  collections: any[]
  heroImageUrl?: string
  heroText?: string
  heroSlides?: any[]
  lookbook?: any[]
  bespokeHeroImage?: string
  editorialItems?: any[]
  leadHeroImageUrl?: string
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function formatXAF(n: number | null | undefined): string {
  if (!n) return ''
  return n.toLocaleString('fr-CM') + ' XAF'
}
function formatUSD(n: number | null | undefined): string {
  if (!n) return ''
  return '$' + n.toLocaleString('en-US') + ' USD'
}
function priceDisplay(item: any): string {
  const xaf = item.priceXAF || item.price
  const usd = item.priceUSD
  if (xaf && usd) return `${formatXAF(xaf)} / ${formatUSD(usd)}`
  if (xaf) return formatXAF(xaf)
  if (usd) return formatUSD(usd)
  return ''
}

// ── VALUES ───────────────────────────────────────────────────────────────────
const VALUES = [
  { glyph: '◆', title: 'Customer Experience',      desc: 'Every interaction is personal. You are not a transaction.' },
  { glyph: '◇', title: 'Craftsmanship Excellence', desc: 'We obsess over details that others overlook.' },
  { glyph: '✦', title: 'Empowerment Through Style', desc: 'Fashion is the language of confidence.' },
  { glyph: '✧', title: 'Sustainability',            desc: 'Intentional creation. Pieces made to last.' },
]

// ── Component ────────────────────────────────────────────────────────────────
export default function HomeClient({
  products,
  posts,
  waNumber,
  waMsg,
  collections,
  heroImageUrl,
  heroText,
  heroSlides,
  lookbook,
  bespokeHeroImage,
  editorialItems = [],
  leadHeroImageUrl,
}: HomeClientProps) {
  const [heroLoaded, setHeroLoaded] = useState(false)

  // First available hero image
  const heroImg = leadHeroImageUrl || heroSlides?.[0]?.image || heroImageUrl

  // Gallery items: prefer editorialItems, fallback to products
  const galleryItems = editorialItems.length > 0
    ? editorialItems
    : products.map(p => ({ ...p, displayTitle: p.name || p.title }))

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════
          1. ASYMMETRIC HERO SECTION
          ════════════════════════════════════════════════════════════════ */}
      <section
        className="hero-editorial"
        style={{ paddingTop: '5rem' }}   /* body already has 109px offset for ticker+navbar */
        aria-label="Hero"
      >
        {/* ── Ambient Silk Video Background ── */}
        <div className="silk-video-wrap">
          <video
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          >
            <source src="/videos/hero-silk-loop.mp4" type="video/mp4" />
          </video>
          <div className="silk-gradient" />
        </div>

        {/* ── Left Column ── */}
        <div className="hero-left" style={{ position: 'relative', zIndex: 1 }}>

          <motion.p
            className="section-label"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            AUTUMN / WINTER 2026 EDITION
          </motion.p>

          <motion.h1
            className="hero-headline"
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Destiny,<br />
            <em>Tailored</em>.<br />
            Not a Trend.
          </motion.h1>

          <motion.p
            custom={0.22}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              lineHeight: 1.9,
              color: 'var(--text-secondary)',
              maxWidth: '420px',
              marginBottom: '2.5rem',
            }}
          >
            African Haute Couture &amp; Corsetry engineered for identity.
            Handcrafted silhouettes born from mythic elegance — made for who you are becoming.
          </motion.p>

          <motion.div
            custom={0.32}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <Link href="/bespoke" className="btn-primary">
              BESPOKE CONSULTATION
            </Link>
            <Link
              href="/collections"
              className="btn-ghost"
            >
              EXPLORE ARCHIVE
            </Link>
          </motion.div>

          {/* Heritage decorative counter */}
          <motion.div
            custom={0.45}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            style={{
              marginTop: '4rem',
              display: 'flex',
              gap: '3rem',
            }}
          >
            {[
              { value: '500+', label: 'Bespoke Pieces' },
              { value: '8+',   label: 'Years of Craft' },
              { value: '3',    label: 'Ateliers' },
            ].map(stat => (
              <div key={stat.label}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--obsidian)', lineHeight: 1 }}>
                  {stat.value}
                </p>
                <p className="section-label" style={{ marginTop: '0.4rem' }}>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right Column: Lead Editorial Image ── */}
        <div className="hero-right" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Main image frame */}
            <div
              className="img-frame"
              style={{ aspectRatio: '3/4', maxHeight: '75vh', width: '100%' }}
            >
              {heroImg ? (
                <Image
                  src={heroImg}
                  alt="Moirai Editorial — Lead Piece"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  priority
                  onLoad={() => setHeroLoaded(true)}
                />
              ) : (
                /* Editorial placeholder when no Sanity image is set */
                <div className="img-placeholder">
                  <div style={{ textAlign: 'center', opacity: 0.18 }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', lineHeight: 1 }}>✦</p>
                    <p className="section-label" style={{ marginTop: '1rem' }}>Editorial Image</p>
                  </div>
                </div>
              )}

              {/* Floating metadata plaque */}
              {galleryItems[0] && (
                <motion.div
                  className="meta-plaque"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.55 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--obsidian)', fontWeight: 400 }}>
                        {galleryItems[0].displayTitle || 'Bespoke Piece No. 1'}
                      </p>
                      <p className="section-label" style={{ marginTop: '0.3rem' }}>
                        {galleryItems[0].category?.title || 'ATELIER EDITION'}
                      </p>
                    </div>
                    {priceDisplay(galleryItems[0]) && (
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, color: 'var(--umber)', letterSpacing: '0.05em', whiteSpace: 'nowrap', marginLeft: '1rem' }}>
                        {priceDisplay(galleryItems[0])}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Decorative offset caption */}
            <p style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateX(calc(100% + 1.25rem)) rotate(90deg)',
              transformOrigin: 'left center',
              fontFamily: 'var(--font-body)',
              fontSize: '8.5px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'var(--umber)',
              whiteSpace: 'nowrap',
            }}>
              THE HOUSE OF MOIRAI — AW26
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          2. HERITAGE MARQUEE STRIP
          ════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          overflow: 'hidden',
          borderTop: '1px solid var(--hairline)',
          borderBottom: '1px solid var(--hairline)',
          padding: '0.9rem 0',
          background: 'var(--surface)',
        }}
        aria-hidden="true"
      >
        <div style={{ display: 'flex', animation: 'marqueeScroll 35s linear infinite', width: 'max-content' }}>
          {[
            'CLOTHO SPINS THE THREAD', '✦',
            'LACHESIS MEASURES DESTINY', '✦',
            'ATROPOS CUTS THE SILHOUETTE', '✦',
            'HANDCRAFTED IN CAMEROON', '✦',
            'WORLDWIDE ATELIER', '✦',
            'CLOTHO SPINS THE THREAD', '✦',
            'LACHESIS MEASURES DESTINY', '✦',
            'ATROPOS CUTS THE SILHOUETTE', '✦',
            'HANDCRAFTED IN CAMEROON', '✦',
            'WORLDWIDE ATELIER', '✦',
          ].map((t, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: t === '✦' ? 'var(--gold)' : 'var(--obsidian)',
                opacity: t === '✦' ? 1 : 0.85,
                padding: t === '✦' ? '0 1.25rem' : '0 2rem',
                whiteSpace: 'nowrap',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          3. BRAND PHILOSOPHY STATEMENT
          ════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: '8rem 3.5rem',
          background: 'var(--canvas)',
          borderBottom: '1px solid var(--hairline)',
        }}
      >
        <div style={{ maxWidth: '1320px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          {/* Left — quote */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={staggerChild} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <span className="divider" />
              <p className="section-label">OUR PHILOSOPHY</p>
            </motion.div>
            <motion.h2
              variants={staggerChild}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.2,
                color: 'var(--obsidian)',
                marginBottom: '2rem',
              }}
            >
              &ldquo;Bold, Empowered,<br />and an endless moment.&rdquo;
            </motion.h2>
            <motion.div variants={staggerChild}>
              <Link href="/about" className="btn-ghost" style={{ minHeight: '48px', display: 'inline-flex', alignItems: 'center' }}>
                DISCOVER OUR STORY →
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — body copy */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p
              variants={staggerChild}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14.5px',
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem',
              }}
            >
              Moirai draws inspiration from the Greek Fates — Clotho, Lachesis, and Atropos — the ancient weavers who spun, measured, and cut the threads of human destiny. We believe every silhouette tells a story, every stitch carries intention. Fashion is not fleeting decoration. It is the architectural language of identity.
            </motion.p>
            <div className="greek-divider" style={{ margin: '1.5rem 0' }} />
            <motion.p
              variants={staggerChild}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14.5px',
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
              }}
            >
              From our flagship atelier in Cameroon, our couturiers craft bespoke gowns, sculpted corsets, and bridal silhouettes for those who refuse to be ordinary.
            </motion.p>
          </motion.div>
        </div>
        <style>{`@media(max-width:900px){
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }`}</style>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          4. CURATED COLLECTION GALLERY
          ════════════════════════════════════════════════════════════════ */}
      <section
        style={{ padding: '7rem 3.5rem', background: 'var(--canvas)' }}
        id="gallery"
      >
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          {/* Header */}
          <div className="gallery-header" style={{ marginBottom: '2.5rem' }}>
            <div>
              <p className="section-label" style={{ marginBottom: '0.5rem' }}>JUST ADDED</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.75rem)', fontWeight: 400, color: 'var(--obsidian)', letterSpacing: '0.03em' }}>
                Curated Pieces
              </h2>
            </div>
            <Link
              href="/shop"
              style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', transition: 'color 0.25s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--bronze)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--gold)')}
            >
              VIEW COMPLETE CATALOGUE →
            </Link>
          </div>

          {/* Gallery Grid / Mobile Carousel */}
          {galleryItems.length > 0 ? (
            <motion.div
              className="gallery-grid carousel-scroll"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              {galleryItems.slice(0, 6).map((item: any) => {
                const imgSrc = item.imageUrl
                const title  = item.displayTitle || item.name || item.title || 'Atelier Piece'
                const cat    = item.category?.title
                const price  = priceDisplay(item)
                const slug   = item.slug?.current || item.slug
                const waText = encodeURIComponent(`Hi, I'd like to enquire about: ${title}`)

                return (
                  <motion.article
                    key={item._id}
                    className="product-card carousel-card card-hover"
                    variants={staggerChild}
                  >
                    {/* Image */}
                    <div className="product-card-img">
                      {imgSrc ? (
                        <Image
                          src={imgSrc}
                          alt={title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          style={{ objectFit: 'cover', display: 'block' }}
                          loading="lazy"
                        />
                      ) : (
                        /* Clean placeholder — never breaks build */
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            background: 'var(--surface)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            aspectRatio: '4/5',
                          }}
                        >
                          <span style={{ opacity: 0.15, fontSize: '2rem' }}>✦</span>
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="product-card-body">
                      {cat && <p className="product-card-cat">{cat}</p>}
                      <p className="product-card-title">{title}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.6rem' }}>
                        {price
                          ? <p className="product-card-price">{price}</p>
                          : <p className="product-card-price" style={{ color: 'var(--umber)' }}>Price on enquiry</p>
                        }
                        <a
                          href={`https://wa.me/237682710405?text=${waText}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '9px',
                            fontWeight: 500,
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            color: 'var(--umber)',
                            borderBottom: '1px solid var(--hairline)',
                            paddingBottom: '1px',
                            transition: 'color 0.2s, border-color 0.2s',
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.color = 'var(--obsidian)'
                            ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--obsidian)'
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.color = 'var(--umber)'
                            ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--hairline)'
                          }}
                        >
                          ENQUIRE
                        </a>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          ) : (
            /* No products in Sanity yet — editorial empty state */
            <div style={{ textAlign: 'center', padding: '5rem 2rem', border: '1px solid var(--hairline)', background: 'var(--surface)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', opacity: 0.12, lineHeight: 1 }}>✦</p>
              <p className="section-label" style={{ marginTop: '1.5rem' }}>CURATING THE COLLECTION</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--umber)', marginTop: '0.75rem' }}>
                Our latest pieces are being prepared. Check back soon.
              </p>
              <Link href="/bespoke" className="btn-ghost" style={{ marginTop: '2rem', display: 'inline-flex', alignItems: 'center', minHeight: '48px' }}>
                COMMISSION A BESPOKE PIECE
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          5. EDITORIAL FEATURE BANNERS — Bespoke + Fashion School
          ════════════════════════════════════════════════════════════════ */}
      <div className="feature-banners">
        {/* Bespoke Process */}
        <motion.div
          className="feature-banner feature-banner-dark"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          {bespokeHeroImage && (
            <div className="feature-banner-img">
              <Image
                src={bespokeHeroImage}
                alt="Bespoke Couture Atelier"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              {/* Dark overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,20,19,0.68)' }} />
            </div>
          )}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p className="section-label" style={{ color: 'rgba(251,249,245,0.5)', marginBottom: '1.5rem' }}>OUR SPECIALTY</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 300, lineHeight: 1.1, color: 'var(--canvas)', marginBottom: '1.5rem' }}>
              The Bespoke<br /><em>Process</em>
            </h2>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              {['Consultation', 'Measurements', 'Draping', 'Fitting', 'Delivery'].map(step => (
                <span
                  key={step}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '9px',
                    fontWeight: 500,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'rgba(251,249,245,0.55)',
                    border: '1px solid rgba(251,249,245,0.2)',
                    padding: '0.35rem 0.85rem',
                  }}
                >
                  {step}
                </span>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', lineHeight: 1.9, color: 'rgba(251,249,245,0.7)', marginBottom: '2.5rem', maxWidth: '380px' }}>
              Custom pieces crafted to reflect your identity. Every measurement, every fabric choice, every stitch is a conversation between your vision and our craft.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/bespoke" className="btn-enquire" style={{ color: 'var(--canvas)', borderColor: 'rgba(251,249,245,0.5)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--canvas)'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--obsidian)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--canvas)'
                }}
              >
                START YOUR ORDER
              </Link>
              <a
                href={`https://wa.me/237682710405?text=${encodeURIComponent('Hi! I am interested in a bespoke piece from Moirai.')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-body)', fontSize: '9.5px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(251,249,245,0.55)', display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(251,249,245,0.2)', paddingBottom: '1px', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--canvas)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(251,249,245,0.55)')}
              >
                WHATSAPP US →
              </a>
            </div>
          </div>
        </motion.div>

        {/* Fashion School */}
        <motion.div
          className="feature-banner feature-banner-light"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p className="section-label" style={{ marginBottom: '1.5rem' }}>LEARN THE CRAFT</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 300, lineHeight: 1.1, color: 'var(--obsidian)', marginBottom: '1.5rem' }}>
              Moirai Fashion<br /><em>School</em>
            </h2>
            <div style={{ width: '40px', height: '1px', background: 'var(--hairline)', marginBottom: '1.75rem' }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', lineHeight: 1.9, color: 'var(--umber)', marginBottom: '1.5rem', maxWidth: '380px' }}>
              From foundational sewing techniques to advanced couture — our program is built for those who want to create, not just wear, the extraordinary.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              {['Sewing Fundamentals', 'Pattern Making', 'Couture Techniques', 'Fashion Design'].map(module => (
                <span
                  key={module}
                  style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--umber)', border: '1px solid var(--hairline)', padding: '0.35rem 0.85rem' }}
                >
                  {module}
                </span>
              ))}
            </div>
            <Link href="/fashion-school" className="btn-ghost">
              EXPLORE THE PROGRAM →
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          6. CORE VALUES GRID
          ════════════════════════════════════════════════════════════════ */}
      <section style={{ borderTop: '1px solid var(--hairline)', background: 'var(--canvas)', padding: '7rem 3.5rem' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <motion.div
            style={{ textAlign: 'center', marginBottom: '4.5rem' }}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p className="section-label" variants={staggerChild}>WHAT WE STAND FOR</motion.p>
            <motion.h2
              variants={staggerChild}
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 400, color: 'var(--obsidian)', marginTop: '0.5rem' }}
            >
              Core Values
            </motion.h2>
            <motion.div variants={staggerChild} className="greek-divider" />
          </motion.div>

          <motion.div
            className="values-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {VALUES.map(v => (
              <motion.div
                key={v.title}
                variants={staggerChild}
                style={{
                  padding: '3.5rem 2.5rem',
                  background: 'var(--canvas)',
                  transition: 'background 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--surface)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--canvas)')}
              >
                <p style={{ fontSize: '1.6rem', color: 'var(--gold)', marginBottom: '1.25rem' }}>{v.glyph}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--obsidian)', marginBottom: '0.65rem', fontWeight: 600 }}>{v.title}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#1E1C1A', lineHeight: 1.65 }}>{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          7. FINAL CTA
          ════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: '9rem 3.5rem',
          background: 'var(--surface)',
          borderTop: '1px solid var(--hairline)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative background glyph */}
        <p
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20rem, 30vw, 32rem)',
            lineHeight: 1,
            color: 'var(--hairline)',
            opacity: 0.4,
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          ✦
        </p>

        <motion.div
          style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={staggerChild} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <span className="divider" />
            <p className="section-label">READY TO BEGIN?</p>
            <span className="divider" />
          </motion.div>

          <motion.h2
            variants={staggerChild}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.75rem, 6vw, 5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.05,
              color: 'var(--obsidian)',
              marginBottom: '1rem',
            }}
          >
            Made for who<br />you are Becoming.
          </motion.h2>

          <motion.div variants={staggerChild} className="greek-divider" />

          <motion.p
            variants={staggerChild}
            style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1E1C1A', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '520px', margin: '0 auto 2.5rem' }}
          >
            Whether it is an archival bespoke creation, a couture evening gown, or your foundational apprenticeship in our fashion school — your destiny is woven here.
          </motion.p>

          <motion.div
            variants={staggerChild}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link href="/bespoke" className="btn-primary">
              START YOUR JOURNEY
            </Link>
            <a
              href={`https://wa.me/${waNumber}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              CHAT WITH US
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
