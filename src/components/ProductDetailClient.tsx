'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerFadeUp } from '@/lib/animations'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { useCurrency, useRecentlyViewed, useSiteConfig } from './Providers'
import { waLink } from '@/lib/site'
import type { PriceType } from '@/lib/price'
import { useCart } from './CartDrawer'
import { PortableText } from '@portabletext/react'

const ChevronDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
const ChevronUp = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>;
const ArrowLeft = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const ArrowRight = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;

interface ProductProps {
  id: string
  name: string
  price: number | null
  priceType?: PriceType
  available?: boolean
  desc: string
  image: string | null
  images?: string[]
  category: string
  sizeGuide?: any[]
  fabricDetails?: any[]
  deliveryInfo?: any[]
  relatedProducts?: any[]
  slug?: string
}

const AccordionItem = ({ title, content }: { title: string, content: any[] }) => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button 
        onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', color: 'var(--text)' }}
      >
        <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{title}</span>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      <AnimatePresence>
        {open && (
           <motion.div 
             initial={{ height: 0, opacity: 0 }} 
             animate={{ height: 'auto', opacity: 1 }} 
             exit={{ height: 0, opacity: 0 }}
             style={{ overflow: 'hidden' }}
           >
             <div style={{ paddingBottom: '1rem', color: 'var(--muted)', fontSize: '13px', lineHeight: 1.8 }}>
                <PortableText value={content} />
             </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ProductDetailClient({ product }: { product: ProductProps }) {
  const { displayPrice } = useCurrency()
  const site = useSiteConfig()
  const { viewedItems, addViewedItem } = useRecentlyViewed()
  const { addItem, toggleCart } = useCart()
  const [added, setAdded] = useState(false)
  
  const waUrl = waLink(site.whatsappNumber, `Hi I want to order ${product.name}`)
  
  const allImages = [product.image, ...(product.images || [])].filter(Boolean) as string[]
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    addViewedItem(product)
  }, [product, addViewedItem])

  const handleAddToBag = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      priceType: product.priceType,
      image: product.image,
      slug: product.slug,
      category: product.category,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x
    const swipeThreshold = 50
    if (swipe < -swipeThreshold) {
      setActiveIdx((prev) => (prev + 1) % allImages.length)
    } else if (swipe > swipeThreshold) {
      setActiveIdx((prev) => (prev - 1 + allImages.length) % allImages.length)
    }
  }

  const handleNext = () => setActiveIdx((prev) => (prev + 1) % allImages.length)
  const handlePrev = () => setActiveIdx((prev) => (prev - 1 + allImages.length) % allImages.length)

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', background: 'var(--bg)' }}>
      <div className="container" style={{ padding: '6rem 1rem' }}>
        <motion.div
          className="product-detail-layout"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Image Side - Carousel */}
          <motion.div variants={staggerFadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative', aspectRatio: '3/4', border: '1px solid var(--border)', background: 'var(--bg)', overflow: 'hidden' }}>
              {allImages.length > 0 ? (
                <>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={activeIdx}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      drag={allImages.length > 1 ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={handleDragEnd}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: allImages.length > 1 ? 'grab' : 'default' }}
                      whileTap={{ cursor: allImages.length > 1 ? 'grabbing' : 'default' }}
                    >
                      {(() => {
                        const imgRaw = allImages[activeIdx]
                        const imageSrc = imgRaw ? (typeof imgRaw === 'string' ? imgRaw : urlFor(imgRaw).width(1200).quality(80).url()) : undefined
                        return imageSrc ? (
                          <Image
                            src={imageSrc}
                            alt={`${product.name} ${activeIdx}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 600px"
                            style={{ objectFit: 'cover' }}
                            priority
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.05)' }} />
                        )
                      })()}
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Desktop Arrows */}
                  {allImages.length > 1 && (
                    <div className="desktop-arrows" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem' }}>
                       <motion.button 
                         whileHover={{ scale: 1.1, backgroundColor: 'rgba(var(--bg-rgb, 255, 255, 255), 0.8)' }} 
                         whileTap={{ scale: 0.9 }}
                         onClick={(e) => { e.stopPropagation(); handlePrev() }} 
                         style={{ pointerEvents: 'auto', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(var(--bg-rgb, 255, 255, 255), 0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)', border: '1px solid var(--border)' }}
                       >
                         <ArrowLeft />
                       </motion.button>
                       <motion.button 
                         whileHover={{ scale: 1.1, backgroundColor: 'rgba(var(--bg-rgb, 255, 255, 255), 0.8)' }} 
                         whileTap={{ scale: 0.9 }}
                         onClick={(e) => { e.stopPropagation(); handleNext() }} 
                         style={{ pointerEvents: 'auto', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(var(--bg-rgb, 255, 255, 255), 0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)', border: '1px solid var(--border)' }}
                       >
                         <ArrowRight />
                       </motion.button>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                  <span style={{ fontSize: '3rem', opacity: 0.2, marginBottom: '1rem', color: 'var(--text)' }}>✦</span>
                  <span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text)' }}>Curating Imagery</span>
                </div>
              )}
              {product.category && product.category !== 'Other' && (
                 <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', padding: '0.4rem 1rem', background: 'var(--accent-soft)', backdropFilter: 'blur(8px)', border: '1px solid var(--border)', fontSize: '10px', letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase', zIndex: 10 }}>
                   {product.category}
                 </div>
              )}
            </div>
            
            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '1rem' }}>
                {allImages.map((imgUrl: string, idx: number) => (
                  <motion.div 
                    key={idx} 
                    onClick={() => setActiveIdx(idx)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ 
                       aspectRatio: '3/4', 
                       border: activeIdx === idx ? '1px solid var(--accent)' : '1px solid var(--border)', 
                       background: 'var(--bg)', 
                       overflow: 'hidden',
                       cursor: 'pointer',
                       position: 'relative',
                       opacity: activeIdx === idx ? 1 : 0.6,
                       transition: 'opacity 0.2s'
                    }}
                  >
                    {(() => {
                      const imageSrc = imgUrl ? (typeof imgUrl === 'string' ? imgUrl : urlFor(imgUrl).width(800).quality(80).url()) : undefined
                      return imageSrc ? (
                        <Image src={imageSrc} alt={`${product.name} thumbnail ${idx}`} fill sizes="100px" style={{ objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.05)' }} />
                      )
                    })()}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details Side */}
          <motion.div variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', padding: '1rem 0' }}>
            <motion.div variants={staggerFadeUp}>
              <Link href="/shop" style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '2rem', minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>
                ← Back to Shop
              </Link>
            </motion.div>
            
            <motion.h1 variants={staggerFadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, color: 'var(--text)', lineHeight: 1.1, marginBottom: '1rem' }}>
              {product.name}
            </motion.h1>
            
            <motion.p variants={staggerFadeUp} style={{ fontSize: '1.25rem', color: 'var(--accent)', letterSpacing: '0.05em', marginBottom: '2rem', fontFamily: 'var(--font-display)' }}>
              {displayPrice(product)}
            </motion.p>
            
            <motion.div variants={staggerFadeUp} className="divider" style={{ marginBottom: '2rem' }} />
            
            <motion.p variants={staggerFadeUp} style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '3rem' }}>
              {product.desc || 'A meticulously crafted piece reflecting the Moirai dedication to structure, identity, and elegance.'}
            </motion.p>

            {/* Accordions */}
            <motion.div variants={staggerFadeUp} style={{ marginBottom: '3rem' }}>
              {product.sizeGuide && <AccordionItem title="Size Guide" content={product.sizeGuide} />}
              {product.fabricDetails && <AccordionItem title="Fabric Details & Care" content={product.fabricDetails} />}
              {product.deliveryInfo && <AccordionItem title="Delivery Info" content={product.deliveryInfo} />}
            </motion.div>

            <motion.div variants={staggerFadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {/* Add to Bag CTA */}
              <motion.button
                onClick={handleAddToBag}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '1.2rem',
                  fontSize: '0.9rem',
                  letterSpacing: '0.15em',
                  minHeight: '52px',
                  background: added ? 'var(--accent)' : 'var(--obsidian)',
                  borderColor: added ? 'var(--accent)' : 'var(--obsidian)',
                  transition: 'background 0.3s, border-color 0.3s',
                  gap: '0.5rem',
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={added ? 'added' : 'add'}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    {added ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                        Added to Bag
                      </>
                    ) : (
                      'Add to Atelier Bag'
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              {/* WhatsApp bespoke CTA */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ textAlign: 'center', width: '100%', padding: '1rem', fontSize: '0.85rem', letterSpacing: '0.15em', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                Request Bespoke Customisation
              </motion.a>

              <p style={{ textAlign: 'center', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em', marginTop: '0.25rem' }}>
                Orders finalized via WhatsApp consultation with our atelier.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* You May Also Like */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <section style={{ marginTop: '8rem', paddingTop: '4rem', borderTop: '1px solid var(--border)' }}>
            <p className="section-label">Complete the Look</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--text)', marginBottom: '3rem' }}>You May Also Like</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '2rem' }}>
               {product.relatedProducts.map((rel: any, i) => (
                 <Link key={i} href={`/product/${rel.slug?.current || rel.slug}`} style={{ display: 'block' }}>
                   <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.3 }} style={{ aspectRatio: '3/4', position: 'relative', background: 'var(--bg)', marginBottom: '1rem', border: '1px solid var(--border)', overflow: 'hidden' }}>
                     {(() => {
                        const imgRaw = rel.imageUrl || rel.image
                        const imageSrc = imgRaw ? (typeof imgRaw === 'string' ? imgRaw : urlFor(imgRaw).width(800).quality(80).url()) : undefined
                        return imageSrc ? (
                          <Image src={imageSrc} alt={rel.name || rel.title || 'Related Product'} fill style={{ objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: '2rem', opacity: 0.1 }}>✦</span></div>
                        )
                     })()}
                   </motion.div>
                   <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--text)' }}>{rel.name || rel.title}</h3>
                   <p style={{ fontSize: '12px', color: 'var(--accent)', marginTop: '0.25rem' }}>{displayPrice(rel)}</p>
                 </Link>
               ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {viewedItems && viewedItems.length > 1 && (
           <section style={{ marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid var(--border)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--muted)', marginBottom: '2rem' }}>Recently Viewed</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
               {viewedItems.filter(v => v.id !== product.id).slice(0, 4).map((rel: any, i) => (
                 <Link key={i} href={`/product/${rel.slug?.current || rel.slug}`} style={{ display: 'block' }}>
                   <motion.div whileHover={{ opacity: 1 }} style={{ aspectRatio: '3/4', position: 'relative', background: 'var(--bg)', marginBottom: '0.75rem', border: '1px solid var(--border)', opacity: 0.8, transition: 'opacity 0.3s' }}>
                     {(() => {
                        const imgRaw = rel.image
                        const imageSrc = imgRaw ? (typeof imgRaw === 'string' ? imgRaw : urlFor(imgRaw).width(800).quality(80).url()) : undefined
                        return imageSrc ? (
                          <Image src={imageSrc} alt={rel.name || 'Viewed Product'} fill style={{ objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.05)' }} />
                        )
                     })()}
                   </motion.div>
                   <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--muted)' }}>{rel.name}</h3>
                 </Link>
               ))}
            </div>
          </section>
        )}
      </div>

      <style>{`
        .product-detail-layout {
           max-width: 1100px;
           margin: 0 auto;
           display: grid;
           grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
           gap: 4rem;
           align-items: flex-start;
        }
        @media (max-width: 768px) {
           .product-detail-layout {
             display: flex;
             flex-direction: column;
             gap: 2rem;
           }
           .desktop-arrows {
             display: none !important;
           }
        }
      `}</style>
    </div>
  )
}
