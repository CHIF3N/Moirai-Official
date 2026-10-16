'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useSiteConfig } from './Providers'
import { SOCIAL_MEDIA } from '@/content/brand'
import styles from './social.module.css'

// Posts from the brand's own Instagram. The video loads only when it scrolls into view,
// never for reduced-motion or data-saver visitors, and can be paused (WCAG 2.2.2).
export default function SocialSection() {
  const site = useSiteConfig()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [canPlay, setCanPlay] = useState(false)
  const [playing, setPlaying] = useState(false)
  const v = SOCIAL_MEDIA.bridalVideo

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const saveData = (navigator as any).connection?.saveData === true
    if (reduce || saveData) return
    setCanPlay(true)
  }, [])

  useEffect(() => {
    const el = videoRef.current
    if (!canPlay || !el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!el.src) el.src = v.src
        el.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
      } else {
        el.pause(); setPlaying(false)
      }
    }, { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [canPlay, v.src])

  const toggle = () => {
    const el = videoRef.current
    if (!el) return
    if (!el.src) el.src = v.src
    if (el.paused) el.play().then(() => setPlaying(true)).catch(() => {})
    else { el.pause(); setPlaying(false) }
  }

  return (
    <section className={styles.section} aria-labelledby="social-title">
      <div className={styles.wrap}>
        <div className={styles.head}>
          <p className="section-label">In the atelier</p>
          <h2 id="social-title" className={styles.h2}>Moments <em>from our world.</em></h2>
          <p className={styles.lead}>Behind the seams and on the day — straight from our Instagram.</p>
        </div>

        <div className={styles.grid}>
          <figure className={`${styles.card} ${styles.videoCard}`}>
            <video
              ref={videoRef}
              className={styles.video}
              poster={v.poster}
              muted
              loop
              playsInline
              preload="none"
              aria-label={v.alt}
            />
            <button type="button" className={styles.playBtn} onClick={toggle} aria-label={playing ? 'Pause video' : 'Play video'}>
              {playing
                ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" /></svg>}
            </button>
            <figcaption className={styles.caption}>
              <span>“{v.caption}”</span>
              <a href={v.post} target="_blank" rel="noopener noreferrer">View on Instagram</a>
            </figcaption>
          </figure>

          {SOCIAL_MEDIA.images.map((img, i) => (
            <figure key={img.src} className={`${styles.card} ${i === 0 ? styles.square : styles.tall}`}>
              <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(max-width: 900px) 100vw, 30vw" className={styles.img} />
              <figcaption className={styles.caption}>
                <span>{img.caption}</span>
                <a href={img.post} target="_blank" rel="noopener noreferrer">View on Instagram</a>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className={styles.follow}>
          {site.instagramUrl && <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Follow {site.instagramHandle} on Instagram</a>}
          {site.tiktokUrl && <a href={site.tiktokUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">TikTok {site.tiktokHandle}</a>}
        </div>
      </div>
    </section>
  )
}
