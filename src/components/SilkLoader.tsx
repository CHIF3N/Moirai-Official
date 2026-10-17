'use client'
import { useEffect, useState } from 'react'
import Logo from './Logo'
import styles from './loader.module.css'

// Opening sequence, played on every visit and reload:
// Clotho spins (a thread draws across), Lachesis measures (the wordmark is revealed along it),
// Atropos cuts (the thread snaps and the curtain parts).
// It is in the server HTML so it shows before anything else, and the CSS removes it on its own
// even if JavaScript never runs. Any click or key skips it; reduced motion gets a short fade.
const TOTAL_MS = 2600

export default function SilkLoader() {
  const [state, setState] = useState<'playing' | 'leaving' | 'gone'>('playing')

  useEffect(() => {
    const leave = () => setState(s => (s === 'playing' ? 'leaving' : s))
    const done = window.setTimeout(() => setState('gone'), TOTAL_MS)
    const skip = () => { leave(); window.setTimeout(() => setState('gone'), 650) }
    window.addEventListener('keydown', skip, { once: true })
    window.addEventListener('pointerdown', skip, { once: true })
    return () => {
      window.clearTimeout(done)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [])

  if (state === 'gone') return null

  return (
    <div className={`${styles.loader}${state === 'leaving' ? ` ${styles.leaving}` : ''}`} aria-hidden="true">
      <div className={`${styles.curtain} ${styles.top}`} />
      <div className={`${styles.curtain} ${styles.bottom}`} />

      <div className={styles.stage}>
        <div className={styles.logoWrap}>
          <Logo className={styles.logo} title="" />
        </div>
        <span className={styles.thread}><span className={styles.threadLeft} /><span className={styles.threadRight} /></span>
        <p className={styles.tagline}>Destiny, Tailored.</p>
        <p className={styles.fates}>Refined · Intentional · Eternal</p>
      </div>

      <p className={styles.skip}>Tap to enter</p>
    </div>
  )
}
