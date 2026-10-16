'use client'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { motion } from 'framer-motion'
import { staggerContainer, staggerFadeUp } from '@/lib/animations'
import { useCurrency, useSiteConfig } from './Providers'
import { waLink } from '@/lib/site'

interface CollectionsClientProps {
  grouped: Record<string, any[]>
  collections: any[]
  heroImage: string | null
}

export default function CollectionsClient({ grouped, collections, heroImage }: CollectionsClientProps) {
  const { displayPrice } = useCurrency()
  const site = useSiteConfig()
  return (
    <div style={{ paddingTop: '5rem' }}>
      {/* Header */}
      <section style={{ padding: '5rem 2rem 4rem', textAlign: 'center', background: 'var(--bg)', borderBottom: '1px solid var(--border)', position: 'relative', minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {(() => {
          const imgRaw = heroImage
          const imageSrc = imgRaw ? (typeof imgRaw === 'string' ? imgRaw : urlFor(imgRaw).width(1200).quality(80).url()) : null
          return imageSrc ? (
            <Image
              src={imageSrc}
              alt="Collections Hero"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', opacity: 0.35 }}
              priority
            />
          ) : null
        })()}
        {!heroImage && (
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center top, rgba(142, 31, 44, 0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
        )}
        <motion.div
          style={{ position: 'relative', zIndex: 1 }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="section-label" variants={staggerFadeUp}>Haute Couture &amp; RTW</motion.p>
          <motion.h1
            variants={staggerFadeUp}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,8vw,6rem)', fontWeight: 600, letterSpacing: '0.02em', marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--obsidian)' }}
          >Collections</motion.h1>
          <motion.div className="greek-divider" variants={staggerFadeUp} />
          {/* Category jump links */}
          <motion.div
            style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {collections.map(cat => (
              <motion.a
                key={cat.title}
                href={`#${cat.slug || cat.title.toLowerCase().replace(/ /g, '-')}`}
                variants={staggerFadeUp}
                whileHover={{ borderColor: 'var(--gold)', color: 'var(--gold)', scale: 1.04 }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '0.55rem 1.35rem', border: '1px solid var(--card-border)', background: 'var(--card-bg)', color: 'var(--ivory-2)', transition: 'all 0.25s', display: 'inline-block' }}
              >{cat.title}</motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Sections per category */}
      {collections.map((cat, ci) => {
        const catProducts = grouped[cat.title] || []
        const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']
        const romanIndex = romanNumerals[ci] || `0${ci + 1}`
        return (
          <section
            key={cat.title}
            id={cat.slug || cat.title.toLowerCase().replace(/ /g, '-')}
            className="section"
            style={{ background: ci % 2 === 0 ? 'var(--canvas)' : 'var(--surface)', borderBottom: '1px solid var(--hairline)' }}
          >
            <div className="container">
              <motion.div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
              >
                <motion.div variants={staggerFadeUp}>
                  <p className="greek-numeral" style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{romanIndex}</p>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.25rem)', marginTop: '0.25rem', marginBottom: '0.5rem' }}>{cat.title}</h2>
                </motion.div>
              </motion.div>

              <motion.div
                className="carousel-scroll"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                {catProducts.length === 0
                  ? (
                    <motion.div
                      variants={staggerFadeUp}
                      className="carousel-card"
                      style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', border: '1px solid var(--card-border)', background: 'var(--card-bg)', minHeight: 320 }}
                    >
                      <div style={{ position: 'relative', minHeight: 320, background: 'var(--ink-3)' }}>
                        {cat.image && (
                          <Image src={urlFor(cat.image).width(900).quality(85).url()} alt={`${cat.title} collection`} fill sizes="(max-width: 768px) 100vw, 45vw" style={{ objectFit: 'cover' }} loading="lazy" />
                        )}
                      </div>
                      <div style={{ padding: 'clamp(1.5rem, 4vw, 3rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
                        <p className="section-label">Pieces arriving soon</p>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: 'var(--ivory)', lineHeight: 1.2 }}>
                          The {cat.title.toLowerCase()} pieces are being photographed for the site.
                        </p>
                        <p style={{ fontSize: '15px', color: 'var(--ivory-2)', lineHeight: 1.65 }}>Ask the atelier on WhatsApp to see what is available now.</p>
                        <a href={waLink(site.whatsappNumber, `Hi Moirai! I'd like to see pieces from the ${cat.title} collection.`)} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
                          Ask about this collection
                        </a>
                      </div>
                    </motion.div>
                  )
                  : catProducts.map((p: any) => {
                    const name = p.title || p.name || 'this item'
                    const displayImage = p.imageUrl
                    return (
                      <motion.div
                        key={p._id}
                        variants={staggerFadeUp}
                        className="carousel-card card-hover img-zoom"
                        style={{ position: 'relative', overflow: 'hidden', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}
                        whileHover="hover"
                        initial="rest"
                      >
                        <div style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden' }}>
                          <motion.div style={{ width: '100%', height: '100%', position: 'relative' }} variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }} transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}>
                            {displayImage
                              ? <Image src={displayImage} alt={name} fill sizes="(max-width: 768px) 80vw, 400px" style={{ objectFit: 'cover' }} loading="lazy" />
                              : <span aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'var(--ivory-3)', fontSize: '2rem' }}>✦</span>}
                          </motion.div>
                        </div>
                        {/* Product info overlay on hover */}
                        <div style={{ position: 'absolute', inset: 0, padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'linear-gradient(to top, rgba(10, 9, 8, 0.96) 0%, transparent 50%)' }}>
                          <motion.div 
                            initial={{ opacity: 0 }} 
                            variants={{ hover: { opacity: 1, y: 0 }, rest: { opacity: 0, y: 10 } }} 
                            transition={{ duration: 0.2 }}
                            style={{ background: 'var(--card-bg)', padding: '1.25rem', border: '1px solid var(--gold)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                          >
                            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--card-title)' }}>{name}</p>
                            {p.category && <p style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '0.35rem' }}>{p.category}</p>}
                            <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ivory-2)', marginBottom: '0.75rem' }}>{displayPrice(p)}</p>
                            {p.available !== false && (
                              <motion.a
                                href={waLink(site.whatsappNumber, `Hi I want to order ${name}`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: 'inline-block', padding: '0.5rem 1rem', border: '1px solid var(--oxblood)', background: 'var(--oxblood)', color: 'var(--ivory)', fontSize: '9.5px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', width: 'fit-content' }}
                                whileHover={{ backgroundColor: 'var(--oxblood-hover)', borderColor: 'var(--oxblood-hover)', scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.2 }}
                              >Order Now</motion.a>
                            )}
                            {p.available === false && (
                              <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: 'var(--card-index)', textTransform: 'uppercase' }}>Sold Out</span>
                            )}
                          </motion.div>
                        </div>
                      </motion.div>
                    )
                  })
                }
              </motion.div>
            </div>
          </section>
        )
      })}

      {/* MoMo note + Shop link */}
      <motion.div
        style={{ padding: '2.5rem 2rem', textAlign: 'center', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 2, marginBottom: '1.25rem' }}>
          Payment via <span style={{ color: 'var(--accent-soft)' }}>Mobile Money (MoMo)</span>. Enquire via WhatsApp to place your order.
        </p>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
          <Link href="/shop" className="btn-ghost" style={{ fontSize: '10px' }}>Browse the Full Shop →</Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
