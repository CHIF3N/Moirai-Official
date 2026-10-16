import type { Metadata } from 'next'
import { Suspense } from 'react'
import { fetchOr, allProductsQuery, urlFor } from '@/lib/sanity'
import { CATEGORIES, categoryFor } from '@/content/brand'
import ShopClient, { type ShopProduct, type ShopCategory } from '@/components/ShopClient'

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
    image: urlFor(c.image).width(900).quality(82).url(),
    imageAlt: c.imageAlt,
  }))

  return (
    <Suspense>
      <ShopClient products={products} categories={categories} />
    </Suspense>
  )
}
