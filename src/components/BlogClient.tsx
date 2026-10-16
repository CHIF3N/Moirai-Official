'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { staggerContainer, staggerFadeUp } from '@/lib/animations'
import { urlFor } from '@/sanity/lib/image'

interface BlogClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posts: any[]
  blogHeroImage?: string | null
}

export default function BlogClient({ posts, blogHeroImage }: BlogClientProps) {
  return (
    <div style={{ paddingTop: '5rem' }}>
      {/* Header */}
      <section style={{ padding: '5rem 2rem 4rem', textAlign: 'center', background: 'var(--bg)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden', minHeight: '40vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {(() => {
          const imgRaw = blogHeroImage
          const imageSrc = imgRaw ? (typeof imgRaw === 'string' ? imgRaw : urlFor(imgRaw).width(1200).quality(80).url()) : undefined
          return imageSrc ? (
            <Image
              src={imageSrc}
              alt="Blog Hero"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', opacity: 0.3 }}
              priority
            />
          ) : null
        })()}
        {!blogHeroImage && (
           <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center top, rgba(142, 31, 44, 0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
        )}
        <motion.div
          style={{ position: 'relative', zIndex: 1 }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="section-label" variants={staggerFadeUp}>Stories &amp; Style</motion.p>
          <motion.h1
            variants={staggerFadeUp}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,8vw,6rem)', fontWeight: 700, marginBottom: '1rem', color: 'var(--text)' }}
          >The Journal</motion.h1>
          <motion.div className="divider" variants={staggerFadeUp} />
        </motion.div>
      </section>

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container" style={{ maxWidth: 900, margin: '0 auto' }}>
          {posts && posts.length > 0 ? (
            posts.map((post, i) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.62, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/blog/${post.slug?.current}`} style={{ display: 'block' }}>
                  <motion.article
                    style={{ display: 'grid', gridTemplateColumns: post.mainImage ? '1fr 200px' : '1fr', gap: '2rem', alignItems: 'center', borderBottom: '1px solid var(--border)', padding: '3rem 0' }}
                    whileHover={{ paddingLeft: '1.25rem' }}
                    transition={{ duration: 0.25 }}
                  >
                    <div>
                      <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                      </p>
                      <motion.h2
                        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: 400, color: 'var(--text)', marginBottom: '0.75rem' }}
                        whileHover={{ color: 'var(--accent)' }}
                        transition={{ duration: 0.2 }}
                      >{post.title}</motion.h2>
                      {post.excerpt && <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.8 }}>{post.excerpt}</p>}
                      <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase', marginTop: '1rem' }}>Read More →</p>
                    </div>
                    {(() => {
                        const imgRaw = post?.mainImage
                        const imageSrc = imgRaw ? (typeof imgRaw === 'string' ? imgRaw : urlFor(imgRaw).width(800).quality(80).url()) : undefined
                        return imageSrc ? (
                          <div style={{ aspectRatio: '4/3', overflow: 'hidden', border: '1px solid var(--border)', position: 'relative' }}>
                            <motion.div
                              style={{ width: '100%', height: '100%', position: 'relative' }}
                              whileHover={{ scale: 1.04 }}
                              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            >
                               <Image src={imageSrc} alt={post?.title || 'Blog Post'} fill sizes="200px" style={{ objectFit: 'cover' }} loading="lazy" />
                            </motion.div>
                          </div>
                        ) : null
                    })()}
                  </motion.article>
                </Link>
              </motion.div>
            ))
          ) : (
            <p style={{ color: 'var(--muted)', fontSize: '13px', textAlign: 'center', padding: '5rem 0' }}>
              No journal entries found. Check back soon.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
