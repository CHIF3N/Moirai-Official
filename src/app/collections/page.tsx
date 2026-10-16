import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { fetchOr, allProductsQuery, siteSettingsQuery, urlFor } from '@/lib/sanity'
import { getSiteConfig, waLink } from '@/lib/site'
import { CATEGORIES, categoryFor } from '@/content/brand'
import { hasFixedPrice, formatXAF, PRICE_ON_REQUEST } from '@/lib/price'
import styles from './collections.module.css'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Collections — Moirai',
  description: 'Bespoke and custom couture, corsets, cocktail dresses and Cameroonian traditional fashion by Moirai.',
  alternates: { canonical: '/collections' },
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function CollectionsPage() {
  const [products, settings] = await Promise.all([
    fetchOr<any[]>('collections products', allProductsQuery, []),
    fetchOr<any>('siteSettings', siteSettingsQuery, null),
  ])
  const site = getSiteConfig(settings)

  const byCategory = new Map<string, any[]>()
  for (const p of products) {
    const cat = categoryFor(p.category)
    if (!cat) continue
    byCategory.set(cat.slug, [...(byCategory.get(cat.slug) || []), p])
  }

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className="section-label">Collections</p>
        <h1 className={styles.title}>Four ways <em>to be made.</em></h1>
        <nav aria-label="Collections" className={styles.index}>
          {CATEGORIES.map((c, i) => (
            <a key={c.slug} href={`#${c.slug}`} className={styles.indexLink}>
              <span>{String(i + 1).padStart(2, '0')}</span>{c.title}
            </a>
          ))}
        </nav>
      </header>

      {CATEGORIES.map((c, i) => {
        const items = byCategory.get(c.slug) || []
        return (
          <section key={c.slug} id={c.slug} className={`${styles.chapter} ${styles[`v${i % 4}`]}`} aria-labelledby={`${c.slug}-title`}>
            <div className={styles.media}>
              <Image src={urlFor(c.image).width(1400).quality(85).url()} alt={c.imageAlt} fill sizes="(max-width: 900px) 100vw, 60vw" className={styles.img} />
            </div>
            <div className={styles.body}>
              <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
              <h2 id={`${c.slug}-title`} className={styles.h2}>{c.title}</h2>
              <p className={styles.desc}>{c.description}</p>

              {items.length > 0 ? (
                <ul className={styles.products}>
                  {items.slice(0, 4).map((p: any) => {
                    const name = p.title || 'Moirai piece'
                    const price = site.showPrices && hasFixedPrice(p) ? formatXAF(p.price) : PRICE_ON_REQUEST
                    return (
                      <li key={p._id}>
                        <Link href={`/product/${p.slug?.current || p.slug}`} className={styles.product}>
                          <span className={styles.productMedia}>
                            {p.image && <Image src={urlFor(p.image).width(500).url()} alt={name} fill sizes="200px" className={styles.img} />}
                          </span>
                          <span className={styles.productName}>{name}</span>
                          <span className={styles.productPrice}>{price}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p className={styles.note}>Pieces from this collection are being photographed. Ask us what is available now, or start a bespoke commission.</p>
              )}

              <div className={styles.actions}>
                <a href={waLink(site.whatsappNumber, c.enquiry)} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Request a quote<span className="sr-only"> for {c.title} on WhatsApp</span>
                </a>
                <Link href={`/shop?category=${c.slug}`} className={styles.textLink}>View in the shop <span aria-hidden="true">→</span></Link>
              </div>
              <p className={styles.small}>Request a quote opens WhatsApp with a message ready to send.</p>
            </div>
          </section>
        )
      })}
    </div>
  )
}
