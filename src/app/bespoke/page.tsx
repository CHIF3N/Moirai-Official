import { fetchOr, siteSettingsQuery, urlFor } from '@/lib/sanity'
import BespokeClient from '@/components/BespokeClient'
import { CATEGORIES } from '@/content/brand'

export const revalidate = 60

export default async function BespokePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settings = await fetchOr<any>('siteSettings', siteSettingsQuery, null)

  const heroImage = settings?.bespokeHeroImage ? urlFor(settings.bespokeHeroImage).url() : undefined
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gallery = settings?.bespokeGallery?.map((item: any) => ({
    url: item.image ? urlFor(item.image).url() : undefined,
    alt: item.alt || '',
  })).filter((i: any) => i.url) || []

  // Add the bespoke tailoring photographs
  const bespoke = CATEGORIES.find(c => c.slug === 'bespoke')
  const tailoring = bespoke ? [{ image: bespoke.image, alt: bespoke.imageAlt }, ...(bespoke.gallery || [])].filter(g => g.image.startsWith('/')) : []
  gallery.push(...tailoring.map(g => ({ url: g.image, alt: g.alt })))

  return <BespokeClient heroImage={heroImage} gallery={gallery} />
}
