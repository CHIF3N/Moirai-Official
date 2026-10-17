'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/components/CartDrawer'
import { useSiteConfig } from '@/components/Providers'
import { waLink } from '@/lib/site'
import { formatXAF, hasFixedPrice } from '@/lib/price'
import styles from './checkout.module.css'

// Checkout sub-page. Items with a Fapshi payment page are paid there with Mobile Money
// (one link per product — Fapshi takes the quantity on its own page). Nothing here claims a
// payment went through: the customer pays on Fapshi, then sends us their order on WhatsApp.
export default function CheckoutPage() {
  const { items, updateQty, removeItem } = useCart()
  const site = useSiteConfig()

  const payable = items.filter(i => i.payUrl && hasFixedPrice(i))
  const quoteOnly = items.filter(i => !(i.payUrl && hasFixedPrice(i)))
  const total = payable.reduce((s, i) => s + (i.price as number) * i.qty, 0)

  const orderMessage = [
    "Hi Moirai! I've paid on Fapshi for:",
    ...payable.map(i => `• ${i.name} × ${i.qty} — ${formatXAF((i.price as number) * i.qty)}`),
    '',
    `Total: ${formatXAF(total)}`,
    '',
    'Please confirm my order and delivery details.',
  ].join('\n')

  const quoteMessage = [
    "Hi Moirai! I'd like a quote for:",
    ...quoteOnly.map(i => `• ${i.name} × ${i.qty}`),
  ].join('\n')

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className="section-label">Checkout</p>
        <h1 className={styles.title}>Your order</h1>
      </header>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <p>Your bag is empty.</p>
          <div className={styles.row}>
            <Link href="/mo" className="btn-primary">Shop MO</Link>
            <Link href="/shop" className="btn-ghost">Browse the shop</Link>
          </div>
        </div>
      ) : (
        <div className={styles.grid}>
          <div>
            {payable.length > 0 && (
              <section aria-labelledby="pay-title" className={styles.block}>
                <h2 id="pay-title" className={styles.h2}>Pay online</h2>
                <ol className={styles.steps}>
                  <li><b>1</b> Press <em>Pay with Mobile Money</em> for each piece — Fapshi opens in a new tab.</li>
                  <li><b>2</b> Set the same quantity on Fapshi and complete the payment there.</li>
                  <li><b>3</b> Come back and send us your order on WhatsApp so we can confirm it and arrange delivery.</li>
                </ol>
                <ul className={styles.items}>
                  {payable.map(i => (
                    <li key={i.id} className={styles.item}>
                      <span className={styles.thumb}>{i.image && <Image src={i.image} alt="" fill sizes="96px" className={styles.img} />}</span>
                      <div className={styles.itemBody}>
                        <p className={styles.name}>{i.name}</p>
                        <p className={styles.meta}>{formatXAF(i.price as number)} each</p>
                        <div className={styles.qty}>
                          <button type="button" onClick={() => updateQty(i.id, i.qty - 1)} aria-label={`Decrease quantity of ${i.name}`}>−</button>
                          <span aria-live="polite">{i.qty}</span>
                          <button type="button" onClick={() => updateQty(i.id, i.qty + 1)} aria-label={`Increase quantity of ${i.name}`}>+</button>
                          <button type="button" className={styles.remove} onClick={() => removeItem(i.id)}>Remove</button>
                        </div>
                      </div>
                      <div className={styles.payCol}>
                        <p className={styles.line}>{formatXAF((i.price as number) * i.qty)}</p>
                        <a href={i.payUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                          Pay with Mobile Money<span className="sr-only"> for {i.name} on Fapshi (opens in a new tab)</span>
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {quoteOnly.length > 0 && (
              <section aria-labelledby="quote-title" className={styles.block}>
                <h2 id="quote-title" className={styles.h2}>Priced on request</h2>
                <p className={styles.text}>These pieces are quoted by the atelier. Send them on WhatsApp and we will reply with a price.</p>
                <ul className={styles.simple}>
                  {quoteOnly.map(i => <li key={i.id}>{i.name} × {i.qty}</li>)}
                </ul>
                <a href={waLink(site.whatsappNumber, quoteMessage)} target="_blank" rel="noopener noreferrer" className="btn-ghost">Ask for a quote on WhatsApp</a>
              </section>
            )}
          </div>

          {payable.length > 0 && (
            <aside className={`${styles.summary} glass`} aria-labelledby="summary-title">
              <h2 id="summary-title" className={styles.h3}>Summary</h2>
              <dl className={styles.totals}>
                {payable.map(i => (
                  <div key={i.id}><dt>{i.name} × {i.qty}</dt><dd>{formatXAF((i.price as number) * i.qty)}</dd></div>
                ))}
                <div className={styles.totalRow}><dt>Total to pay online</dt><dd>{formatXAF(total)}</dd></div>
              </dl>
              <p className={styles.note}>Payment is completed securely on Fapshi with Mobile Money. We never see or store your payment details.</p>
              <a href={waLink(site.whatsappNumber, orderMessage)} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ width: '100%' }}>
                I&apos;ve paid — send my order on WhatsApp
              </a>
              <p className={styles.note}>Delivery is arranged with you after we confirm your order.</p>
            </aside>
          )}
        </div>
      )}
    </div>
  )
}
