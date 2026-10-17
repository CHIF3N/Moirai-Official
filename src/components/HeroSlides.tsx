'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import styles from './home.module.css'

export interface HeroSlide { src: string; alt: string; position: string }

const INTERVAL = 6500

// Crossfading hero photographs. Auto-advances unless the visitor prefers reduced motion,
// and can be paused (WCAG 2.2.2) or jumped with the dots.
export default function HeroSlides({ slides }: { slides: HeroSlide[] }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const auto = !reduce && !paused && slides.length > 1

  useEffect(() => {
    if (!auto) return
    const t = window.setInterval(() => setIndex(i => (i + 1) % slides.length), INTERVAL)
    return () => window.clearInterval(t)
  }, [auto, slides.length])

  if (slides.length === 0) return null

  return (
    <div className={styles.heroMedia} role="region" aria-roledescription="carousel" aria-label="Moirai editorial photographs">
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={`${styles.heroSlide}${i === index ? ` ${styles.isActive}` : ''}`}
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${slides.length}`}
          aria-hidden={i !== index}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            loading={i === 0 ? undefined : 'lazy'}
            sizes="(max-width: 900px) 100vw, 58vw"
            className={styles.heroImg}
            style={{ objectPosition: s.position }}
          />
        </div>
      ))}

      {slides.length > 1 && (
        <div className={styles.heroControls}>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={styles.heroDot}
              aria-label={`Show photograph ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
            />
          ))}
          {/* Always rendered so server and browser markup match; hidden by CSS for reduced motion */}
          {(
            <button type="button" className={styles.heroPause} onClick={() => setPaused(p => !p)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}>
              {paused
                ? <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" /></svg>
                : <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
