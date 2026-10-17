import type { Metadata } from 'next'
import { Suspense } from 'react'
import { fetchOr, allProductsQuery, urlFor, mediaUrl } from '@/lib/sanity'
import { CATEGORIES, categoryFor } from '@/content/brand'
import ShopClient, { type ShopProduct, type ShopCategory } from '@/components/ShopClient'
import MoProductCard from '@/components/MoProductCard'
import { MO_PRODUCTS } from '@/content/mo'
import Link from 'next/link'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Shop — Moirai',
  description: 'Shop Moirai couture, corsets, cocktail dresses and Cameroonian traditional fashion. Order and request quotes on WhatsApp.',
  alternates: { canonical: '/shop' },
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function ShopPage() {
  const raw = await fetchOr<any[]>('shop products', allProductsQuery, [])

  const products: ShopProduct[] = raw.map(p => ({
    id: p._id,
    name: p.title || 'Moirai piece',
    slug: p.slug?.current || p.slug || null,
    description: typeof p.description === 'string' ? p.description : '',
    price: typeof p.price === 'number' ? p.price : null,
    priceType: p.priceType,
    available: p.available !== false,
    categorySlug: categoryFor(p.category)?.slug ?? null,
    categoryLabel: categoryFor(p.category)?.title ?? p.category ?? null,
    image: p.image ? urlFor(p.image).width(900).quality(82).url() : null,
  }))

  const categories: ShopCategory[] = CATEGORIES.map(c => ({
    slug: c.slug,
    title: c.title,
    short: c.short,
    description: c.description,
    enquiry: c.enquiry,
    image: mediaUrl(c.image, 900),
    imageAlt: c.imageAlt,
  }))

  return (
    <Suspense>
      <ShopClient
        products={products}
        categories={categories}
        featured={
          <section aria-labelledby="shop-mo-title" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem 1.5rem', marginBottom: '1.25rem' }}>
              <h2 id="shop-mo-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--fs-h3)', color: 'var(--fg)' }}>MO by Moirai — available now</h2>
              <Link href="/mo" style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg)' }}>Enter MO →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 760px), 1fr))', gap: '1rem' }}>
              {MO_PRODUCTS.map(p => <MoProductCard key={p.payUrl} product={p} compact />)}
            </div>
          </section>
        }
      />
    </Suspense>
  )
}
