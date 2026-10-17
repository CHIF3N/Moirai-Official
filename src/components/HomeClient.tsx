'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCurrency, useSiteConfig } from './Providers'
import { waLink, CONSULTATION_HREF } from '@/lib/site'
import Logo from './Logo'
import SocialSection from './SocialSection'
import HeroSlides, { type HeroSlide } from './HeroSlides'
import styles from './home.module.css'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface HomeClientProps {
  products: any[]
  posts: any[]
  collections: any[]
  heroImageUrl?: string
  heroText?: string
  heroSlides?: any[]
  lookbook?: any[]
  bespokeHeroImage?: string
  schoolImage?: string
  closingImage?: string
  editorialItems?: any[]
  leadHeroImageUrl?: string
  slides?: HeroSlide[]
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

// The three Fates, mapped onto the bespoke process the atelier already runs
const FATES = [
  { num: 'I', name: 'Clotho', verb: 'spins the thread', step: 'Consultation', desc: 'We begin with a conversation — your occasion, your story, your measurements.' },
  { num: 'II', name: 'Lachesis', verb: 'measures destiny', step: 'Silhouette & fitting', desc: 'Your piece is drafted, cut and fitted to your body. No standard sizing.' },
  { num: 'III', name: 'Atropos', verb: 'cuts the silhouette', step: 'Delivery', desc: 'The finished garment, ready for the moment it was made for.' },
]

const VALUES = [
  { title: 'Customer Experience', desc: 'Every interaction is personal. You are not a transaction.' },
  { title: 'Craftsmanship', desc: 'We obsess over details that others overlook.' },
  { title: 'Empowerment Through Style', desc: 'Fashion is the language of confidence.' },
  { title: 'Sustainability', desc: 'Intentional creation. Pieces made to last.' },
]

const SCHOOL_MODULES = ['Design foundations', 'Pattern making & cutting', 'Sewing & couture technique', 'Fabrics & materials', 'Styling', 'Business of fashion']

function Reveal({ children, delay = 0, className, as = 'div' }: { children: React.ReactNode; delay?: number; className?: string; as?: 'div' | 'li' }) {
  const Comp = as === 'li' ? motion.li : motion.div
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Comp>
  )
}

