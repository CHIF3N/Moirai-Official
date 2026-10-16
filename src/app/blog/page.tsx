import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getJournalEntries, formatDate } from '@/lib/journal'
import styles from './journal.module.css'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'The Journal — Moirai',
  description: 'Essays on identity, craft and couture from Moirai: corsetry, bespoke fashion, Cameroonian heritage, garment care and learning the craft.',
  alternates: { canonical: '/blog' },
  openGraph: { title: 'The Journal — Moirai', description: 'Essays on identity, craft and couture from Moirai.', url: '/blog' },
}

export default async function JournalPage() {
  const entries = await getJournalEntries()
  const [lead, ...rest] = entries

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className="section-label">The Journal</p>
        <h1 className={styles.title}>Stories of craft, <em>identity and becoming.</em></h1>
      </header>

      {!lead ? (
        <p className={styles.empty}>New stories are on their way. Check back soon.</p>
      ) : (
        <>
          <Link href={`/blog/${lead.slug}`} className={styles.lead}>
            <span className={styles.leadMedia}>
              {lead.imageUrl && <Image src={lead.imageUrl} alt={lead.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 55vw" className={styles.img} />}
            </span>
            <span className={styles.leadBody}>
              <span className={styles.meta}>{lead.topic}{lead.publishedAt && <> · <time dateTime={lead.publishedAt}>{formatDate(lead.publishedAt)}</time></>}</span>
              <span className={styles.leadTitle}>{lead.title}</span>
              {lead.excerpt && <span className={styles.excerpt}>{lead.excerpt}</span>}
              <span className={styles.read}>Read the story <span aria-hidden="true">→</span></span>
            </span>
          </Link>

          <ul className={styles.grid}>
            {rest.map(e => (
              <li key={e.slug}>
                <Link href={`/blog/${e.slug}`} className={styles.card}>
                  <span className={styles.cardMedia}>
                    {e.imageUrl && <Image src={e.imageUrl} alt={e.imageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw" className={styles.img} />}
                  </span>
                  <span className={styles.meta}>{e.topic}{e.publishedAt && <> · <time dateTime={e.publishedAt}>{formatDate(e.publishedAt)}</time></>}</span>
                  <span className={styles.cardTitle}>{e.title}</span>
                  {e.excerpt && <span className={styles.cardExcerpt}>{e.excerpt}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
