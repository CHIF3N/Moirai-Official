import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { ARTICLES, getArticle, type Block } from '@/content/journal'
import { fetchOr, postBySlugQuery, siteSettingsQuery, urlFor } from '@/lib/sanity'
import { getJournalEntries, formatDate } from '@/lib/journal'
import { getSiteConfig, waLink, CONSULTATION_HREF } from '@/lib/site'
import styles from '../journal.module.css'

export const revalidate = 60

export function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

/* eslint-disable @typescript-eslint/no-explicit-any */
async function loadEntry(slug: string) {
  const article = getArticle(slug)
  if (article) {
    return {
      title: article.title,
      excerpt: article.excerpt,
      publishedAt: article.publishedAt,
      topic: article.topic,
      imageUrl: urlFor(article.image).width(1600).quality(82).url(),
      imageAlt: article.imageAlt,
      blocks: article.body as Block[] | null,
      sanityBody: null as any,
    }
  }
  const post = await fetchOr<any>(`post "${slug}"`, postBySlugQuery, null, { slug })
  if (!post) return null
  return {
    title: post.title || 'Untitled',
    excerpt: post.excerpt || '',
    publishedAt: post.publishedAt || null,
    topic: 'From the atelier',
    imageUrl: post.mainImage ? urlFor(post.mainImage).width(1600).quality(82).url() : null,
    imageAlt: '',
    blocks: null,
    sanityBody: post.body ?? null,
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const entry = await loadEntry(slug)
  if (!entry) return { title: 'Story not found — Moirai' }
  return {
    title: `${entry.title} — The Moirai Journal`,
    description: entry.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: 'article',
      title: entry.title,
      description: entry.excerpt,
      url: `/blog/${slug}`,
      publishedTime: entry.publishedAt || undefined,
      images: entry.imageUrl ? [{ url: entry.imageUrl, alt: entry.imageAlt }] : undefined,
    },
  }
}

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case 'h2': return <h2 key={i}>{b.text}</h2>
    case 'list': return <ul key={i}>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
    case 'quote': return <blockquote key={i}>{b.text}</blockquote>
    default: return <p key={i}>{b.text}</p>
  }
}

export default async function JournalArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [entry, settings, all] = await Promise.all([
    loadEntry(slug),
    fetchOr<any>('siteSettings', siteSettingsQuery, null),
    getJournalEntries(),
  ])
  if (!entry) notFound()
  const site = getSiteConfig(settings)
  const related = all.filter(e => e.slug !== slug).slice(0, 3)
  const date = formatDate(entry.publishedAt)

  return (
    <article className={styles.article}>
      <header className={styles.articleHead}>
        <Link href="/blog" className={styles.back}>← The Journal</Link>
        <p className={styles.meta}>{entry.topic}{date && <> · <time dateTime={entry.publishedAt!}>{date}</time></>}</p>
        <h1 className={styles.articleTitle}>{entry.title}</h1>
        {entry.excerpt && <p className={styles.standfirst}>{entry.excerpt}</p>}
      </header>

      {entry.imageUrl && (
        <div className={styles.hero}>
          <Image src={entry.imageUrl} alt={entry.imageAlt} fill priority sizes="(max-width: 1100px) 100vw, 1100px" className={styles.img} />
        </div>
      )}

      <div className={styles.prose}>
        {entry.blocks
          ? entry.blocks.map(renderBlock)
          : typeof entry.sanityBody === 'string'
            ? entry.sanityBody.split(/\n{2,}/).map((para: string, i: number) => <p key={i} style={{ whiteSpace: 'pre-line' }}>{para}</p>)
            : Array.isArray(entry.sanityBody) ? <PortableText value={entry.sanityBody} /> : null}
      </div>

      <aside className={styles.cta} aria-label="Work with Moirai">
        <p className={styles.ctaTitle}>Ready to begin your own piece?</p>
        <p className={styles.ctaText}>Tell us about your occasion and we will continue the conversation on WhatsApp.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <Link href={CONSULTATION_HREF} className="btn-primary">Book a consultation</Link>
          <a href={waLink(site.whatsappNumber, `Hi Moirai! I just read "${entry.title}" on your Journal.`)} target="_blank" rel="noopener noreferrer" className="btn-ghost">Message us</a>
        </div>
      </aside>

      {related.length > 0 && (
        <section className={styles.related} aria-labelledby="related-title">
          <h2 id="related-title" className={styles.relatedTitle}>More from the Journal</h2>
          <ul className={styles.grid}>
            {related.map(e => (
              <li key={e.slug}>
                <Link href={`/blog/${e.slug}`} className={styles.card}>
                  <span className={styles.cardMedia}>
                    {e.imageUrl && <Image src={e.imageUrl} alt={e.imageAlt} fill sizes="(max-width: 640px) 100vw, 33vw" className={styles.img} />}
                  </span>
                  <span className={styles.meta}>{e.topic}</span>
                  <span className={styles.cardTitle}>{e.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
