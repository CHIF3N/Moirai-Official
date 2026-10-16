import Link from 'next/link'
import Image from 'next/image'
import { fetchOr, postBySlugQuery, siteSettingsQuery, urlFor } from '@/lib/sanity'
import { getSiteConfig } from '@/lib/site'
import { PortableText } from '@portabletext/react'

export const revalidate = 60

const ptComponents = {
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null
      return (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', margin: '3rem 0', border: '1px solid var(--border)', overflow: 'hidden' }}>
          {(() => {
             const imgRaw = value
             const imageSrc = imgRaw ? (typeof imgRaw === 'string' ? imgRaw : urlFor(imgRaw).width(1200).quality(80).url()) : undefined
             return imageSrc ? (
               <Image src={imageSrc} alt={value?.alt || 'Blog Image'} fill sizes="(max-width: 768px) 100vw, 800px" style={{ objectFit: 'cover' }} />
             ) : (
               <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.05)' }} />
             )
          })()}
        </div>
      )
    }
  },
  block: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h2: ({ children }: any) => <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 400, margin: '3.5rem 0 1.5rem', color: 'var(--text)' }}>{children}</h2>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h3: ({ children }: any) => <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400, margin: '2.5rem 0 1rem', color: 'var(--text)' }}>{children}</h3>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blockquote: ({ children }: any) => <blockquote style={{ borderLeft: '2px solid var(--accent)', background: 'var(--accent-soft)', padding: '1.5rem', margin: '2.5rem 0', fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--text)', fontSize: '1.2rem', lineHeight: 1.7 }}>{children}</blockquote>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    normal: ({ children }: any) => <p style={{ color: 'var(--muted)', fontSize: '14.5px', lineHeight: 2, marginBottom: '1.5rem' }}>{children}</p>
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [post, settings] = await Promise.all([
    fetchOr<any>(`post "${slug}"`, postBySlugQuery, null, { slug }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchOr<any>('siteSettings', siteSettingsQuery, null),
  ])
  const site = getSiteConfig(settings)

  if (!post) {
    return (
      <div style={{ paddingTop: '10rem', textAlign: 'center', minHeight: '60vh', background: 'var(--bg)' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '2rem', color: 'var(--text)' }}>Post not found.</p>
        <Link href="/blog" className="btn-ghost">← Back to Journal</Link>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: '5rem', background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: '5rem 2rem 4rem', textAlign: 'center', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Link href="/blog" style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase', display: 'inline-block', marginBottom: '2rem' }}>← The Journal</Link>
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            {post?.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 400, color: 'var(--text)', lineHeight: 1.2 }}>{post?.title || 'Untitled Post'}</h1>
        </div>
      </section>

      {/* Cover image */}
      {(() => {
         const imgRaw = post?.mainImage
         const imageSrc = imgRaw ? (typeof imgRaw === 'string' ? imgRaw : urlFor(imgRaw).width(1200).quality(80).url()) : undefined
         return imageSrc ? (
           <div style={{ maxWidth: 900, margin: '4rem auto 0', padding: '0 2rem', position: 'relative', height: 500 }}>
             <Image src={imageSrc} alt={post?.title || 'Cover'} fill style={{ objectFit: 'cover', border: '1px solid var(--border)' }} />
           </div>
         ) : (
           <div style={{ maxWidth: 900, margin: '4rem auto 0', padding: '0 2rem', height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
             <span style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.1em' }}>(No cover image)</span>
           </div>
         )
      })()}

      {/* Body */}
      <article style={{ maxWidth: 720, margin: '0 auto', padding: '4rem 2rem 6rem' }}>
        {post?.excerpt && (
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '3rem', borderLeft: '2px solid var(--accent)', paddingLeft: '1.5rem' }}>
            {post.excerpt}
          </p>
        )}

        {/* The post schema stores the body as plain text; older posts may be rich text */}
        {typeof post?.body === 'string' ? (
          post.body.split(/\n{2,}/).map((para: string, i: number) => (
            <p key={i} style={{ color: 'var(--muted)', fontSize: '14.5px', lineHeight: 2, marginBottom: '1.5rem', whiteSpace: 'pre-line' }}>{para}</p>
          ))
        ) : Array.isArray(post?.body) ? (
          <PortableText value={post.body} components={ptComponents} />
        ) : null}

        {/* Gallery */}
        {Array.isArray(post?.gallery) && post.gallery.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            <div className="divider" style={{ marginBottom: '2rem' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--text)' }}>Gallery</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {post.gallery.map((img: any, idx: number) => {
                 const imgRaw = img
                 const imageSrc = imgRaw ? (typeof imgRaw === 'string' ? imgRaw : urlFor(imgRaw).width(800).quality(80).url()) : undefined
                 return (
                   <div key={idx} style={{ position: 'relative', aspectRatio: '1', border: '1px solid var(--border)', overflow: 'hidden' }}>
                      {imageSrc ? (
                        <Image src={imageSrc} alt={`${post.title} gallery ${idx}`} fill sizes="50vw" style={{ objectFit: 'cover' }} loading="lazy" />
                      ) : (
                        <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.05)' }} />
                      )}
                   </div>
                 )
              })}
            </div>
          </div>
        )}

        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Link href="/blog" className="btn-ghost">← Back to Journal</Link>
          <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase' }}>Follow {site.instagramHandle}</a>
        </div>
      </article>
    </div>
  )
}
