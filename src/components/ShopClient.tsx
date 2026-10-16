'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerFadeUp } from '@/lib/animations'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { useCurrency, useSiteConfig } from './Providers'
import { useCart } from './CartDrawer'
import { waLink } from '@/lib/site'

export default function ShopClient({ products }: { products: any[] }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const { displayPrice } = useCurrency()
  const site = useSiteConfig()
  const { addItem } = useCart()
  const [addedId, setAddedId] = useState<string | null>(null)

  const quickAdd = (p: any) => {
    addItem({ id: p.id, name: p.name, price: p.price, priceType: p.priceType, image: p.image, slug: p.slug, category: p.category })
    setAddedId(p.id)
    setTimeout(() => setAddedId(null), 1800)
  }

  const parsedItems = useMemo(() => products.map((p: any) => ({
    id: p._id,
    name: p.title || p.name || 'Product',
    slug: p.slug?.current || p.slug,
    category: p.category?.title || p.category || 'Other',
    price: typeof p.price === 'number' ? p.price : null,
    priceType: p.priceType,
    desc: p.description || '',
    image: p.imageUrl || p.image,
    secondaryImage: p.images?.[0], // For hover reveal
  })), [products])

  const uniqueCategories = Array.from(new Set(parsedItems.map(p => p.category))).filter((c): c is string => Boolean(c) && typeof c === 'string')
  const dynamicCategories = ['All', ...uniqueCategories]

  const filtered = useMemo(() => {
    return parsedItems.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [parsedItems, activeCategory, search])

  const waEnquire = (name: string) =>
    waLink(site.whatsappNumber, `Hi I want to order ${name}`)

  return (
    <div style={{ paddingTop: '5rem' }}>
      {/* Hero header */}
      <section style={{
        padding: '5rem 2rem 3rem',
        textAlign: 'center',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center top, rgba(142, 31, 44, 0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <motion.div
          style={{ position: 'relative', zIndex: 1 }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="section-label" variants={staggerFadeUp}>The House of Moirai</motion.p>
          <motion.h1
            variants={staggerFadeUp}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem,8vw,6rem)',
              fontWeight: 700,
              marginBottom: '1rem',
              color: 'var(--text)'
            }}
          >Shop</motion.h1>
          <motion.div className="divider" style={{ marginBottom: '1.5rem' }} variants={staggerFadeUp} />
          <motion.p variants={staggerFadeUp} style={{ color: 'var(--muted)', fontSize: '13px', maxWidth: 480, margin: '0 auto 0' }}>
            Enquire via WhatsApp. Payment via MoMo on confirmation.
          </motion.p>
        </motion.div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky-bar" style={{
        background: 'rgba(10, 9, 8, 0.94)',
        borderBottom: '1px solid var(--border)',
        padding: '1rem clamp(1.25rem, 4vw, 2rem)',
        position: 'sticky',
        top: 'var(--nav-h)',
        zIndex: 100,
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Search bar inside filter block */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
             <input 
               type="text" 
               placeholder="Search collection..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               style={{
                 background: 'var(--bg)',
                 border: '1px solid var(--border)',
                 color: 'var(--text)',
                 padding: '0.6rem 1rem',
                 fontSize: '13px',
                 fontFamily: 'var(--font-body)',
                 outline: 'none',
                 width: '100%',
                 maxWidth: '300px'
               }}
             />
             <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {(['grid', 'list'] as const).map(v => (
                <motion.button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  aria-label={v === 'grid' ? 'Grid view' : 'List view'}
                  aria-pressed={view === v}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: 40, height: 40,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid',
                    cursor: 'pointer',
                    borderColor: view === v ? 'var(--accent)' : 'var(--border)',
                    color: view === v ? 'var(--accent)' : 'var(--muted)',
                    background: view === v ? 'var(--accent-soft)' : 'transparent',
                  }}
                >
                  {v === 'grid'
                    ? <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="0" y="0" width="5" height="5" /><rect x="7" y="0" width="5" height="5" /><rect x="0" y="7" width="5" height="5" /><rect x="7" y="7" width="5" height="5" /></svg>
                    : <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="0" y="0" width="12" height="2.5" /><rect x="0" y="5" width="12" height="2.5" /><rect x="0" y="10" width="12" height="2.5" /></svg>
                  }
                </motion.button>
              ))}
              <span style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.1em', paddingLeft: '0.5rem' }}>{filtered.length} pieces</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', overflowX: 'auto', paddingBottom: '0.5rem' }} className="no-scrollbar">
            {dynamicCategories.map((cat: string) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '0.4rem 1.1rem',
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  border: '1px solid',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s',
                  borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--border)',
                  color: activeCategory === cat ? 'var(--accent)' : 'var(--muted)',
                  background: activeCategory === cat ? 'var(--accent-soft)' : 'transparent',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <section style={{ padding: '3rem 0 6rem', background: 'var(--bg)', minHeight: '50vh' }}>
        <div className="container">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
               <motion.div
                 key="empty"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 style={{ textAlign: 'center', padding: '6rem 2rem', color: 'var(--muted)' }}
               >
                 <span style={{ fontSize: '3rem', opacity: 0.2, marginBottom: '1rem', display: 'block' }}>✦</span>
                 <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', color: 'var(--text)', marginBottom: '0.5rem' }}>New pieces arriving soon.</p>
                 <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Check back later or adjust your filters.</p>
               </motion.div>
            ) : view === 'grid' ? (
              <motion.div
                key={`grid-${activeCategory}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}
              >
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    whileHover="hover"
                    style={{ background: 'var(--bg)', border: '1px solid var(--border)', transition: 'border-color 0.3s' }}
                  >
                    <div style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden' }}>
                      {(() => {
                        const imgRaw = p?.image
                        const imageSrc = imgRaw ? (typeof imgRaw === 'string' ? imgRaw : urlFor(imgRaw).width(800).quality(80).url()) : undefined
                        const imgSecRaw = p?.secondaryImage
                        const imageSecSrc = imgSecRaw ? (typeof imgSecRaw === 'string' ? imgSecRaw : urlFor(imgSecRaw).width(800).quality(80).url()) : undefined

                        return imageSrc ? (
                          <motion.div style={{ width: '100%', height: '100%', position: 'relative' }} variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }} initial="rest" animate="rest" transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                            <Image
                              src={imageSrc}
                              alt={p?.name || 'Product'}
                              fill
                              sizes="(max-width: 768px) 100vw, 300px"
                              style={{ objectFit: 'cover', position: 'absolute', inset: 0, zIndex: 1 }}
                              loading="lazy"
                            />
                            {imageSecSrc && (
                              <motion.div variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }} transition={{ duration: 0.4 }} style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
                                 <Image src={imageSecSrc} alt={`${p?.name || 'Product'} alternate`} fill sizes="(max-width: 768px) 100vw, 300px" style={{ objectFit: 'cover' }} loading="lazy" />
                              </motion.div>
                            )}
                          </motion.div>
                        ) : (
                          <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: '2rem', opacity: 0.1 }}>✦</span></div>
                        )
                      })()}
                      {p.category && p.category !== 'Other' && (
                        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', padding: '0.35rem 0.8rem', background: 'var(--accent-soft)', border: '1px solid var(--border)', fontSize: '9px', letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase', zIndex: 5 }}>
                          {p.category}
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <Link href={`/product/${p.slug}`} style={{ display: 'block' }}>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400, marginBottom: '0.5rem', color: 'var(--text)' }}>{p.name}</h2>
                        <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.desc || 'Moirai exclusive piece'}</p>
                      </Link>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                        <span style={{ fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.05em' }}>{displayPrice(p)}</span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {/* Quick Add to Bag */}
                          <motion.button
                            onClick={() => quickAdd(p)}
                            style={{
                              padding: '0.6rem 1.1rem',
                              background: addedId === p.id ? 'var(--gold)' : 'var(--obsidian)',
                              border: `1px solid ${addedId === p.id ? 'var(--gold)' : 'var(--obsidian)'}`,
                              color: addedId === p.id ? '#161412' : 'var(--canvas)',
                              fontSize: '9.5px',
                              letterSpacing: '0.18em',
                              textTransform: 'uppercase',
                              cursor: 'pointer',
                              transition: 'background 0.3s, border-color 0.3s, color 0.3s',
                              fontFamily: 'var(--font-body)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              minHeight: '34px',
                            }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                          >
                            {addedId === p.id ? (
                              <>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                                Added
                              </>
                            ) : '+ Bag'}
                          </motion.button>
                          {/* WhatsApp enquire */}
                          <motion.a
                            href={waEnquire(p.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '0.6rem 0.9rem',
                              border: '1px solid var(--hairline)',
                              color: 'var(--umber)',
                              fontSize: '9.5px',
                              letterSpacing: '0.18em',
                              textTransform: 'uppercase',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              fontFamily: 'var(--font-body)',
                              minHeight: '34px',
                            }}
                            whileHover={{ borderColor: 'var(--obsidian)', color: 'var(--obsidian)', scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.2 }}
                          >
                            Enquire
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={`list-${activeCategory}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.05, ease: 'easeOut' }}
                    whileHover={{ paddingLeft: '1rem' }}
                    style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: '2rem', alignItems: 'center', borderBottom: '1px solid var(--border)', padding: '1.5rem 0', transition: 'padding 0.2s' }}
                  >
                    <div style={{ aspectRatio: '3/4', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', overflow: 'hidden', position: 'relative' }}>
                      {(() => {
                        const imgRaw = p?.image
                        const imageSrc = imgRaw ? (typeof imgRaw === 'string' ? imgRaw : urlFor(imgRaw).width(800).quality(80).url()) : undefined
                        return imageSrc ? (
                          <motion.div style={{ width: '100%', height: '100%', position: 'relative' }} whileHover={{ scale: 1.06 }} transition={{ duration: 0.5 }}>
                            <Image
                              src={imageSrc}
                              alt={p?.name || 'Product'}
                              fill
                              sizes="120px"
                              style={{ objectFit: 'cover' }}
                              loading="lazy"
                            />
                          </motion.div>
                        ) : (
                          <span style={{ fontSize: '2rem', opacity: 0.1 }}>✦</span>
                        )
                      })()}
                    </div>
                    <div>
                      <Link href={`/product/${p.slug}`} style={{ display: 'block' }}>
                        {p.category && p.category !== 'Other' && <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{p.category}</p>}
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--text)', marginBottom: '0.5rem' }}>{p.name}</h2>
                        <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.desc || 'Moirai exclusive piece'}</p>
                      </Link>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ fontSize: '12px', color: 'var(--accent)', marginBottom: '1rem' }}>{displayPrice(p)}</p>
                      <motion.a
                        href={waEnquire(p.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '10px', padding: '0.6rem 1.25rem', display: 'inline-block', border: '1px solid var(--accent)', color: 'var(--accent)' }}
                        whileHover={{ scale: 1.03, background: 'var(--accent-soft)' }}
                        whileTap={{ scale: 0.97 }}
                      >Order</motion.a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media (max-width: 768px) {
           .sticky-bar { top: var(--nav-h) !important; }
        }
      `}</style>
    </div>
  )
}
