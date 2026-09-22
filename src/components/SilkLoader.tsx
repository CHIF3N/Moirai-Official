'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * SilkLoader — full-screen obsidian curtain wipe that reveals the site.
 * Mounts on first visit per session (sessionStorage keyed).
 * Two curtain panels slide up with a staggered gold hairline reveal.
 */
export default function SilkLoader() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only play once per tab session
    const seen = sessionStorage.getItem('moirai_loader_shown')
    if (!seen) {
      setVisible(true)
      sessionStorage.setItem('moirai_loader_shown', '1')
      // Dismiss after animation completes
      const t = setTimeout(() => setVisible(false), 2800)
      return () => clearTimeout(t)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Left panel */}
          <motion.div
            key="silk-left"
            initial={{ scaleY: 1, originY: 0 }}
            animate={{ scaleY: 0, originY: 0 }}
            exit={{}}
            transition={{ duration: 1.1, delay: 1.4, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              top: 0, left: 0,
              width: '50%', height: '100%',
              background: '#0E0D0B',
              zIndex: 9999,
              transformOrigin: 'top',
            }}
          />

          {/* Right panel — slightly delayed */}
          <motion.div
            key="silk-right"
            initial={{ scaleY: 1, originY: 0 }}
            animate={{ scaleY: 0, originY: 0 }}
            exit={{}}
            transition={{ duration: 1.1, delay: 1.6, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              top: 0, right: 0,
              width: '50%', height: '100%',
              background: '#0E0D0B',
              zIndex: 9999,
              transformOrigin: 'top',
            }}
          />

          {/* Gold hairline seam between panels */}
          <motion.div
            key="silk-seam"
            initial={{ scaleY: 1, opacity: 1, originY: 0 }}
            animate={{ scaleY: 0, opacity: 0, originY: 0 }}
            exit={{}}
            transition={{ duration: 1.0, delay: 1.4, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '1px',
              height: '100%',
              background: 'linear-gradient(to bottom, transparent, #C2A26F 30%, #C2A26F 70%, transparent)',
              zIndex: 10000,
              transformOrigin: 'top',
            }}
          />

          {/* Center wordmark over the loader */}
          <motion.div
            key="silk-wordmark"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10001,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            {/* Greek key top accent */}
            <svg width="120" height="10" viewBox="0 0 120 10" style={{ marginBottom: '1.5rem', opacity: 0.6 }}>
              <path
                d="M0 1h40v8h-16V5h6v2h4V3H6v4h8v2H0V1zm50 0h20v8H54V5h12V3H52v4h8v2H50V1zm22 0h40v8h-8V3h-26v4h8v2H72V1z"
                fill="#C2A26F"
                fillRule="evenodd"
              />
            </svg>

            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontWeight: 300,
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                color: '#F5F0E8',
                lineHeight: 1,
                marginBottom: '0.4rem',
              }}
            >
              MOIRAI
            </p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: '8px',
                letterSpacing: '0.55em',
                textTransform: 'uppercase',
                color: '#C2A26F',
                marginBottom: '2rem',
              }}
            >
              THE HOUSE OF MOIRAI
            </motion.p>

            {/* Animated gold thread line */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: '80px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #C2A26F, transparent)',
                transformOrigin: 'left',
              }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 1.2, delay: 0.9, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                marginTop: '1.5rem',
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: '8px',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: '#C2A26F',
              }}
            >
              Destiny, Tailored
            </motion.p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