export default function HomeClient({
  products,
  posts,
  collections,
  heroImageUrl,
  heroSlides,
  bespokeHeroImage,
  schoolImage,
  closingImage,
  editorialItems = [],
  leadHeroImageUrl,
  slides = [],
}: HomeClientProps) {
  const { displayPrice } = useCurrency()
  const site = useSiteConfig()

  const heroImg = leadHeroImageUrl || heroSlides?.[0]?.image || heroImageUrl
  const pieces = (editorialItems.length > 0 ? editorialItems : products).slice(0, 4)
  const tiles = collections.filter((c: any) => c.image).slice(0, 4)
  const journal = posts.slice(0, 3)

  // Same markup for every visitor; MotionConfig (Providers) tones animation down for reduced motion
  const heroIn = (delay: number) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease: EASE } })

  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="hero-title">
        {slides.length > 0
          ? <HeroSlides slides={slides} />
          : heroImg && (
            <div className={styles.heroMedia}>
              <Image src={heroImg} alt="Moirai couture — editorial portrait" fill priority sizes="(max-width: 900px) 100vw, 58vw" className={styles.heroImg} />
            </div>
          )}
        <div className={styles.heroShade} aria-hidden="true" />
        <span className={styles.heroMark} aria-hidden="true"><Logo title="" /></span>

        <div className={styles.heroContent}>
          <motion.p className={styles.eyebrow} {...heroIn(0.15)}>African haute couture · Buea, Cameroon</motion.p>
          <motion.h1 id="hero-title" className={styles.heroTitle} {...heroIn(0.25)}>
            Destiny,<br /><em>Tailored.</em>
          </motion.h1>
          <motion.p className={styles.heroLead} {...heroIn(0.4)}>
            Bespoke gowns, sculpted corsetry and bridal silhouettes — handcrafted for who you are becoming. <span className={styles.heroNot}>Not a trend.</span>
          </motion.p>
          <motion.div className={styles.heroActions} {...heroIn(0.52)}>
            <Link href={CONSULTATION_HREF} className="btn-primary">Book a consultation</Link>
            <Link href="/collections" className="btn-ghost">Explore the collections</Link>
          </motion.div>
        </div>

        <div className={styles.heroScroll} aria-hidden="true"><span /></div>
      </section>

      {/* ── 2. THE THREE FATES ──────────────────────────────────── */}
      <section className={styles.fates} aria-labelledby="fates-title">
        <div className={styles.wrap}>
          <Reveal className={styles.fatesHead}>
            <p className="section-label">The house of Moirai</p>
            <h2 id="fates-title" className={styles.h2}>
              Named for the three Fates, who <em>spun, measured and cut</em> the thread of every life.
            </h2>
            <p className={styles.body}>
              Every silhouette tells a story; every stitch carries intention. From our atelier in Cameroon we craft bespoke gowns, corsets and bridal pieces for those who refuse to be ordinary.
            </p>
          </Reveal>

          <ol className={styles.fatesList}>
            {FATES.map((f, i) => (
              <Reveal as="li" key={f.name} delay={i * 0.12} className={styles.fate}>
                <span className={styles.fateNum}>{f.num}</span>
                <p className={styles.fateName}>{f.name} <em>{f.verb}</em></p>
                <p className={styles.fateStep}>{f.step}</p>
                <p className={styles.fateDesc}>{f.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 3. COLLECTIONS ──────────────────────────────────────── */}
      {tiles.length > 0 && (
        <section className={styles.section} aria-labelledby="collections-title">
          <div className={styles.wrap}>
            <Reveal className={styles.sectionHead}>
              <div>
                <p className="section-label">Collections</p>
                <h2 id="collections-title" className={styles.h2}>What we make</h2>
              </div>
              <Link href="/collections" className={styles.textLink}>All collections <span aria-hidden="true">→</span></Link>
            </Reveal>

            <div className={styles.tiles} data-count={tiles.length}>
              {tiles.map((c: any, i: number) => (
                <Reveal key={c.title} delay={i * 0.1}>
                  <Link href={`/collections#${c.slug}`} className={styles.tile}>
                    <Image src={c.image} alt={c.alt || `${c.title} collection`} fill sizes="(max-width: 900px) 100vw, 25vw" className={styles.tileImg} />
                    <span className={styles.tileShade} aria-hidden="true" />
                    <span className={styles.tileLabel}>
                      <span className={styles.tileIndex}>{String(i + 1).padStart(2, '0')}</span>
                      <span className={styles.tileTitle}>{c.title}</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. SELECTED PIECES ──────────────────────────────────── */}
      {pieces.length > 0 && (
        <section className={`${styles.section} ${styles.sectionRaised}`} aria-labelledby="pieces-title">
          <div className={styles.wrap}>
            <Reveal className={styles.sectionHead}>
              <div>
                <p className="section-label">From the atelier</p>
                <h2 id="pieces-title" className={styles.h2}>Selected pieces</h2>
              </div>
              <Link href="/shop" className={styles.textLink}>Shop all <span aria-hidden="true">→</span></Link>
            </Reveal>

            <div className={styles.pieces}>
              {pieces.map((item: any, i: number) => {
                const title = item.title || item.name || 'Atelier piece'
                const slug = item.slug?.current || item.slug
                const href = slug ? `/product/${slug}` : '/shop'
                return (
                  <Reveal key={item._id} delay={i * 0.08}>
                    <article className={styles.piece}>
                      <Link href={href} className={styles.pieceMedia}>
                        {item.imageUrl
                          ? <Image src={item.imageUrl} alt={title} fill sizes="(max-width: 640px) 80vw, (max-width: 1100px) 45vw, 25vw" className={styles.pieceImg} />
                          : <span className={styles.piecePlaceholder} aria-hidden="true">✦</span>}
                      </Link>
                      <div className={styles.pieceBody}>
                        {item.category && <p className={styles.pieceCat}>{item.category}</p>}
                        <h3 className={styles.pieceTitle}><Link href={href}>{title}</Link></h3>
                        <div className={styles.pieceFoot}>
                          <span className={styles.piecePrice}>{displayPrice(item)}</span>
                          <a href={waLink(site.whatsappNumber, `Hi, I'd like to enquire about: ${title}`)} target="_blank" rel="noopener noreferrer" className={styles.pieceEnquire}>
                            Enquire<span className="sr-only"> about {title} on WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. BESPOKE ──────────────────────────────────────────── */}
      <section className={styles.split} aria-labelledby="bespoke-title">
        <div className={styles.splitMedia}>
          {bespokeHeroImage && <Image src={bespokeHeroImage} alt="Red sculpted Moirai gown with voluminous sleeves" fill sizes="(max-width: 900px) 100vw, 50vw" className={styles.splitImg} />}
        </div>
        <Reveal className={styles.splitBody}>
          <p className="section-label">Bespoke atelier</p>
          <h2 id="bespoke-title" className={styles.h2}>Made for one body. <em>Yours.</em></h2>
          <p className={styles.body}>
            Custom pieces crafted to reflect your identity. Every measurement, every fabric choice, every stitch is a conversation between your vision and our craft.
          </p>
          <ol className={styles.steps}>
            {['Consultation', 'Measurements', 'Draping', 'Fitting', 'Delivery'].map((s, i) => (
              <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>
            ))}
          </ol>
          <div className={styles.actions}>
            <Link href={CONSULTATION_HREF} className="btn-primary">Start your commission</Link>
            <a href={waLink(site.whatsappNumber, 'Hi! I am interested in a bespoke piece from Moirai.')} target="_blank" rel="noopener noreferrer" className={styles.textLink}>
              Or message us on WhatsApp <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── 6. FASHION SCHOOL ───────────────────────────────────── */}
      <section className={`${styles.split} ${styles.splitReverse}`} aria-labelledby="school-title">
        <div className={styles.splitMedia}>
          {schoolImage && <Image src={schoolImage} alt="Moirai Fashion School" fill sizes="(max-width: 900px) 100vw, 50vw" className={styles.splitImg} />}
        </div>
        <Reveal className={styles.splitBody}>
          <p className="section-label">Moirai Fashion School</p>
          <h2 id="school-title" className={styles.h2}>Learn the craft <em>behind the couture.</em></h2>
          <p className={styles.body}>
            From foundational sewing techniques to advanced couture — a program for those who want to create, not just wear, the extraordinary.
          </p>
          <ul className={styles.modules}>
            {SCHOOL_MODULES.map(m => <li key={m}>{m}</li>)}
          </ul>
          <div className={styles.actions}>
            <Link href="/fashion-school" className="btn-ghost">Explore the program</Link>
          </div>
        </Reveal>
      </section>

      {/* ── 6b. FROM INSTAGRAM ──────────────────────────────────── */}
      <SocialSection />

      {/* ── 7. VALUES ───────────────────────────────────────────── */}
      <section className={styles.section} aria-labelledby="values-title">
        <div className={styles.wrap}>
          <Reveal className={styles.sectionHead}>
            <div>
              <p className="section-label">What we stand for</p>
              <h2 id="values-title" className={styles.h2}>Our values</h2>
            </div>
          </Reveal>
          <ul className={styles.values}>
            {VALUES.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.08} className={styles.value}>
                <span className={styles.valueNum}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 8. JOURNAL ──────────────────────────────────────────── */}
      {journal.length > 0 && (
        <section className={`${styles.section} ${styles.sectionRaised}`} aria-labelledby="journal-title">
          <div className={styles.wrap}>
            <Reveal className={styles.sectionHead}>
              <div>
                <p className="section-label">The journal</p>
                <h2 id="journal-title" className={styles.h2}>Stories from the atelier</h2>
              </div>
              <Link href="/blog" className={styles.textLink}>Read the journal <span aria-hidden="true">→</span></Link>
            </Reveal>
            <div className={styles.journal}>
              {journal.map((p: any, i: number) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <Link href={`/blog/${p.slug}`} className={styles.post}>
                    <span className={styles.postMedia}>
                      {p.imageUrl && <Image src={p.imageUrl} alt={p.imageAlt || ''} fill sizes="(max-width: 900px) 100vw, 33vw" className={styles.pieceImg} />}
                    </span>
                    {p.publishedAt && (
                      <time className={styles.postDate} dateTime={p.publishedAt}>
                        {new Date(p.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}
                      </time>
                    )}
                    <span className={styles.postTitle}>{p.title}</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 9. CLOSING CTA ──────────────────────────────────────── */}
      <section className={styles.closing} aria-labelledby="closing-title">
        {closingImage && <Image src={closingImage} alt="" fill sizes="100vw" className={styles.closingImg} />}
        <div className={styles.closingShade} aria-hidden="true" />
        <Reveal className={styles.closingBody}>
          <p className="section-label">Ready to begin?</p>
          <h2 id="closing-title" className={styles.closingTitle}>Made for who<br /><em>you are becoming.</em></h2>
          <p className={styles.body}>
            A bespoke creation, a couture evening gown, or your first apprenticeship in our fashion school — your destiny is woven here.
          </p>
          <div className={styles.actions} style={{ justifyContent: 'center' }}>
            <Link href={CONSULTATION_HREF} className="btn-primary">Book a consultation</Link>
            <a href={waLink(site.whatsappNumber, site.defaultMessage)} target="_blank" rel="noopener noreferrer" className="btn-ghost">Chat on WhatsApp</a>
          </div>
        </Reveal>
      </section>
    </>
  )
}
