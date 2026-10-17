'use client'
import { useState } from 'react'
import CollectionDeck from './CollectionDeck'
import { useCart } from './CartDrawer'
import { useSiteConfig } from './Providers'
import { waLink } from '@/lib/site'
import { formatXAF } from '@/lib/price'
import type { MoProduct } from '@/content/mo'
import styles from './moProduct.module.css'

// An MO piece that can be paid online: add it to the bag (paid at /checkout) or buy it now on Fapshi.
export default function MoProductCard({ product, compact = false }: { product: MoProduct; compact?: boolean }) {
  const { addItem } = useCart()
  const site = useSiteConfig()
  const [added, setAdded] = useState(false)
  const id = 'mo-' + product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  const add = () => {
    addItem({ id, name: product.name, price: product.price, priceType: 'fixed', image: product.images[0]?.src, category: 'MO by Moirai', payUrl: product.payUrl })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <article className={`${styles.card}${compact ? ` ${styles.compact}` : ''}`} aria-labelledby={`${id}-name`}>
      <div className={styles.media}>
        <CollectionDeck images={product.images} label={`${product.name} photographs`} />
      </div>
      <div className={styles.body}>
        <p className={styles.kicker}>MO by Moirai</p>
        <h3 id={`${id}-name`} className={styles.name}>{product.name}</h3>
        <p className={styles.price}>{formatXAF(product.price)}</p>
        {!compact && <p className={styles.desc}>{product.description}</p>}
        <div className={styles.actions}>
          <button type="button" className="btn-primary" onClick={add} aria-live="polite">{added ? 'Added to bag ✓' : 'Add to bag'}</button>
          <a href={product.payUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Buy now<span className="sr-only"> — pay with Mobile Money on Fapshi (opens in a new tab)</span>
          </a>
        </div>
        <p className={styles.small}>
          Pay with Mobile Money on Fapshi.{' '}
          <a href={waLink(site.whatsappNumber, `Hi Moirai! I have a question about the ${product.name}.`)} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
        </p>
      </div>
    </article>
  )
}
