import { ARTICLES } from '@/content/journal'
import { fetchOr, allPostsQuery, urlFor, mediaUrl } from '@/lib/sanity'

// One list for the Journal: articles published with the site plus posts written in Sanity
export interface JournalEntry {
  slug: string
  title: string
  excerpt: string
  publishedAt: string | null
  topic: string | null
  imageUrl: string | null
  imageAlt: string
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getJournalEntries(): Promise<JournalEntry[]> {
  const posts = await fetchOr<any[]>('posts', allPostsQuery, [])

  const fromSanity: JournalEntry[] = posts
    .filter(p => p?.slug?.current && p?.title)
    .map(p => ({
      slug: p.slug.current,
      title: p.title,
      excerpt: p.excerpt || '',
      publishedAt: p.publishedAt || null,
      topic: 'From the atelier',
      imageUrl: p.mainImage ? urlFor(p.mainImage).width(1000).quality(80).url() : null,
      imageAlt: '',
    }))

  const fromSite: JournalEntry[] = ARTICLES.map(a => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    publishedAt: a.publishedAt,
    topic: a.topic,
    imageUrl: mediaUrl(a.image, 1000, 80),
    imageAlt: a.imageAlt,
  }))

  // Site articles keep their curated order; Sanity posts follow, newest first
  return [...fromSite, ...fromSanity.filter(p => !fromSite.some(a => a.slug === p.slug))]
}

export function formatDate(iso: string | null) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}
