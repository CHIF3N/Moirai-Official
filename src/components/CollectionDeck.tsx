'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, type PanInfo, type Variants } from 'framer-motion'
import styles from './deck.module.css'

export interface DeckImage { src: string; alt: string; position?: string }

// A stack of photo cards: swipe or drag the top card away to see the next one.
// Arrow buttons and the keyboard arrows do the same; the cards behind fan out slightly.
// The top card flies off in the swipe direction (custom = 1 for next, -1 for previous)
const CARD_VARIANTS: Variants = {
  enter: { opacity: 0, scale: 0.94, y: 18 },
  center: { opacity: 1, scale: 1, y: 0, x: 0, rotate: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: (d: 1 | -1) => ({ x: d * -420, rotate: d * -14, opacity: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } }),
}

export default function CollectionDeck({ images, label }: { images: DeckImage[]; label: string }) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState<1 | -1>(1)
  const n = images.length

  const go = (d: 1 | -1) => { setDir(d); setIndex(i => (i + d + n) % n) }

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 500
    if (!swipe) return
    go(info.offset.x < 0 ? 1 : -1)
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
  }

  // Top card plus up to two behind it
  const stack = [0, 1, 2].slice(0, Math.min(3, n)).map(k => (index + k) % n)

  return (
    <div className={styles.deck} role="region" aria-roledescription="carousel" aria-label={label} tabIndex={0} onKeyDown={onKey}>
      <div className={styles.stage}>
        {stack.slice(1).reverse().map((imgIndex, k) => {
          const depth = stack.length - 1 - k // 2 = furthest back
          return (
            <div key={`back-${imgIndex}`} className={styles.card} data-depth={depth} aria-hidden="true">
              <Image src={images[imgIndex].src} alt="" fill sizes="(max-width: 900px) 80vw, 34vw" className={styles.img} style={{ objectPosition: images[imgIndex].position || '50% 25%' }} />
            </div>
          )
        })}

        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={index}
            className={`${styles.card} ${styles.top}`}
            custom={dir}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.9}
            onDragEnd={onDragEnd}
            variants={CARD_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            whileDrag={{ cursor: 'grabbing' }}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${n}`}
          >
            <Image src={images[index].src} alt={images[index].alt} fill sizes="(max-width: 900px) 80vw, 34vw" className={styles.img} style={{ objectPosition: images[index].position || '50% 25%' }} draggable={false} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.controls}>
        <button type="button" className={styles.arrow} onClick={() => go(-1)} aria-label="Previous photograph">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <span className={styles.count} aria-live="polite">{index + 1} / {n}</span>
        <button type="button" className={styles.arrow} onClick={() => go(1)} aria-label="Next photograph">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
      <p className={styles.hint} aria-hidden="true">Swipe the card</p>
    </div>
  )
}
