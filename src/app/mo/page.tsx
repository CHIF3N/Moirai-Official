import Link from 'next/link'
import Image from 'next/image'
import { fetchOr, allProductsQuery, siteSettingsQuery, urlFor } from '@/lib/sanity'
import { getSiteConfig, waLink } from '@/lib/site'
import { hasFixedPrice, formatXAF, PRICE_ON_REQUEST } from '@/lib/price'
import { MO, MO_IMAGES, MO_SANITY_IMAGE, MO_VIDEO_IDS, MO_PRODUCTS, MO_STORE_URL, isMoProduct } from '@/content/mo'
import MoProductCard from '@/components/MoProductCard'

const PRODUCT_SHOT = { src: '/mo/stasis-cropped-1.jpg', alt: 'Velvet Cropped STASIS — burgundy velvet cropped jacket on a hanger' }
import MoMark from '@/components/MoMark'
import TikTokStrip from '@/components/TikTokStrip'
import styles from './mo.module.css'

export const revalidate = 60

const MARQUEE = ['MO by Moirai', 'STASIS', 'Velvet Puff STÁSIS', 'Drop 02 — early access', 'Streetwear']

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function MoPage() {
  const [products, settings] = await Promise.all([
    fetchOr<any[]>('mo products', allProductsQuery, []),
    fetchOr<any>('siteSettings', siteSettingsQuery, null),
  ])
  const site = getSiteConfig(settings)
  const pieces = products.filter(p => isMoProduct(p.category, p.title))

  return (
    <div className={styles.mo}>
      {/* ── Hero ── */}
      <section className={styles.hero} aria-labelledby="mo-title">
        <div className={styles.heroText}>
          <h1 id="mo-title" className={styles.heroMark}>
            <MoMark withByline title="MO by Moirai" />
          </h1>
          <p className={styles.heroLine}>{MO.tagline}</p>
          <p className={styles.heroIntro}>{MO.intro}</p>
          <div className={styles.actions}>
            <a href="#mo-shop" className="btn-primary">Shop the STASIS</a>
            <a href={MO.earlyAccessUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Early access — Drop 02<span className="sr-only"> (opens a form on tally.so)</span>
            </a>
          </div>
        </div>
        <div className={styles.heroCollage}>
          <figure className={`${styles.shot} ${styles.shotA}`}>
            <Image src={MO_IMAGES[0].src} alt={MO_IMAGES[0].alt} fill priority sizes="(max-width: 900px) 80vw, 34vw" className={styles.img} />
          </figure>
          <figure className={`${styles.shot} ${styles.shotB}`}>
            <Image src={PRODUCT_SHOT.src} alt={PRODUCT_SHOT.alt} fill sizes="(max-width: 900px) 55vw, 22vw" className={styles.img} />
          </figure>
          <span className={styles.sticker} aria-hidden="true">Drop<br />02</span>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => <span key={i}>{w}<b>✦</b></span>)}
        </div>
      </div>

      {/* ── Shop MO: pay online with Mobile Money (Fapshi) ── */}
      <section id="mo-shop" className={styles.section} aria-labelledby="mo-pieces-title">
        <div className={styles.wrap}>
          <div className={styles.split}>
            <h2 id="mo-pieces-title" className={styles.h2}>Shop MO</h2>
            <p className={styles.lead}>In stock now. Add to your bag or buy straight away — payment is with Mobile Money on our Fapshi store.</p>
          </div>
          <div className={styles.products}>
            {MO_PRODUCTS.map(p => <MoProductCard key={p.payUrl} product={p} />)}
          </div>
          {pieces.length > 0 && (
            <ul className={styles.pieces}>
              {pieces.map((p: any) => {
                const name = p.title || 'MO piece'
                const slug = p.slug?.current || p.slug
                return (
                  <li key={p._id}>
                    <Link href={slug ? `/product/${slug}` : '/shop'} className={styles.piece}>
                      <span className={styles.pieceMedia}>
                        {p.image && <Image src={urlFor(p.image).width(700).url()} alt={name} fill sizes="(max-width: 640px) 50vw, 25vw" className={styles.img} />}
                      </span>
                      <span className={styles.pieceName}>{name}</span>
                      <span className={styles.piecePrice}>{site.showPrices && hasFixedPrice(p) ? formatXAF(p.price) : PRICE_ON_REQUEST}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
          <p className={styles.storeNote}>Also on our store: <a href={MO_STORE_URL} target="_blank" rel="noopener noreferrer">store.fapshi.com/the-house-moirai</a></p>
        </div>
      </section>

      {/* ── The drop on TikTok ── */}
      <section className={styles.section} aria-labelledby="mo-drop-title">
        <div className={styles.wrap}>
          <div className={styles.split}>
            <h2 id="mo-drop-title" className={styles.h2}>The STASIS drop</h2>
            <blockquote className={styles.quote}>
              “Your new favourite jacket is here.”
              <cite>— MO on TikTok</cite>
            </blockquote>
          </div>
          <TikTokStrip profileUrl={site.tiktokUrl} handle={site.tiktokHandle} ids={MO_VIDEO_IDS} title="Watch the drop" />
        </div>
      </section>

      {/* ── Jacket campaign ── */}
      <section className={`${styles.section} ${styles.panel}`} aria-labelledby="mo-jackets-title">
        <div className={styles.wrap}>
          <h2 id="mo-jackets-title" className={styles.h2}>Jackets, reworked</h2>
          <p className={styles.lead}>Burgundy velvet, geometric quilting and leather — made to move with you from day to night.</p>
          <div className={styles.gallery}>
            {[...MO_IMAGES, { src: urlFor(MO_SANITY_IMAGE.image).width(1000).quality(82).url(), width: 1080, height: 1080, alt: MO_SANITY_IMAGE.alt, caption: 'From the jacket campaign.', post: undefined }].filter(img => img.src !== PRODUCT_SHOT.src).map(img => (
              <figure key={img.src} className={styles.galleryItem}>
                <span className={styles.galleryMedia} style={{ aspectRatio: `${img.width} / ${img.height}` }}>
                  <Image src={img.src} alt={img.alt} fill sizes="(max-width: 900px) 100vw, 40vw" className={styles.img} />
                </span>
                <figcaption>{img.caption}{img.post && <> <a href={img.post} target="_blank" rel="noopener noreferrer">View post</a></>}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>


      {/* ── Early access ── */}
      <section className={styles.cta} aria-labelledby="mo-cta-title">
        <MoMark className={styles.ctaMark} title="" />
        <h2 id="mo-cta-title" className={styles.ctaTitle}>Drop 02 is coming.</h2>
        <p className={styles.ctaText}>Be first in line for MO&apos;s second drop.</p>
        <a href={MO.earlyAccessUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
          Get early access<span className="sr-only"> (opens a form on tally.so)</span>
        </a>
        <p className={styles.small}>Opens the MO early-access form on tally.so.</p>
      </section>
    </div>
  )
}
