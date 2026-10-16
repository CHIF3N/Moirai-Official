'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCurrency, useSiteConfig } from './Providers'
import { useCart } from './CartDrawer'
import { waLink } from '@/lib/site'
import type { PriceType } from '@/lib/price'
import styles from './shop.module.css'

export interface ShopProduct {
  id: string
  name: string
  slug: string | null
  description: string
  price: number | null
  priceType?: PriceType
  available: boolean
  categorySlug: string | null
  categoryLabel: string | null
  image: string | null
}

export interface ShopCategory {
  slug: string
  title: string
  short: string
  description: string
  enquiry: string
  image: string
  imageAlt: string
}

export default function ShopClient({ products, categories }: { products: ShopProduct[]; categories: ShopCategory[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const { displayPrice } = useCurrency()
  const site = useSiteConfig()
  const { addItem } = useCart()
  const [addedId, setAddedId] = useState<string | null>(null)

  const activeSlug = params.get('category')
  const active = categories.find(c => c.slug === activeSlug) ?? null
  const [query, setQuery] = useState(params.get('q') ?? '')

  // Keep the filters in the URL so a filtered view can be shared or linked to
  const updateUrl = (next: { category?: string | null; q?: string }) => {
    const sp = new URLSearchParams(params.toString())
    if (next.category !== undefined) { if (next.category) sp.set('category', next.category); else sp.delete('category') }
    if (next.q !== undefined) { if (next.q.trim()) sp.set('q', next.q.trim()); else sp.delete('q') }
    const qs = sp.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter(p => {
      if (active && p.categorySlug !== active.slug) return false
      if (!q) return true
      return [p.name, p.description, p.categoryLabel ?? ''].some(t => t.toLowerCase().includes(q))
    })
  }, [products, active, query])

  const add = (p: ShopProduct) => {
    addItem({ id: p.id, name: p.name, price: p.price, priceType: p.priceType, image: p.image, slug: p.slug ?? undefined, category: p.categoryLabel ?? undefined })
    setAddedId(p.id)
    window.setTimeout(() => setAddedId(null), 1800)
  }

  const hasFilters = !!active || !!query.trim()
  const quoteCategories = active ? [active] : categories

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className="section-label">Shop</p>
        <h1 className={styles.title}>{active ? active.title : <>The Moirai <em>shop</em></>}</h1>
        <p className={styles.lead}>
          {active ? active.description : 'Choose a piece, send your selection on WhatsApp, and the atelier will confirm the details with you. Payment is by Mobile Money (MoMo).'}
        </p>
      </header>

      <div className={`${styles.toolbar} glass`} role="search">
        <label htmlFor="shop-search" className="sr-only">Search the shop</label>
        <input
          id="shop-search"
          type="search"
          placeholder="Search pieces"
          value={query}
          onChange={e => { setQuery(e.target.value); updateUrl({ q: e.target.value }) }}
          className={styles.search}
        />
        <div className={styles.chips} role="group" aria-label="Filter by collection">
          <button type="button" className={styles.chip} aria-pressed={!active} onClick={() => updateUrl({ category: null })}>All</button>
          {categories.map(c => (
            <button key={c.slug} type="button" className={styles.chip} aria-pressed={active?.slug === c.slug} onClick={() => updateUrl({ category: c.slug })}>
              {c.short}
            </button>
          ))}
        </div>
      </div>

      <p className={styles.count} role="status" aria-live="polite">
        {products.length === 0 ? '' : `${filtered.length} ${filtered.length === 1 ? 'piece' : 'pieces'}${active ? ` in ${active.title}` : ''}`}
      </p>

      {filtered.length > 0 ? (
        <ul className={styles.grid}>
          {filtered.map(p => {
            const href = p.slug ? `/product/${p.slug}` : null
            return (
              <li key={p.id} className={styles.card}>
                {href
                  ? <Link href={href} className={styles.media}>{p.image ? <Image src={p.image} alt={p.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 25vw" className={styles.img} /> : <span className={styles.placeholder} aria-hidden="true">✦</span>}</Link>
                  : <span className={styles.media}>{p.image && <Image src={p.image} alt={p.name} fill sizes="25vw" className={styles.img} />}</span>}
                {p.categoryLabel && <p className={styles.cat}>{p.categoryLabel}</p>}
                <h2 className={styles.name}>{href ? <Link href={href}>{p.name}</Link> : p.name}</h2>
                <p className={styles.price}>{displayPrice(p)}</p>
                <div className={styles.cardActions}>
                  {p.available
                    ? <button type="button" className={styles.add} onClick={() => add(p)} aria-live="polite">{addedId === p.id ? 'Added ✓' : 'Add to bag'}</button>
                    : <span className={styles.unavailable}>Currently unavailable</span>}
                  <a href={waLink(site.whatsappNumber, `Hi Moirai! I would like to ask about: ${p.name}`)} target="_blank" rel="noopener noreferrer" className={styles.ask}>
                    Ask<span className="sr-only"> about {p.name} on WhatsApp</span>
                  </a>
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <section className={styles.empty} aria-labelledby="shop-empty-title">
          <h2 id="shop-empty-title" className={styles.emptyTitle}>
            {products.length === 0 || (active && !query.trim())
              ? 'Our pieces are being photographed.'
              : 'No pieces match your search.'}
          </h2>
          <p className={styles.emptyText}>
            {products.length === 0 || (active && !query.trim())
              ? 'The new collection arrives after our photoshoot. In the meantime, every piece can be requested — tell us what you are looking for and we will reply with options and a quote.'
              : 'Try another word, or clear the filters to see everything.'}
          </p>
          {hasFilters && products.length > 0 && (
            <button type="button" className="btn-ghost" onClick={() => { setQuery(''); updateUrl({ category: null, q: '' }) }}>Clear filters</button>
          )}

          <ul className={styles.quoteGrid}>
            {quoteCategories.map(c => (
              <li key={c.slug} className={styles.quote}>
                <span className={styles.quoteMedia}>
                  <Image src={c.image} alt={c.imageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw" className={styles.img} />
                  <span className={styles.quoteTag}>Editorial image</span>
                </span>
                <h3 className={styles.quoteTitle}>{c.title}</h3>
                <p className={styles.quoteText}>{c.description}</p>
                <a href={waLink(site.whatsappNumber, c.enquiry)} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Request a quote<span className="sr-only"> for {c.title} on WhatsApp</span>
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.small}>Request a quote opens WhatsApp with a message ready to send. Prices are confirmed once your design and specifications are agreed.</p>
        </section>
      )}
    </div>
  )
}
