'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { useCurrency } from './Providers'

// ── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string
  name: string
  price: number
  image?: string | null
  slug?: string
  qty: number
  category?: string
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addItem: (item: Omit<CartItem, 'qty'>) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

// ── Context ───────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

// ── Provider ──────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('moirai_cart')
      if (saved) setItems(JSON.parse(saved))
    } catch {/* ignore */}
  }, [])

  // Persist on change
  useEffect(() => {
    localStorage.setItem('moirai_cart', JSON.stringify(items))
  }, [items])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const openCart   = () => setIsOpen(true)
  const closeCart  = () => setIsOpen(false)
  const toggleCart = () => setIsOpen(v => !v)

  const addItem = (item: Omit<CartItem, 'qty'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...item, qty: 1 }]
    })
    setIsOpen(true)
  }

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id))

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) { removeItem(id); return }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((s, i) => s + i.qty, 0)
  const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, isOpen, openCart, closeCart, toggleCart, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  )
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const MinusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)
const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
  </svg>
)
const BagLargeIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
)

// ── Drawer ────────────────────────────────────────────────────────────────────

function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, clearCart, totalItems, totalPrice } = useCart()
  const { formatPrice } = useCurrency()

  const WA = '237682710405'
  const buildWhatsAppMessage = () => {
    if (items.length === 0) return ''
    const lines = items.map(i => `• ${i.name} × ${i.qty} — ${formatPrice(i.price * i.qty)}`)
    return `Hi! I'd like to order the following from Moirai:\n\n${lines.join('\n')}\n\nTotal: ${formatPrice(totalPrice)}`
  }
  const waUrl = `https://wa.me/${WA}?text=${encodeURIComponent(buildWhatsAppMessage())}`

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeCart}
            style={{
              position: 'fixed', inset: 0, zIndex: 4000,
              background: 'rgba(8, 7, 6, 0.6)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          />

          {/* Drawer panel */}
          <motion.aside
            key="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: 0, right: 0, bottom: 0,
              width: 'min(440px, 95vw)',
              zIndex: 4001,
              background: 'var(--canvas)',
              borderLeft: '1px solid var(--hairline)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* ── Header ── */}
            <div style={{
              padding: '2rem 2rem 1.5rem',
              borderBottom: '1px solid var(--hairline)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              background: 'var(--surface)',
            }}>
              <div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '9px',
                  letterSpacing: '0.45em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '0.35rem',
                }}>
                  Atelier Bag
                </p>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 300,
                  color: 'var(--obsidian)',
                  lineHeight: 1,
                  letterSpacing: '0.04em',
                }}>
                  Your Selection
                </h2>
                {totalItems > 0 && (
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    color: 'var(--umber)',
                    letterSpacing: '0.15em',
                    marginTop: '0.4rem',
                  }}>
                    {totalItems} {totalItems === 1 ? 'PIECE' : 'PIECES'}
                  </p>
                )}
              </div>

              {/* Gold Greek key ornament */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '9px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--umber)',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={closeCart}
                  aria-label="Close cart"
                  style={{
                    color: 'var(--umber)',
                    transition: 'color 0.2s',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px', height: '32px',
                    border: '1px solid var(--hairline)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--obsidian)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--umber)')}
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            {/* Gold hairline meander divider */}
            <div style={{
              height: '3px',
              background: 'linear-gradient(90deg, transparent, var(--gold) 30%, var(--bronze) 70%, transparent)',
            }} />

            {/* ── Items ── */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }}>
              {items.length === 0 ? (
                /* Empty state */
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    textAlign: 'center',
                    padding: '3rem 2rem',
                    gap: '1.25rem',
                  }}
                >
                  <div style={{ color: 'var(--hairline)', opacity: 0.6 }}>
                    <BagLargeIcon />
                  </div>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.75rem',
                      fontWeight: 300,
                      fontStyle: 'italic',
                      color: 'var(--obsidian)',
                      marginBottom: '0.5rem',
                    }}>
                      Your atelier bag awaits
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      color: 'var(--umber)',
                      lineHeight: 1.75,
                      maxWidth: '260px',
                      margin: '0 auto',
                    }}>
                      Discover our curated collections and add a piece to your selection.
                    </p>
                  </div>
                  {/* Greek key divider */}
                  <svg width="80" height="8" viewBox="0 0 80 8" style={{ opacity: 0.35 }}>
                    <path d="M0 1h24v6h-8V4h4v1h2V3H4v2h6v2H0V1zm30 0h20v6H34V4h12V3H32v2h6v2H30V1zm26 0h24v6h-8V3H38v2h6v2H26V1z" fill="#C2A26F" fillRule="evenodd"/>
                  </svg>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="btn-primary"
                    style={{ fontSize: '9.5px', letterSpacing: '0.22em', padding: '0.9rem 2rem' }}
                  >
                    Explore the Collection
                  </Link>
                </motion.div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: idx * 0.05 }}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '80px 1fr',
                        gap: '1.25rem',
                        paddingBottom: '1.5rem',
                        marginBottom: '1.5rem',
                        borderBottom: '1px solid var(--hairline)',
                      }}
                    >
                      {/* Item image */}
                      <Link
                        href={`/product/${item.slug || item.id}`}
                        onClick={closeCart}
                        style={{ display: 'block', aspectRatio: '3/4', position: 'relative', background: 'var(--surface)', overflow: 'hidden', flexShrink: 0 }}
                      >
                        {item.image ? (
                          <Image
                            src={typeof item.image === 'string' ? item.image : urlFor(item.image).width(200).quality(80).url()}
                            alt={item.name}
                            fill
                            sizes="80px"
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--hairline)' }}>
                            <span style={{ fontSize: '1.5rem', opacity: 0.3 }}>✦</span>
                          </div>
                        )}
                      </Link>

                      {/* Item details */}
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
                        <div>
                          {item.category && (
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.3rem' }}>
                              {item.category}
                            </p>
                          )}
                          <Link
                            href={`/product/${item.slug || item.id}`}
                            onClick={closeCart}
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '1.05rem',
                              fontWeight: 400,
                              color: 'var(--obsidian)',
                              display: 'block',
                              lineHeight: 1.25,
                              marginBottom: '0.35rem',
                              transition: 'color 0.2s',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--obsidian)')}
                          >
                            {item.name}
                          </Link>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--umber)', fontWeight: 500 }}>
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                          {/* Qty stepper */}
                          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--hairline)' }}>
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--umber)', transition: 'background 0.15s', cursor: 'pointer' }}
                              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
                              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                              aria-label="Decrease quantity"
                            >
                              <MinusIcon />
                            </button>
                            <span style={{ width: '28px', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--obsidian)', fontWeight: 500 }}>
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--umber)', transition: 'background 0.15s', cursor: 'pointer' }}
                              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
                              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                              aria-label="Increase quantity"
                            >
                              <PlusIcon />
                            </button>
                          </div>

                          {/* Subtotal + remove */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--obsidian)', fontWeight: 600 }}>
                              {formatPrice(item.price * item.qty)}
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              style={{ color: 'var(--umber)', display: 'flex', alignItems: 'center', transition: 'color 0.2s', cursor: 'pointer' }}
                              onMouseEnter={e => (e.currentTarget.style.color = 'var(--obsidian)')}
                              onMouseLeave={e => (e.currentTarget.style.color = 'var(--umber)')}
                              aria-label={`Remove ${item.name}`}
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* ── Footer / Checkout ── */}
            {items.length > 0 && (
              <div style={{
                borderTop: '1px solid var(--hairline)',
                padding: '1.75rem 2rem 2rem',
                background: 'var(--surface)',
              }}>
                {/* Gold accent line */}
                <div style={{ height: '2px', background: 'linear-gradient(90deg, var(--gold), var(--bronze))', marginBottom: '1.5rem' }} />

                {/* Totals */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--umber)' }}>
                    Subtotal
                  </p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--obsidian)', letterSpacing: '0.03em' }}>
                    {formatPrice(totalPrice)}
                  </p>
                </div>

                <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--umber)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                  All orders are confirmed and finalized via WhatsApp consultation with our atelier.
                </p>

                {/* WhatsApp Checkout */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    background: '#1F7A4D',
                    borderColor: '#1F7A4D',
                    marginBottom: '0.75rem',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Order via WhatsApp
                </a>

                {/* Continue shopping */}
                <button
                  onClick={closeCart}
                  style={{
                    width: '100%',
                    fontFamily: 'var(--font-body)',
                    fontSize: '9.5px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--umber)',
                    padding: '0.6rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--obsidian)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--umber)')}
                >
                  ← Continue browsing
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
