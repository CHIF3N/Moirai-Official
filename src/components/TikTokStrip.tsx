'use client'
import { useState } from 'react'
import Image from 'next/image'
import { TIKTOK_VIDEOS } from '@/content/brand'
import styles from './social.module.css'

// Cover cards that swap to TikTok's official embed player only when tapped,
// so no TikTok scripts or tracking load until a visitor chooses to watch.
export default function TikTokStrip({ profileUrl, handle }: { profileUrl: string | null; handle: string | null }) {
  const [playing, setPlaying] = useState<string | null>(null)

  return (
    <div className={styles.tiktok}>
      <div className={styles.tiktokHead}>
        <h3 className={styles.tiktokTitle}>On TikTok</h3>
        {profileUrl && <a href={profileUrl} target="_blank" rel="noopener noreferrer" className={styles.tiktokLink}>{handle} <span aria-hidden="true">→</span></a>}
      </div>
      <ul className={styles.tiktokRow}>
        {TIKTOK_VIDEOS.map(v => (
          <li key={v.id} className={styles.tiktokCard}>
            {playing === v.id ? (
              <iframe
                className={styles.tiktokPlayer}
                src={`https://www.tiktok.com/player/v1/${v.id}?autoplay=1&music_info=1&description=1&rel=0`}
                title={`${v.title} — Moirai on TikTok`}
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button type="button" className={`${styles.tiktokCover}${'logoCover' in v && v.logoCover ? ` ${styles.logoCover}` : ''}`} onClick={() => setPlaying(v.id)} aria-label={`Play “${v.title}” from TikTok`}>
                <Image src={v.cover} alt="" fill sizes="(max-width: 640px) 70vw, 240px" className={styles.img} />
                <span className={styles.tiktokPlay} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" /></svg>
                </span>
              </button>
            )}
            <p className={styles.tiktokCaption}>{v.title}</p>
            {v.credit && <p className={styles.tiktokCredit}>{v.credit}</p>}
          </li>
        ))}
      </ul>
      <p className={styles.tiktokNote}>Videos play through TikTok&apos;s player, which may set its own cookies once you press play.</p>
    </div>
  )
}
