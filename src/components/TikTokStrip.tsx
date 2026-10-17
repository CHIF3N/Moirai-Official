'use client'
import { useState } from 'react'
import Image from 'next/image'
import { TIKTOK_VIDEOS } from '@/content/brand'
import styles from './social.module.css'

type Video = (typeof TIKTOK_VIDEOS)[number]

// A cover that swaps to TikTok's official embed player only when tapped,
// so no TikTok scripts or tracking load until a visitor chooses to watch.
export function TikTokCard({ video, className = '' }: { video: Video; className?: string }) {
  const [playing, setPlaying] = useState(false)
  const logo = 'logoCover' in video && video.logoCover
  return (
    <div className={`${styles.tiktokCard} ${className}`}>
      {playing ? (
        <iframe
          className={styles.tiktokPlayer}
          src={`https://www.tiktok.com/player/v1/${video.id}?autoplay=1&music_info=1&description=1&rel=0`}
          title={`${video.title} — Moirai on TikTok`}
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" className={`${styles.tiktokCover}${logo ? ` ${styles.logoCover}` : ''}`} onClick={() => setPlaying(true)} aria-label={`Play “${video.title}” from TikTok`}>
          <Image src={video.cover} alt="" fill sizes="(max-width: 640px) 70vw, 300px" className={styles.img} />
          <span className={styles.tiktokPlay} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" /></svg>
          </span>
        </button>
      )}
      <p className={styles.tiktokCaption}>{video.title}</p>
      {video.credit && <p className={styles.tiktokCredit}>{video.credit}</p>}
    </div>
  )
}

export default function TikTokStrip({ profileUrl, handle, ids, title = 'On TikTok' }: { profileUrl: string | null; handle: string | null; ids?: string[]; title?: string }) {
  const videos = ids ? TIKTOK_VIDEOS.filter(v => ids.includes(v.id)) : TIKTOK_VIDEOS
  return (
    <div className={styles.tiktok}>
      <div className={styles.tiktokHead}>
        <h3 className={styles.tiktokTitle}>{title}</h3>
        {profileUrl && <a href={profileUrl} target="_blank" rel="noopener noreferrer" className={styles.tiktokLink}>{handle} <span aria-hidden="true">→</span></a>}
      </div>
      <ul className={styles.tiktokRow}>
        {videos.map(v => <li key={v.id}><TikTokCard video={v} /></li>)}
      </ul>
      <p className={styles.tiktokNote}>Videos play through TikTok&apos;s player, which may set its own cookies once you press play.</p>
    </div>
  )
}
