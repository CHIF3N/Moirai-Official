import { fetchOr, allProductsQuery, siteSettingsQuery, urlFor } from '@/lib/sanity'
import CollectionsClient from '@/components/CollectionsClient'

export const revalidate = 60

export default async function CollectionsPage() {
  const [products, settings] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchOr<any[]>('collections products', allProductsQuery, []),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchOr<any>('siteSettings', siteSettingsQuery, null),
  ])

  // Resolve image URLs on the server side (functions can't cross server→client boundary)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const productsWithUrls = products.map((p: any) => ({
    ...p,
    imageUrl: p.image ? urlFor(p.image).width(480).url() : null,
  }))

  const collections = Array.isArray(settings?.collections) ? settings.collections : []
  const collectionsHeroImage = settings?.collectionsHeroImage ? urlFor(settings.collectionsHeroImage).width(1200).quality(80).url() : null

  // Group products by collection
  const grouped: Record<string, typeof productsWithUrls> = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  collections.forEach((c: any) => { grouped[c.title] = [] })
  productsWithUrls.forEach(p => {
    const cat = p.category
    if (cat && grouped[cat]) grouped[cat].push(p)
  })

  return <CollectionsClient grouped={grouped} collections={collections} heroImage={collectionsHeroImage} />
}
