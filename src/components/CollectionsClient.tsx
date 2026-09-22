'use client'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { motion } from 'framer-motion'
import { staggerContainer, staggerFadeUp } from '@/lib/animations'

// Curated luxury fashion editorial fallbacks — ensures no empty wireframe boxes
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=1000&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&h=1000&fit=crop&q=80',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1000&fit=crop&q=80',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=1000&fit=crop&q=80',
]

interface CollectionsClientProps {
  grouped: Record<string, any[]>
  waNumber: string
  collections: any[]
  heroImage: string | null
}

export default function CollectionsClient({ grouped, waNumber, collections, heroImage }: CollectionsClientProps) {
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
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center top, rgba(124, 58, 237, 0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
        )}
        <motion.div
          style={{ position: 'relative', zIndex: 1 }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="section-label" variants={staggerFadeUp}>The House of Moirai</motion.p>
          <motion.h1
            variants={staggerFadeUp}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,8vw,6rem)', fontWeight: 700, marginBottom: '1rem', background: 'linear-gradient(135deg, var(--text) 0%, var(--accent-soft) 50%, var(--accent) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >Collections</motion.h1>
          <motion.div className="divider" style={{ marginBottom: '2rem' }} variants={staggerFadeUp} />
          {/* Category jump links */}
          <motion.div
            style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {collections.map(cat => (
              <motion.a
                key={cat.title}
                href={`#${cat.slug || cat.title.toLowerCase().replace(/ /g, '-')}`}
                variants={staggerFadeUp}
                whileHover={{ borderColor: 'var(--accent)', color: 'var(--accent-soft)', scale: 1.04 }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '0.5rem 1.25rem', border: '1px solid var(--border)', color: 'var(--muted)', transition: 'all 0.25s', display: 'inline-block' }}
              >{cat.title}</motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Sections per category */}
      {collections.map((cat, ci) => {
        const catProducts = grouped[cat.title] || []
        return (
          <section
            key={cat.title}
            id={cat.slug || cat.title.toLowerCase().replace(/ /g, '-')}
            className="section"
            style={{ background: ci % 2 === 0 ? 'var(--bg)' : 'var(--bg)', borderBottom: '1px solid var(--border)' }}
          >
            <div className="container">
              <motion.div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
              >
                <motion.div variants={staggerFadeUp}>
                  <p className="section-label">0{ci + 1}</p>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', marginBottom: '0.5rem' }}>{cat.title}</h2>
                </motion.div>
              </motion.div>

              <motion.div
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                {catProducts.length === 0
                  ? [0, 1, 2].map(n => (
                    <motion.div
                      key={n}
                      variants={staggerFadeUp}
                      className="img-zoom"
                      style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden', border: '1px solid var(--card-border)', background: 'var(--card-bg)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                      whileHover={{ y: -4, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                    >
                      <Image
                        src={FALLBACK_IMAGES[n % FALLBACK_IMAGES.length]}
                        alt="Editorial fashion"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                      />
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.25rem', background: 'linear-gradient(to top, rgba(251,249,245,0.95) 0%, transparent 100%)' }}>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '8px', letterSpacing: '0.25em', color: 'var(--card-index)', textTransform: 'uppercase' }}>Coming Soon</p>
                      </div>
                    </motion.div>
                  ))
                  : catProducts.map((p: any) => {
                    const msg = encodeURIComponent(`Hi I want to order ${p.name || 'this item'}`)
                    const fallbackIdx = catProducts.indexOf(p) % FALLBACK_IMAGES.length
                    const displayImage = p.imageUrl || FALLBACK_IMAGES[fallbackIdx]
                    return (
                      <motion.div
                        key={p._id}
                        variants={staggerFadeUp}
                        className="img-zoom"
                        style={{ position: 'relative', overflow: 'hidden', border: '1px solid var(--card-border)', background: 'var(--card-bg)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                        whileHover="hover"
                        initial="rest"
                      >
                        <div style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden' }}>
                          <motion.div style={{ width: '100%', height: '100%', position: 'relative' }} variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                            <Image src={displayImage} alt={p?.name || 'Item'} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} loading="lazy" />
                          </motion.div>
                        </div>
                        {/* Product info overlay on hover */}
                        <div style={{ position: 'absolute', inset: 0, padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'linear-gradient(to top, rgba(251,249,245,0.96) 0%, transparent 50%)' }}>
                          <motion.div 
                            initial={{ opacity: 0 }} 
                            variants={{ hover: { opacity: 1, y: 0 }, rest: { opacity: 0, y: 10 } }} 
                            transition={{ duration: 0.2 }}
                            style={{ background: 'var(--canvas)', padding: '1rem', border: '1px solid var(--card-border)' }}
                          >
                            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--card-title)' }}>{p.name}</p>
                            {p.category?.title && <p style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--card-index)', marginBottom: '0.35rem' }}>{p.category.title}</p>}
                            {p.price && <p style={{ fontSize: '11px', color: 'var(--card-body)', marginBottom: '0.75rem' }}>{p.price}</p>}
                            {p.available !== false && (
                              <motion.a
                                href={`https://wa.me/237682710405?text=${msg}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: 'inline-block', padding: '0.4rem 0.9rem', border: '1px solid var(--accent)', color: 'var(--card-title)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', width: 'fit-content' }}
                                whileHover={{ backgroundColor: 'var(--accent)', color: 'var(--canvas)', scale: 1.04 }}
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
